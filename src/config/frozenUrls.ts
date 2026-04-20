/**
 * 🔒 FROZEN PUBLIC URLs — DO NOT MODIFY EXISTING ENTRIES
 * ============================================================================
 * This file is the canonical, append-only registry of every public-facing URL
 * served by Ecología Rentable.
 *
 * RULES (enforced by mem://constraints/seo/frozen-urls-policy):
 *   • NEVER edit, rename, or remove an existing entry. Doing so destroys SEO
 *     ranking and breaks backlinks already indexed by Google.
 *   • NEW pages: APPEND ONLY at the bottom of FROZEN_PUBLIC_URLS.
 *   • Renaming a slug requires a permanent 301 redirect via the
 *     `seo_redirects` table — the original path MUST stay frozen here.
 *   • Private routes (/admin, /dashboard, /auth, …) are intentionally excluded.
 *
 * Frozen on: 2026-04-20
 * Source of truth for: src/App.tsx, public/sitemap*.xml, public/robots.txt.
 * ============================================================================
 */

export const FROZEN_PUBLIC_URLS = Object.freeze([
  // MAIN
  "/",
  "/nosotros",
  "/contacto",
  "/accesibilidad",

  // SERVICIOS
  "/servicios",
  "/servicios/:servicio",

  // SOLUCIONES
  "/soluciones",
  "/soluciones/:slug",

  // BLOG
  "/blog",
  "/blog/:slug",
  "/blog/categoria/:category",

  // SOCIOS
  "/socios",
  "/socios/hazte-socio",
  "/socios/portal",

  // TIENDA
  "/tienda",
  "/tienda/:categoria",
  "/tienda/:categoria/:slug",

  // LEGACY (kept alive for SEO / 301 targets)
  "/descarbonizacion",
  "/limpieza-de-filtros-de-particulas",
  "/socio",
  "/carbon-fap",
  "/hy-calamine-1000s-egr-pilot",
  "/hy-calamine-2000s-egr-pilot",
  "/hy-calamine-3000s-egr-pilot",
  "/hy-carbon-connect",
] as const);

export type FrozenPublicUrl = (typeof FROZEN_PUBLIC_URLS)[number];

/**
 * Returns true when the given path matches a frozen public URL pattern.
 * Supports React-Router-style `:param` segments.
 */
export function isFrozenPublicUrl(path: string): boolean {
  const normalized = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

  return FROZEN_PUBLIC_URLS.some((pattern) => {
    const regex = new RegExp(
      "^" +
        pattern
          .replace(/\/+$/, "")
          .replace(/:[^/]+/g, "[^/]+")
          .replace(/\//g, "\\/") +
        "$",
    );
    return regex.test(normalized || "/");
  });
}
