import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  dark?: boolean;
}

export default function FAQSection({ title = "Preguntas frecuentes", items, dark = false }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={`py-14 ${dark ? "section-dark" : "section-light"}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: dark ? "hsl(0 0% 100%)" : "hsl(var(--foreground))" }}>
              {title}
            </h2>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="faq-item" style={{ borderColor: dark ? "hsl(0 0% 100% / 0.15)" : "hsl(var(--border))", background: dark ? "hsl(0 0% 100% / 0.05)" : "hsl(var(--card))" }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm"
                  style={{ color: dark ? "hsl(0 0% 95%)" : "hsl(var(--foreground))" }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{item.question}</span>
                  {open === i ? <ChevronUp size={16} style={{ color: "hsl(var(--accent-green))", flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />}
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: dark ? "hsl(0 0% 70%)" : "hsl(var(--muted-foreground))" }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
