import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { blogPosts, blogCategories } from "@/data/blog";


const faqBlog = [
  { question: "¿Con qué frecuencia se publica contenido nuevo?", answer: "Publicamos al menos 2 artículos al mes en las categorías de Guías, ITV, Innovación y Flotas. Suscríbete al newsletter para no perderte nada." },
  { question: "¿Puedo compartir los artículos?", answer: "Sí, todos nuestros artículos pueden compartirse libremente. Te pedimos que cites la fuente y enlaces a la publicación original." },
  { question: "¿Cómo puedo proponer un tema?", answer: "Escríbenos a través del formulario de contacto indicando el asunto 'Sugerencia Blog'. Revisamos todas las propuestas." },
];

export default function Blog() {
  const featured = blogPosts.slice(0, 3);
  const recent = blogPosts.slice(3);

  return (
    <main>
      <PageHero
        title="Blog — Aprende y actúa"
        subtitle="Guías técnicas, novedades y consejos sobre descarbonización, filtros DPF, ITV y mantenimiento de motor."
        breadcrumbs={[{ label: "Blog" }]}
        badge="Contenido técnico"
      />

      {/* CATEGORÍAS */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Explorar por categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {blogCategories.map((cat) => (
              <Link key={cat.slug} to={`/blog/${cat.slug}`} className="card-eco p-4 text-center hover:border-primary transition-colors group">
                <div className="text-lg font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>{cat.count}</div>
                <div className="text-xs font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{cat.name}</div>
                <div className="text-xs leading-tight" style={{ color: "hsl(var(--muted-foreground))" }}>{cat.description.substring(0, 50)}…</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARTÍCULOS DESTACADOS */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "hsl(var(--foreground))" }}>Artículos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card-eco p-6 flex flex-col gap-3 group hover:shadow-md transition-shadow">
                <span className="badge-green self-start text-xs">{post.category}</span>
                <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{post.title}</h3>
                <p className="text-sm flex-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "hsl(var(--primary))" }}>Leer artículo <ArrowRight size={11} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TODOS LOS ARTÍCULOS */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "hsl(var(--foreground))" }}>Todos los artículos</h2>
          <div className="space-y-4">
            {recent.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card-eco p-5 flex flex-col sm:flex-row sm:items-center gap-4 group hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-steel text-xs">{post.category}</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--muted-foreground))" }}><Clock size={10} />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{post.title}</h3>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold shrink-0" style={{ color: "hsl(var(--primary))" }}>Leer <ArrowRight size={11} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* APRENDE Y ACTÚA */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Aprende y actúa</h2>
            <p className="text-base" style={{ color: "hsl(var(--muted-foreground))" }}>El conocimiento no sirve de nada si no va acompañado de acción. Después de leer, da el siguiente paso.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Ver servicios", desc: "Descarbonización, DPF, EGR y más servicios para tu vehículo.", href: "/servicios", cta: "Ver servicios" },
              { title: "Hazte socio", desc: "Únete a nuestra red de talleres certificados en toda España.", href: "/socios", cta: "Más información" },
              { title: "Soluciones técnicas", desc: "Profundiza en cada solución: causas, síntomas y proceso.", href: "/soluciones", cta: "Ver soluciones" },
            ].map((item) => (
              <div key={item.title} className="card-eco p-5 flex flex-col gap-3">
                <h3 className="font-bold" style={{ color: "hsl(var(--foreground))" }}>{item.title}</h3>
                <p className="text-sm flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                <Link to={item.href} className="btn-primary text-sm self-start">{item.cta} <ArrowRight size={12} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqBlog} />
      <CTABox title="¿Tienes dudas técnicas?" description="Nuestro equipo técnico responde consultas sobre descarbonización, DPF, EGR e ITV." primaryLabel="Contactar experto" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
