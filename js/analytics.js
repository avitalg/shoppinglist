import { track } from "@vercel/analytics";
import { privacyRegimeForCountry } from "./privacyRegion.js";
import { LS } from "./utils.js";

export const CONSENT_KEY = "fc_cookie_consent";
export const GA_MEASUREMENT_ID = "G-228GPR98KS";
export const LANDING_ATTR_KEY = "fc_landing_attr";

const SITE_ORIGIN = "https://www.grocerypair.com";
const DESKTOP_MQ = "(min-width: 880px)";
const PWA_MQ = "(display-mode: standalone)";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

function matches(query) {
  return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}

function compact(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  );
}

/** Build a GroceryPair invite/share URL with stable WhatsApp UTMs. */
export function inviteUrl(campaign, { content } = {}) {
  const url = new URL(SITE_ORIGIN + "/");
  url.searchParams.set("utm_source", "whatsapp");
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", campaign);
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
}

function referrerHost(referrer) {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).host || undefined;
  } catch {
    return undefined;
  }
}

function readStoredAttribution() {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LANDING_ATTR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(value) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(LANDING_ATTR_KEY, JSON.stringify(value));
  } catch {}
}

/**
 * Capture landing URL, referrer, and UTMs once per browser session.
 * Safe without cookie consent — only reads location/referrer.
 */
export function captureLandingAttribution({ href, referrer } = {}) {
  if (typeof window === "undefined") return null;
  const existing = readStoredAttribution();
  if (existing) return existing;

  const pageLocation = href ?? window.location.href;
  const pageReferrer = referrer ?? document.referrer ?? "";
  let params;
  try {
    params = new URL(pageLocation).searchParams;
  } catch {
    params = new URLSearchParams();
  }

  const attr = compact({
    page_location: pageLocation,
    page_referrer: pageReferrer || undefined,
    landing_referrer: referrerHost(pageReferrer),
    ...Object.fromEntries(
      UTM_KEYS.map(key => [key, params.get(key) || undefined]),
    ),
  });

  writeStoredAttribution(attr);
  return attr;
}

/** Return the session-scoped landing attribution, if any. */
export function getLandingAttribution() {
  return readStoredAttribution();
}

export function eventContext() {
  const attr = getLandingAttribution() || {};
  return compact({
    lang: document.documentElement.lang === "he" ? "he" : "en",
    viewport: matches(DESKTOP_MQ) ? "desktop" : "mobile",
    pwa: matches(PWA_MQ),
    online: navigator.onLine !== false,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_content: attr.utm_content,
    landing_referrer: attr.landing_referrer,
  });
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

/** @type {"consent" | "us" | "other" | null} */
let privacyRegime = null;

export function setPrivacyRegime(regime) {
  privacyRegime = regime === "consent" || regime === "us" || regime === "other" ? regime : null;
}

export function getPrivacyRegime() {
  return privacyRegime;
}

export function hasGlobalPrivacyControl() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

/**
 * Analytics may run when the visitor accepted, or — outside consent regions —
 * when they have not opted out. US visitors with Global Privacy Control are opted out.
 * Unknown region (null) requires an explicit grant.
 * @param {"consent" | "us" | "other" | null} [regime]
 */
export function hasAnalyticsConsent(regime = privacyRegime) {
  const choice = getCookieConsent();
  if (choice === "denied") return false;
  if (choice === "granted") return true;
  if (regime === "us" && hasGlobalPrivacyControl()) return false;
  return regime === "us" || regime === "other";
}

export function setCookieConsent(value) {
  LS.set(CONSENT_KEY, value);
}

/** Stop GA hits after an opt-out, including ones already queued this page. */
export function disableGoogleAnalytics() {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
}

export function clearGoogleAnalyticsDisable() {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
}

/** Ask the server which privacy regime this visitor is in. Unknown on failure. */
export async function fetchPrivacyRegion() {
  const res = await fetch("/api/privacy-region");
  if (!res.ok) throw new Error("privacy-region");
  const data = await res.json();
  const country = typeof data?.country === "string" ? data.country : null;
  const regime = privacyRegimeForCountry(country);
  setPrivacyRegime(regime);
  return {
    country: regime ? country.trim().toUpperCase() : null,
    regime,
  };
}

let googleTagLoaded = false;

/** Reset module load flag — only for tests. */
export function _resetGoogleTagLoadedForTests() {
  googleTagLoaded = false;
}

/** Inject gtag.js once after the user accepts analytics cookies. */
export function loadGoogleTag() {
  if (googleTagLoaded || typeof document === "undefined") return;
  if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    googleTagLoaded = true;
    return;
  }

  const attr = getLandingAttribution() || captureLandingAttribution() || {};
  const config = compact({
    page_location: attr.page_location,
    page_referrer: attr.page_referrer,
  });

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, config);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  googleTagLoaded = true;
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
