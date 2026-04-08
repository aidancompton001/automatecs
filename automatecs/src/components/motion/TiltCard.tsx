"use client";

import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useMotion } from "./MotionProvider";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
}

/**
 * 3D tilt card with perspective effect.
 * Follows mouse position → rotateX/Y.
 * Resets on mouse leave (Landa fix L2).
 * Mobile: tilt disabled, plain card.
 */
export function TiltCard({
  children,
  className = "",
  maxDeg = 5,
}: TiltCardProps) {
  const { shouldAnimate } = useMotion();
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(maxDeg);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
