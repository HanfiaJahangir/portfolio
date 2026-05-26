import type { ExperienceItem } from "@/types/portfolio";

export const experience: ExperienceItem[] = [
  {
    company: "Independent / Studio Projects",
    role: "Senior Unity Gameplay Engineer",
    period: "Recent work",
    location: "Lahore, Pakistan",
    summary:
      "Owned gameplay systems and feature delivery across shipped mobile games, multiplayer prototypes, monetization integrations, and live-style progression loops.",
    highlights: [
      "Built Unity gameplay features across action, horror, racing, match-three, and strategy genres.",
      "Integrated Firebase, analytics, Google Ads, Unity Ads, Colyseus, and Photon Quantum across production and prototype work.",
      "Collaborated with design and art teams to connect UX, session pacing, and technical implementation.",
      "Focused on mobile performance through pooling, readable state flow, asset budgets, and SDK impact control."
    ],
    technologies: [
      "Unity3D",
      "C#",
      "Firebase",
      "Colyseus",
      "Photon Quantum",
      "Google Ads",
      "Unity Ads"
    ]
  },
  {
    company: "Multiplayer Game Systems",
    role: "Gameplay / Networked Systems Developer",
    period: "Project-based",
    summary:
      "Designed and implemented multiplayer-ready loops for PVP, racing, survival, and strategy systems.",
    highlights: [
      "Worked with Colyseus-backed gameplay flows for PVP and state-driven sessions.",
      "Explored deterministic racing architecture through Photon Quantum.",
      "Separated gameplay state, presentation, and backend events for maintainable multiplayer features."
    ],
    technologies: ["Colyseus", "Photon Quantum", "TypeScript", "Unity", "C#"]
  },
  {
    company: "Mobile Monetization & Live Features",
    role: "Unity Integration Engineer",
    period: "Project-based",
    summary:
      "Integrated monetization, analytics, rewards, and progression systems while preserving gameplay pacing.",
    highlights: [
      "Implemented Google Ads SDK and Unity Ads SDK across shipped mobile titles.",
      "Connected rewards, milestones, leaderboard positions, and economy events into gameplay loops.",
      "Balanced product requirements with player experience and performance constraints."
    ],
    technologies: ["Google Ads SDK", "Unity Ads SDK", "Firebase", "Unity Analytics", "OneSignal"]
  }
];
