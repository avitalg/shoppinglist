import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import "./CookieBar.css";

export const CookieConsentContext = createContext({
  openSettings: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export default function CookieBar({ onAccept, onReject }) {
  const t = useT();

  return (
    <div className="cookie-bar" role="dialog" aria-labelledby="cookie-bar-title" aria-describedby="cookie-bar-text">
      <div className="cookie-bar-inner">
        <p id="cookie-bar-title" className="cookie-bar-title">{t("cookieTitle")}</p>
        <p id="cookie-bar-text" className="cookie-bar-text">
          {t("cookieBody")}{" "}
          <Link to="/privacy" className="cookie-bar-link">{t("cookiePrivacyLink")}</Link>.
        </p>
        <div className="cookie-bar-actions">
          <button type="button" className="btn btn-outline" onClick={onReject}>
            {t("cookieReject")}
          </button>
          <button type="button" className="btn btn-green" onClick={onAccept}>
            {t("cookieAccept")}
          </button>
        </div>
      </div>
    </div>
  );
}
