import { useState, useEffect } from "react";
import "./HistoryView.css";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { db, collection, doc, deleteDoc, onSnapshot, query, orderBy } from "../firebase.js";
import { formatDate } from "../utils.js";
import { useT } from "../i18n.js";
import { trackEvent } from "../analytics.js";

export default function HistoryView({ session, onBack }) {
  const t = useT();
  const [lists,    setLists]   = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    });
  }, [session.roomId]);

  function toggleExpand(id) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    const list = lists.find(l => l.id === id);
    trackEvent("expand_history_list", { item_count: (list?.items || []).length });
    setExpanded(id);
  }

  async function deleteList() {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    const itemCount = (pendingDelete.items || []).length;
    setPendingDelete(null);
    setExpanded(prev => (prev === id ? null : prev));
    try {
      await deleteDoc(doc(db, "rooms", session.roomId, "lists", id));
      trackEvent("delete_list", { source: "history", item_count: itemCount });
    } catch {
      /* snapshot listener will surface remaining lists either way */
    }
  }

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>{t("listHistoryTitle")}</h1>
      </div>

      <div className="history-view">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>{t("loadingHistory")}</p>
          </div>
        )}

        {!loading && lists.length === 0 && (
          <div className="empty-state">
            <div className="icon">📂</div>
            <p>{t("noArchivedLists")}</p>
          </div>
        )}

        {lists.map(list => (
          <div key={list.id} className="archive-card" onClick={() => toggleExpand(list.id)}>
            <div className="archive-card-header">
              <div>
                <h4>📋 {list.name}</h4>
                <p>
                  {t("itemsCount", (list.items || []).length)} · {formatDate(list.createdAt)}
                </p>
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
            </div>

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
