import type { Variants, Transition } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const cardTilt: Variants = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const priceSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};
