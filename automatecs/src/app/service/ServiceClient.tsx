"use client";

import { HeroSection, CTABanner } from "@/components/sections";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import type { PageContent } from "@/types";

interface Props {
  content: PageContent;
}

export function ServiceClient({ content }: Props) {
  return (
    <>
      <HeroSection
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaHref}
        sideCallout={content.hero.sideCallout}
        backgroundImage="/images/hero-service.jpg"
      />

      {/* Body Text */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {content.body.map((p, i) => (
            <ScrollReveal key={i}>
              <p className="text-gray-700 font-body leading-relaxed mb-4 text-lg">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Two-Column Sections: Vollservice + Vorteile */}
      {content.sections && content.sections.length >= 2 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {content.sections.map((section, sIdx) => (
                <ScrollReveal key={sIdx}>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-black mb-6">
                      {section.title}
                    </h3>
                    <StaggerContainer className="space-y-3">
                      {section.items.map((item, iIdx) => (
                        <StaggerItem key={iIdx}>
                          <div className="flex items-start gap-3">
                            <span className="text-brand-green mt-1 shrink-0">✓</span>
                            <p className="text-gray-700 font-body">{item}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
