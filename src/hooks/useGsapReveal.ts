"use client";

import { useEffect, useRef } from "react";
import { configureGsap } from "@/systems/animation/gsap";

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const gsap = configureGsap();
    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }, ref);

    return () => context.revert();
  }, []);

  return ref;
}
