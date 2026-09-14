import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useT } from "../i18n.js";
import { SITE } from "../seoPages.js";
import "./InfoPage.css";

/**
 * Sets document title, description, canonical, Open Graph, Twitter, and hreflang.
 * Restores the previous values on unmount.
 */
export function usePageMeta({ title, description, path, lang = "en" }) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const locale = lang === "he" ? "he_IL" : "en_US";
    const tracked = [
      { el: document.querySelector("title"), get: n => n.textContent, set: (n, v) => { n.textContent = v; }, value: title },
      { el: document.querySelector('meta[name="description"]'), attr: "content", value: description },
      { el: document.querySelector('link[rel="canonical"]'), attr: "href", value: url },
      { el: document.querySelector('meta[property="og:url"]'), attr: "content", value: url },
      { el: document.querySelector('meta[property="og:title"]'), attr: "content", value: title },
      { el: document.querySelector('meta[property="og:description"]'), attr: "content", value: description },
      { el: document.querySelector('meta[property="og:locale"]'), attr: "content", value: locale },
      { el: document.querySelector('meta[name="twitter:title"]'), attr: "content", value: title },
      { el: document.querySelector('meta[name="twitter:description"]'), attr: "content", value: description },
    ];

    const prev = tracked.map(item => {
      if (!item.el) return null;
      if (item.get) return item.get(item.el);
      return item.el.getAttribute(item.attr);
    });

    tracked.forEach(item => {
      if (!item.el) return;
      if (item.set) item.set(item.el, item.value);
      else item.el.setAttribute(item.attr, item.value);
    });

    const alts = [...document.querySelectorAll('link[rel="alternate"][hreflang]')];
    const prevAlts = alts.map(link => link.getAttribute("href"));
    alts.forEach(link => link.setAttribute("href", url));

    return () => {
      tracked.forEach((item, i) => {
        if (!item.el || prev[i] == null) return;
        if (item.set) item.set(item.el, prev[i]);
        else item.el.setAttribute(item.attr, prev[i]);
      });
      alts.forEach((link, i) => {
        if (prevAlts[i] != null) link.setAttribute("href", prevAlts[i]);
      });
    };
  }, [title, description, path, lang]);
}

export function LangSwitcher({ lang, onLangChange }) {
  return (
    <div className="lang-switcher">
      <button
        type="button"
        className={`lang-option ${lang === "he" ? "active" : ""}`}
        onClick={() => onLangChange("he")}
      >
        עב
      </button>
      <button
        type="button"
        className={`lang-option ${lang === "en" ? "active" : ""}`}
        onClick={() => onLangChange("en")}
      >
        EN
      </button>
    </div>
  );
}

export function SiteFooter() {
  const t = useT();
  return (
    <nav className="site-footer-links" aria-label={t("footerNav")}>
      <Link to="/about">{t("aboutNav")}</Link>
      <span aria-hidden="true">·</span>
      <Link to="/faq">{t("faqNav")}</Link>
    </nav>
  );
}

export default function InfoPage({ title, lang, onLangChange, homeTo, children }) {
  const t = useT();
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <div className="header">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(homeTo)}
          aria-label={t("back")}
        >
          ←
        </button>
        <h1>{title}</h1>
        <LangSwitcher lang={lang} onLangChange={onLangChange} />
      </div>
      <div className="info-page-body">{children}</div>
      <SiteFooter />
    </div>
  );
}
