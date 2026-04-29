import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, ArrowLeft, Tag, MapPin, Share2, Twitter, Facebook, Linkedin, Mail, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CommentsSection from "@/components/blog/CommentsSection";
import { toast } from "sonner";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string;
  author: string; category: string; city: string | null; image_url: string | null;
  published_at: string; meta_title: string | null; meta_description: string | null;
}
interface RelatedPost { id: string; title: string; slug: string; excerpt: string; category: string; image_url: string | null; }

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { if (localStorage.getItem("blog_unlocked_email")) setIsUnlocked(true); }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setIsLoading(true); setNotFound(false);
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      if (error || !data) { setNotFound(true); setIsLoading(false); return; }
      setPost(data as BlogPost);
      const { data: rel } = await supabase.from("blog_posts")
        .select("id, title, slug, excerpt, category, image_url")
        .eq("published", true).eq("category", data.category).neq("id", data.id).limit(3);
      if (rel) setRelatedPosts(rel as RelatedPost[]);
      setIsLoading(false);
    })();
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.meta_title || post.title} | Ecología Rentable`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", post.meta_description || post.excerpt);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post]);

  const readingTime = useMemo(() => {
    if (!post) return 0;
    return Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  }, [post]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Email inválido"); return; }
    setIsSubmitting(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email, source: "blog_unlock", is_active: true });
    setIsSubmitting(false);
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    localStorage.setItem("blog_unlocked_email", email);
    setIsUnlocked(true);
    toast.success("¡Contenido desbloqueado!");
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleShare = (p: "twitter" | "facebook" | "linkedin") => {
    const text = post ? `${post.title} — Ecología Rentable` : "";
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[p], "_blank", "width=600,height=400");
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 text-center py-24">
          <h1 className="text-4xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
          <p className="text-muted-foreground mb-8">El artículo que buscas no existe o ha sido movido.</p>
          <Button asChild>
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Volver al blog</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-24">
      {/* Hero image full-width */}
      {post.image_url ? (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-10">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-10">
          <div className="aspect-[21/9] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center shadow-lg">
            <span className="text-7xl">📝</span>
          </div>
        </div>
      )}

      <article className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="mb-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Badge className="bg-primary/10 text-primary border-0 font-medium"><Tag className="w-3 h-3 mr-1" />{post.category}</Badge>
          {post.city && (<Badge variant="secondary" className="border-0"><MapPin className="w-3 h-3 mr-1" />{post.city}</Badge>)}
          <span className="text-xs text-muted-foreground ml-1">{readingTime} min de lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight text-foreground mb-5">{post.title}</h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-light">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-8 border-b border-border mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center"><User className="w-4 h-4 text-primary" /></div>
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><time dateTime={post.published_at}>{formatDate(post.published_at)}</time></div>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => handleShare("twitter")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
            <button onClick={() => handleShare("facebook")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
            <button onClick={() => handleShare("linkedin")} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
          </div>
        </div>

        <ContentRenderer content={post.content} isUnlocked={isUnlocked} onUnlockSubmit={handleUnlock} email={email} setEmail={setEmail} isSubmitting={isSubmitting} />

        {isUnlocked && (
          <>
            <Separator className="my-10" />
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Share2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Compartir:</span>
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}><Twitter className="w-4 h-4 mr-1" /> Twitter</Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}><Linkedin className="w-4 h-4 mr-1" /> LinkedIn</Button>
            </div>

            <div className="mt-12 p-6 bg-muted/40 rounded-2xl border border-border flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0"><User className="w-6 h-6 text-primary" /></div>
              <div>
                <h3 className="font-semibold text-foreground text-base">{post.author}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Equipo técnico de Ecología Rentable</p>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">Artículos relacionados</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((r) => (
                    <Link key={r.id} to={`/blog/${r.slug}`} className="group block rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="aspect-video bg-muted overflow-hidden">
                        {r.image_url ? (
                          <img src={r.image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5"><span className="text-3xl">📝</span></div>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs border-0">{r.category}</Badge>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{r.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <CommentsSection postId={post.id} />

            <section className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/20 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">¿Listo para actuar?</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Consulta con un experto sobre descarbonización para tu vehículo.</p>
              <Button asChild size="lg"><Link to="/contacto">Contactar</Link></Button>
            </section>
          </>
        )}
      </article>
    </main>
  );
}

// ─── Markdown Content Renderer ───
function ContentRenderer({ content, isUnlocked, onUnlockSubmit, email, setEmail, isSubmitting }: {
  content: string; isUnlocked: boolean; onUnlockSubmit: (e: React.FormEvent) => void;
  email: string; setEmail: (v: string) => void; isSubmitting: boolean;
}) {
  const rendered = useMemo(() => parseMarkdown(content), [content]);
  const cutIndex = Math.ceil(rendered.length * 0.4);
  const visiblePart = rendered.slice(0, cutIndex);
  const hiddenPart = rendered.slice(cutIndex);

  return (
    <div className="blog-content">
      {visiblePart}
      {!isUnlocked && hiddenPart.length > 0 ? (
        <div className="relative mt-0">
          <div className="max-h-48 overflow-hidden relative pointer-events-none select-none" aria-hidden="true">
            {hiddenPart.slice(0, 4)}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
          </div>
          <div className="relative -mt-4 py-10 px-6 md:px-10 bg-card border-2 border-primary/20 rounded-2xl shadow-xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"><Lock className="w-7 h-7 text-primary" /></div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Continúa leyendo gratis</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">Introduce tu email para desbloquear el resto del artículo y recibir contenido técnico exclusivo.</p>
            <form onSubmit={onUnlockSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-4">
              <Input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 h-11" required />
              <Button type="submit" disabled={isSubmitting} className="h-11 px-6 shrink-0">
                {isSubmitting ? (<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />) : (<><Mail className="w-4 h-4 mr-2" /> Desbloquear</>)}
              </Button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Sin spam</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Cancela cuando quieras</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> 100 % gratis</span>
            </div>
          </div>
        </div>
      ) : (hiddenPart)}
    </div>
  );
}

function parseMarkdown(content: string): React.ReactNode[] {
  const blocks = content.split(/\n{2,}/);
  const elements: React.ReactNode[] = [];
  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{inlineFormat(trimmed.slice(4))}</h3>);
    } else if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border">{inlineFormat(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith("# ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">{inlineFormat(trimmed.slice(2))}</h2>);
    } else if (/^\d+[\\.]\s/.test(trimmed)) {
      const items = trimmed.split("\n").filter((line) => /^\d+[\\.]\s/.test(line.trim()));
      elements.push(<ol key={i} className="list-decimal list-outside ml-6 space-y-2 my-5 text-foreground/85 leading-relaxed">{items.map((it, j) => (<li key={j} className="pl-1">{inlineFormat(it.replace(/^\d+[\\.]\s*/, ""))}</li>))}</ol>);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").filter((line) => /^[-•*]\s/.test(line.trim()));
      elements.push(<ul key={i} className="list-disc list-outside ml-6 space-y-2 my-5 text-foreground/85 leading-relaxed">{items.map((it, j) => (<li key={j} className="pl-1">{inlineFormat(it.replace(/^[-•*]\s*/, ""))}</li>))}</ul>);
    } else if (trimmed.includes("|") && trimmed.split("\n").filter((l) => l.trim().startsWith("|")).length >= 2) {
      const rows = trimmed.split("\n").filter((l) => l.trim().includes("|"));
      const dataRows = rows.filter((r) => !/^\|?\s*[-:]+\s*(\|\s*[-:]+\s*)*\|?\s*$/.test(r.trim()));
      if (dataRows.length >= 1) {
        const parseRow = (row: string) => row.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
        const headerCells = parseRow(dataRows[0]);
        const bodyRows = dataRows.slice(1);
        elements.push(
          <div key={i} className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-muted/60">{headerCells.map((c, ci) => (<th key={ci} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">{inlineFormat(c)}</th>))}</tr></thead>
              <tbody>{bodyRows.map((row, ri) => { const cells = parseRow(row); return (<tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}>{cells.map((c, ci) => (<td key={ci} className="px-4 py-3 text-foreground/85 border-b border-border/50">{inlineFormat(c)}</td>))}</tr>); })}</tbody>
            </table>
          </div>
        );
      } else {
        elements.push(<p key={i} className="text-foreground/85 leading-[1.8] mb-5 text-[1.05rem]">{inlineFormat(trimmed)}</p>);
      }
    } else if (trimmed.startsWith("> ")) {
      elements.push(<blockquote key={i} className="border-l-4 border-primary/40 pl-5 my-6 italic text-muted-foreground">{inlineFormat(trimmed.replace(/^>\s*/gm, ""))}</blockquote>);
    } else {
      elements.push(<p key={i} className="text-foreground/85 leading-[1.8] mb-5 text-[1.05rem]">{inlineFormat(trimmed)}</p>);
    }
  });
  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0; let match;
  const cleanText = text.replace(/\\([.#*\-!>])/g, "$1");
  while ((match = regex.exec(cleanText)) !== null) {
    if (match.index > lastIndex) parts.push(cleanText.slice(lastIndex, match.index));
    if (match[1]) parts.push(<strong key={match.index} className="font-semibold text-foreground">{match[1]}</strong>);
    else if (match[2]) parts.push(<em key={match.index}>{match[2]}</em>);
    else if (match[3] && match[4]) {
      const url = match[4];
      if (url.startsWith("/")) parts.push(<Link key={match.index} to={url} className="text-primary hover:underline font-medium">{match[3]}</Link>);
      else parts.push(<a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{match[3]}</a>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < cleanText.length) parts.push(cleanText.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : cleanText;
}
