import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY")!;

    // Auth: must be admin or editor
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No autorizado" }, 401);
    const token = authHeader.replace("Bearer ", "");
    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: "No autorizado" }, 401);

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id);
    const allowed = (roles || []).some((r: any) => r.role === "admin" || r.role === "editor");
    if (!allowed) return json({ error: "Solo editores" }, 403);

    const body = await req.json();
    const {
      idea_contenido, keyword_principal,
      tipo_post = "informativo",
      categoria = "Guías",
      autor = "Ecología Rentable",
    } = body;

    if (!idea_contenido || !keyword_principal) {
      return json({ error: "idea_contenido y keyword_principal son obligatorios" }, 400);
    }

    const { data: existing } = await admin
      .from("blog_posts")
      .select("title, slug, category")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(15);

    const linkList = (existing || [])
      .map((p: any) => `- "${p.title}" → /blog/${p.slug}`)
      .join("\n");

    const wordRanges: Record<string, string> = {
      comercial: "900-1400 palabras",
      informativo: "1400-2000 palabras",
      comparativo: "1400-2000 palabras",
      "guía": "1800-2500 palabras",
    };

    const systemPrompt = `Eres un redactor SEO senior especializado en automoción ecológica para "Ecología Rentable", marca española de descarbonización con hidrógeno (HHO), limpieza de filtros DPF/FAP, válvulas EGR, mantenimiento eficiente, ITV y reducción de emisiones para particulares y flotas.

REGLAS DE MARCA (OBLIGATORIAS):
- Marca: SIEMPRE "Ecología Rentable". NUNCA usar "Flex Fuel" ni otras marcas.
- Idioma: ESPAÑOL (España) exclusivamente.
- Precios: NUNCA mencionar cifras en €. Si hay que referirse al coste, decir "Consultar precio" o redirigir a /contacto.
- Tono: técnico, profesional, conciso. Evita relleno y palabras grandilocuentes.

ESTRUCTURA SEO ABSOLUTA:
1. meta_title: máx 58 chars, contiene keyword principal, Title Case.
2. meta_description: máx 155 chars, incluye keyword + invitación a la acción.
3. H1 (title): único, contiene la keyword, distinto del meta_title.
4. Solo H2 para subsecciones — NUNCA H3/H4. Mínimo 5 H2.
5. Primer párrafo: contiene la keyword principal de forma natural.
6. Densidad keyword: 2-5 menciones en todo el texto.

ELEMENTOS OBLIGATORIOS DE CONTENIDO:
- Mínimo 2 tablas Markdown (comparativa, antes/después, síntomas/causas, ventajas/inconvenientes con ✅/❌, o resumen).
- Listas numeradas o con bullets cuando proceda.
- Datos técnicos concretos (km, %, normativa Euro 6, ITV, etc.).
- Mencionar "Ecología Rentable" como referente 1-2 veces.

ENLAZADO INTERNO OBLIGATORIO (mínimo 4 enlaces):
- [Servicios](/servicios)
- [Soluciones técnicas](/soluciones)
- [Tienda profesional](/tienda)
- [Hazte socio](/socios)
- [Encuentra tu centro](/encuentra-tu-centro)
- [Contacto](/contacto)
${linkList ? `Enlaces a posts existentes (úsalos cuando encajen):\n${linkList}` : ""}

CTA FINAL: cierra con un párrafo invitando a contactar (/contacto) o solicitar cita.

EXTENSIÓN: ${wordRanges[tipo_post] || "1400-2000 palabras"}

SLUG: kebab-case, sin acentos, basado en la keyword principal.

FORMATO DE RESPUESTA (SOLO JSON, sin code blocks):
{
  "title": "...",
  "slug": "...",
  "meta_title": "...",
  "meta_description": "...",
  "excerpt": "1-2 frases para el listado",
  "content": "Markdown completo con ## H2, tablas, enlaces, CTA",
  "category": "${categoria}"
}`;

    const userPrompt = `Genera un post SEO para "Ecología Rentable":

- IDEA: ${idea_contenido}
- KEYWORD PRINCIPAL: ${keyword_principal}
- TIPO: ${tipo_post}
- CATEGORÍA: ${categoria}
- AUTOR: ${autor}

Responde SOLO con el JSON válido, sin markdown wrappers.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return json({ error: "Límite de uso alcanzado, intenta en unos segundos." }, 429);
      if (aiResponse.status === 402) return json({ error: "Sin créditos de IA. Recarga en Settings." }, 402);
      const t = await aiResponse.text();
      console.error("AI error", aiResponse.status, t);
      return json({ error: "Error generando contenido" }, 500);
    }

    const aiData = await aiResponse.json();
    const raw = aiData.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return json({ error: "Respuesta IA inválida", raw }, 500);
    }

    return json({ ...parsed, autor });
  } catch (e: any) {
    console.error("generate-seo-content error:", e);
    return json({ error: e.message || "Error" }, 500);
  }

  function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
