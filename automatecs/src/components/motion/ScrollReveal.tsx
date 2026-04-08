"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { useMotion } from "./MotionProvider";
import type { ReactNode } from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const { shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
