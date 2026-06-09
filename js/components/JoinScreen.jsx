import { useState } from "react";
import { db, doc, setDoc, getDoc, serverTimestamp } from "../firebase.js";
import { genCode } from "../utils.js";

export default function JoinScreen({ onJoin }) {
  const [name,    setName]    = useState("");
  const [code,    setCode]    = useState("");
  const [newCode, setNewCode] = useState(genCode);
  const [error,   setError]   = useState("");
  const [busy,    setBusy]    = useState(false);

  async function handleJoin() {
    if (!name.trim())            return setError("Enter your name");
    if (code.trim().length < 4)  return setError("Enter a valid room code");

    setBusy(true);
    setError("");

    try {
      const roomId  = code.trim().toUpperCase();
      const snap    = await getDoc(doc(db, "rooms", roomId));

      if (!snap.exists()) return setError("Room not found. Double-check the code.");

      onJoin({ roomId, name: name.trim() });
    } catch {
      setError("Failed to connect. Check your internet connection.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate() {
    if (!name.trim()) return setError("Enter your name");

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
        name:      `${name.trim()}'s Family`,
        createdAt: serverTimestamp(),
        members:   [name.trim()],
      });

      onJoin({ roomId: code, name: name.trim() });
    } catch (err) {
      setError(err.message || "Failed to create room. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="join-screen">
      <div className="logo">🛒</div>
      <h2>FamilyCart</h2>
      <p>Shop together in real time. Share one list, everyone sees every change.</p>

      <div className="card">
        <h3>Join an existing room</h3>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleJoin()}
        />
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
        <p style={{ fontSize: ".82rem", color: "var(--gray)" }}>
          Share this code with your family:{" "}
          <strong className="room-code-highlight">{newCode}</strong>
        </p>
        <button className="btn btn-outline btn-full" onClick={handleCreate} disabled={busy}>
          Create room as {name.trim() || "…"}
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
