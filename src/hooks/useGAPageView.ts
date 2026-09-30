import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-ZW3HGQHFE6";
const CONSENT_KEY = "er_consent_v1";
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function hasAnalyticsConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const ts = Date.parse(parsed?.timestamp);
    if (!Number.isFinite(ts) || Date.now() - ts > CONSENT_MAX_AGE_MS) return false;
    return parsed?.categories?.analytics === true;
  } catch {
    return false;
  }
}

export function useGAPageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    if (!hasAnalyticsConsent()) return;
    const page_path = location.pathname + location.search;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path });
  }, [location.pathname, location.search]);
}
