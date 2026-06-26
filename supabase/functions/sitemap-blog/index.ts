// Dynamic sitemap for blog posts — always reflects the latest published rows.
// Public endpoint, no auth required.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const BASE = "https://ecologiarentable.es";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );

    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    const posts = data ?? [];
    const today = new Date().toISOString().split("T")[0];

    const urls = posts
      .map((p: { slug: string; updated_at: string | null }) => {
        const lastmod = (p.updated_at ?? today).split("T")[0];
        return [
          `  <url>`,
          `    <loc>${BASE}/blog/${p.slug}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.6</priority>`,
          `  </url>`,
        ].join("\n");
      })
      .join("\n");

    const xml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      urls,
      `</urlset>`,
    ].join("\n");

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        // Cache 1h at edge/CDN, allow stale for 24h while revalidating
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>\n<!-- error: ${message} -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8" },
      },
    );
  }
});
