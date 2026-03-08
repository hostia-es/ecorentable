import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronDown, ChevronRight, Zap, Shield, Wrench, TrendingUp, Star, CheckCircle, Search, Clock, Fuel, Gauge, Users, Award, Phone, Mail } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";
import { useState } from "react";

import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";
import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroMachineDark from "@/assets/hero-machine-dark.jpg";
import serviceWide from "@/assets/service-wide.jpg";
import engineDetail from "@/assets/engine-detail.jpg";
import engineBeforeAfter from "@/assets/engine-before-after.jpg";
import maquinaDescarbonizadora from "@/assets/maquina-descarbonizadora.jpg";
import kitDigitalBanner from "@/assets/kit-digital-banner.png";

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
      <svg viewBox="0 0 1000 500" className="world-map-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="landmass">
          <path d="M 60 80 Q 80 60 120 65 Q 160 50 190 70 Q 220 90 230 120 Q 250 150 240 180 Q 230 210 200 230 Q 170 250 150 240 Q 120 250 100 230 Q 70 200 60 170 Q 40 130 60 80 Z" />
          <path d="M 130 220 Q 160 230 180 260 Q 190 290 170 310 Q 150 325 130 315 Q 110 300 115 275 Q 118 250 130 220 Z" />
          <path d="M 170 320 Q 200 310 220 330 Q 250 360 255 400 Q 260 440 240 460 Q 215 475 195 465 Q 170 450 160 420 Q 148 385 155 355 Q 160 335 170 320 Z" />
          <path d="M 420 60 Q 450 50 480 65 Q 510 80 520 110 Q 530 140 515 165 Q 495 185 470 185 Q 445 180 430 165 Q 410 145 415 120 Q 418 90 420 60 Z" />
          <path d="M 410 140 Q 430 130 455 135 Q 475 145 480 165 Q 485 185 470 200 Q 452 215 430 210 Q 408 200 405 180 Q 402 158 410 140 Z" className="iberia" />
          <path d="M 430 220 Q 465 210 500 225 Q 535 245 545 285 Q 555 330 545 370 Q 530 410 505 430 Q 478 445 450 440 Q 420 432 405 405 Q 388 370 390 330 Q 392 290 405 255 Q 415 232 430 220 Z" />
          <path d="M 540 60 Q 600 40 680 55 Q 750 70 800 100 Q 850 130 870 170 Q 885 210 870 245 Q 850 275 810 285 Q 770 295 730 280 Q 690 265 660 240 Q 620 210 590 180 Q 555 148 542 115 Q 530 85 540 60 Z" />
          <path d="M 760 320 Q 800 305 840 320 Q 875 338 885 375 Q 890 410 870 435 Q 845 455 810 450 Q 775 445 755 420 Q 735 390 740 355 Q 745 330 760 320 Z" />
        </g>
        <g className="connection-lines">
          <line x1="425" y1="215" x2="395" y2="220" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="450" y2="200" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="475" y2="205" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="430" y2="193" className="conn-line" strokeDasharray="4 4" />
          <line x1="425" y1="215" x2="450" y2="180" className="conn-line" />
        </g>
        {cities.map((city) => (
          <g key={city.name} className={`city-pin ${city.main ? "main-pin" : ""} ${city.partner ? "partner-pin" : ""}`}>
            <circle cx={city.x} cy={city.y} r={city.main ? "8" : "5"} className="pin-dot" />
            <circle cx={city.x} cy={city.y} r={city.main ? "16" : "10"} className="pin-ring" />
            {city.main && <circle cx={city.x} cy={city.y} r="24" className="pin-ring-outer" />}
          </g>
        ))}
      </svg>
      <div className="map-pins-overlay">
        {cities.map((city) => (
          <div key={city.name + "-label"} className={`map-label ${city.main ? "map-label-main" : ""}`} style={{ left: city.x, top: city.y }}>
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
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left gap-6" style={{ color: "hsl(var(--foreground))" }}>
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown size={16} className="shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "hsl(var(--muted-foreground))" }} />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{a}</p>
      )}
    </div>
  );
}

/* ═══════════ DATA ═══════════ */
const heroMicrocopy = [
  { icon: <Zap size={16} />, text: "Hasta un 15% menos de consumo de combustible tras el tratamiento" },
  { icon: <Wrench size={16} />, text: "Sin desmontar el motor — proceso completo en menos de 60 minutos" },
  { icon: <Shield size={16} />, text: "Reducción de emisiones contaminantes de hasta un 20%" },
];

const heroStats = [
  { value: "10+", label: "Años de experiencia" },
  { value: "500+", label: "Máquinas en servicio" },
  { value: "50K+", label: "Vehículos tratados" },
  { value: "45K+", label: "Clientes satisfechos" },
];

const aboutBullets = [
  "Recuperas la potencia original del motor",
  "Reduces el consumo de combustible de forma medible",
  "Evitas averías que pueden costarte entre 350 € y 2.000 €",
  "Pasas la ITV sin sustos en la prueba de gases",
];

const hyCarbonFeatures = [
  { title: "Diagnóstico personalizado", desc: "Medición del estado real del motor antes del tratamiento. Sabes exactamente qué hay dentro antes de empezar." },
  { title: "Limpieza profunda sin desmontaje", desc: "El gas HHO limpia válvulas EGR, colectores, inyectores, pistones, turbo y FAP. Sin abrir el motor. Sin piezas sustituidas por error." },
  { title: "Proceso en menos de 60 minutos", desc: "El motor funciona al ralentí durante todo el tratamiento. Entregas el coche y lo recoges en el mismo día." },
  { title: "Hasta un 15% de ahorro en combustible", desc: "Un motor limpio aprovecha mejor la mezcla aire-combustible. El ahorro empieza a notarse en los próximos depósitos." },
  { title: "Facilita el paso por la ITV", desc: "Reducción de NOx, CO₂ y partículas sólidas. El tratamiento es especialmente efectivo como preparación para la prueba de gases." },
  { title: "Informe antes y después", desc: "Documentamos los valores de emisiones y estado del motor antes y después del tratamiento. La mejora queda registrada, no es una suposición." },
];

const processSteps = [
  { num: "01", title: "Evaluación inicial", desc: "Conectamos el vehículo a diagnosis antes de tocar nada. Medimos emisiones, comprobamos el estado del motor y detectamos el nivel real de obstrucción. Si no tiene sentido tratarlo, te lo decimos antes de cobrar." },
  { num: "02", title: "Tratamiento Hy-Carbon Connect", desc: "Inyección controlada de gas HHO en el sistema de admisión. El hidrógeno reacciona con la carbonilla y la elimina sin productos químicos agresivos ni intervención mecánica. El motor sigue encendido durante todo el proceso." },
  { num: "03", title: "Limpieza profesional del FAP", desc: "Utilizamos la estación Carbon FAP para eliminar residuos, hollín y partículas acumuladas en el filtro. Ciclo automatizado adaptado al nivel de obstrucción real de cada vehículo." },
  { num: "04", title: "Informe y recomendaciones", desc: "Entregamos un informe con los datos antes y después del tratamiento. Más las recomendaciones específicas para mantener el motor en ese estado el mayor tiempo posible." },
];

const carbonFapBullets = [
  { title: "Cubierta protectora", desc: "Aísla y fija el filtro durante el proceso. Sin derrames, sin riesgos." },
  { title: "Ciclo automatizado", desc: "Adaptado al nivel de obstrucción real del FAP. Sin decisiones a ojo." },
  { title: "Resultado certificado", desc: "Producto sin disolventes, homologado y seguro para la cerámica del filtro." },
];

const faqs = [
  { q: "¿En qué consiste la descarbonización con hidrógeno?", a: "Es un proceso de limpieza interna del motor mediante la inyección de gas HHO —hidrógeno y oxígeno— en el sistema de admisión. El gas reacciona con los depósitos de carbono acumulados en válvulas, inyectores, pistones y turbo, convirtiéndolos en CO₂ y vapor de agua que se expulsan por el escape. Sin química, sin desmontaje." },
  { q: "¿Cuánto tiempo dura el tratamiento?", a: "El proceso completo con Hy-Carbon Connect se realiza en menos de 60 minutos con el motor en marcha. Puedes dejar el coche y recogerlo el mismo día." },
  { q: "¿Cada cuántos kilómetros se recomienda?", a: "En conducción urbana frecuente, cada 15.000–20.000 km. En conducción mixta o de carretera, cada 30.000–40.000 km. Es especialmente recomendable antes de la ITV o tras una revisión del turbo o la EGR." },
  { q: "¿Qué diferencia hay entre la descarbonización y la limpieza del FAP?", a: "La descarbonización actúa sobre el interior del motor: válvulas, inyectores, pistones y turbo. La limpieza del FAP se enfoca en el filtro de partículas, una pieza diferente cuya sustitución puede costar entre 500 y 2.000 €. En muchos casos hacemos ambos tratamientos en la misma visita." },
  { q: "¿Es compatible con coches de gasolina e híbridos?", a: "Sí. El sistema Hy-Carbon Connect es compatible con motores de gasolina, diésel e híbridos. El diagnóstico previo nos permite ajustar el tratamiento al tipo y estado real de tu motor." },
];

const testimonials = [
  { name: "Nelson Valverde", role: "Taller asociado", text: "Incorporamos el servicio de descarbonización hace seis meses. Hoy es uno de los servicios que más recomiendan nuestros clientes porque los resultados se notan desde el primer momento." },
  { name: "María Jiménez", role: "Clienta", text: "Llevaba meses con el testigo del FAP encendido. Me dijeron que tenía que cambiarlo por más de 1.200 €. Vine aquí, lo limpiaron y llevo ya 8.000 km sin ningún problema." },
  { name: "Laura Herrera", role: "Clienta", text: "Notaba el motor pesado y gastaba más de lo normal. Tras la descarbonización recuperé potencia y el consumo bajó de forma clara. El informe antes/después lo dejó todo muy claro." },
];

/* ═══════════ PAGE ═══════════ */
export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════
          §0 TOP BAR
      ══════════════════════════════════ */}
      <div className="w-full py-2 text-center text-xs" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5"><Mail size={12} /> info@ecologiarentable.es</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> Lun – Vie, 07:00 – 15:00</span>
        </div>
      </div>

      {/* ══════════════════════════════════
          §1 HERO — split: image left / text right
      ══════════════════════════════════ */}
      <section style={{ background: "hsl(var(--background))" }}>
        <div className="grid lg:grid-cols-2 min-h-[92vh]">
          {/* LEFT: hero image */}
          <div className="relative overflow-hidden order-2 lg:order-1 min-h-[50vw] lg:min-h-0">
            <img src={heroMachineDark} alt="Máquina descarbonizadora profesional Hy-Carbon Connect" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(210 25% 5% / 0.6) 0%, transparent 55%)" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-semibold opacity-90">Ecología Rentable</p>
              <p className="text-xs mt-1" style={{ color: "hsl(0 0% 70%)" }}>Especialistas en descarbonización de motores</p>
            </div>
          </div>

          {/* RIGHT: text content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16">
            <p className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: "hsl(var(--primary))" }}>
              Tu motor acumula carbonilla desde los primeros 15.000 km. Nosotros la eliminamos.
            </p>

            <h1 className="text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-[1.15] mb-6" style={{ color: "hsl(var(--foreground))" }}>
              Dale a tu motor lo que necesita: una limpieza que se nota desde el primer kilómetro
            </h1>

            <p className="text-base mb-6 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
              Descarbonización por inyección de hidrógeno y limpieza profesional de filtros de partículas. Sin desmontaje, sin química agresiva, con resultados medibles antes y después del tratamiento.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/servicios" className="btn-cta">
                Ver servicios <ArrowRight size={15} />
              </Link>
              <Link to="/contacto" className="btn-outline">
                Solicitar diagnóstico gratuito
              </Link>
            </div>

            {/* 3 microcopy */}
            <div className="space-y-3 mb-10">
              {heroMicrocopy.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }}>{item.icon}</span>
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{item.text}</p>
                </div>
              ))}
            </div>

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

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: "hsl(var(--border))" }}>
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §2 QUIÉNES SOMOS
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · No vendemos promesas. Entregamos diagnósticos con datos reales.
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--foreground))" }}>
                Somos especialistas en la salud mecánica de tu vehículo
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                La carbonilla no avisa. Se acumula en silencio en válvulas, inyectores, turbo y filtro de partículas hasta que el motor empieza a tirar para atrás, gastar más y humar por el escape.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                En Ecología Rentable llevamos años resolviendo exactamente ese problema, con tecnología probada, un proceso sin sorpresas y un informe detallado antes y después de cada intervención.
              </p>
              <ul className="space-y-3 mb-8">
                {aboutBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/nosotros" className="btn-cta">
                Conócenos <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={tecnicoHyCarbon} alt="Técnico realizando descarbonización" className="w-full h-80 lg:h-[480px] object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §3 HY-CARBON CONNECT — Producto
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · Descarbonización por inyección de hidrógeno
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Hy-Carbon Connect — el tratamiento que limpia donde ningún aditivo llega
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                El sistema Hy-Carbon Connect introduce gas HHO —una mezcla controlada de hidrógeno y oxígeno— directamente en el sistema de admisión del motor. Ese gas reacciona con los depósitos de carbono acumulados en las zonas críticas del motor y los convierte en CO₂ y vapor de agua, que se expulsan de forma natural por el escape.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                El resultado: cero residuos químicos, cero desmontaje, cero tiempo de espera. Solo un motor más limpio, más eficiente y con menos emisiones.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
              <img src={hyCaronFront} alt="Hy-Carbon Connect equipo frontal" className="w-full h-72 object-contain p-8" />
            </div>
          </div>

          {/* 6 features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {hyCarbonFeatures.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/servicios/descarbonizacion" className="btn-cta">
            Ver descarbonización <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════
          §4 PROCESO — 4 pasos
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden py-20" style={{ background: "hsl(210 25% 6%)" }}>
        <div className="container mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(148 60% 55%)" }}>
            · Cómo trabajamos en Ecología Rentable
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-14">
            Un proceso transparente,<br />de principio a fin
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="flex gap-5 p-6 rounded-2xl" style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.08)" }}>
                <div className="text-3xl font-bold shrink-0" style={{ color: "hsl(148 60% 55%)" }}>{step.num}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 60%)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §5 CARBON FAP — Produto
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · Estación profesional de limpieza de filtros de partículas
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Carbon FAP — porque sustituir un FAP puede costarte entre 500 € y 2.000 €
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-10">
            <div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                El filtro de partículas (FAP/DPF) es una de las piezas más caras del vehículo cuando falla. Su sustitución oscila entre los 500 y los 2.000 euros según el modelo, sin contar mano de obra. Y la mayoría de las veces, la sustitución se puede evitar.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                La estación Carbon FAP de Ecología Rentable limpia el filtro con un ciclo automatizado que elimina el hollín acumulado, las partículas no quemadas y las obstrucciones internas, sin cortes, sin soldaduras y sin manipular la cerámica interior del filtro.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                Compatible con filtros de gasolina y diésel. Desarrollada específicamente para talleres que buscan resultados profesionales sin depender de aditivos individuales ni dispositivos de coste elevado.
              </p>
              <div className="space-y-4 mb-8">
                {carbonFapBullets.map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    <div>
                      <span className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>{b.title}: </span>
                      <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/servicios/limpieza-filtros" className="btn-cta">
                Ver limpieza de filtros <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={serviceWide} alt="Estación Carbon FAP" className="w-full h-72 lg:h-96 object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §6 SOCIOS
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · Programa de socios certificados
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--foreground))" }}>
                Incorpora descarbonización a tu taller y empieza a rentabilizarla desde la primera semana
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                La descarbonización y la limpieza de filtros de partículas son servicios con alta demanda, ticket medio elevado y margen real. Son tratamientos que el conductor no puede hacer por su cuenta, que no requieren recambios y que generan confianza inmediata porque los resultados se miden en el momento.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                Como socio certificado de Ecología Rentable accedes a la tecnología, la formación técnica y el soporte comercial necesarios para ofrecer estos servicios desde el primer día.
              </p>

              {/* 3 metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                  <div className="text-2xl font-bold" style={{ color: "hsl(var(--primary))" }}>60%</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>de margen en cada servicio</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                  <div className="text-2xl font-bold" style={{ color: "hsl(var(--primary))" }}>85%</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>recuperan inversión en &lt;3 meses</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                  <div className="text-2xl font-bold" style={{ color: "hsl(var(--primary))" }}>300+</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>profesionales certificados</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: "hsl(var(--primary))" }}>
                <p className="text-sm italic leading-relaxed mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  "Únete a Ecología Rentable y convierte tu taller en un referente del mantenimiento sostenible."
                </p>
                <cite className="text-xs not-italic font-semibold" style={{ color: "hsl(var(--muted-foreground))" }}>— Younes Smaini, fundador</cite>
              </blockquote>

              <Link to="/socios/hazte-socio" className="btn-cta">
                Quiero ser socio <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={diagnosticoMotor} alt="Socio certificado realizando diagnóstico" className="w-full h-80 lg:h-[480px] object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §7 TESTIMONIOS
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            · Lo que dicen los que ya lo han probado
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Resultados que se miden, no que se imaginan
          </h2>
          <p className="text-sm mb-12 max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Cada tratamiento genera un informe con datos reales. Estos son algunos de los profesionales y conductores que ya han visto los resultados.
          </p>
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
          §8 CTA FINAL
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden py-20" style={{ background: "hsl(210 25% 6%)" }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(148 60% 55%)" }}>
            · El mantenimiento que siempre debiste hacer
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Tu motor lleva kilómetros acumulando lo que nosotros eliminamos en una hora
          </h2>
          <p className="text-base mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 65%)" }}>
            La carbonilla no se ve, pero se nota. En el consumo, en la respuesta del acelerador, en el humo del escape, en la ITV. Un tratamiento de descarbonización y limpieza de filtro de partículas puede devolverte el rendimiento original del vehículo y ahorrarte cientos de euros en reparaciones futuras.
          </p>
          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "hsl(0 0% 50%)" }}>
            Sin química agresiva. Sin desmontaje. Con un informe que demuestra la diferencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/servicios" className="btn-cta">
              Ver servicios <ArrowRight size={15} />
            </Link>
            <Link to="/contacto" className="btn-outline-white">
              Solicitar diagnóstico
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §9 FAQ
      ══════════════════════════════════ */}
      <section className="py-20" style={{ background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">
            <div className="lg:col-span-2">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                · Lo que nos preguntan antes de venir
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--foreground))" }}>
                Preguntas<br />frecuentes
              </h2>
              <Link to="/contacto" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}>
                Pregúntanos
              </Link>
            </div>
            <div className="lg:col-span-3">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §10 WORLD MAP
      ══════════════════════════════════ */}
      <section className="py-20 pb-0" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-6 text-center mb-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            · Red nacional
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Más de 300 centros certificados en toda España
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
        <WorldMap />
      </section>

      {/* ══════════════════════════════════
          §11 FOOTER inline
      ══════════════════════════════════ */}
      <section style={{ background: "hsl(var(--background))" }} className="pb-12 pt-6">
        <div className="container mx-auto px-6">
          <div className="border-t pt-10 grid md:grid-cols-4 gap-8" style={{ borderColor: "hsl(var(--border))" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={logoER} alt="Ecología Rentable" className="h-7 w-auto" />
              </div>
              <p className="text-xs leading-relaxed max-w-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Somos expertos en descarbonización y limpieza de filtros de partículas. Resultados medibles, sin sorpresas.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--foreground))" }}>Web</p>
              <ul className="space-y-2">
                {[["Inicio", "/"], ["Nosotros", "/nosotros"], ["Contacto", "/contacto"]].map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-xs transition-colors hover:text-current" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--foreground))" }}>Servicios</p>
              <ul className="space-y-2">
                {[["Descarbonización", "/servicios/descarbonizacion"], ["Limpieza de filtros", "/servicios/limpieza-filtros"], ["Programa de socios", "/socios"]].map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-xs transition-colors hover:text-current" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--foreground))" }}>Contacto</p>
              <ul className="space-y-2 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                <li>C. Isabel Colbrand, 6, 28050 Madrid</li>
                <li>+34 605 928 626</li>
                <li>info@ecologiarentable.es</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>© 2025 Ecología Rentable. Todos los derechos reservados.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
