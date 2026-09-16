import { track } from "@vercel/analytics";

const DESKTOP_MQ = "(min-width: 880px)";
const PWA_MQ = "(display-mode: standalone)";

function matches(query) {
  return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}

export function eventContext() {
  return {
    lang: document.documentElement.lang === "he" ? "he" : "en",
    viewport: matches(DESKTOP_MQ) ? "desktop" : "mobile",
    pwa: matches(PWA_MQ),
    online: navigator.onLine !== false,
  };
}

export function mapVoiceError(code) {
  if (code === "not-allowed" || code === "service-not-allowed") return "not_allowed";
  if (code === "no-speech") return "no_speech";
  if (code === "network") return "network";
  return "other";
}

function compact(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );
}

/** Send a custom event to Google Analytics and Vercel Web Analytics. */
export function trackEvent(name, params = {}) {
  const payload = compact({ ...eventContext(), ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
  track(name, payload);
}
