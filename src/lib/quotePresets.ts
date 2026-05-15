// Mapa de presets de QuoteForm por slug, conforme al documento
// "ecologia_rentable_mapa_formularios" (mapa de formularios por página).
// Devuelve la configuración exacta que cada landing debe pasar al <QuoteForm/>.

import type { QuotePerfil } from "@/components/common/QuoteForm";

export interface QuotePreset {
  mode: "mixto" | "b2b";
  defaultPerfil?: QuotePerfil;
  presetServicio?: string;
  presetEquipo?: string;
  presetModalidad?: string;
  ctaLabel?: string;
}

const SERVICIO = {
  motor: "Descarbonización de motor",
  hidrogeno: "Descarbonización con hidrógeno",
  dpf: "Limpieza de filtro de partículas / DPF / FAP",
  itv: "Diagnóstico de emisiones / gases ITV",
  camiones: "Servicio para flotas de camiones",
  renting: "Servicio para coches de renting",
  flexfuel: "Mantenimiento de máquinas FlexFuel",
  asesor: "No lo tengo claro, necesito asesoramiento",
} as const;

const EQUIPO = {
  h1000: "H2 Profit 1000",
  h2000: "H2 Profit 2000",
  h3000: "H2 Profit 3000",
  hyCarbon: "Hy-Carbon Connect",
  carbonFap: "Carbon FAP",
  opacimetro: "Opacímetro Ecología Rentable",
  analizador: "Analizador de gases Ecología Rentable",
  kit: "Kit Opacidad",
  reac: "Descarbonizadora reacondicionada",
  asesor: "No sé qué equipo necesito",
} as const;

/* ──────────────── SERVICIOS ──────────────── */

export function getServicioPreset(slug: string): QuotePreset {
  // Alquiler/Renting de equipos → B2B con equipo + modalidad
  if (slug.startsWith("alquiler-renting-")) {
    const equipo =
      slug.includes("h2-profit-1000") ? EQUIPO.h1000 :
      slug.includes("h2-profit-2000") ? EQUIPO.h2000 :
      slug.includes("h2-profit-3000") ? EQUIPO.h3000 :
      slug.includes("hy-carbon-connect") ? EQUIPO.hyCarbon :
      slug.includes("carbon-fap") ? EQUIPO.carbonFap :
      slug.includes("opacimetro") ? EQUIPO.opacimetro :
      slug.includes("analizador-gases") ? EQUIPO.analizador :
      EQUIPO.asesor;
    return {
      mode: "b2b",
      defaultPerfil: "taller",
      presetEquipo: equipo,
      presetModalidad: "Alquiler",
      ctaLabel: "Solicitar alquiler / renting",
    };
  }

  switch (slug) {
    case "descarbonizacion":
    case "descarbonizacion-motor":
      return { mode: "mixto", presetServicio: SERVICIO.motor };

    case "descarbonizacion-con-hidrogeno":
      return { mode: "mixto", presetServicio: SERVICIO.hidrogeno };

    case "particulares":
    case "descarbonizacion-para-particulares":
      return { mode: "mixto", defaultPerfil: "particular", presetServicio: SERVICIO.motor };

    case "talleres":
    case "descarbonizacion-para-talleres":
      return {
        mode: "b2b",
        defaultPerfil: "taller",
        presetServicio: SERVICIO.motor,
        ctaLabel: "Quiero ofrecer este servicio",
      };

    case "descarbonizacion-para-empresas":
      return {
        mode: "b2b",
        defaultPerfil: "flota",
        presetServicio: SERVICIO.motor,
        ctaLabel: "Solicitar propuesta",
      };

    case "flotas":
    case "descarbonizacion-para-flotas-de-camiones":
      return {
        mode: "b2b",
        defaultPerfil: "flota",
        presetServicio: SERVICIO.camiones,
        ctaLabel: "Solicitar presupuesto flota",
      };

    case "descarbonizacion-para-coches-de-renting":
      return {
        mode: "b2b",
        defaultPerfil: "flota",
        presetServicio: SERVICIO.renting,
        ctaLabel: "Solicitar presupuesto renting",
      };

    case "limpieza-filtros":
    case "limpieza-filtro-de-particulas":
      return { mode: "mixto", presetServicio: SERVICIO.dpf };

    case "mantenimiento-descarbonizadoras":
    case "mantenimiento-maquinas-flexfuel":
      return {
        mode: "b2b",
        defaultPerfil: "taller",
        presetServicio: SERVICIO.flexfuel,
        ctaLabel: "Solicitar mantenimiento",
      };

    case "alquiler-renting-equipos":
      return {
        mode: "b2b",
        defaultPerfil: "taller",
        presetEquipo: EQUIPO.asesor,
        presetModalidad: "Alquiler",
      };

    default:
      return { mode: "mixto" };
  }
}

/* ──────────────── SOLUCIONES ──────────────── */

export function getSolucionPreset(slug: string): QuotePreset {
  // Soluciones específicas a flotas de camiones / renting podrían ir B2B,
  // pero el documento marca todas como B2C+B2B. Mapeamos servicio asociado.
  const map: Record<string, string> = {
    "gases-altos-itv-diesel": SERVICIO.itv,
    "gases-altos-itv-gasolina": SERVICIO.itv,
    "humo-negro-diesel": SERVICIO.motor,
    "fallo-anticontaminacion": SERVICIO.motor,
    "filtro-particulas-obstruido": SERVICIO.dpf,
    "limpiar-dpf-sin-desmontar": SERVICIO.dpf,
    "fallo-egr": SERVICIO.motor,
    "catalizador-obstruido": SERVICIO.motor,
    "perdida-potencia-coche-diesel": SERVICIO.motor,
    "descarbonizacion-motor-diesel": SERVICIO.motor,
    "descarbonizacion-motor-gasolina": SERVICIO.motor,
  };
  return { mode: "mixto", presetServicio: map[slug] };
}

/* ──────────────── PRODUCTOS ──────────────── */

export function getProductoPreset(slug: string): QuotePreset {
  const isReac = slug.endsWith("-reacondicionada");
  const base = slug.replace("-reacondicionada", "");

  const equipo =
    base === "h2-profit-1000" ? EQUIPO.h1000 :
    base === "h2-profit-2000" ? EQUIPO.h2000 :
    base === "h2-profit-3000" ? EQUIPO.h3000 :
    base === "hy-carbon-connect" ? EQUIPO.hyCarbon :
    base === "carbon-fap" ? EQUIPO.carbonFap :
    base === "opacimetro-ecologia-rentable" ? EQUIPO.opacimetro :
    base === "analizador-gases-ecologia-rentable" ? EQUIPO.analizador :
    base === "kit-opacidad" ? EQUIPO.kit :
    EQUIPO.asesor;

  // Equipos pesados → perfil flota; resto → taller (B2B con apertura mixta).
  const perfil: QuotePerfil =
    base === "h2-profit-3000" || base === "h2-profit-2000" ? "flota" : "taller";

  return {
    mode: "b2b",
    defaultPerfil: perfil,
    presetEquipo: isReac ? EQUIPO.reac : equipo,
    presetModalidad: isReac ? "Reacondicionado" : "Compra",
    ctaLabel: isReac ? "Solicitar disponibilidad y precio" : "Solicitar cotización",
  };
}
