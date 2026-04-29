import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string; author_name: string; content: string; created_at: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { load(); }, [postId]);

  async function load() {
    const { data } = await supabase
      .from("blog_comments")
      .select("id, author_name, content, created_at")
      .eq("post_id", postId).eq("approved", true)
      .order("created_at", { ascending: false });
    setComments(data || []);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || content.trim().length < 5) {
      return toast.error("Completa todos los campos correctamente");
    }
    setSubmitting(true);
    const { error } = await supabase.from("blog_comments").insert({
      post_id: postId, author_name: name.trim(), author_email: email.trim(), content: content.trim(),
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Comentario enviado. Será visible tras moderación.");
    setName(""); setEmail(""); setContent("");
  }

  return (
    <section className="mt-14">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
        <MessageCircle size={20} /> Comentarios ({comments.length})
      </h2>

      <form onSubmit={submit} className="card-eco p-5 space-y-3 mb-8">
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required maxLength={80}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (no se publica)" type="email" required maxLength={160}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe tu comentario…" rows={4} required maxLength={1500}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        <button type="submit" disabled={submitting} className="btn-primary text-sm inline-flex items-center gap-1.5 disabled:opacity-60">
          <Send size={13} /> {submitting ? "Enviando…" : "Enviar comentario"}
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sé el primero en comentar.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <article key={c.id} className="card-eco p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-sm text-foreground">{c.author_name}</h3>
                <time className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString("es-ES")}</time>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{c.content}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
