// Generates public/sitemap.xml from the app's frozen routes + dynamic data.
// Runs via predev/prebuild scripts (see package.json).

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE = "https://ecologiarentable.es";

const STATIC = [
  "/",
  "/nosotros",
  "/contacto",
  "/accesibilidad",
  "/servicios",
  "/soluciones",
  "/blog",
  "/blog/itv",
  "/blog/guias",
  "/socios",
  "/socios/hazte-socio",
  "/tienda",
  "/encuentra-tu-centro",
];

const TIENDA_CATS = [
  "descarbonizadoras",
  "descarbonizadoras-reacondicionadas",
  "maquinas-limpieza-filtro-particulas",
  "opacimetros",
  "analizadores-de-gases",
  "kit-opacidad",
];

const PRODUCTS: Array<[string, string]> = [
  ["descarbonizadoras", "h2-profit-1000"],
  ["descarbonizadoras", "h2-profit-2000"],
  ["descarbonizadoras", "h2-profit-3000"],
  ["descarbonizadoras", "hy-carbon-connect"],
  ["descarbonizadoras-reacondicionadas", "h2-profit-1000-reacondicionada"],
  ["descarbonizadoras-reacondicionadas", "h2-profit-2000-reacondicionada"],
  ["descarbonizadoras-reacondicionadas", "h2-profit-3000-reacondicionada"],
  ["descarbonizadoras-reacondicionadas", "hy-carbon-connect-reacondicionada"],
  ["maquinas-limpieza-filtro-particulas", "carbon-fap"],
  ["opacimetros", "opacimetro-ecologia-rentable"],
  ["analizadores-de-gases", "analizador-gases-ecologia-rentable"],
  ["kit-opacidad", "kit-opacidad"],
];

const SERVICIOS = [
  "descarbonizacion-motor",
  "descarbonizacion-con-hidrogeno",
  "descarbonizacion-para-particulares",
  "descarbonizacion-para-talleres",
  "descarbonizacion-para-empresas",
  "descarbonizacion-para-flotas-de-camiones",
  "descarbonizacion-para-coches-de-renting",
  "descarbonizacion-para-flotas-de-renting",
  "limpieza-filtro-de-particulas",
  "mantenimiento-descarbonizadoras",
  "alquiler-renting-equipos",
  "alquiler-renting-h2-profit-1000",
  "alquiler-renting-h2-profit-2000",
  "alquiler-renting-h2-profit-3000",
  "alquiler-renting-hy-carbon-connect",
  "alquiler-renting-carbon-fap",
  "alquiler-renting-opacimetro-ecologia-rentable",
  "alquiler-renting-analizador-gases-ecologia-rentable",
  "alquiler-renting-maquinas-descarbonizadoras",
  "alquiler-renting-opacimetros",
  "alquiler-renting-analizadores-de-gases",
];

const SOLUCIONES = [
  "gases-altos-itv-diesel",
  "gases-altos-itv-gasolina",
  "humo-negro-diesel",
  "fallo-anticontaminacion",
  "filtro-particulas-obstruido",
  "limpiar-dpf-sin-desmontar",
  "fallo-egr",
  "catalizador-obstruido",
  "perdida-potencia-coche-diesel",
  "descarbonizacion-motor-diesel",
  "descarbonizacion-motor-gasolina",
];

const BLOG_POSTS = [
  "que-es-descarbonizacion-motor",
  "cuando-hacer-descarbonizacion-motor-diesel",
  "sintomas-filtro-particulas-obstruido",
  "descarbonizacion-hidrogeno-como-funciona",
  "descarbonizacion-antes-itv-funciona",
  "carbon-fap-aditivo-dpf-review",
  "mantenimiento-preventivo-flotas-diesel",
  "valvula-egr-que-es-como-limpiar",
  "normativa-itv-emisiones-2024-espana",
];

const BLOG_CATS = ["que-es-descarbonizacion", "guias", "innovacion", "itv", "productos", "flotas"];

const all = [
  ...STATIC.map((p) => ({ p, prio: p === "/" ? "1.0" : "0.8", freq: "weekly" })),
  ...TIENDA_CATS.map((c) => ({ p: `/tienda/${c}`, prio: "0.7", freq: "weekly" })),
  ...PRODUCTS.map(([c, s]) => ({ p: `/tienda/${c}/${s}`, prio: "0.7", freq: "monthly" })),
  ...SERVICIOS.map((s) => ({ p: `/servicios/${s}`, prio: "0.8", freq: "monthly" })),
  ...SOLUCIONES.map((s) => ({ p: `/soluciones/${s}`, prio: "0.7", freq: "monthly" })),
  ...BLOG_POSTS.map((s) => ({ p: `/blog/${s}`, prio: "0.6", freq: "monthly" })),
  ...BLOG_CATS.map((c) => ({ p: `/blog/categoria/${c}`, prio: "0.5", freq: "monthly" })),
];

const today = new Date().toISOString().split("T")[0];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...all.map(({ p, prio, freq }) =>
    [
      `  <url>`,
      `    <loc>${BASE}${p}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${freq}</changefreq>`,
      `    <priority>${prio}</priority>`,
      `  </url>`,
    ].join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${all.length} entries)`);
