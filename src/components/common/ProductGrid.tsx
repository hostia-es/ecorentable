import { Link } from "react-router-dom";
import { ArrowRight, Star, Tag } from "lucide-react";
import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showCategory?: boolean;
}

export default function ProductGrid({ products, title, subtitle, showCategory = true }: ProductGridProps) {
  return (
    <div>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>{title}</h2>}
          {subtitle && <p className="text-base max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/${product.slug}`} className="product-card block">
            <div className="relative h-40 flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Tag size={28} color="white" />
              </div>
              {product.badge && (
                <span className="absolute top-3 right-3 badge-green text-xs">{product.badge}</span>
              )}
              {showCategory && (
                <span className="absolute top-3 left-3 text-xs rounded-full px-2 py-0.5 font-medium" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
                  {product.category}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-base mb-1" style={{ color: "hsl(var(--foreground))" }}>{product.name}</h3>
              <p className="text-sm mb-3 line-clamp-2" style={{ color: "hsl(var(--muted-foreground))" }}>{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base" style={{ color: "hsl(var(--primary))" }}>{product.price}</span>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: "hsl(var(--accent-green))" }}>
                  Ver detalles <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
