"use client";

import { ScrollReveal } from "@/components/motion";
import { LegalDisclaimer } from "@/components/layout/LegalDisclaimer";
import type { LegalDocument } from "@/lib/legal";

interface Props {
  doc: LegalDocument;
}

export function ImpressumClient({ doc }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-8">
            {doc.title}
          </h1>
        </ScrollReveal>

        <LegalDisclaimer />

        {doc.sections.map((section, i) => (
          <ScrollReveal key={i}>
            <div className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-brand-black mb-3">
                {section.heading}
              </h2>
              <div className="font-body text-brand-black/80 leading-relaxed whitespace-pre-line break-words">
                {section.content}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
