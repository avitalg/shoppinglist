import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { aboutJsonLd } from "../seoPages.js";
import InfoPage, { usePageMeta } from "./InfoPage.jsx";

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
    <InfoPage title={t("aboutTitle")} lang={lang} onLangChange={onLangChange} homeTo={homeTo}>
      <p className="info-lead">{t("aboutLead")}</p>

      <h2>{t("aboutHowTitle")}</h2>
      <ol className="info-steps">
        <li>{t("aboutStep1")}</li>
        <li>{t("aboutStep2")}</li>
        <li>{t("aboutStep3")}</li>
      </ol>

      <h2>{t("aboutFeaturesTitle")}</h2>
      <ul className="feature-list">
        <li>{t("aboutFeature1")}</li>
        <li>{t("aboutFeature2")}</li>
        <li>{t("aboutFeature3")}</li>
        <li>{t("aboutFeature4")}</li>
        <li>{t("aboutFeature5")}</li>
      </ul>

      <h2>{t("aboutPrivacyTitle")}</h2>
      <p>{t("aboutPrivacy")}</p>

      <Link to={homeTo} className="btn btn-green btn-full">
        {session ? t("backToLists") : t("aboutCta")}
      </Link>
    </InfoPage>
  );
}
