// Backfill blog posts from CSV calendar with light AI (text + image)
// Idempotent: skips slugs that already exist.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

function slugify(t: string): string {
  return t
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseDate(d: string): string {
  // dd/mm/yyyy -> yyyy-mm-dd
  const [dd, mm, yyyy] = d.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

async function genContent(row: any): Promise<{ title: string; excerpt: string; content: string; meta_title: string; meta_description: string }> {
  const sys = `Eres redactor SEO de Ecología Rentable, marca española de descarbonización, limpieza DPF/FAP, EGR y mantenimiento eficiente. Escribes en español, tono profesional, conciso ("Bypass Copy"). NUNCA menciones precios concretos: usa "Consultar precio". NUNCA uses "Flex Fuel". Estilo claro, listas y subtítulos H2/H3 en markdown.`;
  const user = `Genera un post de blog corto pero completo (450-650 palabras) para:
- Título idea: ${row.idea}
- Keyword principal: ${row.kw}
- Keywords secundarias: ${row.kw2}, ${row.kw3}, ${row.kw4}
- Tipo: ${row.tipo} (intención ${row.intencion})
- Ciudad: ${row.ciudad}
- Categoría: ${row.categoria}

Devuelve JSON estricto:
{
  "title": "Título atractivo <60 caracteres con keyword",
  "excerpt": "Resumen 140-160 caracteres",
  "meta_title": "<60 caracteres",
  "meta_description": "<160 caracteres con keyword",
  "content": "Markdown con intro (2 frases), 3-4 secciones ## H2 con listas, y un cierre con CTA para solicitar diagnóstico en ${row.ciudad}. Sin precios concretos."
}`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": LOVABLE_API_KEY,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`text gen ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const raw = j.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(raw);
}

async function genImage(prompt: string): Promise<Uint8Array> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": LOVABLE_API_KEY,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [
        { role: "user", content: `Fotografía profesional, taller mecánico moderno español, iluminación cinematográfica, alta calidad editorial, sin texto en la imagen. Tema: ${prompt}` },
      ],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) throw new Error(`img gen ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const url: string | undefined = j.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!url || !url.startsWith("data:")) throw new Error("no image in response");
  const b64 = url.split(",")[1];
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function uploadImage(slug: string, bytes: Uint8Array): Promise<string> {
  const path = `auto/${slug}-${Date.now()}.png`;
  const { error } = await supabase.storage.from("blog-images").upload(path, bytes, {
    contentType: "image/png",
    upsert: true,
  });
  if (error) throw new Error(`upload: ${error.message}`);
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { rows } = await req.json() as { rows: Array<{ fecha: string; idea: string; kw: string; kw2?: string; kw3?: string; kw4?: string; tipo?: string; intencion?: string; categoria?: string; ciudad?: string; autor?: string }> };
    if (!Array.isArray(rows)) throw new Error("rows[] required");

    const results: any[] = [];
    for (const row of rows) {
      const slug = slugify(row.idea);
      try {
        const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
        if (existing) { results.push({ slug, status: "skip" }); continue; }

        const ai = await genContent(row);
        const finalSlug = slugify(ai.title || row.idea);
        const { data: existing2 } = await supabase.from("blog_posts").select("id").eq("slug", finalSlug).maybeSingle();
        const useSlug = existing2 ? `${finalSlug}-${Math.random().toString(36).slice(2, 6)}` : finalSlug;

        let imageUrl: string | null = null;
        try {
          const img = await genImage(`${row.idea}. Keyword: ${row.kw}.`);
          imageUrl = await uploadImage(useSlug, img);
        } catch (e) {
          console.error("image fail", useSlug, e);
        }

        const { error: insErr } = await supabase.from("blog_posts").insert({
          slug: useSlug,
          title: ai.title || row.idea,
          excerpt: ai.excerpt || "",
          content: ai.content || "",
          meta_title: ai.meta_title || ai.title,
          meta_description: ai.meta_description || ai.excerpt,
          meta_keywords: [row.kw, row.kw2, row.kw3, row.kw4].filter(Boolean).join(", "),
          image_url: imageUrl,
          city: row.ciudad || null,
          category: row.categoria || "General",
          author: row.autor || "Ecología Rentable",
          published: false,
          published_at: parseDate(row.fecha) + "T08:00:00Z",
        });
        if (insErr) throw new Error(insErr.message);
        results.push({ slug: useSlug, status: "created", image: !!imageUrl });
      } catch (e: any) {
        results.push({ slug, status: "error", error: e?.message || String(e) });
      }
    }
    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
