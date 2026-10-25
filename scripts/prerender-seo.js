import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE, HOME_SEO, PAGE_SEO, FAQ_ITEMS, PILLAR_SLUG, SHARED_LIST_SLUG, faqJsonLd,
  aboutJsonLd, privacyJsonLd, blogIndexHreflang, blogIndexPath, blogPostHreflang,
  blogPostPath, parseRichText, resolveBlogHref,
} from "../js/seoPages.js";
import {
  BLOG_POSTS, BLOG_SEO, blogIndexJsonLd, blogPostJsonLd,
} from "../js/blogPosts.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Could not update HTML matching ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

function applyHead(html, { path, title, description, jsonLd, hreflang, htmlLang }) {
  const url = `${SITE}${path}`;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(description)}" />`,
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );
  if (hreflang) {
    html = html.replace(
      /<link rel="alternate" hreflang="([^"]+)" href="[^"]*"/g,
      (match, code) => (
        hreflang[code]
          ? `<link rel="alternate" hreflang="${code}" href="${hreflang[code]}"`
          : match
      ),
    );
  } else {
    html = html.replace(
      /(<link rel="alternate" hreflang="[^"]+" href=")[^"]*("\s*\/?>)/g,
      `$1${url}$2`,
    );
  }
  if (htmlLang) {
    html = replaceOnce(
      html,
      /<html lang="[^"]*"( dir="[^"]*")?/,
      `<html lang="${htmlLang}" dir="${htmlLang === "he" ? "rtl" : "ltr"}"`,
    );
    html = replaceOnce(
      html,
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="${htmlLang === "he" ? "he_IL" : "en_US"}" />`,
    );
  }
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${esc(title)}" />`,
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  );
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  );
  return html;
}

function aboutBody() {
  const en = PAGE_SEO.about.en;
  const he = PAGE_SEO.about.he;
  return `
    <main>
      <h1>${esc(en.h1)}</h1>
      <p>${esc(en.description)}</p>
      <p><a href="/">GroceryPair</a> · <a href="/blog">Blog</a> · <a href="/faq">FAQ</a> · <a href="/privacy">Privacy</a></p>
      <section lang="he" dir="rtl">
        <h2>${esc(he.h1)}</h2>
        <p>${esc(he.description)}</p>
      </section>
    </main>`;
}

function faqBody() {
  const en = PAGE_SEO.faq.en;
  const he = PAGE_SEO.faq.he;
  const enItems = FAQ_ITEMS.en.map(
    item => `<h2>${esc(item.q)}</h2><p>${esc(item.a)}</p>`,
  ).join("\n");
  const heItems = FAQ_ITEMS.he.map(
    item => `<h2>${esc(item.q)}</h2><p>${esc(item.a)}</p>`,
  ).join("\n");
  return `
    <main>
      <h1>${esc(en.h1)}</h1>
      <p>${esc(en.description)}</p>
      ${enItems}
      <section lang="he" dir="rtl">
        <h2>${esc(he.h1)}</h2>
        <p>${esc(he.description)}</p>
        ${heItems}
      </section>
      <p><a href="/">GroceryPair</a> · <a href="/about">About</a> · <a href="/blog">Blog</a> · <a href="/privacy">Privacy</a></p>
    </main>`;
}

function privacyBody() {
  const en = PAGE_SEO.privacy.en;
  const he = PAGE_SEO.privacy.he;
  return `
    <main>
      <h1>${esc(en.h1)}</h1>
      <p>${esc(en.description)}</p>
      <p><a href="/">GroceryPair</a> · <a href="/about">About</a> · <a href="/blog">Blog</a> · <a href="/faq">FAQ</a></p>
      <section lang="he" dir="rtl">
        <h2>${esc(he.h1)}</h2>
        <p>${esc(he.description)}</p>
      </section>
    </main>`;
}

function richHtml(text, lang) {
  return parseRichText(text).map(part => {
    if (!part.href) return esc(part.text);
    const href = resolveBlogHref(part.href, lang, part.exact);
    return `<a href="${esc(href)}">${esc(part.text)}</a>`;
  }).join("");
}

function blogIndexBody(lang) {
  const seo = lang === "he" ? BLOG_SEO.he : BLOG_SEO.en;
  const home = lang === "he" ? "/he" : "/";
  const posts = BLOG_POSTS.map(post => {
    const locale = lang === "he" ? post.he : post.en;
    return `<article>
      <h2><a href="${esc(blogPostPath(post.slug, lang))}">${esc(locale.h1)}</a></h2>
      <p>${esc(locale.description)}</p>
    </article>`;
  }).join("\n");
  return `
    <main>
      <h1>${esc(seo.h1)}</h1>
      <p>${esc(seo.lead)}</p>
      ${posts}
      <p><a href="${home}">GroceryPair</a> · <a href="/about">About</a> · <a href="${esc(blogIndexPath(lang))}">Blog</a> · <a href="/faq">FAQ</a></p>
    </main>`;
}

function blogPostBody(post, lang) {
  const locale = lang === "he" ? post.he : post.en;
  const home = lang === "he" ? "/he" : "/";
  const renderSection = section => `
      <h2${section.id ? ` id="${esc(section.id)}"` : ""}>${esc(section.h2)}</h2>
      ${(section.paragraphs ?? []).map(p => `<p>${richHtml(p, lang)}</p>`).join("\n")}
      ${section.items?.length
        ? `<ul>${section.items.map(item => `<li>${richHtml(item, lang)}</li>`).join("")}</ul>`
        : ""}
      ${section.table
        ? `<table><thead><tr>${section.table.headers.map(header => `<th>${esc(header)}</th>`).join("")}</tr></thead><tbody>${section.table.rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
        : ""}
      ${section.note ? `<p>${richHtml(section.note, lang)}</p>` : ""}
      ${(section.after ?? []).map(paragraph => `<p>${richHtml(paragraph, lang)}</p>`).join("\n")}
      ${(section.faqs ?? []).map(faq => `<h3>${esc(faq.q)}</h3><p>${richHtml(faq.a, lang)}</p>`).join("\n")}
      ${(section.links ?? []).map(link => `<p><a href="${esc(resolveBlogHref(link.href, lang, link.exact))}">${esc(link.label)}</a></p>`).join("\n")}
    `;
  const sections = locale.sections.map(renderSection).join("\n");
  return `
    <main>
      <h1>${esc(locale.h1)}</h1>
      <p>${richHtml(locale.lead, lang)}</p>
      ${sections}
      <p><a href="${home}">${esc(locale.cta)}</a></p>
      <p><a href="${esc(blogIndexPath(lang))}">${esc(lang === "he" ? BLOG_SEO.he.h1 : "Blog")}</a> · <a href="${home}">GroceryPair</a></p>
    </main>`;
}

function replaceRoot(html, body) {
  return replaceOnce(
    html,
    /<div id="root">[\s\S]*?<\/div>\s*<noscript>/,
    `<div id="root">${body}\n    </div>\n  <noscript>`,
  );
}

function replaceNoscript(html, description) {
  return replaceOnce(
    html,
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n    <p>${esc(description)}</p>\n  </noscript>`,
  );
}

function hebrewHomeBody() {
  const he = HOME_SEO.he;
  return `
    <main lang="he" dir="rtl">
      <h1>${esc(he.h1)}</h1>
      <p>${esc(he.description)}</p>
      <p><a href="${esc(blogPostPath(SHARED_LIST_SLUG, "he"))}">${esc(BLOG_POSTS.find(post => post.slug === SHARED_LIST_SLUG).he.h1)}</a></p>
      <p><a href="${esc(blogPostPath(PILLAR_SLUG, "he"))}">${esc(BLOG_POSTS.find(post => post.slug === PILLAR_SLUG).he.h1)}</a></p>
      <p><a href="/he">GroceryPair</a> · <a href="/about">About</a> · <a href="/he/blog">Blog</a> · <a href="/faq">FAQ</a></p>
    </main>`;
}

function hebrewHomeJsonLd() {
  const he = HOME_SEO.he;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GroceryPair",
    alternateName: he.title,
    url: `${SITE}${he.path}`,
    description: he.description,
    inLanguage: "he",
    applicationCategory: "LifestyleApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: {
      "@type": "WebApplication",
      name: "GroceryPair",
      url: `${SITE}/`,
    },
  };
}

const pages = [
  {
    file: "he/index.html",
    path: HOME_SEO.he.path,
    title: HOME_SEO.he.title,
    description: HOME_SEO.he.description,
    jsonLd: hebrewHomeJsonLd(),
    htmlLang: "he",
    hreflang: {
      he: `${SITE}/he`,
      en: `${SITE}/`,
      "x-default": `${SITE}/`,
    },
    body: hebrewHomeBody(),
  },
  {
    file: "about/index.html",
    path: PAGE_SEO.about.path,
    title: PAGE_SEO.about.en.title,
    description: PAGE_SEO.about.en.description,
    jsonLd: aboutJsonLd(),
    body: aboutBody(),
  },
  {
    file: "faq/index.html",
    path: PAGE_SEO.faq.path,
    title: PAGE_SEO.faq.en.title,
    description: PAGE_SEO.faq.en.description,
    jsonLd: faqJsonLd(FAQ_ITEMS.en),
    body: faqBody(),
  },
  {
    file: "privacy/index.html",
    path: PAGE_SEO.privacy.path,
    title: PAGE_SEO.privacy.en.title,
    description: PAGE_SEO.privacy.en.description,
    jsonLd: privacyJsonLd(),
    body: privacyBody(),
  },
  {
    file: "blog/index.html",
    path: blogIndexPath("en"),
    title: BLOG_SEO.en.title,
    description: BLOG_SEO.en.description,
    jsonLd: blogIndexJsonLd("en"),
    htmlLang: "en",
    hreflang: blogIndexHreflang(),
    body: blogIndexBody("en"),
  },
  {
    file: "he/blog/index.html",
    path: blogIndexPath("he"),
    title: BLOG_SEO.he.title,
    description: BLOG_SEO.he.description,
    jsonLd: blogIndexJsonLd("he"),
    htmlLang: "he",
    hreflang: blogIndexHreflang(),
    body: blogIndexBody("he"),
  },
  ...BLOG_POSTS.flatMap(post => [
    {
      file: `blog/${post.slug}/index.html`,
      path: blogPostPath(post.slug, "en"),
      title: post.en.title,
      description: post.en.description,
      jsonLd: blogPostJsonLd(post, "en"),
      htmlLang: "en",
      hreflang: blogPostHreflang(post.slug),
      body: blogPostBody(post, "en"),
    },
    {
      file: `he/blog/${post.slug}/index.html`,
      path: blogPostPath(post.slug, "he"),
      title: post.he.title,
      description: post.he.description,
      jsonLd: blogPostJsonLd(post, "he"),
      htmlLang: "he",
      hreflang: blogPostHreflang(post.slug),
      body: blogPostBody(post, "he"),
    },
  ]),
];

const shell = await readFile(join(dist, "index.html"), "utf8");

for (const page of pages) {
  let html = applyHead(shell, page);
  html = replaceRoot(html, page.body);
  html = replaceNoscript(html, page.description);
  const out = join(dist, page.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`SEO prerender ${page.path} → ${page.file}`);
}
