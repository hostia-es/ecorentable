import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Zap, Settings } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/components/common/Animations";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WP = "https://ecologiarentable.es/wp-content/uploads";

const badges = [
  { icon: <Zap size={20} />, title: "Eficaz", desc: "Ciclos predefinidos y control del nivel de agente de limpieza garantizan una limpieza efectiva." },
  { icon: <Shield size={20} />, title: "Segura", desc: "Fabricación industrial y funda protectora garantizan un proceso seguro y de calidad." },
  { icon: <Settings size={20} />, title: "Practica", desc: "Tratamiento autónomo y fiable, sistema de secado y facilidad de uso para una experiencia cómoda." },
];

const adaptadorFeatures = [
  { title: "Cubierta de Protección", desc: "Garantiza sellado y protección contra salpicaduras para mantener la integridad del sistema." },
  { title: "Automatización", desc: "Ciclos predefinidos ajustados según el nivel de obstrucción del FAP para un tratamiento eficiente." },
  { title: "Efectividad Asegurada", desc: "Utiliza Carbon FAP Liquid, un producto de alto rendimiento y seguro para limpiar los FAP." },
];

const partnerLogos = [
  `${WP}/2024/11/31160688992.png`,
  `${WP}/2024/11/36036483582.png`,
  `${WP}/2024/11/9261854081.png`,
  `${WP}/2024/11/10283982181.png`,
  `${WP}/2024/11/35849468051.png`,
];

const faqItems = [
  { question: "¿En qué consiste la descarbonización de vehículos?", answer: "La descarbonización es un proceso que elimina la carbonilla o hollín acumulado en el motor, mejorando su rendimiento y evitando averías costosas." },
  { question: "¿Cuál es la diferencia entre la limpieza de filtro de partículas y la descarbonización?", answer: "La limpieza de filtro de partículas se enfoca en eliminar los residuos acumulados en el filtro, mientras que la descarbonización aborda la eliminación de la carbonilla en el motor en general." },
  { question: "¿Cuál es la ventaja de optar por la descarbonización con inyección de hidrógeno en Ecología Rentable?", answer: "La descarbonización con inyección de hidrógeno es una solución efectiva y respetuosa con el medio ambiente que ayuda a mejorar el rendimiento del motor, reducir emisiones nocivas y disminuir el consumo de combustible." },
  { question: "¿Cuánto tiempo dura el proceso de descarbonización?", answer: "El tiempo necesario para la descarbonización puede variar dependiendo del estado del motor de tu vehículo. En general, el proceso puede tardar entre 1 y 3 horas. Te recomendamos contactar con nuestro equipo para una evaluación personalizada." },
];

export default function LimpiezaFiltros() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <main>
      {/* HERO — centered, dark green bg, matching original */}
      <section
        className="relative py-28 md:py-36 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--dark-green)) 0%, hsl(var(--dark-green-deep)) 100%)" }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-sm uppercase tracking-widest mb-4 font-semibold" style={{ color: "hsl(var(--accent-green))" }}>
            Restaura la Eficiencia de tu Motor
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Limpieza Profesional de{" "}
            <br className="hidden md:block" />
            Filtros de Partículas
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: "hsl(0 0% 85%)" }}>
            Descubre nuestros servicios de descarbonización y limpieza de filtros de partículas. ¡Mejora el rendimiento de tu coche y ahorra dinero mientras cuidas el medio ambiente!
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{ background: "hsl(var(--accent-green))", color: "hsl(var(--dark-green-deep))" }}
          >
            CONTACTO
          </Link>
        </div>
      </section>

      {/* 3 FEATURE CARDS — white card overlapping hero bottom, 3 columns */}
      <section className="relative -mt-14 z-10 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {badges.map((b) => (
                <div key={b.title} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent-green) / 0.12)", color: "hsl(var(--accent-green))" }}>
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "hsl(var(--foreground))" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CARBON FAP — image LEFT, text RIGHT (matching original layout) */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <img
                  src={`${WP}/2024/11/carbon-fap-ecologia-rentable.png`}
                  alt="Carbon FAP máquina limpiadora de filtros de partículas"
                  className="max-w-full h-auto max-h-[500px] object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "hsl(var(--accent-green))" }}>
                  Estación de limpieza de filtros de partículas
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">
                  Carbon FAP Limpieza de filtros de partículas
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-4">
                  Descubre la eficaz máquina limpiadora Carbon FAP, tu mejor aliada para mantener en óptimas condiciones los filtros de partículas, ya sean de gasolina o diésel.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground mb-4">
                  Con un ciclo automatizado, esta innovadora tecnología elimina de manera efectiva residuos, partículas no quemadas y obstrucciones en el FAP.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Desarrollada por Ecología Rentable, la máquina Carbon FAP ofrece el equilibrio perfecto entre aditivos individuales y dispositivos costosos, brindando una solución accesible y eficiente para talleres de uso general.
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "Cubierta Protectora", desc: "Aisla, fija y protege contra derrames." },
                    { label: "Procesamiento Automático", desc: "Ciclos preestablecidos adaptados a los niveles de obstrucción del FAP." },
                    { label: "Resultado Asegurado", desc: "Un producto seguro para el FAP, libre de disolventes y de alta eficacia." },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground"><strong>{item.label}:</strong> <span className="text-muted-foreground">{item.desc}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* PARTNER LOGOS */}
      <section className="py-10 section-alt">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>Socios</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerLogos.map((logo, i) => (
              <img key={i} src={logo} alt={`Socio ${i + 1}`} className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ADAPTADOR FEATURES — 3 columns */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "hsl(var(--accent-green))" }}>
                limpieza de filtros de partículas
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Adaptador exclusivo para todos los tipos de FAP</h3>
            </div>
            <StaggerChildren>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {adaptadorFeatures.map((f) => (
                  <Card key={f.title} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold mb-2 text-foreground">{f.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA BANNER — full-width image bg */}
      <section className="relative py-24 overflow-hidden">
        <img
          src={`${WP}/2024/11/unete-a-ecologia-rentable-hoy.png`}
          alt="Únete a Ecología Rentable"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(var(--accent-green))" }}>
            Transforma tu Vehículo y Tu Negocio Hoy Mismo
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            ¡Únete a la Revolución Ecológica con Ecología Rentable!
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Descubre cómo Ecología Rentable puede potenciar tu negocio automotriz y mejorar el rendimiento de tu vehículo con servicios de descarbonización y limpieza de filtros de partículas. ¡Sé parte de la solución para un futuro más limpio y sostenible! Contáctanos ahora para comenzar tu transformación hacia la excelencia ecológica y rentable. ¡Haz clic para iniciar tu viaje hacia un mundo automotriz más limpio y eficiente!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/descarbonizacion" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all" style={{ background: "hsl(var(--accent-green))", color: "hsl(var(--dark-green-deep))" }}>
              Descarbonización <ArrowRight size={14} />
            </Link>
            <Link to="/contacto" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 border-white text-white hover:bg-white/10 transition-all">
              Contacto <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-3 text-foreground">
              ¿Listo para darle a tu vehículo el cuidado que se merece?
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Ponte en contacto con nosotros para más información sobre nuestros servicios de descarbonización de coches y limpieza de filtro de partículas.
            </p>
            {formSubmitted ? (
              <Card className="text-center">
                <CardContent className="p-10">
                  <div className="icon-circle w-16 h-16 mx-auto mb-4"><CheckCircle size={28} /></div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">¡Mensaje enviado!</h3>
                  <p className="text-sm text-muted-foreground mb-5">Te responderemos en menos de 24 horas.</p>
                  <Button asChild><Link to="/">Volver al inicio</Link></Button>
                </CardContent>
              </Card>
            ) : (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="nombre">Nombre</Label><Input id="nombre" placeholder="Tu nombre" required /></div>
                  <div className="space-y-1.5"><Label htmlFor="apellidos">Apellidos</Label><Input id="apellidos" placeholder="Tus apellidos" required /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="tu@email.com" required /></div>
                  <div className="space-y-1.5"><Label htmlFor="telefono">Teléfono</Label><Input id="telefono" type="tel" placeholder="+34 600 000 000" /></div>
                </div>
                <div className="space-y-1.5"><Label htmlFor="mensaje">Mensaje</Label><Textarea id="mensaje" placeholder="¿En qué podemos ayudarte?" rows={4} /></div>
                <Button type="submit" className="w-full">ENVIAR</Button>
              </form>
            )}
          </div>
        </section>
      </AnimatedSection>

      <FAQSection
        items={faqItems}
        title="Preguntas Frecuentes"
        subtitle="En esta sección, encontrarás respuestas a las preguntas más comunes sobre la descarbonización de coches y la limpieza de filtro de partículas que ofrecemos en Ecología Rentable. Si aún tienes alguna pregunta adicional, no dudes en ponerte en contacto con nosotros."
      />
    </main>
  );
}
