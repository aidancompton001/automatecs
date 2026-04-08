"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ParallaxHero } from "@/components/motion";
import { useMotion } from "@/components/motion";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  sideCallout?: string;
  backgroundImage?: string;
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  sideCallout,
  backgroundImage,
}: HeroSectionProps) {
  const { shouldAnimate } = useMotion();

  return (
    <ParallaxHero
      backgroundImage={backgroundImage}
      overlayColor="rgba(26, 26, 26, 0.6)"
      className="min-h-[70vh]"
    >
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-2xl">
          {/* Headline */}
          <motion.h1
            className="font-heading text-3xl md:text-5xl font-bold text-brand-white leading-tight"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-4 md:mt-6 text-lg md:text-xl text-gray-200 font-body"
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

          {/* CTA Button */}
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
              className="mt-8 inline-block px-8 py-4 bg-brand-yellow text-brand-black font-heading font-semibold text-lg uppercase tracking-wide hover:bg-brand-gold transition-colors"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>

        {/* Side Callout */}
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
