import { useState, useEffect, useRef, useContext } from "react";
import "./ListDetail.css";
import {
  db, doc, onSnapshot, updateDoc, setDoc, collection, runTransaction, increment,
} from "../firebase.js";
import { CATEGORIES, CATEGORY_BY_ID, DEFAULT_CATEGORY, detectCategory } from "../categories.js";
import { LS } from "../utils.js";
import { useT, LanguageContext } from "../i18n.js";

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * A single item row with check, text, meta, and delete button.
 *
 * @param {{ item: object, onToggle: Function, onDelete: Function }} props
 */
function ItemRow({ item, onToggle, onDelete }) {
  const t = useT();
  return (
    <div className="item-row">
      <button
        className={`item-check ${item.checked ? "checked" : ""}`}
        onClick={() => onToggle(item.id)}
        role="checkbox"
        aria-checked={item.checked}
        aria-label={item.checked ? t("uncheckItem") : t("checkItem")}
        type="button"
      />
      <div className="item-body">
        <div className={`item-text ${item.checked ? "checked" : ""}`}>{item.text}</div>
        {item.note       && <div className="item-note">📝 {item.note}</div>}
        {item.assignedTo && <div className="item-assigned">👤 {item.assignedTo}</div>}
      </div>
      <button className="item-delete" onClick={() => onDelete(item.id)} aria-label={t("deleteItem")}>
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
  const t    = useT();
  const lang = useContext(LanguageContext);
  const catLabel = lang === "en" ? (category.labelEn || category.label) : category.label;
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
        <span className="category-label">{catLabel}</span>
        <span className="category-count">
          {uncheckedCount > 0
            ? t("leftCount", uncheckedCount)
            : <span className="category-done">{t("doneLabel")}</span>
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

// ── Voice input hook ──────────────────────────────────────────────────────────

const FILLER_RE = /^(add|please|i need|i want|put|get|buy|תוסיף|אני צריך|תביא|קנה|שים)\s+/i;

const VOICE_LANGS = [
  { code: "he-IL", label: "עב" },
  { code: "en-US", label: "EN" },
];

/** Split a spoken phrase into individual item names. */
function parseSpokenItems(phrase) {
  return phrase
    .split(/,\s*|\s+and\s+/i)
    .map(s => s.replace(FILLER_RE, "").trim())
    .filter(Boolean);
}

/**
 * Wraps the Web Speech API.
 * @param {{ onInterim: (t:string)=>void, onFinal: (items:string[])=>void, onError: (msg:string)=>void }} handlers
 */
function useVoiceInput({ onInterim, onFinal, onError, lang }) {
  const recRef      = useRef(null);
  const activeRef   = useRef(false);   // true while the user wants to keep recording
  const [listening, setListening] = useState(false);
  const supported = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Keep latest callbacks in a ref so handlers never close over stale state
  const cbRef = useRef({ onInterim, onFinal, onError });
  useEffect(() => { cbRef.current = { onInterim, onFinal, onError }; });

  // Keep latest lang in a ref
  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  function startRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    // continuous:true is unreliable on iOS Safari — we restart manually in onend instead
    rec.continuous     = false;
    rec.interimResults = true;
    rec.lang           = langRef.current || "he-IL";

    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          const items = parseSpokenItems(result[0].transcript);
          if (items.length) cbRef.current.onFinal(items);
        } else {
          interim += result[0].transcript;
        }
      }
      cbRef.current.onInterim(interim);
    };

    rec.onerror = (e) => {
      // "aborted" and "no-speech" are normal end conditions on iOS — not real errors
      if (e.error !== "aborted" && e.error !== "no-speech") {
        activeRef.current = false;
        setListening(false);
        cbRef.current.onError(e.error);
      }
    };

    rec.onend = () => {
      // Auto-restart while the user hasn't tapped stop — required for iOS
      if (activeRef.current) {
        startRec();
      } else {
        setListening(false);
      }
    };

    rec.start();
    recRef.current = rec;
  }

  function toggle() {
    if (activeRef.current) {
      activeRef.current = false;
      recRef.current?.stop();
      return;
    }
    activeRef.current = true;
    setListening(true);
    startRec();
  }

  // Stop recognition if component unmounts while listening
  useEffect(() => () => {
    activeRef.current = false;
    recRef.current?.stop();
  }, []);

  return { listening, supported, toggle };
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ListDetail({ list, session, onBack }) {
  const t    = useT();
  const lang = useContext(LanguageContext);
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
  const [voiceLang,    setVoiceLang]    = useState(() => LS.get("fc_voice_lang", "he-IL"));

  const inputRef = useRef(null);
  const nameRef  = useRef(null);

  function cycleVoiceLang() {
    const next = voiceLang === "he-IL" ? "en-US" : "he-IL";
    setVoiceLang(next);
    LS.set("fc_voice_lang", next);
  }

  const voice = useVoiceInput({
    onInterim: (interim) => { if (interim) setText(interim); },
    onFinal:   (items)   => {
      setText("");
      items.forEach(item => addItem(item));
    },
    onError:   (msg)     => setError(t("micError", msg)),
    lang:      voiceLang,
  });
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
          setError(t("listDeleted"));
          onBack();
        }
      },
      () => setError(t("listLostConnection")),
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
      setError(err.message || t("addItemFailed"));
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
      setError(t("updateItemFailed"));
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
      setError(t("deleteItemFailed"));
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
      setError(t("clearCheckedFailed"));
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
        const label = lang === "en" ? (cat.labelEn || cat.label) : cat.label;
        text += `${cat.icon} ${label}:\n`;
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
      text += `${t("shareListAlreadyGot", checked.length)}\n`;
      checked.forEach(item => { text += `  ✓ ${item.text}\n`; });
      text += "\n";
    }

    text += t("shareListFooter");

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
      setError(t("archiveFailed"));
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
      setError(t("renameFailed"));
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
        <button className="back-btn" onClick={onBack}>→</button>
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
          <h1 className="editable" onClick={() => setEditingName(true)} title={t("tapToRename")}>
            {liveList.name}
            <span className="rename-hint">✏️</span>
          </h1>
        )}
        {checked.length > 0 && (
          <button className="btn btn-gray btn-sm" onClick={clearChecked}>{t("clearChecked")}</button>
        )}
        <button className="btn btn-gray btn-sm" onClick={shareList} title={t("shareList")}>↗</button>
        <button className="btn btn-gray btn-sm" onClick={archiveList} title={t("archiveList")}>📦</button>
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
            <p>{t("emptyList")}</p>
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
            {t("alreadyInList", text.trim())}
          </div>
        )}

        <div className="add-bar-row">
          <input
            ref={inputRef}
            type="text"
            placeholder={voice.listening ? t("listeningPlaceholder") : t("addItemPlaceholder")}
            value={text}
            onChange={e => { setText(e.target.value); setDupWarning(false); }}
            onKeyDown={e => e.key === "Enter" && addItem()}
            readOnly={voice.listening}
          />
          {voice.supported && (
            <button
              type="button"
              className="lang-toggle"
              onClick={cycleVoiceLang}
              disabled={voice.listening}
              title={t("switchLang")}
              aria-label={t("switchLang")}
            >
              {VOICE_LANGS.find(l => l.code === voiceLang)?.label}
            </button>
          )}
          {voice.supported && (
            <button
              type="button"
              className={`mic-btn ${voice.listening ? "listening" : ""}`}
              onClick={voice.toggle}
              aria-label={voice.listening ? t("stopRecording") : t("speakToAdd")}
              title={voice.listening ? t("stopRecording") : t("speakToAdd")}
            >
              🎙
            </button>
          )}
          <button className="btn btn-green" onClick={() => addItem()}>+</button>
        </div>

        {/* Category pill — always visible, auto-updates as you type */}
        <div className="category-picker-row">
          <span className="category-pill-label">{t("categoryLabel")}</span>
          <div className="category-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${category === cat.id ? "active" : ""}`}
                onClick={() => setCategory(cat.id)}
                title={lang === "en" ? (cat.labelEn || cat.label) : cat.label}
              >
                {cat.icon} {lang === "en" ? (cat.labelEn || cat.label) : cat.label}
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
            {showDetails ? t("hideDetails") : t("addDetails")}
          </button>
        </div>

        {showDetails && (
          <div className="add-bar-details">
            <input
              type="text"
              placeholder={t("notePlaceholder")}
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ flex: 1, minWidth: 0 }}
            />
            <input
              type="text"
              placeholder={t("assignPlaceholder")}
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
