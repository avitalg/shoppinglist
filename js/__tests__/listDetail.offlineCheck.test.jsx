import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageContext } from "../i18n.js";
import { loadPendingChecks } from "../pendingChecks.js";

const listListeners = [];

vi.mock("../firebase.js", () => ({
  db: {},
  doc: () => ({ path: "list" }),
  collection: () => ({ path: "history" }),
  onSnapshot: (_ref, optionsOrCb, maybeCb) => {
    if (typeof optionsOrCb === "function") {
      optionsOrCb({ docs: [] });
      return () => {};
    }
    listListeners.push(maybeCb);
    maybeCb(snapshot({ checked: false, fromCache: true }));
    return () => {};
  },
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  setDoc: vi.fn(),
  runTransaction: vi.fn(),
  increment: vi.fn(),
}));

vi.mock("../syncPendingChecks.js", () => ({
  syncPendingChecks: vi.fn(async () => ({ ok: false, offline: true })),
}));

vi.mock("../analytics.js", () => ({
  trackEvent: vi.fn(),
  mapVoiceError: () => "unknown",
  inviteUrl: (campaign) => `https://example.test/?c=${campaign}`,
}));

vi.mock("../flags.js", () => ({
  useRecordGroceriesEnabled: () => false,
}));

const { default: ListDetail } = await import("../components/ListDetail.jsx");

function snapshot({ checked, fromCache }) {
  return {
    exists: () => true,
    id: "list-1",
    metadata: { fromCache },
    data: () => ({
      name: "Shop",
      items: [{ id: "milk", text: "Milk", checked, category: "dairy" }],
    }),
  };
}

describe("ListDetail offline check", () => {
  let root;

  beforeEach(() => {
    localStorage.clear();
    listListeners.length = 0;
    const el = document.createElement("div");
    document.body.appendChild(el);
    root = createRoot(el);
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
  });

  it("keeps a check mark when the server snapshot is still unchecked", async () => {
    const list = {
      id: "list-1",
      name: "Shop",
      items: [{ id: "milk", text: "Milk", checked: false, category: "dairy" }],
    };

    await act(async () => {
      root.render(
        <LanguageContext.Provider value="en">
          <ListDetail list={list} session={{ roomId: "ROOM01" }} onBack={() => {}} />
        </LanguageContext.Provider>,
      );
    });

    const checkbox = () => document.querySelector('[role="checkbox"]');
    expect(checkbox().getAttribute("aria-checked")).toBe("false");

    await act(async () => {
      checkbox().click();
    });

    expect(checkbox().getAttribute("aria-checked")).toBe("true");
    expect(checkbox().className).toContain("checked");
    expect(loadPendingChecks("ROOM01", "list-1")).toEqual({ milk: true });
    expect(document.body.textContent).not.toContain("Failed to update item.");

    await act(async () => {
      listListeners.at(-1)(snapshot({ checked: false, fromCache: true }));
    });

    expect(checkbox().getAttribute("aria-checked")).toBe("true");
    expect(loadPendingChecks("ROOM01", "list-1")).toEqual({ milk: true });
  });
});
