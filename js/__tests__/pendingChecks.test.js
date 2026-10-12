import { beforeEach, describe, expect, it } from "vitest";
import {
  isOfflineError,
  listIdsWithPendingChecks,
  loadPendingChecks,
  pendingChecksEqual,
  reconcilePendingChecks,
  savePendingChecks,
} from "../pendingChecks.js";

describe("pending checks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("keeps a local check when the server item is still unchecked", () => {
    const server = [{ id: "milk", text: "Milk", checked: false }];
    const { items, pending } = reconcilePendingChecks(server, { milk: true });
    expect(items[0].checked).toBe(true);
    expect(pending).toEqual({ milk: true });
  });

  it("keeps a local uncheck when the server item is still checked", () => {
    const server = [{ id: "milk", text: "Milk", checked: true }];
    const { items, pending } = reconcilePendingChecks(server, { milk: false });
    expect(items[0].checked).toBe(false);
    expect(pending).toEqual({ milk: false });
  });

  it("drops a pending mark once the server already matches it", () => {
    const server = [
      { id: "milk", text: "Milk", checked: true },
      { id: "eggs", text: "Eggs", checked: false },
    ];
    const { items, pending } = reconcilePendingChecks(server, { milk: true, eggs: true });
    expect(items.map(item => item.checked)).toEqual([true, true]);
    expect(pending).toEqual({ eggs: true });
  });

  it("drops pending marks for items that were deleted", () => {
    const { items, pending } = reconcilePendingChecks(
      [{ id: "eggs", text: "Eggs", checked: false }],
      { milk: true },
    );
    expect(items).toHaveLength(1);
    expect(pending).toEqual({});
  });

  it("round-trips pending marks through localStorage and removes an empty map", () => {
    savePendingChecks("ROOM", "list-1", { milk: true, eggs: false });
    expect(loadPendingChecks("ROOM", "list-1")).toEqual({ milk: true, eggs: false });
    expect(listIdsWithPendingChecks("ROOM")).toEqual(["list-1"]);

    savePendingChecks("ROOM", "list-1", {});
    expect(loadPendingChecks("ROOM", "list-1")).toEqual({});
    expect(listIdsWithPendingChecks("ROOM")).toEqual([]);
    expect(localStorage.getItem("fc_pending_checks:ROOM:list-1")).toBeNull();
  });

  it("compares pending maps by value", () => {
    expect(pendingChecksEqual({ milk: true }, { milk: true })).toBe(true);
    expect(pendingChecksEqual({ milk: true }, { milk: false })).toBe(false);
    expect(pendingChecksEqual({}, { milk: true })).toBe(false);
  });

  it("treats an offline client and Firestore unavailable errors as offline", () => {
    expect(isOfflineError({ code: "unavailable", message: "Failed to get document because the client is offline." })).toBe(true);
    expect(isOfflineError({ message: "Failed to update item." })).toBe(false);
  });
});
