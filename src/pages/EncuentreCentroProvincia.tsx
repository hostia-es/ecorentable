import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CenterCard from "@/components/common/CenterCard";
import CTABox from "@/components/common/CTABox";
import { centersByProvince, provinceInfo } from "@/data/centers";

export default function EncuentreCentroProvincia() {
  const { provincia } = useParams<{ provincia: string }>();
  const slug = provincia || "";
  const info = provinceInfo[slug];
  const centers = centersByProvince[slug] || [];

  if (!info) {
    return (
      <main className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Provincia no encontrada</h1>
        <Link to="/encuentre-centro" className="btn-primary">Ver todas las provincias</Link>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title={`Centros de descarbonización en ${info.name}`}
        subtitle={info.description}
        breadcrumbs={[{ label: "Encuentra un centro", href: "/encuentre-centro" }, { label: info.name }]}
        badge={`${centers.length} centros certificados`}
      />

      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {centers.map((c) => <CenterCard key={c.id} center={c} />)}
          </div>
          {centers.length === 0 && (
            <div className="text-center py-20">
              <MapPin size={40} className="mx-auto mb-4" style={{ color: "hsl(var(--muted-foreground))" }} />
              <p className="text-lg mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>No hay centros registrados en esta provincia todavía.</p>
              <Link to="/contacto" className="btn-primary">Contactar para más info</Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 section-alt">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card-eco p-6 text-center">
            <h3 className="font-bold text-lg mb-2" style={{ color: "hsl(var(--foreground))" }}>¿No encuentras el centro que buscas?</h3>
            <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>Contacta con nosotros y te ayudamos a encontrar el taller más cercano o gestionamos la cita directamente.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/contacto" className="btn-primary text-sm px-4 py-2">Contactar <ArrowRight size={13} /></Link>
              <Link to="/encuentre-centro" className="btn-secondary text-sm px-4 py-2">Otras provincias</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABox title="¿Tienes un taller en {info.name}?" description="Únete a nuestra red de socios y recibe clientes certificados de tu zona." primaryLabel="Hazte socio" primaryHref="/socios/hazte-socio" />
    </main>
  );
}
