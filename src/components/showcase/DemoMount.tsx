"use client";

import dynamic from "next/dynamic";
import type { DemoModule } from "@/types/portfolio";

const LightweightDemoSurface = dynamic(
  () =>
    import("@/components/showcase/LightweightDemoSurface").then(
      (mod) => mod.LightweightDemoSurface
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Preparing demo surface
      </div>
    )
  }
);

const UnityWebGLShell = dynamic(
  () => import("@/components/showcase/UnityWebGLShell").then((mod) => mod.UnityWebGLShell),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Preparing Unity WebGL shell
      </div>
    )
  }
);

const BikeDriftDemo = dynamic(
  () => import("@/components/demos/bike-drift/BikeDriftDemo").then((mod) => mod.BikeDriftDemo),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Loading bike drift controller
      </div>
    )
  }
);

const MotoMaxRaceDemo = dynamic(
  () => import("@/components/demos/moto-max/MotoMaxRaceDemo").then((mod) => mod.MotoMaxRaceDemo),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Loading Moto Max circuit
      </div>
    )
  }
);

const HeroSurvivorDemo = dynamic(
  () => import("@/components/demos/survivor/HeroSurvivorDemo").then((mod) => mod.HeroSurvivorDemo),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Loading survivor combat chamber
      </div>
    )
  }
);

const AnnoyingBossDemo = dynamic(
  () => import("@/components/demos/punch/AnnoyingBossDemo").then((mod) => mod.AnnoyingBossDemo),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-panel/70 text-sm text-muted">
        Loading punch interaction lab
      </div>
    )
  }
);

type DemoMountProps = {
  demo: DemoModule;
};

export function DemoMount({ demo }: DemoMountProps) {
  if (demo.slug === "moto-max-track-race") {
    return <MotoMaxRaceDemo />;
  }

  if (demo.slug === "bike-drift-mechanic") {
    return <BikeDriftDemo />;
  }

  if (demo.slug === "hero-survivor-wave-slice") {
    return <HeroSurvivorDemo />;
  }

  if (demo.slug === "annoying-boss-punch-slice") {
    return <AnnoyingBossDemo />;
  }

  if (demo.renderer === "unity-webgl") {
    return <UnityWebGLShell demo={demo} />;
  }

  return <LightweightDemoSurface demo={demo} />;
}
