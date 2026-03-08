import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, Shield, Wrench, Star, CheckCircle, Clock, Mail, Leaf, Gauge, Play, Stethoscope, Cog, Timer, Fuel, FileCheck, BarChart3, Quote } from "lucide-react";
import { motion, useTransform } from "framer-motion";

import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import serviceWide from "@/assets/service-wide.jpg";
import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection, AnimatedCounter, StaggerChildren, staggerItem } from "@/components/common/Animations";
import { useParallaxScroll, useMouseParallax } from "@/hooks/use-parallax";

/* ═══════════ DATA ═══════════ */
const heroStats = [
  { value: "10+", label: "Años de experiencia", icon: <Clock size={18} /> },
  { value: "500+", label: "Máquinas en servicio", icon: <Wrench size={18} /> },
  { value: "50K+", label: "Vehículos tratados", icon: <Gauge size={18} /> },
  { value: "45K+", label: "Clientes satisfechos", icon: <Star size={18} /> },
];

const aboutBullets = [
  "Recuperas la potencia original del motor",
  "Reduces el consumo de combustible de forma medible",
  "Evitas averías que pueden costarte entre 350 € y 2.000 €",
  "Pasas la ITV sin sustos en la prueba de gases",
];

const hyCarbonFeatures = [
  { title: "Diagnóstico personalizado", desc: "Medición del estado real del motor antes del tratamiento. Sabes exactamente qué hay dentro antes de empezar.", icon: Stethoscope },
  { title: "Limpieza profunda sin desmontaje", desc: "El gas HHO limpia válvulas EGR, colectores, inyectores, pistones, turbo y FAP. Sin abrir el motor.", icon: Cog },
  { title: "Proceso en menos de 60 minutos", desc: "El motor funciona al ralentí durante todo el tratamiento. Entregas el coche y lo recoges en el mismo día.", icon: Timer },
  { title: "Hasta un 15% de ahorro en combustible", desc: "Un motor limpio aprovecha mejor la mezcla aire-combustible. El ahorro empieza a notarse en los próximos depósitos.", icon: Fuel },
  { title: "Facilita el paso por la ITV", desc: "Reducción de NOx, CO₂ y partículas sólidas. Especialmente efectivo como preparación para la prueba de gases.", icon: FileCheck },
  { title: "Informe antes y después", desc: "Documentamos los valores de emisiones y estado del motor. La mejora queda registrada, no es una suposición.", icon: BarChart3 },
];

const processSteps = [
  { num: "01", title: "Evaluación inicial", desc: "Conectamos el vehículo a diagnosis antes de tocar nada. Medimos emisiones, comprobamos el estado del motor y detectamos el nivel real de obstrucción." },
  { num: "02", title: "Tratamiento Hy-Carbon Connect", desc: "Inyección controlada de gas HHO en el sistema de admisión. El hidrógeno reacciona con la carbonilla y la elimina sin productos químicos." },
  { num: "03", title: "Limpieza profesional del FAP", desc: "Utilizamos la estación Carbon FAP para eliminar residuos, hollín y partículas acumuladas. Ciclo automatizado adaptado al nivel de obstrucción." },
  { num: "04", title: "Informe y recomendaciones", desc: "Entregamos un informe con los datos antes y después del tratamiento. Más las recomendaciones para mantener el motor en ese estado." },
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
  const scrollY = useParallaxScroll();
  const mouse = useMouseParallax(0.015);

  // Parallax transforms for hero
  const heroImageY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const floatingCard1Y = useTransform(scrollY, [0, 600], [0, -60]);
  const floatingCard2Y = useTransform(scrollY, [0, 600], [0, -90]);

  return (
    <main className="overflow-x-hidden bg-[hsl(210_25%_4%)]">

      {/* ══════════════════════════════════
          §0 TOP BAR
      ══════════════════════════════════ */}
      <div className="w-full py-2 text-center text-xs" style={{ background: "hsl(210 25% 6%)", borderBottom: "1px solid hsl(0 0% 100% / 0.05)" }}>
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
          <span className="flex items-center gap-1.5"><Mail size={12} /> info@ecologiarentable.es</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> Lun – Vie, 07:00 – 15:00</span>
        </div>
      </div>

      {/* ══════════════════════════════════
          §1 HERO — Cinematic fullscreen parallax
      ══════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex items-center bg-dark-gradient">
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: heroImageY, scale: heroScale }}
        >
          <img
            src={heroCinematic}
            alt="Motor siendo tratado con tecnología de hidrógeno"
            className="w-full h-full object-cover"
          />
          {/* Dark overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210_25%_4%/0.92)] via-[hsl(210_25%_4%/0.7)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%)] via-transparent to-[hsl(210_25%_4%/0.4)]" />
        </motion.div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Main content with parallax */}
        <motion.div
          className="relative z-10 container mx-auto px-6 lg:px-12 py-32"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="badge-glow mb-6 inline-flex items-center">
                  <Leaf size={12} className="mr-1.5" /> Descarbonización por hidrógeno
                </span>
              </motion.div>

              {/* Giant typography */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6"
                style={{ color: "hsl(0 0% 100%)" }}
              >
                <span className="block">MOTOR</span>
                <span className="block gradient-text">LIMPIO</span>
                <span className="block text-[0.45em] font-medium tracking-normal mt-2" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                  rendimiento que se mide, no que se imagina
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-base md:text-lg leading-relaxed max-w-xl mb-8"
                style={{ color: "hsl(0 0% 100% / 0.55)" }}
              >
                Descarbonización por inyección de hidrógeno y limpieza profesional de filtros de partículas. Sin desmontaje. Resultados medibles antes y después.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 mb-12"
              >
                <Link to="/servicios" className="btn-cta">
                  Ver servicios <ArrowRight size={16} />
                </Link>
                <Link to="/contacto" className="btn-glass">
                  <Play size={14} /> Solicitar diagnóstico
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              >
                {heroStats.map((s) => (
                  <div key={s.label} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[hsl(148_60%_55%)] glow-icon">{s.icon}</span>
                      <AnimatedCounter value={s.value} className="text-2xl md:text-3xl font-bold text-white glow-text" />
                    </div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.35)" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right floating elements */}
            <div className="hidden lg:block lg:col-span-5 relative">
              {/* Floating glassmorphism card 1 */}
              <motion.div
                style={{ y: floatingCard1Y, x: mouse.x, }}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="absolute top-4 right-0 w-64"
              >
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center icon-circle-glow">
                      <Zap size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Ahorro de combustible</p>
                      <p className="text-[10px]" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Tras tratamiento</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold gradient-text-static">-15%</p>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(148 60% 40%), hsl(148 72% 55%))" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating glassmorphism card 2 */}
              <motion.div
                style={{ y: floatingCard2Y, x: mouse.x }}
                initial={{ opacity: 0, x: 40, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="absolute top-44 -left-8 w-56"
              >
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center icon-circle-glow">
                      <Shield size={14} />
                    </div>
                    <p className="text-xs font-semibold text-white">Emisiones reducidas</p>
                  </div>
                  <p className="text-2xl font-bold text-white">-20% <span className="text-xs font-normal" style={{ color: "hsl(0 0% 100% / 0.4)" }}>NOx/CO₂</span></p>
                </div>
              </motion.div>

              {/* Floating image card */}
              <motion.div
                style={{ y: floatingCard1Y }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1 }}
                className="absolute bottom-0 right-8 w-48"
              >
                <div className="glass-card overflow-hidden glow-border">
                  <img src={hyCaronAngle} alt="Equipo Hy-Carbon" className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <p className="text-[10px] font-semibold text-white uppercase tracking-wider">Hy-Carbon Connect</p>
                    <p className="text-[10px]" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Tecnología de hidrógeno</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(210_25%_5%)] to-transparent z-20" />
      </section>

      {/* ══════════════════════════════════
          §2 QUIÉNES SOMOS — Dark with glow
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden section-dark-mesh">
        {/* Grid pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="badge-glow mb-4 inline-flex">
                No vendemos promesas. Entregamos diagnósticos con datos reales.
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
                Somos especialistas en la <span className="gradient-text-static">salud mecánica</span> de tu vehículo
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                La carbonilla no avisa. Se acumula en silencio en válvulas, inyectores, turbo y filtro de partículas hasta que el motor empieza a tirar para atrás, gastar más y humar por el escape.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                En Ecología Rentable llevamos años resolviendo exactamente ese problema, con tecnología probada, un proceso sin sorpresas y un informe detallado antes y después de cada intervención.
              </p>
              <ul className="space-y-4 mb-8">
                {aboutBullets.map((b, i) => (
                  <motion.li 
                    key={b} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 icon-circle-glow">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm font-medium text-white">{b}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/nosotros" className="btn-outline-glow">
                Conócenos <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-2xl neon-glow opacity-30 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden glow-border">
                  <img src={tecnicoHyCarbon} alt="Técnico realizando descarbonización" className="w-full h-80 lg:h-[480px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%/0.6)] to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §3 HY-CARBON CONNECT — Glassmorphism cards
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-dark-gradient">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
              <div className="flex-1">
                <span className="badge-glow mb-4 inline-flex">
                  Descarbonización por inyección de hidrógeno
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  Hy-Carbon Connect — el tratamiento que <span className="gradient-text-static">limpia donde ningún aditivo llega</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
            <AnimatedSection>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                El sistema Hy-Carbon Connect introduce gas HHO —una mezcla controlada de hidrógeno y oxígeno— directamente en el sistema de admisión del motor. Ese gas reacciona con los depósitos de carbono acumulados en las zonas críticas del motor y los convierte en CO₂ y vapor de agua, que se expulsan de forma natural por el escape.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                El resultado: cero residuos químicos, cero desmontaje, cero tiempo de espera. Solo un motor más limpio, más eficiente y con menos emisiones.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden glass-card p-8">
                <img src={hyCaronFront} alt="Hy-Carbon Connect equipo frontal" className="w-full h-64 object-contain" />
              </div>
            </AnimatedSection>
          </div>

          {/* 6 features grid with glassmorphism */}
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {hyCarbonFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={staggerItem}>
                  <div className="glass-card h-full p-6 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 icon-circle-glow transition-all duration-300 group-hover:neon-glow">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-sm font-bold mb-2 text-white">{f.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.5)" }}>{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerChildren>

          <AnimatedSection>
            <Link to="/servicios/descarbonizacion" className="btn-primary">
              Ver descarbonización <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          §4 PROCESO — Futuristic timeline
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden section-dark-mesh">
        {/* Animated grid */}
        <div className="absolute inset-0 grid-pattern-animated opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="badge-glow mb-4 inline-flex">
              Cómo trabajamos en Ecología Rentable
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-16">
              Un proceso <span className="gradient-text-static">transparente</span>,<br />de principio a fin
            </h2>
          </AnimatedSection>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical glowing line - only on larger screens */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(180deg, hsl(148 60% 50% / 0.5) 0%, hsl(148 60% 30% / 0.1) 100%)" }} />
            
            <StaggerChildren className="space-y-8 lg:space-y-0" staggerDelay={0.15}>
              {processSteps.map((step, i) => (
                <motion.div 
                  key={step.num} 
                  variants={staggerItem}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
                >
                  <div className={`${i % 2 === 1 ? 'lg:order-2 lg:text-left' : 'lg:text-right'} mb-6 lg:mb-0`}>
                    <div className={`glass-card p-6 inline-block w-full ${i % 2 === 1 ? '' : 'lg:ml-auto'} max-w-md`}>
                      <div className="flex items-start gap-5">
                        <div className="step-number-glow text-lg">{step.num}</div>
                        <div className="text-left">
                          <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.55)" }}>{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Center dot - only on larger screens */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center" style={{ top: `calc(${i * 25}% + 3rem)` }}>
                    <div className="w-4 h-4 rounded-full" style={{ background: "hsl(148 60% 50%)", boxShadow: "0 0 20px hsl(148 60% 50% / 0.6)" }} />
                  </div>
                  
                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} hidden lg:block`} />
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §5 CARBON FAP — Dark dramatic
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-dark-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
              <div className="flex-1">
                <span className="badge-glow mb-4 inline-flex">
                  Estación profesional de limpieza de filtros de partículas
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  Carbon FAP — porque sustituir un FAP puede costarte <span className="gradient-text-static">entre 500 € y 2.000 €</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                El filtro de partículas (FAP/DPF) es una de las piezas más caras del vehículo cuando falla. Su sustitución oscila entre los 500 y los 2.000 euros según el modelo, sin contar mano de obra. Y la mayoría de las veces, la sustitución se puede evitar.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                La estación Carbon FAP de Ecología Rentable limpia el filtro con un ciclo automatizado que elimina el hollín acumulado, las partículas no quemadas y las obstrucciones internas, sin cortes, sin soldaduras y sin manipular la cerámica interior del filtro.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                Compatible con filtros de gasolina y diésel. Desarrollada específicamente para talleres que buscan resultados profesionales sin depender de aditivos individuales ni dispositivos de coste elevado.
              </p>
              
              <div className="space-y-4 mb-8">
                {carbonFapBullets.map((b, i) => (
                  <motion.div 
                    key={b.title} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 icon-circle-glow">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{b.title}: </span>
                      <span className="text-sm" style={{ color: "hsl(0 0% 100% / 0.55)" }}>{b.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link to="/servicios/limpieza-filtros" className="btn-primary">
                Ver limpieza de filtros <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl neon-glow opacity-20 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden glow-border">
                  <img src={serviceWide} alt="Estación Carbon FAP" className="w-full h-72 lg:h-96 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%/0.6)] to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §6 SOCIOS — Metrics with neon effect
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden section-dark-mesh">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="badge-glow mb-4 inline-flex">
                Programa de socios certificados
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
                Incorpora descarbonización a tu taller y <span className="gradient-text-static">empieza a rentabilizarla</span> desde la primera semana
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                La descarbonización y la limpieza de filtros de partículas son servicios con alta demanda, ticket medio elevado y margen real. Son tratamientos que el conductor no puede hacer por su cuenta, que no requieren recambios y que generan confianza inmediata porque los resultados se miden en el momento.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                Como socio certificado de Ecología Rentable accedes a la tecnología, la formación técnica y el soporte comercial necesarios para ofrecer estos servicios desde el primer día.
              </p>

              {/* 3 metrics with glowing borders */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "60%", label: "de margen en cada servicio" },
                  { value: "85%", label: "recuperan inversión en <3 meses" },
                  { value: "300+", label: "profesionales certificados" },
                ].map((m) => (
                  <div key={m.value} className="glass-card text-center p-4">
                    <AnimatedCounter value={m.value} className="text-2xl font-bold gradient-text-static glow-text" />
                    <div className="text-xs mt-1" style={{ color: "hsl(0 0% 100% / 0.45)" }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote with gradient border */}
              <div className="relative mb-8 p-5 rounded-xl" style={{ background: "hsl(148 60% 40% / 0.08)", border: "1px solid hsl(148 60% 50% / 0.2)" }}>
                <Quote size={24} className="absolute top-4 left-4 opacity-20" style={{ color: "hsl(148 60% 55%)" }} />
                <p className="text-sm italic leading-relaxed mb-2 text-white pl-8">
                  "Únete a Ecología Rentable y convierte tu taller en un referente del mantenimiento sostenible."
                </p>
                <cite className="text-xs not-italic font-semibold pl-8" style={{ color: "hsl(148 60% 60%)" }}>— Younes Smaini, fundador</cite>
              </div>

              <Link to="/socios/hazte-socio" className="btn-cta">
                Quiero ser socio <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl neon-glow opacity-20 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden glow-border">
                  <img src={diagnosticoMotor} alt="Socio certificado realizando diagnóstico" className="w-full h-80 lg:h-[480px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%/0.6)] to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §7 TESTIMONIOS — Premium glass cards
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-dark-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, hsl(148 50% 20% / 0.15), transparent 70%)" }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="badge-glow mb-4 inline-flex">
              Lo que dicen los que ya lo han probado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
              Resultados que se <span className="gradient-text-static">miden</span>, no que se imaginan
            </h2>
            <p className="text-sm mb-14 max-w-2xl" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              Cada tratamiento genera un informe con datos reales. Estos son algunos de los profesionales y conductores que ya han visto los resultados.
            </p>
          </AnimatedSection>
          
          <StaggerChildren className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <div className="glass-card h-full p-7 group">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star size={14} fill="hsl(48 96% 53%)" className="text-[hsl(48_96%_53%)]" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-7 text-white">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold avatar-glow" style={{ background: "linear-gradient(135deg, hsl(148 60% 35%), hsl(148 72% 45%))", color: "white" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs" style={{ color: "hsl(148 60% 60%)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════
          §8 CTA FINAL — Maximum impact
      ══════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden section-dark-mesh">
        {/* Animated grid */}
        <div className="absolute inset-0 grid-pattern-animated opacity-30" />
        
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, hsl(148 50% 25% / 0.2), transparent 70%)" }} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="badge-glow mb-4 inline-flex">
              El mantenimiento que siempre debiste hacer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Tu motor lleva kilómetros acumulando lo que nosotros <span className="gradient-text">eliminamos en una hora</span>
            </h2>
            <p className="text-base mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
              La carbonilla no se ve, pero se nota. En el consumo, en la respuesta del acelerador, en el humo del escape, en la ITV. Un tratamiento de descarbonización y limpieza de filtro de partículas puede devolverte el rendimiento original del vehículo y ahorrarte cientos de euros en reparaciones futuras.
            </p>
            <p className="text-sm mb-10 max-w-xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
              Sin química agresiva. Sin desmontaje. Con un informe que demuestra la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/servicios" className="btn-cta">
                Ver servicios <ArrowRight size={15} />
              </Link>
              <Link to="/contacto" className="btn-glass">
                Solicitar diagnóstico
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          §9 FAQ — Dark clean style
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-dark-gradient">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-14">
            <AnimatedSection className="lg:col-span-2">
              <span className="badge-glow mb-4 inline-flex">
                Lo que nos preguntan antes de venir
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
                Preguntas<br /><span className="gradient-text-static">frecuentes</span>
              </h2>
              <Link to="/contacto" className="btn-primary">
                Pregúntanos
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`faq-${i}`} 
                    className="faq-item px-1"
                  >
                    <AccordionTrigger className="text-sm text-left px-5 py-4 text-white hover:text-[hsl(148_60%_60%)] hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed px-5 pb-4" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §10 RED NACIONAL — Strong closing
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden section-dark-mesh">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Radial glow from bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px]" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, hsl(148 50% 20% / 0.2), transparent)" }} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="badge-glow mb-4 inline-flex">
              Red nacional
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-white">
              Más de <span className="gradient-text-static">300 centros</span> certificados en toda España
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              Encuentra el centro más cercano o conviértete en socio y ofrece el servicio en tu taller.
            </p>
            <Link to="/contacto" className="btn-cta">
              <MapPin size={16} /> Contactar con nosotros
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
