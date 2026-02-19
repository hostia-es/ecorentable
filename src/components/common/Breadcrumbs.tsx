import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm flex-wrap" style={{ color: "hsl(var(--muted-foreground))" }}>
      <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors" style={{}} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}>
        <Home size={13} />
        <span>Inicio</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >{item.label}</Link>
          ) : (
            <span style={{ color: "hsl(var(--foreground))", fontWeight: 500 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
