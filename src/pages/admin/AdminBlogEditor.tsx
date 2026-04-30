import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Sparkles, Image as ImageIcon, Save, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SeoValidationPanel from "@/components/admin/SeoValidationPanel";
import { runSeoChecks, seoSummary } from "@/lib/seoChecks";

const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

interface Form {
  slug: string; title: string; excerpt: string; content: string;
  author: string; category: string; city: string;
  image_url: string; meta_title: string; meta_description: string; meta_keywords: string;
  published: boolean;
}

const empty: Form = {
  slug: "", title: "", excerpt: "", content: "",
  author: "Ecología Rentable", category: "Guías", city: "",
  image_url: "", meta_title: "", meta_description: "", meta_keywords: "",
  published: false,
};

const CATEGORIES = ["Guías", "ITV", "Innovación", "Flotas", "Casos de éxito", "Mantenimiento", "Normativa", "General"];

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const nav = useNavigate();
  const [f, setF] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  // AI panel
  const [aiOpen, setAiOpen] = useState(isNew);
  const [aiTopic, setAiTopic] = useState("");
  const [aiKeyword, setAiKeyword] = useState("");
  const [aiCategory, setAiCategory] = useState("Guías");
  const [aiType, setAiType] = useState("informativo");
  const [aiBusy, setAiBusy] = useState(false);
  const [imgBusy, setImgBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
      if (error) { toast.error(error.message); return; }
      setF({
        slug: data.slug, title: data.title, excerpt: data.excerpt || "",
        content: data.content || "", author: data.author, category: data.category,
        city: data.city || "", image_url: data.image_url || "",
        meta_title: data.meta_title || "", meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "", published: data.published,
      });
      setLoading(false);
    })();
  }, [id, isNew]);

  function update<K extends keyof Form>(k: K, v: Form[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function generateContent() {
    if (!aiTopic || !aiKeyword) return toast.error("Indica idea y keyword principal");
    setAiBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-seo-content", {
        body: {
          idea_contenido: aiTopic, keyword_principal: aiKeyword,
          categoria: aiCategory, tipo_post: aiType, autor: f.author || "Ecología Rentable",
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setF((p) => ({
        ...p,
        title: data.title || p.title,
        slug: data.slug || slugify(data.title || p.title),
        excerpt: data.excerpt || p.excerpt,
        content: data.content || p.content,
        meta_title: data.meta_title || p.meta_title,
        meta_description: data.meta_description || p.meta_description,
        meta_keywords: aiKeyword,
        category: aiCategory,
      }));
      toast.success("Contenido generado");
      setAiOpen(false);
    } catch (e: any) {
      toast.error(e.message || "Error generando contenido");
    }
    setAiBusy(false);
  }

  async function generateImage() {
    if (!f.title) return toast.error("Necesitas un título primero");
    setImgBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-post-image", {
        body: { title: f.title, category: f.category, slug: f.slug || slugify(f.title) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      update("image_url", data.url);
      toast.success("Imagen generada");
    } catch (e: any) {
      toast.error(e.message || "Error generando imagen");
    }
    setImgBusy(false);
  }

  async function save() {
    if (!f.title || !f.slug) return toast.error("Título y slug son obligatorios");

    // Block publishing when SEO has critical errors
    if (f.published) {
      const summary = seoSummary(runSeoChecks(f));
      if (!summary.canPublish) {
        return toast.error(`No se puede publicar: ${summary.fail} error(es) SEO. Revisa el panel.`);
      }
    }

    setSaving(true);
    const payload = { ...f, slug: slugify(f.slug) };
    const { data, error } = isNew
      ? await supabase.from("blog_posts").insert(payload).select().single()
      : await supabase.from("blog_posts").update(payload).eq("id", id!).select().single();
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(f.published ? "Publicado" : "Guardado como borrador");
    if (isNew && data) nav(`/admin/blog/${data.id}`, { replace: true });
  }

  if (loading) return <div className="p-10 text-white/60">Cargando…</div>;

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link to="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
          <ArrowLeft size={14} /> Volver
        </Link>
        <div className="flex items-center gap-2">
          {f.slug && (
            <Link to={`/blog/${f.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/10 rounded-lg px-3 py-1.5">
              <Eye size={13} /> Ver
            </Link>
          )}
          <button onClick={() => setAiOpen(true)} className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10">
            <Sparkles size={13} /> Generar con IA
          </button>
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg px-4 py-1.5 text-sm disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Guardar
          </button>
        </div>
      </div>

      {aiOpen && (
        <div className="rounded-xl border border-[hsl(148,72%,45%)]/30 p-5 space-y-3" style={{ background: "hsl(148 72% 10% / 0.3)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[hsl(148,72%,55%)]" />
            <h3 className="font-semibold text-sm">Generar artículo SEO con IA</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-white/60 block mb-1">Idea del contenido</label>
              <textarea value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} rows={2}
                placeholder="Ej: Cómo la descarbonización con hidrógeno reduce emisiones en flotas urbanas"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Keyword principal</label>
              <input value={aiKeyword} onChange={(e) => setAiKeyword(e.target.value)}
                placeholder="descarbonización motor diésel"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Categoría</label>
              <select value={aiCategory} onChange={(e) => setAiCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Tipo</label>
              <select value={aiType} onChange={(e) => setAiType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                <option value="informativo">Informativo</option>
                <option value="guía">Guía</option>
                <option value="comercial">Comercial</option>
                <option value="comparativo">Comparativo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setAiOpen(false)} className="text-xs px-3 py-1.5 text-white/60 hover:text-white">Cancelar</button>
            <button onClick={generateContent} disabled={aiBusy}
              className="inline-flex items-center gap-1.5 bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg px-4 py-1.5 text-xs disabled:opacity-50">
              {aiBusy ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
              {aiBusy ? "Generando…" : "Generar"}
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Field label="Título">
            <input value={f.title} onChange={(e) => { update("title", e.target.value); if (isNew && !f.slug) update("slug", slugify(e.target.value)); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          </Field>
          <Field label="Slug (URL)">
            <input value={f.slug} onChange={(e) => update("slug", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono" />
          </Field>
          <Field label="Extracto">
            <textarea value={f.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          </Field>
          <Field label="Contenido">
            <RichTextEditor value={f.content} onChange={(v) => update("content", v)} placeholder="Empieza a escribir tu artículo…" />
            <p className="text-[11px] text-white/40 mt-1">Editor visual: títulos, formato, listas, enlaces, imágenes y tablas. Se guarda como Markdown.</p>
          </Field>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-white/5 p-4 space-y-3" style={{ background: "hsl(210 25% 7%)" }}>
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide">Publicación</h3>
            <label className="flex items-center justify-between text-sm">
              <span>Publicado</span>
              <input type="checkbox" checked={f.published} onChange={(e) => update("published", e.target.checked)} className="accent-[hsl(148,72%,45%)]" />
            </label>
            <Field label="Categoría" small>
              <select value={f.category} onChange={(e) => update("category", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Autor" small>
              <input value={f.author} onChange={(e) => update("author", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </Field>
            <Field label="Ciudad (opcional)" small>
              <input value={f.city} onChange={(e) => update("city", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </Field>
          </div>

          <div className="rounded-xl border border-white/5 p-4 space-y-3" style={{ background: "hsl(210 25% 7%)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide">Imagen destacada</h3>
              <button onClick={generateImage} disabled={imgBusy} className="text-[11px] inline-flex items-center gap-1 text-[hsl(148,72%,55%)] hover:underline disabled:opacity-50">
                {imgBusy ? <Loader2 size={11} className="animate-spin" /> : <ImageIcon size={11} />}
                IA
              </button>
            </div>
            {f.image_url ? (
              <img src={f.image_url} alt="" className="w-full aspect-video object-cover rounded-lg" />
            ) : (
              <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center text-white/30 text-xs">Sin imagen</div>
            )}
            <input value={f.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="URL de la imagen"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono" />
          </div>

          <div className="rounded-xl border border-white/5 p-4 space-y-3" style={{ background: "hsl(210 25% 7%)" }}>
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide">SEO</h3>
            <Field label="Meta título (≤58)" small>
              <input value={f.meta_title} onChange={(e) => update("meta_title", e.target.value)} maxLength={70}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
              <p className="text-[10px] text-white/40 mt-0.5">{f.meta_title.length}/58</p>
            </Field>
            <Field label="Meta descripción (≤155)" small>
              <textarea value={f.meta_description} onChange={(e) => update("meta_description", e.target.value)} rows={3} maxLength={170}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
              <p className="text-[10px] text-white/40 mt-0.5">{f.meta_description.length}/155</p>
            </Field>
            <Field label="Keywords" small>
              <input value={f.meta_keywords} onChange={(e) => update("meta_keywords", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </Field>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, small, children }: { label: string; small?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={`block text-${small ? "[11px]" : "xs"} text-white/60 mb-1`}>{label}</label>
      {children}
    </div>
  );
}
