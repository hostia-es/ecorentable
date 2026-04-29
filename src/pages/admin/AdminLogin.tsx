import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const { user, isEditor, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isEditor) nav("/admin", { replace: true });
  }, [loading, user, isEditor, nav]);

  if (loading) return null;
  if (user && isEditor) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Sesión iniciada");
    nav("/admin", { replace: true });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(210,25%,4%)] text-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[hsl(210,25%,7%)] border border-white/10 rounded-2xl p-8 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[hsl(148,72%,45%)]/20 flex items-center justify-center text-[hsl(148,72%,45%)]">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Panel de administración</h1>
            <p className="text-xs text-white/60">Acceso restringido a editores</p>
          </div>
        </div>
        <div>
          <label className="text-xs text-white/70 mb-1 block">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-xs text-white/70 mb-1 block">Contraseña</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <button type="submit" disabled={submitting}
          className="w-full bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50">
          {submitting ? "Verificando..." : "Iniciar sesión"}
        </button>
        <p className="text-[11px] text-white/40 text-center">¿Sin cuenta? Contacta con el administrador del sitio.</p>
      </form>
    </main>
  );
}
