import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingUp, GraduationCap, BarChart, Package, Users, Heart, Quote, Wrench, Lightbulb, ShoppingBag, MapPin, BookOpen, Leaf } from "lucide-react";
import RelatedHubs from "@/components/common/RelatedHubs";
import { AnimatedSection, StaggerChildren, AnimatedCounter } from "@/components/common/Animations";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/common/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const WP = "https://ecologiarentable.es/wp-content/uploads";

const benefits = [
  { icon: <TrendingUp size={20} />, title: "Aumente su Facturación", desc: "Un mercado en constante crecimiento. Nuestros socios generan más de 2.500€ en facturación." },
  { icon: <GraduationCap size={20} />, title: "Formación Certificada", desc: "Obtenga una autorización de diploma para convertirse en un jugador clave en la instalación de productos." },
  { icon: <BarChart size={20} />, title: "Margen Beneficioso", desc: "Alta rentabilidad con márgenes generados en relación con la mano de obra requerida." },
  { icon: <Package size={20} />, title: "Productos Innovadores", desc: "Actividad complementaria rentable impulsada por el ahorro real y la demanda del mercado." },
  { icon: <Users size={20} />, title: "Red de Profesionales", desc: "Únase a una red de profesionales con comunicación compartida y soporte técnico especializado." },
  { icon: <Heart size={20} />, title: "Fidelización del Cliente", desc: "Trabaje en los motores como un profesional certificado y mantenga a sus clientes fieles a su taller." },
];

const products = [
  { name: "H2 Profit 1000", desc: "Es una tecnología patentada única que controla el dispositivo EGR para mejorar la eficiencia de la limpieza. Un verdadero probador de EGR, la máquina también permite optimizar la búsqueda de fallos en las válvulas EGR al forzarlas a abrirse o cerrarse.", img: `${WP}/2024/12/H2-Profit-1000.png`, link: "/tienda/descarbonizadoras/h2-profit-1000" },
  { name: "Hy-Carbon Connect descarbonización", desc: "Es una tecnología respetuosa con el medio ambiente porque no contiene productos químicos: inyectamos hidrógeno directamente en el motor para limpiarlo a fondo.", img: `${WP}/2024/12/Hy-Carbon-Connect-ecologia-rentable.png`, link: "/tienda/accesorios-consumibles/hy-carbon-connect" },
  { name: "H2 Profit 2000", desc: "Se utiliza para la descalcificación del motor de hidrógeno para limpiarlo y mejorar su rendimiento, al tiempo que se reduce su consumo. Elimina todos los residuos de carbono contenidos en el motor en solo 60 minutos.", img: `${WP}/2024/12/freepik_br_359974fb-1e58-44f8-a2b2-f02aec440ccd.png`, link: "/tienda/descarbonizadoras/h2-profit-2000" },
  { name: "Carbon FAP Limpieza de filtros de partículas", desc: "Descubre la eficaz máquina limpiadora Carbon FAP, tu mejor aliada para mantener en óptimas condiciones los filtros de partículas, ya sean de gasolina o diésel.", img: `${WP}/2024/11/carbon-fap-ecologia-rentable.png`, link: "/tienda/aditivos/carbon-fap" },
  { name: "H2 Profit 3000", desc: "Descarbonización de motores de hidrógeno se presenta como la mejor solución para la limpieza del motor de vehículos ligeros, vehículos comerciales ligeros, vehículos pesados de mercancías y autobuses, todo en una sola maquina.", img: `${WP}/2024/12/H2-Profit-3000.png`, link: "/tienda/descarbonizadoras/h2-profit-3000" },
];

const testimonials = [
  { name: "Nelson Valverde", role: "Socio", text: "Como profesional del sector automotriz, la asociación con Ecología Rentable ha sido clave para ofrecer servicios de calidad y diferenciarnos en el mercado.", img: `${WP}/2024/11/man-with-plastic-cup-near-office-building-2021-09-24-02-55-21-utc.jpg` },
  { name: "Maria Jiménez", role: "Cliente", text: "La limpieza de filtro de partículas con la máquina Carbon FAP de Ecología Rentable es eficaz y sencilla, ¡una solución imprescindible para mantener mi vehículo!", img: `${WP}/2024/11/businesswoman-typing-message-by-phone-on-the-city-2022-01-12-05-09-31-utc.jpg` },
  { name: "Laura Herrera", role: "Cliente", text: "La descarbonización de mi vehículo con Ecología Rentable fue una inversión que valió la pena. Noté una mejora inmediata en el rendimiento y el ahorro de combustible.", img: `${WP}/2024/11/young-businesswoman-working-in-office-2022-03-24-21-14-10-utc.jpg` },
];

const faqItems = [
  { question: "¿Qué beneficios obtengo al convertirme en socio de Ecología Rentable?", answer: "Al convertirte en socio, disfrutarás de un margen de beneficio alto, formación certificada, acceso a tecnología de última generación y la oportunidad de ofrecer servicios innovadores que atraerán a nuevos clientes." },
  { question: "¿Cuál es el proceso para convertirme en socio?", answer: "El proceso es sencillo. Primero, completa el formulario de contacto en nuestra sección de «Contáctanos». Luego, uno de nuestros especialistas te guía a través de los pasos necesarios para convertirte en socio, incluyendo la formación y el soporte técnico." },
  { question: "¿Qué tipo de soporte técnico y formación ofrece Ecología Rentable a sus socios?", answer: "Ofrecemos soporte técnico especializado y formación personalizada para asegurarnos de que estás bien preparado para utilizar nuestras tecnologías. También proporcionamos materiales promocionales para ayudarte a maximizar tu rentabilidad." },
  { question: "¿Puedo alquilar el equipo en lugar de comprarlo?", answer: "Sí, ofrecemos opciones de alquiler flexible para nuestros equipos. Esto te permite acceder a la mejor tecnología sin comprometer tu flujo de caja y escalar tus capacidades según tus necesidades." },
];

export default function Socios() {
  return (
    <main>
      <PageHero
        title="Únete a Nuestra Red de Socios"
        breadcrumbs={[{ label: "Socios" }]}
      />

      {/* MODELO DE NEGOCIO */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-3">Modelo de Negocio</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Venta y Alquiler de Soluciones Innovadoras para Talleres Mecánicos
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  En Ecología Rentable, hemos diseñado un modelo de negocio flexible y accesible, pensado para maximizar la productividad de los talleres mecánicos mientras contribuyen al cuidado del medio ambiente. Ofrecemos soluciones tecnológicas de última generación, especializadas en la limpieza y descarbonización de motores de combustión, con dos modalidades que se adaptan a tus necesidades:
                </p>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="servicios" className="border rounded-lg px-1 bg-card">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline text-foreground">
                      Servicios únicos en el mercado Automotriz
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      Basada en la innovación de generadores de hidrógeno diseñados para motores industriales, las estaciones de descarbonización de Ecología Rentable integran una combinación de tecnología avanzada y conocimientos especializados.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="clientes" className="border rounded-lg px-1 bg-card">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline text-foreground">
                      Lo mejor para tus clientes
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      Servicios preventivos para vehículos de ocasión, prevención de problemas relacionados con la carbonilla en vehículos aún bajo garantía del fabricante, y tratamientos correctivos respaldados por garantía para evitar costosas sustituciones de piezas.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <img
                  src={`${WP}/2024/12/Venta-y-Alquiler-de-Soluciones-Innovadoras-para-taller-mecanico.jpg`}
                  alt="Taller mecánico socio de Ecología Rentable"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CALLOUT */}
      <section className="py-4 section-light">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base font-medium text-primary">
            Únete a Ecología Rentable y convierte tu negocio en un motor de cambio sostenible.
          </p>
        </div>
      </section>

      {/* 6 BENEFIT CARDS */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <StaggerChildren>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((b) => (
                  <Card key={b.title}>
                    <CardContent className="p-6">
                      <div className="icon-circle w-11 h-11 mb-3">{b.icon}</div>
                      <h3 className="font-bold mb-2 text-foreground">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>
      </AnimatedSection>

      {/* VENTA DE EQUIPOS */}
      <AnimatedSection>
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">Ecología Rentable</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Venta de Equipos</h2>
              <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
                Adquiere nuestras máquinas y convierte a tu taller en un referente de innovación y sostenibilidad.
              </p>
            </div>
            <StaggerChildren>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <Card key={p.name} className="overflow-hidden">
                    <div className="bg-muted/30 p-6 flex items-center justify-center h-56">
                      <img src={p.img} alt={p.name} className="max-h-full object-contain" loading="lazy" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold mb-2 text-foreground text-sm">{p.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mb-4 line-clamp-3">{p.desc}</p>
                      <Link to={p.link} className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline">
                        Ver <ArrowRight size={12} />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>
      </AnimatedSection>

      {/* ALQUILER DE EQUIPOS */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-3">Alquiler de Equipos</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Convertirte en socio de Ecología Rentable
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-4">
                  ¿Prefieres minimizar la inversión inicial? Nuestro servicio de alquiler te permite acceder a la mejor tecnología sin comprometer tu flujo de caja.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  Ambas modalidades están respaldadas por nuestro soporte técnico especializado, formación personalizada y materiales promocionales para ayudarte a maximizar tu rentabilidad.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Asesoría", value: 100 },
                    { label: "Formación Especializada", value: 100 },
                    { label: "Documentación", value: 100 },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{p.label}</span>
                        <span className="text-primary font-bold">{p.value}%</span>
                      </div>
                      <Progress value={p.value} className="h-2" />
                    </div>
                  ))}
                </div>
                <Link to="/contacto" className="btn-primary text-sm">
                  Contacto <ArrowRight size={14} />
                </Link>
              </div>
              <div>
                <img
                  src={`${WP}/2024/11/programa-de-socios-de-ecologia-rentable.jpg`}
                  alt="Programa de socios de Ecología Rentable"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* QUOTE */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Quote size={32} className="mx-auto text-primary mb-4" />
          <blockquote className="text-lg font-medium italic text-foreground mb-3">
            "¡Únete a nuestra red de socios y lleva tus servicios al siguiente nivel!"
          </blockquote>
          <p className="text-sm font-bold text-primary">Younes Smaini</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <AnimatedSection>
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">Historias de éxito</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">¿Qué Dicen Nuestros Clientes?</h2>
              <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
                Estamos orgullosos de haber ayudado a numerosos profesionales a mejorar sus vehículos y contribuir a un futuro más limpio y sostenible.
              </p>
            </div>
            <StaggerChildren>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <Card key={t.name}>
                    <CardContent className="p-6">
                      <p className="text-sm leading-relaxed text-muted-foreground mb-4 italic">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                        <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                        <div>
                          <div className="font-bold text-sm text-foreground">{t.name}</div>
                          <div className="text-xs text-primary">{t.role}</div>
                        </div>
                      </div>
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
          <Badge variant="secondary" className="mb-3">Únete a Nuestra Red de Socios</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Impulsa Tu Negocio con Ecología Rentable
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-6">
            Únete a nuestra red de socios y accede a un mercado en constante crecimiento. Ofrece servicios innovadores de descarbonización y limpieza de filtros de partículas, y benefíciate de márgenes altos y formación certificada.
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
              ¡Conviértete en un socio certificado de Ecología Rentable!
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              ¿Estás interesado en convertirte en socio de Ecología Rentable? Completa el formulario y uno de nuestros especialistas en socios se pondrá en contacto contigo.
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

      <RelatedHubs
        eyebrow="Navegación"
        heading="Continúe explorando Ecología Rentable"
        items={[
          { title: "Servicios", description: "Catálogo de tratamientos disponibles para talleres.", href: "/servicios", icon: Wrench },
          { title: "Soluciones técnicas", description: "Procesos y equipos profesionales.", href: "/soluciones", icon: Lightbulb },
          { title: "Tienda profesional", description: "Equipos certificados con precios para socios.", href: "/tienda", icon: ShoppingBag },
          { title: "Encuentra tu centro", description: "Red nacional de talleres certificados.", href: "/encuentra-tu-centro", icon: MapPin },
          { title: "Blog técnico", description: "Guías y novedades del sector.", href: "/blog", icon: BookOpen },
          { title: "Sobre nosotros", description: "Conozca el equipo y la trayectoria.", href: "/nosotros", icon: Leaf },
        ]}
      />

      <FAQSection items={faqItems} title="Preguntas Frecuentes" />
    </main>
  );
}
