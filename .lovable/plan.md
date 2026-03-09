

## Plan: Add images to SolucionDetalle pages

The `SolucionDetalle.tsx` page is purely text-based — no images at all. I'll add a hero image below the PageHero and a contextual image in the process section to give life to these pages.

### What will be done

1. **Generate 2 AI images** for the solution detail pages:
   - A professional mechanic performing engine decarbonization with HHO machine (hero banner)
   - A close-up of engine diagnostics with OBD2 scanner (process section)

2. **Add hero banner image** — full-width image right after the `PageHero` component (similar to how `HazteSocio` has one), using existing assets like `engine-before-after.jpg` or `maquina-descarbonizadora.jpg` combined with new ones.

3. **Add image in the process section** — place an image alongside the process steps in a 2-column layout on desktop to break the wall of text.

4. **Reuse existing assets where possible** — the project already has `engine-before-after.jpg`, `maquina-descarbonizadora.jpg`, `diagnostico-motor.jpg`, `engine-detail.jpg` which are perfect for these pages. I'll map specific images to specific solution slugs for variety.

### Technical approach

- Add a mapping of slug → image import at the top of `SolucionDetalle.tsx`
- Add a full-width banner image after PageHero (same pattern as HazteSocio)
- Wrap the process section in a 2-column grid with an image on desktop
- Use `AnimatedSection` for fade-in effects
- All images use `loading="lazy"` and `object-cover`

