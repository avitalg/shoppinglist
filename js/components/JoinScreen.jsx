import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./JoinScreen.css";
import "./ListDetail.css";
import { db, doc, getDoc } from "../firebase.js";
import { genCode, LS } from "../utils.js";
import { useT, LanguageContext } from "../i18n.js";
import { CATEGORIES, CATEGORY_BY_ID } from "../categories.js";
import { HOME_SEO } from "../seoPages.js";
import { trackEvent } from "../analytics.js";
import { SiteFooter, usePageMeta, LangSwitcher } from "./InfoPage.jsx";

const PREVIEW_CATEGORIES = ["produce", "meat", "dairy"];

const PREVIEW_GROUPS = [
  {
    id: "produce",
    left: 2,
    items: [
      { key: "homePreviewItem1", checked: false },
      { key: "homePreviewItem2", checked: false },
    ],
  },
  {
    id: "meat",
    left: 1,
    items: [
      { key: "homePreviewItem3", checked: false },
    ],
  },
  {
    id: "dairy",
    left: 1,
    items: [
      { key: "homePreviewItem4", checked: true },
      { key: "homePreviewItem5", checked: false, noteKey: "homePreviewNote" },
    ],
  },
];

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
  const lang = useContext(LanguageContext);

  return (
    <div className="home-preview" aria-hidden="true">
      <div className="home-phone">
        <div className="list-detail home-phone-demo">
          <div className="header">
            <span className="back-btn">←</span>
            <h1 className="editable">
              {t("homePreviewTitle")}
              <span className="rename-hint">✏️</span>
            </h1>
            <span className="btn btn-gray btn-sm">{t("clearChecked")}</span>
            <span className="btn btn-gray btn-sm">↗</span>
            <span className="btn btn-gray btn-sm">📦</span>
            <span className="btn btn-gray btn-sm">🗑</span>
          </div>

          <div className="body">
            {PREVIEW_GROUPS.map(group => {
              const category = CATEGORY_BY_ID[group.id];
              const catLabel = lang === "en"
                ? (category.labelEn || category.label)
                : category.label;

              return (
                <div className="category-section" key={group.id}>
                  <div
                    className="category-header"
                    style={{ "--cat-color": `var(${category.color})` }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{catLabel}</span>
                    <span className="category-count">{t("leftCount", group.left)}</span>
                    <span className="category-chevron">⌄</span>
                  </div>
                  <div className="category-items">
                    {group.items.map(item => (
                      <div className="item-row" key={item.key}>
                        <span className={`item-check ${item.checked ? "checked" : ""}`} />
                        <div className="item-body">
                          <div className={`item-text ${item.checked ? "checked" : ""}`}>
                            {t(item.key)}
                          </div>
                          {item.noteKey && (
                            <div className="item-note">📝 {t(item.noteKey)}</div>
                          )}
                        </div>
                        <span className="item-delete">✕</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="add-bar">
            <div className="add-bar-row">
              <div className="home-phone-input">{t("addItemPlaceholder")}</div>
              <span className="btn btn-green">+</span>
            </div>

            <div className="category-picker-row">
              <span className="category-pill-label">{t("categoryLabel")}</span>
              <div className="category-pills">
                {CATEGORIES.filter(cat => PREVIEW_CATEGORIES.includes(cat.id)).map(cat => (
                  <span key={cat.id} className="category-pill">
                    {cat.icon}{" "}
                    {lang === "en" ? (cat.labelEn || cat.label) : cat.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="btn btn-gray btn-details">{t("addDetails")}</span>
            </div>
          </div>
        </div>
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
  const [newCode] = useState(genCode);
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
      const res = await fetch("/api/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: spaceName.trim() }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const reason =
          res.status === 403 ? "bot" : res.status === 400 ? "invalid" : "network";
        trackEvent("create_room_failed", { reason });
        setError(data?.error || t("createRoomFailed"));
        return;
      }

      if (!data?.roomId) {
        trackEvent("create_room_failed", { reason: "network" });
        setError(t("createRoomFailed"));
        return;
      }

      trackEvent("create_room");
      onJoin({ roomId: data.roomId, roomName: data.name || spaceName.trim() });
    } catch {
      trackEvent("create_room_failed", { reason: "network" });
      setError(t("createRoomFailed"));
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

            {!lastRoom && <ListPreview />}
          </div>

          <StartPanel {...formProps} />
        </section>

        <section className="home-features" aria-labelledby="home-features-title">
          <h2 id="home-features-title">{t("aboutFeaturesTitle")}</h2>
          <ul className="home-feature-grid">
            <li>
              <span className="home-feature-icon" aria-hidden="true">🛒</span>
              <span className="home-feature-text">{t("homeFeatureSync")}</span>
            </li>
            <li>
              <span className="home-feature-icon" aria-hidden="true">🥦</span>
              <span className="home-feature-text">{t("homeFeatureCategories")}</span>
            </li>
            <li>
              <span className="home-feature-icon" aria-hidden="true">📴</span>
              <span className="home-feature-text">{t("homeFeatureOffline")}</span>
            </li>
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
