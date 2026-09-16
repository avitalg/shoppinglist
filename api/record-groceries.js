import { flagsClient } from "@vercel/flags-core";

const FLAG_KEY = "record-groceries";
const DEFAULT_ENABLED = true;

/**
 * Evaluate the Vercel Flags boolean for voice/"record groceries".
 * Apple platforms are gated on the client — this endpoint only returns the flag value.
 */
export default async function handler(_req, res) {
  try {
    const result = await flagsClient.evaluate(FLAG_KEY, DEFAULT_ENABLED);
    const enabled = Boolean(result?.value ?? DEFAULT_ENABLED);

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
    res.status(200).json({ enabled });
  } catch {
    res.setHeader("Cache-Control", "public, s-maxage=30");
    res.status(200).json({ enabled: DEFAULT_ENABLED });
  }
}
