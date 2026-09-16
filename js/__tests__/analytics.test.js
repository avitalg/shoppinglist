import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

import { track } from "@vercel/analytics";
import { LS } from "../utils.js";
import {
  CONSENT_KEY,
  eventContext,
  hasAnalyticsConsent,
  mapVoiceError,
  setCookieConsent,
  trackEvent,
} from "../analytics.js";

describe("analytics", () => {
  beforeEach(() => {
    track.mockReset();
    localStorage.clear();
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
    localStorage.clear();
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

  it("treats missing or denied consent as no analytics", () => {
    expect(hasAnalyticsConsent()).toBe(false);
    trackEvent("join_room", { method: "code" });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(track).not.toHaveBeenCalled();

    setCookieConsent("denied");
    expect(hasAnalyticsConsent()).toBe(false);
    trackEvent("join_room", { method: "code" });
    expect(track).not.toHaveBeenCalled();
  });

  it("sends the same payload to gtag and Vercel track when granted", () => {
    LS.set(CONSENT_KEY, "granted");
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
    LS.set(CONSENT_KEY, "granted");
    delete window.gtag;
    expect(() => trackEvent("create_room")).not.toThrow();
    expect(track).toHaveBeenCalledWith(
      "create_room",
      expect.objectContaining({ lang: "he" }),
    );
  });

  it("does not attach undefined params", () => {
    LS.set(CONSENT_KEY, "granted");
    trackEvent("delete_list", { source: "lists", item_count: undefined });
    const payload = track.mock.calls[0][1];
    expect(payload).not.toHaveProperty("item_count");
    expect(payload.source).toBe("lists");
  });
});
