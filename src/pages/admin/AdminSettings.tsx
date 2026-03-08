import { useState } from "react";
import { Key, Save, CheckCircle, AlertTriangle, Mail, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [resendKey, setResendKey] = useState(() => localStorage.getItem("resend_api_key") || "");
  const [saved, setSaved] = useState(!!localStorage.getItem("resend_api_key"));

  const handleSave = () => {
    if (!resendKey.trim()) {
      toast({ title: "Error", description: "Introduce una API Key válida.", variant: "destructive" });
      return;
    }
    localStorage.setItem("resend_api_key", resendKey.trim());
    setSaved(true);
    toast({ title: "Guardado", description: "API Key de Resend guardada correctamente." });
  };

  const handleRemove = () => {
    localStorage.removeItem("resend_api_key");
    setResendKey("");
    setSaved(false);
    toast({ title: "Eliminada", description: "La API Key ha sido eliminada." });
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-sm text-[hsl(0,0%,50%)] mt-1">
          Integraciones y ajustes del panel de administración.
        </p>
      </div>

      {/* Resend Integration */}
      <div
        className="rounded-xl border border-white/5 p-6"
        style={{ background: "hsl(210 25% 7%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(148,72%,45%,0.15)]">
            <Mail size={20} className="text-[hsl(148,72%,45%)]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Resend — Email API</h2>
            <p className="text-xs text-[hsl(0,0%,45%)]">
              Conecta tu cuenta de Resend para enviar emails de follow-up a los leads.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-5 text-sm">
          {saved ? (
            <>
              <CheckCircle size={16} className="text-[hsl(148,72%,45%)]" />
              <span className="text-[hsl(148,72%,45%)]">API Key configurada</span>
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="text-[hsl(40,90%,55%)]" />
              <span className="text-[hsl(40,90%,55%)]">API Key no configurada</span>
            </>
          )}
        </div>

        {/* Input */}
        <label className="block text-sm text-[hsl(0,0%,60%)] mb-2">
          <Key size={12} className="inline mr-1" />
          Resend API Key
        </label>
        <div className="flex gap-3">
          <Input
            type="password"
            placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={resendKey}
            onChange={(e) => { setResendKey(e.target.value); setSaved(false); }}
            className="flex-1 bg-[hsl(210,25%,5%)] border-white/10 text-white placeholder:text-[hsl(0,0%,30%)] font-mono text-sm"
          />
          <Button
            onClick={handleSave}
            className="bg-[hsl(148,65%,22%)] hover:bg-[hsl(148,65%,28%)] text-white"
          >
            <Save size={14} className="mr-1" /> Guardar
          </Button>
        </div>

        {saved && (
          <button
            onClick={handleRemove}
            className="mt-3 text-xs text-[hsl(0,70%,55%)] hover:text-[hsl(0,70%,65%)] transition-colors"
          >
            Eliminar API Key
          </button>
        )}

        <div className="mt-5 p-4 rounded-lg border border-white/5 bg-[hsl(210,25%,5%)]">
          <p className="text-xs text-[hsl(0,0%,45%)] leading-relaxed">
            <strong className="text-[hsl(0,0%,60%)]">¿Cómo obtener tu API Key?</strong>
            <br />
            1. Ve a{" "}
            <a
              href="https://resend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(148,72%,45%)] hover:underline"
            >
              resend.com
            </a>{" "}
            y crea una cuenta gratuita.
            <br />
            2. En el panel, ve a <strong>API Keys</strong> y genera una nueva clave.
            <br />
            3. Copia la clave y pégala aquí arriba.
          </p>
        </div>
      </div>

      {/* General Settings Placeholder */}
      <div
        className="rounded-xl border border-white/5 p-6"
        style={{ background: "hsl(210 25% 7%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(200,80%,55%,0.15)]">
            <Globe size={20} className="text-[hsl(200,80%,55%)]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Configuración General</h2>
            <p className="text-xs text-[hsl(0,0%,45%)]">
              Ajustes del sitio y notificaciones.
            </p>
          </div>
        </div>
        <p className="text-sm text-[hsl(0,0%,40%)]">
          Próximamente: notificaciones por email, webhooks y más.
        </p>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-[hsl(210,25%,5%)]">
        <Shield size={18} className="text-[hsl(40,90%,55%)] mt-0.5 shrink-0" />
        <p className="text-xs text-[hsl(0,0%,45%)] leading-relaxed">
          <strong className="text-[hsl(0,0%,60%)]">Nota de seguridad:</strong> La API Key se almacena
          localmente en tu navegador. Para una integración más segura en producción, recomendamos
          conectar Lovable Cloud para gestionar secretos de forma segura en el backend.
        </p>
      </div>
    </div>
  );
}
