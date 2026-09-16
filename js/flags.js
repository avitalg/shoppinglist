import { useState, useEffect } from "react";
import { isApplePlatform } from "./platform.js";

const DEFAULT_ENABLED = true;

/**
 * Whether voice/"record groceries" should be available.
 * Always false on Apple platforms; otherwise driven by Vercel Flags via /api/record-groceries.
 * Falls back to true for non-Apple when the API is unreachable (e.g. local Vite without vercel dev).
 *
 * @returns {boolean}
 */
export function useRecordGroceriesEnabled() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    if (isApplePlatform()) return false;
    return DEFAULT_ENABLED;
  });

  useEffect(() => {
    if (isApplePlatform()) {
      setEnabled(false);
      return;
    }

    let cancelled = false;

    fetch("/api/record-groceries")
      .then((res) => {
        if (!res.ok) throw new Error(`flag status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setEnabled(Boolean(data?.enabled));
      })
      .catch(() => {
        if (!cancelled) setEnabled(DEFAULT_ENABLED);
      });

    return () => { cancelled = true; };
  }, []);

  return enabled;
}
