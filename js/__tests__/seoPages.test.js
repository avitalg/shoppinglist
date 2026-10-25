import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import {
  aboutJsonLd, faqJsonLd, privacyJsonLd, FAQ_ITEMS, HOME_SEO, PAGE_SEO, PILLAR_SLUG,
  SHARED_LIST_SLUG, SITE, blogIndexHreflang, blogIndexPath, blogPostHreflang,
  blogPostPath, isHePath, localizeHref, localizedPath, pageHreflang, parseRichText,
  stripRichText,
} from "../seoPages.js";
import {
  BLOG_POSTS, BLOG_SEO, blogIndexJsonLd, blogPostJsonLd, getBlogPost,
} from "../blogPosts.js";

const sitemap = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../../public/sitemap.xml"),
  "utf8",
);

describe("seoPages", () => {
  it("uses grocerypair.com as the canonical site", () => {
    expect(SITE).toBe("https://www.grocerypair.com");
  });

  it("brands pages as GroceryPair", () => {
    expect(HOME_SEO.title).toMatch(/^GroceryPair/);
    expect(HOME_SEO.ogTitle).toMatch(/^GroceryPair/);
    expect(HOME_SEO.he.path).toBe("/he");
    expect(HOME_SEO.he.title).toBe("רשימת קניות משותפת בחינם | GroceryPair");
    expect(HOME_SEO.he.description).toMatch(/^רשימת קניות משותפת בחינם/);
    expect(HOME_SEO.he.h1).toMatch(/רשימת קניות משותפת בחינם/);
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
  it("splits English and Hebrew onto separate blog URLs", () => {
    expect(BLOG_SEO.path).toBe("/blog");
    expect(BLOG_SEO.hePath).toBe("/he/blog");
    expect(blogIndexPath("en")).toBe("/blog");
    expect(blogIndexPath("he")).toBe("/he/blog");
    expect(blogPostPath(PILLAR_SLUG, "en")).toBe("/blog/grocery-shopping-tips");
    expect(blogPostPath(PILLAR_SLUG, "he")).toBe("/he/blog/grocery-shopping-tips");
    expect(localizeHref("/blog/weekly-basics", "he")).toBe("/he/blog/weekly-basics");
    expect(localizeHref("/", "he")).toBe("/he");
    expect(localizeHref("/blog/weekly-basics", "en")).toBe("/blog/weekly-basics");
    expect(isHePath("/he/blog/grocery-shopping-tips")).toBe(true);
    expect(localizedPath("/blog/grocery-shopping-tips", "he")).toBe("/he/blog/grocery-shopping-tips");
    expect(localizedPath("/he/blog", "en")).toBe("/blog");
    expect(pageHreflang("/blog/grocery-shopping-tips", "/he/blog/grocery-shopping-tips")).toEqual({
      en: `${SITE}/blog/grocery-shopping-tips`,
      he: `${SITE}/he/blog/grocery-shopping-tips`,
      "x-default": `${SITE}/blog/grocery-shopping-tips`,
    });
    expect(blogPostHreflang(PILLAR_SLUG).he).toBe(`${SITE}/he/blog/grocery-shopping-tips`);
    expect(blogIndexHreflang()["x-default"]).toBe(`${SITE}/blog`);
    expect(blogPostPath(SHARED_LIST_SLUG, "en")).toBe("/blog/shared-shopping-list");
    expect(blogPostPath(SHARED_LIST_SLUG, "he")).toBe("/he/blog/shared-shopping-list");
    expect(stripRichText("Start with our [shared shopping list](/blog/shared-shopping-list) guide.")).toBe(
      "Start with our shared shopping list guide.",
    );
    expect(parseRichText("Read this [in Hebrew](!/he/blog/shared-shopping-list).")[1]).toEqual({
      text: "in Hebrew",
      href: "/he/blog/shared-shopping-list",
      exact: true,
    });
  });

  it("lists every Hebrew blog URL in the sitemap with the article date", () => {
    expect(sitemap).toContain(`<loc>${SITE}/he/blog</loc>`);
    for (const post of BLOG_POSTS) {
      const heUrl = `${SITE}${blogPostPath(post.slug, "he")}`;
      expect(sitemap).toContain(`<loc>${heUrl}</loc>`);
      expect(sitemap).toMatch(
        new RegExp(`<loc>${heUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>\\s*<lastmod>${post.date}</lastmod>`),
      );
    }
  });

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

    const families = getBlogPost("shared-grocery-list-for-families");
    expect(families.path).toBe("/blog/shared-grocery-list-for-families");
    expect(families.en.title.length).toBeLessThanOrEqual(60);
    expect(families.en.description.length).toBeLessThanOrEqual(155);
    expect(families.en.lead.toLowerCase()).toContain("shared grocery list");
    const graph = blogPostJsonLd(families)["@graph"];
    expect(graph.map(node => node["@type"])).toEqual(["BlogPosting", "FAQPage"]);
    expect(graph[1].mainEntity.length).toBeGreaterThanOrEqual(5);

    const tips = getBlogPost("grocery-shopping-tips");
    expect(tips.path).toBe("/blog/grocery-shopping-tips");
    expect(tips.en.title.length).toBeLessThanOrEqual(60);
    expect(tips.en.description.length).toBeLessThanOrEqual(155);
    expect(tips.en.h1.toLowerCase()).toContain("grocery shopping tips");
    expect(tips.en.lead.toLowerCase()).toContain("grocery shopping tips");
    expect(tips.en.sections.some(section => section.h2.toLowerCase().includes("grocery shopping tips"))).toBe(true);
    expect(tips.en.sections.some(section => section.h2.toLowerCase().includes("how to save money on groceries"))).toBe(true);
    expect(tips.en.sections.some(section => section.h2.toLowerCase().includes("grocery shopping on a budget"))).toBe(true);
    const tipsGraph = blogPostJsonLd(tips)["@graph"];
    expect(tipsGraph.map(node => node["@type"])).toEqual(["BlogPosting", "FAQPage"]);

    const heTips = blogPostJsonLd(tips, "he");
    expect(heTips["@graph"][0].url).toBe(`${SITE}/he/blog/grocery-shopping-tips`);
    expect(heTips["@graph"][0].inLanguage).toBe("he");
    expect(heTips["@graph"][0].headline).toBe(tips.he.h1);
    expect(blogIndexJsonLd("he").url).toBe(`${SITE}/he/blog`);

    const hub = getBlogPost("shared-shopping-list");
    expect(hub).toBeTruthy();
    expect(hub.path).toBe("/blog/shared-shopping-list");
    expect(hub.en.title).toBe("Shared Shopping List: The Complete 2026 Guide | GroceryPair");
    expect(hub.en.title.length).toBeLessThanOrEqual(60);
    expect(hub.en.description.length).toBeLessThanOrEqual(155);
    expect(hub.en.h1.toLowerCase()).toContain("shared shopping list");
    expect(hub.en.sections[0].paragraphs.join(" ").toLowerCase()).toContain("shared shopping list");
    const hubGraph = blogPostJsonLd(hub)["@graph"];
    expect(hubGraph.map(node => node["@type"])).toEqual(["BlogPosting", "FAQPage"]);
    expect(hubGraph[1].mainEntity.length).toBe(5);
    const hubHrefs = hub.en.sections.flatMap(section => [
      ...(section.links ?? []).map(link => link.href),
      ...(section.paragraphs ?? []),
      ...(section.items ?? []),
      ...(section.faqs ?? []).map(faq => faq.a),
    ]).join(" ");
    expect(hubHrefs).toContain("/");
    expect(hubHrefs).toContain("/blog/shared-grocery-list-for-families");
    expect(hubHrefs).toContain("/blog/share-grocery-list-with-partner");
    expect(hubHrefs).toContain("/blog/weekly-grocery-list");
    expect(hubHrefs).toContain("/blog/grocery-shopping-tips");
    expect(hubHrefs).toContain("/faq");
    expect(hub.en.sections.filter(section => section.links?.some(link => link.href === "/")).length).toBe(2);
  });

  it("points every existing post at the shared shopping list hub", () => {
    for (const post of BLOG_POSTS) {
      if (post.slug === SHARED_LIST_SLUG) continue;
      expect(post.en.lead).toContain("/blog/shared-shopping-list");
      expect(post.he.lead).toContain("/blog/shared-shopping-list");
    }
  });

  it("keeps EN and HE article bodies in sync by section count", () => {
    for (const post of BLOG_POSTS) {
      expect(post.he.sections).toHaveLength(post.en.sections.length);
      expect(post.he.h1.length).toBeGreaterThan(10);
      expect(post.he.cta.length).toBeGreaterThan(5);
      post.en.sections.forEach((section, index) => {
        const heSection = post.he.sections[index];
        expect(heSection.items?.length ?? 0).toBe(section.items?.length ?? 0);
        expect(heSection.table?.rows.length ?? 0).toBe(section.table?.rows.length ?? 0);
        expect(heSection.table?.headers.length ?? 0).toBe(section.table?.headers.length ?? 0);
        expect(heSection.after?.length ?? 0).toBe(section.after?.length ?? 0);
        expect(heSection.faqs?.length ?? 0).toBe(section.faqs?.length ?? 0);
        expect(heSection.links?.length ?? 0).toBe(section.links?.length ?? 0);
      });
    }
  });
});
