"use client";

import { configureGsap } from "@/systems/animation/gsap";

export type ScrollAnimationConfig = {
  selector: string;
  y?: number;
  duration?: number;
};

export async function prepareScrollAnimations() {
  const gsap = configureGsap();
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
