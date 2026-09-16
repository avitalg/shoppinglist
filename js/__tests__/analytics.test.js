import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

import { track } from "@vercel/analytics";
import { LS } from "../utils.js";
import {
  CONSENT_KEY,
  GA_MEASUREMENT_ID,
  LANDING_ATTR_KEY,
  _resetGoogleTagLoadedForTests,
  captureLandingAttribution,
  eventContext,
  getLandingAttribution,
  hasAnalyticsConsent,
  inviteUrl,
  loadGoogleTag,
  mapVoiceError,
  setCookieConsent,
  trackEvent,
} from "../analytics.js";

describe("analytics", () => {
  beforeEach(() => {
    track.mockReset();
    localStorage.clear();
    sessionStorage.clear();
    _resetGoogleTagLoadedForTests();
    window.gtag = vi.fn();
    document.documentElement.lang = "he";
    document.querySelectorAll(`script[src*="gtag/js"]`).forEach(el => el.remove());
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
    sessionStorage.clear();
    _resetGoogleTagLoadedForTests();
    document.querySelectorAll(`script[src*="gtag/js"]`).forEach(el => el.remove());
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

  it("builds invite URLs with WhatsApp UTMs", () => {
    expect(inviteUrl("room_invite")).toBe(
      "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite",
    );
    expect(inviteUrl("list_share")).toContain("utm_campaign=list_share");
  });

  it("captures landing UTMs and referrer once per session", () => {
    const first = captureLandingAttribution({
      href: "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite",
      referrer: "https://api.whatsapp.com/send",
    });
    expect(first).toMatchObject({
      utm_source: "whatsapp",
      utm_medium: "social",
      utm_campaign: "room_invite",
      landing_referrer: "api.whatsapp.com",
    });
    expect(sessionStorage.getItem(LANDING_ATTR_KEY)).toBeTruthy();

    const second = captureLandingAttribution({
      href: "https://www.grocerypair.com/?utm_source=other&utm_campaign=ignored",
      referrer: "https://example.com/",
    });
    expect(second).toEqual(first);
    expect(getLandingAttribution()).toEqual(first);
  });

  it("includes campaign fields in eventContext when captured", () => {
    captureLandingAttribution({
      href: "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite&utm_content=banner",
      referrer: "https://t.co/abc",
    });
    expect(eventContext()).toMatchObject({
      lang: "he",
      utm_source: "whatsapp",
      utm_medium: "social",
      utm_campaign: "room_invite",
      utm_content: "banner",
      landing_referrer: "t.co",
    });
  });

  it("omits campaign fields from eventContext when absent", () => {
    captureLandingAttribution({
      href: "https://www.grocerypair.com/",
      referrer: "",
    });
    const ctx = eventContext();
    expect(ctx).not.toHaveProperty("utm_source");
    expect(ctx).not.toHaveProperty("utm_medium");
    expect(ctx).not.toHaveProperty("utm_campaign");
    expect(ctx).not.toHaveProperty("landing_referrer");
  });

  it("passes stored page_location and page_referrer to gtag config", () => {
    captureLandingAttribution({
      href: "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite",
      referrer: "https://web.whatsapp.com/",
    });
    delete window.gtag;
    window.dataLayer = [];

    loadGoogleTag();

    const configCall = window.dataLayer.find(
      entry => entry?.[0] === "config" && entry?.[1] === GA_MEASUREMENT_ID,
    );
    expect(configCall?.[2]).toEqual({
      page_location:
        "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite",
      page_referrer: "https://web.whatsapp.com/",
    });
    expect(
      document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`),
    ).toBeTruthy();
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

  it("attaches captured UTMs to trackEvent payloads", () => {
    captureLandingAttribution({
      href: "https://www.grocerypair.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=room_invite",
      referrer: "",
    });
    LS.set(CONSENT_KEY, "granted");
    trackEvent("join_room", { method: "code" });
    expect(track).toHaveBeenCalledWith(
      "join_room",
      expect.objectContaining({
        method: "code",
        utm_source: "whatsapp",
        utm_medium: "social",
        utm_campaign: "room_invite",
      }),
    );
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
