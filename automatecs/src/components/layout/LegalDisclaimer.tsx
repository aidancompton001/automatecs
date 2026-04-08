"use client";

import { ScrollReveal } from "@/components/motion";

/**
 * Disclaimer banner for legal pages with incomplete content.
 * Landa L1: visible warning that page is being updated.
 */
export function LegalDisclaimer() {
  return (
    <ScrollReveal>
      <div className="bg-brand-yellow/20 border-2 border-brand-yellow/50 rounded-lg p-4 mb-8">
        <p className="text-sm font-body text-brand-black">
          <strong>Hinweis:</strong> Diese Seite wird derzeit aktualisiert.
          Einige Angaben werden in Kürze ergänzt. Für rechtliche Fragen
          kontaktieren Sie uns bitte unter{" "}
          <a
            href="mailto:info@automatecs.de"
            className="text-brand-green underline"
          >
            info@automatecs.de
          </a>{" "}
          oder telefonisch unter{" "}
          <a href="tel:04172987470" className="text-brand-green underline">
            04172 98 74 700
          </a>
          .
        </p>
      </div>
    </ScrollReveal>
  );
}
