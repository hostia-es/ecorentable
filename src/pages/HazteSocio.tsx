import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { AnimatedSection } from "@/components/common/Animations";
import sociosPartnership from "@/assets/socios-partnership.jpg";

export default function HazteSocio() {
  const [tipo, setTipo] = useState("taller");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        title="Solicita unirte como socio"
        subtitle="Rellena el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas laborables."
        breadcrumbs={[{ label: "Socios", href: "/socios" }, { label: "Hazte socio" }]}
        badge="Programa de socios"
      />
      {/* PARTNERSHIP IMAGE */}
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
            {/* Formulario */}
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
                    <div className="flex gap-3 flex-wrap">
                      {["taller", "concesionario", "flota"].map((t) => (
                        <button key={t} type="button" onClick={() => setTipo(t)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize ${
                            tipo === t
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-foreground border-border hover:border-primary/50"
                          }`}>
                          {t === "taller" ? "Taller mecánico" : t === "concesionario" ? "Concesionario" : "Gestión de flotas"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "nombre", label: "Nombre del responsable *", placeholder: "Juan García", type: "text" },
                      { id: "empresa", label: "Nombre del taller/empresa *", placeholder: "Talleres García S.L.", type: "text" },
                      { id: "email", label: "Email de contacto *", placeholder: "juan@taller.com", type: "email" },
                      { id: "telefono", label: "Teléfono *", placeholder: "+34 600 000 000", type: "tel" },
                      { id: "ciudad", label: "Ciudad *", placeholder: "Madrid", type: "text" },
                      { id: "provincia", label: "Provincia *", placeholder: "Madrid", type: "text" },
                    ].map((f, i) => (
                      <motion.div
                        key={f.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs font-semibold mb-1 text-muted-foreground">{f.label}</label>
                        <input required id={f.id} type={f.type} placeholder={f.placeholder}
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary border-border bg-background text-foreground" />
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">Número de mecánicos en el taller</label>
                    <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none border-border bg-background text-foreground">
                      <option>1–2 mecánicos</option>
                      <option>3–5 mecánicos</option>
                      <option>6–10 mecánicos</option>
                      <option>+10 mecánicos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">¿Ya ofreces algún servicio de descarbonización?</label>
                    <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none border-border bg-background text-foreground">
                      <option>No, sería un servicio nuevo</option>
                      <option>Sí, limpieza química básica</option>
                      <option>Sí, tengo máquina descarbonizadora</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-muted-foreground">Comentarios adicionales</label>
                    <textarea rows={3} placeholder="Cuéntanos más sobre tu taller o tus necesidades específicas..."
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none border-border bg-background text-foreground" />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={15} /> Enviar solicitud
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Sidebar */}
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
