import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const CONSENT_KEY = "er_consent_v1";
const POLICY_VERSION = "1.0";
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
const GA_MEASUREMENT_ID = "G-ZW3HGQHFE6";
export const OPEN_COOKIE_SETTINGS_EVENT = "er:open-cookie-settings";

interface StoredConsent {
  version: string;
  timestamp: string;
  categories: {
    technical: true;
    analytics: boolean;
  };
}

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    const chosenAt = new Date(parsed.timestamp).getTime();
    if (
      parsed.version !== POLICY_VERSION ||
      !Number.isFinite(chosenAt) ||
      Date.now() - chosenAt >= CONSENT_MAX_AGE_MS
    ) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}

function deleteAnalyticsCookies() {
  const names = ["_ga", `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`];
  const domains = [undefined, window.location.hostname, ".ecologiarentable.es"];
  names.forEach((name) => {
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
    });
  });
}

function enableAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  window.gtag?.("js", new Date());

  if (!document.querySelector(`script[data-er-ga="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.erGa = GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  window.gtag?.("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

function disableAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteAnalyticsCookies();
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setAnalytics(stored.categories.analytics);
      if (stored.categories.analytics) enableAnalytics();
    }

    const openSettings = () => {
      const current = readConsent();
      setAnalytics(current?.categories.analytics ?? false);
      setConfiguring(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const save = (allowAnalytics: boolean) => {
    const consent: StoredConsent = {
      version: POLICY_VERSION,
      timestamp: new Date().toISOString(),
      categories: { technical: true, analytics: allowAnalytics },
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setAnalytics(allowAnalytics);
    if (allowAnalytics) enableAnalytics();
    else disableAnalytics();
    setConfiguring(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background shadow-2xl"
      aria-label="Preferencias de cookies"
      aria-live="polite"
    >
      <div className="container mx-auto max-w-5xl px-4 py-5">
        {configuring ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-foreground">Configurar cookies</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Elige qué categorías permites. Puedes cambiar tu decisión en cualquier momento.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start justify-between gap-4 rounded-md border border-border p-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Cookies técnicas</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Son necesarias para guardar tus preferencias, mantener el carrito y proteger las
                    áreas con sesión. No pueden desactivarse.
                  </p>
                </div>
                <Switch checked disabled aria-label="Cookies técnicas siempre activas" />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-md border border-border p-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Cookies analíticas</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Nos ayudan a conocer el uso del sitio mediante Google Analytics 4.
                  </p>
                </div>
                <Switch
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                  aria-label="Permitir cookies analíticas"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button variant="outline" className="w-full" onClick={() => save(analytics)}>
                Guardar preferencias
              </Button>
              <Button variant="outline" className="w-full" onClick={() => save(true)}>
                Aceptar todas
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto]">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Usamos cookies propias y de terceros para analizar el uso de la web. Consulta la{" "}
              <Link to="/cookies" className="font-semibold text-primary underline underline-offset-2">
                Política de Cookies
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[390px]">
              <Button variant="outline" className="w-full" onClick={() => save(true)}>Aceptar</Button>
              <Button variant="outline" className="w-full" onClick={() => save(false)}>Rechazar</Button>
              <Button variant="outline" className="w-full" onClick={() => setConfiguring(true)}>Configurar</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}