"use client";

import { HeroSection, CTABanner } from "@/components/sections";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import type { PageContent, CompanyInfo } from "@/types";

interface Props {
  content: PageContent;
  company: CompanyInfo;
}

export function UnternehmenClient({ content, company }: Props) {
  return (
    <>
      <HeroSection
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaHref}
        sideCallout={content.hero.sideCallout}
        
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

      {/* Company Facts */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold text-brand-black mb-8">
              Automatecs auf einen Blick
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaggerItem>
              <div className="bg-brand-white p-6 border border-gray-200 rounded-lg">
                <p className="font-heading text-3xl font-bold text-brand-green">30+</p>
                <p className="text-sm text-gray-600 font-body mt-1">Jahre Erfahrung</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-brand-white p-6 border border-gray-200 rounded-lg">
                <p className="font-heading text-3xl font-bold text-brand-green">24/7</p>
                <p className="text-sm text-gray-600 font-body mt-1">Service & Wartung</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-brand-white p-6 border border-gray-200 rounded-lg">
                <p className="font-heading text-lg font-bold text-brand-black">{company.type}</p>
                <p className="text-sm text-gray-600 font-body mt-1">Unternehmensform</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-brand-white p-6 border border-gray-200 rounded-lg">
                <p className="font-heading text-lg font-bold text-brand-black">{company.region}</p>
                <p className="text-sm text-gray-600 font-body mt-1">Einsatzgebiet</p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Services */}
          <ScrollReveal className="mt-8">
            <h3 className="font-heading text-xl font-bold text-brand-black mb-4">
              Unsere Leistungen
            </h3>
            <div className="flex flex-wrap gap-3">
              {company.services.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 bg-brand-green/10 text-brand-green font-body text-sm font-medium rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
