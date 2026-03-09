import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface CTABoxProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: ReactNode;
}

export default function CTABox({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  children,
}: CTABoxProps) {
  return (
    <section className="py-16 bg-primary/5 border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{title}</h2>
        {description && (
          <p className="text-base mb-8 max-w-xl mx-auto text-muted-foreground">{description}</p>
        )}
        {children}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to={primaryHref}>
              {primaryLabel} <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
