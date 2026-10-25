import { Fragment, useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useT } from "../i18n.js";
import { blogPostJsonLd, getBlogPost } from "../blogPosts.js";
import {
  blogIndexPath,
  blogPostHreflang,
  blogPostPath,
  isHePath,
  marketingHomePath,
  parseRichText,
  resolveBlogHref,
} from "../seoPages.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

const BLOG_POST_LD_ID = "blog-post-jsonld";

function ArticleLink({ link, lang }) {
  const href = resolveBlogHref(link.href, lang, link.exact);
  const external = href.startsWith("http");
  const jump = href.startsWith("#");
  if (external || jump) {
    return (
      <a href={href} {...(external ? { rel: "noopener noreferrer" } : {})}>
        {link.label}
      </a>
    );
  }
  return <Link to={href}>{link.label}</Link>;
}

function RichText({ text, lang }) {
  return parseRichText(text).map((part, index) => {
    if (!part.href) {
      return <Fragment key={index}>{part.text}</Fragment>;
    }
    return (
      <ArticleLink
        key={`${part.href}-${index}`}
        link={{ href: part.href, label: part.text, exact: part.exact }}
        lang={lang}
      />
    );
  });
}

export default function BlogArticlePage({ lang, onLangChange, session }) {
  const t = useT();
  const { slug } = useParams();
  const { pathname } = useLocation();
  const pageLang = isHePath(pathname) ? "he" : "en";
  const post = getBlogPost(slug);
  const homeTo = marketingHomePath(session, pageLang);
  const indexTo = blogIndexPath(pageLang);

  const locale = post ? (pageLang === "he" ? post.he : post.en) : null;

  usePageMeta({
    title: locale?.title ?? "GroceryPair Blog",
    description: locale?.description ?? "",
    path: post ? blogPostPath(post.slug, pageLang) : indexTo,
    lang: pageLang,
    hreflang: post ? blogPostHreflang(post.slug) : undefined,
  });

  useEffect(() => {
    if (!post) return undefined;
    document.getElementById(BLOG_POST_LD_ID)?.remove();
    const script = document.createElement("script");
    script.id = BLOG_POST_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(blogPostJsonLd(post, pageLang));
    document.head.appendChild(script);
    return () => document.getElementById(BLOG_POST_LD_ID)?.remove();
  }, [post, pageLang]);

  if (!post || !locale) {
    return <Navigate to={indexTo} replace />;
  }

  const ctaLabel = session ? t("backToLists") : locale.cta;

  return (
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <article className="blog-post">
        <header className="blog-post-hero">
          <p className="blog-meta">
            <Link to={indexTo}>{t("blogNav")}</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{locale.publishedLabel}</time>
          </p>
          <h1 className="blog-page-title">{locale.h1}</h1>
          <p className="blog-post-lead"><RichText text={locale.lead} lang={pageLang} /></p>
        </header>

        <div className="blog-post-body">
          <div className="blog-article">
            {locale.sections.map(section => (
              <section
                key={section.h2}
                id={section.id}
                className={section.callout ? "blog-callout" : undefined}
              >
                <h2>{section.h2}</h2>
                {(section.paragraphs ?? []).map((paragraph, index) => (
                  <p key={`${section.h2}-${index}`}>
                    <RichText text={paragraph} lang={pageLang} />
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="blog-checklist">
                    {section.items.map(item => (
                      <li key={item}><RichText text={item} lang={pageLang} /></li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="blog-table-wrap">
                    <table className="blog-table">
                      <thead>
                        <tr>
                          {section.table.headers.map(header => (
                            <th key={header} scope="col">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map(row => (
                          <tr key={row[0]}>
                            {row.map((cell, index) => (
                              <td key={`${row[0]}-${index}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {section.note ? <p><RichText text={section.note} lang={pageLang} /></p> : null}
                {(section.after ?? []).map((paragraph, index) => (
                  <p key={`${section.h2}-after-${index}`}>
                    <RichText text={paragraph} lang={pageLang} />
                  </p>
                ))}
                {section.faqs?.map(faq => (
                  <div key={faq.q}>
                    <h3>{faq.q}</h3>
                    <p><RichText text={faq.a} lang={pageLang} /></p>
                  </div>
                ))}
                {section.links?.length ? (
                  <ul className="blog-links">
                    {section.links.map(link => (
                      <li key={`${link.href}-${link.label}`}>
                        <ArticleLink link={link} lang={pageLang} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="blog-post-aside" aria-label={t("blogNav")}>
            <div className="blog-aside-panel">
              <p className="blog-aside-kicker">{t("blogAsideKicker")}</p>
              <p className="blog-aside-text">{t("blogAsideText")}</p>
              <Link to={homeTo} className="btn btn-green blog-aside-cta">
                {ctaLabel}
              </Link>
            </div>
          </aside>
        </div>

        <div className="blog-post-mobile-cta">
          <Link to={homeTo} className="btn btn-green blog-cta">
            {ctaLabel}
          </Link>
        </div>
      </article>
    </MarketingPage>
  );
}
