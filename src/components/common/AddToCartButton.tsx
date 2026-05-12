import { useState } from "react";
import { Plus, Check, Minus } from "lucide-react";
import { useCart, CartItem } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">;
  variant?: "primary" | "outline" | "compact";
  withQuantity?: boolean;
  label?: string;
  className?: string;
}

export default function AddToCartButton({
  product,
  variant = "primary",
  withQuantity = false,
  label = "Añadir a solicitud",
  className = "",
}: AddToCartButtonProps) {
  const { add, items } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.find((i) => i.slug === product.slug);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    toast({
      title: "Añadido a tu solicitud",
      description: `${product.name}${qty > 1 ? ` × ${qty}` : ""} · revisa y envía cuando quieras.`,
    });
  };

  const base =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline"
        ? "btn-secondary"
        : "inline-flex items-center justify-center gap-1 rounded-md border border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-2.5 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors";

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`${base} ${className}`}
        aria-label={`Añadir ${product.name} a la solicitud`}
      >
        {justAdded ? <Check size={13} /> : <Plus size={13} />}
        {justAdded ? "Añadido" : "Añadir"}
      </button>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {withQuantity && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-background p-1 w-fit">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setQty((q) => Math.max(1, q - 1));
            }}
            className="w-8 h-8 flex items-center justify-center rounded text-foreground hover:bg-muted"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-foreground">{qty}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setQty((q) => Math.min(99, q + 1));
            }}
            className="w-8 h-8 flex items-center justify-center rounded text-foreground hover:bg-muted"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={handleAdd}
        className={`${base} w-full justify-center flex items-center gap-2`}
      >
        {justAdded ? <Check size={15} /> : <Plus size={15} />}
        {justAdded ? "Añadido a tu solicitud" : label}
      </button>
      {inCart && !justAdded && (
        <p className="text-[11px] text-muted-foreground text-center">
          Ya en tu solicitud · {inCart.quantity} ud.
        </p>
      )}
    </div>
  );
}
