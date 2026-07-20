"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Keyboard-accessible accordion. Every answer is server-rendered into the DOM
 * (toggled with the hidden attribute), so the content that powers the FAQPage
 * schema is always crawlable.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-mist-50 py-16 md:py-24"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          title="Frequently asked questions"
        />
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={faq.question}
                className="rounded-(--radius-card) border border-mist-200 bg-white shadow-(--shadow-card)"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900"
                  >
                    {faq.question}
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-blue-600 transition-transform duration-200 motion-reduce:transition-none",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5"
                >
                  <p className="leading-relaxed text-ink-700">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
