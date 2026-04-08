"use client";

import { HeroSection } from "@/components/sections";
import { ScrollReveal } from "@/components/motion";
import { SpecsTable } from "./SpecsTable";
import { PriceCalculator } from "./PriceCalculator";
import { IncludedFeatures } from "./IncludedFeatures";
import { CTABanner } from "@/components/sections";
import { formatCentsToEUR } from "@/lib/formatPrice";
import type { Product, Option } from "@/types";

interface ProductDetailProps {
  product: Product;
  options: Option[];
  includedFeatures: string[];
}

export function ProductDetail({
  product,
  options,
  includedFeatures,
}: ProductDetailProps) {
  return (
    <>
      {/* Hero */}
      <HeroSection
        headline={product.name}
        subheadline={
          product.hasConfigurator
            ? `Gesamtpreis inklusiv Ihrer Wunschausstattung ${formatCentsToEUR(product.basePriceCents)}`
            : "Preis auf Anfrage"
        }
        ctaText={product.hasConfigurator ? "Konfigurieren" : "Angebot anfordern"}
        ctaHref={product.hasConfigurator ? "#konfigurator" : "/kontakt/"}
        backgroundImage={product.imageUrl}
      />

      {/* Description */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-gray-700 font-body leading-relaxed text-lg">
              {product.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Specs Table — only if specs exist */}
      {product.specs && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-brand-black mb-6">
                Technische Daten
              </h2>
            </ScrollReveal>
            <SpecsTable specs={product.specs} />
          </div>
        </section>
      )}

      {/* Price Calculator — only if hasConfigurator */}
      {product.hasConfigurator && (
        <section id="konfigurator" className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-brand-black mb-2">
                Ihre Wunschausstattung
              </h2>
              <p className="text-sm text-gray-500 font-body mb-8">
                Wählen Sie Ihre Zusatzoptionen — der Gesamtpreis wird automatisch berechnet.
              </p>
            </ScrollReveal>
            <PriceCalculator
              basePriceCents={product.basePriceCents}
              options={options}
            />
          </div>
        </section>
      )}

      {/* No configurator → Preis auf Anfrage CTA */}
      {!product.hasConfigurator && (
        <section className="py-12 text-center">
          <div className="max-w-md mx-auto px-4">
            <ScrollReveal>
              <p className="font-heading text-xl font-semibold text-brand-gold mb-4">
                Preis auf Anfrage
              </p>
              <a
                href="mailto:info@automatecs.de?subject=Anfrage%20{product.name}"
                className="inline-block px-8 py-4 bg-brand-green text-brand-white font-heading font-semibold uppercase tracking-wide hover:bg-brand-black transition-colors"
              >
                Angebot anfordern
              </a>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Included Features */}
      <div className="max-w-4xl mx-auto px-4">
        <IncludedFeatures features={includedFeatures} />
      </div>

      <CTABanner />
    </>
  );
}
