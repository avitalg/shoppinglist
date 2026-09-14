import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { faqJsonLd } from "../seoPages.js";
import InfoPage, { usePageMeta } from "./InfoPage.jsx";

const FAQ_LD_ID = "faq-jsonld";

export default function FaqPage({ lang, onLangChange, session }) {
  const t = useT();
  const faqs = t("faqItems");
  usePageMeta({
    title: t("faqDocTitle"),
    description: t("faqDocDesc"),
    path: "/faq",
    lang,
  });
  const homeTo = session ? "/lists" : "/";

  useEffect(() => {
    if (!Array.isArray(faqs)) return;
    document.getElementById(FAQ_LD_ID)?.remove();

    const script = document.createElement("script");
    script.id = FAQ_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqJsonLd(faqs));
    document.head.appendChild(script);

    return () => document.getElementById(FAQ_LD_ID)?.remove();
  }, [faqs]);

  return (
    <InfoPage title={t("faqTitle")} lang={lang} onLangChange={onLangChange} homeTo={homeTo}>
      <p className="info-lead">{t("faqLead")}</p>

      <div className="faq-list">
        {Array.isArray(faqs)
          ? faqs.map(item => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))
          : null}
      </div>

      <Link to={homeTo} className="btn btn-green btn-full">
        {session ? t("backToLists") : t("aboutCta")}
      </Link>
    </InfoPage>
  );
}
