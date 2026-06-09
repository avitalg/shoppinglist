import { describe, it, expect, beforeEach, vi } from "vitest";
import { genCode, formatDate, LS } from "../utils.js";

// ── genCode ───────────────────────────────────────────────────────────────────

describe("genCode", () => {
  it("returns a 6-character string", () => {
    expect(genCode()).toHaveLength(6);
  });

  it("returns only uppercase alphanumeric characters", () => {
    for (let i = 0; i < 20; i++) {
      expect(genCode()).toMatch(/^[A-Z0-9]{6}$/);
    }
  });

  it("generates different codes on successive calls", () => {
    const codes = new Set(Array.from({ length: 50 }, genCode));
    expect(codes.size).toBeGreaterThan(1);
  });
});

// ── formatDate ────────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("returns empty string for null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("accepts a plain JS Date", () => {
    const d = new Date("2024-06-15");
    const result = formatDate(d);
    expect(result).toMatch(/Jun/);
    expect(result).toMatch(/2024/);
  });

  it("accepts a Firestore-style timestamp object with .toDate()", () => {
    const firestoreTs = { toDate: () => new Date("2024-01-01") };
    const result = formatDate(firestoreTs);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2024/);
  });

  it("includes the day number", () => {
    const d = new Date("2024-03-07");
    expect(formatDate(d)).toMatch(/7/);
  });
});

// ── LS (localStorage helpers) ─────────────────────────────────────────────────

describe("LS", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("LS.set / LS.get round-trip", () => {
    it("stores and retrieves a string", () => {
      LS.set("key", "hello");
      expect(LS.get("key", null)).toBe("hello");
    });

    it("stores and retrieves an object", () => {
      const obj = { roomId: "ABC123", name: "Alice" };
      LS.set("session", obj);
      expect(LS.get("session", null)).toEqual(obj);
    });

    it("stores and retrieves a number", () => {
      LS.set("count", 42);
      expect(LS.get("count", 0)).toBe(42);
    });

    it("stores and retrieves null", () => {
      LS.set("empty", null);
      expect(LS.get("empty", "fallback")).toBeNull();
    });
  });

  describe("LS.get defaults", () => {
    it("returns the default value when the key does not exist", () => {
      expect(LS.get("missing", "default")).toBe("default");
    });

    it("returns null default when the key does not exist", () => {
      expect(LS.get("missing", null)).toBeNull();
    });
  });

  describe("LS.get error handling", () => {
    it("returns the default value when stored JSON is corrupt", () => {
      localStorage.setItem("bad", "not-valid-json{{{");
      expect(LS.get("bad", "safe")).toBe("safe");
    });
  });

  describe("LS.set error handling", () => {
    it("does not throw when localStorage is unavailable", () => {
      const original = localStorage.setItem.bind(localStorage);
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
      expect(() => LS.set("key", "value")).not.toThrow();
      vi.restoreAllMocks();
    });
  });
});
