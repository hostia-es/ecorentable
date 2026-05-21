import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEETS_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

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

function extractSheetId(url: string): string | null {
  const m = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return m ? m[1] : null;
}

/** Fetches sheet rows. If sheetName provided, uses it; otherwise first sheet. */
async function fetchSheetRows(spreadsheetId: string, lovableKey: string, sheetsKey: string, sheetName?: string): Promise<Record<string, string>[]> {
  let firstSheet = sheetName;
  if (!firstSheet) {
    const metaRes = await fetch(`${SHEETS_GATEWAY}/spreadsheets/${spreadsheetId}?fields=sheets.properties`, {
      headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": sheetsKey },
    });
    if (!metaRes.ok) throw new Error(`Sheets metadata failed [${metaRes.status}]: ${await metaRes.text()}`);
    const meta = await metaRes.json();
    // Prefer "Calendario_90_dias" if it exists, otherwise first sheet
    const sheets = meta.sheets || [];
    const cal = sheets.find((s: any) => /calendario/i.test(s.properties?.title || ""));
    firstSheet = cal?.properties?.title || sheets[0]?.properties?.title || "Sheet1";
  }

  const range = `${firstSheet}!A1:AZ10000`;
  const valuesRes = await fetch(`${SHEETS_GATEWAY}/spreadsheets/${spreadsheetId}/values/${range}`, {
    headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": sheetsKey },
  });
  if (!valuesRes.ok) throw new Error(`Sheets values failed [${valuesRes.status}]: ${await valuesRes.text()}`);
  const data = await valuesRes.json();
  const values: string[][] = data.values || [];
  if (values.length < 2) return [];
  const headers = values[0].map((h) => (h || "").trim());
  return values.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (row[i] || "").trim(); });
    return obj;
  });
}

function pick(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) if (row[k]) return row[k];
  return "";
}

/** Validate generated content against the row's checklist + global brand rules. */
function validateContent(generated: any, item: any): string[] {
  const errors: string[] = [];
  const content = (generated.content || "").toLowerCase();
  const title = (generated.title || "").toLowerCase();
  const kw = (item.kwPrincipal || "").toLowerCase();

  if (kw && !title.includes(kw) && !content.slice(0, 500).includes(kw)) {
    errors.push(`Keyword principal "${item.kwPrincipal}" no aparece en H1 ni primer párrafo`);
  }
  if (/flex\s*fuel/i.test(content) || /flex\s*fuel/i.test(title)) {
    errors.push('Mención prohibida a "Flex Fuel"');
  }
  if (/hy[-\s]?calamine/i.test(content) || /hy[-\s]?calamine/i.test(title)) {
    errors.push('Nomenclatura prohibida "Hy-Calamine" (usa H2 Profit 1000/2000/3000)');
  }
  if (/\b\d+[.,]?\d*\s*€/.test(generated.content || "") || /\beur\b/i.test(content)) {
    errors.push("Precio monetario explícito (debe ser 'Consultar precio')");
  }
  if (generated.meta_title && generated.meta_title.length > 60) {
    errors.push(`meta_title demasiado largo (${generated.meta_title.length} chars)`);
  }
  if (generated.meta_description && generated.meta_description.length > 160) {
    errors.push(`meta_description demasiado largo (${generated.meta_description.length} chars)`);
  }
  // H2 must be a clean title only — no inline punctuation that signals a paragraph/list inside
  const h2Lines = (generated.content || "").split("\n").filter((l: string) => /^##\s+/.test(l));
  for (const h of h2Lines) {
    if (h.length > 120) errors.push(`H2 demasiado largo (parece párrafo): "${h.slice(0, 60)}..."`);
  }
  // Geotarget: if city in keyword/idea, must appear in body
  const geo = (item.ciudad || "").toLowerCase();
  if (geo && !content.includes(geo)) {
    errors.push(`Geotarget "${item.ciudad}" no aparece en el contenido`);
  }
  return errors;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const sheetUrl: string | undefined = body.sheet_url;
    const csvUrl: string | undefined = body.csv_url;
    const sheetName: string | undefined = body.sheet_name;
    const batchSize = body.batch_size || 3;
    const dryRun = body.dry_run || false;

    if (!sheetUrl && !csvUrl) {
      return new Response(JSON.stringify({ error: "Proporciona sheet_url (Google Sheets) o csv_url (CSV publicado)." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let rows: Record<string, string>[] = [];
    if (sheetUrl) {
      const sheetId = extractSheetId(sheetUrl);
      if (!sheetId) throw new Error("URL de Google Sheets no válida");
      if (!SHEETS_API_KEY) throw new Error("Conector Google Sheets no configurado");
      rows = await fetchSheetRows(sheetId, LOVABLE_API_KEY, SHEETS_API_KEY, sheetName);
    } else if (csvUrl) {
      const csvResponse = await fetch(csvUrl);
      if (!csvResponse.ok) throw new Error(`No se pudo obtener el CSV: ${csvResponse.status}`);
      rows = parseCSV(await csvResponse.text());
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const pending: any[] = [];
    for (const row of rows) {
      const fecha = pick(row, "Fecha de publicación", "Fecha", "fecha");
      const idea = pick(row, "Idea del contenido *", "Idea del contenido", "Idea", "idea");
      const kwPrincipal = pick(row, "Keyword principal *", "Keyword principal", "Keyword Principal", "keyword_principal");

      if (!idea || !kwPrincipal) continue;
      const postDate = parseDate(fecha);
      if (!postDate) continue;

      pending.push({
        keywordSlug: slugify(kwPrincipal),
        fecha: postDate.toISOString().split("T")[0],
        isFuture: postDate > today,
        idea,
        kwPrincipal,
        kwSec1: pick(row, "Keyword sec. 1", "Keyword Sec 1"),
        kwSec2: pick(row, "Keyword sec. 2", "Keyword Sec 2"),
        kwSec3: pick(row, "Keyword sec. 3", "Keyword Sec 3"),
        tipo: pick(row, "Tipo de post", "Tipo de Post", "tipo") || "informativo",
        intencion: pick(row, "Intención de búsqueda", "Intención de Búsqueda") || "informacional",
        objetivo: pick(row, "Objetivo conversión", "Objetivo de Conversión") || "contacto",
        categoria: pick(row, "Categoría", "categoria") || "Ecología Rentable",
        autor: pick(row, "Autor", "autor") || "Ecología Rentable",
        ciudad: pick(row, "Ciudad", "ciudad"),
        // Sheet-provided structural fields (specialist's spec — use AS-IS)
        extension: pick(row, "Extensión objetivo"),
        formato: pick(row, "Formato Lovable recomendado"),
        h1Sugerido: pick(row, "H1 sugerido"),
        h2Recomendados: pick(row, "H2 recomendados"),
        tablaObligatoria: pick(row, "Tabla obligatoria sugerida"),
        faqSugeridas: pick(row, "FAQ sugeridas"),
        ctaRecomendado: pick(row, "CTA recomendado"),
        enlacesInternos: pick(row, "Enlaces internos sugeridos"),
        fuenteExterna: pick(row, "Fuente externa sugerida"),
        imagenAlt: pick(row, "Imagen + ALT sugeridos"),
        promptFila: pick(row, "Prompt Lovable por fila"),
        checklist: pick(row, "Checklist anti-error"),
        metaTitleSug: pick(row, "Meta title sugerido"),
        metaDescSug: pick(row, "Meta description sugerida"),
        slugSug: pick(row, "Slug sugerido"),
        primerParrafo: pick(row, "Primer párrafo obligatorio"),
        h2KwPrincipal: pick(row, "H2 keyword principal"),
        h2KwSecundarias: pick(row, "H2 keywords secundarias"),
        estructuraSeo: pick(row, "Estructura SEO mejorada"),
        promptReforzado: pick(row, "Prompt Lovable reforzado"),
        validacionKw: pick(row, "Validación keyword"),
      });
    }

    const slugs = pending.map((p) => p.keywordSlug);
    // chunk to avoid URL length limits
    const existingMap = new Map<string, string>();
    for (let i = 0; i < slugs.length; i += 200) {
      const chunk = slugs.slice(i, i + 200);
      const { data: existing } = await supabase
        .from("blog_calendar_sync")
        .select("keyword_slug, status")
        .in("keyword_slug", chunk);
      (existing || []).forEach((e: any) => existingMap.set(e.keyword_slug, e.status));
    }

    const toProcess = pending.filter((p) => {
      const status = existingMap.get(p.keywordSlug);
      return !status || status === "error";
    });

    const futureCount = toProcess.filter((p) => p.isFuture).length;
    const dueCount = toProcess.filter((p) => !p.isFuture).length;

    if (dryRun) {
      return new Response(JSON.stringify({
        total_in_sheet: rows.length,
        valid_rows: pending.length,
        already_processed: pending.length - toProcess.length,
        to_process: toProcess.length,
        scheduled_future: futureCount,
        publish_now: dueCount,
        pending_items: toProcess.slice(0, 10).map((p) => ({
          slug: p.keywordSlug, fecha: p.fecha, future: p.isFuture,
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
          .limit(40);

        const relatedPosts = (existingPosts || [])
          .filter((p: any) => p.category === item.categoria)
          .slice(0, 8)
          .concat((existingPosts || []).filter((p: any) => p.category !== item.categoria).slice(0, 4));

        const postsForLinking = relatedPosts
          .map((p: any) => `- "${p.title}" → /blog/${p.slug}`)
          .join("\n");

        const secondaryKws = [item.kwSec1, item.kwSec2, item.kwSec3].filter(Boolean);

        // Build the spec block — specialist's instructions go FIRST and OVERRIDE any defaults
        const specialistSpec = `
=== ESPECIFICACIÓN OBLIGATORIA POR FILA (de la especialista SEO) ===
${item.promptReforzado ? `INSTRUCCIÓN MAESTRA (REFORZADA — sigue al pie de la letra):\n${item.promptReforzado}\n` : ""}
${item.promptFila ? `INSTRUCCIÓN POR FILA:\n${item.promptFila}\n` : ""}
${item.estructuraSeo ? `ESTRUCTURA SEO REQUERIDA:\n${item.estructuraSeo}\n` : ""}
${item.checklist ? `CHECKLIST ANTI-ERROR (debe cumplirse al 100%):\n${item.checklist}\n` : ""}
${item.validacionKw ? `VALIDACIÓN DE KEYWORD:\n${item.validacionKw}\n` : ""}

=== ELEMENTOS FIJOS (úsalos exactamente como vienen) ===
- IDEA: ${item.idea}
- KEYWORD PRINCIPAL: ${item.kwPrincipal}
${secondaryKws.length ? `- KEYWORDS SECUNDARIAS: ${secondaryKws.join(", ")}` : ""}
- TIPO: ${item.tipo}
- INTENCIÓN: ${item.intencion}
- OBJETIVO DE CONVERSIÓN: ${item.objetivo}
- CATEGORÍA (no cambiar): ${item.categoria}
- AUTOR: ${item.autor}
${item.ciudad ? `- CIUDAD: ${item.ciudad}` : ""}
${item.extension ? `- EXTENSIÓN OBJETIVO: ${item.extension}` : ""}
${item.formato ? `- FORMATO: ${item.formato}` : ""}
${item.h1Sugerido ? `- H1 OBLIGATORIO (úsalo TAL CUAL): ${item.h1Sugerido}` : ""}
${item.h2Recomendados ? `- H2 OBLIGATORIOS (úsalos en este orden, TAL CUAL):\n${item.h2Recomendados}` : ""}
${item.h2KwPrincipal ? `- H2 con keyword principal: ${item.h2KwPrincipal}` : ""}
${item.h2KwSecundarias ? `- H2 con keywords secundarias: ${item.h2KwSecundarias}` : ""}
${item.primerParrafo ? `- PRIMER PÁRRAFO OBLIGATORIO (úsalo como base del primer párrafo, debe contener la keyword principal):\n${item.primerParrafo}` : ""}
${item.tablaObligatoria ? `- TABLA OBLIGATORIA (incluye una tabla Markdown sobre): ${item.tablaObligatoria}` : ""}
${item.faqSugeridas ? `- FAQ OBLIGATORIAS (sección "## Preguntas Frecuentes" con estas preguntas como mínimo):\n${item.faqSugeridas}` : ""}
${item.ctaRecomendado ? `- CTA FINAL: ${item.ctaRecomendado}` : ""}
${item.enlacesInternos ? `- ENLACES INTERNOS OBLIGATORIOS (inclúyelos como enlaces Markdown):\n${item.enlacesInternos}` : ""}
${item.fuenteExterna ? `- FUENTE EXTERNA (cita como referencia al final): ${item.fuenteExterna}` : ""}
${item.imagenAlt ? `- IMAGEN + ALT SUGERIDOS:\n${item.imagenAlt}` : ""}
${item.metaTitleSug ? `- META TITLE OBLIGATORIO (úsalo TAL CUAL, máx 60 chars): ${item.metaTitleSug}` : ""}
${item.metaDescSug ? `- META DESCRIPTION OBLIGATORIA (úsala TAL CUAL, máx 160 chars): ${item.metaDescSug}` : ""}
${item.slugSug ? `- SLUG OBLIGATORIO (úsalo TAL CUAL): ${item.slugSug}` : ""}

POSTS DEL BLOG DISPONIBLES PARA ENLAZADO INTERNO:
${postsForLinking || "(sin posts previos publicados todavía)"}
`.trim();

        const systemPrompt = `Eres un redactor SEO senior de Ecología Rentable. Sigues AL PIE DE LA LETRA la fila activa del calendario editorial. La idea, la keyword principal, el geotarget y el objetivo de conversión NO se cambian.

REGLAS DE FIDELIDAD A LA FILA (inviolables):
1. El artículo desarrolla EXACTAMENTE "Idea del contenido *". No reinterpretes el tema.
2. La keyword principal es la de la fila, sin variaciones.
3. Si la keyword o la idea contienen ciudad/zona/geotarget, mantenlos y menciónalos 2-3 veces de forma natural.
4. El CTA principal coincide con "Objetivo conversión".
5. Un contenido comercial no se convierte en informativo puro y viceversa. Tipo + Intención mandan.
6. No mezcles servicios o productos ajenos a la fila.
7. Audiencia: si la idea es para particulares → usuario final. Si es talleres/equipos/renting/distribuidores → B2B. Si es flotas/empresas → responsables de mantenimiento, operaciones o flotas.

REGLAS DE MARCA INVIOLABLES:
- Marca: SIEMPRE "Ecología Rentable". PROHIBIDO "Flex Fuel" o competidores.
- Idioma: español de España, tuteo profesional.
- Precios: NUNCA cifras en €. Usa "Consultar precio" o "Solicita presupuesto".
- No inventes precios, garantías, certificaciones, homologaciones, años de experiencia, cifras de rentabilidad ni especificaciones técnicas no confirmadas.
- No prometas resultados garantizados. Usa expresiones prudentes: "puede ayudar", "contribuye a", "permite reducir el riesgo de", "ayuda a mejorar".

NOMENCLATURA OBLIGATORIA DE PRODUCTOS:
- Usa siempre: H2 Profit 1000, H2 Profit 2000, H2 Profit 3000, Hy-Carbon Connect, Carbon FAP, Opacímetro Ecología Rentable, Analizador de gases Ecología Rentable, Kit Opacidad, Descarbonizadora reacondicionada.
- PROHIBIDO: Hy-Calamine 1000S/2000S/3000S, "gama Hy-Calamine" o cualquier variante.

ESTRUCTURA Y FORMATO (estricto):
- Un solo H1 (# H1) que contiene la keyword principal.
- Primer párrafo (50-80 palabras) con la keyword principal exacta.
- Solo H2 (## H2). PROHIBIDO H3, H4, H5, H6.
- Los H2 son títulos LIMPIOS y BREVES. Nunca incluyas párrafos, listas, bullets, FAQs ni explicaciones DENTRO del propio H2.
- Tras cada H2, desarrolla en párrafos normales y, si aplica, listas o tabla.
- Incluye OBLIGATORIAMENTE: una tabla útil en Markdown, una sección de recomendaciones prácticas, una sección "## Cómo puede ayudarte Ecología Rentable" (1-2 párrafos con CTA contextual), y una sección "## Preguntas frecuentes" al final.
- En las FAQ NO uses H3: cada pregunta va en **negrita** y la respuesta debajo en párrafo normal.
- CTA contextual en mitad del artículo + CTA final, ambos coherentes con "Objetivo conversión".
- No escribas "H1:" ni "H2:" como texto. No emitas etiquetas HTML.

ENLAZADO INTERNO SEO (OBLIGATORIO — entre 8 y 15 enlaces internos por artículo, insertados de forma NATURAL dentro del cuerpo, NUNCA en bloques al final, NUNCA como "haz clic aquí"). Usa anchors descriptivos y SEMÁNTICOS, variados (no repitas el mismo anchor literal), basados en la intención de búsqueda. Cada artículo DEBE incluir, como mínimo:
- 1 enlace a HOME: / (anchor tipo "Ecología Rentable", "soluciones de descarbonización")
- 1 enlace a /contacto (anchor tipo "solicita presupuesto", "habla con un técnico")
- 2-3 enlaces a páginas de SERVICIO relacionadas con el tema
- 1-2 enlaces a páginas de PRODUCTO (categoría o ficha) relacionadas
- 1 enlace a una página de SOLUCIÓN cuando el post trate un problema mecánico
- 1-2 enlaces a otros artículos del BLOG semánticamente relacionados

MAPA DE URLs INTERNAS DISPONIBLES (usa rutas relativas, p.ej. [anchor](/servicios/...)):

Home y contacto: /  ·  /contacto

Servicios (/servicios/...):
- /servicios, /servicios/descarbonizacion-motor, /servicios/descarbonizacion-con-hidrogeno, /servicios/descarbonizacion-para-particulares, /servicios/descarbonizacion-para-talleres, /servicios/descarbonizacion-para-empresas, /servicios/descarbonizacion-para-flotas-de-camiones, /servicios/descarbonizacion-para-coches-de-renting, /servicios/limpieza-filtro-de-particulas, /servicios/mantenimiento-descarbonizadoras, /servicios/alquiler-renting-equipos

Tienda — categorías y fichas:
- /tienda/descarbonizadoras, /tienda/descarbonizadoras-reacondicionadas, /tienda/maquinas-limpieza-filtro-particulas, /tienda/opacimetros, /tienda/analizadores-de-gases, /tienda/kit-opacidad
- /tienda/descarbonizadoras/h2-profit-1000, /tienda/descarbonizadoras/h2-profit-2000, /tienda/descarbonizadoras/h2-profit-3000, /tienda/descarbonizadoras/hy-carbon-connect, /tienda/maquinas-limpieza-filtro-particulas/carbon-fap, /tienda/opacimetros/opacimetro-ecologia-rentable, /tienda/analizadores-de-gases/analizador-gases-ecologia-rentable

Soluciones (/soluciones/...):
- /soluciones/gases-altos-itv-diesel, /soluciones/gases-altos-itv-gasolina, /soluciones/humo-negro-diesel, /soluciones/fallo-anticontaminacion, /soluciones/filtro-particulas-obstruido, /soluciones/limpiar-dpf-sin-desmontar, /soluciones/fallo-egr, /soluciones/catalizador-obstruido, /soluciones/perdida-potencia-coche-diesel, /soluciones/descarbonizacion-motor-diesel, /soluciones/descarbonizacion-motor-gasolina

Categorías del blog: /blog/categoria/que-es-descarbonizacion · /blog/categoria/guias · /blog/categoria/innovacion · /blog/categoria/itv · /blog/categoria/productos · /blog/categoria/flotas

REGLAS DE ENLAZADO:
- Usa SIEMPRE rutas relativas (empezando por "/"), nunca dominios absolutos.
- Sintaxis Markdown obligatoria: [anchor descriptivo](/ruta).
- VARÍA los anchors; evita repetir literalmente la keyword principal en cada enlace.
- NO acumules enlaces al final. Distribúyelos dentro de los párrafos del cuerpo donde aportan contexto.
- Prioriza páginas comerciales (servicios/tienda/soluciones) cuando el contexto lo justifique.
- No dupliques el mismo destino más de 2 veces.
- MÍNIMO ABSOLUTO: 8 enlaces internos en formato Markdown [texto](/ruta). Si entregas menos de 8, el contenido será RECHAZADO y regenerado.

REGLAS DE PRIORIDAD CON LA HOJA:
1. Si vienen "H1 sugerido", "Slug sugerido", "Meta title sugerido" o "Meta description sugerida" → ÚSALOS TAL CUAL.
2. Si vienen "H2 recomendados" → úsalos en ese orden exacto.
3. Si viene "Primer párrafo obligatorio" → úsalo conservando la keyword principal.
4. Si viene "Prompt Lovable reforzado" → es la guía maestra.

LÍMITES SEO:
- meta_title: máx 58 caracteres, contiene la keyword principal.
- meta_description: máx 155 caracteres, contiene la keyword principal.
- slug: minúsculas, sin acentos, con guiones.

FORMATO DE RESPUESTA — SOLO JSON VÁLIDO:
{
  "title": "H1 exacto",
  "slug": "slug-exacto",
  "meta_title": "máx 58 chars",
  "meta_description": "máx 155 chars",
  "excerpt": "1-2 frases con keyword principal",
  "image_alt": "ALT descriptivo de la imagen destacada",
  "meta_keywords": "keyword principal, secundarias separadas por coma",
  "content": "Markdown completo: # H1, primer párrafo, ## H2 limpios, párrafos, tabla, recomendaciones, sección Ecología Rentable con CTA, ## Preguntas frecuentes con preguntas en **negrita** sin H3, CTA final.",
  "category": "${item.categoria}"
}`;

        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-pro",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: specialistSpec + "\n\nDevuelve SOLO el objeto JSON. Nada más." },
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

        // Force-override with sheet's "sugerido" fields when present
        if (item.slugSug) generated.slug = slugify(item.slugSug);
        if (item.metaTitleSug) generated.meta_title = item.metaTitleSug.slice(0, 60);
        if (item.metaDescSug) generated.meta_description = item.metaDescSug.slice(0, 160);
        if (item.h1Sugerido) generated.title = item.h1Sugerido;

        // Validate
        const validationErrors = validateContent(generated, item);
        if (validationErrors.length > 0) {
          console.warn(`Validación falló para ${item.kwPrincipal}:`, validationErrors);
        }

        // Image generation
        let imageUrl: string | null = null;
        try {
          const imgPrompt = item.imagenAlt
            ? `Eco-friendly automotive illustration: ${item.imagenAlt}. Style: clean flat vector with green/teal palette, professional, no text, 16:9.`
            : `Modern eco-friendly automotive blog illustration for "${generated.title}". Category: ${item.categoria}. Style: clean flat vector with green/teal palette, mechanic cleaning a car engine, leaves and eco symbols, decarbonization theme. NO text. Bright optimistic. 16:9.`;
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
        const shouldPublishNow = !item.isFuture;

        const allKeywords = [item.kwPrincipal, item.kwSec1, item.kwSec2, item.kwSec3].filter(Boolean).join(", ");

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
            meta_keywords: allKeywords || null,
            published: shouldPublishNow,
            published_at: item.fecha,
          })
          .select("id")
          .single();

        if (insertError) throw new Error(`Insert failed: ${insertError.message}`);

        await supabase.from("blog_calendar_sync").update({
          status: shouldPublishNow ? "published" : "scheduled",
          blog_post_id: insertedPost.id,
          error_message: validationErrors.length ? `Avisos: ${validationErrors.join("; ")}` : null,
        }).eq("keyword_slug", item.keywordSlug);

        results.push({
          slug,
          title: generated.title,
          status: shouldPublishNow ? "published" : "scheduled",
          scheduled_for: item.fecha,
          image: !!imageUrl,
          warnings: validationErrors.length ? validationErrors : undefined,
        });
        await new Promise((r) => setTimeout(r, 2000));
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
      valid_rows: pending.length,
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
