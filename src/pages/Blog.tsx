import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Wrench, Lightbulb, ShoppingBag, MapPin, Users, Leaf, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import RelatedHubs from "@/components/common/RelatedHubs";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { blogPosts as legacyPosts, blogCategories } from "@/data/blog";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import { supabase } from "@/integrations/supabase/client";

interface UnifiedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  source: "db" | "legacy";
}

const faqBlog = [
  { question: "¿Con qué frecuencia se publica contenido nuevo?", answer: "Publicamos al menos 2 artículos al mes en las categorías de Guías, ITV, Innovación y Flotas. Suscríbete al newsletter para no perderte nada." },
  { question: "¿Puedo compartir los artículos?", answer: "Sí, todos nuestros artículos pueden compartirse libremente. Te pedimos que cites la fuente y enlaces a la publicación original." },
  { question: "¿Cómo puedo proponer un tema?", answer: "Escríbenos a través del formulario de contacto indicando el asunto 'Sugerencia Blog'. Revisamos todas las propuestas." },
];

function readTimeOf(text: string) {
  const w = (text || "").trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(w / 200))} min`;
}

export default function Blog() {
  const [dbPosts, setDbPosts] = useState<UnifiedPost[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, image_url, published_at, content")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (data) {
        setDbPosts(data.map((p: any) => ({
          id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt || "",
          category: p.category, image: p.image_url || "/placeholder.svg",
          date: new Date(p.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
          readTime: readTimeOf(p.content || ""), source: "db",
        })));
      }
    })();
  }, []);

  const allPosts: UnifiedPost[] = useMemo(() => {
    const legacy: UnifiedPost[] = legacyPosts.map((p) => ({
      id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt,
      category: p.category, image: p.image, date: p.date, readTime: p.readTime, source: "legacy",
    }));
    // DB primeiro (mais recentes), legacy depois
    return [...dbPosts, ...legacy];
  }, [dbPosts]);

  const featured = allPosts.slice(0, 3);
  const recent = allPosts.slice(3);

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
          <AnimatedSection>
            <h2 className="text-xl font-bold mb-6 text-foreground">Explorar por categoría</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {blogCategories.map((cat) => (
              <motion.div key={cat.slug} variants={staggerItem}>
                <Link to={`/blog/${cat.slug}`} className="bg-white rounded-xl border border-border shadow-sm p-4 text-center hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 block h-full group">
                  <div className="text-lg font-bold mb-1 text-primary">{cat.count}</div>
                  <div className="text-xs font-semibold mb-1 group-hover:text-primary transition-colors text-foreground">{cat.name}</div>
                  <div className="text-xs leading-tight text-muted-foreground">{cat.description.substring(0, 50)}…</div>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ARTÍCULOS DESTACADOS */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-8 text-foreground">Artículos destacados</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((post) => (
              <motion.div key={post.id} variants={staggerItem}>
                <Link to={`/blog/${post.slug}`} className="bg-white rounded-2xl border border-border shadow-md overflow-hidden flex flex-col gap-0 group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 block h-full">
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary self-start">{post.category}</span>
                    <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors text-foreground">{post.title}</h3>
                    <p className="text-sm flex-1 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    </div>
                    <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-primary">Leer artículo <ArrowRight size={11} /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* TODOS LOS ARTÍCULOS */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-8 text-foreground">Todos los artículos</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {recent.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <Link to={`/blog/${post.slug}`} className="bg-white rounded-2xl border border-border shadow-sm p-0 overflow-hidden flex flex-col sm:flex-row sm:items-center gap-0 group hover:shadow-xl hover:border-primary/30 transition-all duration-200 block">
                  <img src={post.image} alt={post.title} className="w-full sm:w-40 h-28 sm:h-full object-cover shrink-0" loading="lazy" />
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-muted text-muted-foreground">{post.category}</span>
                      <span className="text-xs flex items-center gap-1 text-muted-foreground"><Clock size={10} />{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors text-foreground">{post.title}</h3>
                    <p className="text-xs mt-1 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold shrink-0 pr-5 text-primary">Leer <ArrowRight size={11} /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APRENDE Y ACTÚA */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3 text-foreground">Aprende y actúa</h2>
              <p className="text-base text-muted-foreground">El conocimiento no sirve de nada si no va acompañado de acción. Después de leer, da el siguiente paso.</p>
            </div>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Ver servicios", desc: "Descarbonización, DPF, EGR y más servicios para tu vehículo.", href: "/servicios", cta: "Ver servicios" },
              { title: "Hazte socio", desc: "Únete a nuestra red de talleres certificados en toda España.", href: "/socios", cta: "Más información" },
              { title: "Soluciones técnicas", desc: "Profundiza en cada solución: causas, síntomas y proceso.", href: "/soluciones", cta: "Ver soluciones" },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-md p-5 flex flex-col gap-3 h-full hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm flex-1 text-muted-foreground">{item.desc}</p>
                  <Link to={item.href} className="btn-primary text-sm self-start">{item.cta} <ArrowRight size={12} /></Link>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <RelatedHubs
        eyebrow="Navegación"
        heading="Continúe explorando Ecología Rentable"
        items={[
          { title: "Servicios", description: "Tratamientos profesionales para particulares y flotas.", href: "/servicios", icon: Wrench },
          { title: "Soluciones técnicas", description: "Equipos y procesos por tipo de motor.", href: "/soluciones", icon: Lightbulb },
          { title: "Tienda profesional", description: "Catálogo de máquinas y consumibles.", href: "/tienda", icon: ShoppingBag },
          { title: "Encuentra tu centro", description: "Red nacional de talleres certificados.", href: "/encuentra-tu-centro", icon: MapPin },
          { title: "Hazte socio", description: "Programa para talleres y distribuidores.", href: "/socios", icon: Users },
          { title: "Sobre nosotros", description: "Misión, equipo y compromiso medioambiental.", href: "/nosotros", icon: Leaf },
        ]}
      />

      <FAQSection items={faqBlog} />
      <CTABox title="¿Tienes dudas técnicas?" description="Nuestro equipo técnico responde consultas sobre descarbonización, DPF, EGR e ITV." primaryLabel="Contactar experto" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
