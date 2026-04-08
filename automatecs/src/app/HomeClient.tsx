"use client";

import { HeroSection, CategoryGrid, CompanyIntro, CTABanner } from "@/components/sections";
import type { PageContent, Category } from "@/types";

interface HomeClientProps {
  content: PageContent;
  categories: Category[];
  minPrices: Record<string, number>;
}

export function HomeClient({ content, categories, minPrices }: HomeClientProps) {
  return (
    <>
      <HeroSection
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaHref}
        sideCallout={content.hero.sideCallout}
        
      />

      <CategoryGrid categories={categories} minPrices={minPrices} />

      <CompanyIntro
        title="Automatecs — Ihr kompetenter Partner für Verkaufsautomaten"
        paragraphs={content.body}
      />

      <CTABanner />
    </>
  );
}
