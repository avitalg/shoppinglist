import { describe, it, expect } from "vitest";
import { isApplePlatform } from "../platform.js";

describe("isApplePlatform", () => {
  it("detects iPhone", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      platform: "iPhone",
      maxTouchPoints: 5,
    })).toBe(true);
  });

  it("detects iPad", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
      platform: "iPad",
      maxTouchPoints: 5,
    })).toBe(true);
  });

  it("detects iPod", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X)",
      platform: "iPod",
      maxTouchPoints: 5,
    })).toBe(true);
  });

  it("detects iPadOS desktop UA (MacIntel + touch)", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
      platform: "MacIntel",
      maxTouchPoints: 5,
    })).toBe(true);
  });

  it("detects macOS Safari", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      platform: "MacIntel",
      maxTouchPoints: 0,
    })).toBe(true);
  });

  it("detects macOS Chrome", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      platform: "MacIntel",
      maxTouchPoints: 0,
    })).toBe(true);
  });

  it("returns false for Android", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
      platform: "Linux armv8l",
      maxTouchPoints: 5,
    })).toBe(false);
  });

  it("returns false for Windows", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      platform: "Win32",
      maxTouchPoints: 0,
    })).toBe(false);
  });

  it("returns false for Linux desktop", () => {
    expect(isApplePlatform({
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      platform: "Linux x86_64",
      maxTouchPoints: 0,
    })).toBe(false);
  });
});
