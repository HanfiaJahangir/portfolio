import type { SdkExpertiseGroup } from "@/types/portfolio";

export const sdkExpertise: SdkExpertiseGroup[] = [
  {
    title: "Monetization",
    description:
      "F2P revenue systems integrated around rewarded flows, session pacing, mediation, analytics, and player experience.",
    sdks: ["AdMob", "AppLovin MAX", "AdColony", "Facebook Audience Network"]
  },
  {
    title: "Multiplayer",
    description:
      "Realtime gameplay systems and deterministic multiplayer foundations for racing, PVP, survival, and strategy loops.",
    sdks: ["Photon", "Photon Quantum", "Colyseus"]
  },
  {
    title: "Web3 / Third Party",
    description:
      "SDK architecture for platform services, blockchain integrations, NFT workflows, Roku functionality, and external service boundaries.",
    sdks: [
      "Solana",
      "Ethereum",
      "NFT integrations",
      "Roku SDK",
      "Additional SDK integration architecture"
    ]
  }
];
