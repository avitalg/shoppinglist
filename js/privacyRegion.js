/** EU member states, plus EEA (IS, LI, NO) and the UK (GB). */
const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB",
]);

/**
 * @param {string | null | undefined} country ISO 3166-1 alpha-2
 * @returns {"consent" | "us" | "other" | null}
 */
export function privacyRegimeForCountry(country) {
  if (typeof country !== "string") return null;
  const code = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  if (CONSENT_COUNTRIES.has(code)) return "consent";
  if (code === "US") return "us";
  return "other";
}
