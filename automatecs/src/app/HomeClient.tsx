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
        heroImage="/images/infographic-service-kreislauf.jpg"
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
