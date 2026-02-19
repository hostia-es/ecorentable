import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, Leaf } from "lucide-react";

const navItems = [
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Descarbonización", href: "/servicios/descarbonizacion" },
      { label: "Para particulares", href: "/servicios/particulares" },
      { label: "Para talleres", href: "/servicios/talleres" },
      { label: "Para flotas", href: "/servicios/flotas" },
      { label: "Limpieza de filtros", href: "/servicios/limpieza-filtros" },
    ],
  },
  {
    label: "Soluciones",
    href: "/soluciones",
    children: [
      { label: "Descarbonización diésel", href: "/soluciones/descarbonizacion-motor-diesel" },
      { label: "Limpieza filtro partículas", href: "/soluciones/limpieza-filtro-particulas" },
      { label: "Descarbonización hidrógeno", href: "/soluciones/descarbonizacion-hidrogeno" },
      { label: "Mantenimiento diésel", href: "/soluciones/mantenimiento-motor-diesel" },
      { label: "Limpieza EGR/catalizador", href: "/soluciones/limpieza-egr-catalizador" },
      { label: "ITV gases", href: "/soluciones/itv-gases" },
      { label: "Aditivos motor", href: "/soluciones/aditivos-motor" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Encuentre centro", href: "/encuentre-centro" },
  { label: "Socios", href: "/socios" },
  { label: "Tienda", href: "/tienda" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm" style={{ borderColor: "hsl(var(--border))" }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "hsl(var(--primary))" }}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Leaf size={18} color="white" />
            </div>
            <span className="hidden sm:block">Ecología Rentable</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
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
                  {item.children && <ChevronDown size={14} />}
                </Link>

                {item.children && activeDropdown === item.href && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 rounded-lg border bg-white shadow-lg py-1 z-50"
                    style={{ borderColor: "hsl(var(--border))", boxShadow: "var(--shadow-hero)" }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-secondary"
                        style={{ color: "hsl(var(--foreground))" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link to="/contacto" className="hidden md:flex btn-primary text-sm px-4 py-2">
              Contactar
            </Link>
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setOpen(!open)}
              style={{ color: "hsl(var(--foreground))" }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white px-4 pb-4 pt-2" style={{ borderColor: "hsl(var(--border))" }}>
          {navItems.map((item) => (
            <div key={item.href}>
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
