import { describe, it, expect } from "vitest";
import { aboutJsonLd, faqJsonLd, FAQ_ITEMS, PAGE_SEO, SITE } from "../seoPages.js";

describe("seoPages", () => {
  it("gives About and FAQ unique canonical paths", () => {
    expect(PAGE_SEO.about.path).toBe("/about");
    expect(PAGE_SEO.faq.path).toBe("/faq");
    expect(PAGE_SEO.about.en.title).not.toBe(PAGE_SEO.faq.en.title);
    expect(aboutJsonLd().url).toBe(`${SITE}/about`);
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
