import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE, PAGE_SEO, FAQ_ITEMS, faqJsonLd, aboutJsonLd, privacyJsonLd,
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
  const next = html.replace(pattern, replacement);
  if (next === html) {
    throw new Error(`Could not update HTML matching ${pattern}`);
  }
  return next;
}

function applyHead(html, { path, title, description, jsonLd }) {
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
  html = html.replace(
    /(<link rel="alternate" hreflang="[^"]+" href=")[^"]*("\s*\/?>)/g,
    `$1${url}$2`,
  );
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

function blogIndexBody() {
  const en = BLOG_SEO.en;
  const he = BLOG_SEO.he;
  const enPosts = BLOG_POSTS.map(post => {
    const locale = post.en;
    return `<article>
      <h2><a href="${esc(post.path)}">${esc(locale.h1)}</a></h2>
      <p>${esc(locale.description)}</p>
    </article>`;
  }).join("\n");
  const hePosts = BLOG_POSTS.map(post => {
    const locale = post.he;
    return `<article>
      <h2><a href="${esc(post.path)}">${esc(locale.h1)}</a></h2>
      <p>${esc(locale.description)}</p>
    </article>`;
  }).join("\n");
  return `
    <main>
      <h1>${esc(en.h1)}</h1>
      <p>${esc(en.lead)}</p>
      ${enPosts}
      <section lang="he" dir="rtl">
        <h2>${esc(he.h1)}</h2>
        <p>${esc(he.lead)}</p>
        ${hePosts}
      </section>
      <p><a href="/">GroceryPair</a> · <a href="/about">About</a> · <a href="/faq">FAQ</a></p>
    </main>`;
}

function blogPostBody(post) {
  const en = post.en;
  const he = post.he;
  const renderSection = section => `
      <h2>${esc(section.h2)}</h2>
      ${(section.paragraphs ?? []).map(p => `<p>${esc(p)}</p>`).join("\n")}
      ${section.items?.length
        ? `<ul>${section.items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`
        : ""}
    `;
  const enSections = en.sections.map(renderSection).join("\n");
  const heSections = he.sections.map(renderSection).join("\n");
  return `
    <main>
      <h1>${esc(en.h1)}</h1>
      <p>${esc(en.lead)}</p>
      ${enSections}
      <p><a href="/">${esc(en.cta)}</a></p>
      <section lang="he" dir="rtl">
        <h2>${esc(he.h1)}</h2>
        <p>${esc(he.lead)}</p>
        ${heSections}
        <p><a href="/">${esc(he.cta)}</a></p>
      </section>
      <p><a href="/blog">Blog</a> · <a href="/">GroceryPair</a></p>
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

const pages = [
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
    path: BLOG_SEO.path,
    title: BLOG_SEO.en.title,
    description: BLOG_SEO.en.description,
    jsonLd: blogIndexJsonLd(),
    body: blogIndexBody(),
  },
  ...BLOG_POSTS.map(post => ({
    file: `blog/${post.slug}/index.html`,
    path: post.path,
    title: post.en.title,
    description: post.en.description,
    jsonLd: blogPostJsonLd(post),
    body: blogPostBody(post),
  })),
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
