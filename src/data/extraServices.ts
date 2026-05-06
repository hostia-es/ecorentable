// Contenido extenso de servicios añadidos al Navbar.
// Comparte el mismo shape que `ServicioData` en src/pages/ServicioDetalle.tsx.

export interface ServicioData {
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

const baseAlquiler = (modelo: string, tipo: "descarbonizadora" | "opacimetro" | "analizador" | "carbon-fap"): ServicioData => {
  const tipoLabel = {
    "descarbonizadora": "máquina descarbonizadora",
    "opacimetro": "opacímetro",
    "analizador": "analizador de gases",
    "carbon-fap": "máquina de limpieza de filtros de partículas Carbon FAP",
  }[tipo];

  return {
    title: `Alquiler y renting de ${modelo}`,
    subtitle: `Accede al ${modelo} sin inversión inicial. Modalidad de alquiler mensual o renting a 12, 24 o 36 meses con soporte técnico, formación y mantenimiento incluidos.`,
    badge: "Alquiler & Renting",
    definition: `El servicio de alquiler y renting del ${modelo} de Ecología Rentable está pensado para talleres, empresas de mantenimiento, gestores de flotas y centros de inspección que quieren incorporar esta ${tipoLabel} a su operativa diaria sin asumir el coste de adquisición. La modalidad de alquiler mensual ofrece máxima flexibilidad, sin permanencia y con cancelación con 30 días de preaviso. La modalidad de renting plurianual incluye mantenimiento preventivo, revisiones periódicas, sustitución de consumibles, formación inicial al equipo técnico, soporte telefónico ilimitado y actualizaciones de firmware si el equipo lo requiere. En ambos casos, el equipo se entrega en el centro del cliente, ya configurado y listo para operar el mismo día.`,
    symptoms: [
      `Quieres ofrecer el servicio asociado al ${modelo} sin inmovilizar capital`,
      "Necesitas amortizar la inversión en pocos meses con cuota fija predecible",
      "Buscas flexibilidad para escalar (más de un equipo) según volumen real",
      "Tu taller necesita un equipo certificado y siempre actualizado",
      "Quieres soporte técnico, formación y consumibles incluidos en una única cuota",
    ],
    benefits: [
      "Sin inversión inicial: accede al equipo profesional con cuota mensual",
      "Mantenimiento, calibración y sustitución de consumibles incluidos (renting)",
      "Formación práctica para el equipo técnico del centro",
      "Soporte telefónico y telemático ilimitado durante la vigencia del contrato",
      "Posibilidad de compra al finalizar el plazo de renting con descuento",
      "Cuota deducible al 100% como gasto operativo",
    ],
    priceRange: "Consultar precio",
    priceNote: "La cuota mensual depende de la modalidad elegida (alquiler / renting), del plazo (12, 24 o 36 meses) y de los servicios adicionales contratados. Solicita propuesta personalizada sin compromiso.",
    process: [
      { step: 1, title: "Análisis de necesidades", desc: "Estudio del volumen estimado de servicios mensuales, perfil de vehículos y operativa del centro para recomendar la modalidad y plazo más adecuados." },
      { step: 2, title: "Propuesta a medida", desc: "Recibes una propuesta económica detallada con cuota, condiciones de mantenimiento, formación y soporte incluidos." },
      { step: 3, title: "Contrato y entrega", desc: "Firmamos el contrato y entregamos el equipo en tu centro en un plazo medio de 7–10 días, listo para operar." },
      { step: 4, title: "Formación y arranque", desc: "Sesión presencial o telemática de formación práctica al equipo. Acompañamiento durante los primeros servicios." },
      { step: 5, title: "Seguimiento continuo", desc: "Revisiones periódicas, soporte ilimitado y reposición de consumibles incluidos durante toda la vigencia del contrato." },
    ],
    target: [
      "Talleres mecánicos que quieren ampliar su catálogo de servicios",
      "Centros de inspección y diagnóstico previo a la ITV",
      "Empresas con flotas que requieren control interno de emisiones",
      "Cadenas de talleres que necesitan estandarizar equipo en varios centros",
      "Emprendedores que abren un centro especializado",
    ],
    faq: [
      { question: `¿Qué diferencia hay entre alquiler mensual y renting del ${modelo}?`, answer: "El alquiler mensual es flexible: puedes cancelar con 30 días de preaviso, ideal si no tienes claro el volumen. El renting es a plazo fijo (12–36 meses) con cuota más baja, e incluye mantenimiento, consumibles, formación y soporte. La mayoría de centros prefiere el renting por la previsibilidad de costes." },
      { question: "¿Está incluido el mantenimiento del equipo?", answer: "Sí, en la modalidad de renting el mantenimiento preventivo, las revisiones anuales, la calibración (cuando aplica) y los consumibles de uso normal están incluidos. En el alquiler mensual son opcionales y se contratan por separado." },
      { question: "¿Puedo comprar el equipo al final del contrato?", answer: "Sí. Al finalizar el plazo de renting puedes ejercer una opción de compra con un descuento sobre el valor residual, devolverlo o renovar el contrato con un equipo de última generación." },
      { question: "¿Quién asume las averías del equipo?", answer: "En renting, las averías por uso normal están cubiertas. En alquiler mensual sin servicio de mantenimiento, las averías se facturan a precio de coste con prioridad de respuesta." },
      { question: "¿Cuánto tarda en llegar el equipo?", answer: "El plazo medio de entrega es de 7–10 días laborables desde la firma del contrato. Para entregas urgentes consulta disponibilidad." },
    ],
    relatedLinks: [
      { label: "Hub alquiler y renting de equipos", href: "/servicios/alquiler-renting-equipos" },
      { label: "Hazte socio de Ecología Rentable", href: "/socios/hazte-socio" },
      { label: "Solicitar propuesta personalizada", href: "/contacto" },
    ],
  };
};

export const extraServicios: Record<string, ServicioData> = {
  // ─── Servicios principales (renombres SEO) ───
  "descarbonizacion-motor": {
    title: "Descarbonización de motor profesional",
    subtitle: "Eliminación de depósitos carbonosos en motores diésel, gasolina e híbridos mediante hidrógeno (HHO). Sin desmontaje, con resultados medibles desde la primera sesión.",
    badge: "Servicio estrella",
    definition: "La descarbonización profesional de motor consiste en la eliminación de los depósitos de carbono acumulados en pistones, válvulas, cámara de combustión, colector de admisión, válvula EGR, turbo y filtro de partículas. El procedimiento de Ecología Rentable se realiza mediante la introducción de gas HHO (hidrógeno + oxígeno) generado por electrólisis de agua destilada. El gas entra por la admisión con el motor en marcha y, a la temperatura de combustión, transforma el carbono sólido en CO₂ y vapor de agua que se expulsan por el escape. No requiere desmontar ninguna pieza, no se utilizan productos químicos agresivos y no genera residuos. El servicio se complementa con tratamientos específicos para EGR, catalizador y DPF/FAP cuando el diagnóstico OBD2 lo recomienda.",
    symptoms: [
      "Pérdida de potencia o tirones al acelerar",
      "Aumento del consumo de combustible respecto a lo habitual",
      "Humos negros, azulados o blancos por el escape",
      "Testigo de motor encendido (códigos P0420, P0401, P2002, P0299…)",
      "Regeneraciones del DPF/FAP frecuentes o que no completan",
      "Ruidos de traqueteo en frío o ralentí inestable",
      "Vehículo en modo de emergencia (limp mode)",
      "ITV reciente con valores de emisiones altos",
    ],
    benefits: [
      "Reducción de emisiones CO/HC/opacidad de hasta el 70%",
      "Recuperación de potencia entre el 8% y el 18%",
      "Reducción del consumo entre el 5% y el 12%",
      "Marcha más suave, mejor respuesta del acelerador",
      "Extensión de la vida útil del DPF, EGR y catalizador",
      "Evita averías costosas (DPF nuevo: 400–1.500 €; EGR: 300–600 €)",
      "Servicio sin desmontaje, en 30–90 minutos",
    ],
    priceRange: "Consultar precio",
    priceNote: "El precio depende de la cilindrada, el tipo de combustible, los servicios complementarios (EGR, DPF, catalizador) y el centro elegido. Solicita presupuesto sin compromiso.",
    process: [
      { step: 1, title: "Diagnóstico OBD2 inicial", desc: "Lectura de códigos de avería, parámetros de presión, EGR, lambda y regeneraciones del DPF antes de la intervención." },
      { step: 2, title: "Preparación del motor", desc: "Calentamiento del motor a temperatura óptima de trabajo (85–95 °C) y conexión del equipo H2 Profit a la admisión." },
      { step: 3, title: "Ciclo HHO", desc: "Introducción del gas HHO durante 15–45 minutos según el modelo de máquina (1000S/2000S/3000S) y la cilindrada del vehículo." },
      { step: 4, title: "Tratamientos complementarios", desc: "Si el diagnóstico lo recomienda: limpieza de la válvula EGR por admisión, regeneración forzada del DPF o tratamiento del catalizador." },
      { step: 5, title: "Verificación y entrega", desc: "Nueva lectura OBD2, medición comparativa de emisiones (antes/después), borrado de códigos cuando proceda y entrega del informe técnico." },
    ],
    target: [
      "Conductores particulares de vehículos diésel o gasolina con más de 60.000 km",
      "Vehículos con uso urbano intensivo o trayectos cortos",
      "Conductores que van a pasar la ITV o que la han suspendido por emisiones",
      "Flotas comerciales que buscan reducir consumo y averías",
      "Talleres que ofrecen el servicio bajo la marca Ecología Rentable",
    ],
    faq: [
      { question: "¿La descarbonización es realmente efectiva?", answer: "Sí, cuando se realiza con equipo profesional certificado y un diagnóstico previo correcto. Los resultados son medibles tanto en emisiones (analizador de gases / opacímetro) como en parámetros del motor (presión de admisión, presión diferencial del DPF, contrapresión)." },
      { question: "¿Cuánto tarda el servicio?", answer: "Entre 30 y 90 minutos en total, incluyendo diagnóstico previo, ciclo HHO y verificación posterior. Puedes esperar en el centro." },
      { question: "¿Se puede dañar el motor?", answer: "No. El gas HHO es producido bajo demanda y en cantidades muy pequeñas, sin acumulación. No introduce ningún producto químico agresivo. Lo que sí debe verificarse antes es que no haya fugas activas de aceite o juntas de culata dañadas." },
      { question: "¿Cada cuántos km debo descarbonizar?", answer: "Para uso mixto, cada 30.000–50.000 km. Para uso urbano intensivo o trayectos cortos, cada 20.000–30.000 km. En vehículos con DPF, recomendamos hacerlo siempre antes de la ITV." },
      { question: "¿Qué tipos de motor son compatibles?", answer: "Todos los motores de combustión interna: diésel, gasolina, híbridos (HEV/PHEV) y motores GLP/GNC. No se realiza en motores 100% eléctricos." },
    ],
    relatedLinks: [
      { label: "Descarbonización con hidrógeno (HHO)", href: "/servicios/descarbonizacion-con-hidrogeno" },
      { label: "Descarbonización para particulares", href: "/servicios/descarbonizacion-para-particulares" },
      { label: "Descarbonización para flotas", href: "/servicios/descarbonizacion-para-empresas" },
      { label: "Solución: Descarbonización motor diésel", href: "/soluciones/descarbonizacion-motor-diesel" },
    ],
  },

  "descarbonizacion-con-hidrogeno": {
    title: "Descarbonización con hidrógeno (HHO)",
    subtitle: "La tecnología más limpia y certificada para eliminar carbono del motor. Proceso electroquímico, sin productos químicos, sin residuos y compatible con todos los motores de combustión.",
    badge: "Tecnología HHO",
    definition: "La descarbonización por hidrógeno (HHO) es un procedimiento electroquímico que utiliza una mezcla gaseosa de hidrógeno y oxígeno (H₂ + O), generada in situ por electrólisis del agua destilada con un electrolito alcalino, para eliminar los depósitos carbonosos del interior del motor. La descarbonizadora H2 Profit produce el gas únicamente bajo demanda y lo introduce por la toma de admisión mientras el motor permanece en marcha. A las temperaturas de combustión (>900 °C), el oxígeno reacciona con el carbono sólido y lo convierte en CO₂ gaseoso, mientras que el hidrógeno enriquece la combustión y se expulsa como vapor de agua. Es un proceso 100 % trazable, certificado CE, conforme a normativa europea de seguridad y compatible con catalizador, sonda lambda y filtro de partículas.",
    symptoms: [
      "Pérdida de potencia y respuesta deficiente del acelerador",
      "Consumo de combustible elevado respecto al histórico",
      "Humos visibles por el escape (negros, azulados o blancos)",
      "Testigo de motor encendido por carga de hollín o EGR",
      "Regeneraciones del DPF muy frecuentes o no finalizadas",
      "Olor a combustible quemado en frío",
    ],
    benefits: [
      "Sin productos químicos: solo agua destilada y electrolito alcalino",
      "Sin residuos líquidos ni contaminantes que gestionar",
      "Compatible con catalizador, sonda lambda y DPF/FAP",
      "Proceso medible: lectura comparativa antes/después con OBD2 y opacímetro",
      "Certificado CE y conforme a directivas europeas de equipos a presión",
      "Servicio en menos de 1 hora, sin desmontaje de piezas",
    ],
    priceRange: "Consultar precio",
    priceNote: "El precio varía según el modelo de máquina utilizada (H2 Profit 1000, 2000S o 3000S), la cilindrada del motor y los servicios complementarios. Solicita presupuesto.",
    process: [
      { step: 1, title: "Electrólisis del agua", desc: "La descarbonizadora H2 Profit descompone el agua destilada en H₂ y O mediante una corriente continua de baja intensidad sobre un electrolito alcalino estable." },
      { step: 2, title: "Introducción en el motor", desc: "El gas HHO se introduce por la toma de admisión a presión controlada, con válvulas de seguridad antiretorno." },
      { step: 3, title: "Acción sobre el carbono", desc: "A la temperatura de combustión, el O reacciona con los depósitos sólidos de carbono formando CO₂. El H₂ enriquece la mezcla, mejorando la combustión durante el ciclo." },
      { step: 4, title: "Expulsión por el escape", desc: "Los gases resultantes (CO₂ y vapor de agua) se expulsan por el tubo de escape como parte del ciclo normal del motor." },
      { step: 5, title: "Verificación con analizador / opacímetro", desc: "Se compara la lectura de emisiones antes y después del ciclo para confirmar la reducción efectiva de CO, HC y opacidad." },
    ],
    target: [
      "Talleres que buscan un método limpio y certificable",
      "Conductores con vehículos modernos sensibles a productos químicos",
      "Centros con compromiso medioambiental verificable",
      "Flotas con políticas internas de sostenibilidad",
    ],
    faq: [
      { question: "¿Es seguro tener una máquina HHO en el taller?", answer: "Sí. Las descarbonizadoras H2 Profit producen HHO únicamente bajo demanda y en pequeñas cantidades, sin acumulación. Disponen de válvulas de seguridad antiretorno, sensor de presión y corte automático en caso de anomalía. Cumplen la directiva europea PED 2014/68/UE." },
      { question: "¿Es lo mismo que añadir agua al motor?", answer: "No. El gas HHO es una mezcla gaseosa de hidrógeno y oxígeno. Nunca se introduce agua en estado líquido en el motor. El comportamiento físico-químico es completamente diferente." },
      { question: "¿Puede afectar al catalizador o a la sonda lambda?", answer: "No. El HHO es totalmente compatible con catalizador, sonda lambda y DPF. De hecho, su uso periódico ayuda a mantener limpios estos componentes." },
      { question: "¿Hay diferencia entre las máquinas H2 Profit 1000, 2000 y 3000?", answer: "Sí: el caudal de HHO producido (litros/hora) y el tiempo de ciclo recomendado por cilindrada. La 1000S es ideal para utilitarios y compactos, la 2000S para SUV y berlinas medias, y la 3000S para vehículos pesados, industriales y grandes cilindradas." },
    ],
    relatedLinks: [
      { label: "Descarbonización de motor", href: "/servicios/descarbonizacion-motor" },
      { label: "Comprar máquina H2 Profit 2000", href: "/tienda/descarbonizadoras/h2-profit-2000" },
      { label: "Solución: Descarbonización por hidrógeno", href: "/soluciones/descarbonizacion-hidrogeno" },
    ],
  },

  "descarbonizacion-para-particulares": {
    title: "Descarbonización para particulares",
    subtitle: "Servicio de descarbonización dirigido al conductor particular. Mejora el rendimiento, reduce el consumo y prepara tu vehículo para superar la ITV con margen.",
    badge: "Particulares",
    definition: "El servicio para particulares de Ecología Rentable está pensado para el conductor que quiere mantener su vehículo en óptimas condiciones de eficiencia y emisiones. Incluye un diagnóstico OBD2 inicial gratuito, descarbonización HHO completa, opcionalmente limpieza de la válvula EGR, regeneración del DPF/FAP y tratamiento del catalizador, y entrega de un informe con la comparativa antes/después. El servicio se realiza en cualquier centro asociado de la red nacional Ecología Rentable, con técnicos formados específicamente y equipos H2 Profit certificados.",
    symptoms: [
      "Notas que el coche tira menos o consume más que antes",
      "Tienes el testigo de motor o de DPF encendido",
      "Vas a pasar la ITV y quieres asegurar las emisiones",
      "Tu vehículo ha suspendido la ITV por emisiones de CO, HC o opacidad",
      "Llevas más de 40.000 km sin un mantenimiento específico del sistema de admisión y escape",
      "Haces principalmente trayectos urbanos cortos",
    ],
    benefits: [
      "Vehículo más eficiente, con mejor respuesta y menor consumo",
      "Probabilidad muy alta de superar la ITV en el primer intento",
      "Evita reparaciones caras (sustitución del DPF, EGR o catalizador)",
      "Reduce significativamente las emisiones contaminantes",
      "Servicio rápido (menos de 1 hora) sin necesidad de cita prolongada",
      "Disponible en toda España gracias a la red de centros asociados",
    ],
    priceRange: "Consultar precio",
    priceNote: "El precio para particulares varía según el centro, la cilindrada y los servicios complementarios (EGR, DPF, catalizador). Solicita presupuesto en el centro más cercano.",
    process: [
      { step: 1, title: "Localiza tu centro", desc: "Encuentra el taller asociado más cercano en la sección 'Encuentra tu centro' y solicita cita online o por teléfono." },
      { step: 2, title: "Diagnóstico gratuito", desc: "El técnico realiza una lectura OBD2 sin coste para identificar exactamente qué necesita tu vehículo." },
      { step: 3, title: "Servicio personalizado", desc: "Se ejecuta el ciclo de descarbonización HHO y los tratamientos complementarios acordados (EGR, DPF, catalizador)." },
      { step: 4, title: "Verificación y entrega", desc: "Nueva lectura OBD2, comparativa de emisiones y entrega de informe del servicio." },
    ],
    target: [
      "Conductores con vehículo diésel o gasolina de más de 3 años",
      "Propietarios con uso urbano intensivo (trayectos < 15 minutos)",
      "Conductores próximos a la ITV o que la han suspendido por emisiones",
      "Quien quiere mantener su vehículo en buen estado evitando averías",
    ],
    faq: [
      { question: "¿Necesito cita previa?", answer: "Sí, se recomienda pedir cita para asegurar disponibilidad del equipo y técnico. Puedes hacerlo online en cada centro asociado o por teléfono." },
      { question: "¿Cuánto dura el servicio?", answer: "Entre 30 y 90 minutos en total. La mayoría de clientes esperan en el centro." },
      { question: "¿Funciona si mi vehículo es híbrido?", answer: "Sí, los híbridos (HEV/PHEV) tienen motor de combustión y se benefician igualmente del servicio. Es muy recomendable porque su motor trabaja en frío con frecuencia." },
      { question: "¿Hay garantía de resultado?", answer: "Sí. En la mayoría de centros se ofrece garantía de mejora de emisiones con repetición gratuita en caso contrario, siempre que el vehículo no presente averías mecánicas previas." },
    ],
    relatedLinks: [
      { label: "Encuentra tu centro", href: "/encuentra-tu-centro" },
      { label: "Solución: Pasa la ITV con éxito", href: "/soluciones/itv-gases" },
      { label: "Solución: Filtro de partículas obstruido", href: "/soluciones/filtro-particulas-obstruido" },
    ],
  },

  "descarbonizacion-para-talleres": {
    title: "Descarbonización para talleres",
    subtitle: "Incorpora la descarbonización profesional a tu taller. Equipo H2 Profit, formación, leads cualificados de tu zona y soporte técnico continuo.",
    badge: "Talleres B2B",
    definition: "El programa para talleres de Ecología Rentable permite a cualquier mecánico ofrecer descarbonización profesional a sus clientes con respaldo de marca, equipo certificado y soporte continuo. El taller puede adquirir la descarbonizadora H2 Profit en propiedad o acceder a ella en alquiler/renting, y opcionalmente entrar en la red de centros asociados, lo que le permite recibir leads cualificados de su zona geográfica directamente desde la web de Ecología Rentable. Se incluye formación inicial presencial o telemática, manuales operativos, plantillas comerciales y soporte técnico ilimitado.",
    symptoms: [
      "Quieres diversificar los servicios de tu taller con un servicio de alto margen",
      "Tus clientes te preguntan por descarbonización, DPF o EGR",
      "Buscas un servicio con baja inversión inicial y rápido retorno",
      "Quieres recibir leads cualificados de clientes de tu zona",
      "Necesitas una marca reconocida que dé confianza al cliente final",
    ],
    benefits: [
      "Margen por servicio entre 50 y 150 € (según zona y tipología)",
      "ROI de la máquina típicamente en 3–6 meses según volumen",
      "Leads cualificados de clientes de tu zona vía la web nacional",
      "Formación técnica y comercial incluida",
      "Soporte técnico telefónico y telemático ilimitado",
      "Material gráfico y plantillas para tu propio marketing local",
      "Acceso a la red de centros asociados con visibilidad nacional",
    ],
    priceRange: "Consultar precio",
    priceNote: "El acceso al programa puede ser por compra de equipo, alquiler mensual o renting. Solicita propuesta personalizada para tu taller.",
    process: [
      { step: 1, title: "Conversación comercial", desc: "Hablamos con el responsable del taller para entender el volumen estimado, tipología de clientes y la modalidad más adecuada (compra/alquiler/renting)." },
      { step: 2, title: "Propuesta y contrato", desc: "Propuesta económica con condiciones del programa de socios, formación incluida y servicios complementarios." },
      { step: 3, title: "Entrega e instalación", desc: "Entrega del equipo H2 Profit en el taller en 7–10 días con configuración inicial." },
      { step: 4, title: "Formación operativa", desc: "Sesión presencial o telemática de formación técnica y comercial al equipo del taller." },
      { step: 5, title: "Alta en la red y arranque", desc: "Si entra en el programa de socios, alta en el directorio de centros con leads de su zona y acompañamiento durante los primeros servicios." },
    ],
    target: [
      "Talleres mecánicos generalistas que buscan diversificar",
      "Talleres especialistas en diésel o postventa de marca",
      "Cadenas de talleres con presencia regional o nacional",
      "Centros de inspección y diagnóstico previo a la ITV",
      "Emprendedores que abren un taller especializado",
    ],
    faq: [
      { question: "¿Tengo que comprar la máquina obligatoriamente?", answer: "No. Puedes adquirir el equipo en propiedad, alquilarlo mensualmente o contratarlo en modalidad de renting a 12, 24 o 36 meses. La elección depende del volumen estimado y de tu estrategia financiera." },
      { question: "¿Qué leads recibo si entro como socio?", answer: "Recibirás solicitudes de servicio cualificadas de clientes que han solicitado descarbonización, limpieza DPF o tratamiento EGR en tu provincia o área de influencia, gestionadas desde nuestra web nacional." },
      { question: "¿Cuánto cuesta entrar en el programa de socios?", answer: "Las condiciones del programa de socios dependen del modelo de equipo elegido y del nivel de servicio. Solicita propuesta personalizada." },
      { question: "¿Cuánto facturo por servicio?", answer: "El precio recomendado al cliente final está en una horquilla amplia según servicios complementarios. El margen neto por servicio se sitúa habitualmente entre 50 y 150 €." },
    ],
    relatedLinks: [
      { label: "Hazte socio", href: "/socios/hazte-socio" },
      { label: "Hub alquiler y renting", href: "/servicios/alquiler-renting-equipos" },
      { label: "Tienda — descarbonizadoras H2 Profit", href: "/tienda/descarbonizadoras" },
    ],
  },

  "descarbonizacion-para-empresas": {
    title: "Descarbonización para empresas",
    subtitle: "Plan de mantenimiento integral para empresas con vehículos: reduce consumo, evita averías y cumple los compromisos ESG de tu compañía.",
    badge: "Empresas",
    definition: "El servicio para empresas de Ecología Rentable está dirigido a compañías con flota propia de vehículos comerciales, ejecutivos o de servicio. Incluye un plan de mantenimiento preventivo programado, intervenciones por lote, reporting agregado de impacto en consumo y emisiones, y posibilidad de contratación marco con condiciones preferentes por volumen. El objetivo es triple: reducir el coste operativo de la flota, evitar averías costosas (DPF, EGR, catalizador, turbo) y aportar evidencia técnica al reporting de sostenibilidad y ESG de la empresa.",
    symptoms: [
      "Tu empresa tiene flota de vehículos diésel o gasolina con coste operativo elevado",
      "Sufrís averías recurrentes de DPF, EGR o catalizador",
      "Tenéis compromisos públicos de reducción de emisiones (ESG)",
      "Queréis estandarizar el mantenimiento preventivo entre todas las unidades",
      "Necesitáis reporting agregado de impacto medioambiental verificable",
    ],
    benefits: [
      "Reducción del coste operativo por vehículo (consumo + averías)",
      "Plan de mantenimiento programado con intervenciones por lote",
      "Reporting agregado: km, emisiones evitadas, ahorro estimado",
      "Condiciones preferentes por volumen y contrato marco",
      "Aportación documental al reporting ESG / Memoria de sostenibilidad",
      "Servicio in situ posible para flotas grandes (jornadas técnicas)",
    ],
    priceRange: "Consultar precio",
    priceNote: "Las condiciones se establecen por contrato marco según el tamaño de la flota, los servicios incluidos y la frecuencia. Solicita propuesta personalizada.",
    process: [
      { step: 1, title: "Auditoría de la flota", desc: "Análisis del parque móvil: tipología de vehículos, kilometraje medio, antigüedad, histórico de averías y consumo." },
      { step: 2, title: "Propuesta de plan", desc: "Diseñamos un plan de mantenimiento con frecuencias por tipo de vehículo, servicios incluidos y reporting." },
      { step: 3, title: "Contrato marco", desc: "Firma de contrato marco con condiciones preferentes por volumen, plazos y reporting acordado." },
      { step: 4, title: "Ejecución por lote", desc: "Programación de las intervenciones por lote, ya sea en centros de la red o jornadas técnicas in situ en flotas grandes." },
      { step: 5, title: "Reporting periódico", desc: "Informes trimestrales con kilometraje atendido, emisiones evitadas estimadas y ahorro operativo agregado." },
    ],
    target: [
      "Empresas con flota propia de vehículos comerciales o de servicio",
      "Compañías con compromisos ESG / Memoria de sostenibilidad",
      "Empresas de logística de última milla y reparto urbano",
      "Compañías de servicios técnicos con flota de furgonetas",
      "Administraciones públicas con flotas de vehículos oficiales",
    ],
    faq: [
      { question: "¿Cómo se factura el contrato marco?", answer: "Habitualmente con cuota mensual fija por número de vehículos, o por intervenciones realizadas con tarifa cerrada. Se adapta a la operativa de la empresa." },
      { question: "¿Pueden hacerlo en nuestras instalaciones?", answer: "Sí, para flotas a partir de un volumen mínimo, organizamos jornadas técnicas en las instalaciones del cliente para minimizar el impacto operativo." },
      { question: "¿Qué datos incluye el reporting?", answer: "Vehículos atendidos, kilometraje, lecturas comparativas antes/después, estimación de CO, HC y opacidad evitados, y ahorro operativo estimado en consumo y averías." },
      { question: "¿Es válido para reporting ESG?", answer: "Sí. Entregamos certificados de servicio y reporting agregado utilizable como evidencia documental en memorias de sostenibilidad y reporting ESG." },
    ],
    relatedLinks: [
      { label: "Descarbonización para flotas de camiones", href: "/servicios/descarbonizacion-para-flotas-de-camiones" },
      { label: "Descarbonización para coches de renting", href: "/servicios/descarbonizacion-para-coches-de-renting" },
      { label: "Solicitar propuesta para empresa", href: "/contacto" },
    ],
  },

  "descarbonizacion-para-flotas-de-camiones": {
    title: "Descarbonización para flotas de camiones",
    subtitle: "Servicio especializado para flotas de transporte y vehículos industriales pesados: tractoras, rígidos, camiones de obra y vehículos especiales.",
    badge: "Industrial pesado",
    definition: "El servicio de descarbonización para flotas de camiones está diseñado para empresas de transporte, logística pesada, obra civil y servicios industriales con vehículos de gran cilindrada (motores de 7 a 16 litros). Utilizamos las máquinas H2 Profit 3000, específicamente preparadas para vehículos industriales, con caudal de HHO ampliado y ciclos extendidos. El servicio se programa por lote y, en flotas grandes, se ejecuta en las instalaciones del cliente con jornadas técnicas. Incluye reporting por matrícula con lecturas OBD2 / EOBD pesado y certificación del servicio.",
    symptoms: [
      "Camiones con consumo creciente sin causa mecánica aparente",
      "Pérdida de potencia en cuestas o con carga máxima",
      "Regeneraciones del DPF muy frecuentes en uso urbano/distribución",
      "Testigo de motor encendido por carga de hollín o EGR",
      "Vehículos en modo de emergencia (limp mode)",
      "Coste creciente de averías en DPF, EGR o turbo",
    ],
    benefits: [
      "Reducción de consumo medible (3–8% en flotas)",
      "Reducción drástica de incidencias en DPF/EGR",
      "Mantenimiento programado por lote para minimizar parada operativa",
      "Servicio in situ posible para flotas grandes",
      "Reporting por matrícula y agregado de flota",
      "Aportación documental para reporting ESG y huella de carbono",
    ],
    priceRange: "Consultar precio",
    priceNote: "Tarifas escaladas por volumen de vehículos y modalidad (centro de la red o servicio in situ). Solicita propuesta personalizada.",
    process: [
      { step: 1, title: "Análisis de flota", desc: "Estudio del parque: matrículas, motorización, antigüedad, kilometraje y patrón de uso." },
      { step: 2, title: "Programación", desc: "Calendario de intervenciones por lote, optimizado para minimizar el impacto en la operativa de transporte." },
      { step: 3, title: "Servicio (in situ o en centro)", desc: "Ciclo HHO específico para gran cilindrada con la máquina H2 Profit 3000, complementado con tratamientos EGR/DPF cuando procede." },
      { step: 4, title: "Verificación EOBD", desc: "Lectura comparativa antes/después con escáner EOBD para vehículo pesado." },
      { step: 5, title: "Reporting de flota", desc: "Reporte por matrícula y agregado de la flota, con KPIs de emisiones y mantenimiento preventivo." },
    ],
    target: [
      "Empresas de transporte de mercancías por carretera",
      "Operadores de logística de última milla con furgones pesados",
      "Empresas de obra civil con maquinaria móvil sobre ruedas",
      "Compañías de servicios industriales con flota propia de camiones",
      "Administraciones con flotas pesadas (limpieza viaria, residuos…)",
    ],
    faq: [
      { question: "¿Es viable hacerlo en mis propias instalaciones?", answer: "Sí, a partir de un volumen mínimo organizamos jornadas técnicas con uno o varios equipos H2 Profit 3000 desplazados a tus instalaciones." },
      { question: "¿Cuánto se reduce el consumo?", answer: "En flotas pesadas con un programa preventivo periódico, se observa una reducción de consumo del 3–8 % de media, dependiendo del estado previo y patrón de uso." },
      { question: "¿Qué documentación se entrega?", answer: "Certificado del servicio por matrícula y reporting agregado de la flota con KPIs de emisiones y mantenimiento preventivo, utilizable como evidencia ESG." },
    ],
    relatedLinks: [
      { label: "Descarbonización para empresas", href: "/servicios/descarbonizacion-para-empresas" },
      { label: "Comprar H2 Profit 3000", href: "/tienda/descarbonizadoras/h2-profit-3000" },
      { label: "Solicitar propuesta para flota pesada", href: "/contacto" },
    ],
  },

  "descarbonizacion-para-coches-de-renting": {
    title: "Descarbonización para coches de renting",
    subtitle: "Servicio especializado para empresas de renting de vehículos. Reduce incidencias entre rotaciones, mejora el estado anticontaminación y planifica el mantenimiento por ciclo.",
    badge: "Renting",
    definition: "El servicio para coches de renting está específicamente diseñado para empresas de renting de turismos, vehículos comerciales ligeros y SUV. A diferencia del servicio de empresa estándar, contempla la dinámica propia del renting: alta rotación de unidades, uso intensivo, exigencia de continuidad operativa y necesidad de mantener el parque en condiciones óptimas de imagen y emisiones. Trabajamos con planificación por ciclo de rotación y por lote, con la posibilidad de intervención en centro o in situ.",
    symptoms: [
      "Vehículos devueltos con testigo de motor o DPF encendido",
      "Incidencias anticontaminación que afectan a la operatividad del parque",
      "Problemas recurrentes de emisiones en la ITV de unidades de renting",
      "Consumo elevado o pérdida de rendimiento en coches con alta rotación",
      "Necesidad de planificar mantenimiento preventivo para varias unidades a la vez",
    ],
    benefits: [
      "Reducción de incidencias anticontaminación entre rotaciones",
      "Mantenimiento planificado por lote y por ciclo",
      "Mejor estado operativo y de emisiones en cada nueva rotación",
      "Soporte técnico especializado para gestores de flota de renting",
      "Propuesta comercial adaptada al volumen y al ciclo de rotación",
    ],
    priceRange: "Consultar precio",
    priceNote: "Precio según tamaño de flota, volumen de intervenciones y ciclo de rotación. Se aplican condiciones preferentes por volumen.",
    process: [
      { step: 1, title: "Evaluación del parque móvil", desc: "Análisis del tipo de vehículos, volumen, estado actual y ciclo de rotación de la flota de renting." },
      { step: 2, title: "Propuesta por lote", desc: "Propuesta comercial adaptada al volumen, con planificación de intervenciones por lote o ciclo." },
      { step: 3, title: "Ejecución planificada", desc: "Servicios de descarbonización programados con mínima interferencia en la operativa de renting." },
      { step: 4, title: "Seguimiento operativo", desc: "Reporting de estado por unidad y seguimiento del impacto en emisiones, incidencias e ITV." },
    ],
    target: [
      "Empresas de renting de turismos y vehículos comerciales ligeros",
      "Gestores de flotas de renting con parque rotativo",
      "Departamentos de mantenimiento de operadores de renting",
    ],
    faq: [
      { question: "¿En qué se diferencia este servicio del de flotas generales?", answer: "Está adaptado a la dinámica de alta rotación y a la necesidad de mantener el parque operativo. Las intervenciones se planifican según el ciclo de rotación, no solo por kilómetros." },
      { question: "¿Se puede planificar para varias unidades a la vez?", answer: "Sí, trabajamos con propuestas por lote. Para flotas grandes podemos organizar jornadas técnicas en las instalaciones del cliente." },
    ],
    relatedLinks: [
      { label: "Descarbonización para flotas de renting", href: "/servicios/descarbonizacion-para-flotas-de-renting" },
      { label: "Descarbonización para empresas", href: "/servicios/descarbonizacion-para-empresas" },
      { label: "Solicitar propuesta de renting", href: "/contacto" },
    ],
  },

  "limpieza-filtro-de-particulas": {
    title: "Limpieza de filtro de partículas (DPF/FAP)",
    subtitle: "Regeneración profesional del filtro de partículas sin desmontaje. La alternativa eficaz y económica frente a la sustitución completa del DPF.",
    badge: "DPF / FAP",
    definition: "El servicio de limpieza del filtro de partículas (DPF / FAP) consiste en la regeneración profesional del filtro mediante una combinación de descarbonización HHO, aditivos específicos (Carbon FAP, presión 6 bar) y, cuando es necesario, una regeneración forzada por OBD. El objetivo es recuperar la presión diferencial original del filtro, eliminar el modo de emergencia del vehículo y devolver el rendimiento normal del motor sin necesidad de sustituir el DPF, cuyo coste se sitúa entre 400 y 1.500 €. El servicio incluye lectura previa de presión diferencial, ejecución del tratamiento y verificación posterior con OBD.",
    symptoms: [
      "Testigo del DPF/FAP encendido en el cuadro",
      "Pérdida de potencia significativa o modo emergencia (limp mode)",
      "Regeneraciones activas muy frecuentes que no completan",
      "Olor a combustible quemado durante la regeneración",
      "Aumento del consumo y del régimen de ralentí en frío",
    ],
    benefits: [
      "Recuperación del filtro sin necesidad de sustitución",
      "Ahorro frente a un DPF nuevo (400–1.500 €)",
      "Eliminación del testigo y del modo de emergencia",
      "Reducción de la opacidad medible con opacímetro",
      "Prolongación de la vida útil del filtro",
    ],
    priceRange: "Consultar precio",
    priceNote: "El precio depende del grado de obstrucción y del método elegido (admisión, aditivo Carbon FAP o limpieza por ultrasonidos).",
    process: [
      { step: 1, title: "Lectura de presión diferencial", desc: "Medición OBD de la contrapresión del filtro para determinar el grado de obstrucción y elegir el método." },
      { step: 2, title: "Elección del método", desc: "Según obstrucción: tratamiento por admisión + HHO, aditivo Carbon FAP a 6 bar o limpieza por ultrasonidos en cubeta para casos extremos." },
      { step: 3, title: "Tratamiento", desc: "Aplicación del método elegido con producto compatible con el sistema FAP/DPF." },
      { step: 4, title: "Regeneración forzada", desc: "Ciclo de regeneración activa por OBD para quemar el hollín restante y verificar la recuperación." },
      { step: 5, title: "Verificación final", desc: "Nueva lectura de presión diferencial y prueba de funcionamiento. Eliminación del modo emergencia." },
    ],
    target: [
      "Conductores con vehículo diésel y testigo DPF encendido",
      "Vehículos en modo de emergencia tras varias regeneraciones fallidas",
      "Flotas con incidencias recurrentes de DPF",
      "Talleres que quieren ofrecer este servicio sin tener que enviar el filtro fuera",
    ],
    faq: [
      { question: "¿Se puede limpiar un DPF muy obstruido?", answer: "Hasta un 85–90 % de obstrucción, la limpieza profesional es muy efectiva. Por encima de ese umbral puede ser necesario desmontar el filtro y limpiarlo por ultrasonidos, o sustituirlo." },
      { question: "¿Cuánto dura la limpieza?", answer: "Entre 1 y 3 horas según el método. La limpieza por ultrasonidos puede requerir desmontaje del filtro y un tiempo adicional de 1 a 2 horas." },
      { question: "¿Por qué se obstruye el DPF?", answer: "Habitualmente por trayectos urbanos cortos que no permiten la regeneración pasiva, válvula EGR sucia que aumenta la carga de hollín, aditivo FAP agotado (en sistemas Peugeot/Citroën) o aceite degradado." },
    ],
    relatedLinks: [
      { label: "Comprar Carbon FAP", href: "/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" },
      { label: "Solución: Filtro de partículas obstruido", href: "/soluciones/filtro-particulas-obstruido" },
      { label: "Solución: Limpiar DPF sin desmontar", href: "/soluciones/limpiar-dpf-sin-desmontar" },
    ],
  },

  "mantenimiento-descarbonizadoras": {
    title: "Mantenimiento de máquinas descarbonizadoras",
    subtitle: "Servicio técnico oficial de mantenimiento, calibración y reparación para descarbonizadoras H2 Profit y descarbonizadoras profesionales en uso en talleres.",
    badge: "Servicio técnico",
    definition: "El servicio de mantenimiento de máquinas descarbonizadoras de Ecología Rentable cubre la revisión preventiva anual, la sustitución periódica de consumibles, la calibración del caudal de HHO, la limpieza del depósito de electrolito, la verificación de seguridad de las válvulas antiretorno, el firmware del control electrónico cuando aplica y la reparación correctiva en caso de avería. Está disponible para máquinas adquiridas a Ecología Rentable y para equipos compatibles. Incluye soporte telefónico ilimitado y prioridad de respuesta para clientes con contrato de mantenimiento.",
    symptoms: [
      "Tu máquina descarbonizadora reduce su caudal de HHO",
      "Aparecen alertas de presión o temperatura en el panel",
      "Se cumple el intervalo anual de mantenimiento preventivo",
      "Necesitas la máquina calibrada y certificada para auditorías",
      "Has detectado fugas en el circuito o desgaste de sellos",
    ],
    benefits: [
      "Servicio técnico oficial con repuestos originales",
      "Calibración del caudal HHO y certificado emitido",
      "Sustitución de consumibles (electrolito, sellos, válvulas)",
      "Soporte técnico telefónico ilimitado con plan anual",
      "Prioridad de respuesta para clientes con contrato",
    ],
    priceRange: "Consultar precio",
    priceNote: "Las tarifas dependen del modelo de máquina y del tipo de servicio (preventivo anual, correctivo o contrato de mantenimiento). Solicita presupuesto.",
    process: [
      { step: 1, title: "Diagnóstico inicial", desc: "Conexión telemática o presencial para diagnosticar el estado del equipo." },
      { step: 2, title: "Propuesta de actuación", desc: "Detalle de los trabajos: revisión, consumibles, reparación correctiva o calibración." },
      { step: 3, title: "Servicio técnico", desc: "Ejecución del mantenimiento en taller del cliente o en nuestro centro técnico." },
      { step: 4, title: "Calibración y certificación", desc: "Verificación final del caudal HHO, presión y seguridad. Emisión de certificado de mantenimiento." },
    ],
    target: [
      "Talleres con descarbonizadoras H2 Profit en uso",
      "Centros con contrato de renting que requiere mantenimiento incluido",
      "Empresas con equipos descarbonizadores propios",
    ],
    faq: [
      { question: "¿Cada cuánto se debe hacer el mantenimiento preventivo?", answer: "Una vez al año o cada 1.000 ciclos, lo que ocurra antes. Con uso intensivo, se recomienda un servicio cada 500 ciclos." },
      { question: "¿Qué cubre el contrato de mantenimiento?", answer: "Revisión preventiva anual, calibración, consumibles de uso normal, soporte telefónico ilimitado y prioridad de respuesta. Las averías por uso indebido se facturan aparte." },
    ],
    relatedLinks: [
      { label: "Hub alquiler y renting", href: "/servicios/alquiler-renting-equipos" },
      { label: "Tienda — Descarbonizadoras", href: "/tienda/descarbonizadoras" },
      { label: "Solicitar mantenimiento", href: "/contacto" },
    ],
  },

  // ─── Hub Alquiler y Renting ───
  "alquiler-renting-equipos": {
    title: "Alquiler y renting de equipos profesionales",
    subtitle: "Accede a máquinas descarbonizadoras H2 Profit, opacímetros, analizadores de gases y equipos Carbon FAP sin inversión inicial. Cuota mensual fija con servicio integral.",
    badge: "Hub alquiler & renting",
    definition: "El hub de alquiler y renting de Ecología Rentable centraliza el acceso a toda la gama de equipos profesionales sin necesidad de inversión inicial. Disponemos de máquinas descarbonizadoras H2 Profit (1000S, 2000S, 3000S y Hy-Carbon Connect), máquinas Carbon FAP para limpieza de filtros de partículas, opacímetros homologados y analizadores de gases para inspección previa a la ITV. Las modalidades disponibles son alquiler mensual sin permanencia y renting a 12, 24 o 36 meses con mantenimiento, formación y soporte incluidos.",
    symptoms: [
      "Quieres equipar tu taller sin comprometer capital",
      "Necesitas un equipo certificado y siempre actualizado",
      "Buscas previsibilidad de costes con cuota mensual fija",
      "Vas a abrir un nuevo centro y no quieres asumir todo el capex",
      "Quieres ampliar capacidad temporalmente sin inversión",
    ],
    benefits: [
      "Sin inversión inicial: cuota mensual ajustada a tu volumen",
      "Mantenimiento, formación y soporte técnico incluidos en renting",
      "Renovación tecnológica al final del plazo de renting",
      "Cuota deducible al 100 % como gasto operativo",
      "Equipos en propiedad o en uso, según tu estrategia financiera",
      "Acceso a la misma gama Premium con menor barrera de entrada",
    ],
    priceRange: "Consultar precio",
    priceNote: "La cuota mensual depende del modelo de equipo, modalidad (alquiler/renting), plazo y servicios incluidos. Solicita propuesta personalizada.",
    process: [
      { step: 1, title: "Análisis de necesidades", desc: "Estudiamos el volumen estimado, tipología de cliente y operativa para recomendar la combinación de equipos y modalidad adecuada." },
      { step: 2, title: "Propuesta integral", desc: "Recibes una propuesta económica con cuota, servicios incluidos y plazo." },
      { step: 3, title: "Contrato y entrega", desc: "Firma del contrato y entrega del equipo o equipos en 7–10 días, configurados y listos para operar." },
      { step: 4, title: "Formación y arranque", desc: "Sesión de formación al equipo técnico y acompañamiento durante los primeros servicios." },
      { step: 5, title: "Soporte y renovación", desc: "Soporte técnico ilimitado y, al final del plazo, opción de renovar con equipos de última generación." },
    ],
    target: [
      "Talleres mecánicos generalistas o especializados",
      "Cadenas de talleres con presencia regional o nacional",
      "Centros de inspección y diagnóstico previo ITV",
      "Empresas de mantenimiento de flotas",
      "Emprendedores que abren un centro especializado",
    ],
    faq: [
      { question: "¿Puedo combinar varios equipos en el mismo contrato?", answer: "Sí, ofrecemos packs combinados (por ejemplo: descarbonizadora + opacímetro o descarbonizadora + analizador de gases) con condiciones preferentes." },
      { question: "¿Qué pasa al finalizar el plazo de renting?", answer: "Tienes tres opciones: ejercer opción de compra con descuento sobre el valor residual, renovar el contrato con un equipo nuevo de última generación o devolver el equipo sin penalización." },
      { question: "¿Está incluido el seguro del equipo?", answer: "En la mayoría de planes de renting está incluido un seguro a todo riesgo del equipo. En alquiler mensual, es opcional." },
    ],
    relatedLinks: [
      { label: "H2 Profit 1000 (alquiler/renting)", href: "/servicios/alquiler-renting-h2-profit-1000" },
      { label: "H2 Profit 2000 (alquiler/renting)", href: "/servicios/alquiler-renting-h2-profit-2000" },
      { label: "H2 Profit 3000 (alquiler/renting)", href: "/servicios/alquiler-renting-h2-profit-3000" },
      { label: "Hy-Carbon Connect (alquiler/renting)", href: "/servicios/alquiler-renting-hy-carbon-connect" },
      { label: "Carbon FAP (alquiler/renting)", href: "/servicios/alquiler-renting-carbon-fap" },
      { label: "Opacímetro (alquiler/renting)", href: "/servicios/alquiler-renting-opacimetro-ecologia-rentable" },
      { label: "Analizador de gases (alquiler/renting)", href: "/servicios/alquiler-renting-analizador-gases-ecologia-rentable" },
    ],
  },

  // ─── Renting por modelo ───
  "alquiler-renting-h2-profit-1000": baseAlquiler("H2 Profit 1000", "descarbonizadora"),
  "alquiler-renting-h2-profit-2000": baseAlquiler("H2 Profit 2000", "descarbonizadora"),
  "alquiler-renting-h2-profit-3000": baseAlquiler("H2 Profit 3000", "descarbonizadora"),
  "alquiler-renting-hy-carbon-connect": baseAlquiler("Hy-Carbon Connect", "descarbonizadora"),
  "alquiler-renting-carbon-fap": baseAlquiler("Carbon FAP", "carbon-fap"),
  "alquiler-renting-opacimetro-ecologia-rentable": baseAlquiler("Opacímetro Ecología Rentable", "opacimetro"),
  "alquiler-renting-analizador-gases-ecologia-rentable": baseAlquiler("Analizador de gases Ecología Rentable", "analizador"),
};
