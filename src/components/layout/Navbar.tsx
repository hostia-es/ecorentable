import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";

type NavChild = { label: string; href: string };
type NavGroup = { title?: string; items: NavChild[] };
type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
  children?: NavChild[];
};

const navItems: NavItem[] = [
  {
    label: "Servicios",
    href: "/servicios",
    groups: [
      {
        title: "Descarbonización",
        items: [
          { label: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
          { label: "Descarbonización con hidrógeno", href: "/servicios/descarbonizacion-con-hidrogeno" },
          { label: "Para particulares", href: "/servicios/descarbonizacion-para-particulares" },
          { label: "Para talleres", href: "/servicios/descarbonizacion-para-talleres" },
          { label: "Para empresas", href: "/servicios/descarbonizacion-para-empresas" },
          { label: "Para flotas de camiones", href: "/servicios/descarbonizacion-para-flotas-de-camiones" },
          { label: "Para coches de renting", href: "/servicios/descarbonizacion-para-coches-de-renting" },
        ],
      },
      {
        title: "DPF, mantenimiento y postventa",
        items: [
          { label: "Limpieza filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
          { label: "Mantenimiento máquinas FlexFuel", href: "/servicios/mantenimiento-maquinas-flexfuel" },
        ],
      },
      {
        title: "Alquiler y renting de equipos",
        items: [
          { label: "Hub alquiler y renting", href: "/servicios/alquiler-renting-equipos" },
          { label: "H2 Profit 1000", href: "/servicios/alquiler-renting-h2-profit-1000" },
          { label: "H2 Profit 2000", href: "/servicios/alquiler-renting-h2-profit-2000" },
          { label: "H2 Profit 3000", href: "/servicios/alquiler-renting-h2-profit-3000" },
          { label: "Hy-Carbon Connect", href: "/servicios/alquiler-renting-hy-carbon-connect" },
          { label: "Carbon FAP", href: "/servicios/alquiler-renting-carbon-fap" },
          { label: "Opacímetro", href: "/servicios/alquiler-renting-opacimetro-ecologia-rentable" },
          { label: "Analizador de gases", href: "/servicios/alquiler-renting-analizador-gases-ecologia-rentable" },
        ],
      },
    ],
  },
  {
    label: "Soluciones",
    href: "/soluciones",
    children: [
      { label: "Gases altos ITV diésel", href: "/soluciones/gases-altos-itv-diesel" },
      { label: "Gases altos ITV gasolina", href: "/soluciones/gases-altos-itv-gasolina" },
      { label: "Humo negro en diésel", href: "/soluciones/humo-negro-diesel" },
      { label: "Fallo anticontaminación", href: "/soluciones/fallo-anticontaminacion" },
      { label: "Filtro de partículas obstruido", href: "/soluciones/filtro-particulas-obstruido" },
      { label: "Limpiar DPF sin desmontar", href: "/soluciones/limpiar-dpf-sin-desmontar" },
      { label: "Fallo EGR", href: "/soluciones/fallo-egr" },
      { label: "Catalizador obstruido", href: "/soluciones/catalizador-obstruido" },
      { label: "Pérdida de potencia diésel", href: "/soluciones/perdida-potencia-coche-diesel" },
      { label: "Descarbonización motor diésel", href: "/soluciones/descarbonizacion-motor-diesel" },
      { label: "Descarbonización motor gasolina", href: "/soluciones/descarbonizacion-motor-gasolina" },
    ],
  },
  {
    label: "Tienda",
    href: "/tienda",
    groups: [
      {
        title: "Descarbonizadoras",
        items: [
          { label: "Ver categoría", href: "/tienda/descarbonizadoras" },
          { label: "H2 Profit 1000", href: "/tienda/descarbonizadoras/h2-profit-1000" },
          { label: "H2 Profit 2000", href: "/tienda/descarbonizadoras/h2-profit-2000" },
          { label: "H2 Profit 3000", href: "/tienda/descarbonizadoras/h2-profit-3000" },
          { label: "Hy-Carbon Connect", href: "/tienda/descarbonizadoras/hy-carbon-connect" },
        ],
      },
      {
        title: "Reacondicionadas",
        items: [
          { label: "Ver categoría", href: "/tienda/descarbonizadoras-reacondicionadas" },
          { label: "H2 Profit 1000", href: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-1000-reacondicionada" },
          { label: "H2 Profit 2000", href: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-2000-reacondicionada" },
          { label: "H2 Profit 3000", href: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-3000-reacondicionada" },
          { label: "Hy-Carbon Connect", href: "/tienda/descarbonizadoras-reacondicionadas/hy-carbon-connect-reacondicionada" },
        ],
      },
      {
        title: "DPF, opacidad y emisiones",
        items: [
          { label: "Máquinas limpieza DPF/FAP", href: "/tienda/maquinas-limpieza-filtro-particulas" },
          { label: "Carbon FAP", href: "/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" },
          { label: "Opacímetros", href: "/tienda/opacimetros" },
          { label: "Analizadores de gases", href: "/tienda/analizadores-de-gases" },
          { label: "Kit Opacidad", href: "/tienda/kit-opacidad" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
  { label: "Hazte socio", href: "/socios/hazte-socio" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const hasMenu = (item: NavItem) => !!(item.children?.length || item.groups?.length);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm" style={{ borderColor: "hsl(var(--border))" }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoER} alt="Ecología Rentable" className="h-8 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasMenu(item) && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-accent-green-light"
                      : "text-foreground hover:text-primary hover:bg-secondary"
                  }`}
                  style={isActive(item.href) ? { color: "hsl(var(--primary))", background: "hsl(var(--accent-green-light))" } : {}}
                >
                  {item.label}
                  {hasMenu(item) && <ChevronDown size={14} />}
                </Link>

                {hasMenu(item) && activeDropdown === item.href && (
                  <div
                    className={`absolute top-full left-0 pt-2 z-50 ${
                      item.groups ? "min-w-[640px]" : "w-64"
                    }`}
                  >
                    <div
                      className="rounded-lg border bg-white shadow-lg py-3 px-2"
                      style={{ borderColor: "hsl(var(--border))", boxShadow: "var(--shadow-hero)" }}
                    >
                      {item.groups ? (
                        <div className={`grid gap-x-4 ${item.groups.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                          {item.groups.map((g) => (
                            <div key={g.title} className="px-2">
                              {g.title && (
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mt-1 mb-1.5">
                                  {g.title}
                                </div>
                              )}
                              <ul>
                                {g.items.map((c) => (
                                  <li key={c.href}>
                                    <Link
                                      to={c.href}
                                      className="block px-2 py-1.5 text-sm rounded transition-colors hover:bg-secondary hover:text-primary"
                                      style={{ color: "hsl(var(--foreground))" }}
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul>
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                to={c.href}
                                className="block px-3 py-1.5 text-sm rounded transition-colors hover:bg-secondary hover:text-primary"
                                style={{ color: "hsl(var(--foreground))" }}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contacto" className="hidden md:flex btn-primary text-sm px-4 py-2">
              Contactar
            </Link>
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setOpen(!open)}
              style={{ color: "hsl(var(--foreground))" }}
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white px-4 pb-4 pt-2 max-h-[80vh] overflow-y-auto" style={{ borderColor: "hsl(var(--border))" }}>
          {navItems.map((item) => (
            <div key={item.href} className="py-1">
              <Link
                to={item.href}
                className="block py-2 text-sm font-semibold border-b"
                style={{ color: "hsl(var(--primary))", borderColor: "hsl(var(--border))" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="block py-1.5 pl-4 text-sm"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
              {item.groups?.map((g) => (
                <div key={g.title} className="mt-1">
                  {g.title && (
                    <div className="pl-4 pt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {g.title}
                    </div>
                  )}
                  {g.items.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block py-1 pl-6 text-sm"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <Link to="/contacto" className="btn-primary w-full mt-3 justify-center" onClick={() => setOpen(false)}>
            Contactar
          </Link>
        </div>
      )}
    </header>
  );
}
