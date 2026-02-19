import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface CTABoxProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
  children?: ReactNode;
}

export default function CTABox({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  dark = true,
  children,
}: CTABoxProps) {
  if (dark) {
    return (
      <section className="section-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 100%)" }}>
            {title}
          </h2>
          {description && (
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "hsl(0 0% 70%)" }}>
              {description}
            </p>
          )}
          {children}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={primaryHref} className="btn-cta">
              {primaryLabel} <ArrowRight size={16} />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link to={secondaryHref} className="btn-outline-white">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ background: "hsl(var(--accent-green-light))" }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--primary))" }}>
          {title}
        </h2>
        {description && (
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "hsl(var(--foreground))" }}>
            {description}
          </p>
        )}
        {children}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={primaryHref} className="btn-primary">
            {primaryLabel} <ArrowRight size={16} />
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link to={secondaryHref} className="btn-secondary">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
