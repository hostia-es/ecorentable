import blogDescarbonizacionMotor from "@/assets/blog/blog-descarbonizacion-motor.jpg";
import blogCuandoDescarbonizar from "@/assets/blog/blog-cuando-descarbonizar.jpg";
import blogFiltroParticulas from "@/assets/blog/blog-filtro-particulas.jpg";
import blogHidrogenoHho from "@/assets/blog/blog-hidrogeno-hho.jpg";
import blogItvDescarbonizacion from "@/assets/blog/blog-itv-descarbonizacion.jpg";
import blogCarbonFap from "@/assets/blog/blog-carbon-fap.jpg";
import blogFlotasDiesel from "@/assets/blog/blog-flotas-diesel.jpg";
import blogValvulaEgr from "@/assets/blog/blog-valvula-egr.jpg";
import blogNormativaItv from "@/assets/blog/blog-normativa-itv.jpg";
import blogHyCalamineComparativa from "@/assets/blog/blog-hy-calamine-comparativa.jpg";
import blogRentabilidadTaller from "@/assets/blog/blog-rentabilidad-taller.jpg";
import blogEuro6dMotor from "@/assets/blog/blog-euro6d-motor.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  content?: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "bp1",
    slug: "que-es-descarbonizacion-motor",
    title: "¿Qué es la descarbonización del motor? Guía técnica completa",
    excerpt: "Explicación detallada del proceso de descarbonización, por qué se acumula el carbono en los motores modernos y cómo se elimina de forma profesional.",
    category: "¿Qué es la descarbonización?",
    categorySlug: "que-es-descarbonizacion",
    readTime: "8 min",
    date: "2024-01-15",
    tags: ["descarbonización", "motor diésel", "hidrógeno", "mantenimiento"],
    image: blogDescarbonizacionMotor,
  },
  {
    id: "bp2",
    slug: "cuando-hacer-descarbonizacion-motor-diesel",
    title: "¿Cada cuántos kilómetros hacer una descarbonización?",
    excerpt: "Descubre cada cuántos km se recomienda la descarbonización para motores diésel, gasolina y GLP, según uso urbano o de carretera.",
    category: "Guías",
    categorySlug: "guias",
    readTime: "5 min",
    date: "2024-01-22",
    tags: ["mantenimiento", "periodicidad", "km descarbonización"],
    image: blogCuandoDescarbonizar,
  },
  {
    id: "bp3",
    slug: "sintomas-filtro-particulas-obstruido",
    title: "7 síntomas de que tu filtro de partículas (DPF/FAP) está obstruido",
    excerpt: "El DPF obstruido produce testigos en el cuadro, pérdida de potencia y mayor consumo. Aprende a identificar los síntomas antes de que sea tarde.",
    category: "Guías",
    categorySlug: "guias",
    readTime: "6 min",
    date: "2024-02-05",
    tags: ["DPF", "FAP", "filtro partículas", "síntomas"],
    image: blogFiltroParticulas,
  },
  {
    id: "bp4",
    slug: "descarbonizacion-hidrogeno-como-funciona",
    title: "Descarbonización por hidrógeno: ¿cómo funciona realmente?",
    excerpt: "Analizamos el proceso electroquímico de producción de HHO (oxihidrógeno) y su acción sobre los depósitos de carbono en pistones, válvulas y EGR.",
    category: "Innovación",
    categorySlug: "innovacion",
    readTime: "7 min",
    date: "2024-02-18",
    tags: ["hidrógeno", "HHO", "descarbonización", "electrólisis"],
    image: blogHidrogenoHho,
  },
  {
    id: "bp5",
    slug: "descarbonizacion-antes-itv-funciona",
    title: "¿Funciona la descarbonización para pasar la ITV?",
    excerpt: "Analizamos si la descarbonización previa a la ITV ayuda realmente a reducir las emisiones de CO, HC y NOx para superar los límites establecidos.",
    category: "ITV",
    categorySlug: "itv",
    readTime: "6 min",
    date: "2024-03-01",
    tags: ["ITV", "emisiones", "CO", "NOx", "inspección técnica"],
    image: blogItvDescarbonizacion,
  },
  {
    id: "bp6",
    slug: "carbon-fap-aditivo-dpf-review",
    title: "Carbon FAP: análisis técnico del aditivo para DPF/FAP",
    excerpt: "Evaluación técnica del aditivo Carbon FAP, su composición basada en óxidos de cerio, dosis recomendada y resultados esperados en vehículos de uso urbano.",
    category: "Productos",
    categorySlug: "productos",
    readTime: "5 min",
    date: "2024-03-10",
    tags: ["Carbon FAP", "aditivo", "DPF", "cerio", "regeneración"],
    image: blogCarbonFap,
  },
  {
    id: "bp7",
    slug: "mantenimiento-preventivo-flotas-diesel",
    title: "Mantenimiento preventivo de flotas diésel: plan completo",
    excerpt: "Plan de mantenimiento preventivo para flotas de vehículos diésel que incluye descarbonización, limpieza DPF/EGR y aditivos. Ahorra hasta un 40% en averías.",
    category: "Flotas",
    categorySlug: "flotas",
    readTime: "9 min",
    date: "2024-03-20",
    tags: ["flotas", "mantenimiento preventivo", "diésel", "gestión flotas"],
    image: blogFlotasDiesel,
  },
  {
    id: "bp8",
    slug: "valvula-egr-que-es-como-limpiar",
    title: "Válvula EGR: qué es, síntomas de fallo y cómo limpiarla",
    excerpt: "La válvula EGR recircula gases de escape para reducir emisiones. Cuando se obstruye provoca pérdida de potencia y humos. Aquí explicamos cómo actuar.",
    category: "Guías",
    categorySlug: "guias",
    readTime: "7 min",
    date: "2024-04-01",
    tags: ["EGR", "válvula EGR", "limpieza", "gases recirculación"],
    image: blogValvulaEgr,
  },
  {
    id: "bp9",
    slug: "normativa-itv-emisiones-2024-espana",
    title: "Normativa ITV 2024 en España: límites de emisiones por tipo de motor",
    excerpt: "Actualización completa de los límites de emisiones en la ITV española para gasolina, diésel, GLP e híbrido. Qué valores te pueden dar el suspenso.",
    category: "ITV",
    categorySlug: "itv",
    readTime: "8 min",
    date: "2024-04-15",
    tags: ["ITV", "normativa", "emisiones", "España", "2024"],
    image: blogNormativaItv,
  },
  {
    id: "bp10",
    slug: "hy-calamine-comparativa-maquinas-descarbonizadoras",
    title: "Hy-Calamine 1000S vs 2000S vs 3000S: ¿cuál elegir?",
    excerpt: "Comparativa técnica y económica de las tres gamas de máquinas descarbonizadoras Hy-Calamine para ayudar a talleres a elegir la inversión adecuada.",
    category: "Productos",
    categorySlug: "productos",
    readTime: "6 min",
    date: "2024-05-01",
    tags: ["Hy-Calamine", "comparativa", "máquina descarbonizadora", "taller"],
    image: blogHyCalamineComparativa,
  },
  {
    id: "bp11",
    slug: "rentabilidad-servicio-descarbonizacion-taller",
    title: "¿Es rentable ofrecer descarbonización en un taller mecánico?",
    excerpt: "Análisis de rentabilidad del servicio de descarbonización: coste de la máquina, precio por servicio, número de intervenciones y ROI estimado.",
    category: "Flotas",
    categorySlug: "flotas",
    readTime: "7 min",
    date: "2024-05-15",
    tags: ["rentabilidad", "taller", "ROI", "inversión", "descarbonización"],
    image: blogRentabilidadTaller,
  },
  {
    id: "bp12",
    slug: "eurocat-6d-motor-diesel-descarbonizacion",
    title: "Motores Euro 6d y Euro 6d-TEMP: ¿también necesitan descarbonización?",
    excerpt: "Los motores más modernos también acumulan carbono. Analizamos cómo afecta la descarbonización a los propulsores Euro 6d y qué hay que tener en cuenta.",
    category: "Innovación",
    categorySlug: "innovacion",
    readTime: "6 min",
    date: "2024-06-01",
    tags: ["Euro 6d", "descarbonización", "motor moderno", "WLTP"],
  },
];

export const blogCategories = [
  { name: "¿Qué es la descarbonización?", slug: "que-es-descarbonizacion", description: "Todo sobre el proceso de descarbonización del motor: qué es, cómo funciona y cuándo hacerla.", count: 1 },
  { name: "Guías", slug: "guias", description: "Guías prácticas para conductores y talleres: mantenimiento, síntomas, soluciones.", count: 3 },
  { name: "Innovación", slug: "innovacion", description: "Novedades tecnológicas en descarbonización, nuevas técnicas y equipos.", count: 2 },
  { name: "ITV", slug: "itv", description: "Todo sobre la Inspección Técnica de Vehículos y cómo afecta la descarbonización.", count: 2 },
  { name: "Productos", slug: "productos", description: "Análisis y comparativas de productos para descarbonización, aditivos y equipos.", count: 2 },
  { name: "Flotas", slug: "flotas", description: "Gestión de flotas, mantenimiento preventivo y rentabilidad para empresas.", count: 2 },
];
