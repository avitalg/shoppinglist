import { describe, it, expect } from "vitest";
import {
  aboutJsonLd, faqJsonLd, privacyJsonLd, FAQ_ITEMS, HOME_SEO, PAGE_SEO, SITE,
} from "../seoPages.js";
import {
  BLOG_POSTS, BLOG_SEO, blogIndexJsonLd, blogPostJsonLd, getBlogPost,
} from "../blogPosts.js";

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

describe("blogPosts", () => {
  it("exposes a blog index and grocery articles", () => {
    expect(BLOG_SEO.path).toBe("/blog");
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(2);
    const partner = getBlogPost("share-grocery-list-with-partner");
    expect(partner).toBeTruthy();
    expect(partner.path).toBe("/blog/share-grocery-list-with-partner");
    expect(partner.en.h1).toMatch(/Share a Grocery List/i);
    expect(partner.en.cta).toMatch(/free shared grocery list/i);
    expect(partner.en.sections.length).toBeGreaterThanOrEqual(5);

    const weekly = getBlogPost("weekly-grocery-list");
    expect(weekly).toBeTruthy();
    expect(weekly.path).toBe("/blog/weekly-grocery-list");
    expect(weekly.en.h1).toMatch(/Weekly Grocery List/i);
    expect(weekly.en.description).toMatch(/grocery checklist/i);
    expect(weekly.en.sections.some(s => s.items?.length > 0)).toBe(true);
  });

  it("builds Blog and BlogPosting JSON-LD", () => {
    expect(blogIndexJsonLd()["@type"]).toBe("Blog");
    expect(blogIndexJsonLd().url).toBe(`${SITE}/blog`);
    expect(blogIndexJsonLd().blogPost).toHaveLength(BLOG_POSTS.length);
    const post = getBlogPost("share-grocery-list-with-partner");
    const ld = blogPostJsonLd(post);
    expect(ld["@type"]).toBe("BlogPosting");
    expect(ld.url).toBe(`${SITE}${post.path}`);
    expect(ld.headline).toBe(post.en.h1);
  });

  it("keeps EN and HE article bodies in sync by section count", () => {
    for (const post of BLOG_POSTS) {
      expect(post.he.sections).toHaveLength(post.en.sections.length);
      expect(post.he.h1.length).toBeGreaterThan(10);
      expect(post.he.cta.length).toBeGreaterThan(5);
      post.en.sections.forEach((section, index) => {
        const heSection = post.he.sections[index];
        expect(heSection.items?.length ?? 0).toBe(section.items?.length ?? 0);
      });
    }
  });
});
