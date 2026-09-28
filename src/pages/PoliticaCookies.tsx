import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

export default function PoliticaCookies() {
  const openSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));

  return (
    <LegalPageLayout
      title="Política de Cookies"
      description="Información sobre las cookies técnicas y analíticas utilizadas por Ecología Rentable."
      path="/cookies"
    >
      <section>
        <h2>Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en el navegador para recordar
          información, permitir funciones necesarias o conocer de forma agregada cómo se utiliza la web.
          El almacenamiento local cumple una función similar dentro del navegador.
        </p>
      </section>
      <section>
        <h2>Qué cookies usamos</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3">Nombre</th><th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Finalidad</th><th className="px-4 py-3">Duración</th>
                <th className="px-4 py-3">Titular</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3 font-medium">_ga</td><td className="px-4 py-3">Google Analytics 4</td><td className="px-4 py-3">Analítica</td><td className="px-4 py-3">Dos años</td><td className="px-4 py-3">Google</td></tr>
              <tr><td className="px-4 py-3 font-medium">_ga_ZW3HGQHFE6</td><td className="px-4 py-3">Google Analytics 4</td><td className="px-4 py-3">Estado de sesión analítica</td><td className="px-4 py-3">Dos años</td><td className="px-4 py-3">Google</td></tr>
              <tr><td className="px-4 py-3 font-medium">ecorentable.cart.v1</td><td className="px-4 py-3">Almacenamiento local técnico</td><td className="px-4 py-3">Carrito de solicitud</td><td className="px-4 py-3">Hasta que la persona usuaria lo borre</td><td className="px-4 py-3">Propia</td></tr>
              <tr><td className="px-4 py-3 font-medium">er_consent_v1</td><td className="px-4 py-3">Almacenamiento local técnico</td><td className="px-4 py-3">Guardar la elección de cookies</td><td className="px-4 py-3">Doce meses</td><td className="px-4 py-3">Propia</td></tr>
              <tr><td className="px-4 py-3 font-medium">Token de sesión de Supabase</td><td className="px-4 py-3">Almacenamiento técnico</td><td className="px-4 py-3">Autenticación en administración y portal de socios</td><td className="px-4 py-3">Duración de la sesión</td><td className="px-4 py-3">Propia</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Las cookies técnicas no requieren consentimiento porque están amparadas por la excepción del
          artículo 22.2 de la LSSI-CE. Las cookies analíticas solo se activan después de tu aceptación.
        </p>
      </section>
      <section>
        <h2>Cómo cambiar tu decisión</h2>
        <p>
          Puedes modificar o retirar tu consentimiento en cualquier momento desde el enlace Configurar
          cookies del pie de página o mediante este botón.
        </p>
        <button type="button" onClick={openSettings} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          Configurar cookies
        </button>
        <p>
          Para borrar cookies desde el navegador, abre la configuración de privacidad de Chrome y entra en
          Cookies y otros datos de sitios; en Firefox, entra en Privacidad y seguridad; en Safari, abre
          Privacidad y Gestionar datos de sitios web; y en Edge, entra en Cookies y permisos del sitio.
        </p>
      </section>
    </LegalPageLayout>
  );
}