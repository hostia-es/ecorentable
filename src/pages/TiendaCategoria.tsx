import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, ShieldCheck, Award, Clock, Wrench, Lightbulb, BookOpen, ShoppingCart, Truck, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import QuoteForm from "@/components/common/QuoteForm";
import AddToCartButton from "@/components/common/AddToCartButton";
import RelatedHubs from "@/components/common/RelatedHubs";
import Seo from "@/components/common/Seo";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import { products } from "@/data/products";

interface CategoryContent {
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
  benefits: { title: string; desc: string }[];
  forWho: string[];
  faqs: { question: string; answer: string }[];
  related: { title: string; description: string; href: string; icon: any }[];
  defaultMessage: string;
}

const categoryContent: Record<string, CategoryContent> = {
  "descarbonizadoras": {
    name: "Descarbonizadoras profesionales",
    h1: "Máquinas descarbonizadoras profesionales por hidrógeno",
    metaTitle: "Descarbonizadoras profesionales H2 Profit y Hy-Carbon | Tienda",
    metaDescription: "Gama completa de máquinas descarbonizadoras por hidrógeno H2 Profit y Hy-Carbon Connect. Compra, alquiler o renting con garantía oficial.",
    intro: "Gama H2 Profit 1000, 2000, 3000 y Hy-Carbon Connect. Equipos nuevos de descarbonización por hidrógeno para coches, camiones y flotas.",
    bullets: [
      "Compra, alquiler o renting con cuota fija.",
      "Garantía oficial 2–5 años según modelo.",
      "Formación técnica y soporte post-venta incluidos.",
    ],
    benefits: [
      { title: "Sin desmontaje", desc: "El HHO actúa por la admisión, sin abrir el motor." },
      { title: "ROI 3–6 meses", desc: "Recupera la inversión con margen alto por intervención." },
      { title: "Coches y pesados", desc: "Modelos para turismos, industriales y flotas." },
      { title: "Compatibilidad total", desc: "Euro 3 a Euro 6d-TEMP, gasolina y diésel." },
    ],
    forWho: ["Talleres mecánicos generalistas", "Talleres con línea industrial", "Gestores de flotas", "Centros pre-ITV"],
    faqs: [
      { question: "¿Qué modelo elijo según mi taller?", answer: "H2 Profit 1000 para coches y vehículos ligeros, 2000 para camiones y autobuses, 3000 para flotas e industria pesada. Hy-Carbon Connect para talleres digitalizados con informes automáticos." },
      { question: "¿Puedo alquilar en vez de comprar?", answer: "Sí. Todos los modelos están disponibles también en modalidad de alquiler o renting con cuota fija mensual." },
      { question: "¿Qué garantía tienen?", answer: "De 2 a 5 años según modelo. Hy-Carbon Connect incluye 5 años o 2.000 horas de uso." },
    ],
    related: [
      { title: "Servicio de descarbonización", description: "Procedimiento técnico aplicado por nuestra red.", href: "/servicios/descarbonizacion-motor", icon: Wrench },
      { title: "Alquiler de descarbonizadoras", description: "Cuota fija sin inversión inicial.", href: "/servicios/alquiler-renting-h2-profit-1000", icon: BookOpen },
      { title: "Reacondicionadas", description: "Equipos validados con menor inversión.", href: "/tienda/descarbonizadoras-reacondicionadas", icon: ShoppingCart },
    ],
    defaultMessage: "Hola, quiero información sobre las máquinas descarbonizadoras. ",
  },
  "descarbonizadoras-reacondicionadas": {
    name: "Descarbonizadoras reacondicionadas",
    h1: "Descarbonizadoras reacondicionadas y validadas técnicamente",
    metaTitle: "Descarbonizadoras reacondicionadas H2 Profit y Hy-Carbon | Tienda",
    metaDescription: "Equipos reacondicionados de descarbonización por hidrógeno. Mismas prestaciones, menor inversión inicial. Disponibilidad sujeta a stock.",
    intro: "Equipos reacondicionados y validados técnicamente. Mismas prestaciones que los modelos nuevos con menor inversión inicial. Disponibilidad sujeta a stock.",
    bullets: [
      "Revisión técnica completa y certificado de validación.",
      "Garantía según estado del equipo.",
      "Financiación disponible.",
    ],
    benefits: [
      { title: "Mismas prestaciones", desc: "Validadas con test de ciclo completo." },
      { title: "Menor inversión", desc: "Acceso a la gama H2 Profit con presupuesto ajustado." },
      { title: "Stock variable", desc: "Consulta disponibilidad antes de decidir." },
      { title: "Soporte oficial", desc: "Mismo soporte técnico que un equipo nuevo." },
    ],
    forWho: ["Talleres que inician en descarbonización", "Negocios con presupuesto ajustado", "Talleres que priorizan ROI"],
    faqs: [
      { question: "¿En qué se diferencia de un equipo nuevo?", answer: "Mismas prestaciones técnicas y garantía. La diferencia está en el precio y la disponibilidad, que depende del stock disponible." },
      { question: "¿Qué garantía incluye?", answer: "Garantía según el estado del equipo concreto, indicada en el certificado de validación técnica." },
      { question: "¿Hay financiación?", answer: "Sí. Ofrecemos opciones de compra a plazos o renting con cuota fija." },
    ],
    related: [
      { title: "Descarbonizadoras nuevas", description: "Gama completa H2 Profit y Hy-Carbon.", href: "/tienda/descarbonizadoras", icon: ShoppingCart },
      { title: "Servicio de descarbonización", description: "Aplicación profesional del tratamiento.", href: "/servicios/descarbonizacion-motor", icon: Wrench },
      { title: "Hazte socio", description: "Condiciones especiales para talleres.", href: "/socios/hazte-socio", icon: Lightbulb },
    ],
    defaultMessage: "Hola, me interesa una descarbonizadora reacondicionada. ",
  },
  "maquinas-limpieza-filtro-particulas": {
    name: "Máquinas de limpieza de filtro de partículas",
    h1: "Máquinas profesionales de limpieza de DPF y FAP",
    metaTitle: "Máquinas de limpieza de filtro de partículas DPF/FAP | Tienda",
    metaDescription: "Estación Carbon FAP profesional para limpieza de filtros de partículas gasolina y diésel sin disolventes. Solicita cotización o financiación.",
    intro: "Equipos profesionales para limpieza de filtro de partículas DPF/FAP gasolina y diésel sin disolventes. Para talleres especializados en DPF.",
    bullets: [
      "Limpieza sin disolventes con aire comprimido.",
      "Compatible gasolina y diésel, Euro 4–6.",
      "Ahorra al cliente 400–1.500 € frente a un DPF nuevo.",
    ],
    benefits: [
      { title: "Alto margen", desc: "Servicio rentable por intervención con baja competencia." },
      { title: "Sin químicos", desc: "Procedimiento limpio con aire comprimido a 6 bar." },
      { title: "Universal", desc: "Compatible con todas las marcas y Euro 4–6." },
      { title: "Rápido", desc: "Ciclo completo de limpieza por filtro." },
    ],
    forWho: ["Talleres especializados en DPF/FAP", "Centros de limpieza de filtros", "Talleres de flotas"],
    faqs: [
      { question: "¿La máquina sirve para gasolina y diésel?", answer: "Sí. Carbon FAP es compatible con filtros de partículas tanto en motores gasolina (GPF) como diésel (DPF/FAP)." },
      { question: "¿Qué necesita la instalación?", answer: "Toma eléctrica 220V 16A y aire comprimido con presión mínima de 6 bares. Consumo inferior a 3.000 W." },
      { question: "¿Hay alquiler disponible?", answer: "Sí. Carbon FAP está disponible en compra, alquiler o renting con cuota fija." },
    ],
    related: [
      { title: "Servicio de limpieza DPF/FAP", description: "Procedimiento técnico aplicado por la red.", href: "/servicios/limpieza-filtro-particulas-dpf-fap", icon: Wrench },
      { title: "Alquiler Carbon FAP", description: "Cuota fija sin inversión inicial.", href: "/servicios/alquiler-renting-carbon-fap", icon: BookOpen },
      { title: "Solución DPF/FAP", description: "Cuándo limpiar, cuándo reemplazar.", href: "/soluciones/limpieza-dpf-fap", icon: Lightbulb },
    ],
    defaultMessage: "Hola, quiero información sobre la máquina Carbon FAP para limpieza de DPF/FAP. ",
  },
  "opacimetros": {
    name: "Opacímetros profesionales",
    h1: "Opacímetros profesionales para diésel y pre-ITV",
    metaTitle: "Opacímetros profesionales para taller y pre-ITV | Tienda",
    metaDescription: "Opacímetro profesional con Bluetooth, USB y RS232. Medición de N y K en motores diésel. Para talleres y centros pre-ITV.",
    intro: "Opacímetros para talleres y centros pre-ITV con necesidades de medición de opacidad y diagnosis de emisiones diésel.",
    bullets: [
      "Medición de N (%) y K (m⁻¹) certificada.",
      "Conectividad Bluetooth, USB y RS232.",
      "Calibración y software de gestión incluidos.",
    ],
    benefits: [
      { title: "Pre-ITV diésel", desc: "Prepara vehículos diésel para pasar la ITV a la primera." },
      { title: "Calentamiento 6 min", desc: "Listo para medir en pocos minutos." },
      { title: "Conectividad total", desc: "Bluetooth, USB y RS232 para integración con software." },
      { title: "Examen 172506001", desc: "Cumple normativa oficial de medición." },
    ],
    forWho: ["Talleres con servicio pre-ITV diésel", "Centros de diagnóstico", "Talleres especializados en diésel"],
    faqs: [
      { question: "¿Sirve para pasar la ITV?", answer: "Sí. Permite preparar vehículos diésel para superar la prueba de opacidad de la ITV, reduciendo rechazos." },
      { question: "¿Incluye calibración?", answer: "Sí. El equipo se entrega con certificado de calibración inicial y soporte para recalibraciones futuras." },
      { question: "¿Funciona con Euro 6?", answer: "Sí. Compatible con vehículos diésel Euro 2 a Euro 6, incluyendo turismos, furgonetas e industriales ligeros." },
    ],
    related: [
      { title: "Alquiler de opacímetro", description: "Cuota fija sin inversión inicial.", href: "/servicios/alquiler-renting-opacimetro-ecologia-rentable", icon: BookOpen },
      { title: "Analizador de gases", description: "Complementa el opacímetro para gasolina.", href: "/tienda/analizadores-de-gases", icon: ShoppingCart },
      { title: "Kit Opacidad", description: "Opacímetro + analizador en pack.", href: "/tienda/kit-opacidad", icon: Lightbulb },
    ],
    defaultMessage: "Hola, me interesa el opacímetro profesional. ",
  },
  "analizadores-de-gases": {
    name: "Analizadores de gases profesionales",
    h1: "Analizadores de gases profesionales para taller y pre-ITV",
    metaTitle: "Analizadores de gases CO, CO₂, HC, O₂ y NOx | Tienda",
    metaDescription: "Analizador de gases profesional para gasolina y diésel. Mide CO, CO₂, HC, O₂ y NOx opcional. Software de gestión e impresora incluidos.",
    intro: "Analizadores de gases de escape para diagnosis y control de emisiones en gasolina y diésel. Para talleres y centros pre-ITV.",
    bullets: [
      "Mide CO, CO₂, HC, O₂ y NOx opcional.",
      "Compatible Windows y Android.",
      "Software de gestión e impresora integrados.",
    ],
    benefits: [
      { title: "Diagnóstico < 2 min", desc: "Calentamiento inferior a 1 minuto, lectura inmediata." },
      { title: "Pre-ITV gasolina", desc: "Prepara coches gasolina para superar emisiones ITV." },
      { title: "NOx opcional", desc: "Amplía la medición a óxidos de nitrógeno." },
      { title: "Portátil", desc: "Solo 4,9 kg, fácil de mover por el taller." },
    ],
    forWho: ["Talleres mecánicos generalistas", "Centros pre-ITV gasolina", "Talleres de diagnosis"],
    faqs: [
      { question: "¿Qué gases mide?", answer: "CO, CO₂, HC y O₂ de serie. NOx disponible como opción. Compatible con motores gasolina, diésel e híbridos gasolina." },
      { question: "¿Necesita ordenador externo?", answer: "No. Lleva impresora integrada y software propio compatible con Windows y Android para gestión y reporting." },
      { question: "¿Está calibrado?", answer: "Sí. Se entrega con certificado de calibración y soporte para recalibraciones periódicas." },
    ],
    related: [
      { title: "Alquiler de analizador", description: "Cuota fija sin inversión inicial.", href: "/servicios/alquiler-renting-analizador-gases-ecologia-rentable", icon: BookOpen },
      { title: "Opacímetro", description: "Complementa el analizador para diésel.", href: "/tienda/opacimetros", icon: ShoppingCart },
      { title: "Kit Opacidad", description: "Analizador + opacímetro en pack.", href: "/tienda/kit-opacidad", icon: Lightbulb },
    ],
    defaultMessage: "Hola, me interesa el analizador de gases. ",
  },
  "kit-opacidad": {
    name: "Kit Opacidad para talleres",
    h1: "Kit Opacidad: línea completa de emisiones para tu taller",
    metaTitle: "Kit Opacidad: opacímetro + analizador de gases | Tienda",
    metaDescription: "Kit Opacidad con opacímetro, analizador de gases y carrito. Solución integral pre-ITV para gasolina y diésel. Solo venta.",
    intro: "Solución integral con opacímetro, analizador de gases y carrito de transporte. Para talleres que quieren equiparse completamente en diagnóstico de emisiones. Solo venta.",
    bullets: [
      "Cubre diésel (opacidad) y gasolina (gases) en un solo pack.",
      "Carrito de transporte incluido.",
      "Software de gestión y certificados de calibración.",
    ],
    benefits: [
      { title: "Solución integral", desc: "Línea completa de emisiones en un solo equipo." },
      { title: "Ahorro vs. compra suelta", desc: "Mejor precio que adquirir los equipos por separado." },
      { title: "Pre-ITV completa", desc: "Prepara cualquier vehículo gasolina o diésel para la ITV." },
      { title: "Portátil", desc: "Carrito incluido para mover el equipo por el taller." },
    ],
    forWho: ["Talleres pre-ITV integrales", "Centros con alta demanda de diagnosis", "Talleres multimarca con línea de emisiones"],
    faqs: [
      { question: "¿Se puede alquilar?", answer: "El Kit Opacidad se ofrece únicamente en modalidad de venta. Para alquiler, los equipos están disponibles por separado." },
      { question: "¿Qué incluye exactamente?", answer: "Opacímetro Ecología Rentable, analizador de gases Ecología Rentable, carrito de transporte, software de gestión y certificados de calibración." },
      { question: "¿Es rentable frente a comprarlos sueltos?", answer: "Sí. El pack tiene mejor precio que la suma de los equipos por separado, además de incluir el carrito y soporte unificado." },
    ],
    related: [
      { title: "Opacímetro", description: "Equipo individual para diésel.", href: "/tienda/opacimetros", icon: ShoppingCart },
      { title: "Analizador de gases", description: "Equipo individual para gasolina.", href: "/tienda/analizadores-de-gases", icon: ShoppingCart },
      { title: "Hazte socio", description: "Condiciones especiales para talleres.", href: "/socios/hazte-socio", icon: Lightbulb },
    ],
    defaultMessage: "Hola, quiero información sobre el Kit Opacidad. ",
  },
};

export default function TiendaCategoria() {
  const { categoria } = useParams<{ categoria: string }>();
  const content = categoryContent[categoria ?? ""];
  const catProducts = products.filter(p => p.categorySlug === categoria);

  if (!content) {
    return (
      <main>
        <section className="py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
          <Link to="/tienda" className="btn-primary">← Volver a la tienda</Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Seo
        title={content.metaTitle}
        description={content.metaDescription}
        canonical={`https://ecorentable.lovable.app/tienda/${categoria}`}
      />

      {/* HERO LP */}
      <section className="relative bg-gradient-to-b from-secondary to-background border-b border-border">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Tienda", href: "/tienda" }, { label: content.name }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                {catProducts.length} producto{catProducts.length !== 1 ? "s" : ""} disponibles
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
                {content.h1}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                {content.intro}
              </p>
              <ul className="space-y-2.5 mb-7">
                {content.bullets.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm md:text-[15px] text-foreground">
                    <CheckCircle size={16} className="shrink-0 mt-0.5 text-primary" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mb-7">
                <a href="#productos" className="btn-cta">Ver productos <ArrowRight size={14} /></a>
                <a href="tel:+34605928626" className="btn-secondary inline-flex items-center gap-1.5">
                  <Phone size={14} /> +34 605 928 626
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  { icon: <Clock size={14} />, label: "Respuesta < 24 h" },
                  { icon: <ShieldCheck size={14} />, label: "Garantía oficial" },
                  { icon: <Award size={14} />, label: "CE · ISO 9001" },
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
                context={`tienda-${categoria}`}
                title="Solicita tu cotización en 24 h"
                subtitle="Cuéntanos qué equipo necesitas y un asesor técnico te llama con propuesta clara y sin compromiso."
                defaultMessage={content.defaultMessage}
                mode="b2b"
                defaultPerfil="taller"
                ctaLabel="Solicitar cotización"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-10 section-light border-b border-border">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={18} />, title: "Garantía oficial", desc: "Soporte fabricante" },
              { icon: <Truck size={18} />, title: "Entrega 2–10 días", desc: "Península" },
              { icon: <Star size={18} />, title: "Certificación CE", desc: "Calidad validada" },
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

      {/* PRODUCTOS */}
      <section id="productos" className="py-14 section-alt scroll-mt-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">Productos de la categoría</h2>
            <p className="text-sm text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Selección oficial de equipos Ecología Rentable para esta categoría. Solicita cotización personalizada para cada modelo.
            </p>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catProducts.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group hover:shadow-md hover:border-primary/30 transition-all duration-200 h-full flex flex-col">
                  <Link to={`/tienda/${p.categorySlug}/${p.slug}`} className="aspect-[16/10] overflow-hidden bg-secondary block">
                    <img
                      src={`/generated/products/${p.slug}.jpg`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {p.badge && <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary self-start">{p.badge}</span>}
                    <Link to={`/tienda/${p.categorySlug}/${p.slug}`} className="font-bold group-hover:text-primary transition-colors text-foreground">{p.name}</Link>
                    <p className="text-sm flex-1 leading-relaxed text-muted-foreground">{p.description}</p>
                    <div className="font-bold text-primary">{p.price}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Link to={`/tienda/${p.categorySlug}/${p.slug}`} className="btn-secondary text-xs justify-center flex items-center gap-1">Ver producto</Link>
                      <AddToCartButton
                        product={{
                          slug: p.slug,
                          name: p.name,
                          category: p.category,
                          categorySlug: p.categorySlug,
                          image: `/generated/products/${p.slug}.jpg`,
                        }}
                        variant="compact"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">Por qué elegir esta gama</h2>
            <p className="text-sm text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Lo que ganas al equiparte con esta categoría en tu taller.
            </p>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.benefits.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-sm p-6 h-full flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">¿Para quién es esta categoría?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {content.forWho.map((line) => (
              <div key={line} className="flex items-start gap-2.5 bg-white rounded-xl border border-border p-4">
                <CheckCircle size={16} className="shrink-0 mt-0.5 text-primary" />
                <span className="text-sm text-foreground leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedHubs
        eyebrow="Sigue explorando"
        heading="Contenido relacionado"
        items={content.related}
      />

      <FAQSection items={content.faqs} />

      {/* QUOTE FORM FINAL (landing rule) */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">¿Listo para equipar tu taller?</h2>
            <p className="text-[15px] text-muted-foreground">
              Recibe tu propuesta personalizada en menos de 24 h. Sin compromiso.
            </p>
          </div>
          <QuoteForm
            context={`tienda-${categoria}-final`}
            title="Solicita tu cotización"
            subtitle="Te llamamos con propuesta clara y plazos reales."
            defaultMessage={content.defaultMessage}
            mode="b2b"
            defaultPerfil="taller"
            compact
          />
        </div>
      </section>

      <CTABox
        title="¿Necesitas asesoramiento técnico?"
        description="Te ayudamos a elegir el equipo adecuado para tu taller o flota, con recomendación honesta y comparativa real."
        primaryLabel="Hablar con un asesor"
        primaryHref="/contacto"
        secondaryLabel="Hazte socio"
        secondaryHref="/socios"
      />
    </main>
  );
}
