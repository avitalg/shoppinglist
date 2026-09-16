import { track } from "@vercel/analytics";
import { LS } from "./utils.js";

export const CONSENT_KEY = "fc_cookie_consent";
export const GA_MEASUREMENT_ID = "G-228GPR98KS";

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

export function getCookieConsent() {
  const value = LS.get(CONSENT_KEY, null);
  return value === "granted" || value === "denied" ? value : null;
}

export function hasAnalyticsConsent() {
  return getCookieConsent() === "granted";
}

export function setCookieConsent(value) {
  LS.set(CONSENT_KEY, value);
}

let googleTagLoaded = false;

/** Inject gtag.js once after the user accepts analytics cookies. */
export function loadGoogleTag() {
  if (googleTagLoaded || typeof document === "undefined") return;
  if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    googleTagLoaded = true;
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  googleTagLoaded = true;
}

function compact(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );
}

/** Send a custom event to Google Analytics and Vercel Web Analytics. */
export function trackEvent(name, params = {}) {
  if (!hasAnalyticsConsent()) return;
  const payload = compact({ ...eventContext(), ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
  track(name, payload);
}
