import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY")!;

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

    const { title, category, slug, excerpt } = await req.json();
    if (!title) return json({ error: "title requerido" }, 400);

    const prompt = `Crea una imagen de cabecera EDUCATIVA y FOTORREALISTA para un blog técnico de automoción de la marca "Ecología Rentable" (España).

CONTEXTO DEL PRODUCTO REAL (muy importante — represéntalo con fidelidad):
- "Ecología Rentable" descarboniza motores diésel y gasolina inyectando HIDRÓGENO (HHO) generado por electrólisis directamente en la admisión del motor mientras el coche está en ralentí en taller.
- Las máquinas reales son carros profesionales de taller (modelos H2 Profit 1000/2000/3000 y Hy-Carbon Connect): estructura metálica con ruedas, color claro/blanco con detalles verdes, panel de control digital, mangueras flexibles que conectan a la admisión del motor, depósito de agua destilada, generador de HHO interno. Hy-Carbon Connect además tiene tablet/pantalla y dongle OBD bluetooth.
- También limpian filtros de partículas DPF/FAP con la estación Carbon FAP (limpieza sin disolventes, agua + aire comprimido a 6 bares), y miden emisiones con opacímetros y analizadores de gases para pre-ITV.
- Entorno típico: taller mecánico profesional limpio y luminoso, suelo epoxi gris, coche con capó abierto, técnico uniformado.

TEMA DEL ARTÍCULO: "${title}"
${excerpt ? `Resumen: ${excerpt}` : ""}
Categoría: ${category || "automoción"}

ESTILO VISUAL OBLIGATORIO:
- Fotografía editorial de revista técnica de automoción + ilustración educativa cuando ayude a explicar lo que ocurre dentro del motor (vista corte/sección semitransparente del cilindro mostrando carbonilla en válvulas, pistón, EGR o DPF obstruido).
- Iluminación natural luminosa, profesional, alto contraste suave, foco nítido, profundidad de campo realista.
- Paleta: verdes naturales (#1f9d55, #2bc48a), blancos, grises claros, azul acero, ámbar puntual. Aspecto eco/profesional, NUNCA cyberpunk, NUNCA neón saturado, NUNCA sci-fi futurista, NUNCA oscuro.
- Si muestras la máquina, dibújala REALISTA y reconocible: carro vertical de taller con ruedas, panel digital, mangueras, NO la inventes como un robot abstracto.
- Si el tema es DPF/FAP: muestra un filtro de partículas real en sección (estructura cerámica panal de abeja con hollín atrapado vs limpio).
- Si el tema es ITV/emisiones: muestra opacímetro/analizador real conectado al tubo de escape.
- Si el tema es HHO/hidrógeno: muestra burbujas de gas H2/O2 saliendo de electrolisis y mangueras hacia la admisión.
- Composición horizontal 16:9, espacio limpio para overlay de título a la izquierda o abajo.
- SIN texto, SIN números visibles, SIN logos, SIN marcas de agua, SIN gente borrosa generada por IA con manos deformes (mejor primer plano del componente sin caras).
- Resultado debe parecer una foto real tomada en un taller profesional español, no un render 3D plástico.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return json({ error: "Límite alcanzado, intenta en unos segundos." }, 429);
      if (aiResponse.status === 402) return json({ error: "Sin créditos de IA." }, 402);
      const t = await aiResponse.text();
      console.error("AI image error", aiResponse.status, t);
      return json({ error: "Error generando imagen" }, 500);
    }

    const aiData = await aiResponse.json();
    const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData?.startsWith("data:image")) return json({ error: "Sin imagen en respuesta" }, 500);

    const base64 = imageData.split(",")[1];
    const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const fileName = `${slugify(slug || title)}-${Date.now()}.png`;

    const { error: upErr } = await admin.storage.from("blog-images").upload(fileName, binary, {
      contentType: "image/png", upsert: true,
    });
    if (upErr) return json({ error: upErr.message }, 500);

    const { data: urlData } = admin.storage.from("blog-images").getPublicUrl(fileName);
    return json({ url: urlData.publicUrl, fileName });
  } catch (e: any) {
    console.error("generate-post-image error:", e);
    return json({ error: e.message || "Error" }, 500);
  }

  function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
