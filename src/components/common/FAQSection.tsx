import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  return (
    <section className={`py-14 ${dark ? "section-dark" : "section-light"}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-2xl md:text-3xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
              {title}
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={`rounded-lg border px-1 ${dark ? "border-white/15 bg-white/5" : "border-border bg-card"}`}
              >
                <AccordionTrigger className={`px-4 py-4 text-sm font-semibold hover:no-underline ${dark ? "text-white/95" : "text-foreground"}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={`px-4 pb-4 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
