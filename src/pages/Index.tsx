import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronDown, ChevronRight, Leaf, Zap, Shield, Wrench, TrendingUp, Truck, Star, CheckCircle, Search } from "lucide-react";
import { useState } from "react";

import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";
import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroMachineDark from "@/assets/hero-machine-dark.jpg";
import serviceWide from "@/assets/service-wide.jpg";
import engineDetail from "@/assets/engine-detail.jpg";
import engineBeforeAfter from "@/assets/engine-before-after.jpg";

/* ═══════════ WORLD MAP SVG COMPONENT ═══════════ */
function WorldMap() {
  const cities = [
    { name: "Madrid", x: "42.5%", y: "43%", main: true },
    { name: "Barcelona", x: "47.5%", y: "40%" },
    { name: "Valencia", x: "45.5%", y: "44.5%" },
    { name: "Sevilla", x: "41%", y: "47%" },
    { name: "Bilbao", x: "43.5%", y: "38.5%" },
    { name: "Zaragoza", x: "45%", y: "41%" },
    { name: "Lisboa", x: "39.5%", y: "44%", partner: true },
    { name: "Paris", x: "45%", y: "36%", partner: true },
  ];

  return (
    <div className="world-map-wrapper">
      <svg
        viewBox="0 0 1000 500"
        className="world-map-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* World landmasses — simplified paths */}
        <g className="landmass">
          {/* North America */}
          <path d="M 60 80 Q 80 60 120 65 Q 160 50 190 70 Q 220 90 230 120 Q 250 150 240 180 Q 230 210 200 230 Q 170 250 150 240 Q 120 250 100 230 Q 70 200 60 170 Q 40 130 60 80 Z" />
          <path d="M 130 220 Q 160 230 180 260 Q 190 290 170 310 Q 150 325 130 315 Q 110 300 115 275 Q 118 250 130 220 Z" />
          {/* South America */}
          <path d="M 170 320 Q 200 310 220 330 Q 250 360 255 400 Q 260 440 240 460 Q 215 475 195 465 Q 170 450 160 420 Q 148 385 155 355 Q 160 335 170 320 Z" />
          {/* Europe */}
          <path d="M 420 60 Q 450 50 480 65 Q 510 80 520 110 Q 530 140 515 165 Q 495 185 470 185 Q 445 180 430 165 Q 410 145 415 120 Q 418 90 420 60 Z" />
          {/* Iberian Peninsula highlight */}
          <path d="M 410 140 Q 430 130 455 135 Q 475 145 480 165 Q 485 185 470 200 Q 452 215 430 210 Q 408 200 405 180 Q 402 158 410 140 Z" className="iberia" />
          {/* Africa */}
          <path d="M 430 220 Q 465 210 500 225 Q 535 245 545 285 Q 555 330 545 370 Q 530 410 505 430 Q 478 445 450 440 Q 420 432 405 405 Q 388 370 390 330 Q 392 290 405 255 Q 415 232 430 220 Z" />
          {/* Asia */}
          <path d="M 540 60 Q 600 40 680 55 Q 750 70 800 100 Q 850 130 870 170 Q 885 210 870 245 Q 850 275 810 285 Q 770 295 730 280 Q 690 265 660 240 Q 620 210 590 180 Q 555 148 542 115 Q 530 85 540 60 Z" />
          {/* Australia */}
          <path d="M 760 320 Q 800 305 840 320 Q 875 338 885 375 Q 890 410 870 435 Q 845 455 810 450 Q 775 445 755 420 Q 735 390 740 355 Q 745 330 760 320 Z" />
        </g>

        {/* Connection lines from Madrid */}
        <g className="connection-lines">
          <line x1="425" y1="215" x2="395" y2="220" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="450" y2="200" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="475" y2="205" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="430" y2="193" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="450" y2="180" className="conn-line" />
        </g>

        {/* City pins */}
        {cities.map((city) => (
          <g key={city.name} className={`city-pin ${city.main ? "main-pin" : ""} ${city.partner ? "partner-pin" : ""}`}>
            <circle
              cx={city.x.replace("%", "") + "%"}
              cy={city.y.replace("%", "") + "%"}
              r={city.main ? "8" : "5"}
              className="pin-dot"
            />
            <circle
              cx={city.x.replace("%", "") + "%"}
              cy={city.y.replace("%", "") + "%"}
              r={city.main ? "16" : "10"}
              className="pin-ring"
            />
            {city.main && (
              <circle
                cx={city.x.replace("%", "") + "%"}
                cy={city.y.replace("%", "") + "%"}
                r="24"
                className="pin-ring-outer"
              />
            )}
          </g>
        ))}
      </svg>

      {/* Floating city labels */}
      <div className="map-pins-overlay">
        {cities.map((city) => (
          <div
            key={city.name + "-label"}
            className={`map-label ${city.main ? "map-label-main" : ""}`}
            style={{ left: city.x, top: city.y }}
          >
            <div className="map-label-dot" />
            <span>{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ FAQ ITEM ═══════════ */
function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b py-1" style={{ borderColor: "hsl(var(--border))" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-6"
        style={{ color: "hsl(var(--foreground))" }}
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "hsl(var(--muted-foreground))" }}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          {a}
        </p>
      )}
    </div>
  );
}

/* ═══════════ DATA ═══════════ */
const techTabs = [
  { icon: <Zap size={16} />, label: "Hidrógeno puro", sub: "Sin desmontaje de piezas" },
  { icon: <Shield size={16} />, label: "Limpieza DPF", sub: "Regeneración certificada" },
  { icon: <Wrench size={16} />, label: "EGR Control", sub: "Válvula y catalizador" },
  { icon: <TrendingUp size={16} />, label: "Energy Saving", sub: "Hasta 15% menos consumo" },
];

const serviceList = [
  { name: "Descarbonización diésel", sub: "Motores hasta 3.0L · desde 90 min", href: "/servicios/descarbonizacion" },
  { name: "Descarbonización gasolina", sub: "Motores 1.0–2.5L · desde 60 min", href: "/servicios/descarbonizacion" },
  { name: "Limpieza DPF / FAP", sub: "Regeneración sin desmontaje", href: "/servicios/limpieza-filtros" },
  { name: "Limpieza EGR + Catalizador", sub: "Diagnóstico + tratamiento completo", href: "/soluciones/limpieza-egr-catalizador" },
  { name: "Reducción gases ITV", sub: "CO, HC y NOx por debajo del límite", href: "/soluciones/itv-gases" },
];

const bigStats = [
  { value: "+300", label: "Centros activos" },
  { value: "+50K", label: "Motores tratados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "45min", label: "Duración media" },
];

const faqs = [
  { q: "¿Cada cuántos kilómetros se recomienda descarbonizar?", a: "En motores diésel, cada 30.000–50.000 km. En gasolina, cada 50.000–80.000 km. Con uso urbano predominante la periodicidad puede ser menor." },
  { q: "¿La descarbonización es compatible con todos los motores?", a: "Sí, es compatible con motores diésel y gasolina de todas las marcas y modelos. La técnica por hidrógeno es especialmente efectiva en motores con DPF/FAP y válvula EGR." },
  { q: "¿Es seguro para el motor? ¿Hay riesgos?", a: "El proceso es completamente seguro. El hidrógeno y el oxígeno generados se introducen en proporciones controladas. No hay riesgo de sobrepresión ni daño a juntas o sellos." },
  { q: "¿Puedo conducir el coche inmediatamente después?", a: "Sí. El vehículo está listo para circular nada más terminar el proceso, que no requiere ningún período de espera ni enfriamiento." },
];

const testimonials = [
  { name: "Andrés Martín", role: "Conductor particular", text: "Llevé el coche con la luz del DPF encendida. Salí del taller sin la avería y el coche empuja como nuevo. Increíble." },
  { name: "Patricia Vidal", role: "Responsable de flota", text: "Hemos reducido los incidentes con el filtro de partículas en un 60% desde que contratamos el mantenimiento preventivo. El servicio es serio y profesional." },
  { name: "Roberto Sanz", role: "Propietario de taller socio", text: "Recuperé la inversión en cuatro meses. Los clientes vienen específicamente a por la descarbonización. Es un diferencial real." },
];

/* ═══════════ PAGE ═══════════ */
export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════
          §1 HERO — split: image left / text right
      ══════════════════════════════════ */}
      <section style={{ background: "hsl(var(--background))" }}>
        <div className="grid lg:grid-cols-2 min-h-[92vh]">
          {/* LEFT: hero image */}
          <div className="relative overflow-hidden order-2 lg:order-1 min-h-[50vw] lg:min-h-0">
            <img
              src={heroMachineDark}
              alt="Máquina descarbonizadora profesional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(210 25% 5% / 0.6) 0%, transparent 55%)" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-semibold opacity-90">Redefiniendo el mantenimiento del motor</p>
              <p className="text-xs mt-1" style={{ color: "hsl(0 0% 70%)" }}>con tecnología de hidrógeno certificada</p>
            </div>
          </div>

          {/* RIGHT: text content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16">
            <h1 className="text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] mb-6" style={{ color: "hsl(var(--foreground))" }}>
              Motor más limpio con rendimiento que marca la diferencia.
            </h1>

            {/* 3 small thumbnails row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { src: tecnicoHyCarbon, label: "Técnico certificado" },
                { src: hyCaronAngle, label: "Equipo Hy-Carbon" },
                { src: diagnosticoMotor, label: "Diagnóstico digital" },
              ].map((img) => (
                <div key={img.label} className="relative overflow-hidden rounded-lg aspect-video">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-end p-2" style={{ background: "linear-gradient(to top, hsl(210 25% 8% / 0.7) 0%, transparent 60%)" }}>
                    <span className="text-white text-[10px] font-medium leading-tight">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-base mb-8 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
              Ecología Rentable especializada exclusivamente en descarbonización profesional de motores diésel y gasolina. Limpieza DPF/FAP, EGR y catalizador. Red de más de 300 centros certificados en toda España.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/encuentre-centro" className="btn-cta">
                Encontrar un centro <ArrowRight size={15} />
              </Link>
              <Link to="/socios/hazte-socio" className="btn-outline">
                Soy taller / Quiero ser socio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §2 TECH — tag + headline + 4 tabs + big image + 4 stats
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          {/* top label + 2-col intro */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · Nuestra tecnología
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Descarbonización inteligente,<br />impulsada por hidrógeno
              </h2>
            </div>
            <p className="flex-1 text-sm leading-relaxed md:max-w-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              La tecnología Hy-Carbon genera hidrógeno a partir del agua. Al introducir estos gases en el motor en funcionamiento, los depósitos de carbono se eliminan de forma natural, sin desmontaje ni productos químicos agresivos.
            </p>
          </div>

          {/* 4 tab-feature pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {techTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border"
                style={{
                  background: activeTab === i ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  borderColor: activeTab === i ? "hsl(var(--primary))" : "transparent",
                  color: activeTab === i ? "hsl(0 0% 100%)" : "hsl(var(--foreground))",
                }}
              >
                <span style={{ opacity: activeTab === i ? 1 : 0.6 }}>{tab.icon}</span>
                <div>
                  <p className="text-xs font-bold">{tab.label}</p>
                  <p className="text-[11px] opacity-70">{tab.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Big image card with overlay stat */}
          <div className="relative rounded-2xl overflow-hidden mb-12" style={{ background: "hsl(var(--muted))" }}>
            <img
              src={serviceWide}
              alt="Servicio de descarbonización profesional"
              className="w-full h-72 md:h-[420px] object-cover"
            />
            {/* Floating UI card — like the 80% card in reference */}
            <div
              className="absolute top-6 right-6 md:top-8 md:right-8 p-5 rounded-2xl w-44 shadow-2xl"
              style={{ background: "hsl(0 0% 100% / 0.95)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Rendimiento</p>
              <div className="text-4xl font-bold mb-2" style={{ color: "hsl(var(--primary))" }}>+20%</div>
              <div className="w-full rounded-full h-2 mb-3" style={{ background: "hsl(var(--muted))" }}>
                <div className="h-2 rounded-full" style={{ width: "72%", background: "hsl(var(--primary))" }} />
              </div>
              <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>Recuperación de potencia media</p>
            </div>
          </div>

          {/* 4 Big stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t" style={{ borderColor: "hsl(var(--border))" }}>
            {bigStats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>{s.value}</div>
                <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §3 LINEUP — dark bg, full-width image, service list
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "hsl(210 25% 6%)" }}>
        {/* Background image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={tecnicoHyCarbon} alt="Técnico Ecología Rentable" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(210 25% 6% / 0.3) 0%, hsl(210 25% 6%) 95%)" }} />
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="container mx-auto">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(148 60% 55%)" }}>· Nuestros servicios</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Encuentra el servicio<br />perfecto para tu motor</h2>
            </div>
          </div>
        </div>

        {/* Search + list card */}
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-2xl">
            {/* search bar */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2" style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.12)" }}>
              <Search size={16} style={{ color: "hsl(0 0% 50%)" }} />
              <span className="text-sm" style={{ color: "hsl(0 0% 50%)" }}>Buscar por servicio o tipo de motor…</span>
              <Link to="/servicios" className="ml-auto text-xs font-semibold px-4 py-2 rounded-lg" style={{ background: "hsl(var(--cta))", color: "hsl(var(--cta-foreground))" }}>
                Buscar
              </Link>
            </div>

            {/* Popular label */}
            <p className="text-[10px] font-bold tracking-wider uppercase mb-3 mt-5" style={{ color: "hsl(0 0% 40%)" }}>Servicios principales</p>

            {/* Service list rows */}
            <div className="space-y-1">
              {serviceList.map((s, i) => (
                <Link
                  key={s.name}
                  to={s.href}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl group transition-all duration-200"
                  style={{ background: "hsl(0 0% 100% / 0.04)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(148 65% 22% / 0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(0 0% 100% / 0.04)"; }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: "hsl(0 0% 100% / 0.08)", color: "hsl(148 60% 55%)" }}>
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs" style={{ color: "hsl(0 0% 50%)" }}>{s.sub}</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(148 60% 55%)" }} />
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/encuentre-centro" className="text-sm font-semibold flex items-center gap-2" style={{ color: "hsl(148 60% 55%)" }}>
                Ver todos los centros por provincia <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §4 IMPACTO REAL — editorial layout
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          {/* top row */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · El impacto real
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Resultados reales,<br />demostrados
              </h2>
            </div>
            <p className="flex-1 text-sm leading-relaxed md:max-w-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Hemos comprobado con nuestros propios ojos cómo la descarbonización transforma la respuesta del motor, reduce las emisiones y alarga la vida de componentes clave como el DPF.
            </p>
          </div>

          {/* Large editorial image */}
          <div className="relative rounded-2xl overflow-hidden mb-5">
            <img src={engineDetail} alt="Detalle de motor descarbonizado" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(to top, hsl(210 25% 6% / 0.9) 0%, transparent 55%)" }}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white font-bold text-lg mb-1">Tecnología Hy-Carbon Connect</p>
                  <p className="text-sm" style={{ color: "hsl(0 0% 65%)" }}>Motor limpio sin desmontaje · resultados en 45–90 min</p>
                </div>
                <Link to="/servicios/descarbonizacion" className="hidden md:flex items-center gap-2 text-sm font-semibold" style={{ color: "hsl(148 65% 55%)" }}>
                  Saber más <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* 2 col images */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative rounded-2xl overflow-hidden h-56">
              <img src={engineBeforeAfter} alt="Motor antes y después" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: "linear-gradient(to top, hsl(210 25% 6% / 0.9) 0%, transparent 55%)" }}>
                <span className="text-white text-3xl font-bold">-70%</span>
                <p className="text-xs mt-1" style={{ color: "hsl(0 0% 65%)" }}>reducción máxima en emisiones de humos negros</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-56" style={{ background: "hsl(var(--muted))" }}>
              <img src={hyCaronFront} alt="Hy-Carbon Connect equipo frontal" className="w-full h-full object-contain p-6" />
              <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: "linear-gradient(to top, hsl(148 65% 10% / 0.85) 0%, transparent 55%)" }}>
                <span className="text-white text-lg font-bold">Hy-Carbon Connect</span>
                <p className="text-xs mt-1" style={{ color: "hsl(148 60% 70%)" }}>La máquina más avanzada de la red</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §5 FAQ — left headline + right accordion
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Left */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--foreground))" }}>
                Preguntas<br />frecuentes
              </h2>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
              >
                Pregúntanos
              </Link>
            </div>
            {/* Right */}
            <div className="lg:col-span-3">
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §6 TESTIMONIOS — 3 col star cards
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            · Testimonios de clientes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Lo que dicen nuestros clientes<br />y socios
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl border" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="hsl(48 96% 53%)" style={{ color: "hsl(48 96% 53%)" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "hsl(var(--foreground))" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "hsl(var(--primary))" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §7 JOIN CTA + WORLD MAP
      ══════════════════════════════════ */}
      <section className="py-20 pb-0" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6 text-center mb-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            · Únete al movimiento
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Únete al movimiento global hacia un motor más limpio
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Encuentra el centro más cercano o conviértete en socio y ofrece el servicio en tu taller.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/encuentre-centro" className="btn-cta">
              <MapPin size={16} /> Encontrar un centro
            </Link>
          </div>
        </div>

        {/* WORLD MAP */}
        <WorldMap />
      </section>

      {/* ══════════════════════════════════
          §8 FOOTER — brand + links
      ══════════════════════════════════ */}
      <section style={{ background: "hsl(var(--background))" }} className="pb-12 pt-6">
        <div className="container mx-auto px-6">
          <div className="border-t pt-10 grid md:grid-cols-5 gap-8" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Leaf size={18} style={{ color: "hsl(var(--primary))" }} />
                <span className="font-bold text-lg" style={{ color: "hsl(var(--foreground))" }}>Ecología Rentable</span>
              </div>
              <p className="text-xs leading-relaxed max-w-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Especialistas en descarbonización profesional de motores. Red de más de 300 centros certificados en España.
              </p>
            </div>
            {[
              { title: "Servicios", links: [["Descarbonización", "/servicios/descarbonizacion"], ["Limpieza DPF", "/servicios/limpieza-filtros"], ["Flotas", "/servicios/flotas"], ["Particulares", "/servicios/particulares"]] },
              { title: "Soluciones", links: [["Motor diésel", "/soluciones/descarbonizacion-motor-diesel"], ["Hidrógeno", "/soluciones/descarbonizacion-hidrogeno"], ["EGR", "/soluciones/limpieza-egr-catalizador"], ["ITV Gases", "/soluciones/itv-gases"]] },
              { title: "Empresa", links: [["Nosotros", "/nosotros"], ["Socios", "/socios"], ["Blog", "/blog"], ["Contacto", "/contacto"]] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--foreground))" }}>{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link to={href} className="text-xs transition-colors hover:text-current" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>© 2025 Ecología Rentable. Todos los derechos reservados.</p>
            <div className="flex gap-5">
              {[["Accesibilidad", "/accesibilidad"], ["Contacto", "/contacto"]].map(([l, h]) => (
                <Link key={h} to={h} className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
