import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { privacyJsonLd } from "../seoPages.js";
import InfoPage, { usePageMeta } from "./InfoPage.jsx";

const PRIVACY_LD_ID = "privacy-jsonld";

export default function PrivacyPage({ lang, onLangChange, session }) {
  const t = useT();
  usePageMeta({
    title: t("privacyDocTitle"),
    description: t("privacyDocDesc"),
    path: "/privacy",
    lang,
  });
  const homeTo = session ? "/lists" : "/";

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
    <InfoPage title={t("privacyTitle")} lang={lang} onLangChange={onLangChange} homeTo={homeTo}>
      <p className="info-lead">{t("privacyLead")}</p>
      <p className="privacy-updated">{t("privacyUpdated")}</p>

      <h2>{t("privacyWhatTitle")}</h2>
      <p>{t("privacyWhat")}</p>

      <h2>{t("privacyListsTitle")}</h2>
      <p>{t("privacyLists")}</p>

      <h2>{t("privacyDeviceTitle")}</h2>
      <p>{t("privacyDevice")}</p>

      <h2>{t("privacyCookiesTitle")}</h2>
      <p>{t("privacyCookies")}</p>

      <h2>{t("privacyProvidersTitle")}</h2>
      <p>{t("privacyProviders")}</p>

      <h2>{t("privacyChoicesTitle")}</h2>
      <p>{t("privacyChoices")}</p>

      <h2>{t("privacyChangesTitle")}</h2>
      <p>{t("privacyChanges")}</p>

      <Link to={homeTo} className="btn btn-green btn-full">
        {session ? t("backToLists") : t("aboutCta")}
      </Link>
    </InfoPage>
  );
}
