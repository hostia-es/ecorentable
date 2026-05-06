import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Shield, Wrench, Truck, Leaf, TrendingUp, Package, Gauge, Activity, Repeat2, ShoppingBag, MapPin, Users, BookOpen, Lightbulb } from "lucide-react";
import RelatedHubs from "@/components/common/RelatedHubs";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection, StaggerChildren, staggerItem, AnimatedCounter } from "@/components/common/Animations";
import mechanicWorkshop from "@/assets/mechanic-workshop-service.jpg";
import engineDiagnostics from "@/assets/engine-diagnostics.jpg";

const faqServicios = [
  { question: "¿Cuál es la diferencia entre descarbonización y limpieza DPF?", answer: "La descarbonización trata el interior del motor (pistones, válvulas, EGR) eliminando depósitos de carbono mediante hidrógeno. La limpieza DPF/FAP es un servicio específico para el filtro de partículas, que puede hacerse por vía química, ultrasónica o combinada." },
  { question: "¿Es seguro para mi motor?", answer: "Sí. Los procesos que utilizamos no implican desmontaje de piezas ni agentes abrasivos. El hidrógeno actúa como un limpiador suave y eficaz, sin riesgo para juntas, retenes ni componentes electrónicos." },
  { question: "¿Se puede descarbonizar un motor nuevo?", answer: "En motores con menos de 20.000 km, la descarbonización no es necesaria. El servicio es más recomendable a partir de los 30.000–50.000 km, especialmente si se hace uso urbano predominante." },
  { question: "¿Qué garantía tiene el servicio?", answer: "Los centros certificados de Ecología Rentable ofrecen garantía sobre el proceso. Si los resultados no son satisfactorios (por ejemplo, el vehículo no mejora en emisiones ITV), se repite el tratamiento sin coste adicional." },
];

const services = [
  { icon: <Zap size={22} />, title: "Descarbonización de motor", desc: "Eliminación de depósitos de carbono en pistones, cámara, válvulas y escape. Compatible con diésel, gasolina e híbridos.", href: "/servicios/descarbonizacion" },
  { icon: <Shield size={22} />, title: "Limpieza de filtros DPF/FAP", desc: "Regeneración profesional del filtro de partículas para recuperar la presión de escape y el rendimiento del motor.", href: "/servicios/limpieza-filtros" },
  { icon: <Leaf size={22} />, title: "Para particulares", desc: "Servicio dirigido al conductor particular que quiere mejorar el rendimiento, reducir el consumo o preparar la ITV.", href: "/servicios/particulares" },
  { icon: <Wrench size={22} />, title: "Para talleres", desc: "Equipos descarbonizadores, formación y soporte técnico para talleres que quieren ofrecer el servicio a sus clientes.", href: "/servicios/talleres" },
  { icon: <Truck size={22} />, title: "Para flotas", desc: "Planes de mantenimiento preventivo para flotas de empresa: mantenimiento programado, informes y presupuesto por vehículo.", href: "/servicios/flotas" },
  { icon: <TrendingUp size={22} />, title: "Reducción gases ITV", desc: "Descarbonización previa a la ITV para reducir emisiones por debajo de los límites exigidos en la inspección.", href: "/soluciones/itv-gases" },
  { icon: <Package size={22} />, title: "Alquiler y renting de descarbonizadoras", desc: "Accede a descarbonizadoras H2 Profit profesionales sin inversión. Alquiler mensual o renting con soporte técnico incluido.", href: "/servicios/alquiler-renting-maquinas-descarbonizadoras" },
  { icon: <Gauge size={22} />, title: "Alquiler y renting de opacímetros", desc: "Opacímetros homologados y calibrados sin coste de compra. Ideal para talleres con preparación de ITV.", href: "/servicios/alquiler-renting-opacimetros" },
  { icon: <Activity size={22} />, title: "Alquiler y renting de analizadores de gases", desc: "Analizadores de CO, CO₂, HC, O₂ y lambda en alquiler o renting. Formación y soporte incluidos.", href: "/servicios/alquiler-renting-analizadores-de-gases" },
  { icon: <Repeat2 size={22} />, title: "Descarbonización para flotas de renting", desc: "Servicio especializado para empresas de renting de coches. Reducción de incidencias, control de emisiones y mantenimiento preventivo planificado.", href: "/servicios/descarbonizacion-para-flotas-de-renting" },
];

const metrics = [
  { label: "Reducción de consumo", pct: 85, value: "hasta 15%" },
  { label: "Recuperación de potencia", pct: 75, value: "hasta 20%" },
  { label: "Reducción de humos", pct: 95, value: "hasta 70%" },
  { label: "Extensión vida DPF", pct: 80, value: "hasta 4x" },
];

const audiences = [
  { title: "Particulares", desc: "Conductores que notan pérdida de potencia, más consumo, humos o que quieren preparar la ITV.", cta: "Ver servicio particular", href: "/servicios/particulares" },
  { title: "Talleres", desc: "Mecánicos que quieren ofrecer descarbonización a sus clientes con equipo propio y soporte técnico.", cta: "Ver servicio taller", href: "/servicios/talleres" },
  { title: "Flotas", desc: "Empresas con flota de vehículos diésel que necesitan un plan de mantenimiento preventivo eficiente.", cta: "Ver servicio flotas", href: "/servicios/flotas" },
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
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                ¿Qué incluye nuestro catálogo de servicios?
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
      <section className="py-14 section-alt">
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
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={engineDiagnostics}
                alt="Diagnóstico de motor con escáner OBD2"
                className="rounded-2xl w-full shadow-xl"
                loading="lazy"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
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
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                ¿Cómo es el proceso?
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

      {/* PARA QUIÉN */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">¿Para quién son nuestros servicios?</h2>
            </div>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Card className="h-full hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-foreground">{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-4 text-muted-foreground">{p.desc}</p>
                    <Button asChild size="sm">
                      <Link to={p.href}>
                        {p.cta} <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerChildren>
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
