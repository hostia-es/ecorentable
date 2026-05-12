import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import teamContacto from "@/assets/team-contacto.jpg";

const faqContacto = [
  { question: "¿Con qué rapidez responden?", answer: "Respondemos todos los mensajes en un máximo de 24 horas laborables. Para consultas urgentes, le recomendamos llamar directamente al teléfono de atención." },
  { question: "¿Puedo solicitar un presupuesto para mi flota?", answer: "Sí. Selecciona el tipo 'Flota' en el formulario e indica el número de vehículos. Te preparamos un presupuesto personalizado en 48 horas." },
  { question: "¿Puedo contactar directamente con un taller socio?", answer: "Sí. Puedes llamarnos al +34 605 928 626 y te pondremos en contacto con el taller certificado más cercano a tu zona." },
];

const channels = [
  { icon: <Phone size={20} />, title: "Teléfono", val: "+34 605 928 626", sub: "Lun–Vie 9:00–19:00" },
  { icon: <Mail size={20} />, title: "Email", val: "info@ecologiarentable.es", sub: "Respuesta en <24 h" },
  { icon: <MapPin size={20} />, title: "Oficina", val: "C. de Fuerteventura, 28703 San Sebastián de los Reyes, Madrid", sub: "Con cita previa" },
  { icon: <Clock size={20} />, title: "Horario", val: "Lun–Vie 9:00–19:00", sub: "Sáb–Dom cerrado" },
];

export default function Contacto() {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const initialIntent = params.get("intent") || ""; // e.g. presupuesto, alquiler, socio, demo
  const item = params.get("item") || ""; // e.g. h2-profit-2000
  const initialTipo = params.get("tipo") === "taller" || params.get("tipo") === "flota" ? params.get("tipo")! : "particular";
  const [tipo, setTipo] = useState(initialTipo);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    flotaTam: "1-10",
    asunto: item || initialIntent
      ? `${initialIntent ? `[${initialIntent.toUpperCase()}] ` : ""}${item ? `Producto/servicio: ${item}\n` : ""}`
      : "",
  });

  useEffect(() => {
    if (initialIntent || item) {
      setForm((f) => ({
        ...f,
        asunto:
          (initialIntent ? `[${initialIntent.toUpperCase()}] ` : "") +
          (item ? `Producto/servicio: ${item}\n` : "") +
          (f.asunto && !f.asunto.startsWith("[") ? f.asunto : ""),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const notas = [
        initialIntent && `Intención: ${initialIntent}`,
        item && `Item: ${item}`,
        form.provincia && `Provincia: ${form.provincia}`,
        tipo === "flota" && `Flota: ${form.flotaTam} vehículos`,
        form.asunto && `Mensaje: ${form.asunto}`,
      ]
        .filter(Boolean)
        .join("\n");
      const { error } = await supabase.from("leads").insert({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono || null,
        servicio: tipo,
        origen: initialIntent ? `Web · ${initialIntent}` : "Formulario Web",
        notas,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: "No pudimos enviar tu mensaje",
        description: err.message || "Intenta de nuevo en unos instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <PageHero
        title="Contacta con nosotros"
        subtitle="Resolvemos tus dudas sobre descarbonización, filtros DPF, servicio de flotas o el programa de socios. Respondemos en menos de 24 horas."
        breadcrumbs={[{ label: "Contacto" }]}
        badge="Contacto"
      />

      {/* CANALES */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {channels.map((c) => (
              <motion.div key={c.title} variants={staggerItem}>
                <Card className="text-center h-full hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200">
                  <CardContent className="p-5 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary">{c.icon}</div>
                    <div className="font-bold text-sm text-foreground">{c.title}</div>
                    <div className="text-sm font-semibold text-primary">{c.val}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* TEAM IMAGE */}
      <section className="py-0 overflow-hidden">
        <img
          src={teamContacto}
          alt="Equipo profesional de Ecología Rentable"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />
      </section>

      {/* CHECKLIST */}
      <section className="py-10 section-alt">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 text-foreground">Antes de escribir, ¿has revisado…?</h3>
                {[
                  { label: "Nuestra sección de Soluciones", href: "/soluciones", hint: "Si tienes una pregunta técnica sobre DPF, EGR o descarbonización" },
                  { label: "El Blog", href: "/blog", hint: "Con guías y artículos técnicos detallados" },
                  { label: "Socios", href: "/socios", hint: "Si eres taller y quieres conocer nuestro modelo de negocio" },
                  { label: "Hazte socio", href: "/socios/hazte-socio", hint: "Si eres taller y quieres unirte a la red" },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    className="flex items-start gap-2 mb-2"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle size={14} className="shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm">
                      <Link to={item.href} className="font-semibold underline text-primary">{item.label}</Link>
                      <span className="text-muted-foreground"> — {item.hint}</span>
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <AnimatedSection className="lg:col-span-3">
              {submitted ? (
                <Card className="text-center">
                  <CardContent className="p-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary mx-auto mb-4"
                    >
                      <CheckCircle size={28} />
                    </motion.div>
                    <h2 className="text-xl font-bold mb-2 text-foreground">¡Mensaje enviado!</h2>
                    <p className="text-sm mb-5 text-muted-foreground">Te responderemos en menos de 24 horas laborables.</p>
                    <Button asChild>
                      <Link to="/">Volver al inicio</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <h2 className="text-xl font-bold text-foreground">Formulario de contacto</h2>
                      {(initialIntent || item) && (
                        <div className="text-xs rounded-md px-3 py-2 bg-primary/10 text-primary">
                          {initialIntent && <span className="font-semibold uppercase">{initialIntent}</span>}
                          {item && <span> · {item}</span>}
                        </div>
                      )}

                      <div>
                        <Label className="mb-2 block">Soy…</Label>
                        <div className="flex gap-3 flex-wrap">
                          {(["particular", "taller", "flota"] as const).map((t) => (
                            <Button
                              key={t}
                              type="button"
                              variant={tipo === t ? "default" : "outline"}
                              size="sm"
                              onClick={() => setTipo(t)}
                            >
                              {t === "particular" ? "Conductor particular" : t === "taller" ? "Taller mecánico" : "Gestor de flota"}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="nombre">Nombre *</Label>
                          <Input id="nombre" required maxLength={100} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="tel">Teléfono</Label>
                          <Input id="tel" type="tel" maxLength={30} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+34 600 000 000" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="provincia">Provincia</Label>
                          <Input id="provincia" maxLength={60} value={form.provincia} onChange={(e) => setForm({ ...form, provincia: e.target.value })} placeholder="Madrid" />
                        </div>
                      </div>

                      {tipo === "flota" && (
                        <div className="space-y-1.5">
                          <Label>Número de vehículos en la flota</Label>
                          <Select value={form.flotaTam} onValueChange={(v) => setForm({ ...form, flotaTam: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1–10 vehículos</SelectItem>
                              <SelectItem value="11-50">11–50 vehículos</SelectItem>
                              <SelectItem value="50+">+50 vehículos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <Label htmlFor="asunto">Asunto / motivo de consulta *</Label>
                        <Textarea id="asunto" required rows={4} maxLength={1500} value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })} placeholder="Describe tu consulta o necesidad..." />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        <Send size={15} className="mr-1" /> {loading ? "Enviando…" : "Enviar mensaje"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-2 space-y-5">
              <Card className="hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-foreground">¿Eres taller?</h3>
                  <p className="text-sm mb-3 text-muted-foreground">Únete a nuestra red de socios y ofrece servicios de descarbonización a tus clientes.</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/socios">Hazte socio <ArrowRight size={13} className="ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-foreground">Formulario de socio</h3>
                  <p className="text-sm mb-3 text-muted-foreground">Si quieres unirte a nuestra red de socios, rellena el formulario específico para obtener una propuesta personalizada.</p>
                  <Button asChild size="sm">
                    <Link to="/socios/hazte-socio">Formulario de socio <ArrowRight size={13} className="ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FAQSection items={faqContacto} />
    </main>
  );
}
