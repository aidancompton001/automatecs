"use client";

import { HeroSection } from "@/components/sections";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { ProductCard } from "./ProductCard";
import { CTABanner } from "@/components/sections";
import type { Product, PageContent } from "@/types";

interface CategoryPageLayoutProps {
  content: PageContent;
  products: Product[];
  backgroundImage?: string;
}

/**
 * Shared category page layout (Landa L1: DRY).
 * Each category page.tsx = thin wrapper passing slug-specific data.
 */
export function CategoryPageLayout({
  content,
  products,
  backgroundImage,
}: CategoryPageLayoutProps) {
  return (
    <>
      <HeroSection
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaHref}
        sideCallout={content.hero.sideCallout}
        backgroundImage={backgroundImage}
      />

      {/* Body Text */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {content.body.map((p, i) => (
            <ScrollReveal key={i}>
              <p className="text-gray-700 font-body leading-relaxed mb-4">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section id="produkte" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black mb-8">
              Geräterangebot
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
