import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Send } from "lucide-react";
import PageHero from "@/components/common/PageHero";

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

      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Formulario */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card-eco p-10 text-center">
                  <div className="icon-circle w-16 h-16 mx-auto mb-4"><CheckCircle size={30} /></div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>¡Solicitud enviada!</h2>
                  <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>Nos pondremos en contacto contigo en menos de 24 horas laborables para concertar una visita técnica.</p>
                  <Link to="/socios" className="btn-primary text-sm px-4 py-2">Volver a socios <ArrowRight size={13} /></Link>
                </div>
              ) : (
                <form className="card-eco p-8 space-y-5" onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Formulario de solicitud de socio</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>Tipo de colaboración</label>
                    <div className="flex gap-3 flex-wrap">
                      {["taller", "concesionario", "flota"].map((t) => (
                        <button key={t} type="button" onClick={() => setTipo(t)}
                          className="px-4 py-2 rounded-md text-sm font-medium border transition-all capitalize"
                          style={tipo === t ? { background: "hsl(var(--primary))", color: "white", borderColor: "hsl(var(--primary))" } : { background: "transparent", color: "hsl(var(--foreground))", borderColor: "hsl(var(--border))" }}>
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
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>{f.label}</label>
                        <input required id={f.id} type={f.type} placeholder={f.placeholder}
                          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Número de mecánicos en el taller</label>
                    <select className="w-full rounded-md border px-3 py-2 text-sm outline-none" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
                      <option>1–2 mecánicos</option>
                      <option>3–5 mecánicos</option>
                      <option>6–10 mecánicos</option>
                      <option>+10 mecánicos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>¿Ya ofreces algún servicio de descarbonización?</label>
                    <select className="w-full rounded-md border px-3 py-2 text-sm outline-none" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
                      <option>No, sería un servicio nuevo</option>
                      <option>Sí, limpieza química básica</option>
                      <option>Sí, tengo máquina descarbonizadora</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Comentarios adicionales</label>
                    <textarea rows={3} placeholder="Cuéntanos más sobre tu taller o tus necesidades específicas..."
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none resize-none"
                      style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={15} /> Enviar solicitud
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card-eco p-6">
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Qué pasa después?</h3>
                {["Recibes confirmación por email en menos de 1 hora", "Nuestro equipo te llama en 24h laborables", "Concertamos visita técnica gratuita", "Propuesta personalizada sin compromiso"].map((s, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="step-number w-6 h-6 text-xs shrink-0">{i + 1}</span>
                    <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="card-eco p-6">
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Ventajas como socio</h3>
                {["Leads de clientes de tu zona", "Formación técnica incluida", "Material de marketing gratuito", "Soporte técnico dedicado", "Condiciones preferentes en consumibles"].map((v) => (
                  <div key={v} className="flex items-center gap-2 mb-2">
                    <CheckCircle size={13} style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-sm" style={{ color: "hsl(var(--foreground))" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
