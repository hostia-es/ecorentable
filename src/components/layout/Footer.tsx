import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";
import kitDigitalBanner from "@/assets/kit-digital-banner.png";

const footerLinks = {
  servicios: [
    { label: "Descarbonización", href: "/servicios/descarbonizacion" },
    { label: "Para particulares", href: "/servicios/particulares" },
    { label: "Para talleres", href: "/servicios/talleres" },
    { label: "Para flotas", href: "/servicios/flotas" },
    { label: "Limpieza de filtros", href: "/servicios/limpieza-filtros" },
  ],
  soluciones: [
    { label: "Descarbonización diésel", href: "/soluciones/descarbonizacion-motor-diesel" },
    { label: "Limpieza DPF/FAP", href: "/soluciones/limpieza-filtro-particulas" },
    { label: "Limpieza EGR", href: "/soluciones/limpieza-egr-catalizador" },
    { label: "ITV gases", href: "/soluciones/itv-gases" },
    { label: "Aditivos motor", href: "/soluciones/aditivos-motor" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Socios", href: "/socios" },
    { label: "Tienda", href: "/tienda" },
    { label: "Contacto", href: "/contacto" },
    { label: "Accesibilidad", href: "/accesibilidad" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--gradient-dark)", color: "hsl(0 0% 90%)" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logoER} alt="Ecología Rentable" className="h-8 w-auto brightness-0 invert" style={{ filter: "brightness(0) invert(1)" }} />
            </Link>
            <p className="text-sm mb-4" style={{ color: "hsl(0 0% 65%)" }}>
              Especialistas en descarbonización de motores, limpieza DPF/FAP y EGR en toda España.
            </p>
            <div className="space-y-2 text-sm" style={{ color: "hsl(0 0% 65%)" }}>
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: "hsl(148 72% 55%)" }} />
                <span>+34 605 928 626</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "hsl(148 72% 55%)" }} />
                <span>info@ecologiarentable.es</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: "hsl(148 72% 55%)" }} />
                <span>C. Isabel Colbrand, 6, 28050 Madrid</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/ecologiarentable", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/ecologiarentable/", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/ecologiarentable/", label: "LinkedIn" },
                { Icon: Youtube, href: "https://www.youtube.com/@ecologiarentable", label: "YouTube" },
                { Icon: MessageCircle, href: "https://wa.me/34605928626", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 70%)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "hsl(148 65% 22%)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.1)"; (e.currentTarget as HTMLElement).style.color = "hsl(0 0% 70%)"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: "hsl(148 72% 55%)" }}>Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm transition-colors" style={{ color: "hsl(0 0% 65%)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(148 72% 55%)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(0 0% 65%)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: "hsl(148 72% 55%)" }}>Soluciones</h4>
            <ul className="space-y-2">
              {footerLinks.soluciones.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm transition-colors" style={{ color: "hsl(0 0% 65%)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(148 72% 55%)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(0 0% 65%)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: "hsl(148 72% 55%)" }}>Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm transition-colors" style={{ color: "hsl(0 0% 65%)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(148 72% 55%)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(0 0% 65%)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 50%)" }}>
          <p>© {new Date().getFullYear()} Ecología Rentable. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="/accesibilidad" className="hover:underline">Accesibilidad</Link>
            <a href="#" className="hover:underline">Política de privacidad</a>
            <a href="#" className="hover:underline">Aviso legal</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>

        {/* Kit Digital Banner */}
        <div className="mt-8 pt-6 border-t flex justify-center" style={{ borderColor: "hsl(0 0% 100% / 0.1)" }}>
          <img src={kitDigitalBanner} alt="Financiado por la Unión Europea con el programa Kit Digital por los fondos Next Generation (EU) del Mecanismo de Recuperación y Resiliencia" className="max-w-full h-auto" style={{ maxHeight: "60px", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
        </div>
      </div>
    </footer>
  );
}
