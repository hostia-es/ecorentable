// BlogHub receive endpoint. Public (verify_jwt=false). Auth via x-bloghub-secret header.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-bloghub-secret",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function insertPost(payload: Record<string, unknown>): Promise<string> {
  let row: Record<string, unknown> = { ...payload };
  // Try up to 25 times, removing columns the DB rejects.
  for (let i = 0; i < 25; i++) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(row)
      .select("id")
      .single();
    if (!error) return (data as { id: string }).id;
    // PGRST204 / 42703: column "xxx" of relation "blog_posts" does not exist / not found in schema cache
    const msg = error.message || "";
    const m =
      msg.match(/column "([^"]+)" of relation/i) ||
      msg.match(/'([^']+)' column of '[^']+'/i) ||
      msg.match(/Could not find the '([^']+)' column/i);
    if (m && m[1] && m[1] in row) {
      delete row[m[1]];
      continue;
    }
    throw new Error(msg);
  }
  throw new Error("insert failed after retries");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method not allowed" }, 405);

  const secret = req.headers.get("x-bloghub-secret");
  if (!secret || secret !== Deno.env.get("BLOGHUB_SECRET")) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  let body: { action?: string; payload?: any };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }
  const { action, payload } = body ?? {};
  if (!action) return json({ ok: false, error: "action required" }, 400);

  try {
    switch (action) {
      case "ping": {
        const { count, error } = await supabase
          .from("blog_posts")
          .select("id", { count: "exact", head: true });
        if (error) throw error;
        return json({ ok: true, blog_posts_found: (count ?? 0) >= 0 });
      }
      case "insert": {
        if (!payload || typeof payload !== "object") {
          return json({ ok: false, error: "payload required" }, 400);
        }
        const id = await insertPost(payload as Record<string, unknown>);
        return json({ ok: true, id });
      }
      case "update": {
        const { id, patch } = payload ?? {};
        if (!id || !patch) return json({ ok: false, error: "id and patch required" }, 400);
        let row: Record<string, unknown> = { ...patch };
        for (let i = 0; i < 25; i++) {
          const { error } = await supabase.from("blog_posts").update(row).eq("id", id);
          if (!error) return json({ ok: true });
          const msg = error.message || "";
          const m =
            msg.match(/column "([^"]+)" of relation/i) ||
            msg.match(/Could not find the '([^']+)' column/i);
          if (m && m[1] && m[1] in row) {
            delete row[m[1]];
            continue;
          }
          throw new Error(msg);
        }
        throw new Error("update failed after retries");
      }
      case "get": {
        const { id } = payload ?? {};
        if (!id) return json({ ok: false, error: "id required" }, 400);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("content, title, cover_image_url, image_url")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        if (!data) return json({ ok: false, error: "not found" }, 404);
        return json({
          ok: true,
          content: data.content,
          title: data.title,
          cover_image_url: data.cover_image_url ?? data.image_url ?? null,
        });
      }
      case "publish_due": {
        const { ids, published_at } = payload ?? {};
        if (!Array.isArray(ids) || ids.length === 0) {
          return json({ ok: false, error: "ids[] required" }, 400);
        }
        const when = published_at || new Date().toISOString();
        const { error } = await supabase
          .from("blog_posts")
          .update({ is_published: true, published: true, published_at: when })
          .in("id", ids);
        if (error) throw error;
        return json({ ok: true });
      }
      default:
        return json({ ok: false, error: `unknown action: ${action}` }, 400);
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("bloghub-receive error:", msg);
    return json({ ok: false, error: msg }, 500);
  }
});
