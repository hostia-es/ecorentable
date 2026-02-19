import { Link } from "react-router-dom";
import { CheckCircle, Users, Target, Award, Leaf, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";

export default function Nosotros() {
  return (
    <main>
      <PageHero
        title="Especialistas en descarbonización de motores"
        subtitle="Llevamos más de una década ayudando a conductores, talleres y flotas a mantener sus motores más limpios, eficientes y sostenibles."
        breadcrumbs={[{ label: "Nosotros" }]}
        badge="Quiénes somos"
      />

      {/* MISIÓN */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-3">Nuestra misión</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
                Hacer la descarbonización accesible en toda España
              </h2>
              <p className="text-base mb-4 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                Ecología Rentable nació con el objetivo de democratizar el acceso a los servicios profesionales de descarbonización de motores en España. Creemos que cualquier conductor, independientemente de dónde viva, debe poder encontrar un taller certificado cerca de su domicilio.
              </p>
              <p className="text-base mb-4 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                Nuestra plataforma conecta a conductores con talleres certificados, a talleres con la tecnología y formación necesarias, y a gestores de flotas con soluciones de mantenimiento preventivo eficientes.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                No somos solo una empresa de servicios: somos una red que cree en que el mantenimiento correcto del motor contribuye a reducir las emisiones de CO₂ y partículas del parque automovilístico español.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "+300", label: "Centros certificados", sub: "En toda España" },
                { value: "+50.000", label: "Vehículos tratados", sub: "Desde nuestra fundación" },
                { value: "5", label: "Provincias principales", sub: "Red en expansión" },
                { value: "98%", label: "Satisfacción", sub: "Valoración media de clientes" },
              ].map((s) => (
                <div key={s.label} className="card-eco p-5 text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>{s.value}</div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.label}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Nuestros valores</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Leaf size={22} />, title: "Sostenibilidad", desc: "Reducir las emisiones del parque automovilístico español es el eje de todo lo que hacemos." },
              { icon: <Target size={22} />, title: "Rigor técnico", desc: "Trabajamos con máquinas y productos que cumplen las normativas europeas más exigentes." },
              { icon: <Users size={22} />, title: "Red colaborativa", desc: "Somos más fuertes juntos. Talleres, conductores y gestores de flotas forman nuestra comunidad." },
              { icon: <Award size={22} />, title: "Resultado garantizado", desc: "Nuestros centros certificados garantizan la calidad del servicio y el resultado obtenido." },
            ].map((v) => (
              <div key={v.title} className="card-eco p-6 text-center">
                <div className="icon-circle w-12 h-12 mx-auto mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Nuestro equipo</h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
              Técnicos especializados, ingenieros de motor y profesionales del sector de la automoción trabajan para ofrecerte el mejor servicio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Área Técnica", desc: "Ingenieros especializados en combustión interna, mecánica de precisión y sistemas de postratamiento de gases.", members: 12 },
              { name: "Red de Socios", desc: "Equipo de coordinación y soporte para los más de 300 talleres socios, con formación continua y apoyo técnico.", members: 8 },
              { name: "Comercial y Flotas", desc: "Especialistas en gestión de flotas empresariales, con experiencia en transporte, logística y renting.", members: 6 },
            ].map((dept) => (
              <div key={dept.name} className="card-eco p-6">
                <div className="icon-circle w-11 h-11 mb-3"><Users size={18} /></div>
                <h3 className="font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>{dept.name}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>{dept.desc}</p>
                <span className="badge-green">{dept.members} profesionales</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICACIONES */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Certificaciones y estándares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { cert: "ISO 9001", desc: "Gestión de la calidad en todos nuestros procesos operativos y de servicio." },
              { cert: "CE (Directiva 2006/42/CE)", desc: "Todas nuestras máquinas descarbonizadoras cumplen la directiva de maquinaria europea." },
              { cert: "AENOR", desc: "Certificación de calidad en la formación de talleres socios y en los productos comercializados." },
              { cert: "Conformidad Euro 6d", desc: "Nuestros procedimientos son compatibles con vehículos Euro 3, 4, 5 y 6d-TEMP." },
            ].map((c) => (
              <div key={c.cert} className="flex items-start gap-3 card-eco p-5">
                <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                <div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{c.cert}</div>
                  <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Nuestra historia</h2>
          </div>
          <div className="space-y-6">
            {[
              { year: "2012", event: "Fundación de Ecología Rentable como empresa especializada en descarbonización profesional para talleres de la Comunidad de Madrid." },
              { year: "2015", event: "Lanzamiento del programa de socios, con los primeros 30 talleres certificados en Madrid y Barcelona." },
              { year: "2018", event: "Introducción de la gama Hy-Calamine de máquinas descarbonizadoras por hidrógeno, fabricadas bajo nuestras especificaciones técnicas." },
              { year: "2021", event: "Superamos los 200 centros certificados en España. Lanzamiento del servicio especializado para flotas empresariales." },
              { year: "2024", event: "Red de más de 300 centros en 40 provincias. Más de 50.000 vehículos tratados desde la fundación." },
            ].map((h) => (
              <div key={h.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--gradient-primary)", color: "white" }}>{h.year.slice(2)}</div>
                  <div className="w-0.5 flex-1 mt-2" style={{ background: "hsl(var(--border))" }} />
                </div>
                <div className="pb-6">
                  <div className="font-bold text-sm mb-1" style={{ color: "hsl(var(--primary))" }}>{h.year}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{h.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABox
        title="¿Quieres colaborar con nosotros?"
        description="Tanto si eres un taller como si quieres contactar con el equipo, estamos aquí para ayudarte."
        primaryLabel="Hazte socio"
        primaryHref="/socios/hazte-socio"
        secondaryLabel="Contactar"
        secondaryHref="/contacto"
      />
    </main>
  );
}
