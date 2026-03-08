import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";
import kitDigitalBanner from "@/assets/kit-digital-banner.png";

const webLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Socios", href: "/socios" },
  { label: "Contacto", href: "/contacto" },
];

const serviciosLinks = [
  { label: "Descarbonización", href: "/servicios/descarbonizacion" },
  { label: "Limpieza de filtros", href: "/servicios/limpieza-filtros" },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(210,25%,6%)] text-[hsl(0,0%,75%)]">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src={logoER}
                alt="Ecología Rentable"
                className="h-7 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-[hsl(0,0%,55%)]">
              Somos expertos en descarbonización de motores, limpieza de filtros
              de partículas (DPF/FAP) y válvulas EGR. Más de 10 años de
              experiencia en toda España.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[hsl(148,72%,45%)]" />
                <span>C. Isabel Colbrand, 6, 28050 Madrid</span>
              </li>
              <li>
                <a
                  href="tel:+34605928626"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-[hsl(148,72%,45%)]" />
                  <span>+34 605 928 626</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecologiarentable.es"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-[hsl(148,72%,45%)]" />
                  <span>info@ecologiarentable.es</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 — Web */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Web
            </h4>
            <ul className="space-y-2">
              {webLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm hover:text-[hsl(148,72%,45%)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Servicios */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-2">
              {serviciosLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm hover:text-[hsl(148,72%,45%)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-[hsl(0,0%,45%)]">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <span className="hidden sm:inline">·</span>
            <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
            <span className="hidden sm:inline">·</span>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <span className="hidden sm:inline">·</span>
            <Link to="/accesibilidad" className="hover:text-white transition-colors">Accesibilidad</Link>
          </div>

          <p className="text-xs text-[hsl(0,0%,40%)]">
            © {new Date().getFullYear()} Ecología Rentable. Todos los derechos reservados.
          </p>

          {/* Kit Digital */}
          <img
            src={kitDigitalBanner}
            alt="Financiado por la Unión Europea con el programa Kit Digital"
            className="max-w-full h-auto mt-2"
            style={{ maxHeight: "50px", filter: "brightness(0) invert(1)", opacity: 0.6 }}
          />
        </div>
      </div>
    </footer>
  );
}
