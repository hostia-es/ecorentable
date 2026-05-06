// Contenido extenso de soluciones añadidas al Navbar.
// Comparte el shape `SolucionData` definido en src/pages/SolucionDetalle.tsx.

export interface SolucionData {
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

export const extraSoluciones: Record<string, SolucionData> = {
  "gases-altos-itv-diesel": {
    title: "Gases altos en ITV diésel",
    subtitle: "Tu vehículo diésel ha suspendido la ITV por exceso de opacidad. Solución profesional que reduce los valores por debajo del umbral legal en una sola sesión.",
    badge: "ITV diésel",
    causes: [
      "Acumulación de hollín en el sistema de admisión y EGR",
      "Filtro de partículas (DPF) parcialmente obstruido",
      "Inyectores con pulverización degradada",
      "Aceite de motor degradado o con dilución por gasoil",
      "Turbo con fugas internas que aumentan la opacidad",
    ],
    symptoms: [
      "Suspendido en ITV por opacidad superior al límite legal",
      "Humo negro visible al acelerar",
      "Pérdida de potencia y respuesta deficiente",
      "Consumo elevado de combustible",
      "Testigo de motor encendido (P0401, P2002, P0299…)",
    ],
    process: [
      { step: 1, title: "Medición previa con opacímetro", desc: "El centro mide la opacidad inicial del vehículo para cuantificar la reducción necesaria." },
      { step: 2, title: "Diagnóstico OBD2", desc: "Verificación de códigos de avería, presión diferencial del DPF, EGR y parámetros de inyección." },
      { step: 3, title: "Descarbonización HHO + EGR", desc: "Ciclo HHO completo con limpieza de la válvula EGR por admisión." },
      { step: 4, title: "Tratamiento DPF si procede", desc: "Aplicación de Carbon FAP a 6 bar o regeneración forzada del DPF." },
      { step: 5, title: "Verificación post-servicio", desc: "Nueva medición con opacímetro para confirmar que los valores están dentro del límite ITV." },
    ],
    benefits: [
      "Reducción de opacidad de hasta el 70%",
      "Probabilidad muy alta de superar la ITV en el primer reintento",
      "Garantía de resultado o repetición gratuita en muchos centros",
      "Servicio rápido (1–3 horas)",
      "Mejora colateral del consumo y de la potencia",
    ],
    price: "Consultar precio",
    priceVariables: ["Valores iniciales de opacidad", "Estado del DPF", "Cilindrada y antigüedad del vehículo", "Servicios complementarios necesarios"],
    risks: [
      "Si hay daños mecánicos graves (turbo, juntas), la descarbonización puede no ser suficiente",
      "Catalizador o DPF con daños internos pueden requerir sustitución",
    ],
    faq: [
      { question: "¿Cuánto tarda la solución?", answer: "Entre 1 y 3 horas según el grado de obstrucción del DPF y los servicios complementarios necesarios." },
      { question: "¿Con qué antelación a la ITV debo hacerlo?", answer: "Idealmente 24–48 horas antes de la ITV, no más de una semana, para asegurar el máximo efecto." },
      { question: "¿Hay garantía de pasar la ITV?", answer: "La mayoría de centros asociados ofrece garantía de mejora de opacidad con repetición gratuita si el vehículo no presenta averías mecánicas previas." },
      { question: "¿Funciona en todos los diésel?", answer: "Sí, en motores diésel Euro 3 a Euro 6d. Para vehículos industriales, consulta el servicio para flotas." },
    ],
    relatedBlog: [
      { title: "¿Funciona la descarbonización para la ITV?", href: "/blog/descarbonizacion-antes-itv-funciona" },
      { title: "Normativa ITV emisiones 2024 en España", href: "/blog/normativa-itv-emisiones-2024-espana" },
    ],
    relatedServices: [
      { title: "Servicio de descarbonización", href: "/servicios/descarbonizacion-motor" },
      { title: "Limpieza de filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
      { title: "Encuentra tu centro", href: "/encuentra-tu-centro" },
    ],
  },

  "gases-altos-itv-gasolina": {
    title: "Gases altos en ITV gasolina",
    subtitle: "Tu vehículo gasolina ha suspendido la ITV por exceso de CO o HC. Solución profesional para reducir los valores y superar la inspección con margen.",
    badge: "ITV gasolina",
    causes: [
      "Catalizador parcialmente obstruido o envejecido",
      "Sonda lambda degradada que altera la mezcla",
      "Inyectores con pulverización deficiente",
      "Carbono acumulado en válvulas y cámara",
      "Mantenimiento espaciado del sistema anticontaminación",
    ],
    symptoms: [
      "Suspendido en ITV por CO o HC superior al límite",
      "Olor a gasolina sin quemar en el escape",
      "Ralentí inestable",
      "Consumo elevado",
      "Testigo de motor encendido (P0420, P0171, P0172…)",
    ],
    process: [
      { step: 1, title: "Medición previa con analizador de gases", desc: "Lectura inicial de CO, CO₂, HC, O₂ y lambda para cuantificar la desviación." },
      { step: 2, title: "Diagnóstico OBD2", desc: "Lectura de códigos y parámetros de mezcla, lambda y combustión." },
      { step: 3, title: "Descarbonización HHO", desc: "Ciclo HHO específico para gasolina, incluyendo limpieza del colector y la cámara." },
      { step: 4, title: "Tratamiento del catalizador", desc: "Limpieza del catalizador con HHO y aditivos compatibles cuando procede." },
      { step: 5, title: "Verificación post-servicio", desc: "Nueva lectura con analizador de gases para confirmar que CO y HC están dentro de límites." },
    ],
    benefits: [
      "Reducción de CO de hasta el 60%",
      "Reducción de HC de hasta el 50%",
      "Recuperación de potencia y reducción de consumo",
      "Evita la sustitución del catalizador (300–800 €)",
      "Servicio rápido en menos de 2 horas",
    ],
    price: "Consultar precio",
    priceVariables: ["Valores iniciales de CO/HC", "Estado del catalizador", "Cilindrada y antigüedad", "Servicios adicionales"],
    risks: [
      "Catalizador con núcleo dañado puede requerir sustitución",
      "Sonda lambda en final de vida puede requerir reemplazo",
    ],
    faq: [
      { question: "¿Sirve para coches con catalizador?", answer: "Sí, el HHO es totalmente compatible con catalizador y sonda lambda. Es de hecho el método más recomendado para vehículos modernos." },
      { question: "¿Cuánto dura?", answer: "Entre 60 y 120 minutos para el ciclo completo, incluyendo verificación con analizador de gases." },
      { question: "¿Hay diferencia entre gasolina y diésel en el procedimiento?", answer: "El ciclo HHO se adapta a las características de cada combustible, especialmente en duración y verificación posterior. En gasolina nos fijamos en CO y HC; en diésel, en opacidad." },
    ],
    relatedBlog: [
      { title: "Normativa ITV emisiones 2024 en España", href: "/blog/normativa-itv-emisiones-2024-espana" },
    ],
    relatedServices: [
      { title: "Descarbonización de motor gasolina", href: "/soluciones/descarbonizacion-motor-gasolina" },
      { title: "Servicio de descarbonización", href: "/servicios/descarbonizacion-motor" },
    ],
  },

  "humo-negro-diesel": {
    title: "Humo negro en motores diésel",
    subtitle: "Si tu vehículo diésel emite humo negro al acelerar, es señal de combustión deficiente y exceso de hollín. Causas, solución y prevención profesional.",
    badge: "Humos diésel",
    causes: [
      "Carbono acumulado en colector, EGR y cámara de combustión",
      "DPF/FAP parcialmente obstruido",
      "Inyectores con caudal o pulverización degradada",
      "Turbo con fugas internas o presión inadecuada",
      "Filtro de aire muy sucio o saturado",
    ],
    symptoms: [
      "Humo negro denso al acelerar",
      "Pérdida de potencia en aceleraciones largas",
      "Olor fuerte a gasoil en el escape",
      "Consumo elevado",
      "Testigo de motor o DPF encendido",
    ],
    process: [
      { step: 1, title: "Diagnóstico OBD2", desc: "Lectura de códigos y verificación de presión diferencial DPF, EGR y caudal de inyectores." },
      { step: 2, title: "Verificación de admisión", desc: "Comprobación visual y de caudal del filtro de aire y conductos." },
      { step: 3, title: "Descarbonización HHO + EGR", desc: "Ciclo completo HHO con limpieza de la válvula EGR por admisión." },
      { step: 4, title: "Tratamiento DPF", desc: "Carbon FAP a 6 bar o regeneración forzada si la presión diferencial está alta." },
      { step: 5, title: "Verificación con opacímetro", desc: "Lectura comparativa antes/después para confirmar la reducción de opacidad." },
    ],
    benefits: [
      "Eliminación o reducción drástica del humo negro",
      "Recuperación de potencia y respuesta del acelerador",
      "Reducción de consumo (5–12%)",
      "Mejora del estado del DPF y EGR",
    ],
    price: "Consultar precio",
    priceVariables: ["Estado del DPF", "Estado de inyectores y turbo", "Servicios complementarios necesarios"],
    risks: [
      "Si los inyectores están en final de vida, puede requerirse calibración o sustitución",
      "Turbo con avería mecánica no se resuelve solo con descarbonización",
    ],
    faq: [
      { question: "¿El humo negro es siempre por carbono?", answer: "En la mayoría de casos sí. Pero si persiste tras la descarbonización, hay que verificar inyectores, turbo y filtro de aire." },
      { question: "¿Es peligroso seguir circulando con humo negro?", answer: "Indica combustión ineficiente y aumenta significativamente las emisiones contaminantes. Acelera el deterioro del DPF y EGR. Conviene resolverlo lo antes posible." },
    ],
    relatedBlog: [
      { title: "7 síntomas de filtro de partículas obstruido", href: "/blog/sintomas-filtro-particulas-obstruido" },
    ],
    relatedServices: [
      { title: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
      { title: "Limpieza de filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
    ],
  },

  "fallo-anticontaminacion": {
    title: "Fallo del sistema anticontaminación",
    subtitle: "Aviso de 'fallo del sistema anticontaminación' en el cuadro: causas más probables y solución profesional sin sustituir piezas innecesariamente.",
    badge: "Anticontaminación",
    causes: [
      "Válvula EGR sucia o bloqueada",
      "DPF/FAP obstruido",
      "Sonda lambda degradada",
      "Catalizador parcialmente obstruido",
      "Sensor de NOx o temperatura defectuoso (en algunos modelos)",
    ],
    symptoms: [
      "Mensaje 'Fallo sistema anticontaminación' en el cuadro",
      "Pérdida de potencia o limp mode",
      "Testigo de motor encendido",
      "Consumo elevado",
      "Humos visibles por el escape",
    ],
    process: [
      { step: 1, title: "Lectura OBD2 detallada", desc: "Identificación del componente que origina el aviso (EGR, DPF, lambda, catalizador, sensor)." },
      { step: 2, title: "Verificación física", desc: "Inspección de los componentes implicados (manguitos, conexiones, sensores)." },
      { step: 3, title: "Tratamiento HHO + EGR + DPF", desc: "Descarbonización completa con limpieza de EGR y, si procede, tratamiento DPF." },
      { step: 4, title: "Borrado de códigos y test", desc: "Borrado de códigos pendientes y prueba de circulación para verificar la desaparición del aviso." },
    ],
    benefits: [
      "Recuperación del modo normal de funcionamiento",
      "Evita la sustitución innecesaria de EGR, DPF o catalizador",
      "Reducción del consumo y mejora de potencia",
      "Servicio en 1–3 horas",
    ],
    price: "Consultar precio",
    priceVariables: ["Componente origen del aviso", "Servicios necesarios", "Cilindrada y antigüedad"],
    risks: [
      "Si la causa es un sensor electrónico defectuoso, puede requerirse sustitución",
      "Componentes con daño mecánico no se reparan solo con descarbonización",
    ],
    faq: [
      { question: "¿Por qué aparece este aviso?", answer: "Habitualmente porque uno de los componentes del sistema anticontaminación (EGR, DPF, sonda lambda, catalizador) está fuera de los parámetros normales por suciedad o degradación." },
      { question: "¿Puedo seguir circulando?", answer: "Sí, pero con potencia limitada. No se recomienda alargar mucho la situación porque acelera el deterioro de los componentes." },
    ],
    relatedBlog: [
      { title: "Válvula EGR: qué es y cómo limpiarla", href: "/blog/valvula-egr-que-es-como-limpiar" },
    ],
    relatedServices: [
      { title: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
      { title: "Limpieza EGR y catalizador", href: "/soluciones/limpieza-egr-catalizador" },
    ],
  },

  "filtro-particulas-obstruido": {
    title: "Filtro de partículas (DPF/FAP) obstruido",
    subtitle: "Síntomas, causas y solución profesional para un filtro de partículas obstruido. Recupéralo sin sustituirlo y ahorra entre 400 y 1.500 €.",
    badge: "DPF / FAP",
    causes: [
      "Trayectos urbanos cortos que impiden la regeneración pasiva",
      "Aditivo FAP agotado en sistemas Peugeot/Citroën",
      "Válvula EGR sucia que aumenta la carga de hollín",
      "Aceite degradado o contaminado por gasoil",
      "Inyectores con pulverización deficiente",
    ],
    symptoms: [
      "Testigo DPF/FAP encendido en el cuadro",
      "Pérdida de potencia notable",
      "Modo emergencia (limp mode)",
      "Regeneraciones muy frecuentes que no completan",
      "Olor a quemado durante la regeneración",
    ],
    process: [
      { step: 1, title: "Lectura de presión diferencial", desc: "Medición de la contrapresión del filtro para determinar el grado de obstrucción." },
      { step: 2, title: "Tratamiento Carbon FAP a 6 bar", desc: "Aplicación del aditivo Carbon FAP a presión controlada de 6 bar para disolver el hollín." },
      { step: 3, title: "Regeneración forzada por OBD", desc: "Ciclo de regeneración activa para quemar el hollín restante." },
      { step: 4, title: "Verificación final", desc: "Nueva lectura de presión diferencial y prueba de circulación. Eliminación del modo emergencia." },
    ],
    benefits: [
      "Recuperación del filtro sin sustitución",
      "Ahorro frente a un DPF nuevo (400–1.500 €)",
      "Eliminación del testigo y del modo emergencia",
      "Reducción de la opacidad medible",
    ],
    price: "Consultar precio",
    priceVariables: ["Grado de obstrucción", "Método elegido (admisión / Carbon FAP / ultrasonidos)", "Necesidad de aditivo FAP en sistemas PSA"],
    risks: [
      "Filtros con ≥95 % de obstrucción pueden requerir sustitución",
      "Si no se resuelve la causa raíz (EGR, aceite), volverá a obstruirse",
    ],
    faq: [
      { question: "¿Hasta qué grado de obstrucción se puede recuperar?", answer: "Hasta un 85–90 % de obstrucción, la limpieza profesional con Carbon FAP es muy efectiva. Por encima, puede requerirse limpieza por ultrasonidos en cubeta o sustitución." },
      { question: "¿Cuánto cuesta cambiar un DPF?", answer: "Entre 400 y 1.500 € según marca y modelo, sin contar mano de obra. La limpieza profesional es una alternativa mucho más económica y efectiva en la mayoría de casos." },
    ],
    relatedBlog: [
      { title: "7 síntomas de filtro de partículas obstruido", href: "/blog/sintomas-filtro-particulas-obstruido" },
      { title: "Carbon FAP: análisis técnico", href: "/blog/carbon-fap-aditivo-dpf-review" },
    ],
    relatedServices: [
      { title: "Limpieza de filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
      { title: "Comprar Carbon FAP", href: "/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" },
    ],
  },

  "limpiar-dpf-sin-desmontar": {
    title: "Limpiar DPF sin desmontar",
    subtitle: "Limpieza profesional del filtro de partículas sin desmontaje, mediante aditivo Carbon FAP a 6 bar y regeneración forzada. La opción más rápida y económica.",
    badge: "Sin desmontaje",
    causes: [
      "Acumulación de hollín por trayectos urbanos cortos",
      "Aditivo FAP agotado",
      "EGR con caudal degradado",
      "Inyectores con pulverización deficiente",
    ],
    symptoms: [
      "Testigo DPF encendido",
      "Pérdida de potencia",
      "Regeneraciones frecuentes",
      "Modo emergencia",
    ],
    process: [
      { step: 1, title: "Diagnóstico de presión diferencial", desc: "Lectura OBD del estado del filtro para confirmar que es viable la limpieza sin desmontaje." },
      { step: 2, title: "Aplicación de Carbon FAP a 6 bar", desc: "Inyección del producto a presión controlada de 6 bar a través del propio sistema, sin desmontar el filtro." },
      { step: 3, title: "Regeneración forzada", desc: "Ciclo de regeneración activa por OBD para quemar el hollín disuelto." },
      { step: 4, title: "Verificación", desc: "Nueva lectura de presión diferencial. Prueba de funcionamiento." },
    ],
    benefits: [
      "Servicio en 1–2 horas, sin desmontaje",
      "Coste muy inferior a un DPF nuevo (400–1.500 €)",
      "Sin riesgo de daños asociados al desmontaje",
      "Compatible con la mayoría de DPF/FAP del mercado",
    ],
    price: "Consultar precio",
    priceVariables: ["Grado de obstrucción", "Vehículo", "Necesidad de servicios complementarios"],
    risks: [
      "No es viable con ≥95 % de obstrucción: requeriría limpieza por ultrasonidos",
      "Si la causa raíz no se resuelve, el filtro volverá a obstruirse",
    ],
    faq: [
      { question: "¿Es realmente efectivo sin desmontar?", answer: "Sí, en obstrucciones moderadas (hasta 85–90 %) la combinación Carbon FAP + regeneración forzada es muy efectiva y se realiza sin necesidad de desmontaje." },
      { question: "¿Cuánto tarda?", answer: "Entre 1 y 2 horas para el procedimiento completo, incluyendo diagnóstico y verificación." },
    ],
    relatedBlog: [
      { title: "Carbon FAP: análisis técnico", href: "/blog/carbon-fap-aditivo-dpf-review" },
    ],
    relatedServices: [
      { title: "Limpieza de filtro de partículas", href: "/servicios/limpieza-filtro-de-particulas" },
      { title: "Comprar Carbon FAP", href: "/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" },
    ],
  },

  "fallo-egr": {
    title: "Fallo de la válvula EGR",
    subtitle: "Causas y solución profesional al fallo de la válvula EGR. Recupera su funcionamiento sin sustituirla y evita un coste de 300–600 €.",
    badge: "EGR",
    causes: [
      "Acumulación de hollín en el cuerpo y conductos de la EGR",
      "Actuador eléctrico de la EGR con desgaste",
      "Sensor de posición desviado",
      "Aceite contaminado que aumenta la formación de hollín",
    ],
    symptoms: [
      "Testigo de motor encendido (P0401, P0402, P0403…)",
      "Pérdida de potencia y tirones",
      "Humo negro al acelerar",
      "Consumo elevado",
      "Modo emergencia",
    ],
    process: [
      { step: 1, title: "Diagnóstico OBD2 EGR", desc: "Lectura del porcentaje de apertura real de la válvula y verificación del actuador." },
      { step: 2, title: "Limpieza por admisión", desc: "Aplicación de limpiador EGR profesional por la admisión con el motor en marcha." },
      { step: 3, title: "Ciclo HHO complementario", desc: "Ciclo de descarbonización HHO para eliminar hollín en conductos y colector." },
      { step: 4, title: "Verificación", desc: "Relectura de parámetros EGR y prueba de circulación para confirmar la mejora." },
    ],
    benefits: [
      "Recuperación del caudal de la válvula EGR",
      "Evita la sustitución (300–600 €)",
      "Reducción de NOx y HC en el escape",
      "Servicio en 1–2 horas",
    ],
    price: "Consultar precio",
    priceVariables: ["Grado de obstrucción", "Necesidad de desmontaje", "Modelo de vehículo"],
    risks: [
      "Válvula EGR con avería mecánica del actuador requiere sustitución",
      "Sensor de posición desviado puede requerir calibración o cambio",
    ],
    faq: [
      { question: "¿Se puede limpiar la EGR sin desmontarla?", answer: "En la mayoría de los casos, sí. La limpieza por admisión combinada con HHO permite recuperar la válvula sin desmontaje en el 70–80 % de los casos." },
      { question: "¿Cuánto dura el resultado?", answer: "Entre 30.000 y 50.000 km en condiciones normales, dependiendo del patrón de uso y del estado del aceite." },
    ],
    relatedBlog: [
      { title: "Válvula EGR: qué es y cómo limpiarla", href: "/blog/valvula-egr-que-es-como-limpiar" },
    ],
    relatedServices: [
      { title: "Limpieza EGR y catalizador", href: "/soluciones/limpieza-egr-catalizador" },
      { title: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
    ],
  },

  "catalizador-obstruido": {
    title: "Catalizador obstruido o contaminado",
    subtitle: "Síntomas, causas y solución profesional para un catalizador obstruido o contaminado. Recupera su rendimiento sin tener que sustituirlo.",
    badge: "Catalizador",
    causes: [
      "Mezcla rica prolongada (sonda lambda degradada)",
      "Pérdida de aceite o líquido refrigerante hacia el escape",
      "Combustible de mala calidad",
      "Carbono acumulado en el sustrato cerámico",
    ],
    symptoms: [
      "Pérdida de potencia notable",
      "Olor a azufre en el escape",
      "Sobrecalentamiento del catalizador (color rojizo en frío)",
      "Testigo de motor (P0420, P0430)",
      "Consumo elevado",
    ],
    process: [
      { step: 1, title: "Diagnóstico OBD2", desc: "Verificación de códigos y lectura comparativa de las dos sondas lambda (pre y post catalizador)." },
      { step: 2, title: "Descarbonización HHO", desc: "Ciclo HHO completo para limpiar el catalizador sin productos químicos." },
      { step: 3, title: "Limpieza con aditivo específico", desc: "Cuando procede, aplicación de aditivo limpiador del catalizador en el depósito." },
      { step: 4, title: "Verificación", desc: "Relectura de las sondas lambda y prueba de circulación." },
    ],
    benefits: [
      "Recuperación del rendimiento del catalizador",
      "Evita la sustitución (300–800 €)",
      "Reducción de CO y HC en el escape",
      "Servicio en 1–2 horas",
    ],
    price: "Consultar precio",
    priceVariables: ["Grado de contaminación", "Necesidad de aditivo", "Estado de las sondas lambda"],
    risks: [
      "Catalizador con núcleo cerámico fundido o roto requiere sustitución",
      "Si la causa raíz (sonda lambda, aceite) no se resuelve, volverá a contaminarse",
    ],
    faq: [
      { question: "¿Se puede recuperar un catalizador parcialmente fundido?", answer: "No. Si el sustrato cerámico está fundido o roto, la única solución es la sustitución. La descarbonización es eficaz cuando el catalizador está obstruido por carbono, no cuando hay daño mecánico." },
      { question: "¿Qué relación tiene la sonda lambda?", answer: "La sonda lambda regula la mezcla aire/combustible. Si está degradada, puede provocar mezcla rica que contamina el catalizador. Es importante diagnosticarla a la vez." },
    ],
    relatedBlog: [],
    relatedServices: [
      { title: "Limpieza EGR y catalizador", href: "/soluciones/limpieza-egr-catalizador" },
      { title: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
    ],
  },

  "perdida-potencia-coche-diesel": {
    title: "Pérdida de potencia en coche diésel",
    subtitle: "Si tu coche diésel ha perdido potencia, la causa más probable es la acumulación de carbono en el sistema. Diagnóstico y solución profesional.",
    badge: "Pérdida de potencia",
    causes: [
      "Acumulación de carbono en colector de admisión y EGR",
      "DPF parcialmente obstruido",
      "Turbo con varilla de geometría variable atascada",
      "Inyectores con pulverización degradada",
      "Filtro de aire muy sucio",
    ],
    symptoms: [
      "El coche tira menos en aceleraciones",
      "Tirones a régimen medio",
      "Modo emergencia ocasional",
      "Humo negro al acelerar",
      "Consumo elevado",
    ],
    process: [
      { step: 1, title: "Diagnóstico OBD2 completo", desc: "Lectura de códigos, presión de admisión, presión diferencial DPF y caudal EGR." },
      { step: 2, title: "Verificación física", desc: "Filtro de aire, conductos de admisión y turbo." },
      { step: 3, title: "Descarbonización HHO + EGR + DPF", desc: "Ciclo HHO completo con limpieza EGR y tratamiento DPF si procede." },
      { step: 4, title: "Verificación", desc: "Prueba de circulación con escáner para confirmar la recuperación de la potencia." },
    ],
    benefits: [
      "Recuperación de potencia entre el 8 % y el 18 %",
      "Mejor respuesta del acelerador",
      "Reducción de consumo (5–12 %)",
      "Evita reparaciones caras de DPF, EGR o turbo",
    ],
    price: "Consultar precio",
    priceVariables: ["Estado del DPF, EGR y turbo", "Servicios complementarios necesarios", "Cilindrada"],
    risks: [
      "Si el turbo tiene avería mecánica, requerirá reparación o sustitución",
      "Inyectores en final de vida pueden requerir calibración",
    ],
    faq: [
      { question: "¿La descarbonización resuelve siempre la pérdida de potencia?", answer: "Cuando la causa es la acumulación de carbono (lo más común), sí. Si hay avería mecánica del turbo, los inyectores o la inyección, requerirá actuación adicional." },
      { question: "¿Hay riesgo de empeorar el coche?", answer: "No, si el motor no tiene fugas activas de aceite ni daños mecánicos graves. La descarbonización HHO es un proceso seguro y reversible." },
    ],
    relatedBlog: [],
    relatedServices: [
      { title: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
      { title: "Solución: Filtro de partículas obstruido", href: "/soluciones/filtro-particulas-obstruido" },
    ],
  },

  "descarbonizacion-motor-gasolina": {
    title: "Descarbonización de motor gasolina",
    subtitle: "Servicio específico de descarbonización para motores gasolina, incluyendo motores TFSI/TSI con inyección directa, GDI y motores de turbo.",
    badge: "Gasolina",
    causes: [
      "Acumulación de carbono en válvulas de admisión (motores GDI/TFSI)",
      "Bobinas de encendido y bujías degradadas",
      "Inyectores con depósitos de barniz",
      "Catalizador parcialmente obstruido",
    ],
    symptoms: [
      "Pérdida de potencia y tirones",
      "Ralentí inestable",
      "Consumo elevado",
      "Humo azulado al arrancar",
      "Testigo de motor encendido",
    ],
    process: [
      { step: 1, title: "Diagnóstico OBD2", desc: "Lectura de códigos, mezcla, lambda y combustión." },
      { step: 2, title: "Ciclo HHO específico gasolina", desc: "Ciclo HHO adaptado a motores gasolina, especialmente eficaz en motores GDI/TFSI con problemas de carbono en válvulas." },
      { step: 3, title: "Tratamiento del catalizador", desc: "Limpieza con HHO compatible." },
      { step: 4, title: "Verificación con analizador de gases", desc: "Lectura comparativa de CO, HC y O₂ para confirmar la mejora." },
    ],
    benefits: [
      "Reducción CO hasta el 60 %",
      "Reducción HC hasta el 50 %",
      "Recuperación de potencia (especialmente en GDI/TFSI)",
      "Reducción del consumo",
      "Compatible con sonda lambda y catalizador",
    ],
    price: "Consultar precio",
    priceVariables: ["Cilindrada", "Tipo de inyección (puerto, GDI, TFSI)", "Servicios complementarios"],
    risks: [
      "Motores GDI/TFSI con grandes acumulaciones en válvulas pueden requerir limpieza por hielo seco complementaria",
    ],
    faq: [
      { question: "¿Funciona en motores TFSI/TSI?", answer: "Sí. Es especialmente recomendable en motores con inyección directa porque el combustible no limpia las válvulas de admisión durante el ciclo. La descarbonización HHO actúa directamente sobre esos depósitos." },
      { question: "¿Cuánto tarda?", answer: "Entre 60 y 90 minutos en total para el ciclo completo." },
    ],
    relatedBlog: [],
    relatedServices: [
      { title: "Servicio de descarbonización", href: "/servicios/descarbonizacion-motor" },
      { title: "Solución: Gases altos ITV gasolina", href: "/soluciones/gases-altos-itv-gasolina" },
    ],
  },
};
