import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { AnimatedSection } from "@/components/common/Animations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import sociosPartnership from "@/assets/socios-partnership.jpg";

const TIPOS = [
  { id: "taller", label: "Taller mecánico" },
  { id: "concesionario", label: "Concesionario" },
  { id: "flota", label: "Empresa con flota" },
  { id: "distribuidor", label: "Distribuidor" },
] as const;

const SERVICIOS = [
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

const EQUIPOS = [
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

const MODALIDADES = ["Compra", "Alquiler", "Renting", "Reacondicionado", "No lo tengo claro"];

export default function HazteSocio() {
  const { toast } = useToast();
  const [tipo, setTipo] = useState<string>("taller");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    email: "",
    telefono: "",
    codigoPostal: "",
    servicio: SERVICIOS[0],
    equipo: EQUIPOS[0],
    modalidad: MODALIDADES[0],
    comentarios: "",
  });

  const buscaEquipo = form.equipo !== EQUIPOS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.negocio.trim() || !form.email.trim() || !form.telefono.trim() || !form.codigoPostal.trim()) return;
    setLoading(true);
    try {
      const notas = [
        `Tipo de colaboración: ${TIPOS.find((t) => t.id === tipo)?.label}`,
        `Negocio: ${form.negocio.trim()}`,
        `Código postal: ${form.codigoPostal.trim()}`,
        `Servicio de interés: ${form.servicio}`,
        `Equipo de interés: ${form.equipo}`,
        buscaEquipo && `Modalidad comercial: ${form.modalidad}`,
        form.comentarios.trim() && `Comentarios: ${form.comentarios.trim()}`,
      ].filter(Boolean).join("\n");

      const { error } = await supabase.from("leads").insert({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        servicio: `Socio · ${TIPOS.find((t) => t.id === tipo)?.label}`,
        origen: "Hazte socio B2B",
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

  return (
    <main>
      <PageHero
        title="Solicita unirte como socio"
        subtitle="Rellena el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas laborables."
        breadcrumbs={[{ label: "Socios", href: "/socios" }, { label: "Hazte socio" }]}
        badge="Programa de socios"
      />
      <section className="py-0 overflow-hidden">
        <img
          src={sociosPartnership}
          alt="Socios de Ecología Rentable cerrando acuerdo"
          className="w-full h-56 md:h-72 object-cover"
          loading="lazy"
        />
      </section>

      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <AnimatedSection className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-border shadow-md p-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary mx-auto mb-4"
                  >
                    <CheckCircle size={30} />
                  </motion.div>
                  <h2 className="text-xl font-bold mb-2 text-foreground">¡Solicitud enviada!</h2>
                  <p className="text-sm mb-6 text-muted-foreground">Nos pondremos en contacto contigo en menos de 24 horas laborables para concertar una visita técnica.</p>
                  <Link to="/socios" className="btn-primary text-sm px-4 py-2">Volver a socios <ArrowRight size={13} /></Link>
                </div>
              ) : (
                <form className="bg-white rounded-2xl border border-border shadow-md p-8 space-y-5 hover:shadow-lg transition-shadow duration-200" onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-foreground">Formulario de solicitud de socio</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Tipo de colaboración</label>
                    <div className="flex gap-2 flex-wrap">
                      {TIPOS.map((t) => (
                        <button key={t.id} type="button" onClick={() => setTipo(t.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            tipo === t.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-foreground border-border hover:border-primary/50"
                          }`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Nombre del responsable *</label>
                      <input required maxLength={100} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Juan García"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Nombre del negocio *</label>
                      <input required maxLength={150} value={form.negocio} onChange={(e) => setForm({ ...form, negocio: e.target.value })} placeholder="Talleres García S.L."
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Email de contacto *</label>
                      <input required type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="juan@taller.com"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Teléfono *</label>
                      <input required type="tel" maxLength={30} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+34 600 000 000"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Código postal *</label>
                      <input required maxLength={10} value={form.codigoPostal} onChange={(e) => setForm({ ...form, codigoPostal: e.target.value })} placeholder="28001"
                        className="w-full sm:w-1/2 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">¿Estás interesado en contratar algún servicio?</label>
                    <select value={form.servicio} onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none border-border bg-background text-foreground">
                      {SERVICIOS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">¿Estás interesado en algún equipo?</label>
                    <select value={form.equipo} onChange={(e) => setForm({ ...form, equipo: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none border-border bg-background text-foreground">
                      {EQUIPOS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {buscaEquipo && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <label className="block text-xs font-semibold mb-1 text-muted-foreground">Modalidad comercial</label>
                      <select value={form.modalidad} onChange={(e) => setForm({ ...form, modalidad: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none border-border bg-background text-foreground">
                        {MODALIDADES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">Comentarios adicionales</label>
                    <textarea rows={3} maxLength={1000} value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })}
                      placeholder="Cuéntanos más sobre tu negocio o tus necesidades específicas..."
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none border-border bg-background text-foreground" />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    <Send size={15} /> {loading ? "Enviando…" : "Enviar solicitud"}
                  </button>
                </form>
              )}
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-border shadow-md p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                <h3 className="font-bold mb-3 text-foreground">¿Qué pasa después?</h3>
                {["Recibes confirmación por email en menos de 1 hora", "Nuestro equipo te llama en 24h laborables", "Concertamos visita técnica gratuita", "Propuesta personalizada sin compromiso"].map((s, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2 mb-2"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="step-number w-6 h-6 text-xs shrink-0">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{s}</span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-border shadow-md p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                <h3 className="font-bold mb-3 text-foreground">Ventajas como socio</h3>
                {["Leads de clientes de tu zona", "Formación técnica incluida", "Material de marketing gratuito", "Soporte técnico dedicado", "Condiciones preferentes en consumibles"].map((v, i) => (
                  <motion.div
                    key={v}
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-sm text-foreground">{v}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
