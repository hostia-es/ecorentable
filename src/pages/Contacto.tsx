import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/common/FAQSection";

const faqContacto = [
  { question: "¿Con qué rapidez responden?", answer: "Respondemos todos los mensajes en un máximo de 24 horas laborables. Para consultas urgentes, le recomendamos llamar directamente al teléfono de atención." },
  { question: "¿Puedo solicitar un presupuesto para mi flota?", answer: "Sí. Selecciona el tipo 'Flota' en el formulario e indica el número de vehículos. Te preparamos un presupuesto personalizado en 48 horas." },
  { question: "¿Puedo contactar directamente con el centro de mi provincia?", answer: "Sí. En la sección 'Encuentra un centro' puedes ver el teléfono de cada centro certificado y contactar directamente para solicitar cita." },
];

export default function Contacto() {
  const [tipo, setTipo] = useState("particular");
  const [submitted, setSubmitted] = useState(false);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Phone size={20} />, title: "Teléfono", val: "+34 900 123 456", sub: "Lun–Vie 8:00–18:00" },
              { icon: <Mail size={20} />, title: "Email", val: "info@ecologiarentable.es", sub: "Respuesta en <24 h" },
              { icon: <MapPin size={20} />, title: "Oficina", val: "Madrid, España", sub: "Con cita previa" },
              { icon: <Clock size={20} />, title: "Horario", val: "Lun–Vie 8:00–18:00", sub: "Sáb 9:00–13:00" },
            ].map((c) => (
              <div key={c.title} className="card-eco p-5 flex flex-col items-center text-center gap-2">
                <div className="icon-circle w-11 h-11">{c.icon}</div>
                <div className="font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>{c.title}</div>
                <div className="text-sm font-semibold" style={{ color: "hsl(var(--primary))" }}>{c.val}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST ANTES DE ESCRIBIR */}
      <section className="py-10 section-alt">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card-eco p-6">
            <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Antes de escribir, ¿has revisado…?</h3>
            {[
              { label: "Nuestra sección de Soluciones", href: "/soluciones", hint: "Si tienes una pregunta técnica sobre DPF, EGR o descarbonización" },
              { label: "El Blog", href: "/blog", hint: "Con guías y artículos técnicos detallados" },
              { label: "Encuentre un centro", href: "/encuentre-centro", hint: "Para localizar el taller más cercano" },
              { label: "Hazte socio", href: "/socios/hazte-socio", hint: "Si eres taller y quieres unirte a la red" },
            ].map((item) => (
              <div key={item.href} className="flex items-start gap-2 mb-2">
                <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                <span className="text-sm">
                  <Link to={item.href} className="font-semibold underline" style={{ color: "hsl(var(--primary))" }}>{item.label}</Link>
                  <span style={{ color: "hsl(var(--muted-foreground))" }}> — {item.hint}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card-eco p-10 text-center">
                  <div className="icon-circle w-16 h-16 mx-auto mb-4"><CheckCircle size={28} /></div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>¡Mensaje enviado!</h2>
                  <p className="text-sm mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>Te responderemos en menos de 24 horas laborables.</p>
                  <Link to="/" className="btn-primary text-sm px-4 py-2">Volver al inicio</Link>
                </div>
              ) : (
                <form className="card-eco p-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Formulario de contacto</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Soy…</label>
                    <div className="flex gap-3 flex-wrap">
                      {["particular", "taller", "flota"].map((t) => (
                        <button key={t} type="button" onClick={() => setTipo(t)}
                          className="px-4 py-2 rounded-md text-sm font-medium border transition-all capitalize"
                          style={tipo === t ? { background: "hsl(var(--primary))", color: "white", borderColor: "hsl(var(--primary))" } : { background: "transparent", color: "hsl(var(--foreground))", borderColor: "hsl(var(--border))" }}>
                          {t === "particular" ? "Conductor particular" : t === "taller" ? "Taller mecánico" : "Gestor de flota"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "nombre", label: "Nombre *", placeholder: "Tu nombre", type: "text" },
                      { id: "email", label: "Email *", placeholder: "tu@email.com", type: "email" },
                      { id: "tel", label: "Teléfono", placeholder: "+34 600 000 000", type: "tel" },
                      { id: "provincia", label: "Provincia", placeholder: "Madrid", type: "text" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>{f.label}</label>
                        <input required={f.id !== "tel" && f.id !== "provincia"} type={f.type} placeholder={f.placeholder}
                          className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                      </div>
                    ))}
                  </div>

                  {tipo === "flota" && (
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Número de vehículos en la flota</label>
                      <select className="w-full rounded-md border px-3 py-2 text-sm outline-none" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                        <option>1–10 vehículos</option><option>11–50 vehículos</option><option>+50 vehículos</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Asunto / motivo de consulta *</label>
                    <textarea required rows={4} placeholder="Describe tu consulta o necesidad..."
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none resize-none"
                      style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={15} /> Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="card-eco p-6">
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Áreas de servicio</h3>
                <p className="text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Tenemos centros certificados en toda la geografía española. Consulta el directorio por provincia.</p>
                <Link to="/encuentre-centro" className="btn-secondary text-sm px-4 py-2 inline-flex">Ver directorio <ArrowRight size={13} /></Link>
              </div>
              <div className="card-eco p-6">
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Eres taller?</h3>
                <p className="text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Si quieres unirte a nuestra red de socios, rellena el formulario específico para obtener una propuesta personalizada.</p>
                <Link to="/socios/hazte-socio" className="btn-primary text-sm px-4 py-2 inline-flex">Formulario de socio <ArrowRight size={13} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqContacto} />
    </main>
  );
}
