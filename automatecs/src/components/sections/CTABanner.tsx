"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion";

interface CTABannerProps {
  text?: string;
  href?: string;
}

export function CTABanner({
  text = "Fordern Sie jetzt Ihr Angebot an",
  href = "/kontakt/",
}: CTABannerProps) {
  return (
    <section className="py-16 md:py-20 bg-brand-green">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-white mb-8">
            {text}
          </h2>
          <Link
            href={href}
            className="inline-block px-4 md:px-8 py-3 md:py-4 bg-brand-yellow text-brand-black font-heading font-semibold text-sm md:text-lg uppercase tracking-normal md:tracking-wide hover:bg-brand-gold hover:scale-103 hover:shadow-elevation-3 transition-all duration-300"
          >
            Kontakt aufnehmen
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
