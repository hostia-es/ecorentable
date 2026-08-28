import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Eye, Loader2, Upload } from "lucide-react";
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
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const nav = useNavigate();
  const [f, setF] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  async function save() {
    if (!f.title || !f.slug) return toast.error("Título y slug son obligatorios");

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

  async function handleUpload(file: File) {
    if (file.size > MAX_IMAGE_BYTES) return toast.error("Máx 5 MB");
    if (!file.type.startsWith("image/")) return toast.error("Solo imágenes");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${Date.now()}-${slugify(f.slug || f.title || "post").slice(0, 40) || "img"}.${ext}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, file, {
        cacheControl: "3600", upsert: false, contentType: file.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      update("image_url", data.publicUrl);
      toast.success("Imagen subida");
    } catch (e: any) {
      toast.error(e?.message || "Error subiendo imagen");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
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
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg px-4 py-1.5 text-sm disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Guardar
          </button>
        </div>
      </div>

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

          <SeoValidationPanel post={f} />

          <div className="rounded-xl border border-white/5 p-4 space-y-3" style={{ background: "hsl(210 25% 7%)" }}>
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide">Imagen destacada</h3>
            {f.image_url ? (
              <img src={f.image_url} alt="" className="w-full aspect-video object-cover rounded-lg" />
            ) : (
              <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center text-white/30 text-xs">Sin imagen</div>
            )}
            <input value={f.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="URL de la imagen"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono" />
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUpload(file); }} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/5 text-white rounded-lg px-3 py-2 text-xs disabled:opacity-50"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              Subir imagen (máx 5 MB)
            </button>
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
