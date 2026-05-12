import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Shield, Wrench, Truck, Leaf, TrendingUp, Package, Gauge, Activity, Repeat2, ShoppingBag, MapPin, Users, BookOpen, Lightbulb, Sparkles, Timer, Award } from "lucide-react";
import RelatedHubs from "@/components/common/RelatedHubs";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import QuoteForm from "@/components/common/QuoteForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import mechanicWorkshop from "@/assets/mechanic-workshop-service.jpg";
import engineDiagnostics from "@/assets/engine-diagnostics.jpg";

const faqServicios = [
  { question: "¿Cuál es la diferencia entre descarbonización y limpieza DPF?", answer: "La descarbonización trata el interior del motor (pistones, válvulas, EGR) eliminando depósitos de carbono mediante hidrógeno. La limpieza DPF/FAP es un servicio específico para el filtro de partículas, que puede hacerse por vía química, ultrasónica o combinada." },
  { question: "¿Es seguro para mi motor?", answer: "Sí. Los procesos que utilizamos no implican desmontaje de piezas ni agentes abrasivos. El hidrógeno actúa como un limpiador suave y eficaz, sin riesgo para juntas, retenes ni componentes electrónicos." },
  { question: "¿Se puede descarbonizar un motor nuevo?", answer: "En motores con menos de 20.000 km, la descarbonización no es necesaria. El servicio es más recomendable a partir de los 30.000–50.000 km, especialmente si se hace uso urbano predominante." },
  { question: "¿Qué garantía tiene el servicio?", answer: "Los centros certificados de Ecología Rentable ofrecen garantía sobre el proceso. Si los resultados no son satisfactorios (por ejemplo, el vehículo no mejora en emisiones ITV), se repite el tratamiento sin coste adicional." },
];

const services = [
  { icon: <Zap size={22} />, title: "Descarbonización de motor", desc: "Eliminación de depósitos de carbono en pistones, cámara, válvulas y escape. Diésel, gasolina e híbridos.", href: "/servicios/descarbonizacion" },
  { icon: <Shield size={22} />, title: "Limpieza de filtros DPF/FAP", desc: "Regeneración profesional del filtro de partículas para recuperar presión de escape y rendimiento.", href: "/servicios/limpieza-filtros" },
  { icon: <Leaf size={22} />, title: "Para particulares", desc: "Servicio para conductores: más potencia, menos consumo y preparación de ITV.", href: "/servicios/particulares" },
  { icon: <Wrench size={22} />, title: "Para talleres", desc: "Equipos descarbonizadores, formación y soporte técnico para ofrecer el servicio en taller.", href: "/servicios/talleres" },
  { icon: <Truck size={22} />, title: "Para flotas", desc: "Planes de mantenimiento preventivo con informes y presupuesto por vehículo.", href: "/servicios/flotas" },
  { icon: <TrendingUp size={22} />, title: "Reducción gases ITV", desc: "Descarbonización previa a la ITV para bajar emisiones por debajo del límite legal.", href: "/soluciones/itv-gases" },
  { icon: <Package size={22} />, title: "Alquiler y renting de descarbonizadoras", desc: "H2 Profit profesionales sin inversión. Alquiler mensual o renting con soporte incluido.", href: "/servicios/alquiler-renting-maquinas-descarbonizadoras" },
  { icon: <Gauge size={22} />, title: "Alquiler y renting de opacímetros", desc: "Opacímetros homologados y calibrados, ideales para preparación de ITV.", href: "/servicios/alquiler-renting-opacimetros" },
  { icon: <Activity size={22} />, title: "Alquiler y renting de analizadores de gases", desc: "Analizadores de CO, CO₂, HC, O₂ y lambda con formación y soporte incluidos.", href: "/servicios/alquiler-renting-analizadores-de-gases" },
  { icon: <Repeat2 size={22} />, title: "Descarbonización para flotas de renting", desc: "Reducción de incidencias y control de emisiones para empresas de renting.", href: "/servicios/descarbonizacion-para-flotas-de-renting" },
];

const metrics = [
  { label: "Reducción de consumo", pct: 85, value: "hasta 15%" },
  { label: "Recuperación de potencia", pct: 75, value: "hasta 20%" },
  { label: "Reducción de humos", pct: 95, value: "hasta 70%" },
  { label: "Extensión vida DPF", pct: 80, value: "hasta 4x" },
];

const audiences = [
  {
    id: "particular",
    title: "Particulares",
    icon: <Leaf size={20} />,
    desc: "Notas pérdida de potencia, más consumo, humo o tienes la ITV cerca. Te decimos el centro más próximo y el precio orientativo.",
    points: ["Diagnóstico previo OBD2", "45–90 min sin desmontaje", "Garantía de resultado en ITV"],
    href: "/servicios/particulares",
    formTitle: "Consulta tu precio orientativo",
    formSubtitle: "Cuéntanos el modelo, los kilómetros y el motivo. Te respondemos con el centro certificado más cercano y precio.",
    formMessage: "Vehículo: \nKilómetros: \nMotivo (potencia / consumo / ITV / humos): ",
    defaultTipo: "particular" as const,
  },
  {
    id: "taller",
    title: "Talleres",
    icon: <Wrench size={20} />,
    desc: "Quieres ofrecer descarbonización con equipo propio o en alquiler. Te enviamos plan de adquisición/renting y formación.",
    points: ["H2 Profit, opacímetros y analizadores", "Renting sin inversión inicial", "Formación + soporte técnico"],
    href: "/servicios/talleres",
    formTitle: "Plan para tu taller en 24 h",
    formSubtitle: "Indícanos volumen previsto y modalidad (compra, alquiler o renting). Te preparamos una propuesta cerrada.",
    formMessage: "Taller: \nLocalidad: \nModalidad de interés (compra / alquiler / renting): \nVolumen mensual estimado: ",
    defaultTipo: "taller" as const,
  },
  {
    id: "flota",
    title: "Flotas y empresas",
    icon: <Truck size={20} />,
    desc: "Mantenimiento preventivo planificado para flotas de empresa, renting o transporte. Reducimos averías y emisiones.",
    points: ["Plan por vehículo", "Informe antes/después", "Cobertura nacional"],
    href: "/servicios/flotas",
    formTitle: "Presupuesto por flota",
    formSubtitle: "Dinos el tamaño y tipo de flota. Te respondemos con plan, calendario y precio por vehículo.",
    formMessage: "Empresa: \nNº de vehículos: \nTipo (turismos / furgonetas / camiones): \nUbicación principal: ",
    defaultTipo: "flota" as const,
  },
];

const guarantees = [
  { icon: <Timer size={18} />, title: "Respuesta en 24 h", desc: "Asesor técnico real, no bots." },
  { icon: <Award size={18} />, title: "Más de 300 centros", desc: "Red certificada en toda España." },
  { icon: <Sparkles size={18} />, title: "Garantía de resultado", desc: "Si no mejora, repetimos sin coste." },
  { icon: <ShieldCheckIcon />, title: "Sin desmontaje", desc: "Proceso seguro para tu motor." },
];

function ShieldCheckIcon() {
  return <Shield size={18} />;
}

export default function Servicios() {
  return (
    <main>
      {/* HERO LANDING */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 pt-8 pb-14 md:pt-10 md:pb-20">
          <Breadcrumbs items={[{ label: "Servicios" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-6">
            <div className="lg:col-span-7">
              <Badge variant="secondary" className="mb-4">Servicios profesionales</Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground mb-5">
                Descarbonización, DPF y reducción de emisiones para cada tipo de cliente
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-7 leading-relaxed">
                Particulares, talleres y flotas. Diagnóstico OBD2, proceso por hidrógeno sin desmontaje y garantía de resultado en una red de más de 300 centros certificados.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mb-8">
                {guarantees.map((g) => (
                  <div key={g.title} className="bg-white/70 backdrop-blur rounded-xl border border-border p-3">
                    <div className="text-primary mb-1.5">{g.icon}</div>
                    <div className="text-xs font-bold text-foreground leading-tight">{g.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{g.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#audiencias">Ver mi servicio <ArrowRight size={16} className="ml-1.5" /></a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#catalogo">Catálogo completo</a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <QuoteForm
                context="servicios"
                title="Consulta tu precio en 24 h"
                subtitle="Te respondemos con el servicio recomendado, el centro más cercano y precio orientativo. Sin compromiso."
                defaultMessage={"Servicio de interés: \nVehículo o flota: \nMotivo: "}
              />
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCIAS CON FORM POR TIPO */}
      <section id="audiencias" className="py-16 section-light">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <Badge variant="secondary" className="mb-3">Para cada tipo de cliente</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Elige tu perfil y consulta precio sin compromiso
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Cada perfil tiene un proceso, un precio y un soporte distinto. Te respondemos con la propuesta que encaja contigo.
              </p>
            </div>
          </AnimatedSection>
          <div className="space-y-12">
            {audiences.map((a, idx) => (
              <motion.div
                key={a.id}
                id={a.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{a.icon}</span>
                    <Badge variant="outline" className="text-xs">{a.title}</Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{a.desc}</h3>
                  <ul className="space-y-2 mb-5">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm">
                    <Link to={a.href}>Ver servicio detallado <ArrowRight size={13} className="ml-1" /></Link>
                  </Button>
                </div>
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <QuoteForm
                    context={`servicios-${a.id}`}
                    title={a.formTitle}
                    subtitle={a.formSubtitle}
                    defaultMessage={a.formMessage}
                    defaultTipo={a.defaultTipo}
                    compact
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">Catálogo completo</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Todos los servicios de Ecología Rentable
              </h2>
              <p className="text-base max-w-2xl mx-auto text-muted-foreground">
                Cubrimos todo el ciclo de mantenimiento del sistema de combustión y postratamiento de gases.
              </p>
            </div>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div key={s.href} variants={staggerItem}>
                <Link to={s.href} className="group block h-full">
                  <Card className="h-full transition-all hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 duration-200">
                    <CardContent className="p-6 flex flex-col gap-3 h-full">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">{s.icon}</div>
                      <h3 className="font-bold text-base text-foreground">{s.title}</h3>
                      <p className="text-sm leading-relaxed flex-1 text-muted-foreground">{s.desc}</p>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Ver servicio <ArrowRight size={13} />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={mechanicWorkshop}
                alt="Mecánico profesional realizando descarbonización"
                className="rounded-2xl w-full shadow-xl"
                loading="lazy"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Badge variant="secondary" className="mb-3">¿Por qué Ecología Rentable?</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
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
                ].map((b, i) => (
                  <motion.div
                    key={b}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <Badge variant="secondary" className="mb-3">Resultados medibles</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Lo que puedes esperar tras un servicio
              </h2>
              <div className="space-y-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{m.label}</span>
                      <span className="font-bold text-primary">{m.value}</span>
                    </div>
                    <Progress value={m.pct} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <img
                src={engineDiagnostics}
                alt="Diagnóstico de motor con escáner OBD2"
                className="rounded-2xl w-full shadow-xl"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">Cómo trabajamos</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Un proceso claro, sin sorpresas
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: "Diagnóstico previo", desc: "El técnico lee los datos del vehículo con el escáner OBD2, registra el estado del motor y determina el servicio más adecuado." },
              { step: 2, title: "Descarbonización/limpieza", desc: "Se realiza el proceso elegido: hidrógeno HHO, tratamiento químico DPF, limpieza EGR o combinado. Sin desmontaje en la mayoría de casos." },
              { step: 3, title: "Verificación posterior", desc: "Se comprueba el resultado: lectura de gases, análisis OBD2 y prueba de conducción si es necesario." },
              { step: 4, title: "Informe y recomendaciones", desc: "El cliente recibe un informe del servicio realizado con los datos antes/después y las recomendaciones de mantenimiento." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-5 flex gap-5 items-start">
                    <div className="step-number shrink-0">{s.step}</div>
                    <div>
                      <h3 className="font-bold mb-1 text-foreground">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO FINAL */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-3">Consulta tu precio</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Cuéntanos qué necesitas y te respondemos en menos de 24 h
              </h2>
              <p className="text-muted-foreground text-sm">
                Sin formularios eternos. Solo lo justo para entender tu caso y enviarte el presupuesto.
              </p>
            </div>
          </AnimatedSection>
          <QuoteForm
            context="servicios-final"
            title="Solicita tu presupuesto"
            subtitle="Te asignamos un asesor técnico real que conoce el servicio. Sin coste ni compromiso."
          />
        </div>
      </section>

      <RelatedHubs
        eyebrow="Navegación"
        heading="Continúe explorando Ecología Rentable"
        items={[
          { title: "Soluciones técnicas", description: "Equipos y procesos profesionales para cada tipo de motor.", href: "/soluciones", icon: Lightbulb },
          { title: "Tienda profesional", description: "Descarbonizadoras, opacímetros y analizadores certificados.", href: "/tienda", icon: ShoppingBag },
          { title: "Encuentra tu centro", description: "Red nacional de talleres certificados en toda España.", href: "/encuentra-tu-centro", icon: MapPin },
          { title: "Hazte socio", description: "Programa de talleres con formación y soporte técnico.", href: "/socios", icon: Users },
          { title: "Blog técnico", description: "Guías de mantenimiento, ITV y descarbonización.", href: "/blog", icon: BookOpen },
          { title: "Sobre nosotros", description: "Misión, equipo y compromiso medioambiental.", href: "/nosotros", icon: Leaf },
        ]}
      />

      <FAQSection items={faqServicios} />

      <CTABox
        title="¿Necesitas más información?"
        description="Contacta con nuestro equipo para resolver tus dudas o solicitar presupuesto."
        primaryLabel="Contactar"
        primaryHref="/contacto"
        secondaryLabel="Hazte socio"
        secondaryHref="/socios"
      />
    </main>
  );
}
