import { useParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, ArrowRight, Euro } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";

interface ServicioData {
  title: string;
  subtitle: string;
  badge: string;
  definition: string;
  symptoms: string[];
  benefits: string[];
  priceRange: string;
  priceNote: string;
  process: { step: number; title: string; desc: string }[];
  target: string[];
  faq: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
}

const servicios: Record<string, ServicioData> = {
  descarbonizacion: {
    title: "Servicio de Descarbonización",
    subtitle: "Limpieza profesional del motor por hidrógeno (HHO). Sin desmontaje, sin productos agresivos. Resultados medibles desde la primera sesión.",
    badge: "Servicio estrella",
    definition: "La descarbonización profesional es el proceso de eliminación de depósitos carbonosos acumulados en el interior del motor mediante la introducción de gas HHO (hidrógeno + oxígeno) a través de la admisión. El proceso se realiza con el motor en marcha y no requiere desmontar ninguna pieza.",
    symptoms: ["Consumo de combustible elevado o en aumento", "Pérdida de potencia o tirones al acelerar", "Humos negros o azulados por el escape", "Testigo de motor encendido", "Regeneraciones DPF frecuentes o fallidas", "Ruidos de traqueteo especialmente en frío"],
    benefits: ["Reducción de emisiones hasta 70%", "Mejora de rendimiento 8–18%", "Reducción del consumo 5–12%", "Motor más silencioso y suave", "Extensión de vida útil del DPF, EGR y catalizador"],
    priceRange: "Desde 80 € hasta 200 €",
    priceNote: "El precio final depende de la cilindrada del vehículo, el modelo de máquina y los servicios adicionales (EGR, DPF).",
    process: [
      { step: 1, title: "Diagnóstico OBD2", desc: "Lectura de parámetros y códigos de error del motor." },
      { step: 2, title: "Preparación", desc: "Calentamiento del motor a temperatura óptima y conexión del equipo." },
      { step: 3, title: "Ciclo HHO", desc: "Introducción del gas HHO durante 15–45 minutos según el vehículo." },
      { step: 4, title: "Verificación", desc: "Medición de emisiones antes/después y borrado de códigos si corresponde." },
    ],
    target: ["Conductores particulares con vehículo diésel o gasolina", "Flotas de empresa que buscan reducir costes de mantenimiento", "Talleres que quieren ofrecer el servicio a sus clientes"],
    faq: [
      { question: "¿Cuánto tarda el servicio?", answer: "Entre 30 y 90 minutos incluyendo diagnóstico y verificación. Puedes esperar en el taller." },
      { question: "¿Se nota inmediatamente?", answer: "La mayoría de conductores nota mejoría en la respuesta del motor y suavidad de marcha desde el primer día. La reducción de consumo se observa en los primeros 1.000 km." },
      { question: "¿Cada cuánto debo hacerlo?", answer: "Para uso mixto, cada 30.000–50.000 km. Para uso urbano intensivo, cada 20.000–30.000 km." },
    ],
    relatedLinks: [{ label: "Solución: Descarbonización motor diésel", href: "/soluciones/descarbonizacion-motor-diesel" }, { label: "Artículo: ¿Qué es la descarbonización?", href: "/blog/que-es-descarbonizacion-motor" }, { label: "Gama Hy-Calamine", href: "/tienda/maquinas-descarbonizadoras" }],
  },
  particulares: {
    title: "Servicio para Particulares",
    subtitle: "Descarbonización, limpieza DPF y EGR para tu vehículo personal. Precio justo, sin sorpresas, con garantía de resultado.",
    badge: "Para conductores",
    definition: "El servicio para particulares de Ecología Rentable incluye la descarbonización completa del motor, la limpieza del filtro de partículas y el tratamiento de la válvula EGR adaptado al vehículo de uso personal. Ideal antes de la ITV, tras síntomas de pérdida de potencia o como mantenimiento preventivo.",
    symptoms: ["Testigo de motor o DPF en el cuadro", "Tu vehículo ha suspendido la ITV por emisiones", "Notas pérdida de potencia o mayor consumo", "Llevas más de 40.000 km sin mantenimiento del motor"],
    benefits: ["Vehículo más eficiente y limpio", "Superar la ITV con margen", "Evitar averías costosas (sustitución DPF: 400–1.500 €)", "Conducción más suave y placentera"],
    priceRange: "Desde 80 € hasta 250 €",
    priceNote: "Precio según vehículo y servicios incluidos. Solicita presupuesto gratuito en cualquier centro certificado.",
    process: [
      { step: 1, title: "Pide cita", desc: "Localiza el centro más cercano en nuestro directorio y solicita cita online o por teléfono." },
      { step: 2, title: "Diagnóstico gratuito", desc: "El taller realiza una lectura OBD2 gratuita para identificar exactamente lo que necesita tu vehículo." },
      { step: 3, title: "Servicio a medida", desc: "Se realiza la descarbonización y los tratamientos adicionales acordados." },
      { step: 4, title: "Entrega con informe", desc: "Recibes un informe de antes/después con los valores de emisiones." },
    ],
    target: ["Conductores con vehículo diésel o gasolina de más de 3 años", "Propietarios de vehículos con uso urbano intensivo", "Conductores que van a pasar la ITV próximamente"],
    faq: [
      { question: "¿Necesito llevar el vehículo al taller?", answer: "Sí, el servicio se realiza siempre en un taller certificado Ecología Rentable. Localiza el más cercano en nuestro directorio." },
      { question: "¿Qué vehículos admite el servicio?", answer: "Turismos y furgonetas ligeras, diésel y gasolina, Euro 3 a Euro 6d. Para vehículos industriales, consulta el servicio de flotas." },
    ],
    relatedLinks: [{ label: "Contactar", href: "/contacto" }, { label: "Solución ITV", href: "/soluciones/itv-gases" }, { label: "Preguntas frecuentes", href: "/contacto" }],
  },
  talleres: {
    title: "Servicios para Talleres",
    subtitle: "Añade descarbonización profesional a la oferta de tu taller. Máquina, formación, leads y soporte incluidos.",
    badge: "B2B",
    definition: "El servicio para talleres de Ecología Rentable permite a cualquier mecánico ofrecer descarbonización profesional a sus clientes, ya sea mediante la adquisición o alquiler de una máquina Hy-Calamine, o como centro de derivación de nuestro directorio.",
    symptoms: ["Quieres diversificar los servicios de tu taller", "Tus clientes te preguntan por descarbonización y DPF", "Buscas un servicio de alto margen con baja inversión", "Quieres recibir leads cualificados de tu zona"],
    benefits: ["Margen por servicio entre 50 y 150 €", "ROI de la máquina en 3–6 meses", "Leads de clientes de tu zona geográfica", "Formación técnica incluida", "Soporte técnico y comercial continuo"],
    priceRange: "Inversión desde 2.800 €",
    priceNote: "Precio de la máquina Hy-Calamine 1000S. También disponible en alquiler desde consultar. Solicita propuesta personalizada.",
    process: [
      { step: 1, title: "Solicita información", desc: "Rellena el formulario de socio con los datos de tu taller." },
      { step: 2, title: "Visita técnica", desc: "Un técnico evalúa el espacio y te propone la máquina más adecuada." },
      { step: 3, title: "Acuerdo y formación", desc: "Firmamos el acuerdo y realizamos la formación técnica (1 día presencial + online)." },
      { step: 4, title: "Empieza a facturar", desc: "Tu taller aparece en el directorio y recibes tus primeros leads." },
    ],
    target: ["Talleres mecánicos multimarca", "Concesionarios de vehículos", "Talleres de flotas de empresa"],
    faq: [
      { question: "¿Necesito experiencia previa en descarbonización?", answer: "No. La formación inicial que incluimos es suficiente para empezar a ofrecer el servicio con garantías." },
      { question: "¿Cuánto espacio necesito?", answer: "Mínimo 4 m² para la máquina y toma de corriente 220V. La mayoría de talleres cumplen estos requisitos sin obras." },
    ],
    relatedLinks: [{ label: "Programa de socios", href: "/socios" }, { label: "Hazte socio", href: "/socios/hazte-socio" }, { label: "Ver máquinas", href: "/tienda/maquinas-descarbonizadoras" }],
  },
  flotas: {
    title: "Servicios para Flotas",
    subtitle: "Mantenimiento preventivo y correctivo para flotas de vehículos diésel. Reducción de costes, menos averías, cumplimiento medioambiental.",
    badge: "Flotas",
    definition: "El servicio de descarbonización para flotas de Ecología Rentable está diseñado para empresas con más de 5 vehículos que buscan reducir los costes de mantenimiento, extender la vida útil de sus vehículos y cumplir con la normativa de emisiones.",
    symptoms: ["Costes de reparación DPF repetitivos en tu flota", "Vehículos que suspenden la ITV por emisiones", "Consumo de combustible elevado respecto al estándar de cada modelo", "Alta rotación de componentes (EGR, catalizador, DPF)"],
    benefits: ["Reducción de costes de mantenimiento hasta 35%", "Extensión de vida del DPF hasta 2–3 veces", "Reducción de consumo en toda la flota", "Cumplimiento normativa de emisiones", "Informes de mantenimiento por vehículo"],
    priceRange: "Desde 65 € / vehículo",
    priceNote: "Precio por servicio de descarbonización para flota (mín. 5 vehículos). Se aplican descuentos por volumen. Solicita presupuesto de flota.",
    process: [
      { step: 1, title: "Evaluación de la flota", desc: "Análisis del parque de vehículos: modelos, km, historial de mantenimiento y estado actual." },
      { step: 2, title: "Plan personalizado", desc: "Propuesta de plan de mantenimiento preventivo adaptado a la flota." },
      { step: 3, title: "Intervenciones programadas", desc: "Servicios de descarbonización programados en el taller o en las instalaciones del cliente (flotas grandes)." },
      { step: 4, title: "Reporting", desc: "Informe periódico de estado de la flota con métricas de emisiones, consumo y estado de DPF." },
    ],
    target: ["Empresas de transporte de mercancías y personas", "Gestores de flotas de empresa (renting, vehículos comerciales)", "Organismos públicos con flota diésel"],
    faq: [
      { question: "¿Ofrecen servicio en las instalaciones del cliente?", answer: "Para flotas de más de 20 vehículos, podemos organizar jornadas de servicio en las instalaciones del cliente con nuestras unidades móviles." },
      { question: "¿Hay contratos de mantenimiento periódico?", answer: "Sí. Ofrecemos contratos anuales de mantenimiento preventivo para flotas con precio fijo por vehículo y km." },
    ],
    relatedLinks: [{ label: "Kit Descarbonización Flotas", href: "/tienda/kits-limpieza" }, { label: "Blog: Mantenimiento preventivo flotas", href: "/blog/mantenimiento-preventivo-flotas-diesel" }, { label: "Contactar comercial flotas", href: "/contacto" }],
  },
  "limpieza-filtros": {
    title: "Servicio de Limpieza de Filtros DPF/FAP",
    subtitle: "Regeneración y limpieza profesional del filtro de partículas sin sustitución. Eficacia hasta el 90% en filtros obstruidos.",
    badge: "DPF / FAP",
    definition: "El servicio de limpieza de filtros de partículas (DPF/FAP) de Ecología Rentable utiliza diferentes métodos según el grado de obstrucción: tratamiento por admisión, aditivos de regeneración o limpieza por ultrasonidos con desmontaje. El objetivo es recuperar el filtro evitando su costosa sustitución.",
    symptoms: ["Testigo DPF/FAP encendido", "Vehículo en modo de emergencia (limp mode)", "Regeneraciones muy frecuentes o que no finalizan", "Pérdida severa de potencia", "Consumo de aceite mayor de lo habitual"],
    benefits: ["Recuperación del filtro sin sustitución", "Ahorro de 400–1.500 € vs. DPF nuevo", "Eliminación del testigo y del limp mode", "Reducción de opacidad medible en ITV", "Extensión de vida del filtro 50.000+ km adicionales"],
    priceRange: "Desde 120 € hasta 400 €",
    priceNote: "El precio varía según el grado de obstrucción, el método necesario (sin/con desmontaje) y el tipo de vehículo.",
    process: [
      { step: 1, title: "Medición de contrapresión", desc: "Diagnóstico del nivel de obstrucción del filtro con equipo de presión diferencial." },
      { step: 2, title: "Selección del método", desc: "Tratamiento por admisión (sin desmontaje) o limpieza por ultrasonidos (con desmontaje) según el estado." },
      { step: 3, title: "Tratamiento", desc: "Aplicación del método elegido con productos compatibles con el sistema DPF/FAP." },
      { step: 4, title: "Regeneración forzada", desc: "Ciclo de regeneración activa y verificación con diagnóstico." },
    ],
    target: ["Conductores particulares con testigo DPF encendido", "Flotas con alta rotación de filtros de partículas", "Talleres que quieren ofrecer el servicio de limpieza DPF"],
    faq: [
      { question: "¿Se puede limpiar cualquier DPF?", answer: "La mayoría de los DPF con obstrucción ≤90% pueden limpiarse con éxito. Por encima de ese umbral, la sustitución puede ser necesaria." },
      { question: "¿Es necesario desmontar el filtro?", answer: "En muchos casos no. El tratamiento por admisión es efectivo para obstrucciones leves-moderadas. Para casos más graves, el desmontaje y la limpieza por ultrasonidos ofrece mejores resultados." },
    ],
    relatedLinks: [{ label: "Solución: Limpieza DPF/FAP", href: "/soluciones/limpieza-filtro-particulas" }, { label: "Carbon FAP (aditivo)", href: "/tienda/aditivos" }, { label: "Blog: 7 síntomas DPF obstruido", href: "/blog/sintomas-filtro-particulas-obstruido" }],
  },
};

export default function ServicioDetalle() {
  const { servicio } = useParams<{ servicio: string }>();
  const s = servicios[servicio ?? ""];

  if (!s) {
    return (
      <main>
        <PageHero title="Servicio no encontrado" subtitle="" breadcrumbs={[{ label: "Servicios", href: "/servicios" }, { label: "No encontrado" }]} />
        <div className="py-16 text-center"><Link to="/servicios" className="btn-primary">← Ver todos los servicios</Link></div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title={s.title}
        subtitle={s.subtitle}
        breadcrumbs={[{ label: "Servicios", href: "/servicios" }, { label: s.title }]}
        badge={s.badge}
      />

      {/* DEFINICIÓN */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card-eco p-6 mb-8">
            <h2 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿En qué consiste?</h2>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{s.definition}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--foreground))" }}>¿Cuándo lo necesitas?</h2>
              <ul className="space-y-2">
                {s.symptoms.map((sym) => (
                  <li key={sym} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{sym}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--foreground))" }}>Resultados esperados</h2>
              <ul className="space-y-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "hsl(var(--foreground))" }}>Cómo funciona</h2>
          <div className="space-y-5">
            {s.process.map((p) => (
              <div key={p.step} className="flex gap-5">
                <div className="step-number shrink-0">{p.step}</div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO + TARGET */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-eco p-6">
              <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "hsl(var(--foreground))" }}><Euro size={16} style={{ color: "hsl(var(--primary))" }} />Precio orientativo</h2>
              <div className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--primary))" }}>{s.priceRange}</div>
              <p className="text-xs mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>{s.priceNote}</p>
              <Link to="/contacto" className="btn-primary text-sm w-full justify-center">Solicitar presupuesto <ArrowRight size={12} /></Link>
            </div>
            <div className="card-eco p-6">
              <h2 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>¿Para quién es?</h2>
              <ul className="space-y-2">
                {s.target.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENLACES */}
      <section className="py-10 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Recursos relacionados</h2>
          <div className="flex flex-wrap gap-3">
            {s.relatedLinks.map((l) => (
              <Link key={l.href} to={l.href} className="badge-steel text-sm px-4 py-2 hover:border-primary transition-colors flex items-center gap-1">
                <ArrowRight size={11} style={{ color: "hsl(var(--primary))" }} />{l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={s.faq} />
      <CTABox title="¿Listo para el servicio?" description="Localiza el centro certificado más cercano y solicita cita para tu vehículo." primaryLabel="Encontrar centro" primaryHref="/encuentre-centro" secondaryLabel="Hablar con experto" secondaryHref="/contacto" />
    </main>
  );
}
