"use client";

import { useParallax } from "@/hooks/useParallax";
import { useMotion } from "./MotionProvider";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxHeroProps {
  backgroundImage?: string;
  overlayColor?: string;
  children: ReactNode;
  className?: string;
}

/**
 * 3-layer parallax hero section.
 * Layer 1 (bg): speed 0.3x — slow
 * Layer 2 (overlay): speed 0.5x — medium
 * Layer 3 (content): speed 0.8x — fast
 *
 * SSR-safe: initial offset = 0, parallax activates after mount (Landa fix L1).
 * Mobile: parallax disabled, static background.
 */
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

  return (
    <section
      ref={bgParallax.ref}
      className={`relative overflow-hidden min-h-[60vh] flex items-center ${className}`}
    >
      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
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
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
