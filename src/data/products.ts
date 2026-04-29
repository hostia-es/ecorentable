// ============================================================
// src/data/products.ts
// Fuente de verdad oficial — arquitectura SEO v6
// Última actualización: 2026-04-29
// REGLA: Nunca crear versión reacondicionada para familias
// no aprobadas (solo descarbonizadoras tienen reacondicionada)
// ============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  categorySlug: string;
  price: string;
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  keyword?: string;
  description: string;
  technicalDescription: string;
  specifications: { label: string; value: string }[];
  compatibility: string[];
  includes: string[];
  forWho: string[];
  benefits: string[];
  featured: boolean;
  image?: string;
  badge?: string;
  isReconditioned?: boolean;
  hasRenting?: boolean;
  hasRental?: boolean;
  relatedRentingSlug?: string;
  relatedNewSlug?: string;
  relatedReconditionedSlug?: string;
}

export const products: Product[] = [

  // ── DESCARBONIZADORAS NUEVAS ──────────────────────────────

  {
    id: "p1",
    slug: "h2-profit-1000",
    name: "H2 Profit 1000",
    shortName: "H2 Profit 1000",
    category: "Descarbonizadoras",
    categorySlug: "descarbonizadoras",
    price: "Consultar precio",
    metaTitle: "H2 Profit 1000 | Máquina de descarbonización para coches",
    metaDescription: "Equipo profesional de descarbonización por hidrógeno para coches y automoción ligera. Compra al contado, a plazos o solicita cotización.",
    h1: "H2 Profit 1000 para talleres y vehículos ligeros",
    keyword: "máquina descarbonizadora para coches",
    description: "Equipo de entrada profesional para descarbonización de coches y vehículos ligeros. Ideal para talleres que inician su actividad en descarbonización.",
    technicalDescription: "La H2 Profit 1000 produce hidrógeno y oxígeno mediante electrólisis e introduce el gas HHO en el motor a través de la admisión, eliminando depósitos de carbono sin desmontaje. Orientada a motores hasta 4.500 cc, alimentación 220V.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 4.500 cc" },
      { label: "Voltaje", value: "220V / 50Hz" },
      { label: "Peso", value: "92 kg" },
      { label: "Ciclos disponibles", value: "30 / 60 / 90 / 120 min" },
      { label: "Certificación", value: "CE" },
    ],
    compatibility: ["Motores diésel hasta 4.500 cc", "Motores gasolina hasta 4.500 cc", "Vehículos Euro 3–Euro 6", "Turismos y furgonetas ligeras"],
    includes: ["Máquina H2 Profit 1000", "Kit adaptadores", "Guía de uso en español", "Garantía incluida"],
    forWho: ["Talleres mecánicos que inician en descarbonización", "Talleres multimarca con volumen medio-bajo", "Centros de mantenimiento de turismos"],
    benefits: ["Reduce humos y gases de escape", "Sin desmontaje de piezas", "Retorno de inversión estimado en 3–6 meses", "Ciclos programables según vehículo"],
    featured: true,
    badge: "Más vendido",
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-1000",
    relatedReconditionedSlug: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-1000-reacondicionada",
  },

  {
    id: "p2",
    slug: "h2-profit-2000",
    name: "H2 Profit 2000",
    shortName: "H2 Profit 2000",
    category: "Descarbonizadoras",
    categorySlug: "descarbonizadoras",
    price: "Consultar precio",
    metaTitle: "H2 Profit 2000 | Máquina descarbonizadora para camiones",
    metaDescription: "Máquina de descarbonización por hidrógeno orientada a camiones, autobuses y uso profesional exigente. Solicita cotización o compra a plazos.",
    h1: "H2 Profit 2000 para vehículos pesados y uso intensivo",
    keyword: "máquina descarbonizadora para camiones",
    description: "Equipo de gama media para descarbonización de camiones, autobuses y vehículos de mayor cilindrada. Para talleres con línea industrial y operadores especializados.",
    technicalDescription: "La H2 Profit 2000 ofrece mayor capacidad de producción HHO para vehículos de hasta 9.000 cc con flujo de hidrógeno de alta capacidad. Alimentación 220V, peso 192 kg, 1.200 l/h.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 9.000 cc" },
      { label: "Voltaje", value: "220V / 50Hz" },
      { label: "Peso", value: "192 kg" },
      { label: "Flujo HHO", value: "1.200 l/h" },
      { label: "Certificación", value: "CE" },
    ],
    compatibility: ["Motores diésel hasta 9.000 cc", "Camiones y autobuses", "Furgonetas industriales", "Vehículos Euro 3–Euro 6d"],
    includes: ["Máquina H2 Profit 2000", "Kit adaptadores profesional", "Guía técnica", "Garantía incluida"],
    forWho: ["Talleres con línea industrial", "Talleres que trabajan camiones y autobuses", "Operadores especializados en vehículos pesados"],
    benefits: ["Capacidad superior al 1000", "Reduce humos hasta 70%", "Compatible con vehículos industriales", "Mayor margen de rentabilidad"],
    featured: true,
    badge: "Recomendado",
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-2000",
    relatedReconditionedSlug: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-2000-reacondicionada",
  },

  {
    id: "p3",
    slug: "h2-profit-3000",
    name: "H2 Profit 3000",
    shortName: "H2 Profit 3000",
    category: "Descarbonizadoras",
    categorySlug: "descarbonizadoras",
    price: "Consultar precio",
    metaTitle: "H2 Profit 3000 | Máquina descarbonizadora para flotas",
    metaDescription: "Equipo de descarbonización por hidrógeno para flotas y operaciones de gran capacidad. Solicita presupuesto personalizado.",
    h1: "H2 Profit 3000 para flotas y uso industrial",
    keyword: "máquina descarbonizadora para flotas",
    description: "La solución de máxima capacidad para talleres de alto volumen, flotas y centros especializados. Alimentación trifásica 380V.",
    technicalDescription: "La H2 Profit 3000 es la solución de alto rendimiento para flotas y operaciones industriales. Hasta 12.000 cc, trifásica 380V, 225 kg, 1.800 l/h. Máxima velocidad de ciclo y compatibilidad total con vehículos industriales.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 12.000 cc" },
      { label: "Voltaje", value: "Trifásica 380V" },
      { label: "Peso", value: "225 kg" },
      { label: "Flujo HHO", value: "1.800 l/h" },
      { label: "Certificación", value: "CE" },
    ],
    compatibility: ["Motores diésel hasta 12.000 cc", "Flotas de camiones y autobuses", "Vehículos industriales pesados", "Vehículos Euro 3–Euro 6d-TEMP"],
    includes: ["Máquina H2 Profit 3000", "Kit adaptadores premium", "Guía industrial", "Garantía incluida"],
    forWho: ["Talleres de alto volumen (flotas)", "Gestores de flotas de empresa", "Centros de descarbonización especializados"],
    benefits: ["Máxima capacidad de la gama", "Compatible con vehículos industriales", "Ciclos ultra-cortos para flotas", "ROI optimizado en volumen"],
    featured: true,
    badge: "Gama alta",
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-3000",
    relatedReconditionedSlug: "/tienda/descarbonizadoras-reacondicionadas/h2-profit-3000-reacondicionada",
  },

  {
    id: "p4",
    slug: "hy-carbon-connect",
    name: "Hy-Carbon Connect",
    shortName: "Hy-Carbon Connect",
    category: "Descarbonizadoras",
    categorySlug: "descarbonizadoras",
    price: "Consultar precio",
    metaTitle: "Hy-Carbon Connect | Estación conectada de descarbonización",
    metaDescription: "Estación conectada de descarbonización con tableta, OBD bluetooth, app e informes de intervención. Solicita cotización.",
    h1: "Hy-Carbon Connect con gestión guiada e informes",
    keyword: "hy-carbon connect",
    description: "Equipo conectado de descarbonización para coches con tableta táctil, OBD Bluetooth, app móvil e informes automáticos de intervención. La opción diferenciada para talleres digitalizados.",
    technicalDescription: "El Hy-Carbon Connect incorpora hasta 4.500 cc, 1.400 W, 230V, flujo máximo 1.000 l/h, garantía 5 años o 2.000 horas. Incluye dongle OBD Bluetooth, tableta táctil y gestión web de intervenciones.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 4.500 cc" },
      { label: "Potencia", value: "1.400 W" },
      { label: "Voltaje", value: "230V" },
      { label: "Flujo HHO", value: "Hasta 1.000 l/h" },
      { label: "Garantía", value: "5 años o 2.000 horas" },
      { label: "Conectividad", value: "OBD Bluetooth + Tableta + App" },
    ],
    compatibility: ["Vehículos con puerto OBD2 (post-2001)", "Turismos y vehículos ligeros hasta 4.500 cc", "Compatible con iOS y Android"],
    includes: ["Equipo Hy-Carbon Connect", "Tableta táctil", "Dongle OBD Bluetooth", "App iOS/Android", "Plataforma web de gestión", "Garantía 5 años / 2.000 h"],
    forWho: ["Talleres que buscan digitalización", "Talleres con alta rotación de clientes", "Centros que quieren ofrecer informes profesionales"],
    benefits: ["Informes PDF automáticos para el cliente", "Seguimiento de historial por vehículo", "Justificación técnica del servicio", "Conectividad OBD integrada"],
    featured: true,
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-hy-carbon-connect",
    relatedReconditionedSlug: "/tienda/descarbonizadoras-reacondicionadas/hy-carbon-connect-reacondicionada",
  },

  // ── DESCARBONIZADORAS REACONDICIONADAS ───────────────────

  {
    id: "p5",
    slug: "h2-profit-1000-reacondicionada",
    name: "H2 Profit 1000 reacondicionada",
    shortName: "H2 Profit 1000 Reac.",
    category: "Descarbonizadoras reacondicionadas",
    categorySlug: "descarbonizadoras-reacondicionadas",
    price: "Consultar precio",
    metaTitle: "H2 Profit 1000 reacondicionada | Descarbonizadora reacondicionada",
    metaDescription: "H2 Profit 1000 reacondicionada para talleres y empresas que buscan un equipo revisado con menor inversión inicial. Consulta disponibilidad, plazos y cotización.",
    h1: "H2 Profit 1000 reacondicionada revisada para taller",
    keyword: "máquina descarbonizadora reacondicionada para coches",
    description: "H2 Profit 1000 reacondicionada y revisada técnicamente. Mismas prestaciones para coches y vehículos ligeros, con menor inversión inicial. Disponibilidad sujeta a stock.",
    technicalDescription: "Unidad reacondicionada revisada en taller técnico: puesta a punto eléctrica, cambio de consumibles, test de ciclo completo y certificado de validación. Mismas prestaciones que la versión nueva. Hasta 4.500 cc, 220V.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 4.500 cc" },
      { label: "Voltaje", value: "220V / 50Hz" },
      { label: "Estado", value: "Reacondicionada y validada" },
      { label: "Stock", value: "Variable — consultar disponibilidad" },
    ],
    compatibility: ["Motores diésel hasta 4.500 cc", "Motores gasolina hasta 4.500 cc", "Turismos y vehículos ligeros"],
    includes: ["Máquina revisada", "Certificado de validación técnica", "Kit adaptadores", "Garantía según estado"],
    forWho: ["Talleres que buscan máxima relación calidad/precio", "Talleres que inician con presupuesto ajustado", "Negocios sensibles a la inversión inicial"],
    benefits: ["Precio inferior al equipo nuevo", "Validada y certificada técnicamente", "Mismas prestaciones garantizadas", "Opción de financiación disponible"],
    featured: false,
    badge: "Reacondicionada",
    isReconditioned: true,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-1000",
    relatedNewSlug: "/tienda/descarbonizadoras/h2-profit-1000",
  },

  {
    id: "p6",
    slug: "h2-profit-2000-reacondicionada",
    name: "H2 Profit 2000 reacondicionada",
    shortName: "H2 Profit 2000 Reac.",
    category: "Descarbonizadoras reacondicionadas",
    categorySlug: "descarbonizadoras-reacondicionadas",
    price: "Consultar precio",
    metaTitle: "H2 Profit 2000 reacondicionada | Descarbonizadora reacondicionada",
    metaDescription: "H2 Profit 2000 reacondicionada para camiones y vehículos pesados, revisada y lista para trabajar, con compra al contado o financiación.",
    h1: "H2 Profit 2000 reacondicionada para vehículo industrial",
    keyword: "h2 profit 2000 reacondicionada",
    description: "H2 Profit 2000 reacondicionada para camiones y vehículos de mayor cilindrada. Revisada técnicamente con menor inversión frente al equipo nuevo.",
    technicalDescription: "Unidad reacondicionada del modelo para vehículos hasta 9.000 cc. Revisión técnica completa, test de ciclo y certificado de validación incluidos.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 9.000 cc" },
      { label: "Voltaje", value: "220V / 50Hz" },
      { label: "Estado", value: "Reacondicionada y validada" },
      { label: "Stock", value: "Variable — consultar disponibilidad" },
    ],
    compatibility: ["Camiones y autobuses hasta 9.000 cc", "Furgonetas industriales"],
    includes: ["Máquina revisada", "Certificado de validación técnica", "Kit adaptadores", "Garantía según estado"],
    forWho: ["Talleres con línea industrial sensibles a inversión", "Operadores que trabajan vehículos pesados"],
    benefits: ["Capacidad industrial a precio reducido", "Validada técnicamente", "Financiación disponible"],
    featured: false,
    badge: "Reacondicionada",
    isReconditioned: true,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-2000",
    relatedNewSlug: "/tienda/descarbonizadoras/h2-profit-2000",
  },

  {
    id: "p7",
    slug: "h2-profit-3000-reacondicionada",
    name: "H2 Profit 3000 reacondicionada",
    shortName: "H2 Profit 3000 Reac.",
    category: "Descarbonizadoras reacondicionadas",
    categorySlug: "descarbonizadoras-reacondicionadas",
    price: "Consultar precio",
    metaTitle: "H2 Profit 3000 reacondicionada | Descarbonizadora reacondicionada",
    metaDescription: "H2 Profit 3000 reacondicionada de alta capacidad para flotas y operaciones exigentes, con compra al contado o financiación a plazos.",
    h1: "H2 Profit 3000 reacondicionada para flotas",
    keyword: "h2 profit 3000 reacondicionada",
    description: "H2 Profit 3000 reacondicionada para flotas y operaciones de alta demanda. Revisada técnicamente con ahorro de inversión frente al equipo nuevo.",
    technicalDescription: "Unidad reacondicionada del modelo premium para flotas. Hasta 12.000 cc, 380V trifásica. Revisión completa y certificado de validación incluidos.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 12.000 cc" },
      { label: "Voltaje", value: "Trifásica 380V" },
      { label: "Estado", value: "Reacondicionada y validada" },
      { label: "Stock", value: "Variable — consultar disponibilidad" },
    ],
    compatibility: ["Flotas de camiones y autobuses", "Vehículos industriales hasta 12.000 cc"],
    includes: ["Máquina revisada", "Certificado de validación técnica", "Garantía según estado"],
    forWho: ["Flotas y empresas de mantenimiento sensibles a ROI", "Centros que buscan alta capacidad con menor inversión"],
    benefits: ["Alta capacidad a precio reducido", "Ideal para flotas con sensibilidad a ROI", "Financiación disponible"],
    featured: false,
    badge: "Reacondicionada",
    isReconditioned: true,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-h2-profit-3000",
    relatedNewSlug: "/tienda/descarbonizadoras/h2-profit-3000",
  },

  {
    id: "p8",
    slug: "hy-carbon-connect-reacondicionada",
    name: "Hy-Carbon Connect reacondicionada",
    shortName: "Hy-Carbon Connect Reac.",
    category: "Descarbonizadoras reacondicionadas",
    categorySlug: "descarbonizadoras-reacondicionadas",
    price: "Consultar precio",
    metaTitle: "Hy-Carbon Connect reacondicionada | Ecología Rentable",
    metaDescription: "Hy-Carbon Connect reacondicionada para coches, con tablet y OBD, revisada y disponible con pago al contado o financiación.",
    h1: "Hy-Carbon Connect reacondicionada con tablet y OBD",
    keyword: "hy carbon connect reacondicionada",
    description: "Hy-Carbon Connect reacondicionado y revisado. Equipo conectado para coches con tableta y OBD Bluetooth a precio más accesible que el nuevo.",
    technicalDescription: "Unidad reacondicionada del modelo conectado. Hasta 4.500 cc, 230V, con dongle OBD y tableta revisada. Certificado de validación incluido.",
    specifications: [
      { label: "Capacidad motor", value: "Hasta 4.500 cc" },
      { label: "Voltaje", value: "230V" },
      { label: "Conectividad", value: "OBD Bluetooth + Tableta" },
      { label: "Estado", value: "Reacondicionada y validada" },
    ],
    compatibility: ["Turismos y vehículos ligeros hasta 4.500 cc", "Vehículos con puerto OBD2"],
    includes: ["Equipo revisado", "Tableta revisada", "Dongle OBD", "Certificado de validación"],
    forWho: ["Talleres que buscan la opción conectada con menor inversión inicial"],
    benefits: ["Conectividad y gestión a precio reducido", "Validada técnicamente", "Entrada accesible al servicio conectado"],
    featured: false,
    badge: "Reacondicionada",
    isReconditioned: true,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-hy-carbon-connect",
    relatedNewSlug: "/tienda/descarbonizadoras/hy-carbon-connect",
  },

  // ── MÁQUINAS LIMPIEZA FILTRO DE PARTÍCULAS ───────────────

  {
    id: "p9",
    slug: "carbon-fap",
    name: "Carbon FAP",
    shortName: "Carbon FAP",
    category: "Máquinas de limpieza de filtro de partículas",
    categorySlug: "maquinas-limpieza-filtro-particulas",
    price: "Consultar precio",
    metaTitle: "Carbon FAP | Máquina de limpieza de filtro de partículas",
    metaDescription: "Estación profesional para limpieza de filtros de partículas gasolina y diésel desmontados. Solicita cotización o financiación.",
    h1: "Carbon FAP para limpieza profesional de DPF y FAP",
    keyword: "máquina limpieza filtro de partículas",
    description: "Estación profesional de limpieza sin disolventes para filtros de partículas gasolina y diésel desmontados. Para talleres especializados en DPF/FAP.",
    technicalDescription: "Carbon FAP funciona con aire comprimido (mínimo 6 bares), alimentación 220V 16A, consumo <3.000 W, peso 93 kg, longitud útil 100 cm. Limpieza profesional de filtros gasolina y diésel sin disolventes.",
    specifications: [
      { label: "Voltaje", value: "220V / 16A" },
      { label: "Consumo", value: "< 3.000 W" },
      { label: "Presión mínima", value: "6 bares" },
      { label: "Peso", value: "93 kg" },
      { label: "Longitud útil", value: "100 cm" },
    ],
    compatibility: ["DPF/FAP gasolina", "DPF/FAP diésel", "Filtros Euro 4–6", "Compatible con marca Peugeot/Citroën/DS y otras"],
    includes: ["Equipo Carbon FAP", "Kit de conexión a aire comprimido", "Guía de procedimiento", "Garantía incluida"],
    forWho: ["Talleres especializados en DPF/FAP", "Centros de limpieza de filtros", "Talleres de flotas con alta rotación DPF"],
    benefits: ["Limpieza profesional sin disolventes", "Ahorra al cliente 400–1.500 € vs. DPF nuevo", "Compatible con gasolina y diésel", "Alto margen de beneficio por intervención"],
    featured: true,
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-carbon-fap",
  },

  // ── OPACÍMETROS ──────────────────────────────────────────

  {
    id: "p10",
    slug: "opacimetro-ecologia-rentable",
    name: "Opacímetro Ecología Rentable",
    shortName: "Opacímetro ER",
    category: "Opacímetros",
    categorySlug: "opacimetros",
    price: "Consultar precio",
    metaTitle: "Opacímetro Ecología Rentable | Opacímetro diésel profesional",
    metaDescription: "Opacímetro profesional para talleres y centros pre-ITV. Mide la opacidad de motores diésel con enfoque profesional y soporte técnico.",
    h1: "Opacímetro Ecología Rentable para diagnosis diésel",
    keyword: "opacímetro profesional",
    description: "Opacímetro profesional para medición de opacidad en motores diésel. Ideal para talleres con servicio de preparación ITV y centros de diagnosis.",
    technicalDescription: "Examen de tipo 172506001. Medición de N (porcentaje de opacidad) y K (coeficiente de absorción luminosa). Calentamiento en 6 min. Temperatura de operación 0–45°C. Conectividad Bluetooth, USB y RS232.",
    specifications: [
      { label: "Tipo de examen", value: "172506001" },
      { label: "Parámetros", value: "N (%) y K (m⁻¹)" },
      { label: "Calentamiento", value: "6 minutos" },
      { label: "Temperatura operación", value: "0–45°C" },
      { label: "Conectividad", value: "Bluetooth / USB / RS232" },
    ],
    compatibility: ["Vehículos diésel Euro 2–6", "Turismos, furgonetas e industriales ligeros"],
    includes: ["Opacímetro ER", "Sonda de gases con manguera", "Certificado de calibración", "Software de gestión", "Garantía incluida"],
    forWho: ["Talleres con servicio de preparación ITV", "Centros de diagnóstico", "Talleres centrados en diésel"],
    benefits: ["Medición precisa de opacidad y K", "Preparación ITV diésel", "Conectividad múltiple", "Calibración incluida"],
    featured: true,
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-opacimetro-ecologia-rentable",
  },

  // ── ANALIZADORES DE GASES ────────────────────────────────

  {
    id: "p11",
    slug: "analizador-gases-ecologia-rentable",
    name: "Analizador de gases Ecología Rentable",
    shortName: "Analizador Gases ER",
    category: "Analizadores de gases",
    categorySlug: "analizadores-de-gases",
    price: "Consultar precio",
    metaTitle: "Analizador de gases Ecología Rentable para taller",
    metaDescription: "Analizador de gases para talleres y pre-ITV. Mide emisiones en gasolina y diésel con enfoque profesional, software y soporte técnico.",
    h1: "Analizador de gases Ecología Rentable para emisiones y pre-ITV",
    keyword: "analizador de gases para taller",
    description: "Analizador de gases profesional para talleres y pre-ITV. Medición de hasta 5 gases en gasolina y diésel con software de gestión integrado.",
    technicalDescription: "Mide CO, CO₂, HC, O₂ y NOx (opcional). Compatible con Windows y Android. Peso 4,9 kg. Calentamiento < 1 minuto. Impresora integrada. Software de gestión incluido.",
    specifications: [
      { label: "Gases medidos", value: "CO, CO₂, HC, O₂ + NOx (opcional)" },
      { label: "Combustibles", value: "Gasolina y diésel" },
      { label: "Sistema operativo", value: "Windows / Android" },
      { label: "Peso", value: "4,9 kg" },
      { label: "Calentamiento", value: "< 1 minuto" },
    ],
    compatibility: ["Motores gasolina Euro 2–6", "Motores diésel", "Híbridos gasolina"],
    includes: ["Analizador de gases ER", "Sonda de gases 3 m", "Software de gestión", "Impresora integrada", "Certificado de calibración", "Garantía incluida"],
    forWho: ["Talleres mecánicos generalistas", "Centros de preparación ITV gasolina y diésel", "Centros de diagnosis"],
    benefits: ["Diagnóstico completo en < 2 min", "Compatible gasolina y diésel", "Software de gestión incluido", "NOx opcional disponible"],
    featured: true,
    isReconditioned: false,
    hasRenting: true,
    hasRental: true,
    relatedRentingSlug: "/servicios/alquiler-renting-analizador-gases-ecologia-rentable",
  },

  // ── KIT OPACIDAD ─────────────────────────────────────────

  {
    id: "p12",
    slug: "kit-opacidad",
    name: "Kit Opacidad",
    shortName: "Kit Opacidad",
    category: "Kit Opacidad",
    categorySlug: "kit-opacidad",
    price: "Consultar precio",
    metaTitle: "Kit Opacidad | Solución completa de emisiones para taller",
    metaDescription: "Kit Opacidad para talleres: opacímetro, analizador de gases y soporte en una solución integral para control de emisiones y servicio pre-ITV.",
    h1: "Kit Opacidad para equipar tu taller con una línea completa de emisiones",
    keyword: "kit opacidad",
    description: "Solución integral para talleres que quieren ofrecer una línea completa de emisiones. Incluye opacímetro, analizador de gases y carrito. Solo disponible en venta.",
    technicalDescription: "Pack que combina el Opacímetro Ecología Rentable + Analizador de gases Ecología Rentable + carrito de transporte. Solución integral para diagnosis y control de emisiones diésel y gasolina.",
    specifications: [
      { label: "Incluye", value: "Opacímetro ER + Analizador Gases ER + Carrito" },
      { label: "Disponibilidad", value: "Solo venta (sin alquiler ni renting)" },
      { label: "Uso", value: "Diésel y gasolina" },
    ],
    compatibility: ["Todos los vehículos diésel y gasolina Euro 2–6"],
    includes: ["Opacímetro Ecología Rentable", "Analizador de gases Ecología Rentable", "Carrito de transporte", "Software de gestión", "Certificados de calibración"],
    forWho: ["Talleres que quieren equiparse completamente en emisiones", "Centros pre-ITV", "Talleres con alta demanda de diagnosis de emisiones"],
    benefits: ["Solución integral en un solo pack", "Cubre diésel (opacidad) y gasolina (gases)", "Ahorro vs. compra por separado", "Soporte técnico incluido"],
    featured: false,
    isReconditioned: false,
    hasRenting: false,
    hasRental: false,
  },

];

// ── CATEGORÍAS OFICIALES ─────────────────────────────────

export const productCategories = [
  {
    name: "Descarbonizadoras",
    slug: "descarbonizadoras",
    count: products.filter(p => p.categorySlug === "descarbonizadoras").length,
    description: "Gama H2 Profit 1000, 2000 y 3000 más Hy-Carbon Connect. Equipos nuevos para talleres, empresas y flotas.",
    path: "/tienda/descarbonizadoras",
  },
  {
    name: "Descarbonizadoras reacondicionadas",
    slug: "descarbonizadoras-reacondicionadas",
    count: products.filter(p => p.categorySlug === "descarbonizadoras-reacondicionadas").length,
    description: "Equipos reacondicionados y validados técnicamente. Mismas prestaciones, mejor precio.",
    path: "/tienda/descarbonizadoras-reacondicionadas",
  },
  {
    name: "Máquinas de limpieza de filtro de partículas",
    slug: "maquinas-limpieza-filtro-particulas",
    count: products.filter(p => p.categorySlug === "maquinas-limpieza-filtro-particulas").length,
    description: "Equipos profesionales para limpieza de DPF/FAP gasolina y diésel.",
    path: "/tienda/maquinas-limpieza-filtro-particulas",
  },
  {
    name: "Opacímetros",
    slug: "opacimetros",
    count: products.filter(p => p.categorySlug === "opacimetros").length,
    description: "Opacímetros profesionales para talleres y centros pre-ITV.",
    path: "/tienda/opacimetros",
  },
  {
    name: "Analizadores de gases",
    slug: "analizadores-de-gases",
    count: products.filter(p => p.categorySlug === "analizadores-de-gases").length,
    description: "Analizadores de CO, CO₂, HC, O₂ y NOx para diagnosis profesional de emisiones.",
    path: "/tienda/analizadores-de-gases",
  },
  {
    name: "Kit Opacidad",
    slug: "kit-opacidad",
    count: products.filter(p => p.categorySlug === "kit-opacidad").length,
    description: "Solución integral opacímetro + analizador de gases para talleres. Solo venta.",
    path: "/tienda/kit-opacidad",
  },
];
