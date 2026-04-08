"use client";

import Link from "next/link";
import { TiltCard } from "@/components/motion";
import { formatCentsCompact } from "@/lib/formatPrice";
import { getImageUrl } from "@/lib/assets";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasPrice = product.categoryPriceCents > 0;

  return (
    <TiltCard
      className={`relative bg-brand-white border border-brand-black/15 rounded-lg overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-elevation-3 ${
        product.isPlaceholder ? "opacity-70" : ""
      }`}
    >
      {/* Placeholder Badge — Landa L2 */}
      {product.isPlaceholder && (
        <div className="absolute top-3 right-3 z-10 bg-brand-gold/90 text-brand-black text-xs font-body font-medium px-2 py-1 rounded">
          Daten werden aktualisiert
        </div>
      )}

      {/* Image — fixed aspect ratio container, no CLS (T004 CEO: no layout shift) */}
      <div className="relative aspect-[3/4] bg-brand-black/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-400"
          style={{
            backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-brand-black line-clamp-2">
          {product.name}
        </h3>

        {/* Features */}
        <ul className="mt-2 space-y-1">
          {product.features.slice(0, 3).map((f, i) => (
            <li
              key={i}
              className="text-xs text-brand-black/70 font-body flex items-start gap-1"
            >
              <span className="text-brand-green mt-0.5">&#x2022;</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between">
          {hasPrice ? (
            <span className="font-heading font-semibold text-brand-green">
              ab {formatCentsCompact(product.categoryPriceCents)},- €
            </span>
          ) : (
            <span className="font-heading font-medium text-sm text-brand-gold">
              Preis auf Anfrage
            </span>
          )}

          <Link
            href={
              product.hasConfigurator
                ? `/automaten/${product.slug}/`
                : `/kontakt/`
            }
            className="text-sm font-body font-medium text-brand-black hover:text-brand-green transition-colors"
          >
            {product.hasConfigurator ? "Konfiguration →" : "Anfragen →"}
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
