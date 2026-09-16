/**
 * Detect Apple platforms where voice/"record groceries" must stay off.
 * Covers iOS, iPadOS (including desktop-UA iPads), and macOS.
 *
 * @param {{ userAgent?: string, platform?: string, maxTouchPoints?: number }} [nav]
 * @returns {boolean}
 */
export function isApplePlatform(nav = typeof navigator !== "undefined" ? navigator : {}) {
  const ua = nav.userAgent || "";
  const platform = nav.platform || "";
  const maxTouchPoints = nav.maxTouchPoints ?? 0;

  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS 13+ may report as Macintosh with touch
  if (platform === "MacIntel" && maxTouchPoints > 1) return true;
  if (/Macintosh|Mac OS X/i.test(ua)) return true;

  return false;
}
