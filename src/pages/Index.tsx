import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, Shield, Wrench, Star, CheckCircle, Clock, Mail, Leaf, Gauge, Play, Stethoscope, Cog, Timer, Fuel, FileCheck, BarChart3, Quote, Phone } from "lucide-react";
import { motion, useTransform } from "framer-motion";

import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import heroCinematicMobile from "@/assets/hero-cinematic-mobile.jpg";
import serviceWide from "@/assets/service-wide.jpg";
import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";
import carbonFapMachine from "@/assets/carbon-fap-machine.png";
import carWhite from "@/assets/car-white.png";
import hyConnectMachine from "@/assets/hy-carbon-connect-machine.png";
import worldMapPins from "@/assets/world-map-pins.png";
import featureDiagnostico from "@/assets/feature-diagnostico.jpg";
import featureLimpieza from "@/assets/feature-limpieza.jpg";
import featureRapido from "@/assets/feature-rapido.jpg";
import featureAhorro from "@/assets/feature-ahorro.jpg";
import featureItv from "@/assets/feature-itv.jpg";
import featureInforme from "@/assets/feature-informe.jpg";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection, AnimatedCounter, StaggerChildren, staggerItem } from "@/components/common/Animations";
import { useParallaxScroll, useMouseParallax } from "@/hooks/use-parallax";
import { Timeline } from "@/components/ui/timeline";
import { FuelLiquidAnimation } from "@/components/common/FuelLiquidAnimation";
import { Globe } from "@/components/ui/globe";
import { CarXRayAnimation } from "@/components/common/CarXRayAnimation";
import { MorphingText } from "@/components/ui/morphing-text";
import FeatureTimeline from "@/components/ui/feature-timeline";
import type { FeatureTimelineEntry } from "@/components/ui/feature-timeline";

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
  { title: "Diagnóstico personalizado", desc: "Medición del estado real del motor antes del tratamiento. Sabes exactamente qué hay dentro antes de empezar.", icon: Stethoscope, image: featureDiagnostico },
  { title: "Limpieza profunda sin desmontaje", desc: "El gas HHO limpia válvulas EGR, colectores, inyectores, pistones, turbo y FAP. Sin abrir el motor.", icon: Cog, image: featureLimpieza },
  { title: "Proceso en menos de 60 minutos", desc: "El motor funciona al ralentí durante todo el tratamiento. Entregas el coche y lo recoges en el mismo día.", icon: Timer, image: featureRapido },
  { title: "Hasta un 15% de ahorro en combustible", desc: "Un motor limpio aprovecha mejor la mezcla aire-combustible. El ahorro empieza a notarse en los próximos depósitos.", icon: Fuel, image: featureAhorro },
  { title: "Facilita el paso por la ITV", desc: "Reducción de NOx, CO₂ y partículas sólidas. Especialmente efectivo como preparación para la prueba de gases.", icon: FileCheck, image: featureItv },
  { title: "Informe antes y después", desc: "Documentamos los valores de emisiones y estado del motor. La mejora queda registrada, no es una suposición.", icon: BarChart3, image: featureInforme },
];

const hyCarbonTimelineEntries: FeatureTimelineEntry[] = hyCarbonFeatures.map((f) => ({
  icon: f.icon,
  title: f.title,
  subtitle: "Hy-Carbon Connect",
  description: f.desc,
  image: f.image,
}));
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

  const heroImageY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const floatingCard1Y = useTransform(scrollY, [0, 600], [0, -60]);
  const floatingCard2Y = useTransform(scrollY, [0, 600], [0, -90]);

  return (
    <main className="overflow-x-hidden bg-background">

      {/* ══════════════════════════════════
          §0 TOP BAR
      ══════════════════════════════════ */}
      <div className="w-full py-2 text-center text-xs bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <a href="mailto:info@ecologiarentable.es" className="flex items-center gap-1.5 hover:underline cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <Mail size={12} /> info@ecologiarentable.es
          </a>
          <span className="hidden sm:inline opacity-50">·</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> Lun – Vie, 07:00 – 15:00</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <a href="tel:+34600000000" className="flex items-center gap-1.5 hover:underline cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <Phone size={12} /> +34 600 000 000
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════
          §1 HERO — Cinematic fullscreen parallax (dark for impact)
      ══════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex items-center bg-dark-gradient">
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: heroImageY, scale: heroScale }}
        >
          <img src={heroCinematic} alt="Motor siendo tratado con tecnología de hidrógeno" className="hidden md:block w-full h-full object-cover" />
          <img src={heroCinematicMobile} alt="Motor siendo tratado con tecnología de hidrógeno" className="block md:hidden w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210_25%_4%/0.92)] via-[hsl(210_25%_4%/0.7)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%)] via-transparent to-[hsl(210_25%_4%/0.4)]" />
        </motion.div>

        <div className="absolute inset-0 grid-pattern opacity-40" />

        <motion.div
          className="relative z-10 container mx-auto px-6 lg:px-12 py-32"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="badge-glow mb-6 inline-flex items-center">
                  <Leaf size={18} className="mr-2 shrink-0" /> DESCARBONIZACIÓN DE COCHES Y LIMPIEZA DE FILTRO DE PARTÍCULAS
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mb-6"
              >
                <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight" style={{ color: "hsl(0 0% 100%)" }}>
                  <span className="block">¡Revitaliza Tu Vehículo Con</span>
                </h1>
                <div className="min-h-[1.2em]">
                  <MorphingText
                    texts={["ECO RENTABLE!", "HIDRÓGENO HHO!", "MOTOR LIMPIO!", "MENOS CO₂!"]}
                    className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.15] tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-base md:text-lg leading-relaxed max-w-xl mb-8"
                style={{ color: "hsl(0 0% 100% / 0.55)" }}
              >
                Descubre nuestros servicios de descarbonización y limpieza de filtros de partículas. ¡Mejora el rendimiento de tu coche y ahorra dinero mientras cuidas el medio ambiente!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 mb-12"
              >
                <Link to="/servicios/descarbonizacion" className="btn-cta cursor-pointer">
                  DESCARBONIZACIÓN <ArrowRight size={16} />
                </Link>
                <Link to="/contacto" className="btn-glass cursor-pointer">
                  CONTACTO
                </Link>
              </motion.div>

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

            {/* Right — Floating car + machine */}
            <div className="hidden lg:block lg:col-span-5 relative min-h-[500px]">
              {/* Car floating */}
              <motion.div
                style={{ y: floatingCard1Y, x: mouse.x }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 right-0 w-[280px]"
              >
                <img src={hyConnectMachine} alt="Máquina Hy-Carbon Connect" className="w-full drop-shadow-2xl" />
              </motion.div>

              {/* Floating glassmorphism card 1 */}
              <motion.div
                style={{ y: floatingCard2Y, x: mouse.x }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="absolute top-4 left-0 w-56"
              >
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center icon-circle-glow">
                      <Zap size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Ahorro combustible</p>
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

              {/* Floating emissions card */}
              <motion.div
                style={{ y: floatingCard1Y }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1 }}
                className="absolute bottom-12 left-4 w-48"
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
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </section>

      {/* ══════════════════════════════════
          FUEL LIQUID SCROLL ANIMATION
      ══════════════════════════════════ */}
      <FuelLiquidAnimation />

      {/* ══════════════════════════════════
          §2 QUIÉNES SOMOS — Light
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                No vendemos promesas. Entregamos diagnósticos con datos reales.
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Somos especialistas en la <span className="text-primary">salud mecánica</span> de tu vehículo
              </h2>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                La carbonilla no avisa. Se acumula en silencio en válvulas, inyectores, turbo y filtro de partículas hasta que el motor empieza a tirar para atrás, gastar más y humar por el escape.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
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
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-primary/15 text-primary">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{b}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/nosotros" className="btn-secondary cursor-pointer">
                Conócenos <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                  <img src={tecnicoHyCarbon} alt="Técnico realizando descarbonización" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §3 HY-CARBON CONNECT — Light with machine image
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-secondary/50">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                  Descarbonización por inyección de hidrógeno
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                  Hy-Carbon Connect — el tratamiento que <span className="text-primary">limpia donde ningún aditivo llega</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <AnimatedSection>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                El sistema Hy-Carbon Connect introduce gas HHO —una mezcla controlada de hidrógeno y oxígeno— directamente en el sistema de admisión del motor. Ese gas reacciona con los depósitos de carbono acumulados en las zonas críticas del motor y los convierte en CO₂ y vapor de agua, que se expulsan de forma natural por el escape.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                El resultado: cero residuos químicos, cero desmontaje, cero tiempo de espera. Solo un motor más limpio, más eficiente y con menos emisiones.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-3xl" />
                <motion.img
                  src={hyConnectMachine}
                  alt="Máquina Hy-Carbon Connect"
                  className="relative w-full max-w-sm h-auto object-contain drop-shadow-2xl"
                  loading="lazy"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </AnimatedSection>
          </div>

          {/* 6 features grid */}
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {hyCarbonFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={staggerItem}>
                  <div className="bg-white rounded-2xl border border-border shadow-md h-full p-6 group hover:shadow-xl hover:border-primary/30 transition-all duration-200 hover:-translate-y-1 cursor-default">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-sm font-bold mb-2 text-foreground">{f.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerChildren>

          <AnimatedSection>
            <Link to="/servicios/descarbonizacion" className="btn-primary cursor-pointer">
              Ver descarbonización <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          §4 PROCESO — Aceternity Timeline
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="max-w-7xl mx-auto md:px-10 mb-4">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Cómo trabajamos en Ecología Rentable
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Un proceso <span className="text-primary">transparente</span>,<br />de principio a fin
              </h2>
            </div>
          </AnimatedSection>

          <Timeline
            data={processSteps.map((step) => ({
              title: step.num,
              content: (
                <div className="bg-card rounded-2xl border border-border shadow-md p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-200 max-w-lg">
                  <div className="flex items-start gap-4">
                    <div className="step-number text-lg shrink-0">{step.num}</div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ══════════════════════════════════
          §4.5 ANIMACIÓN 3D — Coche raio-X com Flex Fuel
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Tecnología Ecología Rentable en acción
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Así limpia el <span className="text-primary">hidrógeno</span> tu motor por dentro
              </h2>
              <p className="text-base max-w-2xl mx-auto text-muted-foreground">
                Visualización 3D del proceso de descarbonización. Las partículas verdes representan el gas HHO eliminando depósitos de carbonilla del motor, turbo y filtro de partículas.
              </p>
            </div>
          </AnimatedSection>
          <CarXRayAnimation />
          <div className="flex justify-center mt-8">
            <Link to="/servicios/descarbonizacion" className="btn-primary cursor-pointer">
              Descubre el tratamiento <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §5 CARBON FAP — Light with machine image
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-secondary/50">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                  Estación profesional de limpieza de filtros de partículas
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                  Carbon FAP — porque sustituir un FAP puede costarte <span className="text-primary">entre 500 € y 2.000 €</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                El filtro de partículas (FAP/DPF) es una de las piezas más caras del vehículo cuando falla. Su sustitución oscila entre los 500 y los 2.000 euros según el modelo, sin contar mano de obra. Y la mayoría de las veces, la sustitución se puede evitar.
              </p>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                La estación Carbon FAP de Ecología Rentable limpia el filtro con un ciclo automatizado que elimina el hollín acumulado, las partículas no quemadas y las obstrucciones internas, sin cortes, sin soldaduras y sin manipular la cerámica interior del filtro.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
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
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-primary/15 text-primary">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground">{b.title}: </span>
                      <span className="text-sm text-muted-foreground">{b.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/servicios/limpieza-filtros" className="btn-primary cursor-pointer">
                Ver limpieza de filtros <ArrowRight size={15} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-3xl" />
                <motion.img
                  src={carbonFapMachine}
                  alt="Estación Carbon FAP - Ecología Rentable"
                  className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §6 SOCIOS — Light
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Programa de socios certificados
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Incorpora descarbonización a tu taller y <span className="text-primary">empieza a rentabilizarla</span> desde la primera semana
              </h2>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                La descarbonización y la limpieza de filtros de partículas son servicios con alta demanda, ticket medio elevado y margen real. Son tratamientos que el conductor no puede hacer por su cuenta, que no requieren recambios y que generan confianza inmediata porque los resultados se miden en el momento.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                Como socio certificado de Ecología Rentable accedes a la tecnología, la formación técnica y el soporte comercial necesarios para ofrecer estos servicios desde el primer día.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "60%", label: "de margen en cada servicio" },
                  { value: "85%", label: "recuperan inversión en <3 meses" },
                  { value: "300+", label: "profesionales certificados" },
                ].map((m) => (
                  <div key={m.value} className="bg-white rounded-xl border border-border shadow-md text-center p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                    <AnimatedCounter value={m.value} className="text-2xl font-bold text-primary" />
                    <div className="text-xs mt-1 text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="relative mb-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <Quote size={24} className="absolute top-4 left-4 opacity-20 text-primary" />
                <p className="text-sm italic leading-relaxed mb-2 text-foreground pl-8">
                  "Únete a Ecología Rentable y convierte tu taller en un referente del mantenimiento sostenible."
                </p>
                <cite className="text-xs not-italic font-semibold pl-8 text-primary">— Younes Smaini, fundador</cite>
              </div>

              <Link to="/socios/hazte-socio" className="btn-primary cursor-pointer">
                Quiero ser socio <ArrowRight size={15} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                  <img src={diagnosticoMotor} alt="Socio certificado realizando diagnóstico" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §7 TESTIMONIOS — Light cards
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-secondary/50">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
              Lo que dicen los que ya lo han probado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-foreground">
              Resultados que se <span className="text-primary">miden</span>, no que se imaginan
            </h2>
            <p className="text-sm mb-14 max-w-2xl text-muted-foreground">
              Cada tratamiento genera un informe con datos reales. Estos son algunos de los profesionales y conductores que ya han visto los resultados.
            </p>
          </AnimatedSection>

          <StaggerChildren className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-md h-full p-7 group hover:shadow-xl hover:border-primary/30 transition-all duration-200">
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
                  <p className="text-sm leading-relaxed mb-7 text-foreground">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-primary">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════
          §8 CTA FINAL — Dark for impact
      ══════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
              El mantenimiento que siempre debiste hacer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
              Tu motor lleva kilómetros acumulando lo que nosotros <span className="text-primary">eliminamos en una hora</span>
            </h2>
            <p className="text-base mb-4 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
              La carbonilla no se ve, pero se nota. En el consumo, en la respuesta del acelerador, en el humo del escape, en la ITV. Un tratamiento de descarbonización y limpieza de filtro de partículas puede devolverte el rendimiento original del vehículo y ahorrarte cientos de euros en reparaciones futuras.
            </p>
            <p className="text-sm mb-10 max-w-xl mx-auto text-muted-foreground/70">
              Sin química agresiva. Sin desmontaje. Con un informe que demuestra la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/servicios" className="btn-primary cursor-pointer">
                Ver servicios <ArrowRight size={15} />
              </Link>
              <Link to="/contacto" className="btn-secondary cursor-pointer">
                Solicitar diagnóstico
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          §9 FAQ — Light
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-14">
            <AnimatedSection className="lg:col-span-2">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Lo que nos preguntan antes de venir
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Preguntas<br /><span className="text-primary">frecuentes</span>
              </h2>
              <Link to="/contacto" className="btn-primary cursor-pointer">
                Pregúntanos
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-xl border border-border shadow-sm px-1 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger className="text-sm text-left px-5 py-4 text-foreground hover:text-primary hover:no-underline cursor-pointer">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed px-5 pb-4 text-muted-foreground">
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
          §10 RED NACIONAL — Globe
      ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-secondary">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <AnimatedSection>
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Red nacional e internacional
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-foreground">
                Más de <span className="text-primary">300 centros</span> certificados en España y en el mundo
              </h2>
              <p className="text-base mb-10 max-w-lg text-muted-foreground">
                Encuentra el centro más cercano o conviértete en socio y ofrece el servicio en tu taller.
              </p>
              <Link to="/contacto" className="btn-primary cursor-pointer">
                <MapPin size={16} /> Contactar con nosotros
              </Link>
            </AnimatedSection>

            {/* Right — Globe */}
            <AnimatedSection delay={0.2}>
              <div className="relative mx-auto aspect-square w-full max-w-[500px]">
                <Globe className="relative" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §11 CONTACTO RÁPIDO — Light CTA band
      ══════════════════════════════════ */}
      <section className="py-16 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                ¿Tienes dudas? Habla con nosotros
              </h2>
              <p className="text-sm text-muted-foreground">
                Estamos disponibles por teléfono, email y WhatsApp. Sin compromiso.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+34600000000" className="btn-primary cursor-pointer">
                <Phone size={15} /> Llamar ahora
              </a>
              <Link to="/contacto" className="btn-secondary cursor-pointer">
                <Mail size={15} /> Enviar mensaje
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
