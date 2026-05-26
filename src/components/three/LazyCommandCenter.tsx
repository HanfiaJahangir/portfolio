"use client";

import { lazyClientComponent } from "@/systems/performance/lazy";

const FoundationScene = lazyClientComponent<Record<string, never>>(
  () =>
    import("@/components/three/FoundationScene").then((mod) => ({ default: mod.FoundationScene })),
  { loadingLabel: "Preparing scene" }
);

export function LazyCommandCenter() {
  return <FoundationScene />;
}
