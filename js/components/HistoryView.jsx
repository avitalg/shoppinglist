import { useState, useEffect } from "react";
import { db, collection, onSnapshot, query, orderBy } from "../firebase.js";
import { formatDate } from "../utils.js";

export default function HistoryView({ session, onBack }) {
  const [lists,    setLists]   = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", session.roomId, "lists"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, snap => {
      setLists(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(l => l.status === "archived")
      );
    });
  }, [session.roomId]);

  function toggleExpand(id) {
    setExpanded(prev => (prev === id ? null : id));
  }

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={onBack}>‹</button>
        <h1>List History</h1>
      </div>

      <div className="history-view">
        {lists.length === 0 && (
          <div className="empty-state">
            <div className="icon">📂</div>
            <p>No archived lists yet.</p>
          </div>
        )}

        {lists.map(list => (
          <div key={list.id} className="archive-card" onClick={() => toggleExpand(list.id)}>
            <h4>📋 {list.name}</h4>
            <p>
              {(list.items || []).length} items · {formatDate(list.createdAt)}
            </p>

            {expanded === list.id && (
              <div className="archive-items">
                {(list.items || []).map(item => (
                  <div
                    key={item.id}
                    className={item.checked ? "archive-item--checked" : ""}
                  >
                    {item.checked ? "✓" : "○"} {item.text}
                    {item.assignedTo ? ` (${item.assignedTo})` : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
