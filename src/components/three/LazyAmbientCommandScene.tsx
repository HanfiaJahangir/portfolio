"use client";

import { lazyClientComponent } from "@/systems/performance/lazy";
import type { ExperienceTier } from "@/config/experience";

type LazyAmbientCommandSceneProps = {
  tier?: ExperienceTier;
};

const AmbientCommandScene = lazyClientComponent<LazyAmbientCommandSceneProps>(
  () =>
    import("@/components/three/AmbientCommandScene").then((mod) => ({
      default: mod.AmbientCommandScene
    })),
  { loadingLabel: "Booting command environment" }
);

export function LazyAmbientCommandScene({ tier }: LazyAmbientCommandSceneProps) {
  return <AmbientCommandScene tier={tier} />;
}
