import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { BLOG_POSTS, BLOG_SEO, blogIndexJsonLd } from "../blogPosts.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

const BLOG_INDEX_LD_ID = "blog-index-jsonld";

export default function BlogIndexPage({ lang, onLangChange, session }) {
  const t = useT();
  const seo = lang === "he" ? BLOG_SEO.he : BLOG_SEO.en;
  usePageMeta({
    title: seo.title,
    description: seo.description,
    path: BLOG_SEO.path,
    lang,
  });
  const homeTo = session ? "/lists" : "/";

  useEffect(() => {
    document.getElementById(BLOG_INDEX_LD_ID)?.remove();
    const script = document.createElement("script");
    script.id = BLOG_INDEX_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(blogIndexJsonLd());
    document.head.appendChild(script);
    return () => document.getElementById(BLOG_INDEX_LD_ID)?.remove();
  }, []);

  return (
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <p className="blog-kicker">{t("blogNav")}</p>
      <h1 className="blog-page-title">{seo.h1}</h1>
      <p className="info-lead">{seo.lead}</p>

      <ul className="blog-post-list">
        {BLOG_POSTS.map(post => {
          const locale = lang === "he" ? post.he : post.en;
          return (
            <li key={post.slug}>
              <Link to={post.path} className="blog-post-card">
                <time dateTime={post.date}>{locale.publishedLabel}</time>
                <span className="blog-post-card-title">{locale.h1}</span>
                <span className="blog-post-card-desc">{locale.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link to={homeTo} className="btn btn-green blog-cta">
        {session ? t("backToLists") : t("blogCta")}
      </Link>
    </MarketingPage>
  );
}
