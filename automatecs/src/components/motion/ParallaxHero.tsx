"use client";

import { useParallax } from "@/hooks/useParallax";
import { useMotion } from "./MotionProvider";
import { getImageUrl } from "@/lib/assets";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Brand gradient fallback when no image provided */
const FALLBACK_GRADIENT =
  "linear-gradient(135deg, #536942 0%, #2a2a2a 50%, #dab200 100%)";

interface ParallaxHeroProps {
  backgroundImage?: string;
  overlayColor?: string;
  children: ReactNode;
  className?: string;
}

export function ParallaxHero({
  backgroundImage,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  children,
  className = "",
}: ParallaxHeroProps) {
  const { shouldAnimate, isMobile } = useMotion();
  const bgParallax = useParallax(0.3);
  const overlayParallax = useParallax(0.5);

  const useParallaxEffect = shouldAnimate && !isMobile;

  // basePath-aware image URL (T004 fix)
  const bgStyle = backgroundImage
    ? `url(${getImageUrl(backgroundImage)})`
    : FALLBACK_GRADIENT;

  return (
    <section
      ref={bgParallax.ref}
      className={`relative overflow-hidden min-h-[60vh] flex items-center ${className}`}
    >
      {/* Layer 1: Background — fixed size, no CLS */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: bgStyle,
          transform: useParallaxEffect
            ? `translateY(${bgParallax.offset}px)`
            : undefined,
          willChange: useParallaxEffect ? "transform" : undefined,
        }}
      />

      {/* Layer 2: Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          transform: useParallaxEffect
            ? `translateY(${overlayParallax.offset}px)`
            : undefined,
        }}
      />

      {/* Layer 3: Content */}
      <motion.div
        className="relative z-10 w-full"
        initial={shouldAnimate ? { opacity: 0, y: 20, scale: 0.95 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        {children}
      </motion.div>
    </section>
  );
}
