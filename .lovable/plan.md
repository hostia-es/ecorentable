

## Plan: Apply Shadcn UI Components + Remove World Map

### What we'll do

1. **Remove the World Map** -- Delete the entire `WorldMap` component from `Index.tsx` and the §10 WORLD MAP section. Remove all world-map CSS from `index.css` (lines 284-480). Keep the "Red nacional" text/CTA but render it as a simple centered section without the SVG map.

2. **Replace custom FAQ with Shadcn Accordion** -- Replace the custom `FaqItem` component with `@radix-ui/react-accordion` via the existing `src/components/ui/accordion.tsx`. This gives proper accessible expand/collapse with smooth animations.

3. **Replace custom buttons with Shadcn Button** -- Replace inline `btn-cta`, `btn-outline`, `btn-outline-white` class usage with the Shadcn `<Button>` component (already exists). Use `variant="default"` for primary CTAs, `variant="outline"` for secondary, and custom styling for dark-section white buttons. Wrap with `<Link>` using `asChild`.

4. **Apply Shadcn Card to feature grids and testimonials** -- Use the existing `<Card>`, `<CardHeader>`, `<CardContent>` components for:
   - Hy-Carbon Connect 6-feature grid
   - Carbon FAP bullet cards  
   - Socios metric cards
   - Testimonial cards

5. **Apply Shadcn Separator** -- Replace manual `border-t` dividers with `<Separator>` component for consistency.

6. **Apply Shadcn Badge** -- Use `<Badge>` for taglines/labels instead of raw styled `<p>` elements.

7. **Clean up inline styles** -- Replace repetitive `style={{ color: "hsl(var(--muted-foreground))" }}` with Tailwind classes like `text-muted-foreground`, `text-foreground`, `bg-secondary`, etc.

### Files changed

- **`src/pages/Index.tsx`** -- Major refactor: remove WorldMap, import Shadcn components (Accordion, Button, Card, Badge, Separator), replace all custom elements with Shadcn equivalents
- **`src/index.css`** -- Remove world-map CSS (lines 284-480), keep custom utility classes that aren't replaced by Shadcn

### Section-by-section changes

| Section | Change |
|---------|--------|
| WorldMap component (lines 18-68) | Delete entirely |
| FaqItem component (lines 71-83) | Delete, use Accordion |
| Hero CTAs | `<Button>` + `asChild` with Link |
| §3 Hy-Carbon features grid | `<Card>` + `<CardContent>` |
| §4 Process steps | `<Card>` with dark variant styling |
| §5 Carbon FAP | Shadcn components |
| §6 Socios metrics | `<Card>` for metric boxes |
| §7 Testimonials | `<Card>` |
| §9 FAQ | `<Accordion>` + `<AccordionItem>` + `<AccordionTrigger>` + `<AccordionContent>` |
| §10 World Map section | Remove SVG map, keep text + CTA as simple centered section |
| All taglines | `<Badge variant="secondary">` or styled Badge |

