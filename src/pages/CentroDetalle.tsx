import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Navigation,
  BadgeCheck,
  ArrowRight,
  Wrench,
  ShieldCheck,
  Clock,
  ExternalLink,
  Building2,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import {
  getProvinciaBySlug,
  getProvinciaSlug,
  getWorkshopBySlug,
  getWorkshopsByProvincia,
  STANDARD_SERVICES,
} from "@/lib/workshopHelpers";

const getNationalDigits = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("34") ? digits.slice(2) : digits;
};
const formatPhoneES = (phone: string) => {
  const n = getNationalDigits(phone);
  if (n.length !== 9) return phone;
  return `+34 ${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
};
const telHref = (phone: string) => `tel:+34${getNationalDigits(phone)}`;

export default function CentroDetalle() {
  const { provincia: provinciaSlug, slug } = useParams<{
    provincia: string;
    slug: string;
  }>();
  const provincia = provinciaSlug ? getProvinciaBySlug(provinciaSlug) : undefined;
  const workshop = slug ? getWorkshopBySlug(slug) : undefined;

  useEffect(() => {
    if (!workshop) return;
    const prevTitle = document.title;
    document.title = `${workshop.name} — Centro de descarbonización en ${workshop.city} | Ecología Rentable`;
    const data = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: workshop.name,
      telephone: workshop.phones[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: workshop.address || undefined,
        addressLocality: workshop.city,
        addressRegion: workshop.provincia,
        addressCountry: "ES",
      },
      areaServed: workshop.provincia,
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.setAttribute("data-page", "centro-detalle");
    document.head.appendChild(script);
    return () => {
      document.title = prevTitle;
      script.remove();
    };
  }, [workshop]);

  if (!workshop || !provincia || workshop.provincia !== provincia) {
    return (
      <main>
        <PageHero
          title="Centro no encontrado"
          subtitle="No hemos podido localizar este taller en nuestra red."
          breadcrumbs={[
            { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
            { label: "No encontrado" },
          ]}
        />
        <div className="py-16 text-center">
          <Link to="/encuentra-tu-centro" className="btn-primary">
            ← Ver todos los centros
          </Link>
        </div>
      </main>
    );
  }

  const otherInProvincia = getWorkshopsByProvincia(provincia).filter(
    (w) => w.slug !== workshop.slug,
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${workshop.name} ${workshop.address || workshop.city} ${workshop.provincia} España`,
  )}`;

  return (
    <main>
      <PageHero
        title={workshop.name}
        subtitle={`Centro certificado Ecología Rentable en ${workshop.city} (${workshop.provincia}). Descarbonización, limpieza DPF y diagnóstico de emisiones.`}
        breadcrumbs={[
          { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
          { label: provincia, href: `/encuentra-tu-centro/${getProvinciaSlug(provincia)}` },
          { label: workshop.name },
        ]}
        badge="Centro certificado"
      />

      {/* 1. CONTACTO PRINCIPAL */}
      <section className="py-14 section-light" aria-labelledby="seccion-contacto">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            01 · Contacto
          </span>
          <h2 id="seccion-contacto" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Datos del centro
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card-eco p-6">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase" style={{ color: "hsl(var(--primary))" }}>
                  Taller certificado
                </span>
              </div>

              <div className="space-y-3 text-sm" style={{ color: "hsl(var(--foreground))" }}>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    {workshop.city} · <span style={{ color: "hsl(var(--muted-foreground))" }}>{workshop.provincia}</span>
                  </span>
                </div>
                {workshop.address && (
                  <div className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <Navigation size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{workshop.address}</span>
                  </div>
                )}
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Cómo llegar en Google Maps <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <div className="card-eco p-6">
              <p className="text-sm font-semibold mb-3" style={{ color: "hsl(var(--foreground))" }}>
                Teléfonos de contacto
              </p>
              <div className="space-y-2">
                {workshop.phones.map((p) => (
                  <a
                    key={p}
                    href={telHref(p)}
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    <Phone size={14} className="text-primary shrink-0" aria-hidden="true" />
                    <span className="font-medium">{formatPhoneES(p)}</span>
                  </a>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                Recomendamos llamar para reservar cita previa. La mayoría de tratamientos requieren entre 30 y 60 minutos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICIOS PRESTADOS */}
      <section className="py-14" aria-labelledby="seccion-servicios">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            02 · Servicios prestados
          </span>
          <h2 id="seccion-servicios" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Servicios disponibles en {workshop.name}
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Como centro certificado, ofrece la cartera completa Ecología Rentable.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STANDARD_SERVICES.map((s) => (
              <div key={s.title} className="card-eco p-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
                >
                  <Wrench className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ÁREA ATENDIDA */}
      <section className="py-14 section-light" aria-labelledby="seccion-area">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            03 · Área atendida
          </span>
          <h2 id="seccion-area" className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ color: "hsl(var(--foreground))" }}>
            Cobertura geográfica
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            {workshop.name} atiende principalmente clientes de <strong>{workshop.city}</strong> y todo el área
            metropolitana, así como municipios cercanos de la provincia de <strong>{workshop.provincia}</strong>.
          </p>

          <div className="card-eco p-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Tipología de clientes
                </p>
                <ul className="space-y-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <li>· Particulares con vehículos diésel y gasolina</li>
                  <li>· Pequeñas y medianas flotas de empresa</li>
                  <li>· Vehículos comerciales y furgonetas</li>
                  <li>· Preparación pre-ITV de emisiones</li>
                </ul>
                <p className="text-xs mt-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Para flotas o servicios in situ, consulte directamente con el centro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HORARIO Y CONDICIONES */}
      <section className="py-14" aria-labelledby="seccion-horario">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            04 · Horario y reserva
          </span>
          <h2 id="seccion-horario" className="text-2xl md:text-3xl font-bold mt-2 mb-6" style={{ color: "hsl(var(--foreground))" }}>
            Cómo reservar cita
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card-eco p-5">
              <Clock className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                Horario habitual
              </p>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Lunes a viernes: 9:00 — 13:30 / 16:00 — 19:30
                <br />
                Sábados: consultar con el centro.
              </p>
            </div>
            <div className="card-eco p-5">
              <Phone className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                Reserva telefónica
              </p>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Llame al teléfono indicado en la sección de contacto. Cita habitual disponible en menos de 48 h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GARANTÍAS Y CERTIFICACIÓN */}
      <section className="py-14 section-light" aria-labelledby="seccion-garantia">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            05 · Garantías
          </span>
          <h2 id="seccion-garantia" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Compromiso de la red Ecología Rentable
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: ShieldCheck, t: "Tecnología H2 Profit", d: "Equipos profesionales certificados con producción de hidrógeno calibrada." },
              { icon: BadgeCheck, t: "Personal formado", d: "Técnicos titulados oficialmente por Ecología Rentable." },
              { icon: Wrench, t: "Protocolo común", d: "Mismo procedimiento técnico que el resto de la red, con trazabilidad completa." },
              { icon: Clock, t: "Diagnóstico antes/después", d: "Medición con opacímetro o analizador de gases para verificar la mejora." },
            ].map((g) => (
              <div key={g.t} className="card-eco p-5">
                <div className="flex items-start gap-3">
                  <g.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>{g.t}</p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{g.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OTROS CENTROS + CTA */}
      <section className="py-14" aria-labelledby="seccion-otros">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            06 · Otros centros
          </span>
          <h2 id="seccion-otros" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Otros centros en {provincia}
          </h2>

          {otherInProvincia.length === 0 ? (
            <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Este es el único centro registrado en la provincia. Consulte provincias limítrofes desde la página principal.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {otherInProvincia.slice(0, 6).map((w) => (
                <Link
                  key={w.slug}
                  to={`/encuentra-tu-centro/${getProvinciaSlug(w.provincia)}/${w.slug}`}
                  className="card-eco p-5 group hover:shadow-md transition-shadow"
                >
                  <h3 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                    {w.name}
                  </h3>
                  <p className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <MapPin size={11} aria-hidden="true" /> {w.city}
                  </p>
                  <span className="text-xs font-semibold inline-flex items-center gap-1 mt-3" style={{ color: "hsl(var(--primary))" }}>
                    Ver ficha <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          <CTABox
            title="¿Quiere reservar una descarbonización?"
            description={`Llame directamente a ${workshop.name} o contacte con el equipo Ecología Rentable.`}
            primaryLabel="Contactar"
            primaryHref="/contacto"
            secondaryLabel="Ver todos los centros"
            secondaryHref={`/encuentra-tu-centro/${getProvinciaSlug(provincia)}`}
          />
        </div>
      </section>
    </main>
  );
}
