// Edge function: generate blog post draft via Lovable AI Gateway
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

interface Body {
  title?: string;
  topic?: string;
  category?: string;
  city?: string;
  tone?: string;       // tom/ângulo
  persona?: string;    // persona/público-alvo
  cta?: string;        // CTA final
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) {
      return json({ error: 'LOVABLE_API_KEY no configurada' }, 500);
    }

    // Auth: require admin or editor
    const authHeader = req.headers.get('Authorization') || '';
    const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supa.auth.getUser();
    if (userErr || !userData.user) return json({ error: 'No autenticado' }, 401);

    const { data: isAdmin } = await supa.rpc('has_role', { _user_id: userData.user.id, _role: 'admin' });
    const { data: isEditor } = await supa.rpc('has_role', { _user_id: userData.user.id, _role: 'editor' });
    if (!isAdmin && !isEditor) return json({ error: 'Sin permiso' }, 403);

    const body: Body = await req.json().catch(() => ({}));
    const topic = (body.title || body.topic || '').trim();
    if (!topic) return json({ error: 'Falta tema/título' }, 400);

    const category = (body.category || 'Guías').trim();
    const city = (body.city || '').trim();
    const tone = (body.tone || '').trim();
    const persona = (body.persona || '').trim();
    const cta = (body.cta || '').trim();

    const systemPrompt = `Eres redactor SEO senior de Ecología Rentable (descarbonización de motores, limpieza de filtros DPF/FAP, ITV, talleres asociados en España).

REGLAS DE CONTENIDO:
1. Escribe SIEMPRE en español de España.
2. Marca: "Ecología Rentable". NUNCA uses "Flex Fuel".
3. Precios: usa "Consultar precio". Nunca cifras monetarias concretas.
4. Tono profesional, claro, práctico, sin relleno ni lorem ipsum.
5. El contenido debe ser markdown válido: usa ## y ### (nunca # — el H1 lo pone la página).
6. Estructura recomendada: intro corta (2-3 frases) + 4-7 secciones con ##/### + lista final con puntos clave.
7. Incluye al menos 2 enlaces internos en markdown a rutas reales del sitio:
   /servicios, /servicios/descarbonizacion-motor, /servicios/limpieza-filtros-dpf-fap,
   /soluciones, /soluciones/fallo-egr, /soluciones/regeneraciones-fallidas,
   /tienda, /encuentra-tu-centro, /contacto, /blog.
8. meta_title ≤ 58 caracteres, único, con keyword principal.
9. meta_description ≤ 155 caracteres, persuasiva, con keyword.
10. slug en minúsculas, sin tildes, separado por guiones.
11. excerpt: 1-2 frases, máx 200 caracteres.
12. meta_keywords: 4-8 términos separados por coma.
13. NO inventes datos legales/normativos: usa términos generales ("según la normativa vigente").
14. ${tone ? `TONO/ÁNGULO solicitado: ${tone}.` : 'Tono por defecto: informativo y profesional.'}
15a. ${persona ? `PERSONA/PÚBLICO objetivo: ${persona}. Adapta el lenguaje y los ejemplos a este perfil.` : 'Público general: conductores particulares y flotas.'}
15b. ${cta ? `CTA FINAL: termina el artículo con una llamada a la acción clara orientada a "${cta}".` : 'Termina con un CTA suave que invite a contactar o pedir presupuesto.'}
${city ? `16. Geo: este artículo está enfocado a ${city}. Menciona la ciudad de forma natural varias veces.` : ''}

DEVUELVE EXCLUSIVAMENTE JSON VÁLIDO (sin markdown wrapping) con esta forma exacta:
{
  "title": string,
  "slug": string,
  "excerpt": string,
  "content": string,
  "meta_title": string,
  "meta_description": string,
  "meta_keywords": string
}`;

    const userPrompt = `Tema: ${topic}
Categoría: ${category}${city ? `\nCiudad: ${city}` : ''}${tone ? `\nTono: ${tone}` : ''}${persona ? `\nPersona: ${persona}` : ''}${cta ? `\nCTA: ${cta}` : ''}

Genera el artículo completo siguiendo todas las reglas.`;

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Lovable-API-Key': LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      if (aiRes.status === 429) return json({ error: 'Límite de uso de IA alcanzado. Inténtalo en unos minutos.' }, 429);
      if (aiRes.status === 402) return json({ error: 'Créditos de IA agotados. Añade créditos en el workspace.' }, 402);
      return json({ error: `Error IA: ${errText.slice(0, 300)}` }, 500);
    }

    const data = await aiRes.json();
    const text = data?.choices?.[0]?.message?.content || '{}';
    let parsed: Record<string, string> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
    }

    return json({ post: parsed });
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
