"use client";

import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { formatCentsCompact } from "@/lib/formatPrice";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
  /** Minimum price per category in cents (for "ab X €" display — Landa L2) */
  minPrices: Record<string, number>;
}

const CATEGORY_ICONS: Record<string, string> = {
  snackautomaten: "🍫",
  kaltgetraenkeautomaten: "🥤",
  kaffeeautomaten: "☕",
  wasserspender: "💧",
};

export function CategoryGrid({ categories, minPrices }: CategoryGridProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black text-center mb-12">
          Unser Automaten-Programm
        </h2>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const minPrice = minPrices[cat.slug] ?? 0;

            return (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/automaten/${cat.slug}/`}
                  className="group block bg-brand-white border border-gray-200 rounded-lg p-6 hover:shadow-elevation-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Icon placeholder — will be replaced by real images */}
                  <div className="text-4xl mb-4">
                    {CATEGORY_ICONS[cat.slug] ?? "📦"}
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-brand-black group-hover:text-brand-green transition-colors">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 font-body line-clamp-2">
                    {cat.subheadline}
                  </p>

                  {/* Price — Landa L2 */}
                  {minPrice > 0 && (
                    <p className="mt-3 text-sm font-heading font-semibold text-brand-green">
                      ab {formatCentsCompact(minPrice)},- €
                    </p>
                  )}
                  {minPrice === 0 && (
                    <p className="mt-3 text-sm font-heading font-medium text-brand-gold">
                      Preis auf Anfrage
                    </p>
                  )}
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
