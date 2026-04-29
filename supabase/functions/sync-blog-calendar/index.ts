import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of lines[i]) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else current += char;
    }
    values.push(current.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || "").replace(/^"|"$/g, "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const csvUrl = body.csv_url;
    const batchSize = body.batch_size || 3;
    const dryRun = body.dry_run || false;

    if (!csvUrl) {
      return new Response(JSON.stringify({ error: "csv_url es obligatorio. Publica tu Google Sheet como CSV y proporciona la URL." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const csvResponse = await fetch(csvUrl);
    if (!csvResponse.ok) throw new Error(`No se pudo obtener el CSV: ${csvResponse.status}`);
    const csvText = await csvResponse.text();
    const rows = parseCSV(csvText);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const pending: any[] = [];
    for (const row of rows) {
      const fecha = row["Fecha de publicación"] || row["Fecha"] || row["fecha"] || "";
      const idea = row["Idea del contenido *"] || row["Idea del Contenido"] || row["Idea"] || row["idea"] || "";
      const kwPrincipal = row["Keyword principal *"] || row["Keyword Principal"] || row["keyword_principal"] || "";
      const kwSec1 = row["Keyword sec. 1"] || row["Keyword Sec 1"] || row["keyword_sec_1"] || "";
      const kwSec2 = row["Keyword sec. 2"] || row["Keyword Sec 2"] || row["keyword_sec_2"] || "";
      const kwSec3 = row["Keyword sec. 3"] || row["Keyword Sec 3"] || row["keyword_sec_3"] || "";
      const tipo = row["Tipo de post"] || row["Tipo de Post"] || row["tipo"] || "informativo";
      const intencion = row["Intención de búsqueda"] || row["Intención de Búsqueda"] || row["intencion"] || "informacional";
      const objetivo = row["Objetivo conversión"] || row["Objetivo de Conversión"] || row["objetivo"] || "contacto";
      const categoria = row["Categoría"] || row["categoria"] || "Ecología Rentable";
      const autor = row["Autor"] || row["autor"] || "Ecología Rentable";
      const ciudad = row["Ciudad"] || row["ciudad"] || "";

      if (!idea || !kwPrincipal) continue;
      const postDate = parseDate(fecha);
      if (!postDate || postDate > today) continue;

      pending.push({
        keywordSlug: slugify(kwPrincipal),
        fecha: postDate.toISOString().split("T")[0],
        idea, kwPrincipal, kwSec1, kwSec2, kwSec3,
        tipo, intencion, objetivo, categoria, autor, ciudad,
      });
    }

    const slugs = pending.map((p) => p.keywordSlug);
    const { data: existing } = await supabase
      .from("blog_calendar_sync")
      .select("keyword_slug, status")
      .in("keyword_slug", slugs);

    const existingMap = new Map((existing || []).map((e: any) => [e.keyword_slug, e.status]));
    const toProcess = pending.filter((p) => {
      const status = existingMap.get(p.keywordSlug);
      return !status || status === "error";
    });

    if (dryRun) {
      return new Response(JSON.stringify({
        total_in_sheet: rows.length,
        due_today_or_past: pending.length,
        already_processed: pending.length - toProcess.length,
        to_process: toProcess.length,
        pending_items: toProcess.slice(0, 10).map((p) => ({
          slug: p.keywordSlug, fecha: p.fecha,
          idea: p.idea.slice(0, 60), categoria: p.categoria,
        })),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const batch = toProcess.slice(0, batchSize);
    const results: any[] = [];

    for (const item of batch) {
      try {
        await supabase.from("blog_calendar_sync").upsert({
          keyword_slug: item.keywordSlug,
          sheet_fecha: item.fecha,
          sheet_idea: item.idea,
          sheet_category: item.categoria,
          sheet_city: item.ciudad,
          status: "generating",
        }, { onConflict: "keyword_slug" });

        const { data: existingPosts } = await supabase
          .from("blog_posts")
          .select("title, slug, category")
          .eq("published", true)
          .order("published_at", { ascending: false })
          .limit(20);

        const relatedPosts = (existingPosts || [])
          .filter((p: any) => p.category === item.categoria || Math.random() > 0.5)
          .slice(0, 8);

        const postsForLinking = relatedPosts
          .map((p: any) => `- "${p.title}" → /blog/${p.slug}`)
          .join("\n");

        const wordRanges: Record<string, string> = {
          comercial: "900–1400 palabras",
          informativo: "1400–2000 palabras",
          comparativo: "1400–2000 palabras",
          "guía": "1800–2500 palabras",
        };

        const secondaryKws = [item.kwSec1, item.kwSec2, item.kwSec3].filter(Boolean);

        const systemPrompt = `Eres un redactor SEO experto senior de Ecología Rentable, especialistas en descarbonización de motores, mantenimiento eficiente, HHO, DPF/FAP y EGR. Generas contenido que posiciona en Google siguiendo estrictamente las directrices EEAT.

REGLAS ABSOLUTAS DE ESTRUCTURA:
1. TITLE TAG (meta_title): Máximo 58 caracteres. Debe contener la keyword principal.
2. META DESCRIPTION (meta_description): Máximo 155 caracteres. Incluir keyword principal + CTA implícito.
3. H1: Único. Contiene la keyword principal.
4. Solo H2 para subsecciones. NUNCA H3, H4, etc.
5. Primer párrafo con la keyword principal de forma natural.
6. Keyword principal: 2-4 veces en el contenido.
7. Keywords secundarias distribuidas naturalmente.

REGLAS DE CONTENIDO:
8. Incluir MÍNIMO 2 tablas Markdown.
9. ENLAZADO INTERNO OBLIGATORIO:
   - 2-6 enlaces a posts relacionados del blog
   - Enlace a Home: [Ecología Rentable](/)
   - Enlace a Contacto: [contacta con nosotros](/contacto)
   - Enlace a Servicios: [nuestros servicios](/servicios)
   ${postsForLinking ? `Posts disponibles para enlazar:\n${postsForLinking}` : ""}
10. CTA FINAL: Llamada a la acción clara invitando a "Consultar precio" o solicitar diagnóstico.
11. PRECIOS: NUNCA menciones valores monetarios concretos. Usar siempre "Consultar precio" o "Solicita presupuesto".
12. MARCA: Usar SOLO "Ecología Rentable". PROHIBIDO mencionar "Flex Fuel" u otras marcas.
13. EEAT: Datos concretos, ejemplos reales, lenguaje experto pero accesible.
14. EXTENSIÓN: ${wordRanges[item.tipo] || "1400-2000 palabras"}
15. IDIOMA: Español de España. SIEMPRE.
16. SLUG: SEO-friendly basado en la keyword principal.

FORMATO DE RESPUESTA - Solo JSON válido:
{
  "title": "H1 del artículo",
  "slug": "slug-seo-friendly",
  "meta_title": "Title tag (max 58 chars)",
  "meta_description": "Meta description (max 155 chars)",
  "excerpt": "Extracto de 1-2 frases",
  "content": "Contenido completo en Markdown",
  "category": "${item.categoria}"
}`;

        const userPrompt = `Genera un post de blog SEO completo:
- IDEA: ${item.idea}
- KEYWORD PRINCIPAL: ${item.kwPrincipal}
${secondaryKws.length > 0 ? `- KEYWORDS SECUNDARIAS: ${secondaryKws.join(", ")}` : ""}
- TIPO: ${item.tipo}
- INTENCIÓN: ${item.intencion}
- OBJETIVO: ${item.objetivo}
- CATEGORÍA: ${item.categoria}
- AUTOR: ${item.autor}
${item.ciudad ? `- CIUDAD: ${item.ciudad}` : ""}

Solo JSON válido en la respuesta.`;

        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          }),
        });

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          throw new Error(`AI content error ${aiResponse.status}: ${errText.slice(0, 200)}`);
        }

        const aiData = await aiResponse.json();
        const rawContent = aiData.choices?.[0]?.message?.content || "";
        let cleaned = rawContent.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
        const jsonStart = cleaned.indexOf('{');
        const jsonEnd = cleaned.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON object found in AI response");
        cleaned = cleaned.slice(jsonStart, jsonEnd + 1);

        let generated;
        try {
          generated = JSON.parse(cleaned);
        } catch {
          cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
          generated = JSON.parse(cleaned);
        }

        let imageUrl: string | null = null;
        try {
          const imgPrompt = `Modern eco-friendly automotive blog illustration for "${generated.title}". Category: ${item.categoria}. Style: clean flat vector with green/teal palette, mechanic cleaning a car engine, leaves and eco symbols, decarbonization theme. NO text, NO words. Bright optimistic. 16:9.`;
          const imgResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3.1-flash-image-preview",
              messages: [{ role: "user", content: imgPrompt }],
              modalities: ["image", "text"],
            }),
          });
          if (imgResponse.ok) {
            const imgData = await imgResponse.json();
            const imgBase64 = imgData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
            if (imgBase64?.startsWith("data:image")) {
              const base64Data = imgBase64.split(",")[1];
              const binaryData = Uint8Array.from(atob(base64Data), (c: string) => c.charCodeAt(0));
              const fileName = `${generated.slug || item.keywordSlug}.png`;
              const { error: uploadError } = await supabase.storage
                .from("blog-images")
                .upload(fileName, binaryData, { contentType: "image/png", upsert: true });
              if (!uploadError) {
                const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
                imageUrl = urlData.publicUrl;
              }
            }
          }
        } catch (imgErr) {
          console.error("Image generation failed (non-blocking):", imgErr);
        }

        const slug = generated.slug || item.keywordSlug;
        const { data: insertedPost, error: insertError } = await supabase
          .from("blog_posts")
          .insert({
            title: generated.title,
            slug,
            excerpt: generated.excerpt,
            content: generated.content,
            author: item.autor,
            category: generated.category || item.categoria,
            city: item.ciudad || null,
            image_url: imageUrl,
            meta_title: generated.meta_title || null,
            meta_description: generated.meta_description || null,
            published: true,
            published_at: item.fecha,
          })
          .select("id")
          .single();

        if (insertError) throw new Error(`Insert failed: ${insertError.message}`);

        await supabase.from("blog_calendar_sync").update({
          status: "published",
          blog_post_id: insertedPost.id,
        }).eq("keyword_slug", item.keywordSlug);

        results.push({ slug, title: generated.title, status: "published", image: !!imageUrl });
        await new Promise((r) => setTimeout(r, 3000));
      } catch (err) {
        console.error(`Error processing ${item.kwPrincipal}:`, err);
        await supabase.from("blog_calendar_sync").upsert({
          keyword_slug: item.keywordSlug,
          sheet_fecha: item.fecha,
          sheet_idea: item.idea,
          sheet_category: item.categoria,
          status: "error",
          error_message: err instanceof Error ? err.message : String(err),
        }, { onConflict: "keyword_slug" });
        results.push({ slug: item.keywordSlug, status: "error", error: String(err) });
      }
    }

    return new Response(JSON.stringify({
      total_in_sheet: rows.length,
      due_today_or_past: pending.length,
      batch_processed: batch.length,
      remaining: toProcess.length - batch.length,
      results,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("sync-blog-calendar fatal error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
