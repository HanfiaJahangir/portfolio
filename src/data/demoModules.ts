import type { DemoModule } from "@/types/portfolio";

export const demoModules: DemoModule[] = [
  {
    slug: "pooling-visualizer",
    title: "Object Pooling Visualizer",
    status: "scaffolded",
    summary:
      "A future lightweight module for demonstrating spawn budgets, reuse, and GC-conscious runtime behavior.",
    systems: ["Pooling", "Mobile Optimization", "Frame Pacing"]
  },
  {
    slug: "event-flow-map",
    title: "Event-Driven Gameplay Flow",
    status: "planned",
    summary:
      "A future interactive diagram showing how gameplay events move between systems without tight scene coupling.",
    systems: ["Events", "Architecture", "Debuggability"]
  },
  {
    slug: "network-state-timeline",
    title: "Network State Timeline",
    status: "planned",
    summary:
      "A future module for explaining server state, client feedback, and multiplayer session resolution.",
    systems: ["Multiplayer", "State Sync", "PVP"]
  }
];
