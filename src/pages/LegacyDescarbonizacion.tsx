import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Search, Sparkles, ShieldCheck, FileCheck, FileText, Fuel } from "lucide-react";
import { AnimatedSection, StaggerChildren, AnimatedCounter } from "@/components/common/Animations";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WP = "https://ecologiarentable.es/wp-content/uploads";

const features = [
  { icon: <Search size={20} />, title: "Diagnóstico Personalizado", desc: "Obtén un análisis detallado del estado de tu motor para un tratamiento a medida." },
  { icon: <Sparkles size={20} />, title: "Limpieza Profunda", desc: "Elimina de manera efectiva la carbonilla y residuos para restaurar el rendimiento óptimo." },
  { icon: <ShieldCheck size={20} />, title: "Prevención de Averías", desc: "Evita costosas reparaciones al mantener tu motor libre de carbonilla." },
  { icon: <FileCheck size={20} />, title: "Facilita el Paso por la ITV", desc: "Reduce la emisión de gases contaminantes y facilita el paso por la Inspección Técnica." },
  { icon: <FileText size={20} />, title: "Informe Detallado", desc: "Informe antes y después del tratamiento para ver la mejora en el rendimiento." },
  { icon: <Fuel size={20} />, title: "Ahorro de Combustible", desc: "Gracias a la limpieza profunda de tu motor, lo que te permite gastar menos y conducir más." },
];

const steps = [
  { num: "01", title: "Evaluación Inicial", desc: "Evaluación exhaustiva de tu vehículo para identificar la presencia de carbonilla y la obstrucción en el filtro.", img: `${WP}/2024/11/Evaluacion-Inicial.jpg` },
  { num: "02", title: "Tratamiento Especializado", desc: "Aplicamos nuestro proceso de descarbonización por inyección de hidrógeno para eliminar la carbonilla.", img: `${WP}/2024/11/Tratamiento-Especializado.png` },
  { num: "03", title: "Limpieza Profesional", desc: "Utilizamos nuestra estación de limpieza para eliminar eficazmente residuos y partículas que obstruyen el filtro.", img: `${WP}/2024/11/Limpieza-Profesional.png` },
  { num: "04", title: "Informe y Recomendaciones", desc: "Proporcionamos un informe detallado antes y después del servicio, junto con recomendaciones.", img: `${WP}/2024/11/Informe-y-Recomendaciones.png` },
];

const partnerLogos = [
  `${WP}/2024/11/36036483582.png`,
  `${WP}/2024/11/9261854081.png`,
  `${WP}/2024/11/10283982181.png`,
  `${WP}/2024/11/35849468051.png`,
  `${WP}/2024/11/31160688992.png`,
];

const faqItems = [
  { question: "¿En qué consiste la descarbonización de vehículos?", answer: "La descarbonización es un proceso que elimina la carbonilla o hollín acumulado en el motor, mejorando su rendimiento y evitando averías costosas." },
  { question: "¿Cuál es la diferencia entre la limpieza de filtro de partículas y la descarbonización?", answer: "La limpieza de filtro de partículas se enfoca en eliminar los residuos acumulados en el filtro, mientras que la descarbonización aborda la eliminación de la carbonilla en el motor en general." },
  { question: "¿Cuál es la ventaja de optar por la descarbonización con inyección de hidrógeno en Ecología Rentable?", answer: "La descarbonización con inyección de hidrógeno es una solución efectiva y respetuosa con el medio ambiente que ayuda a mejorar el rendimiento del motor, reducir emisiones nocivas y disminuir el consumo de combustible." },
  { question: "¿Cuánto tiempo dura el proceso de descarbonización?", answer: "El tiempo necesario para la descarbonización puede variar dependiendo del estado del motor de tu vehículo. En general, el proceso puede tardar entre 1 y 3 horas. Te recomendamos contactar con nuestro equipo para una evaluación personalizada." },
];

export default function Descarbonizacion() {
  return (
    <main>
      <PageHero
        title="Descarbonización de Vehículos"
        subtitle="¿Está su vehículo perdiendo rendimiento? La descarbonización es la solución efectiva para eliminar la carbonilla y restaurar la salud de su motor."
        breadcrumbs={[{ label: "Descarbonización" }]}
        badge="Recupere el Rendimiento de su Motor"
      />

      {/* HY-CARBON CONNECT SECTION */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-3">Nuestra Solución</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Descarbonización por Inyección de Hidrógeno
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Utilizamos la tecnología Hy-Carbon, una solución efectiva y no agresiva que no introduce químicos ni corrosivos en su motor. La carbonilla simplemente se disuelve y se evacua naturalmente con los gases de escape.
                </p>
                <Link to="/nosotros" className="btn-primary text-sm">
                  Nosotros <ArrowRight size={14} />
                </Link>
              </div>
              <div className="flex justify-center">
                <img
                  src={`${WP}/2024/11/hc-connect-sin-fondo.png`}
                  alt="Hy-Carbon Connect máquina descarbonizadora"
                  className="max-w-full h-auto max-h-[400px] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* HY-CARBON CONNECT + MAP */}
      <AnimatedSection>
        <section className="py-14 section-alt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <img
                  src={`${WP}/2024/11/map-evcharge.png`}
                  alt="Mapa de centros de descarbonización en España"
                  className="rounded-xl max-w-full h-auto shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">Descarbonización por inyección de hidrógeno</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Hy-Carbon Connect Descarbonización
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Nuestra innovación tecnológica que lleva la descarbonización de motores a un nuevo nivel. Conoce cómo esta solución única puede transformar el rendimiento de tu vehículo.
                </p>
                <Link to="/contacto" className="btn-primary text-sm">
                  Contacto <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 6 FEATURE CARDS */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <StaggerChildren>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f) => (
                  <Card key={f.title}>
                    <CardContent className="p-6">
                      <div className="icon-circle w-11 h-11 mb-3">{f.icon}</div>
                      <h3 className="font-bold mb-2 text-foreground">{f.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>
      </AnimatedSection>

      {/* PROCESS */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Cómo Trabajamos</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nuestro Proceso En Ecología Rentable</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s) => (
                <div key={s.num} className="text-center">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                  <div className="text-xs font-bold text-primary mb-1">{s.num}.</div>
                  <h3 className="font-bold mb-2 text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* STATS */}
      <AnimatedSection>
        <section className="py-14 section-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10+", label: "Años De Experiencia" },
                { value: "300+", label: "Máquinas" },
                { value: "50K+", label: "Vehículos" },
                { value: "40K+", label: "Clientes" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="text-sm text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* SPECIALISTS */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-3">mantener tu vehículo en perfecto estado</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Somos Especialistas en la Salud de tu Vehículo
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Somos expertos en descarbonización y limpieza de filtros de partículas. Nuestra misión es optimizar el rendimiento de tu vehículo, reducir emisiones y ahorrarte dinero.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Mejora el Rendimiento", "Reduce el Consumo de Combustible", "Evita Averías Costosas", "Disminuye las Emisiones Contaminantes"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/nosotros" className="btn-primary text-sm">
                  Nosotros <ArrowRight size={14} />
                </Link>
              </div>
              <div>
                <img
                  src={`${WP}/2024/11/Ecologia-rentable-2.png`}
                  alt="Especialistas en descarbonización"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* BENEFITS */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={`${WP}/2024/11/Descarbonizacion-ecologia-rentable-espana.webp`}
                  alt="Beneficios de la descarbonización"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">Mejora el Rendimiento y la Eficiencia</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Beneficios de la Descarbonización para su Vehículo
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  La descarbonización de su vehículo ofrece múltiples beneficios que mejoran tanto el rendimiento como la eficiencia de su motor. Al eliminar los depósitos de carbonilla, su vehículo recupera su rendimiento original, reduce el consumo de combustible y disminuye las emisiones nocivas.
                </p>
                <ul className="space-y-3">
                  {["Ahorro a Largo Plazo", "Reducción de Emisiones Nocivas", "Mejora en el Rendimiento del Motor"].map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
          <Link to="/contacto" className="btn-primary text-sm">
            Contacto <ArrowRight size={14} />
          </Link>
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
