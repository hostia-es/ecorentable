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

    const { title, category, slug } = await req.json();
    if (!title) return json({ error: "title requerido" }, 400);

    const prompt = `Imagen de cabecera profesional para un blog español sobre automoción ecológica (marca "Ecología Rentable"). Tema del artículo: "${title}". Categoría: ${category || "automoción"}.

ESTILO:
- Limpio, luminoso, profesional, fondo claro o pastel suave.
- Iluminación natural cálida.
- Estética de revista técnica de motor — NO futurista, NO sci-fi, NO oscuro.
- Tonos: verdes naturales, blancos, gris claro, ámbar suave (paleta eco/sostenible).
- Cuando sea relevante, mostrar elementos reales: motor de coche, taller mecánico limpio, hidrógeno (H2), filtro DPF, hojas verdes integradas con motor.
- Personas opcionales: técnicos profesionales con uniforme.
- SIN texto, SIN logos, SIN watermarks.
- Formato 16:9, alta calidad fotográfica o ilustración realista.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
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
