import type { Variants } from "framer-motion";
import { animationDurations, animationEasings } from "@/systems/animation/constants";

export const pageTransition = {
  duration: animationDurations.slow,
  ease: animationEasings.entrance
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: pageTransition
  }
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animationDurations.base,
      ease: animationEasings.standard
    }
  }
};
