import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Lock, UserPlus, LogIn } from "lucide-react";

export default function AdminLogin() {
  const { user, isEditor, loading } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isEditor) nav("/admin", { replace: true });
  }, [loading, user, isEditor, nav]);

  if (loading) return null;
  if (user && isEditor) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Sesión iniciada");
      nav("/admin", { replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: { display_name: displayName || email.split("@")[0] },
        },
      });
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Cuenta creada. Revisa tu correo para confirmar.");
      if (user) {
        toast.info("Un administrador debe asignarte el rol 'editor' o 'admin'.");
      }
    }
  }

  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(210,25%,4%)] text-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[hsl(210,25%,7%)] border border-white/10 rounded-2xl p-8 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[hsl(148,72%,45%)]/20 flex items-center justify-center text-[hsl(148,72%,45%)]">
            {isSignup ? <UserPlus size={20} /> : <Lock size={20} />}
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {isSignup ? "Crear cuenta" : "Panel de administración"}
            </h1>
            <p className="text-xs text-white/60">
              {isSignup ? "Registra un nuevo usuario" : "Acceso restringido a editores"}
            </p>
          </div>
        </div>

        {isSignup && (
          <div>
            <label className="text-xs text-white/70 mb-1 block">Nombre</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm"
              placeholder="Tu nombre"
            />
          </div>
        )}

        <div>
          <label className="text-xs text-white/70 mb-1 block">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-white/70 mb-1 block">Contraseña</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[hsl(148,72%,45%)] hover:bg-[hsl(148,72%,40%)] text-black font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSignup ? <UserPlus size={16} /> : <LogIn size={16} />}
          {submitting ? "Procesando..." : isSignup ? "Crear cuenta" : "Iniciar sesión"}
        </button>

        <div className="pt-2 border-t border-white/5 text-center">
          <button
            type="button"
            onClick={() => setMode(isSignup ? "login" : "signup")}
            className="text-xs text-white/60 hover:text-[hsl(148,72%,45%)] transition-colors"
          >
            {isSignup ? "¿Ya tienes cuenta? Iniciar sesión" : "¿Sin cuenta? Crear una nueva"}
          </button>
        </div>

        {isSignup && (
          <p className="text-[11px] text-white/40 text-center leading-relaxed">
            Tras registrarte, un administrador debe asignarte el rol de editor para acceder al panel.
          </p>
        )}
      </form>
    </main>
  );
}
