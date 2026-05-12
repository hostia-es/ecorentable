import { useParams, Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import AddToCartButton from "@/components/common/AddToCartButton";
import { products } from "@/data/products";

const categoryNames: Record<string, { name: string; desc: string }> = {
  "descarbonizadoras": {
    name: "Descarbonizadoras profesionales",
    desc: "Gama H2 Profit 1000, 2000 y 3000 más Hy-Carbon Connect. Equipos nuevos de descarbonización por hidrógeno para coches, camiones y flotas.",
  },
  "descarbonizadoras-reacondicionadas": {
    name: "Descarbonizadoras reacondicionadas",
    desc: "Equipos reacondicionados y validados técnicamente. Mismas prestaciones que los modelos nuevos con mejor precio. Disponibilidad sujeta a stock.",
  },
  "maquinas-limpieza-filtro-particulas": {
    name: "Máquinas de limpieza de filtro de partículas",
    desc: "Equipos profesionales para limpieza de filtro de partículas DPF/FAP gasolina y diésel. Para talleres especializados en DPF.",
  },
  "opacimetros": {
    name: "Opacímetros profesionales",
    desc: "Opacímetros para talleres y centros pre-ITV con necesidades de medición de opacidad y diagnosis de emisiones diésel.",
  },
  "analizadores-de-gases": {
    name: "Analizadores de gases profesionales",
    desc: "Analizadores de gases de escape para diagnosis y control de emisiones en gasolina y diésel. Para talleres y centros pre-ITV.",
  },
  "kit-opacidad": {
    name: "Kit Opacidad para talleres",
    desc: "Solución integral con opacímetro y analizador de gases. Para talleres que quieren equiparse completamente en diagnóstico de emisiones. Solo venta.",
  },
};

export default function TiendaCategoria() {
  const { categoria } = useParams<{ categoria: string }>();
  const catInfo = categoryNames[categoria ?? ""];
  const catProducts = products.filter(p => p.categorySlug === categoria);

  if (!catInfo) {
    return (
      <main>
        <PageHero title="Categoría no encontrada" subtitle="" breadcrumbs={[{ label: "Tienda", href: "/tienda" }, { label: "No encontrada" }]} />
        <div className="py-16 text-center"><Link to="/tienda" className="btn-primary">← Volver a la tienda</Link></div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title={catInfo.name}
        subtitle={catInfo.desc}
        breadcrumbs={[{ label: "Tienda", href: "/tienda" }, { label: catInfo.name }]}
        badge={`${catProducts.length} producto${catProducts.length !== 1 ? "s" : ""}`}
      />

      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catProducts.map((p) => (
              <Link key={p.id} to={`/tienda/${p.categorySlug}/${p.slug}`} className="card-eco p-6 flex flex-col gap-3 group hover:shadow-md transition-shadow">
                {p.badge && <span className="badge-green self-start">{p.badge}</span>}
                <h2 className="font-bold text-base group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{p.name}</h2>
                <p className="text-sm flex-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{p.description}</p>
                <div className="font-bold" style={{ color: "hsl(var(--primary))" }}>{p.price}</div>
                <span className="btn-primary text-sm justify-center flex items-center gap-1"><ShoppingCart size={13} />Ver detalles</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/tienda" className="btn-secondary flex items-center gap-1 justify-center inline-flex">← Ver todas las categorías</Link>
          </div>
        </div>
      </section>

      <CTABox title="¿Necesitas asesoramiento técnico?" description="Contacta con nuestro equipo para recibir una recomendación personalizada según tu taller o flota." primaryLabel="Solicitar asesoramiento" primaryHref="/contacto" secondaryLabel="Hazte socio" secondaryHref="/socios" />
    </main>
  );
}
