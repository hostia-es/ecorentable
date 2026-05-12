import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";
import kitDigitalBanner from "@/assets/kit-digital-banner.png";

const servicios = [
  { label: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
  { label: "Descarbonización con hidrógeno", href: "/servicios/descarbonizacion-con-hidrogeno" },
  { label: "Para particulares", href: "/servicios/descarbonizacion-para-particulares" },
  { label: "Para talleres", href: "/servicios/descarbonizacion-para-talleres" },
  { label: "Para empresas", href: "/servicios/descarbonizacion-para-empresas" },
  { label: "Flotas de camiones", href: "/servicios/descarbonizacion-para-flotas-de-camiones" },
  { label: "Coches de renting", href: "/servicios/descarbonizacion-para-coches-de-renting" },
  { label: "Limpieza de filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
  { label: "Mantenimiento de máquinas descarbonizadoras", href: "/servicios/mantenimiento-descarbonizadoras" },
];

const alquilerRenting = [
  { label: "Hub alquiler y renting", href: "/servicios/alquiler-renting-equipos" },
  { label: "H2 Profit 1000", href: "/servicios/alquiler-renting-h2-profit-1000" },
  { label: "H2 Profit 2000", href: "/servicios/alquiler-renting-h2-profit-2000" },
  { label: "H2 Profit 3000", href: "/servicios/alquiler-renting-h2-profit-3000" },
  { label: "Hy-Carbon Connect", href: "/servicios/alquiler-renting-hy-carbon-connect" },
  { label: "Carbon FAP", href: "/servicios/alquiler-renting-carbon-fap" },
  { label: "Opacímetro", href: "/servicios/alquiler-renting-opacimetro-ecologia-rentable" },
  { label: "Analizador de gases", href: "/servicios/alquiler-renting-analizador-gases-ecologia-rentable" },
];

const tienda = [
  { label: "Tienda", href: "/tienda" },
  { label: "Descarbonizadoras", href: "/tienda/descarbonizadoras" },
  { label: "Reacondicionadas", href: "/tienda/descarbonizadoras-reacondicionadas" },
  { label: "Máquinas DPF/FAP", href: "/tienda/maquinas-limpieza-filtro-particulas" },
  { label: "Opacímetros", href: "/tienda/opacimetros" },
  { label: "Analizadores de gases", href: "/tienda/analizadores-de-gases" },
  { label: "Kit Opacidad", href: "/tienda/kit-opacidad" },
];

const soluciones = [
  { label: "Gases altos ITV diésel", href: "/soluciones/gases-altos-itv-diesel" },
  { label: "Gases altos ITV gasolina", href: "/soluciones/gases-altos-itv-gasolina" },
  { label: "Humo negro diésel", href: "/soluciones/humo-negro-diesel" },
  { label: "Filtro partículas obstruido", href: "/soluciones/filtro-particulas-obstruido" },
  { label: "Fallo EGR", href: "/soluciones/fallo-egr" },
  { label: "Catalizador obstruido", href: "/soluciones/catalizador-obstruido" },
  { label: "Pérdida de potencia", href: "/soluciones/perdida-potencia-coche-diesel" },
];

const empresa = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Hazte socio", href: "/socios/hazte-socio" },
  { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
  { label: "Accesibilidad", href: "/accesibilidad" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">{title}</h4>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="text-sm hover:text-[hsl(148,72%,55%)] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[hsl(210,25%,6%)] text-[hsl(0,0%,75%)]">
      <div className="container mx-auto px-4 py-14">
        {/* Top: brand + contact */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logoER}
                alt="Ecología Rentable"
                className="h-7 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-[hsl(0,0%,60%)] max-w-md">
              Plataforma especializada en descarbonización, limpieza DPF, gases ITV,
              alquiler y renting de equipos y venta de maquinaria profesional.
              Soluciones para particulares, talleres, empresas y flotas.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[hsl(148,72%,55%)]" />
                <span>C. de Fuerteventura, 28703 San Sebastián de los Reyes, Madrid</span>
              </li>
              <li>
                <a href="tel:+34605928626" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} className="shrink-0 text-[hsl(148,72%,55%)]" />
                  <span>+34 605 928 626</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ecologiarentable.es" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} className="shrink-0 text-[hsl(148,72%,55%)]" />
                  <span>info@ecologiarentable.es</span>
                </a>
              </li>
            </ul>
          </div>

          <Column title="Empresa" links={empresa} />
          <Column title="Soluciones" links={soluciones} />
        </div>

        {/* Mid: services + tienda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Column title="Servicios" links={servicios} />
          <Column title="Alquiler y renting" links={alquilerRenting} />
          <Column title="Tienda" links={tienda} />

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              ¿Hablamos?
            </h4>
            <p className="text-sm text-[hsl(0,0%,60%)] mb-3">
              Asesoramiento técnico para particulares, talleres y empresas.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-white text-sm font-semibold px-4 py-2 transition-colors"
            >
              Solicitar información
            </Link>
            <Link
              to="/socios/hazte-socio"
              className="block mt-2 text-sm text-[hsl(148,72%,55%)] hover:text-white transition-colors"
            >
              Hazte socio →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
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

          <div className="mt-3 inline-block rounded-md bg-white px-4 py-2">
            <img
              src={kitDigitalBanner}
              alt="Financiado por la Unión Europea — Kit Digital, Plan de Recuperación, Transformación y Resiliencia (Next Generation EU)"
              className="block h-auto w-auto"
              style={{ maxHeight: "44px", maxWidth: "100%" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
