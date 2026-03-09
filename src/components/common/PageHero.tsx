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
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  badge,
  children,
  size = "md",
}: PageHeroProps) {
  const padding = size === "sm" ? "py-10" : size === "lg" ? "py-24" : "py-16";

  return (
    <section className={`${padding} bg-secondary`}>
      <div className="container mx-auto px-4">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {badge && (
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg max-w-2xl text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
