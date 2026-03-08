import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";

const soluciones = [
  { slug: "descarbonizacion-motor-diesel", title: "Descarbonización motor diésel", desc: "Eliminación de depósitos carbonosos en pistones, válvulas y cámara de combustión de motores diésel.", badge: "Más solicitado" },
  { slug: "limpieza-filtro-particulas", title: "Limpieza filtro de partículas DPF/FAP", desc: "Regeneración y limpieza del filtro de partículas sin desmontaje. Solución para testigos encendidos y regeneraciones fallidas.", badge: null },
  { slug: "descarbonizacion-hidrogeno", title: "Descarbonización por hidrógeno", desc: "Proceso profesional de descarbonización mediante gas HHO. Más eficaz y seguro que los métodos químicos convencionales.", badge: "Profesional" },
  { slug: "mantenimiento-motor-diesel", title: "Mantenimiento motor diésel", desc: "Plan de mantenimiento preventivo para motores diésel: descarbonización periódica, aditivos y limpieza de circuitos.", badge: null },
  { slug: "limpieza-egr-catalizador", title: "Limpieza EGR y catalizador", desc: "Limpieza de la válvula EGR y el catalizador para recuperar rendimiento y reducir emisiones de NOx.", badge: null },
  { slug: "itv-gases", title: "Reducción gases para la ITV", desc: "Tratamiento específico para reducir CO, HC y opacidad antes de la Inspección Técnica de Vehículos.", badge: "ITV" },
  { slug: "aditivos-motor", title: "Aditivos para motor", desc: "Aditivos de combustible y motor para mejorar la combustión, proteger el sistema de inyección y extender la vida del DPF.", badge: null },
];

const faqSoluciones = [
  { question: "¿Cuál es la diferencia entre solución y servicio?", answer: "En Ecología Rentable, las soluciones describen el problema técnico y la respuesta apropiada, mientras que los servicios son las intervenciones concretas que realizan nuestros talleres certificados." },
  { question: "¿Qué solución necesito si tengo el testigo DPF encendido?", answer: "Lo más habitual es que necesites una limpieza del filtro de partículas (DPF/FAP) combinada con una descarbonización del motor. Consulta la solución 'Limpieza filtro de partículas' y contacta con un centro certificado." },
  { question: "¿Puedo combinar varias soluciones en una misma visita?", answer: "Sí. De hecho, recomendamos combinar descarbonización + limpieza EGR + tratamiento DPF en una misma sesión para maximizar los resultados y el ahorro." },
];

export default function Soluciones() {
  return (
    <main>
      <PageHero
        title="Soluciones para tu motor"
        subtitle="Identifica el problema de tu vehículo y encuentra la solución profesional adecuada. Cada solución enlaza con los servicios y centros disponibles."
        breadcrumbs={[{ label: "Soluciones" }]}
        badge="Guía de soluciones"
      />

      {/* GRID SOLUCIONES */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Cuál es tu situación?</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>Selecciona la solución que mejor describe el problema o necesidad de tu vehículo o flota.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {soluciones.map((s) => (
              <Link key={s.slug} to={`/soluciones/${s.slug}`} className="card-eco p-6 flex flex-col gap-3 group hover:shadow-md transition-shadow">
                {s.badge && <span className="badge-green self-start">{s.badge}</span>}
                <h3 className="font-bold text-base group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                <p className="text-sm flex-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "hsl(var(--primary))" }}>Ver solución <ArrowRight size={11} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO AYUDA */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Por qué elegir una solución profesional?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Diagnóstico previo", desc: "Cada intervención comienza con una lectura OBD2 para identificar el problema con precisión." },
              { title: "Sin desmontaje", desc: "La mayoría de nuestras soluciones no requieren desmontar piezas, reduciendo el tiempo y el coste." },
              { title: "Resultados medibles", desc: "Antes y después del servicio se miden las emisiones y el rendimiento para cuantificar la mejora." },
              { title: "Centros certificados", desc: "Todos nuestros talleres están formados y certificados en los procesos de Ecología Rentable." },
            ].map((item) => (
              <div key={item.title} className="card-eco p-5 flex gap-3">
                <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENLACES */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "hsl(var(--foreground))" }}>Recursos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="card-eco p-5">
              <h3 className="font-bold mb-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>Blog técnico</h3>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Artículos en profundidad sobre cada solución, síntomas y resultados.</p>
              <Link to="/blog" className="text-xs font-semibold flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>Ir al blog <ArrowRight size={11} /></Link>
            </div>
            <div className="card-eco p-5">
              <h3 className="font-bold mb-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>Servicios</h3>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Servicios concretos para particulares, talleres y flotas.</p>
              <Link to="/servicios" className="text-xs font-semibold flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>Ver servicios <ArrowRight size={11} /></Link>
            </div>
            <div className="card-eco p-5">
              <h3 className="font-bold mb-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>Contacta con nosotros</h3>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Resolvemos tus dudas y te asesoramos sobre el servicio más adecuado.</p>
              <Link to="/contacto" className="text-xs font-semibold flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>Contactar <ArrowRight size={11} /></Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqSoluciones} />
      <CTABox title="¿Ya sabes qué necesitas?" description="Contacta con nuestro equipo y solicita presupuesto para tu vehículo." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
