"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion-variants";
import { useMotion } from "./MotionProvider";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {
  const { shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
