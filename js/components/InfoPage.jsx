import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useT } from "../i18n.js";
import { SITE } from "../seoPages.js";
import { useCookieConsent } from "./CookieBar.jsx";
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

/** Homepage-style top nav shared by marketing pages (blog, etc.). */
export function SiteHeader({ lang, onLangChange, homeTo = "/" }) {
  const t = useT();
  const { pathname } = useLocation();

  function navClass(path) {
    const active = path === "/blog"
      ? pathname.startsWith("/blog")
      : pathname === path;
    return active ? "is-active" : undefined;
  }

  return (
    <header className="site-header">
      <Link to={homeTo} className="site-brand">
        <span className="site-brand-mark" aria-hidden="true">🛒</span>
        <span>GroceryPair</span>
      </Link>
      <nav className="site-header-links" aria-label={t("footerNav")}>
        <Link to="/about" className={navClass("/about")}>{t("aboutNav")}</Link>
        <Link to="/blog" className={navClass("/blog")}>{t("blogNav")}</Link>
        <Link to="/faq" className={navClass("/faq")}>{t("faqNav")}</Link>
      </nav>
      <LangSwitcher lang={lang} onLangChange={onLangChange} />
    </header>
  );
}

export function SiteFooter() {
  const t = useT();
  const { openSettings } = useCookieConsent();
  return (
    <nav className="site-footer-links" aria-label={t("footerNav")}>
      <Link to="/about">{t("aboutNav")}</Link>
      <span aria-hidden="true">·</span>
      <Link to="/blog">{t("blogNav")}</Link>
      <span aria-hidden="true">·</span>
      <Link to="/faq">{t("faqNav")}</Link>
      <span aria-hidden="true">·</span>
      <Link to="/privacy">{t("privacyNav")}</Link>
      <span aria-hidden="true">·</span>
      <button type="button" className="site-footer-cookies" onClick={openSettings}>
        {t("cookieNav")}
      </button>
    </nav>
  );
}

/** Homepage-style shell for marketing pages (About, FAQ, Blog, Privacy). */
export function MarketingPage({
  lang,
  onLangChange,
  homeTo = "/",
  children,
  layout = "wide",
}) {
  return (
    <div className="site-page">
      <SiteHeader lang={lang} onLangChange={onLangChange} homeTo={homeTo} />
      <main className={`site-page-main site-page-main--${layout}`}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function InfoPage({ title, eyebrow, lang, onLangChange, homeTo, children }) {
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
        <div className="header-title-wrap">
          {eyebrow && <p className="header-eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
        </div>
        <LangSwitcher lang={lang} onLangChange={onLangChange} />
      </div>
      <div className="info-page-body">{children}</div>
      <SiteFooter />
    </div>
  );
}
