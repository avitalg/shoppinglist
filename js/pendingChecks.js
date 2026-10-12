import { LS } from "./utils.js";

const KEY_PREFIX = "fc_pending_checks:";

export function pendingChecksKey(roomId, listId) {
  return `${KEY_PREFIX}${roomId}:${listId}`;
}

/** Desired checked values that have not been confirmed by the server yet. */
export function loadPendingChecks(roomId, listId) {
  const value = LS.get(pendingChecksKey(roomId, listId), {});
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const pending = {};
  for (const [id, checked] of Object.entries(value)) {
    if (id) pending[id] = Boolean(checked);
  }
  return pending;
}

export function savePendingChecks(roomId, listId, pending) {
  const key = pendingChecksKey(roomId, listId);
  if (!pending || Object.keys(pending).length === 0) {
    try { localStorage.removeItem(key); } catch {}
    return;
  }
  LS.set(key, pending);
}

export function listIdsWithPendingChecks(roomId) {
  const prefix = `${KEY_PREFIX}${roomId}:`;
  const ids = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) ids.push(key.slice(prefix.length));
    }
  } catch {}
  return ids;
}

export function pendingChecksEqual(nextPending, savedPending) {
  const next = nextPending || {};
  const saved = savedPending || {};
  const ids = Object.keys(next);
  if (ids.length !== Object.keys(saved).length) return false;
  return ids.every(id => next[id] === saved[id]);
}

/**
 * Overlay local check marks onto server items.
 * Drops pending entries the server already matches, or items that no longer exist.
 */
export function reconcilePendingChecks(serverItems, pending) {
  const items = serverItems || [];
  const source = pending || {};
  const nextPending = {};
  for (const item of items) {
    if (!Object.prototype.hasOwnProperty.call(source, item.id)) continue;
    const checked = Boolean(source[item.id]);
    if (Boolean(item.checked) !== checked) nextPending[item.id] = checked;
  }
  return {
    pending: nextPending,
    items: items.map(item => (
      Object.prototype.hasOwnProperty.call(nextPending, item.id)
        ? { ...item, checked: nextPending[item.id] }
        : item
    )),
  };
}

export function isOfflineError(err) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  const code = err?.code || "";
  if (code === "unavailable" || code === "deadline-exceeded") return true;
  const msg = String(err?.message || "");
  return /offline|network|unavailable|failed to get document/i.test(msg);
}
