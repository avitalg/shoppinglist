import { useState } from "react";
import "./JoinScreen.css";
import { db, doc, setDoc, getDoc, serverTimestamp } from "../firebase.js";
import { genCode, LS } from "../utils.js";

export default function JoinScreen({ onJoin }) {
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
        setError("This room no longer exists.");
        setLastRoom(null);
        LS.set("fc_last_room", null);
        return;
      }
      onJoin({ roomId: lastRoom.roomId, roomName: lastRoom.roomName });
    } catch {
      setError("Failed to connect. Check your internet connection.");
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin() {
    if (code.trim().length < 4) return setError("Enter a valid room code");

    setBusy(true);
    setError("");

    try {
      const roomId = code.trim().toUpperCase();
      const snap   = await getDoc(doc(db, "rooms", roomId));

      if (!snap.exists()) return setError("Room not found. Double-check the code.");

      onJoin({ roomId, roomName: snap.data().name || roomId });
    } catch {
      setError("Failed to connect. Check your internet connection.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate() {
    if (!spaceName.trim()) return setError("Enter a family space name");

    setBusy(true);
    setError("");

    try {
      // Find a code that is not already taken (handles unlikely collisions)
      let code = newCode;
      for (let i = 0; i < 5; i++) {
        const snap = await getDoc(doc(db, "rooms", code));
        if (!snap.exists()) break;
        code = genCode();
        if (i === 4) throw new Error("Could not generate a unique room code. Please try again.");
      }

      await setDoc(doc(db, "rooms", code), {
        name:      spaceName.trim(),
        createdAt: serverTimestamp(),
      });

      onJoin({ roomId: code, roomName: spaceName.trim() });
    } catch (err) {
      setError(err.message || "Failed to create room. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="join-screen">
      <div className="logo">🛒</div>
      <h2>GrocerieShop</h2>
      <p>Shop together in real time. Share one list, everyone sees every change.</p>

      {lastRoom && (
        <div className="quick-rejoin-card">
          <div className="quick-rejoin-header">
            <span className="quick-rejoin-icon">👋</span>
            <div>
              <div className="quick-rejoin-title">Welcome back!</div>
              <div className="quick-rejoin-room">{lastRoom.roomName}</div>
            </div>
            <span className="quick-rejoin-code">{lastRoom.roomId}</span>
          </div>
          <button className="btn btn-green btn-full" onClick={handleQuickRejoin} disabled={busy}>
            Rejoin {lastRoom.roomName}
          </button>
          <button
            className="quick-rejoin-dismiss"
            onClick={() => { setLastRoom(null); LS.set("fc_last_room", null); }}
          >
            Sign in to a different room
          </button>
        </div>
      )}

      {!lastRoom && (
        <>
          <div className="card">
            <h3>Join an existing room</h3>
            <div className="input-row">
              <input
                type="text"
                placeholder="Room code"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                style={{ textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}
              />
              <button className="btn btn-green" onClick={handleJoin} disabled={busy}>
                Join
              </button>
            </div>
          </div>

          <div className="or-divider">or</div>

          <div className="card">
            <h3>Create a new room</h3>
            <input
              type="text"
              placeholder="Family space name (e.g. The Glazers)"
              value={spaceName}
              onChange={e => setSpaceName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
            />
            <p className="input-hint">The name of your family shopping space</p>
            <p className="room-code-preview">
              Your room code: <strong className="room-code-highlight">{newCode}</strong>
              <span> — share this with your family</span>
            </p>
            <button className="btn btn-outline btn-full" onClick={handleCreate} disabled={busy}>
              Create space
            </button>
          </div>
        </>
      )}

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
