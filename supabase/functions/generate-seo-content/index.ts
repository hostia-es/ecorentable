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

    const systemPrompt = `Eres un redactor SEO senior y técnico de automoción para "Ecología Rentable", marca española especializada en:
- Descarbonización de motor con HIDRÓGENO (HHO) inyectado en la admisión en ralentí (modelos H2 Profit 1000/2000/3000 y Hy-Carbon Connect con tablet y dongle OBD).
- Limpieza profesional de filtro de partículas DPF/FAP sin desmontar y sin disolventes con la estación Carbon FAP (agua + aire comprimido a 6 bares).
- Limpieza de válvulas EGR y catalizadores.
- Mantenimiento eficiente, control de emisiones y servicios pre-ITV con opacímetro y analizador de gases (5 gases, NOx opcional).
- Servicios para particulares, talleres, empresas, flotas de camiones y coches de renting.
- Venta y alquiler/renting de equipos profesionales para taller.

REGLAS DE MARCA (OBLIGATORIAS):
- Marca: SIEMPRE "Ecología Rentable". NUNCA "Flex Fuel" ni otras marcas.
- Idioma: ESPAÑOL (España) exclusivamente. Tuteo profesional.
- Precios: NUNCA cifras en €. Usa "Consultar precio" o redirige a /contacto.
- Tono: técnico, profesional, didáctico, conciso. Cero relleno, cero superlativos vacíos.

ESTRUCTURA SEO ABSOLUTA:
1. meta_title: máx 58 chars, contiene keyword principal, Title Case.
2. meta_description: máx 155 chars, keyword + invitación a la acción clara.
3. H1 (title): único, contiene la keyword, distinto del meta_title.
4. SOLO H2 — jamás H3/H4. MÍNIMO 7 H2 bien diferenciados.
5. Lead (primer párrafo): 50-80 palabras, contiene la keyword principal de forma natural y resume el valor del artículo.
6. Densidad keyword: 3-6 menciones repartidas en todo el texto.
7. Cierra siempre con un H2 "Preguntas frecuentes" con 4-6 preguntas y respuestas técnicas reales.

ELEMENTOS OBLIGATORIOS DE CONTENIDO (no negociables):
- Mínimo 3 TABLAS Markdown reales (comparativa de soluciones, antes/después, síntomas vs causas, ventajas/inconvenientes con ✅/❌, especificaciones técnicas, escenarios de uso por tipo de vehículo).
- Listas numeradas paso a paso para procesos (cómo se hace una descarbonización con HHO, cómo se limpia un DPF, cómo se hace una pre-ITV).
- Datos técnicos concretos y verificables: km de mantenimiento, % de reducción de opacidad, normativa Euro 5/Euro 6, valor de opacidad ITV (k máx), 30/60/90/120 min de ciclo de descarbonización, 6 bares de aire para Carbon FAP, etc.
- Bloque "¿Qué hace Ecología Rentable en este caso?" con 1-2 párrafos explicando el servicio o equipo concreto, con CTA al servicio correspondiente.
- Sección de errores comunes / mitos / "lo que NO debes hacer".

ENLAZADO INTERNO OBLIGATORIO (mínimo 6 enlaces internos repartidos en el cuerpo, no en una lista al final):
Hubs:
- [Servicios](/servicios) · [Soluciones](/soluciones) · [Tienda](/tienda) · [Hazte socio](/socios/hazte-socio) · [Encuentra tu centro](/encuentra-tu-centro) · [Contacto](/contacto)
Servicios concretos:
- /servicios/descarbonizacion-motor · /servicios/descarbonizacion-con-hidrogeno · /servicios/descarbonizacion-para-particulares · /servicios/descarbonizacion-para-talleres · /servicios/descarbonizacion-para-empresas · /servicios/descarbonizacion-para-flotas-de-camiones · /servicios/descarbonizacion-para-coches-de-renting · /servicios/limpieza-filtro-de-particulas · /servicios/mantenimiento-maquinas-flexfuel
Alquiler / renting:
- /servicios/alquiler-renting-equipos · /servicios/alquiler-renting-h2-profit-1000 · /servicios/alquiler-renting-h2-profit-2000 · /servicios/alquiler-renting-h2-profit-3000 · /servicios/alquiler-renting-hy-carbon-connect · /servicios/alquiler-renting-carbon-fap · /servicios/alquiler-renting-opacimetro-ecologia-rentable · /servicios/alquiler-renting-analizador-gases-ecologia-rentable
Soluciones (síntomas/problemas):
- /soluciones/gases-altos-itv-diesel · /soluciones/gases-altos-itv-gasolina · /soluciones/humo-negro-diesel · /soluciones/fallo-anticontaminacion · /soluciones/filtro-particulas-obstruido · /soluciones/limpiar-dpf-sin-desmontar · /soluciones/fallo-egr · /soluciones/catalizador-obstruido · /soluciones/perdida-potencia-coche-diesel · /soluciones/descarbonizacion-motor-diesel · /soluciones/descarbonizacion-motor-gasolina
Tienda:
- /tienda/descarbonizadoras · /tienda/descarbonizadoras/h2-profit-1000 · /tienda/descarbonizadoras/h2-profit-2000 · /tienda/descarbonizadoras/h2-profit-3000 · /tienda/descarbonizadoras/hy-carbon-connect · /tienda/descarbonizadoras-reacondicionadas · /tienda/maquinas-limpieza-filtro-particulas/carbon-fap · /tienda/opacimetros · /tienda/analizadores-de-gases · /tienda/kit-opacidad
${linkList ? `Posts existentes (enlaza cuando encajen):\n${linkList}` : ""}

CTA FINAL OBLIGATORIO: H2 tipo "¿Listo para dar el paso?" con 1-2 párrafos invitando a contactar (/contacto), encontrar centro (/encuentra-tu-centro) o solicitar el servicio concreto.

EXTENSIÓN: ${wordRanges[tipo_post] || "2000-2800 palabras"} — NUNCA por debajo del mínimo. Si quedas corto, amplía con casos prácticos, escenarios por tipo de vehículo o tabla de mantenimiento por kilometraje.

SLUG: kebab-case, sin acentos, basado en la keyword principal.

FORMATO DE RESPUESTA (SOLO JSON válido, sin code blocks):
{
  "title": "...",
  "slug": "...",
  "meta_title": "...",
  "meta_description": "...",
  "excerpt": "1-2 frases para el listado",
  "content": "Markdown completo con ## H2, tablas, listas, enlaces internos y CTA final",
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
