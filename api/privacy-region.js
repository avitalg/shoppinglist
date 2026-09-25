import { privacyRegimeForCountry } from "../js/privacyRegion.js";

function countryFromRequest(req) {
  const raw = req.headers["x-vercel-ip-country"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === "string" ? value : null;
}

/**
 * GET /api/privacy-region
 * Returns { country, regime } from Vercel's visitor country header.
 * regime is "consent" (EU/EEA/UK), "us", "other", or null when unknown.
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const country = countryFromRequest(req);
  const regime = privacyRegimeForCountry(country);
  const code = regime ? country.trim().toUpperCase() : null;

  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({ country: code, regime });
}
