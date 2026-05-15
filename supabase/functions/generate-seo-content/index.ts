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
      comercial: "1600-2200 palabras",
      informativo: "2000-2800 palabras",
      comparativo: "2000-2800 palabras",
      "guía": "2500-3500 palabras",
    };

    const systemPrompt = `Eres un redactor SEO senior de Ecología Rentable. Desarrollas el artículo EXACTAMENTE a partir de la idea recibida. La keyword principal, el geotarget (ciudad/zona) y el objetivo de conversión NO se cambian.

REGLAS DE MARCA INVIOLABLES:
- Marca: SIEMPRE "Ecología Rentable". PROHIBIDO "Flex Fuel" o competidores.
- Idioma: español de España, tuteo profesional.
- Precios: NUNCA cifras en €. Usa "Consultar precio" o "Solicita presupuesto".
- No inventes precios, garantías, certificaciones, homologaciones, años de experiencia, cifras de rentabilidad ni especificaciones técnicas no confirmadas.
- No prometas resultados garantizados. Usa expresiones prudentes: "puede ayudar", "contribuye a", "permite reducir el riesgo de", "ayuda a mejorar".

NOMENCLATURA OBLIGATORIA:
- Productos válidos: H2 Profit 1000, H2 Profit 2000, H2 Profit 3000, Hy-Carbon Connect, Carbon FAP, Opacímetro Ecología Rentable, Analizador de gases Ecología Rentable, Kit Opacidad, Descarbonizadora reacondicionada.
- PROHIBIDO: Hy-Calamine 1000S/2000S/3000S, "gama Hy-Calamine" o cualquier variante.

ENFOQUE SEGÚN AUDIENCIA:
- Particulares → usuario final.
- Talleres / equipos / renting / distribuidores → B2B.
- Flotas / empresas / renting de coches → responsables de mantenimiento, operaciones o flotas.
- Tipo + intención de búsqueda mandan: comercial sigue siendo comercial; informacional sigue siendo informacional.

ESTRUCTURA Y FORMATO ESTRICTOS:
- meta_title máx 58 caracteres con la keyword principal.
- meta_description máx 155 caracteres con la keyword principal.
- slug en minúsculas, sin acentos, con guiones.
- Un solo H1 (# H1) con la keyword principal.
- Primer párrafo (50-80 palabras) con la keyword principal exacta.
- Solo H2 (## H2). PROHIBIDO H3, H4, H5, H6.
- Los H2 son títulos LIMPIOS y BREVES. Nunca metas párrafos, listas, bullets, FAQs ni explicaciones DENTRO del propio H2.
- Tras cada H2, desarrolla en párrafos normales y, si aplica, listas o tabla.
- OBLIGATORIO incluir: una tabla útil en Markdown, una sección de recomendaciones prácticas, una sección "## Cómo puede ayudarte Ecología Rentable" (1-2 párrafos + CTA contextual), una sección "## Preguntas frecuentes" al final.
- En las FAQ NO uses H3: cada pregunta va en **negrita** y la respuesta en párrafo normal debajo.
- CTA contextual a media altura + CTA final, ambos coherentes con el objetivo de conversión.
- No escribas "H1:" ni "H2:" como texto. No emitas etiquetas HTML.
- Si la keyword o la idea contienen ciudad/zona, menciónalos 2-3 veces de forma natural.

EXTENSIÓN: ${wordRanges[tipo_post] || "2000-2800 palabras"}, sin bajar del mínimo.

ENLAZADO INTERNO (mínimo 6 enlaces internos repartidos en el cuerpo, naturales):
- Descarbonización → /servicios/descarbonizacion-motor o /servicios/descarbonizacion-con-hidrogeno
- DPF/FAP/filtro de partículas → /servicios/limpieza-filtro-de-particulas y /tienda/maquinas-limpieza-filtro-particulas/carbon-fap
- Gases ITV / humo negro / EGR / catalizador / pérdida de potencia → la solución correspondiente en /soluciones/* + /contacto o /encuentra-tu-centro
- Máquinas / equipos / compra / alquiler / renting → /tienda y /servicios/alquiler-renting-equipos + /contacto
- Talleres / socios / distribuidores → /socios/hazte-socio
- Flotas / empresas / renting de coches → /servicios/descarbonizacion-para-empresas, /servicios/descarbonizacion-para-flotas-de-camiones, /servicios/descarbonizacion-para-coches-de-renting
${linkList ? `\nPosts existentes (enlaza cuando encajen):\n${linkList}` : ""}

FORMATO DE RESPUESTA — SOLO JSON VÁLIDO, sin code blocks:
{
  "title": "H1 con keyword principal",
  "slug": "slug-amigable",
  "meta_title": "máx 58 chars",
  "meta_description": "máx 155 chars",
  "excerpt": "1-2 frases para el listado",
  "image_alt": "ALT descriptivo de la imagen destacada",
  "meta_keywords": "keyword principal, secundarias separadas por coma",
  "content": "Markdown completo: # H1, primer párrafo, ## H2 limpios, párrafos, tabla, recomendaciones, sección Ecología Rentable con CTA, ## Preguntas frecuentes con preguntas en **negrita** sin H3, CTA final.",
  "category": "${categoria}"
}`;

    const userPrompt = `Genera un post SEO para "Ecología Rentable" desarrollando exactamente esta idea, sin reinterpretarla:

- IDEA: ${idea_contenido}
- KEYWORD PRINCIPAL: ${keyword_principal}
- TIPO DE POST: ${tipo_post}
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
