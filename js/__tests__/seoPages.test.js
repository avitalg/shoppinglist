import { describe, it, expect } from "vitest";
import {
  aboutJsonLd, faqJsonLd, privacyJsonLd, FAQ_ITEMS, HOME_SEO, PAGE_SEO, SITE,
} from "../seoPages.js";

describe("seoPages", () => {
  it("uses grocerypair.com as the canonical site", () => {
    expect(SITE).toBe("https://www.grocerypair.com");
  });

  it("brands pages as GroceryPair", () => {
    expect(HOME_SEO.title).toMatch(/^GroceryPair/);
    expect(HOME_SEO.ogTitle).toMatch(/^GroceryPair/);
    expect(FAQ_ITEMS.en[0].q).toBe("What is GroceryPair?");
    expect(aboutJsonLd().isPartOf.name).toBe("GroceryPair");
    expect(privacyJsonLd().isPartOf.name).toBe("GroceryPair");
  });

  it("gives About, FAQ, and Privacy unique canonical paths", () => {
    expect(PAGE_SEO.about.path).toBe("/about");
    expect(PAGE_SEO.faq.path).toBe("/faq");
    expect(PAGE_SEO.privacy.path).toBe("/privacy");
    expect(PAGE_SEO.about.en.title).not.toBe(PAGE_SEO.faq.en.title);
    expect(PAGE_SEO.privacy.en.title).not.toBe(PAGE_SEO.about.en.title);
    expect(aboutJsonLd().url).toBe(`${SITE}/about`);
    expect(privacyJsonLd().url).toBe(`${SITE}/privacy`);
  });

  it("builds FAQ structured data without bidi marks", () => {
    const ld = faqJsonLd(FAQ_ITEMS.he);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(FAQ_ITEMS.he.length);
    for (const q of ld.mainEntity) {
      expect(q.name).not.toMatch(/\u200f/);
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(10);
    }
  });
});
