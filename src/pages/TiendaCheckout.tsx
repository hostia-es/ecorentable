import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lock,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const stepLabels = ["Tu solicitud", "Datos de contacto", "Confirmación"] as const;

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Indica tu nombre").max(100),
  email: z.string().trim().email("Email no válido").max(255),
  telefono: z.string().trim().max(30).optional().or(z.literal("")),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  tipo: z.enum(["particular", "taller", "flota"]),
  envio_provincia: z.string().trim().max(80).optional().or(z.literal("")),
  envio_cp: z.string().trim().max(10).optional().or(z.literal("")),
  mensaje: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function TiendaCheckout() {
  const { items, setQuantity, remove, setNotes, clear, count } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const [form, setForm] = useState<ContactForm>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipo: "particular",
    envio_provincia: "",
    envio_cp: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  useEffect(() => {
    if (items.length === 0 && !done) setStep(0);
  }, [items.length, done]);

  useEffect(() => {
    document.title = "Solicitar pedido | Tienda · Ecología Rentable";
  }, []);

  const lineCount = useMemo(() => items.length, [items]);

  const goNext = () => {
    if (step === 0 && items.length === 0) {
      toast({ title: "Tu solicitud está vacía", description: "Añade al menos un producto antes de continuar." });
      return;
    }
    if (step === 1) {
      const parsed = contactSchema.safeParse(form);
      if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
        for (const issue of parsed.error.issues) {
          const k = issue.path[0] as keyof ContactForm;
          if (!fieldErrors[k]) fieldErrors[k] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
    }
    setStep((s) => (Math.min(2, s + 1) as 0 | 1 | 2));
  };

  const goBack = () => setStep((s) => (Math.max(0, s - 1) as 0 | 1 | 2));

  const submitOrder = async () => {
    setSubmitting(true);
    try {
      const ref = `PED-${Date.now().toString(36).toUpperCase()}`;
      const lineas = items
        .map(
          (i) =>
            `• ${i.quantity}× ${i.name} (${i.category} · /tienda/${i.categorySlug}/${i.slug})${
              i.notes ? ` — Nota: ${i.notes}` : ""
            }`,
        )
        .join("\n");
      const notas = [
        `Referencia: ${ref}`,
        `Tipo: ${form.tipo}`,
        form.empresa && `Empresa: ${form.empresa}`,
        (form.envio_provincia || form.envio_cp) &&
          `Envío: ${form.envio_provincia || "—"} ${form.envio_cp ? `(CP ${form.envio_cp})` : ""}`.trim(),
        "",
        "Productos solicitados:",
        lineas,
        form.mensaje && `\nMensaje: ${form.mensaje}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("leads").insert({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono?.trim() || null,
        servicio: "Pedido tienda",
        origen: `Checkout · ${ref}`,
        notas,
      });
      if (error) throw error;
      setReference(ref);
      setDone(true);
      clear();
    } catch (err: any) {
      toast({
        title: "No pudimos enviar tu solicitud",
        description: err.message || "Inténtalo de nuevo en unos instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // === DONE SCREEN ===
  if (done) {
    return (
      <main className="min-h-[70vh] section-light">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-border shadow-md p-8 md:p-10 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              <CheckCircle size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Solicitud recibida
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              Hemos registrado tu pedido con la referencia{" "}
              <span className="font-mono font-bold text-foreground">{reference}</span>. Un asesor
              técnico te contactará en menos de 24 h laborables con el presupuesto cerrado y los
              tiempos de entrega.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/tienda">Volver a la tienda</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Ir al inicio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 pt-8 pb-10">
          <Breadcrumbs items={[{ label: "Tienda", href: "/tienda" }, { label: "Solicitar pedido" }]} />
          <div className="mt-5 flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                Solicita tu pedido
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mt-2">
                Revisa los productos, déjanos tus datos y recibirás presupuesto cerrado en menos de
                24 h. Sin pago online: te confirmamos disponibilidad antes de cobrar.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-border">
              <Lock size={13} className="text-primary" /> Datos protegidos
            </div>
          </div>

          {/* STEPPER */}
          <ol className="mt-8 flex items-center gap-3 text-xs md:text-sm">
            {stepLabels.map((label, idx) => {
              const active = step === idx;
              const complete = step > idx;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold border ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : complete
                          ? "bg-primary/15 text-primary border-primary/30"
                          : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    {complete ? <CheckCircle size={14} /> : idx + 1}
                  </span>
                  <span
                    className={`font-medium ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {idx < stepLabels.length - 1 && <span className="w-6 h-px bg-border ml-1" />}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8"
                  >
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Tu solicitud ({count} {count === 1 ? "producto" : "productos"})
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Ajusta cantidades, añade notas por línea o quita lo que no necesites.
                    </p>

                    {items.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                        <ShoppingBag size={36} className="mx-auto text-muted-foreground mb-3" />
                        <p className="font-semibold text-foreground mb-1">Aún no has añadido productos</p>
                        <p className="text-sm text-muted-foreground mb-5">
                          Explora nuestro catálogo de descarbonizadoras, kits y consumibles.
                        </p>
                        <Button asChild>
                          <Link to="/tienda">Ir a la tienda</Link>
                        </Button>
                      </div>
                    ) : (
                      <ul className="divide-y divide-border">
                        {items.map((item) => (
                          <li key={item.slug} className="py-5 first:pt-0 last:pb-0">
                            <div className="flex gap-4 items-start">
                              <Link
                                to={`/tienda/${item.categorySlug}/${item.slug}`}
                                className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0 border border-border"
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <Package size={24} />
                                  </div>
                                )}
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/tienda/${item.categorySlug}/${item.slug}`}
                                  className="font-bold text-foreground hover:text-primary transition-colors block truncate"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                                <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                                  Consultar precio
                                </span>
                                <Textarea
                                  value={item.notes ?? ""}
                                  onChange={(e) => setNotes(item.slug, e.target.value)}
                                  placeholder="Notas opcionales (modelo de vehículo, urgencia, accesorios…)"
                                  rows={2}
                                  maxLength={300}
                                  className="mt-3 resize-none text-xs"
                                />
                              </div>
                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="flex items-center rounded-lg border border-border">
                                  <button
                                    onClick={() => setQuantity(item.slug, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted rounded-l-lg"
                                    aria-label="Reducir"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="w-9 text-center text-sm font-semibold text-foreground">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => setQuantity(item.slug, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted rounded-r-lg"
                                    aria-label="Aumentar"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                                <button
                                  onClick={() => remove(item.slug)}
                                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                                >
                                  <Trash2 size={12} /> Quitar
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8"
                  >
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Datos de contacto y envío
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Solo lo justo para preparar tu presupuesto y enviarte la propuesta.
                    </p>

                    <div className="space-y-5">
                      <div>
                        <Label className="text-xs font-semibold text-foreground mb-2 block">
                          Soy
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["particular", "taller", "flota"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm({ ...form, tipo: t })}
                              className={`text-xs font-semibold py-2.5 rounded-lg border transition-all ${
                                form.tipo === t
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-muted-foreground border-border hover:border-primary/40"
                              }`}
                            >
                              {t === "particular"
                                ? "Particular"
                                : t === "taller"
                                  ? "Taller"
                                  : "Flota / Empresa"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          id="co-nombre"
                          label="Nombre *"
                          value={form.nombre}
                          onChange={(v) => setForm({ ...form, nombre: v })}
                          error={errors.nombre}
                          maxLength={100}
                          placeholder="Cómo te llamas"
                        />
                        <Field
                          id="co-empresa"
                          label="Empresa o taller"
                          value={form.empresa ?? ""}
                          onChange={(v) => setForm({ ...form, empresa: v })}
                          maxLength={120}
                          placeholder="Opcional"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          id="co-email"
                          label="Email *"
                          type="email"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          error={errors.email}
                          maxLength={255}
                          placeholder="tu@email.com"
                        />
                        <Field
                          id="co-tel"
                          label="Teléfono"
                          type="tel"
                          value={form.telefono ?? ""}
                          onChange={(v) => setForm({ ...form, telefono: v })}
                          maxLength={30}
                          placeholder="+34 600 000 000"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <Field
                            id="co-prov"
                            label="Provincia de envío"
                            value={form.envio_provincia ?? ""}
                            onChange={(v) => setForm({ ...form, envio_provincia: v })}
                            maxLength={80}
                            placeholder="Madrid, Barcelona…"
                          />
                        </div>
                        <Field
                          id="co-cp"
                          label="Código postal"
                          value={form.envio_cp ?? ""}
                          onChange={(v) => setForm({ ...form, envio_cp: v })}
                          maxLength={10}
                          placeholder="28001"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="co-msg" className="text-xs font-semibold text-foreground">
                          Comentarios para nuestro asesor
                        </Label>
                        <Textarea
                          id="co-msg"
                          rows={3}
                          maxLength={1000}
                          value={form.mensaje ?? ""}
                          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                          placeholder="Plazos, dudas técnicas, financiación, alquiler vs compra…"
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8"
                  >
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Revisa y envía
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Confirma que todo está correcto. Recibirás el presupuesto cerrado en menos de
                      24 h.
                    </p>

                    <div className="space-y-5 text-sm">
                      <Block
                        icon={<User size={15} />}
                        title="Contacto"
                        onEdit={() => setStep(1)}
                      >
                        <p className="font-semibold text-foreground">{form.nombre}</p>
                        <p className="text-muted-foreground">{form.email}</p>
                        {form.telefono && <p className="text-muted-foreground">{form.telefono}</p>}
                        {form.empresa && (
                          <p className="text-muted-foreground">Empresa: {form.empresa}</p>
                        )}
                        <p className="text-xs text-primary font-semibold mt-1 capitalize">
                          {form.tipo}
                        </p>
                      </Block>

                      {(form.envio_provincia || form.envio_cp) && (
                        <Block
                          icon={<Truck size={15} />}
                          title="Envío"
                          onEdit={() => setStep(1)}
                        >
                          <p className="text-foreground">
                            {form.envio_provincia}
                            {form.envio_cp && ` · CP ${form.envio_cp}`}
                          </p>
                        </Block>
                      )}

                      <Block
                        icon={<ShoppingBag size={15} />}
                        title={`Productos (${lineCount})`}
                        onEdit={() => setStep(0)}
                      >
                        <ul className="space-y-2">
                          {items.map((i) => (
                            <li
                              key={i.slug}
                              className="flex items-start justify-between gap-3 border-b border-border last:border-0 pb-2 last:pb-0"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate">{i.name}</p>
                                <p className="text-xs text-muted-foreground">{i.category}</p>
                                {i.notes && (
                                  <p className="text-xs text-muted-foreground mt-1 italic">
                                    “{i.notes}”
                                  </p>
                                )}
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-bold text-foreground">× {i.quantity}</p>
                                <p className="text-[11px] text-primary font-semibold">
                                  Consultar precio
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Block>

                      {form.mensaje && (
                        <Block
                          icon={<CheckCircle size={15} />}
                          title="Comentarios"
                          onEdit={() => setStep(1)}
                        >
                          <p className="text-foreground whitespace-pre-line">{form.mensaje}</p>
                        </Block>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NAV BUTTONS */}
              <div className="flex items-center justify-between mt-6">
                {step > 0 ? (
                  <Button variant="outline" onClick={goBack} disabled={submitting}>
                    <ArrowLeft size={15} className="mr-1.5" /> Atrás
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link to="/tienda">
                      <ArrowLeft size={15} className="mr-1.5" /> Seguir comprando
                    </Link>
                  </Button>
                )}
                {step < 2 ? (
                  <Button onClick={goNext} disabled={items.length === 0}>
                    Continuar <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                ) : (
                  <Button onClick={submitOrder} disabled={submitting} className="font-semibold">
                    {submitting ? "Enviando…" : "Enviar solicitud"}
                  </Button>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingBag size={16} className="text-primary" /> Resumen
                </h3>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aún no hay productos.</p>
                ) : (
                  <>
                    <ul className="space-y-3 mb-4 text-sm">
                      {items.map((i) => (
                        <li key={i.slug} className="flex justify-between gap-3">
                          <span className="text-foreground truncate">
                            <span className="font-semibold">{i.quantity}×</span> {i.name}
                          </span>
                          <span className="text-primary font-semibold whitespace-nowrap text-xs">
                            Consultar
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-border pt-3 flex justify-between text-sm">
                      <span className="text-muted-foreground">Total estimado</span>
                      <span className="font-bold text-primary">A presupuesto</span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">
                    <span className="font-semibold">Sin pago online.</span> Te confirmamos
                    disponibilidad y precio antes de cobrar.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Truck size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">
                    <span className="font-semibold">Envío a toda España.</span> Plazos según
                    producto y stock.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">
                    <span className="font-semibold">Asesor técnico real.</span> Respuesta en menos
                    de 24 h laborables.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  maxLength,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`h-10 ${error ? "border-destructive" : ""}`}
      />
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}

function Block({
  icon,
  title,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <span className="text-primary">{icon}</span> {title}
        </div>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Editar
          </button>
        )}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
