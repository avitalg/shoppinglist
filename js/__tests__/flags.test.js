import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";

vi.mock("../platform.js", () => ({
  isApplePlatform: vi.fn(),
}));

import { isApplePlatform } from "../platform.js";
import { useRecordGroceriesEnabled } from "../flags.js";

function runHook(hook) {
  const results = [];
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function Probe() {
    results.push(hook());
    return null;
  }

  act(() => {
    root.render(createElement(Probe));
  });

  return {
    results,
    async waitFor(predicate, timeout = 1000) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        if (predicate(results[results.length - 1], results)) return;
        await act(async () => {
          await new Promise((r) => setTimeout(r, 10));
        });
      }
      throw new Error("waitFor timed out");
    },
    unmount() {
      act(() => root.unmount());
      container.remove();
    },
  };
}

describe("useRecordGroceriesEnabled", () => {
  beforeEach(() => {
    vi.mocked(isApplePlatform).mockReset();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false immediately on Apple platforms without fetching", () => {
    vi.mocked(isApplePlatform).mockReturnValue(true);
    const h = runHook(useRecordGroceriesEnabled);
    expect(h.results[0]).toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    h.unmount();
  });

  it("uses API enabled value for non-Apple platforms", async () => {
    vi.mocked(isApplePlatform).mockReturnValue(false);
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ enabled: false }),
    });

    const h = runHook(useRecordGroceriesEnabled);
    expect(h.results[0]).toBe(true);

    await h.waitFor((v) => v === false);
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/record-groceries");
    h.unmount();
  });

  it("falls back to true when fetch fails on non-Apple", async () => {
    vi.mocked(isApplePlatform).mockReturnValue(false);
    globalThis.fetch.mockRejectedValue(new Error("network"));

    const h = runHook(useRecordGroceriesEnabled);
    expect(h.results[0]).toBe(true);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 30));
    });
    expect(h.results[h.results.length - 1]).toBe(true);
    h.unmount();
  });
});
