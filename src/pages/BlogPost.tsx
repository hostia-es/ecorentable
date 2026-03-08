import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import { blogPosts } from "@/data/blog";

const fullContent: Record<string, React.ReactNode> = {
  "que-es-descarbonizacion-motor": (
    <div className="prose-eco">
      <h2>¿Por qué se acumula el carbono en los motores modernos?</h2>
      <p>Los motores de combustión interna, tanto diésel como gasolina de inyección directa, generan depósitos de carbono como subproducto inevitable de la combustión. Estos depósitos, compuestos principalmente de hollín, barniz y residuos de aceite, se acumulan en pistones, válvulas de admisión, cámara de combustión, válvula EGR y filtro de partículas (DPF/FAP).</p>
      <p>El uso urbano agrava enormemente este problema: las temperaturas bajas de escape en trayectos cortos impiden la regeneración espontánea del DPF y favorecen la deposición de carbono en los componentes internos del motor.</p>

      <h2>¿Qué es exactamente la descarbonización?</h2>
      <p>La descarbonización es un proceso de limpieza interna del motor que elimina los depósitos carbonosos sin necesidad de desmontar piezas. Existen diferentes métodos:</p>
      <ul>
        <li><strong>Descarbonización por hidrógeno (HHO):</strong> el más extendido profesionalmente. Se introduce una mezcla de hidrógeno y oxígeno en el motor durante su funcionamiento. El calor de combustión transforma los depósitos de carbono en CO₂ y vapor de agua, que se expulsan por el escape.</li>
        <li><strong>Descarbonización química:</strong> mediante aditivos o productos en aerosol aplicados en la admisión de aire. Menos potente que el método HHO, pero útil como mantenimiento preventivo.</li>
        <li><strong>Limpieza mecánica:</strong> se desmonta el motor o partes del mismo para limpiarlos manualmente. Solo se recomienda en casos de contaminación severa.</li>
      </ul>

      <h2>¿Cuándo es necesario descarbonizar el motor?</h2>
      <p>Los indicadores más habituales de que el motor necesita una descarbonización son:</p>
      <ul>
        <li>Aumento del consumo de combustible (≥8–10% respecto al consumo habitual)</li>
        <li>Pérdida de potencia y respuesta del acelerador más lenta</li>
        <li>Humos negros o azulados por el tubo de escape</li>
        <li>Testigo de motor encendido (P0420, P2002, P0401…)</li>
        <li>Regeneraciones frecuentes o fallidas del DPF</li>
        <li>Ruidos de traqueteo o golpeteo en frío</li>
        <li>Dificultad para pasar la inspección de emisiones en la ITV</li>
      </ul>

      <h2>¿Cómo funciona la descarbonización por hidrógeno?</h2>
      <p>La máquina descarbonizadora (como la Hy-Calamine 1000S, 2000S o 3000S) produce gas HHO (oxihidrógeno) mediante electrólisis del agua. Este gas se introduce en el motor a través de la toma de admisión mientras el motor funciona en ralentí o a bajas RPM.</p>
      <p>El hidrógeno actúa como agente reductor: a las temperaturas que se alcanzan en la cámara de combustión, transforma los depósitos de carbono sólido en CO₂ y H₂O, que se expulsan de forma natural. El ciclo completo dura entre 15 y 45 minutos dependiendo de la máquina y el vehículo.</p>

      <h2>Resultados esperados tras la descarbonización</h2>
      <ul>
        <li>Reducción de emisiones de CO, HC y opacidad hasta un 60–70%</li>
        <li>Mejora del rendimiento del motor entre un 8 y un 18% (según el estado inicial)</li>
        <li>Reducción del consumo entre un 5 y un 12%</li>
        <li>Mejor respuesta del acelerador y suavidad de marcha</li>
        <li>Extensión de la vida útil del DPF, la válvula EGR y el catalizador</li>
      </ul>

      <h2>¿Con qué frecuencia se recomienda?</h2>
      <p>La recomendación general para uso mixto (ciudad + carretera) es cada 30.000–50.000 km o cada 2–3 años. Para vehículos con uso predominantemente urbano, se recomienda cada 20.000–30.000 km. Para flotas de transporte, cada 25.000–40.000 km según el tipo de motor.</p>

      <h2>¿Cómo encontrar un centro de descarbonización?</h2>
      <p>Ecología Rentable dispone de una red de talleres certificados en toda España. <Link to="/contacto" className="text-primary underline">Contacta con nosotros</Link> para conocer el centro más cercano a tu domicilio.</p>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 my-6">
        <h3 className="font-bold mb-2">Checklist antes de descarbonizar</h3>
        <ul>
          <li>✅ Revisa el nivel de aceite: debe estar en buen estado</li>
          <li>✅ Comprueba que no hay fugas de aceite activas</li>
          <li>✅ Informa al taller si el testigo de motor está encendido</li>
          <li>✅ Indica si el DPF ha regenerado recientemente</li>
          <li>✅ Si tienes dudas, solicita diagnóstico previo con OBD2</li>
        </ul>
      </div>
    </div>
  ),
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main>
        <PageHero title="Artículo no encontrado" subtitle="El artículo que buscas no existe o ha sido movido." breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "No encontrado" }]} />
        <div className="py-16 text-center">
          <Link to="/blog" className="btn-primary">← Volver al blog</Link>
        </div>
      </main>
    );
  }

  const related = blogPosts.filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id).slice(0, 3);

  return (
    <main>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.category, href: `/blog/${post.categorySlug}` }, { label: post.title.substring(0, 40) + "…" }]}
        badge={post.category}
      />

      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            <span className="flex items-center gap-1"><Clock size={13} />{post.readTime} de lectura</span>
            <span>{post.date}</span>
            <Link to="/blog" className="flex items-center gap-1 hover:text-primary transition-colors"><ArrowLeft size={13} />Volver al blog</Link>
          </div>

          <div className="card-eco p-8">
            {fullContent[post.slug] ?? (
              <div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(var(--foreground))" }}>{post.excerpt}</p>

                <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Contenido del artículo</h2>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Este artículo aborda en profundidad el tema de <strong>{post.title}</strong> desde una perspectiva técnica y práctica, con ejemplos reales aplicados a los servicios de descarbonización profesional.
                </p>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                  La descarbonización es hoy uno de los servicios de mayor demanda en talleres de toda España. El aumento de vehículos diésel con DPF obligatorio (desde Euro 5) y la normativa ITV cada vez más estricta hacen que conductores y gestores de flotas busquen soluciones efectivas y económicas.
                </p>
                <h3 className="text-lg font-bold mt-6 mb-3" style={{ color: "hsl(var(--foreground))" }}>Puntos clave</h3>
                <ul className="space-y-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {post.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2">
                      <Tag size={12} style={{ color: "hsl(var(--primary))" }} />
                      <span className="capitalize">{tag}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Para más información, consulta nuestras <Link to="/soluciones" className="underline" style={{ color: "hsl(var(--primary))" }}>soluciones técnicas</Link> o <Link to="/contacto" className="underline" style={{ color: "hsl(var(--primary))" }}>contacta con un experto</Link>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="badge-steel text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* RELACIONADOS */}
      {related.length > 0 && (
        <section className="py-12 section-alt">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Artículos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="card-eco p-4 group hover:shadow-md transition-shadow">
                  <span className="badge-green text-xs mb-2 inline-block">{r.category}</span>
                  <h3 className="text-sm font-bold group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{r.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABox title="¿Listo para actuar?" description="Consulta con un experto sobre descarbonización para tu vehículo." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
