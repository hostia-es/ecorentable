import { useParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, ArrowRight, Euro, ShieldCheck, Clock, Award, Phone } from "lucide-react";
import CTABox from "@/components/common/CTABox";
import FAQSection from "@/components/common/FAQSection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import QuoteForm from "@/components/common/QuoteForm";
import Seo from "@/components/common/Seo";
import { AnimatedSection } from "@/components/common/Animations";
import { extraServicios } from "@/data/extraServices";
import serviceHero from "@/assets/service-decarbonization-hero.jpg";
import obd2Diagnostics from "@/assets/obd2-diagnostics.jpg";
import mechanicWorkshop from "@/assets/mechanic-workshop-service.jpg";
import engineDiagnostics from "@/assets/engine-diagnostics.jpg";
import maquinaDescarbonizadora from "@/assets/maquina-descarbonizadora.jpg";
import carbonFapMachine from "@/assets/carbon-fap-machine.png";

const heroImages: Record<string, string> = {
  descarbonizacion: serviceHero,
  particulares: mechanicWorkshop,
  talleres: engineDiagnostics,
  flotas: maquinaDescarbonizadora,
  "limpieza-filtros": carbonFapMachine,
};

const processImages: Record<string, string> = {
  descarbonizacion: obd2Diagnostics,
  particulares: serviceHero,
  talleres: mechanicWorkshop,
  flotas: engineDiagnostics,
  "limpieza-filtros": maquinaDescarbonizadora,
};

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
    priceRange: "Consultar precio",
    priceNote: "El precio depende de la cilindrada del vehículo, el modelo de máquina y los servicios adicionales. Solicita presupuesto sin compromiso.",
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
    relatedLinks: [{ label: "Solución: Descarbonización motor diésel", href: "/soluciones/descarbonizacion-motor-diesel" }, { label: "Artículo: ¿Qué es la descarbonización?", href: "/blog/que-es-descarbonizacion-motor" }, { label: "Gama H2 Profit", href: "/tienda/descarbonizadoras" }],
  },
  particulares: {
    title: "Servicio para Particulares",
    subtitle: "Descarbonización, limpieza DPF y EGR para tu vehículo personal. Precio justo, sin sorpresas, con garantía de resultado.",
    badge: "Para conductores",
    definition: "El servicio para particulares de Ecología Rentable incluye la descarbonización completa del motor, la limpieza del filtro de partículas y el tratamiento de la válvula EGR adaptado al vehículo de uso personal. Ideal antes de la ITV, tras síntomas de pérdida de potencia o como mantenimiento preventivo.",
    symptoms: ["Testigo de motor o DPF en el cuadro", "Tu vehículo ha suspendido la ITV por emisiones", "Notas pérdida de potencia o mayor consumo", "Llevas más de 40.000 km sin mantenimiento del motor"],
    benefits: ["Vehículo más eficiente y limpio", "Superar la ITV con margen", "Evitar averías costosas (sustitución DPF: 400–1.500 €)", "Conducción más suave y placentera"],
    priceRange: "90 €",
    priceNote: "Precio del servicio de descarbonización para vehículos particulares. Para flotas, empresas o servicios adicionales, solicita cotización personalizada.",
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
    definition: "El servicio para talleres de Ecología Rentable permite a cualquier mecánico ofrecer descarbonización profesional a sus clientes, ya sea mediante la adquisición o alquiler de una descarbonizadora H2 Profit, o como centro de derivación de nuestro directorio.",
    symptoms: ["Quieres diversificar los servicios de tu taller", "Tus clientes te preguntan por descarbonización y DPF", "Buscas un servicio de alto margen con baja inversión", "Quieres recibir leads cualificados de tu zona"],
    benefits: ["Margen por servicio entre 50 y 150 €", "ROI de la máquina en 3–6 meses", "Leads de clientes de tu zona geográfica", "Formación técnica incluida", "Soporte técnico y comercial continuo"],
    priceRange: "Consultar precio",
    priceNote: "Disponible en compra o alquiler. Solicita propuesta personalizada para tu taller.",
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
    relatedLinks: [{ label: "Programa de socios", href: "/socios" }, { label: "Hazte socio", href: "/socios/hazte-socio" }, { label: "Ver máquinas", href: "/tienda/descarbonizadoras" }],
  },
  flotas: {
    title: "Servicios para Flotas",
    subtitle: "Mantenimiento preventivo y correctivo para flotas de vehículos diésel. Reducción de costes, menos averías, cumplimiento medioambiental.",
    badge: "Flotas",
    definition: "El servicio de descarbonización para flotas de Ecología Rentable está diseñado para empresas con más de 5 vehículos que buscan reducir los costes de mantenimiento, extender la vida útil de sus vehículos y cumplir con la normativa de emisiones.",
    symptoms: ["Costes de reparación DPF repetitivos en tu flota", "Vehículos que suspenden la ITV por emisiones", "Consumo de combustible elevado respecto al estándar de cada modelo", "Alta rotación de componentes (EGR, catalizador, DPF)"],
    benefits: ["Reducción de costes de mantenimiento hasta 35%", "Extensión de vida del DPF hasta 2–3 veces", "Reducción de consumo en toda la flota", "Cumplimiento normativa de emisiones", "Informes de mantenimiento por vehículo"],
    priceRange: "Consultar precio",
    priceNote: "Precio por servicio según tamaño de flota. Se aplican descuentos por volumen. Solicita presupuesto personalizado.",
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
    priceRange: "100 €",
    priceNote: "Precio del servicio de limpieza de filtro de partículas DPF/FAP. Para operaciones por volumen o necesidades profesionales, solicita cotización con precio preferente.",
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
    relatedLinks: [{ label: "Solución: Limpieza DPF/FAP", href: "/soluciones/limpieza-filtro-particulas" }, { label: "Máquina Carbon FAP", href: "/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" }, { label: "Blog: 7 síntomas DPF obstruido", href: "/blog/sintomas-filtro-particulas-obstruido" }],
  },
  "alquiler-renting-maquinas-descarbonizadoras": {
    title: "Alquiler y renting de máquinas descarbonizadoras",
    subtitle: "Incorpora la descarbonización a tu taller sin inversión inicial. Alquiler mensual o renting a largo plazo con soporte técnico incluido.",
    badge: "Alquiler / Renting",
    definition: "El servicio de alquiler y renting de máquinas descarbonizadoras de Ecología Rentable permite a talleres, empresas y gestores de flotas acceder a equipos profesionales H2 Profit sin necesidad de inversión en compra. Disponible en modalidad de alquiler mensual (sin permanencia) o renting a 12/24/36 meses con mantenimiento y soporte incluidos.",
    symptoms: [
      "Quieres ofrecer descarbonización pero no quieres invertir en compra",
      "Tienes demanda estacional y no quieres equipo fijo",
      "Buscas una cuota mensual predecible sin sorpresas",
      "Quieres probar el servicio antes de comprometerte con una compra",
    ],
    benefits: [
      "Sin inversión inicial: empieza desde el primer mes",
      "Mantenimiento técnico incluido en la cuota",
      "Equipo siempre actualizado a la última versión",
      "Cancelación flexible en modalidad alquiler mensual",
      "Soporte técnico prioritario incluido",
    ],
    priceRange: "Consultar precio",
    priceNote: "La cuota depende del modelo de máquina, la modalidad (alquiler/renting) y el plazo. Solicita propuesta personalizada sin compromiso.",
    process: [
      { step: 1, title: "Solicita información", desc: "Rellena el formulario indicando tu tipo de negocio y volumen estimado de servicios." },
      { step: 2, title: "Propuesta personalizada", desc: "Te enviamos una propuesta con el modelo más adecuado, la cuota y las condiciones." },
      { step: 3, title: "Firma y entrega", desc: "Firmamos el acuerdo y entregamos la máquina con instalación y formación incluidas." },
      { step: 4, title: "Empieza a facturar", desc: "Tu taller puede ofrecer el servicio desde el día 1 con soporte técnico continuo." },
    ],
    target: [
      "Talleres mecánicos que inician en descarbonización",
      "Talleres con demanda estacional de descarbonización",
      "Empresas que prefieren gasto operativo vs. inversión de capital",
      "Gestores de flotas con necesidad de equipamiento temporal",
    ],
    faq: [
      { question: "¿Qué modelos están disponibles en alquiler?", answer: "Disponemos de la gama H2 Profit 1000, 2000S y 3000S EGR PILOT. El modelo recomendado depende del volumen de servicios estimado y el tipo de vehículos." },
      { question: "¿Cuál es la diferencia entre alquiler y renting?", answer: "El alquiler mensual ofrece mayor flexibilidad y se puede cancelar con preaviso. El renting a plazo fijo (12–36 meses) tiene una cuota menor y normalmente incluye más servicios (mantenimiento preventivo, seguro, actualizaciones)." },
      { question: "¿Qué pasa si la máquina se avería?", answer: "El mantenimiento y la asistencia técnica están incluidos. En caso de avería, sustituimos el equipo en un plazo máximo de 48–72 horas laborables." },
    ],
    relatedLinks: [
      { label: "Ver máquinas descarbonizadoras en venta", href: "/tienda/descarbonizadoras-nuevas" },
      { label: "Hazte socio de Ecología Rentable", href: "/socios/hazte-socio" },
      { label: "Contactar para solicitar propuesta", href: "/contacto" },
    ],
  },
  "alquiler-renting-opacimetros": {
    title: "Alquiler y renting de opacímetros",
    subtitle: "Equipos de medición de opacidad para talleres y empresas. Alquiler mensual o renting con calibración y soporte incluidos.",
    badge: "Alquiler / Renting",
    definition: "El servicio de alquiler y renting de opacímetros de Ecología Rentable permite a talleres y empresas acceder a equipos homologados de medición de opacidad sin inversión en compra. Ideal para talleres que realizan inspecciones previas a la ITV, centros de diagnóstico y flotas que necesitan control de emisiones diésel.",
    symptoms: [
      "Necesitas medir opacidad pero no tienes equipo propio",
      "Tu opacímetro actual está descalibrado o fuera de servicio",
      "Tienes necesidad puntual o estacional de medición de opacidad",
      "Buscas un equipo homologado sin asumir el coste de compra",
    ],
    benefits: [
      "Equipo homologado y calibrado incluido",
      "Sin coste de calibración periódica",
      "Formación de uso incluida",
      "Soporte técnico ante dudas de operación",
      "Actualización de software incluida en renting",
    ],
    priceRange: "Consultar precio",
    priceNote: "Cuota según modelo, modalidad y plazo. Solicita presupuesto personalizado.",
    process: [
      { step: 1, title: "Solicita tu opacímetro", desc: "Indica tu tipo de negocio y el uso que necesitas (ITV, diagnóstico, control de flota)." },
      { step: 2, title: "Propuesta y modelo", desc: "Te recomendamos el opacímetro más adecuado con cuota y condiciones detalladas." },
      { step: 3, title: "Entrega y formación", desc: "Entregamos el equipo calibrado con formación básica de uso." },
      { step: 4, title: "Soporte continuo", desc: "Atención técnica incluida durante toda la vigencia del contrato." },
    ],
    target: [
      "Talleres mecánicos que realizan preparación de ITV",
      "Centros de diagnóstico y peritación",
      "Flotas de empresa con control de emisiones interno",
      "Inspecciones técnicas independientes",
    ],
    faq: [
      { question: "¿El opacímetro viene calibrado?", answer: "Sí. Todos los equipos se entregan con certificado de calibración vigente. La recalibración periódica corre a cargo de Ecología Rentable." },
      { question: "¿Está homologado para uso en ITV?", answer: "Los modelos disponibles están homologados conforme a la normativa española vigente. Consulta con nuestro equipo si necesitas un modelo específico para tu tipo de actividad." },
      { question: "¿Puedo comprar el equipo si quedo satisfecho?", answer: "Sí. Al finalizar el período de renting puedes ejercer la opción de compra por el valor residual pactado." },
    ],
    relatedLinks: [
      { label: "Ver opacímetros en venta", href: "/tienda/opacimetros" },
      { label: "Ver analizadores de gases", href: "/servicios/alquiler-renting-analizadores-de-gases" },
      { label: "Contactar para solicitar propuesta", href: "/contacto" },
    ],
  },
  "alquiler-renting-analizadores-de-gases": {
    title: "Alquiler y renting de analizadores de gases",
    subtitle: "Equipos profesionales de análisis de gases de escape para talleres, flotas y empresas. Homologados, calibrados y listos para usar.",
    badge: "Alquiler / Renting",
    definition: "El servicio de alquiler y renting de analizadores de gases de Ecología Rentable da acceso a equipos profesionales de diagnóstico de emisiones sin inversión en compra. Disponible para talleres que quieren ampliar su capacidad de diagnóstico, empresas con control de flota y centros que realizan verificaciones de emisiones previas a ITV.",
    symptoms: [
      "Necesitas analizar gases de escape pero no tienes analizador propio",
      "Tu analizador actual no cumple la normativa vigente",
      "Quieres ofrecer diagnóstico de emisiones sin inversión inicial",
      "Tienes necesidad temporal o estacional de análisis de gases",
    ],
    benefits: [
      "Equipo homologado y calibrado incluido",
      "Diagnóstico de CO, CO₂, HC, O₂ y lambda",
      "Compatible con vehículos gasolina y diésel",
      "Sin coste de calibración ni mantenimiento del equipo",
      "Formación de uso incluida",
    ],
    priceRange: "Consultar precio",
    priceNote: "Cuota según modelo, modalidad (alquiler/renting) y plazo. Solicita presupuesto sin compromiso.",
    process: [
      { step: 1, title: "Solicita información", desc: "Indica tu tipo de negocio, el uso que necesitas y el volumen estimado de análisis." },
      { step: 2, title: "Modelo y propuesta", desc: "Te recomendamos el analizador más adecuado y te enviamos propuesta con cuota y condiciones." },
      { step: 3, title: "Entrega y puesta en marcha", desc: "Entregamos el equipo calibrado con formación básica incluida." },
      { step: 4, title: "Soporte técnico", desc: "Asistencia técnica durante toda la vigencia del contrato." },
    ],
    target: [
      "Talleres mecánicos generalistas y especializados",
      "Centros de diagnóstico y preparación ITV",
      "Flotas de empresa con control de emisiones",
      "Escuelas de conducción y centros de formación técnica",
    ],
    faq: [
      { question: "¿Qué gases analiza el equipo?", answer: "Los analizadores disponibles miden CO, CO₂, HC, O₂ y lambda (coeficiente de exceso de aire). Algunos modelos también incluyen NOx. Consulta disponibilidad según modelo." },
      { question: "¿Es válido para la verificación ITV?", answer: "Los modelos disponibles están homologados conforme a la normativa española. Consulta con nuestro equipo si necesitas un modelo específico para emisiones ITV oficiales." },
      { question: "¿Puedo combinar el alquiler con una máquina descarbonizadora?", answer: "Sí. Ofrecemos paquetes combinados de analizador + máquina descarbonizadora con condiciones especiales. Solicita propuesta de pack." },
    ],
    relatedLinks: [
      { label: "Ver analizadores de gases en venta", href: "/tienda/analizadores-de-gases" },
      { label: "Ver opacímetros en alquiler", href: "/servicios/alquiler-renting-opacimetros" },
      { label: "Contactar para solicitar propuesta", href: "/contacto" },
    ],
  },
  "descarbonizacion-para-flotas-de-renting": {
    title: "Descarbonización para flotas de renting",
    subtitle: "Servicio especializado para empresas de renting de coches y gestores de flotas. Reducción de incidencias, control de emisiones y mantenimiento preventivo planificado.",
    badge: "Flotas de renting",
    definition: "El servicio de descarbonización para flotas de renting de Ecología Rentable está diseñado para empresas de renting de coches, gestores de flotas de turismos y responsables de mantenimiento de parques móviles en operación recurrente. A diferencia de flotas pesadas o empresas generales, este servicio entiende las particularidades del renting: alta rotación de unidades, uso intensivo, necesidad de continuidad operativa y exigencia en imagen y estado anticontaminación.",
    symptoms: [
      "Vehículos de renting con testigo de motor o DPF encendido al ser devueltos",
      "Incidencias anticontaminación que afectan a la operatividad del parque móvil",
      "Problemas recurrentes de emisiones en la ITV de vehículos de renting",
      "Consumo elevado o pérdida de rendimiento en coches con alta rotación",
      "Necesidad de planificar mantenimiento preventivo para varias unidades a la vez",
    ],
    benefits: [
      "Reducción de incidencias anticontaminación en el parque móvil",
      "Mantenimiento planificado por lote de vehículos",
      "Mejor estado operativo y de emisiones en cada rotación",
      "Soporte técnico especializado para gestores de flota",
      "Propuesta comercial adaptada al volumen y ciclo de rotación",
    ],
    priceRange: "Consultar precio",
    priceNote: "Precio según tamaño de flota, volumen de intervenciones y ciclo de rotación. Se aplican condiciones preferentes por volumen. Solicita propuesta personalizada.",
    process: [
      { step: 1, title: "Evaluación del parque móvil", desc: "Análisis del tipo de vehículos, volumen, estado actual y ciclo de rotación de la flota de renting." },
      { step: 2, title: "Propuesta por lote", desc: "Propuesta comercial adaptada al volumen con planificación de intervenciones por lote o ciclo." },
      { step: 3, title: "Ejecución planificada", desc: "Servicios de descarbonización programados con mínima interferencia en la operativa del renting." },
      { step: 4, title: "Seguimiento operativo", desc: "Reporting de estado por unidad y seguimiento del impacto en emisiones, incidencias e ITV." },
    ],
    target: [
      "Empresas de renting de coches y vehículos ligeros",
      "Gestores de flotas de renting con parque de turismos",
      "Responsables de mantenimiento de parques móviles en operación recurrente",
      "Operadores con alta rotación de unidades y exigencia en estado anticontaminación",
    ],
    faq: [
      { question: "¿En qué se diferencia este servicio del de flotas generales?", answer: "El servicio para flotas de renting está adaptado a la dinámica de alta rotación, uso intensivo por conductor y la necesidad de mantener el parque operativo con mínimas paradas. Planificamos las intervenciones en base al ciclo de rotación del renting, no solo por kilómetros." },
      { question: "¿Se puede planificar el servicio para varias unidades a la vez?", answer: "Sí. Trabajamos con propuestas por lote adaptadas al volumen de la flota. Para flotas grandes, podemos organizar jornadas de servicio en las instalaciones del cliente." },
      { question: "¿Qué tipo de vehículos cubre este servicio?", answer: "Principalmente turismos y vehículos ligeros diésel y gasolina Euro 4–6, que son los más habituales en flotas de renting. Para vehículos pesados, consulta el servicio de flotas de camiones." },
      { question: "¿Qué información necesito para solicitar una propuesta?", answer: "Número aproximado de vehículos, tipos de motor predominantes, ciclo de rotación habitual y ubicación de las instalaciones o centros de referencia." },
    ],
    relatedLinks: [
      { label: "Descarbonización para flotas", href: "/servicios/flotas" },
      { label: "Contactar para solicitar propuesta", href: "/contacto" },
      { label: "Hazte socio de Ecología Rentable", href: "/socios/hazte-socio" },
    ],
  },
};

const allServicios: Record<string, ServicioData> = { ...servicios, ...extraServicios };

export default function ServicioDetalle() {
  const { servicio } = useParams<{ servicio: string }>();
  const s = allServicios[servicio ?? ""];

  if (!s) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Servicio no encontrado</h1>
        <Link to="/servicios" className="btn-primary">← Ver todos los servicios</Link>
      </main>
    );
  }

  const heroImg = `/generated/services/${servicio}.jpg`;
  const procImg = processImages[servicio ?? ""] || obd2Diagnostics;
  const top3Benefits = s.benefits.slice(0, 3);
  const isAlquiler = (servicio || "").startsWith("alquiler");
  const intent = isAlquiler ? "alquiler" : "presupuesto";
  const ctaHref = `/contacto?intent=${intent}&item=${servicio || ""}`;
  const defaultMsg = `Hola, me interesa "${s.title}". `;

  return (
    <main>
      <Seo
        title={s.title}
        description={s.subtitle}
        path={`/servicios/${servicio}`}
        image={`https://ecorentable.lovable.app${heroImg}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.subtitle,
          provider: { "@type": "Organization", name: "Ecología Rentable" },
          areaServed: "ES",
        }}
      />
      {/* HERO LP — texto + formulario */}
      <section className="relative bg-gradient-to-b from-secondary to-background border-b border-border">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Servicios", href: "/servicios" }, { label: s.title }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
            {/* IZQ — copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                {s.badge}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
                {s.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                {s.subtitle}
              </p>

              {top3Benefits.length > 0 && (
                <ul className="space-y-2.5 mb-7">
                  {top3Benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm md:text-[15px] text-foreground">
                      <CheckCircle size={16} className="shrink-0 mt-0.5 text-primary" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 mb-7">
                <Link to={ctaHref} className="btn-cta">
                  Solicitar presupuesto <ArrowRight size={14} />
                </Link>
                <a href="tel:+34605928626" className="btn-secondary inline-flex items-center gap-1.5">
                  <Phone size={14} /> +34 605 928 626
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  { icon: <Clock size={14} />, label: "Respuesta < 24 h" },
                  { icon: <ShieldCheck size={14} />, label: "Sin compromiso" },
                  { icon: <Award size={14} />, label: "Servicio certificado" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-white border border-border">
                    <span className="text-primary">{t.icon}</span>
                    <span className="text-[11px] font-semibold text-foreground leading-tight">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DER — formulario */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <QuoteForm
                context={servicio || "servicio"}
                title={isAlquiler ? "Consulta tu cuota mensual" : "Consulta tu precio sin compromiso"}
                subtitle="Te enviamos presupuesto a medida en menos de 24 h. Te atiende un asesor técnico real, no un bot."
                defaultMessage={defaultMsg}
                defaultTipo={isAlquiler || servicio?.includes("taller") || servicio?.includes("flota") ? "taller" : "particular"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMAGEN HERO */}
      <section className="overflow-hidden">
        <AnimatedSection>
          <img
            src={heroImg}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroImages[servicio ?? ""] || serviceHero; }}
            alt={`${s.title} - servicio profesional Ecología Rentable`}
            className="w-full h-56 md:h-72 lg:h-80 object-cover"
            loading="lazy"
          />
        </AnimatedSection>
      </section>

      {/* DEFINICIÓN */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="card-eco p-7 mb-10">
              <h2 className="font-bold text-xl mb-3 text-foreground">¿En qué consiste?</h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{s.definition}</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-4 text-foreground">¿Cuándo lo necesitas?</h2>
              <ul className="space-y-2.5">
                {s.symptoms.map((sym) => (
                  <li key={sym} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-primary" />{sym}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4 text-foreground">Resultados esperados</h2>
              <ul className="space-y-2.5">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="shrink-0 mt-0.5 text-primary" />{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-14 section-alt">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">Cómo funciona</h2>
            <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Un proceso transparente, paso a paso, sin sorpresas ni costes ocultos.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {s.process.map((p) => (
                <div key={p.step} className="card-eco p-5 flex gap-4 items-start">
                  <div className="step-number shrink-0 w-10 h-10 text-sm">{p.step}</div>
                  <div>
                    <h3 className="font-bold mb-1 text-foreground text-[15px]">{p.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <AnimatedSection delay={0.2}>
              <img
                src={procImg}
                alt={`Proceso de ${s.title}`}
                className="rounded-2xl w-full shadow-xl object-cover h-64 lg:h-80"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PRECIO + TARGET */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-eco p-6">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-foreground">
                <Euro size={16} className="text-primary" />Inversión orientativa
              </h2>
              <div className="text-2xl font-bold mb-2 text-primary">{s.priceRange}</div>
              <p className="text-xs mb-4 text-muted-foreground leading-relaxed">{s.priceNote}</p>
              <Link to={ctaHref} className="btn-cta text-sm w-full justify-center">
                Solicitar presupuesto <ArrowRight size={12} />
              </Link>
            </div>
            <div className="card-eco p-6">
              <h2 className="font-bold mb-3 text-foreground">¿Para quién es?</h2>
              <ul className="space-y-2">
                {s.target.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={13} className="shrink-0 mt-0.5 text-primary" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEGUNDO FORMULARIO — PERSUASIVO */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                Presupuesto a medida
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">
                ¿Listo para conocer tu precio exacto?
              </h2>
              <p className="text-[15px] text-muted-foreground mb-5 leading-relaxed">
                Cuéntanos lo justo. Un técnico te contesta con propuesta clara, sin letra pequeña y sin presión comercial. La consulta es gratuita y solo te llevará un minuto.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Asesoramiento técnico personalizado, no un correo automático.",
                  "Comparativa de modalidades (servicio puntual, alquiler, renting).",
                  "Sin compromiso, sin coste y sin compartir tus datos con terceros.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <QuoteForm
              context={`${servicio}-cta`}
              title="Consulta tu precio en 24 h"
              subtitle="Rápido, claro y sin compromiso. Te responde un asesor humano."
              defaultMessage={defaultMsg}
              defaultTipo={isAlquiler || servicio?.includes("taller") || servicio?.includes("flota") ? "taller" : "particular"}
              compact
            />
          </div>
        </div>
      </section>

      {/* ENLACES */}
      <section className="py-12 section-alt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-bold mb-4 text-foreground">Recursos relacionados</h2>
          <div className="flex flex-wrap gap-3">
            {s.relatedLinks.map((l) => (
              <Link key={l.href} to={l.href} className="badge-steel text-sm px-4 py-2 hover:border-primary transition-colors flex items-center gap-1">
                <ArrowRight size={11} className="text-primary" />{l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={s.faq} />
      <CTABox
        title="¿Listo para empezar?"
        description="Habla con un asesor técnico real y recibe propuesta clara en menos de 24 h."
        primaryLabel="Solicitar presupuesto"
        primaryHref={ctaHref}
        secondaryLabel="Ver todos los servicios"
        secondaryHref="/servicios"
      />
    </main>
  );
}
