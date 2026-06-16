import { useState, useEffect, useRef } from "react";
import "./ListDetail.css";
import {
  db, doc, onSnapshot, updateDoc, setDoc, collection, runTransaction, increment,
} from "../firebase.js";
import { CATEGORIES, CATEGORY_BY_ID, DEFAULT_CATEGORY, detectCategory } from "../categories.js";

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * A single item row with check, text, meta, and delete button.
 *
 * @param {{ item: object, onToggle: Function, onDelete: Function }} props
 */
function ItemRow({ item, onToggle, onDelete }) {
  return (
    <div className="item-row">
      <button
        className={`item-check ${item.checked ? "checked" : ""}`}
        onClick={() => onToggle(item.id)}
        role="checkbox"
        aria-checked={item.checked}
        aria-label={item.checked ? "Uncheck item" : "Check item"}
        type="button"
      />
      <div className="item-body">
        <div className={`item-text ${item.checked ? "checked" : ""}`}>{item.text}</div>
        {item.note       && <div className="item-note">📝 {item.note}</div>}
        {item.assignedTo && <div className="item-assigned">👤 {item.assignedTo}</div>}
      </div>
      <button className="item-delete" onClick={() => onDelete(item.id)} aria-label="Delete item">
        ✕
      </button>
    </div>
  );
}

/**
 * A collapsible category section header + its items.
 *
 * @param {{ category: object, items: object[], onToggle: Function, onDelete: Function }} props
 */
function CategorySection({ category, items, onToggle, onDelete }) {
  const [collapsed, setCollapsed] = useState(false);
  const checkedCount   = items.filter(i => i.checked).length;
  const uncheckedCount = items.length - checkedCount;

  return (
    <div className="category-section">
      <button
        className="category-header"
        onClick={() => setCollapsed(v => !v)}
        style={{ "--cat-color": `var(${category.color})` }}
        aria-expanded={!collapsed}
      >
        <span className="category-icon">{category.icon}</span>
        <span className="category-label">{category.label}</span>
        <span className="category-count">
          {uncheckedCount > 0
            ? `${uncheckedCount} left`
            : <span className="category-done">✓ done</span>
          }
        </span>
        <span className="category-chevron">{collapsed ? "›" : "⌄"}</span>
      </button>

      {!collapsed && (
        <div className="category-items">
          {items.map(item => (
            <ItemRow
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Group a flat item array into an ordered array of { category, items } buckets.
 * Preserves the display order defined in CATEGORIES.
 *
 * @param {object[]} items
 * @returns {{ category: object, items: object[] }[]}
 */
function groupByCategory(items) {
  const map = new Map(CATEGORIES.map(c => [c.id, []]));

  for (const item of items) {
    const catId = item.category ?? "other";
    const bucket = map.get(catId) ?? map.get("other");
    bucket.push(item);
  }

  return CATEGORIES
    .map(cat => ({ category: cat, items: map.get(cat.id) }))
    .filter(group => group.items.length > 0);
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ListDetail({ list, session, onBack }) {
  const [liveList,     setLiveList]     = useState(list);
  const [text,         setText]         = useState("");
  const [note,         setNote]         = useState("");
  const [assignTo,     setAssignTo]     = useState("");
  const [category,     setCategory]     = useState("other");
  const [suggestions,  setSugg]         = useState([]);
  const [history,      setHistory]      = useState([]);
  const [showDetails,  setShowDetails]  = useState(false);
  const [editingName,  setEditingName]  = useState(false);
  const [nameDraft,    setNameDraft]    = useState(list.name);
  const [dupWarning,   setDupWarning]   = useState(false);
  const [error,        setError]        = useState("");

  const inputRef = useRef(null);
  const nameRef  = useRef(null);
  const listRef  = doc(db, "rooms", session.roomId, "lists", list.id);
  const histRef  = collection(db, "rooms", session.roomId, "itemHistory");

  // ── Effects ────────────────────────────────────────────────────────────────

  /** Live-sync the list document from Firestore. */
  useEffect(() => {
    return onSnapshot(
      listRef,
      snap => {
        if (snap.exists()) {
          setLiveList({ id: snap.id, ...snap.data() });
        } else {
          setError("This list was deleted.");
          onBack();
        }
      },
      () => setError("Lost connection. Please refresh."),
    );
  }, [list.id]);

  /** Load item history for smart suggestions, sorted by frequency. */
  useEffect(() => {
    return onSnapshot(
      histRef,
      snap => {
        const entries = snap.docs
          .map(d => ({ word: d.id, count: d.data().count || 0 }))
          .sort((a, b) => b.count - a.count);
        setHistory(entries);
      },
      () => {}, // history errors are non-critical
    );
  }, [session.roomId]);

  /** Filter autocomplete suggestions as the user types. */
  useEffect(() => {
    const q = text.trim().toLowerCase();
    if (!q) { setSugg([]); return; }
    setSugg(
      history
        .filter(h => h.word.toLowerCase().startsWith(q) && h.word.toLowerCase() !== q)
        .slice(0, 5)
        .map(h => h.word)
    );
  }, [text, history]);

  /** Auto-detect category whenever the item text changes. */
  useEffect(() => {
    if (text.trim()) {
      setCategory(detectCategory(text).id);
    }
  }, [text]);

  /** Keep name draft in sync unless user is actively editing. */
  useEffect(() => {
    if (!editingName) setNameDraft(liveList.name);
  }, [liveList.name, editingName]);

  /** Focus the rename input when it appears. */
  useEffect(() => {
    if (editingName) nameRef.current?.focus();
  }, [editingName]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  /**
   * Add a new item to the list and increment its frequency counter.
   * @param {string} [overrideText] - Use instead of the text input (e.g. from suggestion click).
   */
  async function addItem(overrideText) {
    const itemText = (overrideText || text).trim();
    if (!itemText) return;

    setDupWarning(false);
    setError("");

    try {
      let isDuplicate = false;

      await runTransaction(db, async tx => {
        const snap = await tx.get(listRef);
        if (!snap.exists()) throw new Error("List has been deleted.");

        const currentItems = snap.data().items || [];
        isDuplicate = currentItems.some(
          i => i.text.toLowerCase() === itemText.toLowerCase()
        );
        if (isDuplicate) return;

        const resolvedCategory = overrideText ? detectCategory(overrideText).id : category;
        const newItem = {
          id:         crypto.randomUUID(),
          text:       itemText,
          note:       note.trim(),
          assignedTo: assignTo.trim(),
          category:   resolvedCategory,
          checked:    false,
        };
        tx.update(listRef, { items: [...currentItems, newItem] });
      });

      if (isDuplicate) {
        setDupWarning(true);
        setTimeout(() => setDupWarning(false), 3000);
        return;
      }

      // History update is best-effort and atomic — no read required
      const wordKey    = itemText.toLowerCase();
      const wordDocRef = doc(db, "rooms", session.roomId, "itemHistory", wordKey);
      await setDoc(wordDocRef, { count: increment(1) }, { merge: true });

      setText("");
      setNote("");
      setAssignTo("");
      setCategory("other");
      setSugg([]);
      inputRef.current?.focus();
    } catch (err) {
      setError(err.message || "Failed to add item. Please try again.");
    }
  }

  /** Toggle the checked state of an item by id. */
  async function toggleCheck(id) {
    setError("");
    // Flip immediately so the UI responds on tap, not after the Firestore
    // round-trip. If the transaction fails, toggle back to revert.
    setLiveList(prev => ({
      ...prev,
      items: (prev.items || []).map(i => i.id === id ? { ...i, checked: !i.checked } : i),
    }));
    try {
      await runTransaction(db, async tx => {
        const snap = await tx.get(listRef);
        if (!snap.exists()) throw new Error("List has been deleted.");
        const items = (snap.data().items || []).map(i =>
          i.id === id ? { ...i, checked: !i.checked } : i
        );
        tx.update(listRef, { items });
      });
    } catch (err) {
      // Revert the optimistic update
      setLiveList(prev => ({
        ...prev,
        items: (prev.items || []).map(i => i.id === id ? { ...i, checked: !i.checked } : i),
      }));
      setError("Failed to update item.");
    }
  }

  /** Remove an item from the list by id. */
  async function deleteItem(id) {
    setError("");
    try {
      await runTransaction(db, async tx => {
        const snap = await tx.get(listRef);
        if (!snap.exists()) return;
        tx.update(listRef, {
          items: (snap.data().items || []).filter(i => i.id !== id),
        });
      });
    } catch (err) {
      setError("Failed to delete item.");
    }
  }

  /** Remove all checked items from the list. */
  async function clearChecked() {
    setError("");
    try {
      await runTransaction(db, async tx => {
        const snap = await tx.get(listRef);
        if (!snap.exists()) return;
        tx.update(listRef, {
          items: (snap.data().items || []).filter(i => !i.checked),
        });
      });
    } catch (err) {
      setError("Failed to clear checked items.");
    }
  }

  /** Archive the list and return to the lists view. */
  /** Share the list via the native share sheet or WhatsApp fallback. */
  function shareList() {
    const unchecked = items.filter(i => !i.checked);
    const checked   = items.filter(i =>  i.checked);

    let text = `🛒 ${liveList.name}\n\n`;

    if (unchecked.length > 0) {
      groupByCategory(unchecked).forEach(({ category: cat, items: catItems }) => {
        text += `${cat.icon} ${cat.label}:\n`;
        catItems.forEach(item => {
          text += `  • ${item.text}`;
          if (item.note)       text += ` (${item.note})`;
          if (item.assignedTo) text += ` → ${item.assignedTo}`;
          text += "\n";
        });
        text += "\n";
      });
    }

    if (checked.length > 0) {
      text += `✓ Already got (${checked.length}):\n`;
      checked.forEach(item => { text += `  ✓ ${item.text}\n`; });
      text += "\n";
    }

    text += `Shared via GrocerieShop 🛒`;

    if (navigator.share) {
      navigator.share({ title: liveList.name, text }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  }

  async function archiveList() {
    setError("");
    try {
      await updateDoc(listRef, { status: "archived" });
      onBack();
    } catch (err) {
      setError("Failed to archive list.");
    }
  }

  /** Persist a renamed list title. */
  async function saveRename() {
    const name = nameDraft.trim();
    if (!name || name === liveList.name) {
      setNameDraft(liveList.name);
      setEditingName(false);
      return;
    }
    try {
      await updateDoc(listRef, { name });
    } catch (err) {
      setError("Failed to rename list.");
    }
    setEditingName(false);
  }

  function cancelRename() {
    setNameDraft(liveList.name);
    setEditingName(false);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const items    = liveList.items || [];
  const checked  = items.filter(i => i.checked);
  const groups   = groupByCategory(items);
  const activeCat = CATEGORY_BY_ID[category] ?? DEFAULT_CATEGORY;

  return (
    <div className="list-detail">
      {/* Header */}
      <div className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        {editingName ? (
          <input
            ref={nameRef}
            className="header-title-input"
            value={nameDraft}
            onChange={e => setNameDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter")  saveRename();
              if (e.key === "Escape") cancelRename();
            }}
            onBlur={saveRename}
          />
        ) : (
          <h1 className="editable" onClick={() => setEditingName(true)} title="Tap to rename">
            {liveList.name}
            <span className="rename-hint">✏️</span>
          </h1>
        )}
        {checked.length > 0 && (
          <button className="btn btn-gray btn-sm" onClick={clearChecked}>Clear ✓</button>
        )}
        <button className="btn btn-gray btn-sm" onClick={shareList} title="Share list">📤</button>
        <button className="btn btn-gray btn-sm" onClick={archiveList}>Archive</button>
      </div>

      {error && (
        <div className="error-banner" role="alert" onClick={() => setError("")}>
          ⚠️ {error}
        </div>
      )}

      {/* Grouped item list */}
      <div className="body">
        {items.length === 0 && (
          <div className="empty-state">
            <div className="icon">🛒</div>
            <p>List is empty. Add your first item below!</p>
          </div>
        )}

        {groups.map(({ category: cat, items: catItems }) => (
          <CategorySection
            key={cat.id}
            category={cat}
            items={catItems}
            onToggle={toggleCheck}
            onDelete={deleteItem}
          />
        ))}
      </div>

      {/* Add bar */}
      <div className="add-bar">
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map(s => (
              <div key={s} className="suggestion-item" onPointerDown={() => addItem(s)}>
                <span className="suggestion-cat-icon">{detectCategory(s).icon}</span>
                {s}
              </div>
            ))}
          </div>
        )}

        {dupWarning && (
          <div className="dup-warning" role="alert">
            ⚠️ "{text.trim()}" is already in this list
          </div>
        )}

        <div className="add-bar-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add item…"
            value={text}
            onChange={e => { setText(e.target.value); setDupWarning(false); }}
            onKeyDown={e => e.key === "Enter" && addItem()}
          />
          <button className="btn btn-green" onClick={() => addItem()}>+</button>
        </div>

        {/* Category pill — always visible, auto-updates as you type */}
        <div className="category-picker-row">
          <span className="category-pill-label">Category:</span>
          <div className="category-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${category === cat.id ? "active" : ""}`}
                onClick={() => setCategory(cat.id)}
                title={cat.label}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional note / assign details */}
        <div>
          <button
            className="btn btn-gray btn-details"
            onClick={() => setShowDetails(v => !v)}
          >
            {showDetails ? "Hide details" : "Add note / assign"}
          </button>
        </div>

        {showDetails && (
          <div className="add-bar-details">
            <input
              type="text"
              placeholder="Note (e.g. 2% fat)"
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ flex: 1, minWidth: 0 }}
            />
            <input
              type="text"
              placeholder="Assign to…"
              value={assignTo}
              onChange={e => setAssignTo(e.target.value)}
              style={{ flex: 1, minWidth: 0 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
