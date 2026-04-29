import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Navigation,
  BadgeCheck,
  ArrowRight,
  Wrench,
  ShieldCheck,
  HelpCircle,
  Building2,
  Gauge,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import {
  getProvinciaBySlug,
  getWorkshopsByProvincia,
  getProvinciaSlug,
  STANDARD_SERVICES,
} from "@/lib/workshopHelpers";
import { workshopProvincias } from "@/data/workshops";

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

export default function CentroProvincia() {
  const { provincia: provinciaSlug } = useParams<{ provincia: string }>();
  const provincia = provinciaSlug ? getProvinciaBySlug(provinciaSlug) : undefined;
  const list = useMemo(
    () => (provincia ? getWorkshopsByProvincia(provincia) : []),
    [provincia],
  );

  useEffect(() => {
    if (!provincia) return;
    const prevTitle = document.title;
    document.title = `Centros de descarbonización en ${provincia} | Ecología Rentable`;
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Centros certificados en ${provincia}`,
      itemListElement: list.map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "AutoRepair",
          name: w.name,
          telephone: w.phones[0],
          address: {
            "@type": "PostalAddress",
            addressLocality: w.city,
            addressRegion: w.provincia,
            addressCountry: "ES",
            streetAddress: w.address || undefined,
          },
        },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.setAttribute("data-page", "centro-provincia");
    document.head.appendChild(script);
    return () => {
      document.title = prevTitle;
      script.remove();
    };
  }, [provincia, list]);

  if (!provincia) {
    return (
      <main>
        <PageHero
          title="Provincia no encontrada"
          subtitle="No tenemos centros registrados para esta provincia."
          breadcrumbs={[
            { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
            { label: "No encontrada" },
          ]}
        />
        <div className="py-16 text-center">
          <Link to="/encuentra-tu-centro" className="btn-primary">
            ← Ver todas las provincias
          </Link>
        </div>
      </main>
    );
  }

  const cities = Array.from(new Set(list.map((w) => w.city))).sort();

  return (
    <main>
      <PageHero
        title={`Centros de descarbonización en ${provincia}`}
        subtitle={`Red de talleres certificados Ecología Rentable en ${provincia}: descarbonización por hidrógeno, limpieza DPF/FAP y diagnóstico ITV.`}
        breadcrumbs={[
          { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
          { label: provincia },
        ]}
        badge={`${list.length} centro${list.length !== 1 ? "s" : ""} certificado${list.length !== 1 ? "s" : ""}`}
      />

      {/* 1. INTRODUCCIÓN */}
      <section className="py-14 section-light" aria-labelledby="seccion-intro">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            01 · Cobertura
          </span>
          <h2 id="seccion-intro" className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ color: "hsl(var(--foreground))" }}>
            Red Ecología Rentable en {provincia}
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            Disponemos de <strong>{list.length} centro{list.length !== 1 ? "s" : ""}</strong> distribuidos por toda la provincia
            de {provincia}, equipados con tecnología <strong>H2 Profit</strong> y formados oficialmente para
            ofrecer descarbonización profesional, limpieza de DPF y diagnóstico de emisiones.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Cada taller está certificado y trabaja bajo un protocolo común de calidad, garantizando el mismo
            estándar técnico independientemente del municipio.
          </p>

          {cities.length > 0 && (
            <div className="mt-6 card-eco p-5">
              <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                Ciudades cubiertas en {provincia}
              </p>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                {cities.join(" · ")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. LISTADO DE CENTROS */}
      <section className="py-14" aria-labelledby="seccion-centros">
        <div className="container mx-auto px-4 max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            02 · Centros disponibles
          </span>
          <h2 id="seccion-centros" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Listado completo de talleres en {provincia}
          </h2>

          {list.length === 0 ? (
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Próximamente añadiremos centros en esta provincia.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((w) => (
                <article
                  key={w.slug}
                  className="bg-white rounded-2xl border border-border shadow-md p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-bold leading-snug" style={{ color: "hsl(var(--foreground))" }}>
                      {w.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      <BadgeCheck size={11} aria-hidden="true" /> Certificado
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: "hsl(var(--foreground))" }}>
                    <MapPin size={14} className="text-primary shrink-0" aria-hidden="true" />
                    <span>{w.city}</span>
                  </div>

                  {w.address && (
                    <div className="flex items-start gap-2 text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <Navigation size={12} className="shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{w.address}</span>
                    </div>
                  )}

                  {w.phones.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {w.phones.map((p) => (
                        <a
                          key={p}
                          href={telHref(p)}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                          style={{ color: "hsl(var(--foreground))" }}
                        >
                          <Phone size={13} className="text-primary shrink-0" aria-hidden="true" />
                          <span>{formatPhoneES(p)}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/encuentra-tu-centro/${getProvinciaSlug(w.provincia)}/${w.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Ver ficha completa <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. SERVICIOS PRESTADOS */}
      <section className="py-14 section-light" aria-labelledby="seccion-servicios">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            03 · Servicios
          </span>
          <h2 id="seccion-servicios" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Servicios disponibles en los centros de {provincia}
          </h2>

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

      {/* 4. ÁREA DE INFLUENCIA */}
      <section className="py-14" aria-labelledby="seccion-area">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            04 · Área de influencia
          </span>
          <h2 id="seccion-area" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Cobertura geográfica desde {provincia}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            Nuestros centros en {provincia} atienden a particulares y flotas de toda la provincia y zonas
            limítrofes. Habitualmente recibimos clientes de los siguientes municipios y áreas:
          </p>

          <div className="card-eco p-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Principales núcleos atendidos
                </p>
                {cities.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {cities.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <MapPin size={11} className="text-primary" aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Próximamente.
                  </p>
                )}
                <p className="text-xs mt-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Para flotas y empresas ofrecemos también desplazamiento y servicio in situ. Consulte con el
                  centro más cercano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POR QUÉ ELEGIR UN CENTRO CERTIFICADO */}
      <section className="py-14 section-light" aria-labelledby="seccion-certificado">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            05 · Garantías
          </span>
          <h2 id="seccion-certificado" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Por qué elegir un centro certificado Ecología Rentable
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: ShieldCheck, t: "Equipos H2 Profit originales", d: "Máquinas certificadas con producción de hidrógeno calibrada y mantenimiento periódico." },
              { icon: BadgeCheck, t: "Personal formado oficialmente", d: "Técnicos titulados por Ecología Rentable con reciclajes anuales obligatorios." },
              { icon: Gauge, t: "Diagnóstico antes y después", d: "Medición con opacímetro u analizador de gases para acreditar la mejora real." },
              { icon: Wrench, t: "Protocolo común", d: "Mismo procedimiento técnico en todos los centros de la red, con trazabilidad completa." },
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

      {/* 6. FAQ + CTA + OTRAS PROVINCIAS */}
      <section className="py-14" aria-labelledby="seccion-faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            06 · Preguntas frecuentes
          </span>
          <h2 id="seccion-faq" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Preguntas frecuentes — Centros en {provincia}
          </h2>

          <div className="space-y-4 mb-10">
            {[
              { q: `¿Cómo reservo cita en un centro de ${provincia}?`, a: "Llame directamente al teléfono indicado en cada ficha. La mayoría de centros ofrecen cita en menos de 48 horas." },
              { q: "¿Cuánto dura el tratamiento?", a: "Entre 30 y 60 minutos según el tipo de motor y el grado de carbonización. Puede esperar en el taller." },
              { q: "¿Necesito llevar algún documento?", a: "Únicamente el permiso de circulación y, si dispone, la última lectura ITV o diagnóstico OBD2." },
              { q: "¿Hay garantía sobre el servicio?", a: "Sí, todos los centros aplican el protocolo de calidad de Ecología Rentable con diagnóstico antes y después." },
              { q: "¿Atienden flotas de empresa?", a: "Sí, varios centros ofrecen acuerdos específicos para flotas con condiciones especiales y desplazamiento." },
            ].map((f) => (
              <details key={f.q} className="card-eco p-5 group">
                <summary className="flex items-start gap-3 cursor-pointer list-none">
                  <HelpCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span className="text-sm font-semibold flex-1" style={{ color: "hsl(var(--foreground))" }}>{f.q}</span>
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 transition-transform group-open:rotate-90" style={{ color: "hsl(var(--muted-foreground))" }} aria-hidden="true" />
                </summary>
                <p className="text-sm mt-3 pl-8" style={{ color: "hsl(var(--muted-foreground))" }}>{f.a}</p>
              </details>
            ))}
          </div>

          <CTABox
            title={`¿Tiene un taller en ${provincia}?`}
            description="Únase a la red Ecología Rentable: formación, equipos H2 Profit y captación de clientes."
            primaryLabel="Hazte socio"
            primaryHref="/socios/hazte-socio"
            secondaryLabel="Contactar"
            secondaryHref="/contacto"
          />

          <div className="mt-12">
            <h3 className="text-lg font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Otras provincias con cobertura</h3>
            <div className="flex flex-wrap gap-2">
              {workshopProvincias
                .filter((p) => p !== provincia)
                .map((p) => (
                  <Link
                    key={p}
                    to={`/encuentra-tu-centro/${getProvinciaSlug(p)}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border hover:bg-primary/5 hover:text-primary transition-colors"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {p}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
