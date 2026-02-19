import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { centersByProvince, provinceInfo } from "@/data/centers";
import CenterCard from "@/components/common/CenterCard";

export default function EncuentreCentro() {
  const allProvinces = Object.keys(provinceInfo);
  return (
    <main>
      <PageHero
        title="Encuentra un centro de descarbonización"
        subtitle="Red de más de 300 talleres certificados en toda España. Filtra por provincia y servicios disponibles."
        breadcrumbs={[{ label: "Encuentra un centro" }]}
        badge="Red nacional"
      />

      {/* INTRO */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>¿Cómo elegir el centro adecuado?</h2>
              <div className="space-y-3">
                {[
                  "Busca centros con el servicio específico que necesitas (DPF, EGR, descarbonización general)",
                  "Comprueba que el centro cuente con certificación Ecología Rentable vigente",
                  "Contacta por teléfono para confirmar disponibilidad y precio orientativo",
                  "Solicita informe antes/después del servicio realizado",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="step-number w-7 h-7 text-xs shrink-0">{i + 1}</span>
                    <span className="text-sm leading-relaxed mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-eco p-6">
              <h3 className="font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>¿No encuentras centro? Te ayudamos</h3>
              <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>Si no hay un centro cerca de tu ubicación, contacta con nosotros y te orientamos sobre las opciones más próximas.</p>
              <div className="space-y-3">
                {[{ icon: <Phone size={14} />, label: "+34 900 123 456" }, { icon: <Mail size={14} />, label: "info@ecologiarentable.es" }].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--primary))" }}>{c.icon}{c.label}</div>
                ))}
              </div>
              <Link to="/contacto" className="btn-primary mt-4 text-sm px-4 py-2 inline-flex">Contactar ahora <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROVINCIAS */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "hsl(var(--foreground))" }}>Selecciona tu provincia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProvinces.map((slug) => {
              const info = provinceInfo[slug];
              const centers = centersByProvince[slug] || [];
              return (
                <Link key={slug} to={`/encuentre-centro/${slug}`} className="card-eco p-6 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="icon-circle w-10 h-10"><MapPin size={18} /></div>
                    <h3 className="font-bold text-lg" style={{ color: "hsl(var(--foreground))" }}>{info.name}</h3>
                  </div>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{info.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="badge-green">{centers.length} centros</span>
                    <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: "hsl(var(--accent-green))" }}>Ver centros <ArrowRight size={13} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CENTROS DESTACADOS MADRID */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Centros en Madrid</h2>
            <Link to="/encuentre-centro/madrid" className="btn-secondary text-sm px-4 py-2">Ver todos <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(centersByProvince.madrid || []).slice(0, 3).map((c) => <CenterCard key={c.id} center={c} />)}
          </div>
        </div>
      </section>

      <CTABox title="¿Tu taller quiere aparecer en el directorio?" description="Únete a la red de socios certificados y recibe clientes de tu zona." primaryLabel="Hazte socio" primaryHref="/socios/hazte-socio" secondaryLabel="Más información" secondaryHref="/socios" />
    </main>
  );
}
