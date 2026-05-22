import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function buildPrompt(title: string, excerpt: string, category: string) {
  return `Crea una imagen de cabecera EDUCATIVA y FOTORREALISTA para un blog técnico de automoción de la marca "Ecología Rentable" (España).

CONTEXTO DEL PRODUCTO REAL:
- "Ecología Rentable" descarboniza motores diésel y gasolina inyectando HIDRÓGENO (HHO) por electrólisis en la admisión del motor en ralentí.
- Máquinas reales: carros profesionales de taller H2 Profit / Hy-Carbon Connect, color claro con detalles verdes, panel digital, mangueras, depósito de agua destilada.
- También limpian DPF/FAP con Carbon FAP (agua + aire comprimido) y miden emisiones pre-ITV.
- Entorno: taller mecánico limpio, suelo epoxi, coche con capó abierto, técnico uniformado.

TEMA: "${title}"
${excerpt ? `Resumen: ${excerpt}` : ""}
Categoría: ${category || "automoción"}

ESTILO:
- Fotografía editorial profesional + ilustración educativa de motor en sección si ayuda.
- Iluminación natural luminosa, foco nítido.
- Paleta: verdes #1f9d55 #2bc48a, blancos, grises, azul acero. Eco/profesional, NUNCA cyberpunk ni neón.
- Composición 16:9, espacio limpio para overlay.
- SIN texto, SIN logos, SIN caras deformes.
- Aspecto de foto real de taller español, no render 3D plástico.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (d: any, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const limit = Math.min(Math.max(Number(body.limit) || 3, 1), 10);

    const { data: posts, error } = await admin
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, image_url")
      .or("image_url.is.null,image_url.eq.")
      .limit(limit);
    if (error) return json({ error: error.message }, 500);

    const results: any[] = [];
    for (const p of posts || []) {
      try {
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3-pro-image-preview",
            messages: [{ role: "user", content: buildPrompt(p.title, p.excerpt || "", p.category || "") }],
            modalities: ["image", "text"],
          }),
        });
        if (!aiResponse.ok) {
          const t = await aiResponse.text();
          results.push({ slug: p.slug, status: "error", error: `AI ${aiResponse.status}: ${t.slice(0, 200)}` });
          continue;
        }
        const aiData = await aiResponse.json();
        const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (!imageData?.startsWith("data:image")) {
          results.push({ slug: p.slug, status: "error", error: "no image" });
          continue;
        }
        const base64 = imageData.split(",")[1];
        const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const fileName = `${slugify(p.slug || p.title)}-${Date.now()}.png`;
        const { error: upErr } = await admin.storage.from("blog-images").upload(fileName, binary, { contentType: "image/png", upsert: true });
        if (upErr) {
          results.push({ slug: p.slug, status: "error", error: upErr.message });
          continue;
        }
        const { data: urlData } = admin.storage.from("blog-images").getPublicUrl(fileName);
        await admin.from("blog_posts").update({ image_url: urlData.publicUrl }).eq("id", p.id);
        results.push({ slug: p.slug, status: "ok", url: urlData.publicUrl });
      } catch (e: any) {
        results.push({ slug: p.slug, status: "error", error: e.message });
      }
    }

    const { count } = await admin
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .or("image_url.is.null,image_url.eq.");

    return json({ processed: results.length, remaining: count ?? 0, results });
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
});
