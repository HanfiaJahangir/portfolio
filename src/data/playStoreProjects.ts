import type { Project } from "@/types/portfolio";
import { getProjectAssetPath } from "@/systems/ingestion/projectAssets";

export const playStoreProjects: Project[] = [
  {
    slug: "moto-max",
    title: "MRM Bike Racing : Moto Game 3D",
    status: "shipped",
    summary:
      "A high-speed motorcycle racing game featuring campaign challenges, knockout races, PVP-style AI competition, multiple control schemes, audio feedback, and bike progression systems.",
    role: "Unity Gameplay / Mobile Systems Engineer",
    image: getProjectAssetPath("moto-max", "featureGraphics", "feature-graphic.svg"),
    icon: getProjectAssetPath("moto-max", "icon", "icon.svg"),
    logo: getProjectAssetPath("moto-max", "featureGraphics", "logo.svg"),
    assetBasePath: "/projects/moto-max",
    storeId: "com.offline.racing.motorcyclegame.motomax.bikerace.bike.games",
    genre: "Racing",
    developer: "Terafort IEG",
    downloads: "5M+",
    updatedOn: "May 22, 2026",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.offline.racing.motorcyclegame.motomax.bikerace.bike.games",
    technologies: ["Unity3D", "C#", "Mobile Controls", "AI Racing", "Ads/IAP"],
    systems: ["Campaign Mode", "Knockout Mode", "AI PVP", "Garage", "Dynamic Audio"],
    tags: ["Racing", "Motorcycle", "Offline", "Single player", "Stylized"],
    achievements: [
      "Supported multi-mode racing structure with campaign, knockout, and competitive races.",
      "Delivered mobile control options including tap/drag, tilt, and buttons.",
      "Integrated bike garage progression, race guidance, minimap navigation, and audio feedback."
    ],
    engineeringHighlights: [
      "Race-mode architecture for campaign challenges, knockout elimination, and AI competition.",
      "Mobile input handling across drag, tilt, and button control schemes.",
      "Gameplay feedback systems including commentary, minimap navigation, and dynamic bike audio."
    ],
    challenge:
      "Create a racing experience that supports multiple race formats, control schemes, AI competition, and mobile session pacing.",
    solution:
      "Organize race flow, control abstraction, garage systems, guidance UI, and audio feedback into reusable gameplay systems.",
    impact:
      "Shipped a large-scale racing title with millions of downloads and a broad mobile gameplay feature set.",
    metrics: [
      { label: "Downloads", value: "5M+", detail: "Public Play Store download band" },
      { label: "Modes", value: "3+", detail: "Campaign, knockout, AI PVP-style races" },
      { label: "Controls", value: "3", detail: "Tap/drag, tilt, buttons" }
    ],
    media: [
      {
        type: "image",
        src: getProjectAssetPath("moto-max", "featureGraphics", "feature-graphic.svg"),
        alt: "Moto Max racing showcase artwork"
      }
    ]
  },
  {
    slug: "alien-survivor",
    title: "Hero Survivor: Action Games",
    status: "shipped",
    summary:
      "A fast-paced alien survival action game built around merging, evolving, enemy waves, boss encounters, upgrades, and cinematic combat feedback.",
    role: "Unity Gameplay / Combat Systems Engineer",
    image: getProjectAssetPath("alien-survivor", "featureGraphics", "feature-graphic.svg"),
    icon: getProjectAssetPath("alien-survivor", "icon", "icon.svg"),
    logo: getProjectAssetPath("alien-survivor", "featureGraphics", "logo.svg"),
    assetBasePath: "/projects/alien-survivor",
    storeId: "com.tf.survivor.alien.shooting",
    genre: "Action",
    developer: "Terafort IEG",
    downloads: "5K+",
    updatedOn: "Dec 10, 2025",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tf.survivor.alien.shooting",
    technologies: ["Unity3D", "C#", "Enemy Waves", "Merge Mechanics", "Ads/IAP"],
    systems: ["Survival Combat", "Merge Evolution", "Boss Encounters", "Upgrade Rewards"],
    tags: ["Action", "Survival", "Aliens", "Bosses", "Progression"],
    achievements: [
      "Implemented fast-paced survival combat with escalating alien mobs.",
      "Supported merge/evolution progression that changes player scale and firepower.",
      "Structured boss rewards, gear upgrades, and run-based progression."
    ],
    engineeringHighlights: [
      "Wave-based combat loops with escalating enemies and boss encounters.",
      "Merge mechanic design that modifies player power, size, and ability presentation.",
      "Reward and upgrade flow for rare gear and power progression."
    ],
    challenge:
      "Keep survival combat responsive while combining merge mechanics, boss pressure, and upgrade feedback.",
    solution:
      "Separate enemy waves, player evolution, reward resolution, and combat presentation into clear systems.",
    impact:
      "Created a shipped action-survival title with readable progression and cinematic combat feel.",
    metrics: [
      { label: "Downloads", value: "5K+", detail: "Public Play Store download band" },
      { label: "Genre", value: "Action", detail: "Alien survival combat" },
      { label: "Core loop", value: "Merge", detail: "Merge/evolve power progression" }
    ],
    media: [
      {
        type: "image",
        src: getProjectAssetPath("alien-survivor", "featureGraphics", "feature-graphic.svg"),
        alt: "Hero Survivor combat showcase artwork"
      }
    ]
  },
  {
    slug: "bike-drift-master",
    title: "Bike Drift Master Racing Game",
    status: "shipped",
    summary:
      "A motorcycle and car drifting game combining highway racing, police chase pressure, boost, coins, unlocks, smooth controls, and realistic-feeling drift physics.",
    role: "Unity Gameplay / Vehicle Systems Engineer",
    image: getProjectAssetPath("bike-drift-master", "featureGraphics", "feature-graphic.svg"),
    icon: getProjectAssetPath("bike-drift-master", "icon", "icon.svg"),
    logo: getProjectAssetPath("bike-drift-master", "featureGraphics", "logo.svg"),
    assetBasePath: "/projects/bike-drift-master",
    storeId: "com.tf.bike.drift.master",
    genre: "Racing",
    developer: "Terafort IEG",
    downloads: "500K+",
    updatedOn: "Apr 4, 2026",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tf.bike.drift.master",
    technologies: ["Unity3D", "C#", "Vehicle Physics", "Mobile Input", "Ads/IAP"],
    systems: ["Drift Physics", "Police Chase", "Boost", "Coin Economy", "Vehicle Unlocks"],
    tags: ["Racing", "Drift", "Police Chase", "Highway", "Vehicles"],
    achievements: [
      "Delivered drift control and boost systems for mobile highway racing.",
      "Supported police chase pressure and vehicle unlock progression.",
      "Combined bikes and sports cars in a unified driving simulation loop."
    ],
    engineeringHighlights: [
      "Vehicle-control architecture for drifting, boosting, and traffic navigation.",
      "Progression hooks through coins, faster bikes, and powerful cars.",
      "Police chase pressure integrated into session pacing."
    ],
    challenge:
      "Make drifting satisfying on mobile while handling traffic, chase pressure, progression, and speed escalation.",
    solution:
      "Build a vehicle loop around swipe drift control, boost feedback, coin collection, and unlock progression.",
    impact:
      "Shipped a racing title with a strong public download band and compact high-intensity gameplay loop.",
    metrics: [
      { label: "Downloads", value: "500K+", detail: "Public Play Store download band" },
      { label: "Vehicles", value: "Bike + Car", detail: "Motorcycle and sports car drifting" },
      { label: "Pressure", value: "Police", detail: "Chase-driven session tension" }
    ],
    media: [
      {
        type: "image",
        src: getProjectAssetPath("bike-drift-master", "featureGraphics", "feature-graphic.svg"),
        alt: "Bike Drift Master highway showcase artwork"
      }
    ]
  },
  {
    slug: "asmr-punch",
    title: "Annoying Boss Punch Game",
    status: "shipped",
    summary:
      "A comedic offline action game focused on satisfying punching, slapping, reactive boss animations, destructible office chaos, power-ups, costumes, and stress-relief interactions.",
    role: "Unity Gameplay / Interaction Systems Engineer",
    image: getProjectAssetPath("asmr-punch", "featureGraphics", "feature-graphic.svg"),
    icon: getProjectAssetPath("asmr-punch", "icon", "icon.svg"),
    logo: getProjectAssetPath("asmr-punch", "featureGraphics", "logo.svg"),
    assetBasePath: "/projects/asmr-punch",
    storeId: "com.tf.asmr.punch.game",
    genre: "Action",
    developer: "Funverse IEG",
    downloads: "100K+",
    updatedOn: "Mar 6, 2026",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tf.asmr.punch.game",
    technologies: ["Unity3D", "C#", "Character Reactions", "Offline Gameplay", "Ads/IAP"],
    systems: ["Punch Interactions", "Reaction Animation", "Destruction Props", "Power-Ups"],
    tags: ["Action", "Offline", "Comedy", "Stress Relief", "Reactive Animation"],
    achievements: [
      "Implemented punch, kick, slap, and prop-based interaction feedback.",
      "Supported funny boss reactions, smooth animations, costumes, and power-ups.",
      "Built offline-friendly session flow for fast stress-relief gameplay."
    ],
    engineeringHighlights: [
      "Interaction system for punches, slaps, kicks, and throwable/destructive props.",
      "Reactive animation feedback tuned around comedy and satisfaction.",
      "Offline action loop with short-session mobile pacing."
    ],
    challenge:
      "Turn simple touch interactions into satisfying, funny, repeatable action feedback without overcomplicating the loop.",
    solution:
      "Combine hit reactions, prop tools, power-ups, costumes, sound feedback, and office chaos into a compact interaction system.",
    impact:
      "Shipped an offline action game with a clear comedic hook and strong short-session mobile readability.",
    metrics: [
      { label: "Downloads", value: "100K+", detail: "Public Play Store download band" },
      { label: "Offline", value: "Yes", detail: "No internet required for core play" },
      { label: "Feedback", value: "Reactive", detail: "Punch, slap, prop, and animation response" }
    ],
    media: [
      {
        type: "image",
        src: getProjectAssetPath("asmr-punch", "featureGraphics", "feature-graphic.svg"),
        alt: "Annoying Boss punch showcase artwork"
      }
    ]
  }
];
