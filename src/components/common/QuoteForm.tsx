import { useState } from "react";
import { CheckCircle, ShieldCheck, Clock, Send, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuoteFormProps {
  /** Identifier for the page/service requesting the quote (slug). */
  context: string;
  /** Visible title above the form. */
  title?: string;
  /** Short persuasive subtitle. */
  subtitle?: string;
  /** Default value for the message textarea. */
  defaultMessage?: string;
  /** Default user type. */
  defaultTipo?: "particular" | "taller" | "flota";
  /** Compact variant (less padding, used for sidebar). */
  compact?: boolean;
}

const trust = [
  { icon: <Clock size={13} />, text: "Respuesta en menos de 24 h" },
  { icon: <ShieldCheck size={13} />, text: "Sin compromiso, sin coste" },
  { icon: <CheckCircle size={13} />, text: "Asesoramiento de un técnico real" },
];

export default function QuoteForm({
  context,
  title = "Consulta tu precio en menos de 24 h",
  subtitle = "Te respondemos con presupuesto personalizado, sin compromiso. Sin formularios eternos: solo lo justo para entender lo que necesitas.",
  defaultMessage = "",
  defaultTipo = "particular",
  compact = false,
}: QuoteFormProps) {
  const { toast } = useToast();
  const [tipo, setTipo] = useState<"particular" | "taller" | "flota">(defaultTipo);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: defaultMessage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return;
    setLoading(true);
    try {
      const notas = [
        `Página: ${context}`,
        `Tipo: ${tipo}`,
        form.mensaje && `Mensaje: ${form.mensaje}`,
      ].filter(Boolean).join("\n");
      const { error } = await supabase.from("leads").insert({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim() || null,
        servicio: context,
        origen: `LP · ${context}`,
        notas,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: "No pudimos enviar tu solicitud",
        description: err.message || "Inténtalo de nuevo en unos instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-md p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-primary/10 text-primary">
          <CheckCircle size={26} />
        </div>
        <h3 className="font-bold text-lg mb-2 text-foreground">Solicitud recibida</h3>
        <p className="text-sm text-muted-foreground">
          Un asesor técnico te contactará en menos de 24 h laborables con tu presupuesto a medida.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-md ${compact ? "p-6" : "p-7"}`}>
      <div className="mb-5">
        <h3 className="font-bold text-lg text-foreground leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-xs font-semibold text-foreground mb-2 block">Soy</Label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["particular", "taller", "flota"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`text-xs font-semibold py-2 rounded-lg border transition-all ${
                  tipo === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {t === "particular" ? "Particular" : t === "taller" ? "Taller" : "Flota"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`qf-nombre-${context}`} className="text-xs font-semibold text-foreground">Nombre *</Label>
          <Input
            id={`qf-nombre-${context}`}
            required
            maxLength={100}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Cómo te llamas"
            className="h-10"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor={`qf-email-${context}`} className="text-xs font-semibold text-foreground">Email *</Label>
            <Input
              id={`qf-email-${context}`}
              type="email"
              required
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="tu@email.com"
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`qf-tel-${context}`} className="text-xs font-semibold text-foreground">Teléfono</Label>
            <Input
              id={`qf-tel-${context}`}
              type="tel"
              maxLength={30}
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              placeholder="+34 600 000 000"
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`qf-msg-${context}`} className="text-xs font-semibold text-foreground">Cuéntanos brevemente</Label>
          <Textarea
            id={`qf-msg-${context}`}
            rows={3}
            maxLength={1000}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            placeholder="Vehículo, kilómetros, taller, número de unidades... lo que prefieras."
            className="resize-none"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full h-11 font-semibold">
          <Send size={15} className="mr-1.5" />
          {loading ? "Enviando…" : "Consultar mi precio"}
        </Button>

        <ul className="grid grid-cols-1 gap-1.5 pt-2">
          {trust.map((t) => (
            <li key={t.text} className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="text-primary">{t.icon}</span>
              {t.text}
            </li>
          ))}
        </ul>

        <p className="flex items-center gap-1 text-[10px] text-muted-foreground pt-1">
          <Lock size={10} /> Tus datos están protegidos. Solo se usan para responder a tu solicitud.
        </p>
      </form>
    </div>
  );
}
