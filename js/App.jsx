import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { LS } from "./utils.js";
import { LanguageContext, useT } from "./i18n.js";
import JoinScreen  from "./components/JoinScreen.jsx";
import ListsView   from "./components/ListsView.jsx";
import ListDetail  from "./components/ListDetail.jsx";
import HistoryView from "./components/HistoryView.jsx";
import AboutPage   from "./components/AboutPage.jsx";
import FaqPage     from "./components/FaqPage.jsx";
import CookieBar, { CookieConsentContext } from "./components/CookieBar.jsx";
import {
  getCookieConsent,
  loadGoogleTag,
  setCookieConsent,
  trackEvent,
} from "./analytics.js";

// ── Online status hook ────────────────────────────────────────────────────────

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on  = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online",  on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

// ── Route guards ──────────────────────────────────────────────────────────────

/** Redirect to / if there is no active session. */
function RequireSession({ session, children }) {
  if (!session) return <Navigate to="/" replace />;
  return children;
}

// ── Screen components (wired to router) ──────────────────────────────────────

function ListDetailRoute({ session, lists, onBack }) {
  const { listId } = useParams();
  // Find the list from the in-memory list cache, or fall back to a minimal
  // stub so the component can load the live data from Firestore itself.
  const list = lists.find(l => l.id === listId) ?? { id: listId, name: "", items: [] };
  return <ListDetail list={list} session={session} onBack={onBack} />;
}

// ── Root app (manages session + language) ────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(() => LS.get("fc_session", null));
  const [lists,   setLists]   = useState([]);   // shared cache for deep-linked list detail
  const [lang,    setLang]    = useState(() => {
    const saved = LS.get("fc_lang", null);
    if (saved) return saved;
    return navigator.language?.startsWith("he") ? "he" : "en";
  });
  const [consent, setConsent] = useState(() => getCookieConsent());
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const online = useOnlineStatus();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    if (consent === "granted") loadGoogleTag();
  }, [consent]);

  function handleCookieAccept() {
    setCookieConsent("granted");
    loadGoogleTag();
    setConsent("granted");
    setCookieSettingsOpen(false);
  }

  function handleCookieReject() {
    setCookieConsent("denied");
    setConsent("denied");
    setCookieSettingsOpen(false);
  }

  function handleLangChange(newLang) {
    if (newLang === lang) return;
    trackEvent("change_language", {
      from: lang,
      to: newLang,
      path: window.location.pathname,
    });
    LS.set("fc_lang", newLang);
    setLang(newLang);
  }

  function handleJoin(sessionData) {
    LS.set("fc_session", sessionData);
    setSession(sessionData);
  }

  function handleLeave() {
    const activeLists = lists.filter(l => l.status == null || l.status === "active").length;
    trackEvent("leave_room", { active_lists: activeLists });
    LS.set("fc_last_room", {
      roomId:   session.roomId,
      roomName: session.roomName || session.roomId,
    });
    LS.set("fc_session", null);
    setSession(null);
  }

  const showCookieBar = consent == null || cookieSettingsOpen;

  return (
    <LanguageContext.Provider value={lang}>
      <CookieConsentContext.Provider value={{ openSettings: () => setCookieSettingsOpen(true) }}>
        <BrowserRouter>
          <GoogleAnalytics />
          {consent === "granted" && <Analytics />}
          <OfflineBanner online={online} />
          {showCookieBar && (
            <CookieBar onAccept={handleCookieAccept} onReject={handleCookieReject} />
          )}
          <Routes>
          {/* Public: join / login */}
          <Route
            path="/"
            element={
              session
                ? <Navigate to="/lists" replace />
                : <JoinScreen onJoin={handleJoin} lang={lang} onLangChange={handleLangChange} />
            }
          />

          <Route
            path="/about"
            element={
              <AboutPage lang={lang} onLangChange={handleLangChange} session={session} />
            }
          />

          <Route
            path="/faq"
            element={
              <FaqPage lang={lang} onLangChange={handleLangChange} session={session} />
            }
          />

          {/* Protected: lists */}
          <Route
            path="/lists"
            element={
              <RequireSession session={session}>
                <ListsViewRoute
                  session={session}
                  onLeave={handleLeave}
                  onListsLoaded={setLists}
                />
              </RequireSession>
            }
          />

          {/* Protected: list detail */}
          <Route
            path="/list/:listId"
            element={
              <RequireSession session={session}>
                <ListDetailRouteWrapper session={session} lists={lists} />
              </RequireSession>
            }
          />

          {/* Protected: history */}
          <Route
            path="/history"
            element={
              <RequireSession session={session}>
                <HistoryViewRoute session={session} />
              </RequireSession>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={session ? "/lists" : "/"} replace />} />
          </Routes>
        </BrowserRouter>
      </CookieConsentContext.Provider>
    </LanguageContext.Provider>
  );
}

// ── Small inline wrappers to connect router navigation ────────────────────────

function GoogleAnalytics() {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + search,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}

function OfflineBanner({ online }) {
  const t = useT();
  if (online) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
      background: "#92400e", color: "#fef3c7",
      textAlign: "center", fontSize: "0.8rem",
      padding: "6px 16px", letterSpacing: "0.01em",
    }}>
      {t("offlineBanner")}
    </div>
  );
}

function ListsViewRoute({ session, onLeave, onListsLoaded }) {
  const navigate = useNavigate();
  return (
    <ListsView
      session={session}
      onOpen={list => navigate(`/list/${list.id}`, { state: { list } })}
      onHistory={() => navigate("/history")}
      onLeave={onLeave}
      onListsLoaded={onListsLoaded}
    />
  );
}

function ListDetailRouteWrapper({ session, lists }) {
  const navigate  = useNavigate();
  const { listId } = useParams();
  const list = lists.find(l => l.id === listId) ?? { id: listId, name: "", items: [] };
  return (
    <ListDetail
      list={list}
      session={session}
      onBack={() => navigate("/lists")}
    />
  );
}

function HistoryViewRoute({ session }) {
  const navigate = useNavigate();
  return <HistoryView session={session} onBack={() => navigate("/lists")} />;
}
