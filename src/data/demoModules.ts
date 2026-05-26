import type { DemoModule } from "@/types/portfolio";

export const demoModules: DemoModule[] = [
  {
    slug: "moto-max-track-race",
    title: "Moto Max Track Race",
    status: "available",
    summary:
      "A lightweight closed-circuit arcade racing slice with one lap, AI racers, dynamic camera feedback, rank UI, and a cinematic finish overlay.",
    systems: ["Closed Track", "AI Racers", "Dynamic Camera"],
    projectSlug: "moto-max",
    renderer: "r3f",
    route: "/demos/moto-max-track-race"
  },
  {
    slug: "bike-drift-mechanic",
    title: "Bike Drift Mechanic",
    status: "available",
    summary:
      "A lightweight React Three Fiber highway drifting slice for traffic avoidance, drift lane cuts, crash/reset handling, camera follow, and police-chase pressure framing.",
    systems: ["Drift Controller", "Traffic Avoidance", "Camera Feedback"],
    projectSlug: "bike-drift-master",
    renderer: "r3f",
    route: "/demos/bike-drift-mechanic"
  },
  {
    slug: "hero-survivor-wave-slice",
    title: "Hero Survivor Wave Slice",
    status: "available",
    summary:
      "A lightweight top-down combat chamber for wave escalation, projectile pressure, pickup collection, and power-growth feedback.",
    systems: ["Enemy Waves", "Projectile Events", "Pickup Progression"],
    projectSlug: "alien-survivor",
    renderer: "dom",
    route: "/demos/hero-survivor-wave-slice"
  },
  {
    slug: "network-state-timeline",
    title: "Network State Timeline",
    status: "planned",
    summary:
      "A future module for explaining server state, client feedback, and multiplayer session resolution.",
    systems: ["Multiplayer", "State Sync", "PVP"],
    renderer: "dom",
    route: "/demos/network-state-timeline"
  },
  {
    slug: "annoying-boss-punch-slice",
    title: "Annoying Boss Punch Slice",
    status: "available",
    summary:
      "A lightweight interaction slice for stretchy glove charge, target impact, stage progression, and readable hit feedback timing.",
    systems: ["Stretch Input", "Hit Reactions", "Feedback Events"],
    projectSlug: "asmr-punch",
    renderer: "dom",
    route: "/demos/annoying-boss-punch-slice"
  },
  {
    slug: "unity-webgl-slot",
    title: "Unity WebGL Demo Slot",
    status: "scaffolded",
    summary:
      "Architecture-only shell for future Unity WebGL builds with async loading, fallback states, and memory-safe mounting.",
    systems: ["Unity WebGL", "Async Loader", "Isolated Mount"],
    renderer: "unity-webgl",
    route: "/demos/unity-webgl-slot"
  }
];

export function getDemoModuleBySlug(slug: string) {
  return demoModules.find((demo) => demo.slug === slug);
}
