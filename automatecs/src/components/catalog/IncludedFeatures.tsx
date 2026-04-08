"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

interface IncludedFeaturesProps {
  features: string[];
}

export function IncludedFeatures({ features }: IncludedFeaturesProps) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h3 className="font-heading text-xl font-semibold text-brand-black mb-6">
          Ausstattung ohne Aufpreis
        </h3>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <StaggerItem key={i}>
            <div className="flex items-start gap-2 text-sm font-body text-brand-black/80">
              <span className="text-brand-green mt-0.5 shrink-0">✓</span>
              <span>{feature}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
