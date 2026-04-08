"use client";

import { HeroSection, CategoryGrid, CTABanner } from "@/components/sections";
import type { Category } from "@/types";

interface Props {
  categories: Category[];
  minPrices: Record<string, number>;
}

export function AutomatenLandingClient({ categories, minPrices }: Props) {
  return (
    <>
      <HeroSection
        headline="Unser Automaten-Programm"
        subheadline="Individuell konfiguriert — mit kundenfreundlicher Technik."
        ctaText="Kategorien ansehen"
        ctaHref="#kategorien"
        
      />

      <section id="kategorien">
        <CategoryGrid categories={categories} minPrices={minPrices} />
      </section>

      <CTABanner />
    </>
  );
}
