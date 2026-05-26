import type { Achievement } from "@/types/portfolio";

export const achievements: Achievement[] = [
  {
    label: "Shipped projects",
    value: "80+",
    description:
      "Production projects across mobile games, multiplayer prototypes, monetized F2P titles, gameplay systems, and live-style architectures."
  },
  {
    label: "Multiplayer systems",
    value: "Photon + Colyseus",
    description:
      "Photon, Photon Quantum, and Colyseus experience across realtime PVP, racing, survival, and strategy systems."
  },
  {
    label: "Performance target",
    value: "60 FPS",
    description:
      "Mobile optimization mindset around pooling, asset budgets, SDK impact control, ANR reduction, and stable frame pacing."
  },
  {
    label: "ANR reduction",
    value: "Stability",
    description:
      "Production optimization focus on startup flow, SDK initialization, memory pressure, and crash/ANR-sensitive mobile systems."
  },
  {
    label: "Monetization",
    value: "F2P SDKs",
    description:
      "AdMob, AppLovin MAX, AdColony, Facebook Audience Network, rewarded ads, analytics, and economy event flows."
  },
  {
    label: "Cross-platform",
    value: "Mobile + SDKs",
    description:
      "Unity systems integrated with third-party SDKs including Web3, Roku SDK, analytics, and platform-specific services."
  }
];
