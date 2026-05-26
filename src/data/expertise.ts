import type { ExpertiseArea, SystemCapability } from "@/types/portfolio";

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Gameplay Architecture",
    description:
      "Mechanics built as readable systems with clear state ownership, reusable behaviors, and low coupling between presentation and logic.",
    proofPoints: [
      "State machines",
      "Event-driven systems",
      "Reusable controllers",
      "Tool-friendly gameplay data"
    ]
  },
  {
    title: "LiveOps Systems",
    description:
      "Progression, analytics, event hooks, rewards, and content loops built for iteration after release.",
    proofPoints: ["Daily milestones", "Economy events", "Analytics", "Remote-ready systems"]
  },
  {
    title: "Mobile Performance",
    description:
      "Runtime choices shaped around frame budgets, memory pressure, loading behavior, and device variance.",
    proofPoints: ["Pooling", "Asset budgets", "SDK impact control", "Session pacing"]
  },
  {
    title: "Multiplayer Systems",
    description:
      "Networked gameplay designed around authoritative state, predictable flows, and readable debugging surfaces.",
    proofPoints: ["Colyseus", "Photon Quantum", "State sync", "PVP loops"]
  },
  {
    title: "Monetization Infrastructure",
    description:
      "Ad, analytics, reward, and progression systems integrated in a way that supports product goals without damaging game feel.",
    proofPoints: ["AdMob", "AppLovin MAX", "AdColony", "FAN", "Rewarded ads"]
  },
  {
    title: "Production Pipelines",
    description:
      "Repeatable project structures, SDK integration patterns, asset budgets, and debugging surfaces for shipping at scale.",
    proofPoints: ["80+ projects", "SDK wrappers", "Build discipline", "Reusable systems"]
  }
];

export const systemCapabilities: SystemCapability[] = [
  {
    title: "Object Pooling Runtime",
    category: "Mobile",
    description:
      "Reusable pooling patterns for projectiles, enemies, UI feedback, and temporary effects.",
    signals: ["Lower GC spikes", "Stable mobile frame pacing", "Reusable spawn contracts"]
  },
  {
    title: "Event-Driven Gameplay",
    category: "Gameplay",
    description:
      "Gameplay features communicate through explicit events instead of hidden scene dependencies.",
    signals: ["Cleaner testing", "Reduced coupling", "Designer-friendly hooks"]
  },
  {
    title: "Realtime State Sync",
    category: "Multiplayer",
    description:
      "Networked features are structured around server state, predictable transitions, and resilient clients.",
    signals: ["Photon", "Photon Quantum", "Colyseus", "PVP loops"]
  },
  {
    title: "Rewarded Monetization",
    category: "Monetization",
    description:
      "Ads and rewards are treated as product systems with pacing, validation, and failure handling.",
    signals: ["SDK integration", "Reward flows", "Analytics events"]
  },
  {
    title: "LiveOps Event Architecture",
    category: "LiveOps",
    description:
      "Events, analytics, rewards, and economy milestones structured so production teams can iterate after launch.",
    signals: ["Daily rewards", "Leaderboard rewards", "Analytics hooks"]
  },
  {
    title: "Third-Party SDK Architecture",
    category: "Architecture",
    description:
      "SDK integrations isolated behind predictable boundaries for ads, Web3, Roku, analytics, and platform services.",
    signals: ["Solana", "Ethereum", "NFT integrations", "Roku SDK"]
  },
  {
    title: "Technical Leadership",
    category: "Leadership",
    description:
      "Engineering decisions are documented, scoped, and communicated across design, art, and production.",
    signals: ["Cross-discipline collaboration", "Architecture planning", "Production ownership"]
  }
];
