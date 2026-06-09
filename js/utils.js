// ── Local storage helpers ─────────────────────────────────────────────────────
export const LS = {
  get: (key, defaultValue) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue; // key not present
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

// ── Generate a cryptographically random 6-character room code ────────────────
const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function genCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => CODE_CHARS[b % CODE_CHARS.length]).join("");
}

// ── Format a Firestore timestamp (or Date) to a readable string ───────────────
export function formatDate(d) {
  if (!d) return "";
  const dt = d.toDate ? d.toDate() : new Date(d);
  return dt.toLocaleDateString(undefined, {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}
