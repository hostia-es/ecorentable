import { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

interface FeatureCardsProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeatureCards({ title, subtitle, features, columns = 3, dark = false }: FeatureCardsProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`py-14 ${dark ? "section-dark" : "section-light"}`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: dark ? "hsl(0 0% 100%)" : "hsl(var(--foreground))" }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base max-w-2xl mx-auto" style={{ color: dark ? "hsl(0 0% 70%)" : "hsl(var(--muted-foreground))" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {features.map((f, i) => (
            <div key={i} className="card-eco p-6 flex flex-col gap-3" style={dark ? { background: "hsl(0 0% 100% / 0.07)", border: "1px solid hsl(0 0% 100% / 0.15)" } : {}}>
              <div className="icon-circle w-11 h-11" style={dark ? { background: "hsl(148 65% 22% / 0.5)", color: "hsl(148 72% 60%)" } : {}}>
                {f.icon}
              </div>
              <h3 className="font-bold text-base" style={{ color: dark ? "hsl(0 0% 100%)" : "hsl(var(--foreground))" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: dark ? "hsl(0 0% 70%)" : "hsl(var(--muted-foreground))" }}>
                {f.description}
              </p>
              {f.link && (
                <Link to={f.link} className="flex items-center gap-1 text-sm font-semibold mt-auto transition-colors" style={{ color: "hsl(var(--accent-green))" }}>
                  {f.linkLabel || "Más info"} <ArrowRight size={13} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
