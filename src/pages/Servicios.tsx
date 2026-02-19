import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Shield, Wrench, Truck, Leaf, TrendingUp } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";

const faqServicios = [
  { question: "¿Cuál es la diferencia entre descarbonización y limpieza DPF?", answer: "La descarbonización trata el interior del motor (pistones, válvulas, EGR) eliminando depósitos de carbono mediante hidrógeno. La limpieza DPF/FAP es un servicio específico para el filtro de partículas, que puede hacerse por vía química, ultrasónica o combinada." },
  { question: "¿Es seguro para mi motor?", answer: "Sí. Los procesos que utilizamos no implican desmontaje de piezas ni agentes abrasivos. El hidrógeno actúa como un limpiador suave y eficaz, sin riesgo para juntas, retenes ni componentes electrónicos." },
  { question: "¿Se puede descarbonizar un motor nuevo?", answer: "En motores con menos de 20.000 km, la descarbonización no es necesaria. El servicio es más recomendable a partir de los 30.000–50.000 km, especialmente si se hace uso urbano predominante." },
  { question: "¿Qué garantía tiene el servicio?", answer: "Los centros certificados de Ecología Rentable ofrecen garantía sobre el proceso. Si los resultados no son satisfactorios (por ejemplo, el vehículo no mejora en emisiones ITV), se repite el tratamiento sin coste adicional." },
];

export default function Servicios() {
  return (
    <main>
      <PageHero
        title="Servicios de descarbonización profesional"
        subtitle="De la limpieza DPF/FAP al tratamiento EGR y la reducción de emisiones ITV. Soluciones para particulares, talleres y flotas."
        breadcrumbs={[{ label: "Servicios" }]}
        badge="Servicios"
      />

      {/* HUB DE SERVICIOS */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>
              ¿Qué incluye nuestro catálogo de servicios?
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Cubrimos todo el ciclo de mantenimiento del sistema de combustión y postratamiento de gases.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={22} />, title: "Descarbonización de motor", desc: "Eliminación de depósitos de carbono en pistones, cámara, válvulas y escape. Compatible con diésel, gasolina e híbridos.", href: "/servicios/descarbonizacion" },
              { icon: <Shield size={22} />, title: "Limpieza de filtros DPF/FAP", desc: "Regeneración profesional del filtro de partículas para recuperar la presión de escape y el rendimiento del motor.", href: "/servicios/limpieza-filtros" },
              { icon: <Leaf size={22} />, title: "Para particulares", desc: "Servicio dirigido al conductor particular que quiere mejorar el rendimiento, reducir el consumo o preparar la ITV.", href: "/servicios/particulares" },
              { icon: <Wrench size={22} />, title: "Para talleres", desc: "Equipos descarbonizadores, formación y soporte técnico para talleres que quieren ofrecer el servicio a sus clientes.", href: "/servicios/talleres" },
              { icon: <Truck size={22} />, title: "Para flotas", desc: "Planes de mantenimiento preventivo para flotas de empresa: mantenimiento programado, informes y presupuesto por vehículo.", href: "/servicios/flotas" },
              { icon: <TrendingUp size={22} />, title: "Reducción gases ITV", desc: "Descarbonización previa a la ITV para reducir emisiones por debajo de los límites exigidos en la inspección.", href: "/soluciones/itv-gases" },
            ].map((s) => (
              <Link key={s.href} to={s.href} className="card-eco p-6 flex flex-col gap-3 group">
                <div className="icon-circle w-11 h-11">{s.icon}</div>
                <h3 className="font-bold text-base" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: "hsl(var(--accent-green))" }}>
                  Ver servicio <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIACIÓN */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-3">¿Por qué Ecología Rentable?</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
                Diésel, gasolina e hidrógeno: lo cubrimos todo
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  "Descarbonización por hidrógeno (HHO): la técnica más eficaz y menos invasiva",
                  "Compatibilidad total con motores Euro 3, 4, 5 y 6d",
                  "Sin desmontaje de piezas: el vehículo está listo en 45–90 minutos",
                  "Red de más de 300 centros certificados en toda España",
                  "Formación técnica continua para todos los socios",
                  "Garantía de resultado: si no mejora, repetimos sin coste",
                ].map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-sm" style={{ color: "hsl(var(--foreground))" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Reducción de consumo", pct: 85, value: "hasta 15%" },
                { label: "Recuperación de potencia", pct: 75, value: "hasta 20%" },
                { label: "Reducción de humos", pct: 95, value: "hasta 70%" },
                { label: "Extensión vida DPF", pct: 80, value: "hasta 4x" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: "hsl(var(--foreground))" }}>{m.label}</span>
                    <span className="font-bold" style={{ color: "hsl(var(--primary))" }}>{m.value}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "hsl(var(--border))" }}>
                    <div className="h-2 rounded-full" style={{ width: `${m.pct}%`, background: "var(--gradient-primary)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>
              ¿Cómo es el proceso?
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: "Diagnóstico previo", desc: "El técnico lee los datos del vehículo con el escáner OBD2, registra el estado del motor y determina el servicio más adecuado." },
                { step: 2, title: "Descarbonización/limpieza", desc: "Se realiza el proceso elegido: hidrógeno HHO, tratamiento químico DPF, limpieza EGR o combinado. Sin desmontaje en la mayoría de casos." },
                { step: 3, title: "Verificación posterior", desc: "Se comprueba el resultado: lectura de gases, análisis OBD2 y prueba de conducción si es necesario." },
                { step: 4, title: "Informe y recomendaciones", desc: "El cliente recibe un informe del servicio realizado con los datos antes/después y las recomendaciones de mantenimiento." },
              ].map((s) => (
                <div key={s.step} className="flex gap-5 items-start">
                  <div className="step-number shrink-0">{s.step}</div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>¿Para quién son nuestros servicios?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Particulares", desc: "Conductores que notan pérdida de potencia, más consumo, humos o que quieren preparar la ITV.", cta: "Ver servicio particular", href: "/servicios/particulares" },
              { title: "Talleres", desc: "Mecánicos que quieren ofrecer descarbonización a sus clientes con equipo propio y soporte técnico.", cta: "Ver servicio taller", href: "/servicios/talleres" },
              { title: "Flotas", desc: "Empresas con flota de vehículos diésel que necesitan un plan de mantenimiento preventivo eficiente.", cta: "Ver servicio flotas", href: "/servicios/flotas" },
            ].map((p) => (
              <div key={p.title} className="card-eco p-6">
                <h3 className="font-bold text-lg mb-3" style={{ color: "hsl(var(--foreground))" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>{p.desc}</p>
                <Link to={p.href} className="btn-primary text-sm px-4 py-2">
                  {p.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqServicios} />

      <CTABox
        title="¿Dónde puedo hacer el servicio?"
        description="Encuentra el centro certificado más cercano a tu ubicación y solicita cita."
        primaryLabel="Encontrar un centro"
        primaryHref="/encuentre-centro"
        secondaryLabel="Hablar con un experto"
        secondaryHref="/contacto"
      />
    </main>
  );
}
