import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Star, Truck, Shield, Phone } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { products } from "@/data/products";
import { AnimatedSection, StaggerChildren, staggerItem } from "@/components/common/Animations";
import tiendaShowroom from "@/assets/tienda-showroom.jpg";

const categories = [
  { slug: "maquinas-descarbonizadoras", name: "Máquinas Descarbonizadoras", desc: "Gama Hy-Calamine 1000S, 2000S y 3000S EGR PILOT. La tecnología HHO más avanzada para talleres profesionales.", count: products.filter(p => p.categorySlug === "maquinas-descarbonizadoras").length },
  { slug: "accesorios-consumibles", name: "Accesorios y Consumibles", desc: "Módulos de diagnóstico, adaptadores y consumibles para máquinas descarbonizadoras.", count: products.filter(p => p.categorySlug === "accesorios-consumibles").length },
  { slug: "kits-limpieza", name: "Kits de Limpieza", desc: "Kits completos para limpieza DPF, EGR y descarbonización para flotas o talleres.", count: products.filter(p => p.categorySlug === "kits-limpieza").length },
  { slug: "aditivos", name: "Aditivos", desc: "Aditivos profesionales para combustible, DPF/FAP y motor. Formatos taller y particular.", count: products.filter(p => p.categorySlug === "aditivos").length },
];

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
      <PageHero
        title="Tienda Ecología Rentable"
        subtitle="Máquinas descarbonizadoras profesionales, kits de limpieza, aditivos y accesorios. Equipos certificados y soporte técnico incluido."
        breadcrumbs={[{ label: "Tienda" }]}
        badge="Equipos certificados"
      />

      {/* PROPUESTA DE VALOR */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={18} />, title: "Garantía 2–4 años", desc: "En todas las máquinas" },
              { icon: <Truck size={18} />, title: "Entrega en 2–10 días", desc: "Península española" },
              { icon: <Star size={18} />, title: "Productos certificados", desc: "CE, RoHS, ISO 9001" },
              { icon: <Phone size={18} />, title: "Soporte técnico", desc: "Post-venta incluido" },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <div className="bg-white rounded-2xl border border-border shadow-md p-4 text-center h-full hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200">
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
        <img
          src={tiendaShowroom}
          alt="Showroom de máquinas descarbonizadoras profesionales"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />
      </section>

      {/* CATEGORÍAS */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Categorías</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={staggerItem}>
                <Link to={`/tienda/${cat.slug}`} className="bg-white rounded-2xl border border-border shadow-md p-6 flex flex-col gap-3 group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 block h-full">
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
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Productos destacados</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <Link to={`/tienda/${p.categorySlug}/${p.slug}`} className="bg-white rounded-2xl border border-border shadow-md p-6 flex flex-col gap-3 group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 block h-full">
                  {p.badge && <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary self-start">{p.badge}</span>}
                  <h3 className="font-bold group-hover:text-primary transition-colors text-foreground">{p.name}</h3>
                  <p className="text-sm flex-1 leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="font-bold text-primary">{p.price}</div>
                  <span className="btn-primary text-sm justify-center flex items-center gap-1"><ShoppingCart size={13} />Ver producto</span>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* PARA TALLERES */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4 text-foreground">¿Eres taller? Condiciones especiales</h2>
            <p className="text-base mb-6 text-muted-foreground">Los talleres socios de Ecología Rentable acceden a precios preferentes en máquinas, consumibles y kits, además de formación y soporte técnico incluidos.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/socios/hazte-socio" className="btn-primary">Hacerme socio <ArrowRight size={13} /></Link>
              <Link to="/contacto" className="btn-secondary">Solicitar presupuesto taller</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FAQSection items={faqTienda} />
      <CTABox title="¿Necesitas asesoramiento?" description="Nuestro equipo técnico te ayuda a elegir el equipo más adecuado para tu taller o flota." primaryLabel="Solicitar asesoramiento" primaryHref="/contacto" secondaryLabel="Ver socios" secondaryHref="/socios" />
    </main>
  );
}
