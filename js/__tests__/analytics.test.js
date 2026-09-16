import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

import { track } from "@vercel/analytics";
import { trackEvent, eventContext, mapVoiceError } from "../analytics.js";

describe("analytics", () => {
  beforeEach(() => {
    track.mockReset();
    window.gtag = vi.fn();
    document.documentElement.lang = "he";
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: query => ({
        matches: query.includes("min-width: 880px"),
        media: query,
        addEventListener() {},
        removeEventListener() {},
      }),
    });
    Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
  });

  afterEach(() => {
    delete window.gtag;
  });

  it("maps SpeechRecognition error codes", () => {
    expect(mapVoiceError("not-allowed")).toBe("not_allowed");
    expect(mapVoiceError("no-speech")).toBe("no_speech");
    expect(mapVoiceError("network")).toBe("network");
    expect(mapVoiceError("audio-capture")).toBe("other");
  });

  it("reads language and viewport from the page", () => {
    const ctx = eventContext();
    expect(ctx.lang).toBe("he");
    expect(ctx.viewport).toBe("desktop");
    expect(ctx.pwa).toBe(false);
    expect(ctx.online).toBe(true);
  });

  it("sends the same payload to gtag and Vercel track", () => {
    trackEvent("join_room", { method: "code" });
    const payload = {
      lang: "he",
      viewport: "desktop",
      pwa: false,
      online: true,
      method: "code",
    };
    expect(window.gtag).toHaveBeenCalledWith("event", "join_room", payload);
    expect(track).toHaveBeenCalledWith("join_room", payload);
  });

  it("does not throw when gtag is missing", () => {
    delete window.gtag;
    expect(() => trackEvent("create_room")).not.toThrow();
    expect(track).toHaveBeenCalledWith(
      "create_room",
      expect.objectContaining({ lang: "he" }),
    );
  });

  it("does not attach undefined params", () => {
    trackEvent("delete_list", { source: "lists", item_count: undefined });
    const payload = track.mock.calls[0][1];
    expect(payload).not.toHaveProperty("item_count");
    expect(payload.source).toBe("lists");
  });
});
