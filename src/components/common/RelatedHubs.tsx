import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface RelatedHubItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface RelatedHubsProps {
  /** Heading shown above the cards. Defaults to a neutral label. */
  heading?: string;
  /** Optional eyebrow shown above the heading. */
  eyebrow?: string;
  /** Hub cards to render. Pass 3-4 items for best layout. */
  items: RelatedHubItem[];
  /** When true, uses the alternate light section background. */
  alt?: boolean;
}

/**
 * RelatedHubs — uniform internal-linking block to wire the main hubs
 * (Servicios, Soluciones, Tienda, Encuentra tu centro, Socios, Blog)
 * to each other from any page. Improves SEO crawl depth and UX.
 */
export default function RelatedHubs({
  heading = "Explore otras secciones",
  eyebrow,
  items,
  alt = false,
}: RelatedHubsProps) {
  return (
    <section className={`py-14 ${alt ? "section-alt" : "section-light"}`} aria-labelledby="related-hubs-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        {eyebrow && (
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "hsl(var(--primary))" }}
          >
            {eyebrow}
          </span>
        )}
        <h2
          id="related-hubs-heading"
          className="text-2xl md:text-3xl font-bold mt-2 mb-8"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {heading}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="card-eco p-5 group hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              </div>
              <h3
                className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                {item.description}
              </p>
              <span
                className="text-xs font-semibold inline-flex items-center gap-1"
                style={{ color: "hsl(var(--primary))" }}
              >
                Ir a la sección <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
