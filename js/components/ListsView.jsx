import { useState, useEffect } from "react";
import { db, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "../firebase.js";
import { formatDate } from "../utils.js";

export default function ListsView({ session, onOpen, onHistory, onLeave }) {
  const [lists,   setLists]   = useState([]);
  const [newName, setNewName] = useState("");
  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState("");

  // Subscribe to all lists in this room, newest first
  useEffect(() => {
    const q = query(
      collection(db, "rooms", session.roomId, "lists"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(
      q,
      snap => setLists(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => setError("Lost connection. Please refresh."),
    );
  }, [session.roomId]);

  async function createList() {
    const name = newName.trim();
    if (!name) return;

    setBusy(true);
    setError("");
    try {
      await addDoc(collection(db, "rooms", session.roomId, "lists"), {
        name,
        status:    "active",
        createdAt: serverTimestamp(),
        items:     [],
      });
      setNewName("");
    } catch {
      setError("Failed to create list. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const active   = lists.filter(l => l.status === "active");
  const archived = lists.filter(l => l.status === "archived");
  const uncheckedCount = list => (list.items || []).filter(i => !i.checked).length;

  return (
    <div>
      <div className="header">
        <span style={{ fontSize: "1.4rem" }}>🛒</span>
        <h1>FamilyCart</h1>
        <span className="name-tag">{session.name}</span>
        <span className="room-tag">{session.roomId}</span>
      </div>

      <div className="lists-view">
        {/* New list input */}
        <div className="new-list-row">
          <input
            type="text"
            placeholder="New list name…"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createList()}
          />
          <button className="btn btn-green" onClick={createList} disabled={busy}>
            + List
          </button>
        </div>

        {active.length > 0 && <p className="section-title">Active lists</p>}

        {active.map(list => {
          const uc = uncheckedCount(list);
          return (
            <div key={list.id} className="list-card" onClick={() => onOpen(list)}>
              <span className="list-icon">📋</span>
              <div className="list-info">
                <div className="list-name">
                  {list.name}
                  {uc > 0 && <span className="badge">{uc}</span>}
                </div>
                <div className="list-meta">
                  {(list.items || []).length} item{(list.items || []).length !== 1 ? "s" : ""}
                  {list.createdAt ? ` · ${formatDate(list.createdAt)}` : ""}
                </div>
              </div>
              <span className="list-arrow">›</span>
            </div>
          );
        })}

        {error && <p className="error-msg">{error}</p>}

        {active.length === 0 && (
          <div className="empty-state">
            <div className="icon">📋</div>
            <p>No lists yet. Create one above!</p>
          </div>
        )}

        <div className="lists-footer">
          <button className="btn btn-gray" onClick={onHistory} style={{ flex: 1 }}>
            📂 List History{archived.length > 0 ? ` (${archived.length})` : ""}
          </button>
          <button className="btn btn-gray" onClick={onLeave} title="Leave room">
            🚪
          </button>
        </div>
      </div>
    </div>
  );
}
