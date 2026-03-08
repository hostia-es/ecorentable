import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/Animations";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/common/FAQSection";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WP = "https://ecologiarentable.es/wp-content/uploads";

const faqItems = [
  { question: "¿En qué consiste la descarbonización de vehículos?", answer: "La descarbonización es un proceso que elimina la carbonilla o hollín acumulado en el motor, mejorando su rendimiento y evitando averías costosas." },
  { question: "¿Cuál es la diferencia entre la limpieza de filtro de partículas y la descarbonización?", answer: "La limpieza de filtro de partículas se enfoca en eliminar los residuos acumulados en el filtro, mientras que la descarbonización aborda la eliminación de la carbonilla en el motor en general." },
  { question: "¿Cuál es la ventaja de optar por la descarbonización con inyección de hidrógeno en Ecología Rentable?", answer: "La descarbonización con inyección de hidrógeno es una solución efectiva y respetuosa con el medio ambiente que ayuda a mejorar el rendimiento del motor, reducir emisiones nocivas y disminuir el consumo de combustible." },
  { question: "¿Cuánto tiempo dura el proceso de descarbonización?", answer: "El tiempo necesario para la descarbonización puede variar dependiendo del estado del motor de tu vehículo. En general, el proceso puede tardar entre 1 y 3 horas. Te recomendamos contactar con nuestro equipo para una evaluación personalizada." },
];

export default function Nosotros() {
  return (
    <main>
      <PageHero
        title="Nosotros"
        breadcrumbs={[{ label: "¿Quiénes somos?" }]}
      />

      {/* INTRO + YOUNES */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-3">limpieza y cuidado de tu vehículo</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Ecología rentable</h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Nos comprometemos a ofrecer soluciones innovadoras y sostenibles para la descarbonización de coches y la limpieza de filtro de partículas. Con más de una década de experiencia en el sector, nuestro equipo de expertos se esfuerza por brindar un servicio de alta calidad que garantice el rendimiento óptimo de tu vehículo, al tiempo que contribuimos a la preservación del medio ambiente. ¡Confía en nosotros para mantener tu motor limpio y eficiente!
                </p>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="mision" className="border rounded-lg px-1 bg-card">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline text-foreground">
                      Nuestra Misión
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      Nos dedicamos a ofrecer soluciones innovadoras para la descarbonización de vehículos y la limpieza de filtros de partículas. Nuestro objetivo es ayudar a particulares y profesionales a mantener sus vehículos en excelente estado, reduciendo costos de mantenimiento y contribuyendo a un ambiente más limpio y sostenible.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="vision" className="border rounded-lg px-1 bg-card">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline text-foreground">
                      Nuestra Visión
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      Somos líderes en la industria de la descarbonización y la limpieza de filtros de partículas, comprometidos con la excelencia y la innovación. Nos esforzamos por proporcionar servicios de alta calidad que no solo mejoren el rendimiento de los vehículos, sino que también promuevan la sostenibilidad y la economía verde.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <img
                  src={`${WP}/2024/11/Ecologia-rentable-younes.jpg`}
                  alt="Younes Smaini - Ecología Rentable"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* QUOTE CALLOUT */}
      <section className="py-8 section-alt">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base font-medium text-primary italic">
            Únete a Ecología Rentable y convierte tu negocio en un motor de cambio sostenible.
          </p>
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
