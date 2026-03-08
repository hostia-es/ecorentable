import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, Shield, Wrench, Star, CheckCircle, Clock, Mail } from "lucide-react";
import logoER from "@/assets/logo-ecologia-rentable.png";

import hyCaronFront from "@/assets/hy-carbon-connect-front.png";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import tecnicoHyCarbon from "@/assets/tecnico-hy-carbon.jpg";
import heroMachineDark from "@/assets/hero-machine-dark.jpg";
import serviceWide from "@/assets/service-wide.jpg";
import hyCaronAngle from "@/assets/hy-carbon-connect-angle.png";
import kitDigitalBanner from "@/assets/kit-digital-banner.png";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════
          §0 TOP BAR
      ══════════════════════════════════ */}
      <div className="w-full py-2 text-center text-xs bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5"><Mail size={12} /> info@ecologiarentable.es</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> Lun – Vie, 07:00 – 15:00</span>
        </div>
      </div>

      {/* ══════════════════════════════════
          §1 HERO — split: image left / text right
      ══════════════════════════════════ */}
      <section className="bg-background">
        <div className="grid lg:grid-cols-2 min-h-[92vh]">
          {/* LEFT: hero image */}
          <div className="relative overflow-hidden order-2 lg:order-1 min-h-[50vw] lg:min-h-0">
            <img src={heroMachineDark} alt="Máquina descarbonizadora profesional Hy-Carbon Connect" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-semibold opacity-90">Ecología Rentable</p>
              <p className="text-xs mt-1 text-white/70">Especialistas en descarbonización de motores</p>
            </div>
          </div>

          {/* RIGHT: text content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16">
            <Badge variant="secondary" className="w-fit mb-4 text-xs font-semibold tracking-wide uppercase">
              Tu motor acumula carbonilla desde los primeros 15.000 km
            </Badge>

            <h1 className="text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-[1.15] mb-6 text-foreground">
              Dale a tu motor lo que necesita: una limpieza que se nota desde el primer kilómetro
            </h1>

            <p className="text-base mb-6 leading-relaxed text-muted-foreground">
              Descarbonización por inyección de hidrógeno y limpieza profesional de filtros de partículas. Sin desmontaje, sin química agresiva, con resultados medibles antes y después del tratamiento.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild className="gap-2">
                <Link to="/servicios">Ver servicios <ArrowRight size={15} /></Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/contacto">Solicitar diagnóstico gratuito</Link>
              </Button>
            </div>

            {/* 3 microcopy */}
            <div className="space-y-3 mb-10">
              {heroMicrocopy.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-primary">{item.icon}</span>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
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
                  <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-white text-[10px] font-medium leading-tight">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <Separator className="mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §2 QUIÉNES SOMOS
      ══════════════════════════════════ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
                No vendemos promesas. Entregamos diagnósticos con datos reales.
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Somos especialistas en la salud mecánica de tu vehículo
              </h2>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                La carbonilla no avisa. Se acumula en silencio en válvulas, inyectores, turbo y filtro de partículas hasta que el motor empieza a tirar para atrás, gastar más y humar por el escape.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                En Ecología Rentable llevamos años resolviendo exactamente ese problema, con tecnología probada, un proceso sin sorpresas y un informe detallado antes y después de cada intervención.
              </p>
              <ul className="space-y-3 mb-8">
                {aboutBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="gap-2">
                <Link to="/nosotros">Conócenos <ArrowRight size={15} /></Link>
              </Button>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
                Descarbonización por inyección de hidrógeno
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                Hy-Carbon Connect — el tratamiento que limpia donde ningún aditivo llega
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                El sistema Hy-Carbon Connect introduce gas HHO —una mezcla controlada de hidrógeno y oxígeno— directamente en el sistema de admisión del motor. Ese gas reacciona con los depósitos de carbono acumulados en las zonas críticas del motor y los convierte en CO₂ y vapor de agua, que se expulsan de forma natural por el escape.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                El resultado: cero residuos químicos, cero desmontaje, cero tiempo de espera. Solo un motor más limpio, más eficiente y con menos emisiones.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-muted">
              <img src={hyCaronFront} alt="Hy-Carbon Connect equipo frontal" className="w-full h-72 object-contain p-8" />
            </div>
          </div>

          {/* 6 features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {hyCarbonFeatures.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button asChild className="gap-2">
            <Link to="/servicios/descarbonizacion">Ver descarbonización <ArrowRight size={15} /></Link>
          </Button>
        </div>
      </section>

      {/* ══════════════════════════════════
          §4 PROCESO — 4 pasos
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden py-20" style={{ background: "hsl(210 25% 6%)" }}>
        <div className="container mx-auto px-6">
          <Badge className="mb-3 bg-primary/20 text-[hsl(148_60%_55%)] border-primary/30 text-[11px] tracking-[0.15em] uppercase hover:bg-primary/20">
            Cómo trabajamos en Ecología Rentable
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-14">
            Un proceso transparente,<br />de principio a fin
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <Card key={step.num} className="rounded-2xl bg-white/[0.04] border-white/[0.08] backdrop-blur-sm">
                <CardContent className="p-6 flex gap-5">
                  <div className="text-3xl font-bold shrink-0 text-[hsl(148_60%_55%)]">{step.num}</div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{step.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §5 CARBON FAP — Produto
      ══════════════════════════════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
                Estación profesional de limpieza de filtros de partículas
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                Carbon FAP — porque sustituir un FAP puede costarte entre 500 € y 2.000 €
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-10">
            <div>
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
                {carbonFapBullets.map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <span className="text-sm font-bold text-foreground">{b.title}: </span>
                      <span className="text-sm text-muted-foreground">{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="gap-2">
                <Link to="/servicios/limpieza-filtros">Ver limpieza de filtros <ArrowRight size={15} /></Link>
              </Button>
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
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
                Programa de socios certificados
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Incorpora descarbonización a tu taller y empieza a rentabilizarla desde la primera semana
              </h2>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                La descarbonización y la limpieza de filtros de partículas son servicios con alta demanda, ticket medio elevado y margen real. Son tratamientos que el conductor no puede hacer por su cuenta, que no requieren recambios y que generan confianza inmediata porque los resultados se miden en el momento.
              </p>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                Como socio certificado de Ecología Rentable accedes a la tecnología, la formación técnica y el soporte comercial necesarios para ofrecer estos servicios desde el primer día.
              </p>

              {/* 3 metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "60%", label: "de margen en cada servicio" },
                  { value: "85%", label: "recuperan inversión en <3 meses" },
                  { value: "300+", label: "profesionales certificados" },
                ].map((m) => (
                  <Card key={m.value} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary">{m.value}</div>
                      <div className="text-xs mt-1 text-muted-foreground">{m.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 border-primary pl-5 mb-8">
                <p className="text-sm italic leading-relaxed mb-2 text-foreground">
                  "Únete a Ecología Rentable y convierte tu taller en un referente del mantenimiento sostenible."
                </p>
                <cite className="text-xs not-italic font-semibold text-muted-foreground">— Younes Smaini, fundador</cite>
              </blockquote>

              <Button asChild className="gap-2">
                <Link to="/socios/hazte-socio">Quiero ser socio <ArrowRight size={15} /></Link>
              </Button>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
            Lo que dicen los que ya lo han probado
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-foreground">
            Resultados que se miden, no que se imaginan
          </h2>
          <p className="text-sm mb-12 max-w-2xl text-muted-foreground">
            Cada tratamiento genera un informe con datos reales. Estos son algunos de los profesionales y conductores que ya han visto los resultados.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-2xl">
                <CardContent className="p-7">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="hsl(48 96% 53%)" className="text-[hsl(48_96%_53%)]" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-7 text-foreground">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground bg-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §8 CTA FINAL
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden py-20" style={{ background: "hsl(210 25% 6%)" }}>
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-3 bg-primary/20 text-[hsl(148_60%_55%)] border-primary/30 text-[11px] tracking-[0.15em] uppercase hover:bg-primary/20">
            El mantenimiento que siempre debiste hacer
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Tu motor lleva kilómetros acumulando lo que nosotros eliminamos en una hora
          </h2>
          <p className="text-base mb-4 max-w-2xl mx-auto leading-relaxed text-white/65">
            La carbonilla no se ve, pero se nota. En el consumo, en la respuesta del acelerador, en el humo del escape, en la ITV. Un tratamiento de descarbonización y limpieza de filtro de partículas puede devolverte el rendimiento original del vehículo y ahorrarte cientos de euros en reparaciones futuras.
          </p>
          <p className="text-sm mb-8 max-w-xl mx-auto text-white/50">
            Sin química agresiva. Sin desmontaje. Con un informe que demuestra la diferencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2">
              <Link to="/servicios">Ver servicios <ArrowRight size={15} /></Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link to="/contacto">Solicitar diagnóstico</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §9 FAQ
      ══════════════════════════════════ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
                Lo que nos preguntan antes de venir
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                Preguntas<br />frecuentes
              </h2>
              <Button asChild variant="secondary" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Link to="/contacto">Pregúntanos</Link>
              </Button>
            </div>
            <div className="lg:col-span-3">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          §10 RED NACIONAL
      ══════════════════════════════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-3 text-[11px] tracking-[0.15em] uppercase">
            Red nacional
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-foreground">
            Más de 300 centros certificados en toda España
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto text-muted-foreground">
            Encuentra el centro más cercano o conviértete en socio y ofrece el servicio en tu taller.
          </p>
          <Button asChild className="gap-2">
            <Link to="/encuentre-centro"><MapPin size={16} /> Encontrar un centro</Link>
          </Button>
        </div>
      </section>

      {/* ══════════════════════════════════
          §11 FOOTER inline
      ══════════════════════════════════ */}
      <section className="bg-background pb-12 pt-6">
        <div className="container mx-auto px-6">
          <Separator className="mb-10" />
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={logoER} alt="Ecología Rentable" className="h-7 w-auto" />
              </div>
              <p className="text-xs leading-relaxed max-w-xs text-muted-foreground">
                Somos expertos en descarbonización y limpieza de filtros de partículas. Resultados medibles, sin sorpresas.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-foreground">Web</p>
              <ul className="space-y-2">
                {[["Inicio", "/"], ["Nosotros", "/nosotros"], ["Contacto", "/contacto"]].map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-foreground">Servicios</p>
              <ul className="space-y-2">
                {[["Descarbonización", "/servicios/descarbonizacion"], ["Limpieza de filtros", "/servicios/limpieza-filtros"], ["Programa de socios", "/socios"]].map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-foreground">Contacto</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>C. Isabel Colbrand, 6, 28050 Madrid</li>
                <li>+34 605 928 626</li>
                <li>info@ecologiarentable.es</li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-xs text-muted-foreground">© 2025 Ecología Rentable. Todos los derechos reservados.</p>

          {/* Kit Digital Banner */}
          <Separator className="my-6" />
          <div className="flex justify-center">
            <img src={kitDigitalBanner} alt="Financiado por la Unión Europea con el programa Kit Digital por los fondos Next Generation (EU) del Mecanismo de Recuperación y Resiliencia" className="max-w-full h-auto" style={{ maxHeight: "60px" }} />
          </div>
        </div>
      </section>

    </main>
  );
}
