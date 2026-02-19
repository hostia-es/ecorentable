import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronDown, Leaf, Zap, Shield, Wrench, TrendingUp, Truck, Star, CheckCircle } from "lucide-react";
import { useState } from "react";

import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";
import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroMachineDark from "@/assets/hero-machine-dark.jpg";
import machineWorkshop from "@/assets/machine-workshop.jpg";
import engineBeforeAfter from "@/assets/engine-before-after.jpg";

const features = [
  { icon: <Zap size={18} />, label: "Hidrógeno puro", desc: "Sin desmontaje de piezas" },
  { icon: <Shield size={18} />, label: "DPF / FAP", desc: "Regeneración profesional" },
  { icon: <Wrench size={18} />, label: "EGR limpia", desc: "Válvula y catalizador" },
  { icon: <TrendingUp size={18} />, label: "ITV garantizada", desc: "Reducción de emisiones" },
];

const stats = [
  { value: "+300", label: "Centros certificados", sub: "en toda España" },
  { value: "+50K", label: "Motores tratados", sub: "desde 2015" },
  { value: "98%", label: "Clientes satisfechos", sub: "según encuestas" },
  { value: "45min", label: "Tiempo medio", sub: "sin desmontaje" },
];

const services = [
  { icon: <Zap size={20} />, title: "Descarbonización de motor", desc: "Eliminación de depósitos de carbono en pistones, válvulas, cámara de combustión y escape. Tecnología de hidrógeno puro.", href: "/servicios/descarbonizacion" },
  { icon: <Shield size={20} />, title: "Limpieza DPF / FAP", desc: "Regeneración y limpieza profesional del filtro de partículas. Recupera la presión de escape y alarga la vida útil.", href: "/servicios/limpieza-filtros" },
  { icon: <Wrench size={20} />, title: "EGR y catalizador", desc: "Tratamiento específico para restablecer el caudal de gases y la eficiencia del sistema de escape completo.", href: "/soluciones/limpieza-egr-catalizador" },
  { icon: <TrendingUp size={20} />, title: "Gases ITV", desc: "Descarbonización antes de la inspección para reducir CO, HC y NOx por debajo de los límites exigidos.", href: "/soluciones/itv-gases" },
  { icon: <Truck size={20} />, title: "Flotas diésel", desc: "Contratos de mantenimiento preventivo para flotas. Visitas a instalaciones e informes por vehículo.", href: "/servicios/flotas" },
  { icon: <Star size={20} />, title: "Taller socio", desc: "Únete a la red de centros certificados. Recibe clientes, formación técnica y soporte comercial continuo.", href: "/socios/hazte-socio" },
];

const results = [
  { value: "Hasta 15%", label: "Reducción de consumo" },
  { value: "Hasta 70%", label: "Reducción de humos" },
  { value: "+20%", label: "Recuperación de potencia" },
  { value: "2–4×", label: "Vida útil del DPF" },
];

const testimonials = [
  { name: "Andrés M.", role: "Conductor particular · Madrid", text: "Llevé el coche con la luz del DPF encendida. Salí del taller sin la luz y el coche empuja como nuevo. No me lo creía.", stars: 5 },
  { name: "Patricia V.", role: "Jefa de flota · Valencia", text: "Hemos reducido los incidentes con el filtro de partículas en un 60% desde que contratamos el mantenimiento preventivo.", stars: 5 },
  { name: "Roberto S.", role: "Taller socio · Sevilla", text: "Recuperé la inversión en cuatro meses. Los clientes vienen específicamente a por la descarbonización. Es un diferencial real.", stars: 5 },
];

const faqs = [
  { q: "¿Cada cuántos kilómetros se recomienda descarbonizar?", a: "En motores diésel, cada 30.000–50.000 km. En gasolina, cada 50.000–80.000 km. Con uso urbano predominante la periodicidad puede ser menor." },
  { q: "¿Es compatible con todos los motores?", a: "Sí, con motores diésel y gasolina de todas las marcas y modelos. La técnica por hidrógeno es especialmente efectiva en motores con DPF/FAP y válvula EGR." },
  { q: "¿Cuánto tarda el servicio?", a: "Entre 45 y 90 minutos según el tipo de motor y el grado de carbonización. No requiere desmontaje de piezas y el vehículo puede circular inmediatamente." },
  { q: "¿Qué diferencia a Ecología Rentable de otros servicios?", a: "Tecnología de hidrógeno certificada, red de más de 300 centros en España, formación técnica continua y garantía de resultado. No es un aditivo: es un proceso profesional." },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold gap-4" style={{ color: "hsl(var(--foreground))" }}>
        <span>{q}</span>
        <ChevronDown size={16} className="shrink-0 transition-transform duration-200" style={{ color: "hsl(var(--accent-green))", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{a}</p>}
    </div>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="min-h-screen grid lg:grid-cols-2">
        {/* Left image */}
        <div className="relative min-h-[55vw] lg:min-h-screen overflow-hidden">
          <img src={heroMachineDark} alt="Máquina descarbonizadora profesional Hy-Carbon" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(210 25% 8% / 0.5) 0%, transparent 60%)" }} />
          <div className="absolute bottom-8 left-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm" style={{ background: "hsl(148 72% 35% / 0.85)", color: "hsl(0 0% 100%)" }}>
              <Leaf size={12} /> Tecnología de hidrógeno certificada · España
            </span>
          </div>
        </div>

        {/* Right text */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-20" style={{ background: "hsl(var(--background))" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "hsl(var(--accent-green))" }}>
            Ecología Rentable
          </p>
          <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] mb-6" style={{ color: "hsl(var(--foreground))" }}>
            Motor más limpio,{" "}
            <span style={{ color: "hsl(var(--primary))" }}>consumo más bajo.</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed max-w-md" style={{ color: "hsl(var(--muted-foreground))" }}>
            Descarbonización profesional de motores diésel y gasolina. Limpieza DPF/FAP, EGR y catalizador. Red de más de 300 centros certificados en toda España.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link to="/encuentre-centro" className="btn-cta">
              <MapPin size={16} /> Encontrar un centro
            </Link>
            <Link to="/socios/hazte-socio" className="btn-outline">
              Soy taller / Quiero ser socio
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                <span style={{ color: "hsl(var(--primary))" }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTEXT STRIP ══ */}
      <div style={{ background: "hsl(var(--foreground))" }} className="py-5 px-6">
        <div className="container mx-auto flex items-center gap-4 overflow-x-auto">
          {[
            { src: tecnicoHyCarbon, alt: "Técnico realizando descarbonización" },
            { src: diagnosticoMotor, alt: "Diagnóstico electrónico de motor" },
            { src: hyCaronAngle, alt: "Máquina Hy-Carbon Connect" },
            { src: hyCaronFront, alt: "Hy-Carbon Connect frontal" },
          ].map((img) => (
            <div key={img.alt} className="shrink-0 w-28 h-20 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="ml-auto shrink-0 hidden md:block text-right pl-4">
            <p className="text-xs font-semibold" style={{ color: "hsl(0 0% 65%)" }}>Redefiniendo el mantenimiento del motor</p>
            <p className="text-xs" style={{ color: "hsl(0 0% 40%)" }}>tecnología profesional certificada</p>
          </div>
        </div>
      </div>

      {/* ══ TECNOLOGÍA ══ */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(var(--accent-green))" }}>Nuestra tecnología</p>
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Descarbonización inteligente,{" "}
                <span style={{ color: "hsl(var(--primary))" }}>impulsada por hidrógeno</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                La tecnología Hy-Carbon genera hidrógeno y oxígeno a partir del agua mediante electrólisis. Al introducir estos gases en el motor en funcionamiento, los depósitos de carbono se oxidan y eliminan de forma natural, sin desmontaje, sin productos químicos agresivos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(var(--muted))" }}>
                    <div className="icon-circle w-9 h-9 shrink-0">{f.icon}</div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{f.label}</p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine showcase */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                <img src={hyCaronAngle} alt="Máquina Hy-Carbon Connect profesional" className="w-full h-80 object-contain py-6" />
              </div>
              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-6 px-6 py-4 rounded-xl shadow-lg"
                style={{ background: "hsl(var(--primary))", color: "hsl(0 0% 100%)" }}
              >
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs opacity-80">Satisfacción del cliente</div>
              </div>
            </div>
          </div>

          {/* 4 Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t" style={{ borderColor: "hsl(var(--border))" }}>
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>{s.value}</div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.label}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICIOS LINEUP ══ */}
      <section className="py-20 section-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(148 72% 50%)" }}>Nuestros servicios</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "hsl(0 0% 100%)" }}>
                Explora todos los servicios
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0 0% 60%)" }}>
                Sin desmontaje, sin químicos agresivos, sin parar la actividad. Resultados medibles desde la primera sesión.
              </p>
              <Link to="/servicios" className="btn-cta inline-flex">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right — list */}
            <div className="lg:col-span-3 space-y-3">
              {services.map((s, i) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="flex items-center gap-4 p-5 rounded-xl group transition-all duration-200"
                  style={{ background: "hsl(0 0% 100% / 0.05)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(148 65% 22% / 0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(0 0% 100% / 0.05)"; }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(148 65% 22%)", color: "hsl(148 72% 60%)" }}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: "hsl(0 0% 95%)" }}>{s.title}</p>
                    <p className="text-xs line-clamp-1" style={{ color: "hsl(0 0% 55%)" }}>{s.desc}</p>
                  </div>
                  <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(148 72% 55%)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMPACTO REAL ══ */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(var(--accent-green))" }}>El impacto real</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14 max-w-xl leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Resultados reales, demostrados
          </h2>

          {/* Large before/after image */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img src={engineBeforeAfter} alt="Motor antes y después de descarbonización" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 flex items-end" style={{ background: "linear-gradient(to top, hsl(210 25% 8% / 0.8) 0%, transparent 60%)" }}>
              <div className="p-8">
                <p className="text-white text-lg font-semibold mb-1">Antes / Después</p>
                <p className="text-sm" style={{ color: "hsl(0 0% 70%)" }}>Motor diésel 120.000 km · sin mantenimiento previo de carbono</p>
              </div>
            </div>
          </div>

          {/* Two-column image section */}
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            <div className="relative rounded-2xl overflow-hidden h-56">
              <img src={machineWorkshop} alt="Máquina descarbonizadora en taller" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, hsl(148 65% 12% / 0.85) 0%, transparent 60%)" }}>
                <div>
                  <p className="text-white font-bold text-lg">-40%</p>
                  <p className="text-xs" style={{ color: "hsl(148 60% 70%)" }}>reducción media en emisiones de partículas</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-56">
              <img src={hyCaronFront} alt="Hy-Carbon Connect equipo" className="w-full h-full object-contain" style={{ background: "hsl(var(--muted))" }} />
              <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, hsl(210 25% 8% / 0.7) 0%, transparent 60%)" }}>
                <div>
                  <p className="text-white font-bold text-lg">Hy-Carbon Connect</p>
                  <p className="text-xs" style={{ color: "hsl(0 0% 70%)" }}>La máquina más avanzada de la red</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r) => (
              <div key={r.label} className="p-6 rounded-2xl text-center" style={{ background: "hsl(var(--muted))" }}>
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>{r.value}</div>
                <div className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARA QUIÉN ══ */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(var(--accent-green))" }}>Para quién es</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Un solo servicio, tres perfiles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🚗",
                title: "Conductor particular",
                points: ["Notas pérdida de potencia", "La luz del motor o DPF está encendida", "Quieres pasar la ITV sin problemas", "Buscas reducir el consumo"],
                cta: "Encontrar un centro",
                href: "/encuentre-centro",
              },
              {
                emoji: "🔧",
                title: "Taller / Mecánico",
                points: ["Quieres ofrecer un servicio diferenciador", "Buscas un nuevo flujo de ingresos", "Recibirás clientes certificados de tu zona", "Formación técnica incluida"],
                cta: "Hazte socio",
                href: "/socios/hazte-socio",
                highlight: true,
              },
              {
                emoji: "🚛",
                title: "Gestor de flota",
                points: ["Flota diésel con mantenimiento intensivo", "Altos costes en filtros de partículas", "Necesitas informes por vehículo", "Buscas mantenimiento en tus instalaciones"],
                cta: "Solicitar presupuesto",
                href: "/servicios/flotas",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-7 rounded-2xl flex flex-col"
                style={{
                  background: p.highlight ? "hsl(var(--primary))" : "hsl(var(--card))",
                  border: p.highlight ? "none" : "1px solid hsl(var(--border))",
                }}
              >
                <div className="text-3xl mb-4">{p.emoji}</div>
                <h3 className="font-bold text-lg mb-5" style={{ color: p.highlight ? "hsl(0 0% 100%)" : "hsl(var(--foreground))" }}>
                  {p.title}
                </h3>
                <ul className="space-y-2 mb-7 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: p.highlight ? "hsl(148 72% 75%)" : "hsl(var(--primary))" }} />
                      <span style={{ color: p.highlight ? "hsl(0 0% 90%)" : "hsl(var(--muted-foreground))" }}>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={p.href}
                  className={`w-full text-center py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all`}
                  style={
                    p.highlight
                      ? { background: "hsl(0 0% 100%)", color: "hsl(var(--primary))" }
                      : { background: "hsl(var(--primary))", color: "hsl(0 0% 100%)" }
                  }
                >
                  {p.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENCUENTRE CENTRO ══ */}
      <section className="py-20 section-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(148 72% 50%)" }}>Red nacional</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "hsl(0 0% 100%)" }}>
                Únete al movimiento hacia un motor más limpio
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "hsl(0 0% 60%)" }}>
                Más de 300 talleres certificados en toda España. Cada centro cumple los estándares técnicos de Ecología Rentable y cuenta con equipamiento profesional y técnicos formados.
              </p>
              <Link to="/encuentre-centro" className="btn-cta inline-flex">
                <MapPin size={16} /> Ver centros por provincia
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao", "Zaragoza", "Alicante"].map((city) => (
                <Link
                  key={city}
                  to={`/encuentre-centro/${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
                  style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(148 65% 22% / 0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(0 0% 100% / 0.06)"; }}
                >
                  <MapPin size={14} style={{ color: "hsl(148 72% 55%)" }} />
                  <span className="text-sm font-medium" style={{ color: "hsl(0 0% 90%)" }}>{city}</span>
                  <ArrowRight size={12} className="ml-auto" style={{ color: "hsl(0 0% 40%)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Left */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(var(--accent-green))" }}>FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Preguntas frecuentes
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                Todo lo que necesitas saber antes de tu primera descarbonización.
              </p>
              <Link to="/contacto" className="btn-outline inline-flex text-sm">
                Hablar con un experto <ArrowRight size={14} />
              </Link>
            </div>
            {/* Right */}
            <div className="lg:col-span-3">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIOS ══ */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(var(--accent-green))" }}>Testimonios</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" style={{ color: "hsl(48 96% 53%)" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--foreground))" }}>"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="py-20 section-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(148 72% 50%)" }}>Empieza hoy</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight" style={{ color: "hsl(0 0% 100%)" }}>
            Únete al movimiento global hacia un motor más limpio
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: "hsl(0 0% 60%)" }}>
            Encuentra el centro más cercano o contáctanos para resolver tus dudas. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link to="/encuentre-centro" className="btn-cta">
              <MapPin size={16} /> Encontrar un centro
            </Link>
            <Link to="/contacto" className="btn-outline-white">
              Hablar con un experto
            </Link>
          </div>

          {/* Footer brand row */}
          <div className="border-t pt-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}>
            <div className="flex items-center gap-2">
              <Leaf size={18} style={{ color: "hsl(148 72% 50%)" }} />
              <span className="font-bold text-lg" style={{ color: "hsl(0 0% 100%)" }}>Ecología Rentable</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: "hsl(0 0% 45%)" }}>
              {[
                ["Servicios", "/servicios"],
                ["Soluciones", "/soluciones"],
                ["Blog", "/blog"],
                ["Centros", "/encuentre-centro"],
                ["Socios", "/socios"],
                ["Contacto", "/contacto"],
              ].map(([label, href]) => (
                <Link key={href} to={href} className="hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
