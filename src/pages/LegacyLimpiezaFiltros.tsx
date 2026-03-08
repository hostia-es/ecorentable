import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Zap, Settings } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/components/common/Animations";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WP = "https://ecologiarentable.es/wp-content/uploads";

const badges = [
  { icon: <Zap size={18} />, title: "Eficaz", desc: "Ciclos predefinidos y control del nivel de agente de limpieza garantizan una limpieza efectiva." },
  { icon: <Shield size={18} />, title: "Segura", desc: "Fabricación industrial y funda protectora garantizan un proceso seguro y de calidad." },
  { icon: <Settings size={18} />, title: "Práctica", desc: "Tratamiento autónomo y fiable, sistema de secado y facilidad de uso para una experiencia cómoda." },
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
  return (
    <main>
      <PageHero
        title="Limpieza Profesional de Filtros de Partículas"
        subtitle="Descubre nuestros servicios de descarbonización y limpieza de filtros de partículas. ¡Mejora el rendimiento de tu coche y ahorra dinero mientras cuidas el medio ambiente!"
        breadcrumbs={[{ label: "Limpieza de Filtros de Partículas" }]}
        badge="Restaura la Eficiencia de tu Motor"
      />

      {/* 3 FEATURE BADGES + CARBON FAP IMAGE */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <StaggerChildren>
                <div className="space-y-6">
                  {badges.map((b) => (
                    <Card key={b.title}>
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="icon-circle w-10 h-10 shrink-0">{b.icon}</div>
                        <div>
                          <h3 className="font-bold mb-1 text-foreground">{b.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </StaggerChildren>
              <div className="flex justify-center">
                <img
                  src={`${WP}/2024/11/carbon-fap-ecologia-rentable.png`}
                  alt="Carbon FAP máquina limpiadora de filtros de partículas"
                  className="max-w-full h-auto max-h-[450px] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CARBON FAP SECTION */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-3">Estación de limpieza de filtros de partículas</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
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
                    <span className="text-sm text-foreground"><strong>{item.label}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* PARTNER LOGOS */}
      <section className="py-10 section-light">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">Socios</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Socio" className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ADAPTADOR FEATURES */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">limpieza de filtros de partículas</Badge>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Adaptador exclusivo para todos los tipos de FAP</h3>
            </div>
            <StaggerChildren>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {adaptadorFeatures.map((f) => (
                  <Card key={f.title}>
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

      {/* CTA BANNER */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={`${WP}/2024/11/unete-a-ecologia-rentable-hoy.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-3">Transforma tu Vehículo y Tu Negocio Hoy Mismo</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¡Únete a la Revolución Ecológica con Ecología Rentable!
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-6">
            Descubre cómo Ecología Rentable puede potenciar tu negocio automotriz y mejorar el rendimiento de tu vehículo con servicios de descarbonización y limpieza de filtros de partículas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/descarbonizacion" className="btn-primary text-sm">Descarbonización <ArrowRight size={14} /></Link>
            <Link to="/contacto" className="btn-outline text-sm border-white text-white hover:bg-white/10">Contacto <ArrowRight size={14} /></Link>
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="nombre">Nombre</Label><Input id="nombre" placeholder="Tu nombre" /></div>
                <div><Label htmlFor="apellidos">Apellidos</Label><Input id="apellidos" placeholder="Tus apellidos" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="tu@email.com" /></div>
                <div><Label htmlFor="telefono">Teléfono</Label><Input id="telefono" type="tel" placeholder="+34 600 000 000" /></div>
              </div>
              <div><Label htmlFor="mensaje">Mensaje</Label><Textarea id="mensaje" placeholder="¿En qué podemos ayudarte?" rows={4} /></div>
              <Button type="submit" className="w-full">ENVIAR</Button>
            </form>
          </div>
        </section>
      </AnimatedSection>

      <FAQSection items={faqItems} title="Preguntas Frecuentes" />
    </main>
  );
}
