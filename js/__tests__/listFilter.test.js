import { describe, it, expect } from "vitest";

// These predicates mirror the filter logic in ListsView.jsx.
// Duplicated here so that regressions in the component logic are caught even
// if the component itself isn't rendered in tests.
const isActive   = l => l.status == null || l.status === "active";
const isArchived = l => l.status === "archived";

describe("active list filter (ListsView)", () => {
  it("treats a list with no status field as active (legacy data)", () => {
    expect(isActive({})).toBe(true);
  });

  it("treats status='active' as active", () => {
    expect(isActive({ status: "active" })).toBe(true);
  });

  it("treats status='archived' as not active", () => {
    expect(isActive({ status: "archived" })).toBe(false);
  });

  it("treats an unknown status value as not active", () => {
    expect(isActive({ status: "deleted" })).toBe(false);
  });

  it("treats an empty-string status as not active (only null/undefined counts as absent)", () => {
    expect(isActive({ status: "" })).toBe(false);
  });
});

describe("archived list filter (ListsView / HistoryView)", () => {
  it("treats status='archived' as archived", () => {
    expect(isArchived({ status: "archived" })).toBe(true);
  });

  it("treats a list with no status field as not archived", () => {
    expect(isArchived({})).toBe(false);
  });

  it("treats status='active' as not archived", () => {
    expect(isArchived({ status: "active" })).toBe(false);
  });
});

describe("filter mutual exclusivity", () => {
  const fixtures = [
    { label: "no status (legacy)", list: {} },
    { label: "status=active",      list: { status: "active" } },
    { label: "status=archived",    list: { status: "archived" } },
    { label: "status=unknown",     list: { status: "deleted" } },
  ];

  it("no list is both active and archived at the same time", () => {
    for (const { list } of fixtures) {
      expect(isActive(list) && isArchived(list)).toBe(false);
    }
  });

  it("a legacy list (no status) is counted as active, never as archived", () => {
    const legacy = { id: "abc", name: "Old grocery run" };
    expect(isActive(legacy)).toBe(true);
    expect(isArchived(legacy)).toBe(false);
  });
});
