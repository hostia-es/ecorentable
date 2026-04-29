import { useEffect, useMemo, useState } from "react";
import { MapPin, Navigation, Phone, SearchX, ExternalLink, BadgeCheck, Search } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import { workshops, workshopProvincias } from "@/data/workshops";

// Extrae solo dígitos nacionales (sin prefijo +34)
const getNationalDigits = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("34") ? digits.slice(2) : digits;
};

// Formato España: +34 XXX XX XX XX (9 dígitos nacionales)
const formatPhoneES = (phone: string) => {
  const n = getNationalDigits(phone);
  if (n.length !== 9) return phone;
  return `+34 ${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
};

const telHref = (phone: string) => {
  const n = getNationalDigits(phone);
  return `tel:+34${n}`;
};

export default function EncuentraTuCentro() {
  const [search, setSearch] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return workshops.filter((w) => {
      const matchSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.city.toLowerCase().includes(q);
      const matchProv = !selectedProvincia || w.provincia === selectedProvincia;
      return matchSearch && matchProv;
    });
  }, [search, selectedProvincia]);

  // SEO: ItemList schema (first 10)
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Centros certificados de descarbonización — Ecología Rentable",
      itemListElement: workshops.slice(0, 10).map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "AutoRepair",
          name: w.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: w.city,
            addressRegion: w.provincia,
            addressCountry: "ES",
            streetAddress: w.address || undefined,
          },
          telephone: w.phones[0],
        },
      })),
    };

    const prevTitle = document.title;
    document.title = "Encuentra tu centro de descarbonización | Ecología Rentable";

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.setAttribute("data-page", "encuentra-tu-centro");
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      script.remove();
    };
  }, []);

  const resetFilters = () => {
    setSearch("");
    setSelectedProvincia("");
  };

  return (
    <main>
      <PageHero
        title="Encuentra tu centro de descarbonización"
        subtitle="Más de 80 talleres certificados en toda España, equipados con tecnología Hy-Calamine. Localiza el más cercano a ti."
        breadcrumbs={[{ label: "Encuentra tu centro" }]}
        badge="83 centros certificados"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Buscador + filtro */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 md:p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre o ciudad..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                />
              </div>
              <select
                value={selectedProvincia}
                onChange={(e) => setSelectedProvincia(e.target.value)}
                className="md:w-72 px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
              >
                <option value="">Todas las provincias</option>
                {workshopProvincias.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {filtered.length} centro{filtered.length !== 1 ? "s" : ""} encontrado
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <SearchX size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-foreground mb-4">
                No hemos encontrado talleres con esos criterios
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary inline-flex"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((w) => (
                <article
                  key={w.slug}
                  className="bg-white rounded-2xl border border-border shadow-md p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {w.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      <BadgeCheck size={11} /> Certificado
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span>
                      {w.city} · <span className="text-muted-foreground">{w.provincia}</span>
                    </span>
                  </div>

                  {w.address && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground mb-3">
                      <Navigation size={12} className="text-muted-foreground shrink-0 mt-0.5" />
                      <span>{w.address}</span>
                    </div>
                  )}

                  {w.phones.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {w.phones.map((p) => (
                        <a
                          key={p}
                          href={telHref(p)}
                          className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <Phone size={13} className="text-primary shrink-0" />
                          <span>{p}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  <a
                    href={`https://www.flexfuel-company.es/encuentra-un-taller/${w.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Ver más detalles <ExternalLink size={13} />
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABox
        title="¿Tienes un taller y quieres aparecer aquí?"
        description="Únete a la red de centros certificados Ecología Rentable. Formación, soporte técnico y captación de clientes incluidos."
        primaryLabel="Hazte socio"
        primaryHref="/socios/hazte-socio"
        secondaryLabel="Contactar"
        secondaryHref="/contacto"
      />
    </main>
  );
}
