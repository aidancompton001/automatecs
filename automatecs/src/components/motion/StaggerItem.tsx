"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import type { ReactNode } from "react";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
