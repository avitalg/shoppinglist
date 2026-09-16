import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { aboutJsonLd } from "../seoPages.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

const ABOUT_LD_ID = "about-jsonld";

export default function AboutPage({ lang, onLangChange, session }) {
  const t = useT();
  usePageMeta({
    title: t("aboutDocTitle"),
    description: t("aboutDocDesc"),
    path: "/about",
    lang,
  });
  const homeTo = session ? "/lists" : "/";

  useEffect(() => {
    document.getElementById(ABOUT_LD_ID)?.remove();
    const script = document.createElement("script");
    script.id = ABOUT_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(aboutJsonLd());
    document.head.appendChild(script);
    return () => document.getElementById(ABOUT_LD_ID)?.remove();
  }, []);

  return (
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <p className="blog-kicker">{t("aboutNav")}</p>
      <h1 className="blog-page-title">{t("aboutTitle")}</h1>
      <p className="info-lead">{t("aboutLead")}</p>

      <section className="site-section">
        <h2>{t("aboutHowTitle")}</h2>
        <ol className="info-steps">
          <li>{t("aboutStep1")}</li>
          <li>{t("aboutStep2")}</li>
          <li>{t("aboutStep3")}</li>
        </ol>
      </section>

      <section className="site-section">
        <h2>{t("aboutFeaturesTitle")}</h2>
        <ul className="feature-list">
          <li>{t("aboutFeature1")}</li>
          <li>{t("aboutFeature3")}</li>
          <li>{t("aboutFeature4")}</li>
          <li>{t("aboutFeature5")}</li>
        </ul>
      </section>

      <section className="site-section">
        <h2>{t("aboutPrivacyTitle")}</h2>
        <p>{t("aboutPrivacy")}</p>
        <p>
          <Link to="/privacy">{t("aboutPrivacyLink")}</Link>
        </p>
      </section>

      <Link to={homeTo} className="btn btn-green blog-cta">
        {session ? t("backToLists") : t("aboutCta")}
      </Link>
    </MarketingPage>
  );
}
