

## Plan: Replace Pages with Real ecologiarentable.es Content and Images

### Overview
Replace 4 pages with the exact content and images from the live ecologiarentable.es WordPress site. Images will be loaded directly from the WordPress CDN (`ecologiarentable.es/wp-content/uploads/...`).

### URL Mapping

| Source URL | Current behavior | Target |
|---|---|---|
| `/descarbonizacion` | Redirects to `/servicios/descarbonizacion` | Full page `LegacyDescarbonizacion.tsx` |
| `/limpieza-de-filtros-de-particulas` | Redirects to `/servicios/limpieza-filtros` | Full page `LegacyLimpiezaFiltros.tsx` |
| `/socio` | Redirects to `/socios` | Keep redirect, update `Socios.tsx` |
| `/nosotros` | Has placeholder content | Update `Nosotros.tsx` |

### Files to change (4 files)

**1. `src/pages/LegacyDescarbonizacion.tsx`** -- Complete rewrite (no longer a redirect). Sections from the real site:
- Hero: "Descarbonización de Vehículos" with workshop background
- Section: "Descarbonización por Inyección de Hidrógeno" with Hy-Carbon Connect image + map image
- 6 feature cards (Diagnóstico, Limpieza Profunda, Prevención Averías, ITV, Informe, Ahorro Combustible)
- 4-step process (Evaluación, Tratamiento, Limpieza, Informe) with images from WP
- Stats counter (Años experiencia, Máquinas, Vehículos, Clientes)
- "Especialistas en la Salud de tu Vehículo" section with checklist
- "Beneficios de la Descarbonización" section
- Partner logos carousel
- CTA banner with green background image
- Contact form
- FAQ accordion (4 questions from the real site)

**2. `src/pages/LegacyLimpiezaFiltros.tsx`** -- Complete rewrite. Sections:
- Hero: "Limpieza Profesional de Filtros de Partículas"
- 3 feature badges (Eficaz, Segura, Practica) with Carbon FAP image
- "Carbon FAP Limpieza" section with bullet points (Cubierta, Procesamiento, Resultado)
- Partner logos
- "Adaptador exclusivo para todos los tipos de FAP" with 3 expandable features
- CTA banner
- Contact form
- FAQ accordion

**3. `src/pages/Socios.tsx`** -- Major rewrite with real content:
- Hero: "Únete a Nuestra Red de Socios"
- "Modelo de Negocio: Venta y Alquiler" section with mechanic image + accordion (Servicios únicos, Lo mejor para tus clientes)
- 6 benefit cards (Facturación, Formación, Margen, Productos, Red, Fidelización)
- "Venta de Equipos" section with 5 product cards (Hy-Calamine 1000S, Hy-Carbon Connect, Hy-Calamine 2000S, Carbon FAP, Hy-Calamine 3000S) with real product images
- "Alquiler de Equipos" section with video placeholder + progress bars
- Quote from Younes Smaini
- 3 testimonials with real images
- CTA banner
- Contact form
- FAQ accordion (4 questions)

**4. `src/pages/Nosotros.tsx`** -- Rewrite with real content:
- Hero: "Nosotros" with breadcrumbs
- "Ecología Rentable" intro with Younes photo + accordion (Misión, Visión)
- Quote overlay on image
- Contact form
- FAQ accordion (same 4 questions)

### Images strategy
All images loaded directly from `https://ecologiarentable.es/wp-content/uploads/...` -- no need to download. This ensures exact match with the live site.

### Components used
All pages use existing Shadcn components: `Card`, `Badge`, `Button`, `Accordion`, `Separator`, `Input`, `Label`, `Textarea`, plus `AnimatedSection` and `StaggerChildren` for scroll animations.

### Routing change
- `LegacyDescarbonizacion` and `LegacyLimpiezaFiltros` will render full pages instead of `<Navigate>` redirects.
- No changes to `App.tsx` routes needed -- the paths already exist.

