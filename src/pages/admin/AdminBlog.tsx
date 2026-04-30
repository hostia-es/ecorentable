import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, RefreshCw, Loader2, X, Calendar, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string; slug: string; title: string; category: string;
  published: boolean; published_at: string; image_url: string | null;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const [syncOpen, setSyncOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");
  const [preview, setPreview] = useState<any | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, category, published, published_at, image_url")
      .order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts(data || []);
    setLoading(false);
  }

  async function togglePublish(p: Post) {
    const { error } = await supabase.from("blog_posts").update({ published: !p.published }).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(!p.published ? "Publicado" : "Despublicado");
    load();
  }

  async function remove(p: Post) {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    load();
  }

  function buildPayload(url: string) {
    const isCsv = /output=csv|\/pub\?/i.test(url);
    return isCsv ? { csv_url: url } : { sheet_url: url };
  }

  async function analyzeSheet() {
    if (!sheetUrl.trim()) return toast.error("Pega una URL");
    setIsSyncing(true);
    setSyncStatus("Analizando calendario...");
    setPreview(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("No autenticado");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-blog-calendar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...buildPayload(sheetUrl), dry_run: true }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al analizar");
      setPreview(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setIsSyncing(false);
      setSyncStatus("");
    }
  }

  async function runSync() {
    if (!preview || preview.to_process === 0) return;
    setIsSyncing(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("No autenticado");

      let totalProcessed = 0;
      let remaining = preview.to_process;
      const payload = buildPayload(sheetUrl);

      while (remaining > 0) {
        setSyncStatus(`Generando posts... (${totalProcessed} completados, ${remaining} restantes)`);
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-blog-calendar`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ ...payload, batch_size: 3 }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al sincronizar");

        totalProcessed += data.batch_processed;
        remaining = data.remaining;

        const errors = data.results?.filter((r: any) => r.status === "error").length || 0;
        const pub = data.results?.filter((r: any) => r.status === "published").length || 0;
        const sched = data.results?.filter((r: any) => r.status === "scheduled").length || 0;
        if (errors > 0) toast.warning(`Lote: ${pub} publicados, ${sched} programados, ${errors} errores`);
        if (remaining <= 0) break;
      }

      toast.success(`¡Sincronización completada! ${totalProcessed} posts procesados.`);
      setSyncOpen(false);
      setPreview(null);
      setSheetUrl("");
      load();
    } catch (error) {
      console.error("Sync error:", error);
      toast.error(error instanceof Error ? error.message : "Error durante la sincronización");
    } finally {
      setIsSyncing(false);
      setSyncStatus("");
    }
  }

  const filtered = posts.filter(
    (p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="text-sm text-[hsl(0,0%,50%)] mt-1">{posts.length} posts en la base de datos.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncCalendar}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/5 rounded-lg px-4 py-2 text-sm disabled:opacity-50"
            title="Importar y generar posts desde Google Sheet"
          >
            {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {isSyncing ? "Sincronizando..." : "Sincronizar calendario"}
          </button>
          <Link to="/admin/blog/new" className="inline-flex items-center gap-2 bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg px-4 py-2 text-sm">
            <Plus size={16} /> Nuevo post
          </Link>
        </div>
      </div>

      {isSyncing && syncStatus && (
        <div className="rounded-xl border border-[hsl(148,72%,45%)]/40 bg-[hsl(148,72%,45%)]/5 p-4 flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[hsl(148,72%,55%)]" />
          <p className="text-sm font-medium">{syncStatus}</p>
        </div>
      )}

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título o categoría…"
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: "hsl(210 25% 7%)" }}>
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs text-white/60 uppercase">
            <tr>
              <th className="text-left p-3">Post</th>
              <th className="text-left p-3 hidden md:table-cell">Categoría</th>
              <th className="text-left p-3 hidden lg:table-cell">Fecha</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-right p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-white/50">Cargando…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-white/50">Sin resultados.</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {p.image_url ? <img src={p.image_url} className="w-12 h-9 object-cover rounded" alt="" /> : <div className="w-12 h-9 rounded bg-white/5" />}
                    <div>
                      <p className="font-medium leading-tight">{p.title}</p>
                      <p className="text-xs text-white/40">/blog/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell text-white/70">{p.category}</td>
                <td className="p-3 hidden lg:table-cell text-white/50 text-xs">{new Date(p.published_at).toLocaleDateString("es-ES")}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-[hsl(148,72%,45%)]/20 text-[hsl(148,72%,55%)]" : "bg-white/10 text-white/60"}`}>
                    {p.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => togglePublish(p)} className="p-2 rounded hover:bg-white/10" title={p.published ? "Despublicar" : "Publicar"}>
                      {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <Link to={`/admin/blog/${p.id}`} className="p-2 rounded hover:bg-white/10" title="Editar">
                      <Edit size={14} />
                    </Link>
                    <button onClick={() => remove(p)} className="p-2 rounded hover:bg-white/10 text-red-400" title="Eliminar">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
