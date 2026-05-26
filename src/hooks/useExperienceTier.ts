"use client";

import { useEffect, useState } from "react";
import type { ExperienceTier } from "@/config/experience";

function getTier(width: number): ExperienceTier {
  if (width >= 1024) {
    return "desktop";
  }

  if (width >= 768) {
    return "tablet";
  }

  return "mobile";
}

export function useExperienceTier() {
  const [tier, setTier] = useState<ExperienceTier>("desktop");

  useEffect(() => {
    const updateTier = () => setTier(getTier(window.innerWidth));
    updateTier();
    window.addEventListener("resize", updateTier);
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return tier;
}
