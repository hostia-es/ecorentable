import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34605928626"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{
        background: "linear-gradient(135deg, hsl(142 70% 45%), hsl(142 70% 38%))",
        boxShadow: "0 4px 20px hsl(142 70% 40% / 0.4)",
      }}
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}
