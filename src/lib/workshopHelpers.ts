import { workshops, workshopProvincias, type Workshop } from "@/data/workshops";

/** Convierte texto a slug (sin tildes, minúsculas, guiones). */
export function toSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Mapa provinciaSlug → nombre original. */
export const provinciaSlugMap: Record<string, string> = workshopProvincias.reduce(
  (acc, name) => {
    acc[toSlug(name)] = name;
    return acc;
  },
  {} as Record<string, string>,
);

export function getProvinciaBySlug(slug: string): string | undefined {
  return provinciaSlugMap[slug];
}

export function getProvinciaSlug(name: string): string {
  return toSlug(name);
}

export function getWorkshopsByProvincia(name: string): Workshop[] {
  return workshops.filter((w) => w.provincia === name);
}

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((w) => w.slug === slug);
}

/** Servicios estándar prestados por todos los centros certificados. */
export const STANDARD_SERVICES: { title: string; description: string }[] = [
  {
    title: "Descarbonización por hidrógeno",
    description: "Tratamiento HHO completo para motores diésel y gasolina con tecnología H2 Profit.",
  },
  {
    title: "Limpieza de filtros DPF/FAP",
    description: "Limpieza profesional sin desmontaje y regeneración forzada del filtro de partículas.",
  },
  {
    title: "Limpieza de válvula EGR",
    description: "Eliminación de depósitos en la válvula de recirculación de gases sin desmontaje.",
  },
  {
    title: "Diagnóstico de emisiones",
    description: "Análisis con opacímetro y analizador de gases certificados ITV antes y después del tratamiento.",
  },
  {
    title: "Pre-ITV de emisiones",
    description: "Servicio específico para reducir opacidad y gases antes de la inspección técnica.",
  },
  {
    title: "Mantenimiento preventivo",
    description: "Plan de descarbonización periódica para particulares y flotas.",
  },
];
