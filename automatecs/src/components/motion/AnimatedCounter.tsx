"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMotion } from "./MotionProvider";
import { formatCentsToEUR } from "@/lib/formatPrice";

interface AnimatedCounterProps {
  /** Value in cents (e.g. 829000 = 8.290,00 €) */
  valueCents: number;
  className?: string;
}

/**
 * Animated price counter.
 * Animates INTEGER cents, formats AFTER via formatPrice.ts (single source of truth — Landa L1).
 * Uses spring animation for smooth transitions.
 */
export function AnimatedCounter({
  valueCents,
  className = "",
}: AnimatedCounterProps) {
  const { shouldAnimate } = useMotion();
  const [displayValue, setDisplayValue] = useState(
    formatCentsToEUR(valueCents)
  );

  const spring = useSpring(valueCents, {
    stiffness: 300,
    damping: 20,
  });

  const formatted = useTransform(spring, (v) =>
    formatCentsToEUR(Math.round(v))
  );

  useEffect(() => {
    spring.set(valueCents);
  }, [valueCents, spring]);

  useEffect(() => {
    const unsubscribe = formatted.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [formatted]);

  if (!shouldAnimate) {
    return <span className={className}>{formatCentsToEUR(valueCents)}</span>;
  }

  return <motion.span className={className}>{displayValue}</motion.span>;
}
