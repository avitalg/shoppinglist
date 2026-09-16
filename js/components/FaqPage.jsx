import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import { faqJsonLd } from "../seoPages.js";
import { trackEvent } from "../analytics.js";
import { MarketingPage, usePageMeta } from "./InfoPage.jsx";
import "./InfoPage.css";

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
    <MarketingPage lang={lang} onLangChange={onLangChange} homeTo={homeTo} layout="wide">
      <p className="blog-kicker">{t("faqNav")}</p>
      <h1 className="blog-page-title">{t("faqTitle")}</h1>
      <p className="info-lead">{t("faqLead")}</p>

      <div className="faq-list">
        {Array.isArray(faqs)
          ? faqs.map((item, index) => (
              <details
                key={item.q}
                className="faq-item"
                onToggle={e => {
                  if (e.currentTarget.open) {
                    trackEvent("faq_open", { index, logged_in: Boolean(session) });
                  }
                }}
              >
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))
          : null}
      </div>

      <Link to={homeTo} className="btn btn-green blog-cta">
        {session ? t("backToLists") : t("aboutCta")}
      </Link>
    </MarketingPage>
  );
}
