import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Wrench, Truck, CheckCircle, Star, Zap, Leaf, Shield, TrendingUp } from "lucide-react";
import heroMain from "@/assets/hero-main.jpg";
import machinImg from "@/assets/maquina-descarbonizadora.jpg";
import { products } from "@/data/products";
import ProductGrid from "@/components/common/ProductGrid";
import FAQSection from "@/components/common/FAQSection";

const provinces = [
  { name: "Madrid", slug: "madrid", centers: 8 },
  { name: "Barcelona", slug: "barcelona", centers: 8 },
  { name: "Valencia", slug: "valencia", centers: 6 },
  { name: "Sevilla", slug: "sevilla", centers: 6 },
  { name: "Málaga", slug: "malaga", centers: 6 },
  { name: "Zaragoza", slug: "zaragoza", centers: 4 },
  { name: "Bilbao", slug: "bilbao", centers: 4 },
  { name: "Alicante", slug: "alicante", centers: 5 },
];

const homeFAQs = [
  { question: "¿Cada cuántos kilómetros se recomienda descarbonizar?", answer: "En motores diésel se recomienda cada 30.000–50.000 km. En gasolina, cada 50.000–80.000 km. Si el vehículo tiene uso urbano predominante (trayectos cortos, frenadas frecuentes), la periodicidad puede ser menor." },
  { question: "¿La descarbonización es compatible con todos los motores?", answer: "Sí, es compatible con motores diésel y gasolina de todas las marcas y modelos. La técnica por hidrógeno es especialmente efectiva en motores con DPF/FAP y válvula EGR." },
  { question: "¿Cuánto tarda el servicio de descarbonización?", answer: "El proceso completo dura entre 45 y 90 minutos, dependiendo del tipo de motor y el grado de carbonización. No requiere desmontaje de piezas y el vehículo puede circular inmediatamente." },
  { question: "¿Puedo ser socio si tengo un taller pequeño?", answer: "Sí. El programa de socios está abierto a talleres de cualquier tamaño. Los requisitos mínimos son disponer de espacio para la máquina y comprometerse a ofrecer el servicio a los clientes de la zona." },
];

export default function Index() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  return (
    <main>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={heroMain} alt="Descarbonización profesional de motores" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(148 70% 12% / 0.85) 0%, hsl(210 25% 8% / 0.6) 100%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5" style={{ background: "hsl(148 65% 22% / 0.5)", color: "hsl(148 72% 70%)", border: "1px solid hsl(148 72% 40% / 0.4)" }}>
              <Leaf size={12} /> Especialistas en descarbonización · España
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ color: "hsl(0 0% 100%)" }}>
              Motor más limpio,{" "}
              <span style={{ color: "hsl(148 72% 55%)" }}>consumo más bajo.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: "hsl(0 0% 80%)" }}>
              Descarbonización profesional de motores diésel y gasolina. Limpieza DPF/FAP, EGR y catalizador. Red de más de 300 centros certificados en toda España.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/encuentre-centro" className="btn-cta">
                <MapPin size={16} /> Encontrar un centro
              </Link>
              <Link to="/socios/hazte-socio" className="btn-outline-white">
                Soy taller / Quiero ser socio
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { value: "+300", label: "Centros en España" },
                { value: "+50.000", label: "Vehículos tratados" },
                { value: "98%", label: "Clientes satisfechos" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold" style={{ color: "hsl(148 72% 55%)" }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: "hsl(0 0% 70%)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== QUÉ HACEMOS ===================== */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">Nuestros servicios</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Qué hacemos?</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Servicios profesionales de mantenimiento de motor sin desmontaje, con tecnología de hidrógeno y tratamientos químicos de última generación.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={20} />, title: "Descarbonización de motor", desc: "Eliminación de depósitos de carbono en pistones, válvulas, cámara de combustión y escape por hidrógeno. Sin desmontaje.", href: "/servicios/descarbonizacion" },
              { icon: <Shield size={20} />, title: "Limpieza DPF/FAP", desc: "Regeneración y limpieza profesional del filtro de partículas. Recupera la presión de escape y evita la sustitución prematura.", href: "/servicios/limpieza-filtros" },
              { icon: <Wrench size={20} />, title: "Limpieza EGR y catalizador", desc: "Tratamiento específico de la válvula EGR y el catalizador para restaurar el caudal de gases y la eficiencia del sistema de escape.", href: "/soluciones/limpieza-egr-catalizador" },
              { icon: <TrendingUp size={20} />, title: "Reducción de emisiones ITV", desc: "Descarbonización previa a la ITV para reducir CO, HC y NOx por debajo de los límites de inspección. Resultados garantizados.", href: "/soluciones/itv-gases" },
              { icon: <Truck size={20} />, title: "Servicio para flotas", desc: "Mantenimiento preventivo de flotas de vehículos diésel: contratos de mantenimiento, visitas a instalaciones y gestión centralizada.", href: "/servicios/flotas" },
              { icon: <Star size={20} />, title: "Venta de máquinas", desc: "Máquinas descarbonizadoras profesionales Hy-Calamine para talleres que quieren ofrecer el servicio. Formación incluida.", href: "/tienda/maquinas-descarbonizadoras" },
            ].map((s) => (
              <Link key={s.href} to={s.href} className="card-eco p-6 flex flex-col gap-3 group">
                <div className="icon-circle w-11 h-11">{s.icon}</div>
                <h3 className="font-bold text-base" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: "hsl(var(--accent-green))" }}>
                  Saber más <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CÓMO FUNCIONA ===================== */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">Proceso</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Cómo funciona?</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Tres perfiles, un mismo resultado: motor más limpio y eficiente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Soy conductor particular",
                color: "hsl(148 65% 22%)",
                steps: [
                  "Notas pérdida de potencia o más consumo",
                  "Encuentras un centro certificado en tu provincia",
                  "El técnico diagnóstica y realiza el servicio (45–90 min)",
                  "Sales con el motor limpio y funcionando mejor",
                ],
                cta: "Encontrar un centro",
                href: "/encuentre-centro",
              },
              {
                title: "Tengo un taller",
                color: "hsl(210 25% 20%)",
                steps: [
                  "Te registras como socio de Ecología Rentable",
                  "Recibes la máquina descarbonizadora + formación",
                  "Empiezas a ofrecer el servicio a tus clientes",
                  "Recibes leads de clientes de tu zona",
                ],
                cta: "Hazte socio",
                href: "/socios/hazte-socio",
              },
              {
                title: "Gestiono una flota",
                color: "hsl(82 70% 38%)",
                steps: [
                  "Nos describes tu flota y necesidades",
                  "Diseñamos un plan de mantenimiento preventivo",
                  "Realizamos las sesiones en tus instalaciones",
                  "Recibes informes de estado por vehículo",
                ],
                cta: "Solicitar presupuesto",
                href: "/servicios/flotas",
              },
            ].map((profile) => (
              <div key={profile.title} className="card-eco p-6">
                <div className="w-10 h-1 rounded-full mb-4" style={{ background: profile.color }} />
                <h3 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--foreground))" }}>{profile.title}</h3>
                <ol className="space-y-3 mb-5">
                  {profile.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="step-number w-7 h-7 text-xs shrink-0" style={{ background: profile.color }}>{i + 1}</span>
                      <span className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{step}</span>
                    </li>
                  ))}
                </ol>
                <Link to={profile.href} className="btn-primary w-full justify-center text-sm">
                  {profile.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ENCUENTRA UN CENTRO ===================== */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-green mb-3">Red nacional</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Encuentra un centro por provincia</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Más de 300 talleres certificados en toda España. Encuentra el más cercano a ti.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {provinces.map((p) => (
              <Link
                key={p.slug}
                to={`/encuentre-centro/${p.slug}`}
                className="card-eco p-4 text-center group"
              >
                <MapPin size={20} className="mx-auto mb-2" style={{ color: "hsl(var(--primary))" }} />
                <div className="font-bold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>{p.name}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{p.centers} centros</div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/encuentre-centro" className="btn-primary">
              Ver todos los centros <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TIENDA DESTACADA ===================== */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-green mb-3">Tienda</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Productos destacados</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Máquinas descarbonizadoras, aditivos y kits de limpieza profesional.
            </p>
          </div>
          <ProductGrid products={featuredProducts} showCategory />
          <div className="text-center mt-8">
            <Link to="/tienda" className="btn-secondary">
              Ver toda la tienda <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== BENEFICIOS ===================== */}
      <section className="section-dark py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 100%)" }}>
              Resultados reales, demostrados
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(0 0% 70%)" }}>
              La descarbonización profesional produce resultados medibles en el rendimiento y las emisiones del motor.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "Hasta 15%", label: "Reducción de consumo", desc: "Mejor eficiencia de combustión" },
              { value: "Hasta 70%", label: "Reducción de humos", desc: "Menos partículas y NOx" },
              { value: "+20%", label: "Recuperación de potencia", desc: "Motor responde mejor" },
              { value: "2–4x", label: "Vida útil del DPF", desc: "Menos regeneraciones forzadas" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-xl" style={{ background: "hsl(0 0% 100% / 0.07)", border: "1px solid hsl(0 0% 100% / 0.12)" }}>
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "hsl(148 72% 55%)" }}>{stat.value}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: "hsl(0 0% 90%)" }}>{stat.label}</div>
                <div className="text-xs" style={{ color: "hsl(0 0% 60%)" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== RECURSOS + BLOG ===================== */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="badge-green mb-3">Blog y recursos</span>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Aprende y actúa</h2>
              <div className="space-y-4">
                {[
                  { title: "¿Qué es la descarbonización del motor?", href: "/blog/que-es-descarbonizacion-motor", cat: "Guías" },
                  { title: "7 síntomas de que tu DPF/FAP está obstruido", href: "/blog/sintomas-filtro-particulas-obstruido", cat: "Guías" },
                  { title: "¿Funciona la descarbonización para pasar la ITV?", href: "/blog/descarbonizacion-antes-itv-funciona", cat: "ITV" },
                  { title: "Mantenimiento preventivo de flotas diésel", href: "/blog/mantenimiento-preventivo-flotas-diesel", cat: "Flotas" },
                ].map((post) => (
                  <Link key={post.href} to={post.href} className="flex items-start gap-3 p-4 rounded-lg border transition-all hover:border-primary" style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}>
                    <span className="badge-green text-xs shrink-0">{post.cat}</span>
                    <span className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>{post.title}</span>
                    <ArrowRight size={13} className="ml-auto shrink-0 mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }} />
                  </Link>
                ))}
              </div>
              <Link to="/blog" className="btn-secondary mt-5 inline-flex">
                Ver todo el blog <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <span className="badge-green mb-3">Socio</span>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>¿Tienes un taller? Únete a la red</h2>
              <div className="card-eco p-6">
                <img src={machinImg} alt="Máquina descarbonizadora Hy-Calamine" className="w-full h-40 object-contain rounded-lg mb-4" style={{ background: "hsl(var(--secondary))" }} />
                <ul className="space-y-2 mb-5">
                  {[
                    "Ofrece un servicio diferenciador de alto margen",
                    "Recibe clientes certificados de tu zona",
                    "Formación técnica incluida",
                    "Soporte comercial y marketing",
                    "ROI en 3–6 meses",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
                      <CheckCircle size={14} style={{ color: "hsl(var(--primary))" }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to="/socios/hazte-socio" className="btn-primary w-full justify-center">
                  Convertirme en socio <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <FAQSection title="Preguntas frecuentes" items={homeFAQs} dark={false} />

      {/* ===================== CTA FINAL ===================== */}
      <section className="section-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 100%)" }}>
            ¿Listo para darle una nueva vida a tu motor?
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "hsl(0 0% 70%)" }}>
            Encuentra el centro más cercano o contáctanos directamente para resolver tus dudas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/encuentre-centro" className="btn-cta">
              <MapPin size={16} /> Encontrar un centro
            </Link>
            <Link to="/contacto" className="btn-outline-white">
              Hablar con un experto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
