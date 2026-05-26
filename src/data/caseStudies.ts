import type { CaseStudy } from "@/types/portfolio";

export const caseStudies: CaseStudy[] = [
  {
    projectSlug: "moto-max",
    overview:
      "Moto Max is presented as a production racing case study: multiple race modes, mobile control schemes, AI competition, garage progression, audio feedback, monetization, and performance-sensitive mobile delivery.",
    role: "Unity Gameplay / Mobile Systems Engineer",
    coreSystems: [
      {
        title: "Vehicle Systems",
        description:
          "A mobile racing stack focused on control abstraction, speed feedback, track navigation, and session readability.",
        bullets: [
          "Tap/drag controls",
          "Tilt and button modes",
          "Bike progression",
          "Dynamic engine audio"
        ]
      },
      {
        title: "AI Race Systems",
        description:
          "Race formats required AI opponents, elimination pressure, and readable progress feedback.",
        bullets: [
          "AI competition",
          "Knockout elimination",
          "Race position feedback",
          "Minimap guidance"
        ]
      },
      {
        title: "Monetization Architecture",
        description:
          "Ads and purchases are treated as product systems that must not interrupt race readability.",
        bullets: ["In-app ads", "Paid random items", "Reward-aware pacing", "Store flow boundaries"]
      }
    ],
    architecture: {
      title: "Race Session Architecture",
      description:
        "High-level race flow from mode selection to input, race state, feedback, and rewards.",
      nodes: [
        { id: "mode", label: "Race Mode" },
        { id: "input", label: "Control Adapter" },
        { id: "race", label: "Race State" },
        { id: "ai", label: "AI Opponents" },
        { id: "feedback", label: "Audio/UI Feedback" },
        { id: "reward", label: "Rewards / Garage" }
      ],
      edges: [
        { from: "mode", to: "race", label: "configures" },
        { from: "input", to: "race", label: "drives" },
        { from: "ai", to: "race", label: "competes" },
        { from: "race", to: "feedback", label: "emits" },
        { from: "race", to: "reward", label: "resolves" }
      ]
    },
    optimization: {
      title: "Mobile Optimization Strategy",
      description:
        "Optimization is framed around stable racing feel, responsive input, and avoiding runtime spikes during short sessions.",
      bullets: [
        "Object reuse for race feedback",
        "Input responsiveness budget",
        "Audio trigger discipline",
        "Asset budget awareness"
      ]
    },
    sdkIntegrations: {
      title: "SDK Integration Boundary",
      description: "Commercial SDKs are isolated from race logic so session flow remains testable.",
      nodes: [
        { id: "gameplay", label: "Gameplay Session" },
        { id: "events", label: "Event Layer" },
        { id: "ads", label: "Ads / IAP" },
        { id: "analytics", label: "Analytics" }
      ],
      edges: [
        { from: "gameplay", to: "events", label: "publishes" },
        { from: "events", to: "ads", label: "requests" },
        { from: "events", to: "analytics", label: "tracks" }
      ]
    },
    monetization: {
      title: "Race Monetization Flow",
      description: "Revenue systems are surfaced at clean session boundaries.",
      nodes: [
        { id: "finish", label: "Race Complete" },
        { id: "reward", label: "Reward Resolution" },
        { id: "ad", label: "Ad Opportunity" },
        { id: "garage", label: "Garage Upgrade" }
      ],
      edges: [
        { from: "finish", to: "reward" },
        { from: "reward", to: "ad" },
        { from: "reward", to: "garage" }
      ]
    },
    lessonsLearned: [
      "Racing projects need input abstraction early because control modes affect every feedback loop.",
      "Audio and UI feedback are not polish-only systems; they are part of race readability.",
      "Monetization works best when it lives at clear session boundaries."
    ],
    demoSlug: "moto-max-track-race"
  },
  {
    projectSlug: "alien-survivor",
    overview:
      "Alien Survivor is a compact action-survival case study focused on combat readability, enemy pressure, merge/evolution progression, boss rewards, and mobile performance handling.",
    role: "Unity Gameplay / Combat Systems Engineer",
    coreSystems: [
      {
        title: "Combat Systems",
        description:
          "Fast survival combat requires clear hit feedback, escalation, and player power growth.",
        bullets: ["Enemy waves", "Boss encounters", "Power escalation", "Combat feedback"]
      },
      {
        title: "Enemy Systems",
        description:
          "Enemy pressure is structured around waves, mobs, bosses, and readable escalation.",
        bullets: ["Mob spawning", "Wave pacing", "Boss triggers", "Threat readability"]
      },
      {
        title: "Progression Systems",
        description:
          "Merge/evolution mechanics create a visible sense of power growth during play.",
        bullets: ["Merge/evolve loop", "Gear rewards", "Upgrade feedback", "Run-based progression"]
      }
    ],
    architecture: {
      title: "Survival Combat Loop",
      description: "Combat loop structure from spawning to upgrades and boss resolution.",
      nodes: [
        { id: "spawn", label: "Enemy Spawn" },
        { id: "combat", label: "Combat Resolver" },
        { id: "merge", label: "Merge / Evolution" },
        { id: "boss", label: "Boss Encounter" },
        { id: "reward", label: "Upgrade Reward" }
      ],
      edges: [
        { from: "spawn", to: "combat" },
        { from: "combat", to: "merge" },
        { from: "combat", to: "boss" },
        { from: "boss", to: "reward" }
      ]
    },
    optimization: {
      title: "Combat Performance Handling",
      description:
        "Survival games need predictable spawn and effect budgets to avoid frame spikes.",
      bullets: [
        "Spawn budget control",
        "Reusable enemy/effect patterns",
        "Combat feedback batching",
        "Readable upgrade cadence"
      ]
    },
    sdkIntegrations: {
      title: "Progression Event Boundary",
      description:
        "Combat and progression events can feed analytics, ads, and reward systems without coupling.",
      nodes: [
        { id: "combat", label: "Combat Events" },
        { id: "progress", label: "Progression Events" },
        { id: "analytics", label: "Analytics" },
        { id: "reward", label: "Reward Surface" }
      ],
      edges: [
        { from: "combat", to: "progress" },
        { from: "progress", to: "analytics" },
        { from: "progress", to: "reward" }
      ]
    },
    lessonsLearned: [
      "Survival combat depends on readable escalation as much as raw enemy count.",
      "Merge/evolution feedback should be isolated from combat resolution.",
      "Boss rewards work best when the player understands the power delta."
    ],
    demoSlug: "hero-survivor-wave-slice"
  },
  {
    projectSlug: "bike-drift-master",
    overview:
      "Bike Drift Master is a vehicle-feel case study: drift control, boost, police chase pressure, highway navigation, coin progression, and mobile optimization.",
    role: "Unity Gameplay / Vehicle Systems Engineer",
    coreSystems: [
      {
        title: "Drifting Systems",
        description:
          "The core feel depends on controlled oversteer, boost timing, traffic awareness, and readable recovery.",
        bullets: ["Swipe drift", "Boost feedback", "Traffic navigation", "Police pressure"]
      },
      {
        title: "Controller Architecture",
        description:
          "Vehicle control needs a clean boundary between input, physics response, and presentation.",
        bullets: ["Input adapter", "Vehicle state", "Camera feedback", "Speed effects"]
      },
      {
        title: "Progression Hooks",
        description:
          "Coins and vehicle unlocks create short-session goals without bloating the core loop.",
        bullets: ["Coin collection", "Vehicle unlocks", "Session reward", "Upgrade motivation"]
      }
    ],
    architecture: {
      title: "Drift Controller Flow",
      description: "Input and vehicle state flow for a mobile drift session.",
      nodes: [
        { id: "input", label: "Input Adapter" },
        { id: "controller", label: "Vehicle Controller" },
        { id: "drift", label: "Drift State" },
        { id: "boost", label: "Boost System" },
        { id: "feedback", label: "Camera / FX" },
        { id: "reward", label: "Coins / Unlocks" }
      ],
      edges: [
        { from: "input", to: "controller" },
        { from: "controller", to: "drift" },
        { from: "controller", to: "boost" },
        { from: "drift", to: "feedback" },
        { from: "boost", to: "feedback" },
        { from: "controller", to: "reward" }
      ]
    },
    optimization: {
      title: "Vehicle Feel Optimization",
      description:
        "Optimization focuses on stable input response, controlled effects, and avoiding spike-heavy traffic/chase logic.",
      bullets: [
        "60 FPS feel target",
        "Object pooling for feedback",
        "Traffic/chase budget",
        "Camera smoothing discipline"
      ]
    },
    sdkIntegrations: {
      title: "Driving Session Event Flow",
      description:
        "Session events can feed ads, analytics, and progression without touching vehicle control.",
      nodes: [
        { id: "drive", label: "Drive Session" },
        { id: "events", label: "Event Bus" },
        { id: "ads", label: "Ad SDK" },
        { id: "analytics", label: "Analytics" },
        { id: "progression", label: "Progression" }
      ],
      edges: [
        { from: "drive", to: "events" },
        { from: "events", to: "ads" },
        { from: "events", to: "analytics" },
        { from: "events", to: "progression" }
      ]
    },
    lessonsLearned: [
      "Drift feel should be tuned as a state machine, not scattered physics tweaks.",
      "Camera feedback and input response must be optimized together.",
      "Progression hooks should reinforce the vehicle loop instead of interrupting it."
    ],
    demoSlug: "bike-drift-mechanic"
  },
  {
    projectSlug: "asmr-punch",
    overview:
      "ASMR Punch is an interaction-feedback case study focused on hit reactions, animation timing, prop interactions, comedic game feel, and short-session offline play.",
    role: "Unity Gameplay / Interaction Systems Engineer",
    coreSystems: [
      {
        title: "Feedback Systems",
        description:
          "Punch, slap, kick, and prop interactions depend on immediate readable response.",
        bullets: ["Hit reactions", "Audio feedback", "Prop response", "Office chaos"]
      },
      {
        title: "Animation Systems",
        description: "Reactive animation timing carries the comedy and satisfaction of the loop.",
        bullets: ["Boss reactions", "Costume support", "Power-up presentation", "Impact timing"]
      },
      {
        title: "Interaction Systems",
        description:
          "The loop stays compact by treating every interaction as a reusable feedback event.",
        bullets: ["Punch events", "Tool interactions", "Destructible props", "Offline flow"]
      }
    ],
    architecture: {
      title: "Interaction Feedback Flow",
      description: "Touch input to feedback response for short-session interaction gameplay.",
      nodes: [
        { id: "input", label: "Touch Input" },
        { id: "hit", label: "Hit Resolver" },
        { id: "reaction", label: "Reaction Animation" },
        { id: "props", label: "Prop System" },
        { id: "audio", label: "Audio / Haptics" }
      ],
      edges: [
        { from: "input", to: "hit" },
        { from: "hit", to: "reaction" },
        { from: "hit", to: "props" },
        { from: "hit", to: "audio" }
      ]
    },
    optimization: {
      title: "Short Session Stability",
      description:
        "Interaction-heavy gameplay benefits from predictable animation, audio, and prop lifecycles.",
      bullets: [
        "Animation trigger discipline",
        "Prop cleanup",
        "Audio event limits",
        "Offline-friendly flow"
      ]
    },
    sdkIntegrations: {
      title: "Offline Session Monetization Boundary",
      description: "Ad and reward opportunities remain separate from core hit feedback.",
      nodes: [
        { id: "session", label: "Offline Session" },
        { id: "interaction", label: "Interaction Events" },
        { id: "reward", label: "Reward Surface" },
        { id: "ads", label: "Ad SDK" }
      ],
      edges: [
        { from: "session", to: "interaction" },
        { from: "interaction", to: "reward" },
        { from: "reward", to: "ads" }
      ]
    },
    lessonsLearned: [
      "Game feel can be represented as an event system instead of one-off animation triggers.",
      "Comedy loops need response timing more than complex mechanics.",
      "Offline interaction games still benefit from clean SDK boundaries."
    ],
    demoSlug: "annoying-boss-punch-slice"
  }
];

export function getCaseStudyByProjectSlug(projectSlug: string) {
  return caseStudies.find((caseStudy) => caseStudy.projectSlug === projectSlug);
}
