import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function CartFAB() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const [pulse, setPulse] = useState(false);

  // Show on /tienda* and on the checkout page
  const visible = pathname.startsWith("/tienda");

  useEffect(() => {
    if (count === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [count]);

  if (!visible || pathname === "/tienda/checkout") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 right-5 z-40"
      >
        <Link
          to="/tienda/checkout"
          aria-label={`Ver solicitud (${count} productos)`}
          className={`relative flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-xl px-5 py-3 font-semibold text-sm hover:shadow-2xl transition-all hover:-translate-y-0.5 ${
            pulse ? "ring-4 ring-primary/30" : ""
          }`}
        >
          <ShoppingCart size={18} />
          <span>Mi solicitud</span>
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-primary text-xs font-bold">
              {count}
            </span>
          )}
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
