"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion";
import { CTABanner } from "@/components/sections";

export function ZubehoerClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-brand-black">
              Zubehör
            </h1>
            <p className="mt-6 font-body text-lg text-brand-black/70 max-w-2xl mx-auto">
              Unser Zubehör-Sortiment wird derzeit aktualisiert. Kontaktieren
              Sie uns für individuelle Informationen zu Zubehörteilen für Ihre
              Automaten.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming Soon + CTA — Landa L2 */}
      <section className="py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="bg-brand-yellow/10 border-2 border-brand-yellow/30 rounded-lg p-8">
              <p className="font-heading text-xl font-semibold text-brand-black mb-2">
                Demnächst verfügbar
              </p>
              <p className="font-body text-brand-black/70 mb-6">
                Ähnliche Kachelansicht für Zubehörteile folgt in Kürze.
              </p>
              <Link
                href="/kontakt/"
                className="inline-block px-8 py-4 bg-brand-green text-brand-white font-heading font-semibold uppercase tracking-wide hover:bg-brand-black transition-colors"
              >
                Kontaktieren Sie uns für Zubehör
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
