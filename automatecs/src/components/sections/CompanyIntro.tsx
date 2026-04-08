"use client";

import { ScrollReveal } from "@/components/motion";

interface CompanyIntroProps {
  title: string;
  paragraphs: string[];
}

export function CompanyIntro({ title, paragraphs }: CompanyIntroProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black mb-8">
            {title}
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <ScrollReveal key={i}>
              <p className="text-gray-700 font-body leading-relaxed">{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
