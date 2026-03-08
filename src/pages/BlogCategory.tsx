import { useParams, Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import { blogPosts, blogCategories } from "@/data/blog";

export default function BlogCategory() {
  const { category } = useParams<{ category: string }>();
  const catInfo = blogCategories.find((c) => c.slug === category);
  const posts = blogPosts.filter((p) => p.categorySlug === category);

  if (!catInfo) {
    return (
      <main>
        <PageHero title="Categoría no encontrada" subtitle="" breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "No encontrada" }]} />
        <div className="py-16 text-center"><Link to="/blog" className="btn-primary">← Volver al blog</Link></div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title={catInfo.name}
        subtitle={catInfo.description}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: catInfo.name }]}
        badge={`${posts.length} artículo${posts.length !== 1 ? "s" : ""}`}
      />

      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          {posts.length === 0 ? (
            <p className="text-center py-16" style={{ color: "hsl(var(--muted-foreground))" }}>Próximamente nuevos artículos en esta categoría.</p>
          ) : (
            <div className="space-y-5">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="card-eco p-6 flex flex-col sm:flex-row sm:items-center gap-4 group hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h2 className="font-bold text-base group-hover:text-primary transition-colors mb-2" style={{ color: "hsl(var(--foreground))" }}>{post.title}</h2>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "hsl(var(--primary))" }} />
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12">
            <h3 className="text-lg font-bold mb-5" style={{ color: "hsl(var(--foreground))" }}>Otras categorías</h3>
            <div className="flex flex-wrap gap-3">
              {blogCategories.filter((c) => c.slug !== category).map((c) => (
                <Link key={c.slug} to={`/blog/${c.slug}`} className="badge-steel hover:border-primary transition-colors text-sm px-4 py-2">{c.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABox title="¿Quieres actuar?" description="Contacta con nuestro equipo técnico para resolver tus dudas." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
