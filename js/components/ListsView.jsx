import { useState, useEffect } from "react";
import "./ListsView.css";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { db, collection, doc, onSnapshot, addDoc, deleteDoc, serverTimestamp, query, orderBy } from "../firebase.js";
import { formatDate, shareViaWhatsApp } from "../utils.js";
import { useT } from "../i18n.js";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
  const [pendingDelete, setPendingDelete] = useState(null);

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

  async function deleteList() {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setPendingDelete(null);
    setError("");
    try {
      await deleteDoc(doc(db, "rooms", session.roomId, "lists", id));
    } catch {
      setError(t("deleteListFailed"));
    }
  }

  const active   = lists.filter(l => l.status == null || l.status === "active");
  const archived = lists.filter(l => l.status === "archived");
  const uncheckedCount = list => (list.items || []).filter(i => !i.checked).length;

  function shareRoom() {
    const spaceName = session.roomName || session.roomId;
    shareViaWhatsApp(t("shareRoomText", spaceName, session.roomId));
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
              <button
                type="button"
                className="list-delete"
                aria-label={t("deleteList")}
                title={t("deleteList")}
                onClick={e => {
                  e.stopPropagation();
                  setPendingDelete(list);
                }}
                onPointerDown={e => e.stopPropagation()}
              >
                ✕
              </button>
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

        <button
          className="btn btn-whatsapp btn-full"
          onClick={shareRoom}
          title={t("inviteFamily")}
        >
          <WhatsAppIcon />
          {t("shareViaWhatsApp")}
        </button>

        <div className="lists-footer">
          <button className="btn btn-gray" onClick={onHistory} style={{ flex: 1 }}>
            📂 {t("listHistory")}{archived.length > 0 ? ` (${archived.length})` : ""}
          </button>
          <button className="btn btn-gray" onClick={onLeave} title={t("leaveRoom")}>
            🚪
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title={t("deleteListTitle")}
        message={t("deleteListMessage", pendingDelete?.name || "")}
        confirmLabel={t("deleteListConfirm")}
        cancelLabel={t("cancel")}
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={deleteList}
      />
    </div>
  );
}
