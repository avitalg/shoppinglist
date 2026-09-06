import { useState, useEffect } from "react";
import "./ListsView.css";
import { db, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "../firebase.js";
import { formatDate } from "../utils.js";
import { useT } from "../i18n.js";

export default function ListsView({ session, onOpen, onHistory, onLeave, onListsLoaded }) {
  const t = useT();
  const [lists,   setLists]   = useState([]);
  const [newName, setNewName] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString("he-IL", { day: "numeric", month: "numeric", year: "numeric" });
  });
  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "rooms", session.roomId, "lists"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(
      q,
      snap => {
        const loaded = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setLists(loaded);
        onListsLoaded?.(loaded);
        setLoading(false);
      },
      () => {
        setError(t("lostConnection"));
        setLoading(false);
      },
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
      setNewName(new Date().toLocaleDateString("he-IL", { day: "numeric", month: "numeric", year: "numeric" }));
    } catch {
      setError(t("createListFailed"));
    } finally {
      setBusy(false);
    }
  }

  const active   = lists.filter(l => l.status == null || l.status === "active");
  const archived = lists.filter(l => l.status === "archived");
  const uncheckedCount = list => (list.items || []).filter(i => !i.checked).length;

  function shareRoom() {
    const spaceName = session.roomName || session.roomId;
    const text  = t("shareRoomText", spaceName, session.roomId);
    const title = t("shareRoomTitle", spaceName);

    if (navigator.share) {
      navigator.share({ title, text }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  }

  return (
    <div>
      <div className="header">
        <span style={{ fontSize: "1.4rem" }}>🛒</span>
        <div className="header-room-info">
          <h1>{session.roomName || "GrocerieShop"}</h1>
          <span className="room-code-tag">{session.roomId}</span>
        </div>
      </div>

      <div className="lists-view">
        <div className="new-list-row">
          <input
            type="text"
            placeholder={t("newListPlaceholder")}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createList()}
          />
          <button className="btn btn-green" onClick={createList} disabled={busy}>
            {t("addListBtn")}
          </button>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>{t("loadingLists")}</p>
          </div>
        )}

        {!loading && active.length > 0 && <p className="section-title">{t("activeLists")}</p>}

        {active.map(list => {
          const uc = uncheckedCount(list);
          const itemCount = (list.items || []).length;
          return (
            <div key={list.id} className="list-card" onClick={() => onOpen(list)}>
              <span className="list-icon">📋</span>
              <div className="list-info">
                <div className="list-name">
                  {list.name}
                  {uc > 0 && <span className="badge">{uc}</span>}
                </div>
                <div className="list-meta">
                  {itemCount} {itemCount === 1 ? t("item") : t("items")}
                  {list.createdAt ? ` · ${formatDate(list.createdAt)}` : ""}
                </div>
              </div>
              <span className="list-arrow">→</span>
            </div>
          );
        })}

        {error && <p className="error-msg">{error}</p>}

        {!loading && !error && active.length === 0 && (
          <div className="empty-state">
            <div className="icon">📋</div>
            <p>{t("noLists")}</p>
          </div>
        )}

        <div className="lists-footer">
          <button className="btn btn-gray" onClick={onHistory} style={{ flex: 1 }}>
            📂 {t("listHistory")}{archived.length > 0 ? ` (${archived.length})` : ""}
          </button>
          <button className="btn btn-green" onClick={shareRoom} title={t("inviteFamily")}>
            📤
          </button>
          <button className="btn btn-gray" onClick={onLeave} title={t("leaveRoom")}>
            🚪
          </button>
        </div>
      </div>
    </div>
  );
}
