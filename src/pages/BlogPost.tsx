import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, MapPin, Twitter, Facebook, Linkedin, Lock, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import { blogPosts as legacyPosts } from "@/data/blog";
import { supabase } from "@/integrations/supabase/client";
import { renderMarkdown } from "@/lib/markdown";
import CommentsSection from "@/components/blog/CommentsSection";
import { toast } from "sonner";

interface DbPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  author: string; category: string; city: string | null; image_url: string | null;
  meta_title: string | null; meta_description: string | null; published_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [dbPost, setDbPost] = useState<DbPost | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [related, setRelated] = useState<DbPost[]>([]);

  useEffect(() => {
    if (localStorage.getItem("blog_unlocked_email")) setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("blog_posts").select("*")
        .eq("slug", slug).eq("published", true).maybeSingle();
      setDbPost(data as DbPost | null);
      if (data) {
        const { data: rel } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, content, author, category, city, image_url, meta_title, meta_description, published_at")
          .eq("published", true).eq("category", data.category).neq("id", data.id).limit(3);
        setRelated((rel as any) || []);
      }
      setLoaded(true);
    })();
  }, [slug]);

  const legacy = useMemo(() => legacyPosts.find((p) => p.slug === slug) || null, [slug]);

  // SEO
  useEffect(() => {
    const post = dbPost || legacy;
    if (!post) return;
    const title = (dbPost?.meta_title) || (post as any).title;
    const desc = (dbPost?.meta_description) || (post as any).excerpt;
    document.title = `${title} | Ecología Rentable Blog`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", desc || "");
  }, [dbPost, legacy]);

  if (!loaded) return null;

  // ── DB POST: full render with markdown + paywall + comments ──
  if (dbPost) {
    const readingMin = Math.max(1, Math.ceil((dbPost.content || "").trim().split(/\s+/).length / 200));
    const rendered = renderMarkdown(dbPost.content || "");
    const cut = Math.ceil(rendered.length * 0.4);
    const visible = rendered.slice(0, cut);
    const hidden = rendered.slice(cut);
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `${dbPost.title} — Ecología Rentable`;

    async function unlock(e: React.FormEvent) {
      e.preventDefault();
      if (!email.includes("@")) return toast.error("Email inválido");
      setSubmitting(true);
      const { error } = await supabase.from("newsletter_subscribers")
        .insert({ email, source: "blog_unlock", is_active: true });
      setSubmitting(false);
      if (error && !error.message.includes("duplicate")) return toast.error(error.message);
      localStorage.setItem("blog_unlocked_email", email);
      setUnlocked(true);
      toast.success("¡Contenido desbloqueado!");
    }

    function share(p: "twitter" | "facebook" | "linkedin") {
      const urls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      };
      window.open(urls[p], "_blank", "width=600,height=400");
    }

    return (
      <main>
        <PageHero
          title={dbPost.title}
          subtitle={dbPost.excerpt}
          breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: dbPost.category }, { label: dbPost.title.substring(0, 40) + "…" }]}
          badge={dbPost.category}
        />

        <section className="py-14 section-light">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={13} />{new Date(dbPost.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock size={13} />{readingMin} min de lectura</span>
              <span className="flex items-center gap-1"><Tag size={13} />{dbPost.author}</span>
              {dbPost.city && <span className="flex items-center gap-1"><MapPin size={13} />{dbPost.city}</span>}
              <Link to="/blog" className="ml-auto flex items-center gap-1 hover:text-primary transition-colors"><ArrowLeft size={13} />Volver al blog</Link>
            </div>

            {/* Hero image */}
            {dbPost.image_url && (
              <div className="rounded-xl overflow-hidden mb-8 aspect-[21/9]">
                <img src={dbPost.image_url} alt={dbPost.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
              <span className="text-xs text-muted-foreground mr-1">Compartir:</span>
              <button onClick={() => share("twitter")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Twitter"><Twitter size={14} /></button>
              <button onClick={() => share("facebook")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Facebook"><Facebook size={14} /></button>
              <button onClick={() => share("linkedin")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="LinkedIn"><Linkedin size={14} /></button>
            </div>

            {/* Content */}
            <article className="card-eco p-6 md:p-8">
              {visible}

              {!unlocked && hidden.length > 0 && (
                <div className="relative mt-2">
                  <div className="max-h-48 overflow-hidden relative pointer-events-none select-none" aria-hidden="true">
                    <div className="opacity-50">{hidden.slice(0, 3)}</div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent" />
                  <form onSubmit={unlock} className="mt-6 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
                    <Lock size={28} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-bold text-lg mb-2 text-foreground">Continúa leyendo gratis</h3>
                    <p className="text-sm text-muted-foreground mb-4">Introduce tu email para desbloquear el resto del artículo y recibir contenido técnico exclusivo.</p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com" className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                      <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-60">
                        {submitting ? "..." : "Desbloquear"}
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-3">Cumplimos RGPD. Te puedes dar de baja en cualquier momento.</p>
                  </form>
                </div>
              )}

              {unlocked && hidden}
            </article>

            {unlocked && (
              <>
                {/* Author card */}
                <div className="mt-10 p-6 card-eco flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold">
                    {dbPost.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{dbPost.author}</h3>
                    <p className="text-sm text-muted-foreground">Equipo técnico de Ecología Rentable</p>
                  </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <section className="mt-12">
                    <h2 className="text-xl font-bold mb-6 text-foreground">Artículos relacionados</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {related.map((r) => (
                        <Link key={r.id} to={`/blog/${r.slug}`} className="card-eco overflow-hidden group hover:shadow-md transition-shadow">
                          {r.image_url && <img src={r.image_url} alt={r.title} className="w-full h-32 object-cover" loading="lazy" />}
                          <div className="p-4">
                            <span className="badge-green text-xs mb-2 inline-block">{r.category}</span>
                            <h3 className="text-sm font-bold group-hover:text-primary transition-colors text-foreground line-clamp-2">{r.title}</h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                <CommentsSection postId={dbPost.id} />
              </>
            )}
          </div>
        </section>

        <CTABox title="¿Listo para actuar?" description="Consulta con un experto sobre descarbonización para tu vehículo." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
      </main>
    );
  }

  // ── LEGACY POST fallback (mantém comportamento anterior) ──
  if (legacy) {
    const relatedLegacy = legacyPosts.filter((p) => p.categorySlug === legacy.categorySlug && p.id !== legacy.id).slice(0, 3);
    return (
      <main>
        <PageHero
          title={legacy.title}
          subtitle={legacy.excerpt}
          breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: legacy.category, href: `/blog/${legacy.categorySlug}` }, { label: legacy.title.substring(0, 40) + "…" }]}
          badge={legacy.category}
        />
        <section className="py-14 section-light">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock size={13} />{legacy.readTime} de lectura</span>
              <span>{legacy.date}</span>
              <Link to="/blog" className="ml-auto flex items-center gap-1 hover:text-primary transition-colors"><ArrowLeft size={13} />Volver al blog</Link>
            </div>
            <div className="rounded-xl overflow-hidden mb-8">
              <img src={legacy.image} alt={legacy.title} className="w-full h-64 md:h-80 object-cover" />
            </div>
            <div className="card-eco p-8">
              <p className="text-base leading-relaxed mb-6 text-foreground">{legacy.excerpt}</p>
              <p className="leading-relaxed text-muted-foreground">
                Este artículo aborda <strong>{legacy.title}</strong> desde una perspectiva técnica y práctica.
                Para más información, consulta nuestras <Link to="/soluciones" className="underline text-primary">soluciones técnicas</Link> o <Link to="/contacto" className="underline text-primary">contacta con un experto</Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {legacy.tags.map((tag) => (<span key={tag} className="badge-steel text-xs">{tag}</span>))}
            </div>
          </div>
        </section>
        {relatedLegacy.length > 0 && (
          <section className="py-12 section-alt">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-xl font-bold mb-6 text-foreground">Artículos relacionados</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedLegacy.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="card-eco overflow-hidden group hover:shadow-md transition-shadow">
                    <img src={r.image} alt={r.title} className="w-full h-32 object-cover" loading="lazy" />
                    <div className="p-4">
                      <span className="badge-green text-xs mb-2 inline-block">{r.category}</span>
                      <h3 className="text-sm font-bold group-hover:text-primary transition-colors text-foreground">{r.title}</h3>
                      <p className="text-xs mt-1 text-muted-foreground">{r.readTime}</p>
                    </div>
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

  // ── 404 ──
  return (
    <main>
      <PageHero title="Artículo no encontrado" subtitle="El artículo que buscas no existe o ha sido movido." breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "No encontrado" }]} />
      <div className="py-16 text-center">
        <Link to="/blog" className="btn-primary inline-flex items-center gap-1.5"><ArrowLeft size={14} /> Volver al blog <ArrowRight size={14} /></Link>
      </div>
    </main>
  );
}
