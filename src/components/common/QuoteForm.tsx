import { useState } from "react";
import { CheckCircle, ShieldCheck, Clock, Send, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type QuotePerfil = "particular" | "taller" | "concesionario" | "flota" | "distribuidor";

const PERFILES_MIXTO: { id: QuotePerfil; label: string }[] = [
  { id: "particular", label: "Conductor particular" },
  { id: "taller", label: "Taller mecánico" },
  { id: "concesionario", label: "Concesionario" },
  { id: "flota", label: "Empresa con flota" },
  { id: "distribuidor", label: "Distribuidor" },
];

const PERFILES_B2B = PERFILES_MIXTO.filter((p) => p.id !== "particular");

export const SERVICIOS_OPCIONES = [
  "No busco servicios",
  "Descarbonización de motor",
  "Descarbonización con hidrógeno",
  "Limpieza de filtro de partículas / DPF / FAP",
  "Diagnóstico de emisiones / gases ITV",
  "Servicio para flotas de camiones",
  "Servicio para coches de renting",
  "Mantenimiento de máquinas FlexFuel",
  "No lo tengo claro, necesito asesoramiento",
];

export const EQUIPOS_OPCIONES = [
  "No estoy buscando un equipo",
  "H2 Profit 1000",
  "H2 Profit 2000",
  "H2 Profit 3000",
  "Hy-Carbon Connect",
  "Carbon FAP",
  "Opacímetro Ecología Rentable",
  "Analizador de gases Ecología Rentable",
  "Kit Opacidad",
  "Descarbonizadora reacondicionada",
  "No sé qué equipo necesito",
];

export const MODALIDADES_OPCIONES = ["Compra", "Alquiler", "Renting", "Reacondicionado", "No lo tengo claro"];

interface QuoteFormProps {
  /** Identifier for the page/service requesting the quote (slug). */
  context: string;
  title?: string;
  subtitle?: string;
  defaultMessage?: string;
  compact?: boolean;
  /** "mixto" (B2C+B2B) o "b2b" (solo perfiles profesionales). */
  mode?: "mixto" | "b2b";
  /** Perfil preseleccionado. */
  defaultPerfil?: QuotePerfil;
  /** Compatibilidad antigua: defaultTipo → defaultPerfil. */
  defaultTipo?: "particular" | "taller" | "flota";
  /** Servicio preseleccionado de SERVICIOS_OPCIONES. */
  presetServicio?: string;
  /** Equipo preseleccionado de EQUIPOS_OPCIONES. */
  presetEquipo?: string;
  /** Modalidad preseleccionada de MODALIDADES_OPCIONES. */
  presetModalidad?: string;
  /** CTA label. */
  ctaLabel?: string;
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
  compact = false,
  mode = "mixto",
  defaultPerfil,
  defaultTipo,
  presetServicio,
  presetEquipo,
  presetModalidad,
  ctaLabel = "Consultar mi precio",
}: QuoteFormProps) {
  const { toast } = useToast();

  const initialPerfil: QuotePerfil =
    defaultPerfil ||
    (defaultTipo as QuotePerfil) ||
    (mode === "b2b" ? "taller" : "particular");

  const perfilesList = mode === "b2b" ? PERFILES_B2B : PERFILES_MIXTO;

  const [perfil, setPerfil] = useState<QuotePerfil>(
    perfilesList.find((p) => p.id === initialPerfil)?.id || perfilesList[0].id
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    negocio: "",
    codigoPostal: "",
    servicio: presetServicio && SERVICIOS_OPCIONES.includes(presetServicio) ? presetServicio : SERVICIOS_OPCIONES[0],
    equipo: presetEquipo && EQUIPOS_OPCIONES.includes(presetEquipo) ? presetEquipo : EQUIPOS_OPCIONES[0],
    modalidad: presetModalidad && MODALIDADES_OPCIONES.includes(presetModalidad) ? presetModalidad : MODALIDADES_OPCIONES[0],
    mensaje: defaultMessage,
  });

  const isB2B = perfil !== "particular";
  const buscaEquipo = form.equipo !== EQUIPOS_OPCIONES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return;
    if (isB2B && (!form.negocio.trim() || !form.codigoPostal.trim())) return;
    setLoading(true);
    try {
      const perfilLabel = perfilesList.find((p) => p.id === perfil)?.label;
      const notas = [
        `Página: ${context}`,
        `Perfil: ${perfilLabel}`,
        isB2B && form.negocio && `Negocio: ${form.negocio.trim()}`,
        isB2B && form.codigoPostal && `Código postal: ${form.codigoPostal.trim()}`,
        isB2B && `Servicio de interés: ${form.servicio}`,
        isB2B && `Equipo de interés: ${form.equipo}`,
        isB2B && buscaEquipo && `Modalidad comercial: ${form.modalidad}`,
        form.mensaje && `Mensaje: ${form.mensaje}`,
      ]
        .filter(Boolean)
        .join("\n");
      const { error } = await supabase.from("leads").insert({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim() || null,
        servicio: context,
        origen: `LP · ${context} · ${perfilLabel}`,
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
          <div className={`grid gap-1.5 ${perfilesList.length >= 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3"}`}>
            {perfilesList.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPerfil(p.id)}
                className={`text-[11px] font-semibold py-2 px-1.5 rounded-lg border transition-all leading-tight ${
                  perfil === p.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`qf-nombre-${context}`} className="text-xs font-semibold text-foreground">Nombre del responsable *</Label>
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

        <AnimatePresence initial={false}>
          {isB2B && (
            <motion.div
              key="b2b-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor={`qf-neg-${context}`} className="text-xs font-semibold text-foreground">Nombre del negocio *</Label>
                  <Input
                    id={`qf-neg-${context}`}
                    required={isB2B}
                    maxLength={150}
                    value={form.negocio}
                    onChange={(e) => setForm({ ...form, negocio: e.target.value })}
                    placeholder="Talleres García S.L."
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`qf-cp-${context}`} className="text-xs font-semibold text-foreground">Código postal *</Label>
                  <Input
                    id={`qf-cp-${context}`}
                    required={isB2B}
                    maxLength={10}
                    value={form.codigoPostal}
                    onChange={(e) => setForm({ ...form, codigoPostal: e.target.value })}
                    placeholder="28001"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">¿Estás interesado en algún servicio?</Label>
                <select
                  value={form.servicio}
                  onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {SERVICIOS_OPCIONES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">¿Estás interesado en algún equipo?</Label>
                <select
                  value={form.equipo}
                  onChange={(e) => setForm({ ...form, equipo: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {EQUIPOS_OPCIONES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {buscaEquipo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <Label className="text-xs font-semibold text-foreground">Modalidad comercial</Label>
                  <select
                    value={form.modalidad}
                    onChange={(e) => setForm({ ...form, modalidad: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {MODALIDADES_OPCIONES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
          {loading ? "Enviando…" : ctaLabel}
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
