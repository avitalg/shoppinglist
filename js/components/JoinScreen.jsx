import { useState } from "react";
import { Link } from "react-router-dom";
import "./JoinScreen.css";
import { db, doc, setDoc, getDoc, serverTimestamp } from "../firebase.js";
import { genCode, LS } from "../utils.js";
import { useT } from "../i18n.js";
import { HOME_SEO } from "../seoPages.js";
import { trackEvent } from "../analytics.js";
import { SiteFooter, usePageMeta, LangSwitcher } from "./InfoPage.jsx";

function StartPanel({
  t, lastRoom, setLastRoom, busy, error,
  code, setCode, spaceName, setSpaceName, newCode,
  onQuickRejoin, onJoin, onCreate,
}) {
  return (
    <aside className="home-form" id="start" aria-labelledby="home-start-title">
      <h2 id="home-start-title" className="home-form-title">{t("homeStartTitle")}</h2>

      {lastRoom && (
        <div className="quick-rejoin-card">
          <div className="quick-rejoin-header">
            <span className="quick-rejoin-icon">👋</span>
            <div>
              <div className="quick-rejoin-title">{t("welcomeBack")}</div>
              <div className="quick-rejoin-room">{lastRoom.roomName}</div>
            </div>
            <span className="quick-rejoin-code">{lastRoom.roomId}</span>
          </div>
          <button type="button" className="btn btn-green btn-full" onClick={onQuickRejoin} disabled={busy}>
            {t("rejoin")} {lastRoom.roomName}
          </button>
          <button
            type="button"
            className="quick-rejoin-dismiss"
            onClick={() => { setLastRoom(null); LS.set("fc_last_room", null); }}
          >
            {t("differentRoom")}
          </button>
        </div>
      )}

      {!lastRoom && (
        <>
          <div className="card">
            <h3>{t("joinRoom")}</h3>
            <div className="input-row">
              <input
                type="text"
                placeholder={t("roomCodePlaceholder")}
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && onJoin()}
                style={{ textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}
                autoComplete="off"
                autoCapitalize="characters"
              />
              <button type="button" className="btn btn-green" onClick={onJoin} disabled={busy}>
                {t("joinBtn")}
              </button>
            </div>
          </div>

          <div className="or-divider">{t("orDivider")}</div>

          <div className="card">
            <h3>{t("createRoom")}</h3>
            <input
              type="text"
              placeholder={t("spaceNamePlaceholder")}
              value={spaceName}
              onChange={e => setSpaceName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onCreate()}
            />
            <p className="input-hint">{t("spaceNameHint")}</p>
            <p className="room-code-preview">
              {t("yourRoomCode")} <strong className="room-code-highlight">{newCode}</strong>
              <span>{t("shareWithFamily")}</span>
            </p>
            <button type="button" className="btn btn-outline btn-full" onClick={onCreate} disabled={busy}>
              {t("createBtn")}
            </button>
          </div>
        </>
      )}

      {error && <p className="error-msg">{error}</p>}
    </aside>
  );
}

function ListPreview() {
  const t = useT();
  return (
    <div className="home-preview" aria-hidden="true">
      <div className="home-phone">
        <div className="home-phone-bar">
          <span>🛒</span>
          <span>{t("homePreviewTitle")}</span>
        </div>
        <ul className="home-phone-list">
          <li><span className="home-check" /><span>{t("homePreviewItem1")}</span></li>
          <li><span className="home-check" /><span>{t("homePreviewItem2")}</span></li>
          <li className="done"><span className="home-check on">✓</span><span>{t("homePreviewItem3")}</span></li>
          <li><span className="home-check" /><span>{t("homePreviewItem4")}</span></li>
        </ul>
        <p className="home-phone-sync">{t("homePreviewSync")}</p>
      </div>
    </div>
  );
}

export default function JoinScreen({ onJoin, lang, onLangChange }) {
  const t = useT();
  usePageMeta({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    path: HOME_SEO.path,
    lang,
  });
  const [lastRoom,  setLastRoom]  = useState(() => LS.get("fc_last_room", null));
  const [spaceName, setSpaceName] = useState("");
  const [code,      setCode]      = useState("");
  const [newCode,   setNewCode]   = useState(genCode);
  const [error,     setError]     = useState("");
  const [busy,      setBusy]      = useState(false);

  async function handleQuickRejoin() {
    setBusy(true);
    setError("");

    try {
      const snap = await getDoc(doc(db, "rooms", lastRoom.roomId));
      if (!snap.exists()) {
        setError(t("roomNoLongerExists"));
        setLastRoom(null);
        LS.set("fc_last_room", null);
        trackEvent("join_room_failed", { reason: "gone" });
        return;
      }
      trackEvent("join_room", { method: "rejoin" });
      onJoin({ roomId: lastRoom.roomId, roomName: lastRoom.roomName });
    } catch {
      trackEvent("join_room_failed", { reason: "network" });
      setError(t("connectFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin() {
    if (code.trim().length < 4) {
      trackEvent("join_room_failed", { reason: "invalid" });
      return setError(t("invalidCode"));
    }

    setBusy(true);
    setError("");

    try {
      const roomId = code.trim().toUpperCase();
      const snap   = await getDoc(doc(db, "rooms", roomId));

      if (!snap.exists()) {
        trackEvent("join_room_failed", { reason: "not_found" });
        return setError(t("roomNotFound"));
      }

      trackEvent("join_room", { method: "code" });
      onJoin({ roomId, roomName: snap.data().name || roomId });
    } catch {
      trackEvent("join_room_failed", { reason: "network" });
      setError(t("connectFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate() {
    if (!spaceName.trim()) {
      trackEvent("create_room_failed", { reason: "empty_name" });
      return setError(t("enterSpaceName"));
    }

    setBusy(true);
    setError("");

    try {
      let nextCode = newCode;
      for (let i = 0; i < 5; i++) {
        const snap = await getDoc(doc(db, "rooms", nextCode));
        if (!snap.exists()) break;
        nextCode = genCode();
        if (i === 4) throw new Error(t("codeGenFailed"));
      }

      await setDoc(doc(db, "rooms", nextCode), {
        name:      spaceName.trim(),
        code:      nextCode,
        createdAt: serverTimestamp(),
      });

      trackEvent("create_room");
      onJoin({ roomId: nextCode, roomName: spaceName.trim() });
    } catch (err) {
      const genFailed = err.message === t("codeGenFailed");
      trackEvent("create_room_failed", { reason: genFailed ? "code_gen" : "network" });
      setError(err.message || t("createRoomFailed"));
    } finally {
      setBusy(false);
    }
  }

  const formProps = {
    t, lastRoom, setLastRoom, busy, error,
    code, setCode, spaceName, setSpaceName, newCode,
    onQuickRejoin: handleQuickRejoin,
    onJoin: handleJoin,
    onCreate: handleCreate,
  };

  return (
    <div className="home-page">
      <header className="home-nav">
        <div className="home-brand">
          <span className="home-brand-mark" aria-hidden="true">🛒</span>
          <span>GroceryPair</span>
        </div>
        <nav className="home-nav-links" aria-label={t("footerNav")}>
          <Link to="/about">{t("aboutNav")}</Link>
          <Link to="/faq">{t("faqNav")}</Link>
        </nav>
        <LangSwitcher lang={lang} onLangChange={onLangChange} />
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-copy">
            <div className="home-intro">
              <p className="home-eyebrow">{t("homeEyebrow")}</p>
              <h1>{t("homeHeadline")}</h1>
              <p className="home-lead">{t("homeLead")}</p>
              <p className="home-note">{t("homeNoAccount")}</p>
            </div>

            <ol className="home-steps">
              <li>
                <span className="home-step-num">1</span>
                <div>
                  <strong>{t("homeStep1Title")}</strong>
                  <span className="home-step-text">{t("aboutStep1")}</span>
                </div>
              </li>
              <li>
                <span className="home-step-num">2</span>
                <div>
                  <strong>{t("homeStep2Title")}</strong>
                  <span className="home-step-text">{t("aboutStep2")}</span>
                </div>
              </li>
              <li>
                <span className="home-step-num">3</span>
                <div>
                  <strong>{t("homeStep3Title")}</strong>
                  <span className="home-step-text">{t("aboutStep3")}</span>
                </div>
              </li>
            </ol>

            <ListPreview />
          </div>

          <StartPanel {...formProps} />
        </section>

        <section className="home-features" aria-labelledby="home-features-title">
          <h2 id="home-features-title">{t("aboutFeaturesTitle")}</h2>
          <ul className="home-feature-grid">
            <li>{t("aboutFeature1")}</li>
            <li>{t("aboutFeature2")}</li>
            <li>{t("aboutFeature3")}</li>
            <li>{t("aboutFeature4")}</li>
            <li>{t("aboutFeature5")}</li>
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
