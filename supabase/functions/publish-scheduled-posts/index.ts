import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const nowIso = new Date().toISOString();

    // Find drafts whose scheduled date has arrived
    const { data: due, error: selErr } = await supabase
      .from("blog_posts")
      .select("id, slug, title, published_at")
      .eq("published", false)
      .lte("published_at", nowIso);

    if (selErr) throw selErr;

    if (!due || due.length === 0) {
      return new Response(JSON.stringify({ published: 0, message: "Sin posts programados pendientes" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ids = due.map((p) => p.id);
    const { error: updErr } = await supabase
      .from("blog_posts")
      .update({ published: true })
      .in("id", ids);
    if (updErr) throw updErr;

    // Mark calendar entries as published
    await supabase
      .from("blog_calendar_sync")
      .update({ status: "published" })
      .in("blog_post_id", ids);

    return new Response(JSON.stringify({
      published: due.length,
      posts: due.map((p) => ({ slug: p.slug, title: p.title, published_at: p.published_at })),
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("publish-scheduled-posts error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
