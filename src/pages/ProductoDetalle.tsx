import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Users, ArrowRight, ShoppingCart } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import AddToCartButton from "@/components/common/AddToCartButton";
import { products } from "@/data/products";

export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <main>
        <PageHero title="Producto no encontrado" subtitle="" breadcrumbs={[{ label: "Tienda", href: "/tienda" }, { label: "No encontrado" }]} />
        <div className="py-16 text-center"><Link to="/tienda" className="btn-primary">← Volver a la tienda</Link></div>
      </main>
    );
  }

  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  const faqProduct = [
    { question: "¿El precio incluye IVA?", answer: "Los precios indicados son orientativos sin IVA. El precio final con IVA y condiciones de entrega se indica en el presupuesto personalizado." },
    { question: "¿Hay posibilidad de financiación?", answer: "Sí, para máquinas descarbonizadoras ofrecemos financiación a 12, 24 y 36 meses. Consulta con nuestro equipo comercial." },
    { question: "¿Cómo solicito el producto?", answer: "Haz clic en 'Solicitar presupuesto' y nuestro equipo te enviará una propuesta detallada en menos de 24 horas." },
  ];

  return (
    <main>
      <Seo
        title={`${product.shortName} — ${product.category}`}
        description={product.description}
        path={`/tienda/${product.categorySlug}/${product.slug}`}
        type="product"
        image={`https://ecorentable.lovable.app/generated/products/${product.slug}.jpg`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: `https://ecorentable.lovable.app/generated/products/${product.slug}.jpg`,
          category: product.category,
          brand: { "@type": "Brand", name: "Ecología Rentable" },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            url: `https://ecorentable.lovable.app/tienda/${product.categorySlug}/${product.slug}`,
            priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", description: "Consultar precio" },
          },
        }}
      />
      <PageHero
        title={product.name}
        subtitle={product.description}
        breadcrumbs={[{ label: "Tienda", href: "/tienda" }, { label: product.category, href: `/tienda/${product.categorySlug}` }, { label: product.shortName }]}
        badge={product.badge ?? product.category}
      />

      {/* HERO IMAGE */}
      <section className="overflow-hidden">
        <img
          src={`/generated/products/${product.slug}.jpg`}
          alt={`${product.name} - equipo profesional Ecología Rentable`}
          className="w-full h-48 md:h-64 lg:h-80 object-cover"
          loading="lazy"
        />
      </section>

      {/* HERO PRODUCTO */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* DESCRIPCIÓN TÉCNICA */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Descripción técnica</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>{product.technicalDescription}</p>

              <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Beneficios principales</h3>
              <ul className="space-y-2 mb-6">
                {product.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{b}
                  </li>
                ))}
              </ul>
            </div>

            {/* PRECIO + CTA */}
            <div className="card-eco p-6 flex flex-col gap-4 h-fit">
              {product.badge && <span className="badge-green self-start">{product.badge}</span>}
              <div className="text-3xl font-bold" style={{ color: "hsl(var(--primary))" }}>{product.price}</div>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Precio orientativo sin IVA. Solicita presupuesto para precio final y condiciones.</p>
              <AddToCartButton
                product={{
                  slug: product.slug,
                  name: product.name,
                  category: product.category,
                  categorySlug: product.categorySlug,
                  image: (product as any).image,
                }}
                withQuantity
                label="Añadir a mi solicitud"
              />
              <Link to={`/contacto?intent=presupuesto&item=${product.slug}`} className="btn-secondary w-full justify-center flex items-center gap-2"><ShoppingCart size={15} />Pedir presupuesto directo</Link>
              <Link to="/socios/hazte-socio" className="text-xs text-center underline text-primary">Precio de socio (mejor tarifa)</Link>
              {(product as any).hasRental && (
                <Link to={`/contacto?intent=alquiler&item=${product.slug}`} className="text-xs text-center underline text-primary">¿Prefieres alquiler o renting? Solicita info</Link>
              )}
              <div className="pt-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>¿Para quién es este producto?</p>
                <ul className="space-y-1">
                  {product.forWho.map(f => (
                    <li key={f} className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <Users size={10} style={{ color: "hsl(var(--primary))" }} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIFICACIONES */}
      <section className="py-12 section-alt">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Especificaciones técnicas</h2>
          <div className="card-eco overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? "bg-muted/30" : ""} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                    <td className="py-3 px-5 font-semibold w-48" style={{ color: "hsl(var(--foreground))" }}>{spec.label}</td>
                    <td className="py-3 px-5" style={{ color: "hsl(var(--muted-foreground))" }}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* COMPATIBILIDAD + CONTENIDO */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-eco p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: "hsl(var(--foreground))" }}><CheckCircle size={16} style={{ color: "hsl(var(--primary))" }} />Compatibilidad</h2>
              <ul className="space-y-2">
                {product.compatibility.map(c => (
                  <li key={c} className="text-sm flex items-start gap-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span style={{ color: "hsl(var(--primary))" }}>·</span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-eco p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: "hsl(var(--foreground))" }}><Package size={16} style={{ color: "hsl(var(--primary))" }} />Contenido del pack</h2>
              <ul className="space-y-2">
                {product.includes.map(inc => (
                  <li key={inc} className="text-sm flex items-start gap-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={11} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS RELACIONADOS */}
      {related.length > 0 && (
        <section className="py-12 section-alt">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} to={`/tienda/${r.categorySlug}/${r.slug}`} className="card-eco p-5 flex flex-col gap-2 group hover:shadow-md transition-shadow">
                  {r.badge && <span className="badge-green self-start text-xs">{r.badge}</span>}
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{r.name}</h3>
                  <p className="text-xs flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>{r.description.substring(0, 80)}…</p>
                  <div className="font-bold text-sm" style={{ color: "hsl(var(--primary))" }}>{r.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection items={faqProduct} />
      <CTABox title="¿Tienes preguntas sobre este producto?" description="Nuestro equipo técnico te asesora sin compromiso sobre la mejor opción para tu taller." primaryLabel="Solicitar presupuesto" primaryHref="/contacto" secondaryLabel="Ver programa socios" secondaryHref="/socios" />
    </main>
  );
}
