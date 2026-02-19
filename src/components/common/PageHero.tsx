import { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  dark?: boolean;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  badge,
  dark = true,
  children,
  size = "md",
}: PageHeroProps) {
  const padding = size === "sm" ? "py-10" : size === "lg" ? "py-24" : "py-16";

  if (dark) {
    return (
      <section className={`section-hero ${padding}`}>
        <div className="container mx-auto px-4">
          {breadcrumbs && (
            <div className="mb-4 opacity-70">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {badge && (
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "hsl(148 65% 22% / 0.5)", color: "hsl(148 72% 70%)", border: "1px solid hsl(148 72% 40% / 0.4)" }}>
                {badge}
              </span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "hsl(0 0% 100%)" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg max-w-2xl" style={{ color: "hsl(0 0% 80%)" }}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className={`${padding}`} style={{ background: "hsl(var(--secondary))" }}>
      <div className="container mx-auto px-4">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {badge && (
          <div className="mb-3">
            <span className="badge-green">{badge}</span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
