import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SITE } from "../seoPages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

const AIR_URN = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/;
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function header(vercel, source, key) {
  const rule = vercel.headers.find(item => item.source === source);
  return rule?.headers.find(item => item.key === key)?.value;
}

function spaFallback(vercel) {
  const rule = vercel.rewrites.find(item => item.destination === "/index.html");
  return new RegExp(`^${rule.source}$`);
}

describe("llms.txt", () => {
  const text = read("public/llms.txt");
  const links = [...text.matchAll(MARKDOWN_LINK)].map(match => ({
    name: match[1],
    url: match[2],
  }));

  it("follows the Lighthouse markdown checks", () => {
    expect(text.charCodeAt(0)).not.toBe(0xfeff);
    expect(text.length).toBeGreaterThan(50);
    expect(text).toMatch(/^\s*#\s+.+/m);
    expect(text.match(/^#\s+/gm)).toHaveLength(1);
    expect(links.length).toBeGreaterThan(0);
  });

  it("links only to absolute GroceryPair URLs that are published", () => {
    const sitemap = read("public/sitemap.xml");
    const published = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]));
    published.add(`${SITE}/sitemap.xml`);

    expect(links.map(link => link.url)).toEqual(expect.arrayContaining([
      `${SITE}/`,
      `${SITE}/about`,
      `${SITE}/faq`,
      `${SITE}/blog`,
      `${SITE}/privacy`,
    ]));
    for (const link of links) {
      expect(link.url.startsWith(`${SITE}/`)).toBe(true);
      expect(published.has(link.url)).toBe(true);
    }
  });
});

describe("ai-catalog.json", () => {
  const catalog = JSON.parse(read("public/.well-known/ai-catalog.json"));

  it("matches the catalog schema", () => {
    expect(Object.keys(catalog).sort()).toEqual(["entries", "host", "specVersion"]);
    expect(catalog.specVersion).toBe("1.0");
    expect(catalog.host.displayName).toBe("GroceryPair");
    expect(catalog.host.documentationUrl).toBe(`${SITE}/about`);
    expect(catalog.entries.length).toBeGreaterThan(0);

    for (const entry of catalog.entries) {
      expect(entry.identifier).toMatch(AIR_URN);
      expect(entry.displayName.length).toBeGreaterThan(0);
      expect(entry.type).toMatch(/\//);
      expect(Boolean(entry.url) !== Boolean(entry.data)).toBe(true);
      if (entry.representativeQueries) {
        expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
        expect(entry.representativeQueries.length).toBeLessThanOrEqual(5);
      }
      if (entry.updatedAt) {
        expect(Number.isNaN(Date.parse(entry.updatedAt))).toBe(false);
      }
    }
  });

  it("points agents at llms.txt", () => {
    expect(catalog.entries.some(entry => entry.url === `${SITE}/llms.txt`)).toBe(true);
  });
});

describe("discovery routing", () => {
  const vercel = JSON.parse(read("vercel.json"));
  const index = read("index.html");
  const robots = read("public/robots.txt");
  const fallback = spaFallback(vercel);

  it("advertises the files from the homepage and robots.txt", () => {
    expect(index).toMatch(/<link rel="describedby" href="\/llms\.txt"\s*\/?>/);
    expect(index).toMatch(/<link rel="ai-catalog" type="application\/json" href="\/\.well-known\/ai-catalog\.json"\s*\/?>/);
    expect(robots).toContain(`Agentmap: ${SITE}/.well-known/ai-catalog.json`);
  });

  it("serves the files as text and JSON instead of the app shell", () => {
    expect(header(vercel, "/llms.txt", "Content-Type")).toBe("text/plain; charset=utf-8");
    expect(header(vercel, "/.well-known/ai-catalog.json", "Content-Type")).toBe("application/json; charset=utf-8");
    expect(header(vercel, "/ai-catalog.json", "Content-Type")).toBe("application/json; charset=utf-8");
    expect(vercel.rewrites).toContainEqual({
      source: "/ai-catalog.json",
      destination: "/.well-known/ai-catalog.json",
    });

    expect(fallback.test("/llms.txt")).toBe(false);
    expect(fallback.test("/ai-catalog.json")).toBe(false);
    expect(fallback.test("/.well-known/ai-catalog.json")).toBe(false);
    expect(fallback.test("/room/family")).toBe(true);
  });
});

describe("build sourcemaps", () => {
  it("publishes source maps for first-party bundles", () => {
    const vite = read("vite.config.js");
    expect(vite).toMatch(/build:\s*\{[^}]*sourcemap:\s*true/);
  });
});
