import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Package, BarChart } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";

const faqSocios = [
  { question: "¿Qué tipo de taller puede hacerse socio?", answer: "Cualquier taller mecánico con un mínimo de espacio disponible para instalar la máquina descarbonizadora y disposición de atender a clientes de descarbonización. No se requiere especialización previa." },
  { question: "¿La máquina se compra o se alquila?", answer: "Ofrecemos ambas modalidades. La compra directa ofrece mayor margen desde el primer día. El alquiler reduce la inversión inicial y es una buena opción para talleres que quieren probar el servicio." },
  { question: "¿Cuánto tiempo tarda el ROI?", answer: "Con una media de 2–3 servicios de descarbonización al día, el retorno de la inversión en la máquina Hy-Calamine 1000S se consigue en 3–6 meses. Para los modelos superiores, el mayor rendimiento compensará la inversión en plazos similares." },
  { question: "¿Recibo clientes de Ecología Rentable?", answer: "Sí. Los socios certificados aparecen en el directorio de centros de nuestra web y reciben leads de clientes de su zona geográfica a través de nuestra plataforma." },
];

export default function Socios() {
  return (
    <main>
      <PageHero
        title="Únete a la red de socios Ecología Rentable"
        subtitle="Ofrece descarbonización profesional en tu taller. Equipo, formación, leads y soporte incluidos."
        breadcrumbs={[{ label: "Socios" }]}
        badge="Programa de socios"
      />

      {/* BENEFICIOS */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Qué incluye ser socio?</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>Un programa completo para que tu taller ofrezca descarbonización de forma rentable desde el primer mes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Package size={20} />, title: "Máquina descarbonizadora", desc: "Acceso a la gama Hy-Calamine con condiciones preferentes. Compra o alquiler según tu situación." },
              { icon: <Users size={20} />, title: "Formación técnica", desc: "Formación inicial presencial y online. Material técnico actualizado y acceso a soporte experto." },
              { icon: <Star size={20} />, title: "Leads de clientes", desc: "Apareces en el directorio de centros certificados y recibes solicitudes de clientes de tu zona." },
              { icon: <TrendingUp size={20} />, title: "Soporte comercial", desc: "Material de marketing, plantillas de presupuesto y asesoramiento para la fijación de precios." },
              { icon: <BarChart size={20} />, title: "Portal de gestión", desc: "Acceso al portal de socios: gestión de citas, historial de servicios, pedidos de consumibles." },
              { icon: <CheckCircle size={20} />, title: "Certificación visible", desc: "Logo de centro certificado Ecología Rentable para tu web, escaparate y redes sociales." },
            ].map((b) => (
              <div key={b.title} className="card-eco p-6 flex flex-col gap-3">
                <div className="icon-circle w-11 h-11">{b.icon}</div>
                <h3 className="font-bold" style={{ color: "hsl(var(--foreground))" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>¿Cómo funciona el programa?</h2>
          </div>
          <div className="space-y-6">
            {[
              { step: 1, title: "Solicitas información", desc: "Rellenas el formulario de socio con los datos de tu taller. En 24–48 horas nos ponemos en contacto contigo." },
              { step: 2, title: "Visita técnica + propuesta", desc: "Un técnico de zona visita el taller, evalúa el espacio y te propone la máquina más adecuada y las condiciones del acuerdo." },
              { step: 3, title: "Firma del acuerdo de socio", desc: "Firmamos el acuerdo de colaboración que incluye los términos de uso, formación y soporte." },
              { step: 4, title: "Instalación y formación", desc: "Instalamos la máquina en tu taller y realizamos la formación técnica (1 día presencial + recursos online)." },
              { step: 5, title: "Empiezas a facturar", desc: "Tu taller aparece en el directorio. Recibes tus primeros leads y empiezas a ofrecer el servicio a tus clientes." },
            ].map((s) => (
              <div key={s.step} className="flex gap-5">
                <div className="step-number shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUISITOS */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Requisitos mínimos</h2>
          </div>
          <div className="card-eco p-8">
            <ul className="space-y-3">
              {[
                "Taller mecánico activo con CIF/NIF español",
                "Espacio mínimo de 4 m² para la máquina descarbonizadora",
                "Toma de corriente 220V accesible en zona de trabajo",
                "Al menos 1 mecánico con formación básica en mecánica de motor",
                "Compromiso de ofrecer el servicio a clientes de la zona",
                "Acceso a internet para el portal de socios",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                  <span className="text-sm" style={{ color: "hsl(var(--foreground))" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Formatos de colaboración</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>Adaptamos el acuerdo al tamaño y necesidades de tu taller.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Socio Inicio", machine: "Hy-Calamine 1000S", ideal: "Talleres pequeños / inicio", features: ["Máquina incluida (compra o alquiler)", "Formación inicial", "Listing en directorio", "Soporte técnico por email"] },
              { name: "Socio Profesional", machine: "Hy-Calamine 2000S", ideal: "Talleres medianos", features: ["Todo lo del plan Inicio", "Leads geolocalizados prioritarios", "Soporte telefónico", "Material de marketing incluido", "Acceso al portal de gestión"], highlight: true },
              { name: "Socio Premium", machine: "Hy-Calamine 3000S", ideal: "Talleres grandes / flotas", features: ["Todo lo del plan Profesional", "Gestor de cuenta dedicado", "Visitas técnicas periódicas", "Software de gestión de flotas", "Condiciones de reventa de consumibles"] },
            ].map((plan) => (
              <div key={plan.name} className={`card-eco p-6 flex flex-col ${plan.highlight ? "ring-2" : ""}`} style={plan.highlight ? { ringColor: "hsl(var(--primary))", border: "2px solid hsl(var(--primary))" } : {}}>
                {plan.highlight && <span className="badge-green self-start mb-3">Más elegido</span>}
                <h3 className="font-bold text-lg mb-1" style={{ color: "hsl(var(--foreground))" }}>{plan.name}</h3>
                <p className="text-xs mb-1" style={{ color: "hsl(var(--primary))" }}>Con {plan.machine}</p>
                <p className="text-xs mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>Ideal para: {plan.ideal}</p>
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
                      <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/socios/hazte-socio" className="btn-primary text-sm justify-center">
                  Solicitar información <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqSocios} />

      <CTABox title="¿Listo para unirte?" description="Rellena el formulario de socio y nos ponemos en contacto en menos de 24 horas." primaryLabel="Hazte socio ahora" primaryHref="/socios/hazte-socio" secondaryLabel="Contactar primero" secondaryHref="/contacto" />
    </main>
  );
}
