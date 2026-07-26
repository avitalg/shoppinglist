import { useState } from "react";
import "./JoinScreen.css";
import { db, doc, setDoc, getDoc, serverTimestamp } from "../firebase.js";
import { genCode, LS } from "../utils.js";
import { useT } from "../i18n.js";

export default function JoinScreen({ onJoin, lang, onLangChange }) {
  const t = useT();
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
        return;
      }
      onJoin({ roomId: lastRoom.roomId, roomName: lastRoom.roomName });
    } catch {
      setError(t("connectFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin() {
    if (code.trim().length < 4) return setError(t("invalidCode"));

    setBusy(true);
    setError("");

    try {
      const roomId = code.trim().toUpperCase();
      const snap   = await getDoc(doc(db, "rooms", roomId));

      if (!snap.exists()) return setError(t("roomNotFound"));

      onJoin({ roomId, roomName: snap.data().name || roomId });
    } catch {
      setError(t("connectFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate() {
    if (!spaceName.trim()) return setError(t("enterSpaceName"));

    setBusy(true);
    setError("");

    try {
      let code = newCode;
      for (let i = 0; i < 5; i++) {
        const snap = await getDoc(doc(db, "rooms", code));
        if (!snap.exists()) break;
        code = genCode();
        if (i === 4) throw new Error(t("codeGenFailed"));
      }

      await setDoc(doc(db, "rooms", code), {
        name:      spaceName.trim(),
        code:      code,
        createdAt: serverTimestamp(),
      });

      onJoin({ roomId: code, roomName: spaceName.trim() });
    } catch (err) {
      setError(err.message || t("createRoomFailed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="join-screen">
      <div className="lang-switcher">
        <button
          className={`lang-option ${lang === "he" ? "active" : ""}`}
          onClick={() => onLangChange("he")}
        >
          עב
        </button>
        <button
          className={`lang-option ${lang === "en" ? "active" : ""}`}
          onClick={() => onLangChange("en")}
        >
          EN
        </button>
      </div>

      <div className="logo">🛒</div>
      <h2>GrocerieShop</h2>
      <p>{t("tagline")}</p>

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
          <button className="btn btn-green btn-full" onClick={handleQuickRejoin} disabled={busy}>
            {t("rejoin")} {lastRoom.roomName}
          </button>
          <button
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
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                style={{ textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}
              />
              <button className="btn btn-green" onClick={handleJoin} disabled={busy}>
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
              onKeyDown={e => e.key === "Enter" && handleCreate()}
            />
            <p className="input-hint">{t("spaceNameHint")}</p>
            <p className="room-code-preview">
              {t("yourRoomCode")} <strong className="room-code-highlight">{newCode}</strong>
              <span>{t("shareWithFamily")}</span>
            </p>
            <button className="btn btn-outline btn-full" onClick={handleCreate} disabled={busy}>
              {t("createBtn")}
            </button>
          </div>
        </>
      )}

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
