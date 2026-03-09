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
  { value: "300+", label: "Talleres en España", icon: <Wrench size={18} /> },
  { value: "50K+", label: "Vehículos tratados", icon: <Gauge size={18} /> },
  { value: "45K+", label: "Clientes satisfechos", icon: <Star size={18} /> },
];

const aboutBullets = [
  "Recuperas potencia",
  "Reduces consumo de combustible",
  "Evitas averías costosas",
  "Pasas la ITV sin sustos",
];

const hyCarbonFeatures = [
  { title: "Diagnóstico personalizado", desc: "Medición del estado real del motor antes del tratamiento.", icon: Stethoscope, image: featureDiagnostico },
  { title: "Limpieza profunda sin desmontaje", desc: "El gas HHO limpia válvulas EGR, inyectores, pistones, turbo y FAP.", icon: Cog, image: featureLimpieza },
  { title: "Proceso en menos de 60 minutos", desc: "Motor al ralentí. Entregas el coche y lo recoges el mismo día.", icon: Timer, image: featureRapido },
  { title: "Hasta un 15% de ahorro en combustible", desc: "Un motor limpio aprovecha mejor la mezcla aire-combustible.", icon: Fuel, image: featureAhorro },
  { title: "Facilita el paso por la ITV", desc: "Reducción de NOx, CO₂ y partículas sólidas.", icon: FileCheck, image: featureItv },
  { title: "Informe antes y después", desc: "Valores de emisiones documentados. La mejora queda registrada.", icon: BarChart3, image: featureInforme },
];

const hyCarbonTimelineEntries: FeatureTimelineEntry[] = hyCarbonFeatures.map((f) => ({
  icon: f.icon,
  title: f.title,
  subtitle: "Hy-Carbon Connect",
  description: f.desc,
  image: f.image,
}));

const processSteps = [
  { num: "01", title: "Evaluación inicial", desc: "Diagnosis completa: emisiones, estado del motor y nivel de obstrucción." },
  { num: "02", title: "Tratamiento Hy-Carbon Connect", desc: "Gas HHO en admisión. El hidrógeno elimina la carbonilla sin químicos." },
  { num: "03", title: "Limpieza profesional del FAP", desc: "Ciclo automatizado con Carbon FAP adaptado al nivel de obstrucción." },
  { num: "04", title: "Informe y recomendaciones", desc: "Datos antes y después del tratamiento, con recomendaciones de mantenimiento." },
];

const carbonFapBullets = [
  { title: "Cubierta protectora", desc: "Aísla y fija el filtro durante el proceso. Sin derrames, sin riesgos." },
  { title: "Ciclo automatizado", desc: "Adaptado al nivel de obstrucción real del FAP. Sin decisiones a ojo." },
  { title: "Resultado certificado", desc: "Producto sin disolventes, homologado y seguro para la cerámica del filtro." },
];

const faqs = [
  { q: "¿En qué consiste la descarbonización con hidrógeno?", a: "Inyectamos gas HHO en la admisión del motor. Reacciona con los depósitos de carbono y los convierte en CO₂ y vapor de agua. Sin química, sin desmontaje." },
  { q: "¿Cuánto tiempo dura el tratamiento?", a: "Menos de 60 minutos con el motor en marcha. Dejas el coche y lo recoges el mismo día." },
  { q: "¿Cada cuántos kilómetros se recomienda?", a: "Cada 15.000–20.000 km en ciudad, cada 30.000–40.000 km en carretera. Recomendable antes de la ITV." },
  { q: "¿Qué diferencia hay entre la descarbonización y la limpieza del FAP?", a: "La descarbonización limpia el interior del motor. La limpieza del FAP actúa sobre el filtro de partículas, cuya sustitución puede costar entre 500 y 2.000 €." },
  { q: "¿Es compatible con coches de gasolina e híbridos?", a: "Sí. Compatible con gasolina, diésel e híbridos. El diagnóstico previo ajusta el tratamiento a tu motor." },
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
      <div className="hidden sm:block w-full py-1.5 sm:py-2 text-center text-[10px] sm:text-xs bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <a href="mailto:info@ecologiarentable.es" className="flex items-center gap-1 sm:gap-1.5 hover:underline cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <Mail size={11} /> <span className="hidden sm:inline">info@ecologiarentable.es</span><span className="sm:hidden">Email</span>
          </a>
          <span className="hidden sm:inline opacity-50">·</span>
          <span className="hidden sm:flex items-center gap-1.5"><Clock size={12} /> Lun – Vie, 07:00 – 15:00</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <a href="tel:+34600000000" className="flex items-center gap-1 sm:gap-1.5 hover:underline cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <Phone size={11} /> +34 600 000 000
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════
          §1 HERO — Mobile-first fullscreen
      ══════════════════════════════════ */}
      <section className="relative min-h-[100svh] md:min-h-screen overflow-hidden flex items-center bg-dark-gradient">
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: heroImageY, scale: heroScale }}
        >
          <img src={heroCinematic} alt="Motor siendo tratado con tecnología de hidrógeno" className="hidden md:block w-full h-full object-cover" />
          <img src={heroCinematicMobile} alt="Motor siendo tratado con tecnología de hidrógeno" className="block md:hidden w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[hsl(210_25%_4%/0.93)] via-[hsl(210_25%_4%/0.8)] to-[hsl(210_25%_4%/0.4)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_25%_4%/0.95)] via-transparent to-[hsl(210_25%_4%/0.5)]" />
        </motion.div>

        <div className="absolute inset-0 grid-pattern opacity-40" />

        <motion.div
          className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-12 pt-24 pb-12 md:py-32"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="badge-glow mb-5 md:mb-6 inline-flex items-center text-[11px] md:text-xs leading-tight">
                  <Leaf size={14} className="mr-1.5 shrink-0" /> LIMPIEZA DE MOTORES · SIN DESMONTAR · 1 HORA
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mb-5 md:mb-6"
              >
                <h1 className="text-[2.5rem] sm:text-[2.8rem] md:text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight" style={{ color: "hsl(0 0% 100%)" }}>
                  Tu Motor Acumula Suciedad.
                </h1>
                <div className="min-h-[1.15em]">
                  <MorphingText
                    texts={["NOSOTROS LA ELIMINAMOS.", "EN MENOS DE 1 HORA.", "SIN ABRIR EL MOTOR.", "CON RESULTADOS MEDIBLES."]}
                    className="text-[2.5rem] sm:text-[2.8rem] md:text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.12] tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mb-7 md:mb-8"
                style={{ color: "hsl(0 0% 100% / 0.65)" }}
              >
                Eliminamos los residuos de carbono de tu motor con hidrógeno. Sin desmontar, sin química, con informe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-12"
              >
                <Link to="/servicios/descarbonizacion" className="btn-cta cursor-pointer text-sm w-full sm:w-auto text-center">
                  VER CÓMO FUNCIONA <ArrowRight size={14} />
                </Link>
                <Link to="/contacto" className="btn-glass cursor-pointer text-sm w-full sm:w-auto text-center">
                  PEDIR CITA
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
              >
                {heroStats.map((s) => (
                  <div key={s.label} className="group">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[hsl(148_60%_55%)] glow-icon">{s.icon}</span>
                      <AnimatedCounter value={s.value} className="text-2xl sm:text-2xl md:text-3xl font-bold text-white glow-text" />
                    </div>
                    <div className="text-[10px] sm:text-[10px] md:text-[11px] uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{s.label}</div>
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
                <div className="rounded-2xl border backdrop-blur-xl p-4" style={{ background: "hsl(0 0% 8% / 0.65)", borderColor: "hsl(0 0% 100% / 0.12)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center icon-circle-glow">
                      <Zap size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Consumo de combustible</p>
                      <p className="text-[10px]" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Con descarbonización</p>
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
                <div className="rounded-2xl border backdrop-blur-xl p-4" style={{ background: "hsl(0 0% 8% / 0.65)", borderColor: "hsl(0 0% 100% / 0.12)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center icon-circle-glow">
                      <Shield size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Emisiones contaminantes</p>
                      <p className="text-[10px]" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Resultado medio tras servicio</p>
                    </div>
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
          §1b HERO STATS — Mobile strip
      ══════════════════════════════════ */}
      <section className="sm:hidden py-6 bg-secondary">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 gap-4">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-primary">{s.icon}</span>
                <div>
                  <AnimatedCounter value={s.value} className="text-xl font-bold text-foreground" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FUEL LIQUID SCROLL ANIMATION
      ══════════════════════════════════ */}
      <FuelLiquidAnimation />

      {/* ══════════════════════════════════
          §2 QUIÉNES SOMOS — Light
      ══════════════════════════════════ */}
      <section className="py-14 md:py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Diagnósticos con datos reales
              </span>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Especialistas en <span className="text-primary">salud mecánica</span> de tu vehículo
              </h2>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                La carbonilla se acumula en válvulas, inyectores, turbo y FAP. Nosotros la eliminamos con tecnología probada y te entregamos un informe antes y después.
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
      <section className="py-14 md:py-24 relative overflow-hidden bg-secondary/50">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                  Así funciona la limpieza de tu motor
                </span>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">
                  Hidrógeno que <span className="text-primary">disuelve la suciedad</span> que los aditivos no alcanzan
                </h2>
                <p className="text-sm mt-3 text-muted-foreground">Tecnología Hy-Carbon Connect, utilizada en más de 300 talleres en España.</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <AnimatedSection>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Gas HHO en la admisión del motor. Reacciona con el carbono acumulado y lo expulsa como CO₂ y vapor de agua. Cero químicos, cero desmontaje.
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
          <FeatureTimeline entries={hyCarbonTimelineEntries} />

          <AnimatedSection className="mt-10">
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
                Paso a paso
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Así es una visita al taller: <span className="text-primary">sin sorpresas</span>
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
                Mira lo que pasa dentro de tu motor
              </span>
              <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4">
                El hidrógeno entra, la <span className="text-primary">carbonilla sale</span>
              </h2>
              <p className="text-sm md:text-base max-w-2xl mx-auto text-muted-foreground">
                Simulación del gas HHO eliminando carbono en válvulas, turbo y filtro de partículas.
              </p>
            </div>
          </AnimatedSection>
          <CarXRayAnimation />
          <div className="flex justify-center mt-8">
            <Link to="/servicios/descarbonizacion" className="btn-primary cursor-pointer">
              Quiero limpiar mi motor <ArrowRight size={15} />
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
                <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">
                  Carbon FAP — evita sustituir un FAP de <span className="text-primary">500 € a 2.000 €</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                Sustituir un FAP cuesta entre 500 y 2.000 €. En la mayoría de casos, se puede evitar con una limpieza profesional.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                La estación Carbon FAP limpia el filtro con un ciclo automatizado. Sin cortes, sin soldaduras. Compatible con gasolina y diésel.
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
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Descarbonización en tu taller: <span className="text-primary">rentable desde la primera semana</span>
              </h2>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                Alta demanda, margen real y resultados medibles. Como socio accedes a tecnología, formación y soporte comercial desde el primer día.
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
            <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
              Tu motor acumula lo que nosotros <span className="text-primary">eliminamos en una hora</span>
            </h2>
            <p className="text-base mb-10 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
              Sin química. Sin desmontaje. Con informe. Recupera el rendimiento de tu motor en una sola visita.
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
