import { theme } from "@/config/theme";

export const animationDurations = theme.motion.duration;
export const animationEasings = theme.motion.ease;

export const transitionDefaults = {
  duration: animationDurations.base,
  ease: animationEasings.standard
} as const;
