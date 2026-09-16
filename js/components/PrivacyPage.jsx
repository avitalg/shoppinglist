import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { privacyJsonLd } from "../seoPages.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

const PRIVACY_LD_ID = "privacy-jsonld";

const SECTIONS = [
  { id: "what", titleKey: "privacyWhatTitle", bodyKey: "privacyWhat" },
  { id: "lists", titleKey: "privacyListsTitle", bodyKey: "privacyLists" },
  { id: "device", titleKey: "privacyDeviceTitle", bodyKey: "privacyDevice" },
  { id: "cookies", titleKey: "privacyCookiesTitle", bodyKey: "privacyCookies" },
  { id: "providers", titleKey: "privacyProvidersTitle", bodyKey: "privacyProviders" },
  { id: "choices", titleKey: "privacyChoicesTitle", bodyKey: "privacyChoices" },
  { id: "changes", titleKey: "privacyChangesTitle", bodyKey: "privacyChanges" },
];

export default function PrivacyPage({ lang, onLangChange, session }) {
  const t = useT();
  usePageMeta({
    title: t("privacyDocTitle"),
    description: t("privacyDocDesc"),
    path: "/privacy",
    lang,
  });
  const homeTo = session ? "/lists" : "/";
  const ctaLabel = session ? t("backToLists") : t("aboutCta");

  useEffect(() => {
    document.getElementById(PRIVACY_LD_ID)?.remove();
    const script = document.createElement("script");
    script.id = PRIVACY_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(privacyJsonLd());
    document.head.appendChild(script);
    return () => document.getElementById(PRIVACY_LD_ID)?.remove();
  }, []);

  return (
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <article className="blog-post privacy-doc">
        <header className="blog-post-hero">
          <p className="blog-kicker">{t("privacyNav")}</p>
          <h1 className="blog-page-title">{t("privacyTitle")}</h1>
          <p className="blog-post-lead">{t("privacyLead")}</p>
          <p className="privacy-updated">{t("privacyUpdated")}</p>
        </header>

        <div className="blog-post-body">
          <div className="blog-article">
            {SECTIONS.map(section => (
              <section key={section.id} id={section.id} className="privacy-section">
                <h2>{t(section.titleKey)}</h2>
                <p>{t(section.bodyKey)}</p>
              </section>
            ))}
          </div>

          <aside className="blog-post-aside privacy-aside" aria-label={t("privacyNav")}>
            <nav className="privacy-toc">
              <p className="privacy-toc-label">{t("privacyTocLabel")}</p>
              <ol>
                {SECTIONS.map(section => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{t(section.titleKey)}</a>
                  </li>
                ))}
              </ol>
            </nav>
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
