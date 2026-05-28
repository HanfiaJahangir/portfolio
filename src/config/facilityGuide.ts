import { routes } from "@/config/routes";

export type FacilityGuideDestination = {
  id: string;
  label: string;
  command: string;
  description: string;
  href: string;
  tone: "signal" | "reactor" | "ink";
};

export const facilityGuideDestinations: FacilityGuideDestination[] = [
  {
    id: "tour",
    label: "Start Guided Tour",
    command: "Recommended first route",
    description: "Open the facility transit map and move through the gameplay labs in order.",
    href: routes.worlds,
    tone: "signal"
  },
  {
    id: "racing",
    label: "Explore Racing Systems",
    command: "Moto Max lab",
    description: "Jump into the closed-circuit racing slice and vehicle-feel showcase.",
    href: "/demos/moto-max-track-race",
    tone: "reactor"
  },
  {
    id: "combat",
    label: "Enter Combat Lab",
    command: "Hero Survivor chamber",
    description: "Inspect the survivor loop with waves, upgrades, pickups, and boss pressure.",
    href: "/demos/hero-survivor-wave-slice",
    tone: "signal"
  },
  {
    id: "systems",
    label: "View Systems Architecture",
    command: "Engineering command",
    description: "Review gameplay, multiplayer, monetization, optimization, and SDK systems.",
    href: routes.systems,
    tone: "ink"
  },
  {
    id: "projects",
    label: "Open Shipped Archive",
    command: "Recruiter fast path",
    description: "Browse shipped projects, case studies, media, metrics, and store links.",
    href: routes.projects,
    tone: "ink"
  },
  {
    id: "monetization",
    label: "Visit Monetization Hub",
    command: "F2P infrastructure",
    description: "Go to the systems deck for ad lifecycle, SDK, analytics, and LiveOps coverage.",
    href: routes.systems,
    tone: "reactor"
  }
];
