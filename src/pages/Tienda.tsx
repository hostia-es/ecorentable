import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Star, Truck, Shield, ShieldCheck, Phone, Wrench, Lightbulb, MapPin, Users, BookOpen, Leaf, CheckCircle, Award, Clock } from "lucide-react";
import RelatedHubs from "@/components/common/RelatedHubs";
import { motion } from "framer-motion";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import QuoteForm from "@/components/common/QuoteForm";
import { products } from "@/data/products";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import tiendaShowroom from "@/assets/tienda-showroom.jpg";

const categories = [
  { slug: "descarbonizadoras", name: "Descarbonizadoras", desc: "Gama H2 Profit (1000, 2000, 3000) y Hy-Carbon Connect. Equipos nuevos para coches, camiones y flotas." },
  { slug: "descarbonizadoras-reacondicionadas", name: "Reacondicionadas", desc: "Equipos reacondicionados y validados. Mismas prestaciones, mejor precio. Disponibilidad sujeta a stock." },
  { slug: "maquinas-limpieza-filtro-particulas", name: "Limpieza DPF/FAP", desc: "Carbon FAP y equipos para limpieza profesional de filtros de partículas gasolina y diésel." },
  { slug: "opacimetros", name: "Opacímetros", desc: "Opacímetros para talleres y pre-ITV con medición de opacidad en diésel." },
  { slug: "analizadores-de-gases", name: "Analizadores de gases", desc: "Analizadores de CO, CO₂, HC, O₂ y NOx para diagnóstico de emisiones gasolina y diésel." },
  { slug: "kit-opacidad", name: "Kit Opacidad", desc: "Solución integral opacímetro + analizador. Solo venta. Para talleres con línea completa de emisiones." },
].map(c => ({ ...c, count: products.filter(p => p.categorySlug === c.slug).length }));

const faqTienda = [
  { question: "¿Puedo comprar directamente online?", answer: "Actualmente la venta de máquinas se realiza previa solicitud de presupuesto personalizado. Los aditivos y kits pueden comprarse directamente. Contáctanos para recibir tu propuesta." },
  { question: "¿Cuáles son los plazos de entrega?", answer: "Aditivos y kits: 2–4 días hábiles en Península. Máquinas descarbonizadoras: 5–10 días hábiles incluyendo configuración e instalación si aplica." },
  { question: "¿Ofrecen garantía en todos los productos?", answer: "Sí. Máquinas: 2–4 años según modelo. Accesorios y consumibles: 1 año de garantía de fabricante. Los aditivos tienen fecha de caducidad indicada en el envase." },
  { question: "¿Puedo devolver un producto si no me satisface?", answer: "Aditivos y kits no abiertos: devolución en 14 días. Máquinas: consultar condiciones específicas según el acuerdo de compra o alquiler." },
];

export default function Tienda() {
  const featured = products.filter(p => p.featured);

  return (
    <main>
      {/* HERO LP */}
      <section className="relative bg-gradient-to-b from-secondary to-background border-b border-border">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Tienda" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                Equipos certificados Ecología Rentable
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
                Máquinas profesionales para descarbonización, DPF y diagnóstico de emisiones
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                Gama H2 Profit, Hy-Carbon Connect, Carbon FAP, opacímetros y analizadores de gases. Equipos nuevos y reacondicionados con soporte técnico, formación y garantía oficial.
              </p>
              <ul className="space-y-2.5 mb-7">
                {[
                  "Compra, alquiler o renting con cuota fija predecible.",
                  "Formación técnica y soporte post-venta incluidos.",
                  "Asesoramiento real para elegir el equipo adecuado a tu taller.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm md:text-[15px] text-foreground">
                    <CheckCircle size={16} className="shrink-0 mt-0.5 text-primary" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mb-7">
                <a href="#categorias" className="btn-cta">Ver catálogo <ArrowRight size={14} /></a>
                <a href="tel:+34605928626" className="btn-secondary inline-flex items-center gap-1.5">
                  <Phone size={14} /> +34 605 928 626
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  { icon: <Clock size={14} />, label: "Respuesta < 24 h" },
                  { icon: <ShieldCheck size={14} />, label: "Garantía 2–4 años" },
                  { icon: <Award size={14} />, label: "CE · RoHS · ISO 9001" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-white border border-border">
                    <span className="text-primary">{t.icon}</span>
                    <span className="text-[11px] font-semibold text-foreground leading-tight">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <QuoteForm
                context="tienda"
                title="Solicita tu presupuesto en 24 h"
                subtitle="Cuéntanos qué equipo necesitas y tu volumen estimado de trabajo. Un asesor técnico te llama con propuesta clara y sin compromiso."
                defaultMessage="Hola, me interesa recibir información sobre equipos de la tienda. "
                defaultTipo="taller"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROPUESTA DE VALOR */}
      <section className="py-10 section-light border-b border-border">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={18} />, title: "Garantía 2–4 años", desc: "En todas las máquinas" },
              { icon: <Truck size={18} />, title: "Entrega 2–10 días", desc: "Península española" },
              { icon: <Star size={18} />, title: "Productos certificados", desc: "CE, RoHS, ISO 9001" },
              { icon: <Phone size={18} />, title: "Soporte técnico", desc: "Post-venta incluido" },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-sm p-4 text-center h-full hover:shadow-md hover:border-primary/30 transition-all duration-200">
                  <div className="flex justify-center mb-2 text-primary">{item.icon}</div>
                  <div className="font-bold text-sm mb-0.5 text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* SHOWROOM IMAGE */}
      <section className="py-0 overflow-hidden">
        <img src={tiendaShowroom} alt="Showroom de máquinas descarbonizadoras profesionales" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
      </section>

      {/* CATEGORÍAS */}
      <section id="categorias" className="py-14 section-alt scroll-mt-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">Categorías</h2>
            <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Elige por familia de producto. Cada categoría agrupa los equipos por uso, tamaño de taller y modalidad.
            </p>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={staggerItem}>
                <Link to={`/tienda/${cat.slug}`} className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-3 group hover:shadow-md hover:border-primary/30 transition-all duration-200 block h-full">
                  <span className="text-2xl font-bold text-primary">{cat.count}</span>
                  <h3 className="font-bold group-hover:text-primary transition-colors text-foreground">{cat.name}</h3>
                  <p className="text-sm flex-1 leading-relaxed text-muted-foreground">{cat.desc}</p>
                  <span className="text-xs font-semibold flex items-center gap-1 text-primary">Ver productos <ArrowRight size={11} /></span>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">Equipos más solicitados</h2>
            <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Los modelos con mejor relación coste–rendimiento para talleres independientes, redes y flotas.
            </p>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <Link to={`/tienda/${p.categorySlug}/${p.slug}`} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group hover:shadow-md hover:border-primary/30 transition-all duration-200 block h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={`/generated/products/${p.slug}.jpg`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {p.badge && <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary self-start">{p.badge}</span>}
                    <h3 className="font-bold group-hover:text-primary transition-colors text-foreground">{p.name}</h3>
                    <p className="text-sm flex-1 leading-relaxed text-muted-foreground">{p.description}</p>
                    <div className="font-bold text-primary">{p.price}</div>
                    <span className="btn-primary text-sm justify-center flex items-center gap-1"><ShoppingCart size={13} />Ver producto</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* SEGUNDO FORMULARIO PERSUASIVO */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                Asesoramiento sin compromiso
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">
                ¿No sabes qué equipo encaja con tu taller?
              </h2>
              <p className="text-[15px] text-muted-foreground mb-5 leading-relaxed">
                Te lo decimos en 5 minutos. Cuéntanos el volumen estimado de servicios al mes y el tipo de vehículos que recibes; te recomendamos el modelo correcto y la modalidad (compra, alquiler o renting) más rentable para ti.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Recomendación honesta, no la máquina más cara.",
                  "Comparativa de compra vs. alquiler vs. renting.",
                  "Cálculo de retorno de inversión a 6, 12 y 24 meses.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <QuoteForm
              context="tienda-asesoramiento"
              title="Recibe tu recomendación"
              subtitle="Te llamamos en menos de 24 h con propuesta clara y sin compromiso."
              defaultMessage="Necesito ayuda para elegir el equipo adecuado para mi taller. "
              defaultTipo="taller"
              compact
            />
          </div>
        </div>
      </section>

      {/* PARA TALLERES */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4 text-foreground">¿Eres taller? Condiciones especiales</h2>
            <p className="text-base mb-6 text-muted-foreground">
              Los talleres socios de Ecología Rentable acceden a precios preferentes en máquinas, consumibles y kits, además de formación y soporte técnico incluidos.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/socios/hazte-socio" className="btn-primary">Hacerme socio <ArrowRight size={13} /></Link>
              <Link to="/contacto" className="btn-secondary">Solicitar presupuesto taller</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <RelatedHubs
        eyebrow="Navegación"
        heading="Continúe explorando Ecología Rentable"
        items={[
          { title: "Servicios", description: "Tratamientos profesionales para particulares y flotas.", href: "/servicios", icon: Wrench },
          { title: "Soluciones técnicas", description: "Procesos y equipos para cada tipo de motor.", href: "/soluciones", icon: Lightbulb },
          { title: "Encuentra tu centro", description: "Red nacional de talleres certificados.", href: "/encuentra-tu-centro", icon: MapPin },
          { title: "Hazte socio", description: "Programa de talleres con condiciones especiales.", href: "/socios", icon: Users },
          { title: "Blog técnico", description: "Guías de equipos, mantenimiento y diagnóstico.", href: "/blog", icon: BookOpen },
          { title: "Sobre nosotros", description: "Quiénes somos y nuestro compromiso.", href: "/nosotros", icon: Leaf },
        ]}
      />

      <FAQSection items={faqTienda} />
      <CTABox
        title="¿Necesitas asesoramiento?"
        description="Nuestro equipo técnico te ayuda a elegir el equipo más adecuado para tu taller o flota."
        primaryLabel="Solicitar asesoramiento"
        primaryHref="/contacto"
        secondaryLabel="Ver socios"
        secondaryHref="/socios"
      />
    </main>
  );
}

