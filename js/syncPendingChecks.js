import { db, doc, runTransaction } from "./firebase.js";
import {
  isOfflineError,
  listIdsWithPendingChecks,
  loadPendingChecks,
  savePendingChecks,
} from "./pendingChecks.js";

const syncing = new Set();
const rerun = new Set();

/**
 * Write locally saved check marks onto the latest server list.
 * Transactions cannot queue offline, so callers keep the marks in localStorage
 * and invoke this again once Firestore is reachable.
 */
export async function syncPendingChecks(roomId, listId) {
  if (!roomId || !listId) return { ok: false };
  const key = `${roomId}:${listId}`;
  if (syncing.has(key)) {
    rerun.add(key);
    return { ok: true, queued: true };
  }
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ok: false, offline: true };
  }

  syncing.add(key);
  try {
    return await commitPendingChecks(roomId, listId);
  } catch (err) {
    if (isOfflineError(err)) return { ok: false, offline: true };
    if (/deleted/i.test(err?.message || "")) {
      savePendingChecks(roomId, listId, {});
      return { ok: false, deleted: true };
    }
    return { ok: false, error: err };
  } finally {
    syncing.delete(key);
    if (rerun.delete(key)) void syncPendingChecks(roomId, listId);
  }
}

async function commitPendingChecks(roomId, listId) {
  const pending = loadPendingChecks(roomId, listId);
  const entries = Object.entries(pending);
  if (entries.length === 0) return { ok: true };

  const listRef = doc(db, "rooms", roomId, "lists", listId);
  await runTransaction(db, async tx => {
    const snap = await tx.get(listRef);
    if (!snap.exists()) throw new Error("List has been deleted.");
    const serverItems = snap.data().items || [];
    let changed = false;
    const nextItems = serverItems.map(item => {
      if (!Object.prototype.hasOwnProperty.call(pending, item.id)) return item;
      const checked = Boolean(pending[item.id]);
      if (Boolean(item.checked) === checked) return item;
      changed = true;
      return { ...item, checked };
    });
    if (changed) tx.update(listRef, { items: nextItems });
  });

  const current = loadPendingChecks(roomId, listId);
  const next = { ...current };
  let mutated = false;
  for (const [id, checked] of entries) {
    if (current[id] === Boolean(checked)) {
      delete next[id];
      mutated = true;
    }
  }
  if (mutated) savePendingChecks(roomId, listId, next);
  return { ok: true };
}

export function syncRoomPendingChecks(roomId) {
  if (!roomId) return Promise.resolve();
  return Promise.all(
    listIdsWithPendingChecks(roomId).map(listId => syncPendingChecks(roomId, listId)),
  );
}
