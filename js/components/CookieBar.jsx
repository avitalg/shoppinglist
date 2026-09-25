import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n.js";
import "./CookieBar.css";

export const CookieConsentContext = createContext({
  openSettings: () => {},
  regime: undefined,
  regionReady: false,
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

/** CCPA opt-out for US visitors. Not the EU accept/reject bar. */
export function DoNotSellBar({ optedOut, onOptOut, onAllow, onClose }) {
  const t = useT();

  return (
    <div className="cookie-bar" role="dialog" aria-labelledby="dns-title" aria-describedby="dns-text">
      <div className="cookie-bar-inner">
        <p id="dns-title" className="cookie-bar-title">
          {optedOut ? t("doNotSellOptedOutTitle") : t("doNotSellTitle")}
        </p>
        <p id="dns-text" className="cookie-bar-text">
          {optedOut ? t("doNotSellOptedOutBody") : t("doNotSellBody")}{" "}
          <Link to="/privacy" className="cookie-bar-link">{t("cookiePrivacyLink")}</Link>.
        </p>
        <div className="cookie-bar-actions">
          {optedOut ? (
            <>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                {t("doNotSellClose")}
              </button>
              <button type="button" className="btn btn-green" onClick={onAllow}>
                {t("doNotSellAllow")}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                {t("doNotSellKeep")}
              </button>
              <button type="button" className="btn btn-green" onClick={onOptOut}>
                {t("doNotSellOptOut")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
