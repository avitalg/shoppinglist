import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useT } from "../i18n.js";
import { getBlogPost, blogPostJsonLd } from "../blogPosts.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

const BLOG_POST_LD_ID = "blog-post-jsonld";

export default function BlogArticlePage({ lang, onLangChange, session }) {
  const t = useT();
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const homeTo = session ? "/lists" : "/";

  const locale = post ? (lang === "he" ? post.he : post.en) : null;

  usePageMeta({
    title: locale?.title ?? "GroceryPair Blog",
    description: locale?.description ?? "",
    path: post?.path ?? "/blog",
    lang,
  });

  useEffect(() => {
    if (!post) return undefined;
    document.getElementById(BLOG_POST_LD_ID)?.remove();
    const script = document.createElement("script");
    script.id = BLOG_POST_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(blogPostJsonLd(post));
    document.head.appendChild(script);
    return () => document.getElementById(BLOG_POST_LD_ID)?.remove();
  }, [post]);

  if (!post || !locale) {
    return <Navigate to="/blog" replace />;
  }

  const ctaLabel = session ? t("backToLists") : locale.cta;

  return (
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <article className="blog-post">
        <header className="blog-post-hero">
          <p className="blog-meta">
            <Link to="/blog">{t("blogNav")}</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{locale.publishedLabel}</time>
          </p>
          <h1 className="blog-page-title">{locale.h1}</h1>
          <p className="blog-post-lead">{locale.lead}</p>
        </header>

        <div className="blog-post-body">
          <div className="blog-article">
            {locale.sections.map(section => (
              <section key={section.h2}>
                <h2>{section.h2}</h2>
                {(section.paragraphs ?? []).map((paragraph, index) => (
                  <p key={`${section.h2}-${index}`}>{paragraph}</p>
                ))}
                {section.items?.length ? (
                  <ul className="blog-checklist">
                    {section.items.map(item => (
                      <li key={item}>{item}</li>
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
