"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxHero } from "@/components/motion";
import { useMotion } from "@/components/motion";
import { getImageUrl } from "@/lib/assets";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  sideCallout?: string;
  backgroundImage?: string;
  heroImage?: string;
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  sideCallout,
  backgroundImage,
  heroImage,
}: HeroSectionProps) {
  const { shouldAnimate } = useMotion();

  /* ── Split Hero: text left + image right (T008) ── */
  if (heroImage) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left: Text on Charcoal */}
        <div className="bg-brand-charcoal flex items-center">
          <div className="w-full px-4 md:px-12 py-12 md:py-24">
            <motion.h1
              className="font-heading text-3xl md:text-5xl font-bold text-brand-white leading-tight"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              {headline}
            </motion.h1>

            <motion.p
              className="mt-4 md:mt-6 text-lg md:text-xl text-brand-white/80 font-body"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut" as const,
                delay: 0.15,
              }}
            >
              {subheadline}
            </motion.p>

            {/* CTA — T007 responsive fixes preserved */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut" as const,
                delay: 0.3,
              }}
            >
              <Link
                href={ctaHref}
                className="mt-6 md:mt-8 inline-block px-4 md:px-8 py-3 md:py-4 bg-brand-yellow text-brand-black font-heading font-semibold text-sm md:text-lg uppercase tracking-normal md:tracking-wide hover:bg-brand-gold transition-colors"
              >
                {ctaText}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right: Infographic on Warm White */}
        <motion.div
          className="bg-brand-warm-white flex items-center justify-center p-4 md:p-8"
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
        >
          <a
            href={getImageUrl(heroImage)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer"
          >
            <Image
              src={getImageUrl(heroImage)}
              alt="Automatecs Service-Kreislauf — Beratung, Konfiguration, Lieferung, Einweisung, Betrieb, Wartung"
              width={1460}
              height={820}
              className="w-full h-auto object-contain"
              priority
            />
          </a>
        </motion.div>
      </section>
    );
  }

  /* ── Default: ParallaxHero with gradient/image (category pages etc.) ── */
  return (
    <ParallaxHero
      backgroundImage={backgroundImage}
      overlayColor="rgba(26, 26, 26, 0.6)"
      className="min-h-[70vh]"
    >
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-2xl">
          <motion.h1
            className="font-heading text-3xl md:text-5xl font-bold text-brand-white leading-tight"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mt-4 md:mt-6 text-lg md:text-xl text-brand-white/80 font-body"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut" as const,
              delay: 0.15,
            }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut" as const,
              delay: 0.3,
            }}
          >
            <Link
              href={ctaHref}
              className="mt-6 md:mt-8 inline-block px-4 md:px-8 py-3 md:py-4 bg-brand-yellow text-brand-black font-heading font-semibold text-sm md:text-lg uppercase tracking-normal md:tracking-wide hover:bg-brand-gold transition-colors"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>

        {sideCallout && (
          <motion.div
            className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2"
            initial={shouldAnimate ? { opacity: 0, x: 30 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut" as const,
              delay: 0.5,
            }}
          >
            <a
              href="tel:04172987470"
              className="writing-mode-vertical text-sm text-brand-yellow font-body tracking-wider hover:text-brand-white transition-colors"
              style={{ writingMode: "vertical-rl" }}
            >
              {sideCallout}
            </a>
          </motion.div>
        )}
      </div>
    </ParallaxHero>
  );
}
