import { useParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import { AnimatedSection } from "@/components/common/Animations";
import serviceHero from "@/assets/service-decarbonization-hero.jpg";
import obd2Diagnostics from "@/assets/obd2-diagnostics.jpg";
import engineBeforeAfter from "@/assets/engine-before-after.jpg";
import maquinaDescarbonizadora from "@/assets/maquina-descarbonizadora.jpg";
import diagnosticoMotor from "@/assets/diagnostico-motor.jpg";
import engineDetail from "@/assets/engine-detail.jpg";
import carbonFapMachine from "@/assets/carbon-fap-machine.png";

const heroImages: Record<string, string> = {
  "descarbonizacion-motor-diesel": serviceHero,
  "limpieza-filtro-particulas": carbonFapMachine,
  "descarbonizacion-hidrogeno": maquinaDescarbonizadora,
  "mantenimiento-motor-diesel": engineDetail,
  "limpieza-egr-catalizador": engineBeforeAfter,
  "itv-gases": diagnosticoMotor,
  "aditivos-motor": engineDetail,
};

const processImages: Record<string, string> = {
  "descarbonizacion-motor-diesel": obd2Diagnostics,
  "limpieza-filtro-particulas": maquinaDescarbonizadora,
  "descarbonizacion-hidrogeno": serviceHero,
  "mantenimiento-motor-diesel": obd2Diagnostics,
  "limpieza-egr-catalizador": diagnosticoMotor,
  "itv-gases": engineBeforeAfter,
  "aditivos-motor": carbonFapMachine,
};

interface SolucionData {
  title: string;
  subtitle: string;
  badge: string;
  causes: string[];
  symptoms: string[];
  process: { step: number; title: string; desc: string }[];
  benefits: string[];
  price: string;
  priceVariables: string[];
  risks: string[];
  faq: { question: string; answer: string }[];
  relatedBlog: { title: string; href: string }[];
  relatedServices: { title: string; href: string }[];
}

const data: Record<string, SolucionData> = {
  "descarbonizacion-motor-diesel": {
    title: "Descarbonización de motor diésel",
    subtitle: "Eliminación profesional de depósitos carbonosos en motores diésel mediante hidrógeno (HHO). Sin desmontaje, resultados inmediatos.",
    badge: "Más solicitado",
    causes: ["Uso predominantemente urbano con trayectos cortos", "Motores modernos con inyección directa de alta presión", "Circulación frecuente en retenciones y baja velocidad", "Aceites de motor degradados o revisiones espaciadas"],
    symptoms: ["Pérdida de potencia y tirones en aceleración", "Aumento del consumo de combustible ≥8%", "Humos negros por el escape", "Testigo de motor encendido (P0420, P0401…)", "Ruidos de traqueteo en frío", "Regeneraciones DPF frecuentes o fallidas"],
    process: [
      { step: 1, title: "Diagnóstico OBD2", desc: "Lectura de códigos de error y parámetros del motor antes de la intervención." },
      { step: 2, title: "Preparación del vehículo", desc: "Calentamiento del motor a temperatura normal de trabajo. Conexión de la máquina Hy-Calamine." },
      { step: 3, title: "Ciclo de descarbonización", desc: "Introducción de gas HHO durante 15–45 minutos según el modelo de máquina y el vehículo." },
      { step: 4, title: "Verificación", desc: "Medición de emisiones y parámetros post-ciclo. Borrado de códigos de error si procede." },
    ],
    benefits: ["Reducción de emisiones CO/HC/opacidad hasta 70%", "Mejora de rendimiento 8–18%", "Reducción de consumo 5–12%", "Mejor respuesta del acelerador", "Extensión de vida del DPF y EGR"],
    price: "Desde 80 € hasta 200 €",
    priceVariables: ["Cilindrada del motor", "Modelo de máquina utilizada", "Servicios adicionales (EGR, DPF)", "Zona geográfica del taller"],
    risks: ["No recomendado si hay fugas de aceite activas", "Contraindicado con motores con daños mecánicos graves", "Debe realizarse con el aceite en buen estado"],
    faq: [
      { question: "¿Cuánto tarda el proceso?", answer: "Entre 30 y 90 minutos incluyendo diagnóstico y verificación. Puedes esperar en el taller." },
      { question: "¿Cada cuántos km se recomienda?", answer: "Para uso mixto, cada 30.000–50.000 km. Para uso urbano intensivo, cada 20.000–30.000 km." },
      { question: "¿Es seguro para el motor?", answer: "Sí. El proceso HHO está certificado y no afecta las piezas internas del motor cuando se realiza correctamente." },
    ],
    relatedBlog: [
      { title: "¿Qué es la descarbonización? Guía completa", href: "/blog/que-es-descarbonizacion-motor" },
      { title: "¿Cada cuántos km descarbonizar?", href: "/blog/cuando-hacer-descarbonizacion-motor-diesel" },
    ],
    relatedServices: [
      { title: "Servicio descarbonización", href: "/servicios/descarbonizacion" },
      { title: "Servicio para particulares", href: "/servicios/particulares" },
    ],
  },
  "limpieza-filtro-particulas": {
    title: "Limpieza del filtro de partículas DPF/FAP",
    subtitle: "Regeneración y limpieza profesional del filtro de partículas sin desmontaje. La solución más efectiva para filtros obstruidos.",
    badge: "DPF / FAP",
    causes: ["Trayectos urbanos cortos que impiden la regeneración activa", "Aditivo FAP agotado (Peugeot/Citroën)", "Válvula EGR obstruida que aumenta la carga de hollín", "Aceite contaminado o fugas internas"],
    symptoms: ["Testigo DPF/FAP encendido en el cuadro", "Pérdida de potencia significativa", "Motor en modo de emergencia (limp mode)", "Regeneraciones activas muy frecuentes", "Olor a quemado durante las regeneraciones"],
    process: [
      { step: 1, title: "Lectura de presión diferencial", desc: "Medición de la contrapresión del filtro para determinar el grado de obstrucción." },
      { step: 2, title: "Elección del método", desc: "Según el grado de obstrucción: tratamiento por admisión, aditivo FAP o limpieza por ultrasonidos." },
      { step: 3, title: "Tratamiento", desc: "Aplicación del tratamiento elegido con producto compatible con el sistema FAP/DPF." },
      { step: 4, title: "Regeneración forzada", desc: "Ciclo de regeneración activa para quemar el hollín restante y verificar la recuperación del filtro." },
    ],
    benefits: ["Recuperación del filtro sin sustitución", "Ahorro vs. DPF nuevo (400–1.500 €)", "Eliminación del testigo y del modo emergencia", "Reducción de opacidad medible", "Prolongación de la vida del filtro"],
    price: "Desde 120 € hasta 350 €",
    priceVariables: ["Grado de obstrucción del filtro", "Método utilizado (admisión vs. ultrasonidos)", "Necesidad de aditivo FAP", "Vehículo y accesibilidad del filtro"],
    risks: ["Filtros con ≥95% de obstrucción pueden requerir sustitución", "No sustituye la corrección de la causa raíz (EGR, aceite)"],
    faq: [
      { question: "¿Se puede limpiar un DPF muy obstruido?", answer: "Depende del grado. Hasta un 85–90% de obstrucción, la limpieza profesional es muy efectiva. Por encima de ese umbral, puede ser necesaria la sustitución." },
      { question: "¿Cuánto dura la limpieza?", answer: "Entre 1 y 3 horas según el método. La limpieza por ultrasonidos puede requerir desmontaje del filtro (+1 h)." },
    ],
    relatedBlog: [
      { title: "7 síntomas de filtro de partículas obstruido", href: "/blog/sintomas-filtro-particulas-obstruido" },
      { title: "Carbon FAP: análisis técnico", href: "/blog/carbon-fap-aditivo-dpf-review" },
    ],
    relatedServices: [
      { title: "Servicio limpieza de filtros", href: "/servicios/limpieza-filtros" },
      { title: "Servicio para flotas", href: "/servicios/flotas" },
    ],
  },
  "descarbonizacion-hidrogeno": {
    title: "Descarbonización por hidrógeno (HHO)",
    subtitle: "La tecnología más avanzada para eliminar depósitos de carbono. Proceso electroquímico limpio, seguro y sin residuos químicos.",
    badge: "Tecnología HHO",
    causes: ["Acumulación natural de carbono en la combustión", "Mayor eficacia necesaria que los métodos químicos", "Demanda de procesos más ecológicos y sostenibles"],
    symptoms: ["Los mismos que la descarbonización convencional: pérdida de potencia, humos, consumo elevado"],
    process: [
      { step: 1, title: "Electrólisis del agua", desc: "La máquina produce gas HHO (H₂ + O) a partir de agua destilada y electrolito mediante corriente eléctrica." },
      { step: 2, title: "Introducción en el motor", desc: "El gas HHO se introduce por la toma de admisión mientras el motor funciona en ralentí." },
      { step: 3, title: "Acción sobre el carbono", desc: "A las temperaturas de combustión, el HHO transforma el carbono sólido en CO₂ y H₂O gaseosos." },
      { step: 4, title: "Expulsión por el escape", desc: "Los gases resultantes (agua y CO₂) se expulsan de forma natural por el tubo de escape." },
    ],
    benefits: ["Sin productos químicos agresivos", "Sin residuos líquidos", "Proceso 100% trazable y medible", "Compatible con catalizador y sonda lambda", "Certificado CE y conforme a normativa europea"],
    price: "Desde 80 € hasta 180 €",
    priceVariables: ["Modelo de máquina (1000S/2000S/3000S)", "Cilindrada del motor", "Tiempo de ciclo requerido"],
    risks: ["No aplicar en motores con juntas de culata dañadas", "Verificar ausencia de fugas antes del tratamiento"],
    faq: [
      { question: "¿Es seguro el hidrógeno en el taller?", answer: "Sí. Las máquinas profesionales Hy-Calamine producen HHO bajo demanda y en pequeñas cantidades, sin acumulación peligrosa. Cuentan con válvulas de seguridad automáticas." },
      { question: "¿Es lo mismo que añadir agua al motor?", answer: "No. El gas HHO actúa de forma muy diferente al agua líquida. Nunca se introduce agua en estado líquido en el motor." },
    ],
    relatedBlog: [
      { title: "Descarbonización por hidrógeno: cómo funciona", href: "/blog/descarbonizacion-hidrogeno-como-funciona" },
    ],
    relatedServices: [
      { title: "Ver máquinas Hy-Calamine", href: "/tienda/maquinas-descarbonizadoras" },
      { title: "Servicio descarbonización", href: "/servicios/descarbonizacion" },
    ],
  },
  "mantenimiento-motor-diesel": {
    title: "Mantenimiento preventivo motor diésel",
    subtitle: "Plan de mantenimiento preventivo para motores diésel: descarbonización periódica, aditivos y limpieza de circuitos para maximizar la vida del motor.",
    badge: "Preventivo",
    causes: ["Ausencia de mantenimiento específico del sistema de limpieza", "Acumulación progresiva de carbono y hollín", "Degradación de componentes DPF, EGR y catalizador"],
    symptoms: ["Incremento gradual del consumo", "Pérdida de potencia progresiva", "Regeneraciones DPF más frecuentes", "Testigos de motor que aparecen periódicamente"],
    process: [
      { step: 1, title: "Evaluación inicial", desc: "Diagnóstico OBD2 y revisión visual del sistema de escape y admisión." },
      { step: 2, title: "Descarbonización preventiva", desc: "Ciclo de descarbonización HHO de mantenimiento (ciclo más corto que el correctivo)." },
      { step: 3, title: "Tratamiento aditivos", desc: "Aplicación de aditivo de combustible, tratamiento EGR y Carbon FAP si procede." },
      { step: 4, title: "Plan de seguimiento", desc: "Registro del servicio y recomendación del próximo intervalo de mantenimiento." },
    ],
    benefits: ["Prevención de averías costosas", "Extensión de vida del DPF hasta 2–3 veces", "Consumo estable a lo largo de la vida del vehículo", "Ahorro hasta 35% vs. reparaciones correctivas"],
    price: "Desde 60 € hasta 150 €",
    priceVariables: ["Servicios incluidos en el plan", "Formato de aditivos elegido", "Frecuencia del mantenimiento"],
    risks: ["No sustituye la revisión mecánica completa", "Debe realizarse con el aceite en buen estado"],
    faq: [
      { question: "¿Con qué frecuencia debo hacer el mantenimiento preventivo?", answer: "Cada 20.000–30.000 km para uso urbano, o cada 30.000–50.000 km para uso mixto/carretera." },
    ],
    relatedBlog: [
      { title: "Mantenimiento preventivo de flotas diésel", href: "/blog/mantenimiento-preventivo-flotas-diesel" },
    ],
    relatedServices: [
      { title: "Servicios para flotas", href: "/servicios/flotas" },
      { title: "Kits de mantenimiento en tienda", href: "/tienda/kits-limpieza" },
    ],
  },
  "limpieza-egr-catalizador": {
    title: "Limpieza EGR y catalizador",
    subtitle: "Recupera el rendimiento de la válvula EGR y el catalizador sin desmontaje. Reduce emisiones de NOx y mejora la combustión.",
    badge: "EGR / Catalizador",
    causes: ["Obstrucción progresiva por depósitos de hollín en la válvula EGR", "Contaminación del catalizador por aceite o combustible", "Fallo de actuadores eléctricos de la válvula EGR"],
    symptoms: ["Humos negros y exceso de NOx en gases de escape", "Pérdida de potencia y tirones", "Consumo elevado de combustible", "Testigo P0401 (caudal EGR insuficiente)", "Motor que falla en ralentí"],
    process: [
      { step: 1, title: "Diagnóstico EGR", desc: "Lectura del porcentaje de apertura real de la válvula EGR y verificación del actuador." },
      { step: 2, title: "Limpieza por admisión", desc: "Aplicación de limpiador EGR en aerosol por la admisión con el motor en marcha." },
      { step: 3, title: "Ciclo descarbonización", desc: "Descarbonización HHO complementaria para limpiar el interior de los conductos EGR." },
      { step: 4, title: "Verificación", desc: "Relectura de parámetros EGR y prueba de emisiones para verificar la mejora." },
    ],
    benefits: ["Recupera el caudal de la válvula EGR", "Reduce NOx y HC en el escape", "Evita la sustitución de la válvula EGR (300–600 €)", "Compatible con la limpieza del catalizador en la misma sesión"],
    price: "Desde 70 € hasta 180 €",
    priceVariables: ["Grado de obstrucción de la EGR", "Necesidad de limpieza del catalizador", "Desmontaje necesario o no"],
    risks: ["Si la válvula EGR está mecánicamente bloqueada, puede requerir sustitución", "No aplicar si hay pérdidas de refrigerante hacia los gases"],
    faq: [
      { question: "¿Se puede limpiar la EGR sin desmontarla?", answer: "En la mayoría de los casos, sí. El método de limpieza por admisión con aerosol profesional y el ciclo HHO permiten limpiar la EGR sin desmontaje en un 70–80% de los casos." },
    ],
    relatedBlog: [
      { title: "Válvula EGR: qué es y cómo limpiarla", href: "/blog/valvula-egr-que-es-como-limpiar" },
    ],
    relatedServices: [
      { title: "Servicio limpieza filtros y EGR", href: "/servicios/limpieza-filtros" },
      { title: "Kit EGR Profesional", href: "/tienda/accesorios-consumibles" },
    ],
  },
  "itv-gases": {
    title: "Reducción de gases para superar la ITV",
    subtitle: "Tratamiento específico para reducir CO, HC y opacidad antes de la inspección técnica. Resultado garantizado o te devolvemos el coste del tratamiento.",
    badge: "ITV",
    causes: ["Acumulación de carbono que aumenta las emisiones de escape", "Motor sin mantenimiento previo a la inspección", "DPF obstruido que genera exceso de opacidad"],
    symptoms: ["Suspensión en ITV por exceso de CO, HC o opacidad", "Testigo de motor encendido antes de la ITV", "Emisiones visibles por el escape"],
    process: [
      { step: 1, title: "Medición previa de emisiones", desc: "El taller mide las emisiones de tu vehículo antes del tratamiento para cuantificar la reducción necesaria." },
      { step: 2, title: "Descarbonización completa", desc: "Ciclo de descarbonización HHO + tratamiento DPF si el vehículo lo lleva." },
      { step: 3, title: "Verificación de resultados", desc: "Nueva medición de emisiones para confirmar que los valores están dentro de los límites ITV." },
      { step: 4, title: "Informe para presentar en ITV", desc: "En algunos centros se facilita informe técnico del servicio realizado." },
    ],
    benefits: ["Reducción CO hasta 60%", "Reducción HC hasta 50%", "Reducción opacidad (diésel) hasta 70%", "Garantía de resultado o repetición gratuita"],
    price: "Desde 80 € hasta 200 €",
    priceVariables: ["Valores iniciales de emisiones", "Tipo de motor (diésel/gasolina)", "Servicios adicionales necesarios (DPF, EGR)"],
    risks: ["Si el vehículo tiene averías mecánicas graves, la descarbonización puede no ser suficiente", "No garantiza el resultado en vehículos con catalizador dañado"],
    faq: [
      { question: "¿Con cuánta antelación a la ITV debo hacer el tratamiento?", answer: "Recomendamos realizarlo 24–48 horas antes de la ITV. No más de 1 semana antes para asegurar que los efectos están en su punto óptimo." },
      { question: "¿Funciona para todos los tipos de vehículo?", answer: "Sí, tanto para gasolina (CO, HC) como para diésel (opacidad). Los resultados varían según el estado previo del motor." },
    ],
    relatedBlog: [
      { title: "¿Funciona la descarbonización para la ITV?", href: "/blog/descarbonizacion-antes-itv-funciona" },
      { title: "Normativa ITV 2024 en España", href: "/blog/normativa-itv-emisiones-2024-espana" },
    ],
    relatedServices: [
      { title: "Servicio para particulares", href: "/servicios/particulares" },
      { title: "Contactar para presupuesto ITV", href: "/contacto" },
    ],
  },
  "aditivos-motor": {
    title: "Aditivos para motor y combustible",
    subtitle: "Aditivos profesionales para mejorar la combustión, proteger el sistema de inyección y extender la vida del DPF/FAP.",
    badge: "Aditivos",
    causes: ["Degradación de la calidad del combustible en uso diario", "Hollín acumulado sin tratamiento preventivo", "Sistema de inyección con depósitos de barniz"],
    symptoms: ["Inyectores que pierden pulverización", "DPF que requiere regeneraciones frecuentes", "Consumo ligeramente superior al habitual sin causa aparente"],
    process: [
      { step: 1, title: "Selección del aditivo", desc: "Elegir el aditivo adecuado según el problema: combustible, EGR, DPF/FAP o inyectores." },
      { step: 2, title: "Aplicación", desc: "Se añade al depósito de combustible o en el circuito de admisión según el tipo de aditivo." },
      { step: 3, title: "Ciclo de trabajo", desc: "El vehículo circula normalmente. El aditivo actúa durante el proceso normal de combustión." },
      { step: 4, title: "Seguimiento", desc: "Aplicación periódica según las recomendaciones del fabricante para mantenimiento continuo." },
    ],
    benefits: ["Coste bajo por intervención", "Sin necesidad de taller", "Complemento ideal a la descarbonización profesional", "Extiende los intervalos entre descarbonizaciones"],
    price: "Desde 18 € hasta 60 €",
    priceVariables: ["Tipo de aditivo", "Formato (particular/taller)", "Número de vehículos a tratar"],
    risks: ["No sustituyen una descarbonización profesional en casos avanzados", "Usar siempre la dosis recomendada para evitar efectos adversos"],
    faq: [
      { question: "¿Puedo usar varios aditivos a la vez?", answer: "Depende de los aditivos. Los de combustible y los de DPF suelen ser compatibles. Consulta siempre las fichas técnicas o contacta con nosotros." },
    ],
    relatedBlog: [
      { title: "Carbon FAP: análisis técnico", href: "/blog/carbon-fap-aditivo-dpf-review" },
    ],
    relatedServices: [
      { title: "Ver aditivos en la tienda", href: "/tienda/aditivos" },
    ],
  },
};

export default function SolucionDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const sol = data[slug ?? ""];

  if (!sol) {
    return (
      <main>
        <PageHero title="Solución no encontrada" subtitle="" breadcrumbs={[{ label: "Soluciones", href: "/soluciones" }, { label: "No encontrada" }]} />
        <div className="py-16 text-center"><Link to="/soluciones" className="btn-primary">← Ver todas las soluciones</Link></div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title={sol.title}
        subtitle={sol.subtitle}
        breadcrumbs={[{ label: "Soluciones", href: "/soluciones" }, { label: sol.title }]}
        badge={sol.badge}
      />

      {/* HERO IMAGE */}
      <section className="overflow-hidden">
        <AnimatedSection>
          <img
            src={heroImages[slug ?? ""] || serviceHero}
            alt={`${sol.title} - servicio profesional`}
            className="w-full h-48 md:h-64 lg:h-72 object-cover"
            loading="lazy"
          />
        </AnimatedSection>
      </section>

      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-eco p-6">
              <h2 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--foreground))" }}>¿Por qué ocurre?</h2>
              <ul className="space-y-2">
                {sol.causes.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-eco p-6">
              <h2 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--foreground))" }}>Síntomas habituales</h2>
              <ul className="space-y-2">
                {sol.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{s}
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
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "hsl(var(--foreground))" }}>¿Cómo se resuelve?</h2>
          <div className="space-y-5">
            {sol.process.map((p) => (
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

      {/* BENEFICIOS + PRECIO */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-xl mb-4" style={{ color: "hsl(var(--foreground))" }}>Resultados esperados</h2>
              <ul className="space-y-2">
                {sol.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-eco p-6">
              <h2 className="font-bold text-xl mb-3" style={{ color: "hsl(var(--foreground))" }}>Precio orientativo</h2>
              <div className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--primary))" }}>{sol.price}</div>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>El precio final depende de:</p>
              <ul className="space-y-1 mb-4">
                {sol.priceVariables.map((v) => (
                  <li key={v} className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span style={{ color: "hsl(var(--primary))" }}>·</span>{v}
                  </li>
                ))}
              </ul>
              <Link to="/contacto" className="btn-primary text-sm w-full justify-center">Solicitar presupuesto <ArrowRight size={12} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRECAUCIONES */}
      <section className="py-10 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-xl border p-5 flex items-start gap-3" style={{ background: "hsl(45 90% 50% / 0.08)", borderColor: "hsl(45 90% 50% / 0.25)" }}>
            <AlertTriangle size={16} style={{ color: "hsl(45 80% 40%)", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "hsl(45 60% 30%)" }}>Precauciones importantes</p>
              <ul className="space-y-1">
                {sol.risks.map((r) => (
                  <li key={r} className="text-sm" style={{ color: "hsl(45 50% 25%)" }}>· {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENLACES */}
      <section className="py-10 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sol.relatedBlog.length > 0 && (
              <div>
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Artículos relacionados</h3>
                <ul className="space-y-2">
                  {sol.relatedBlog.map((b) => (
                    <li key={b.href}><Link to={b.href} className="text-sm flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}><ArrowRight size={11} />{b.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            {sol.relatedServices.length > 0 && (
              <div>
                <h3 className="font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>Servicios relacionados</h3>
                <ul className="space-y-2">
                  {sol.relatedServices.map((s) => (
                    <li key={s.href}><Link to={s.href} className="text-sm flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}><ArrowRight size={11} />{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <FAQSection items={sol.faq} />
      <CTABox title="¿Listo para resolver el problema?" description="Contacta con nuestro equipo y solicita presupuesto para tu vehículo." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Ver servicios" secondaryHref="/servicios" />
    </main>
  );
}
