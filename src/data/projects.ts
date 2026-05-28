import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "pollen-pop",
    title: "Pollen Pop",
    status: "live-ops",
    summary:
      "A multiplayer match-three game with Web3 integration, PVP functionality, tournaments, boosters, and a reward-driven economy.",
    role: "Senior Unity Gameplay Engineer",
    image: "/images/pollen_pop.jpg",
    media: [{ type: "image", src: "/images/pollen_pop.jpg", alt: "Pollen Pop gameplay" }],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=hexagon.pollenpop.game&pcampaignid=web_share",
    technologies: ["Unity3D", "C#", "Firebase", "Colyseus", "Web3"],
    systems: ["Match-3 Core", "PVP Flow", "Reward Economy", "Live Events"],
    engineeringHighlights: [
      "Built mode-specific gameplay flows for free play, tournaments, story, and PVP.",
      "Integrated leaderboard-driven rewards and daily milestone loops.",
      "Connected gameplay, backend events, and economy progression into a maintainable loop."
    ],
    challenge:
      "Support multiple game modes and reward paths without creating fragile one-off gameplay flows.",
    solution:
      "Structured mode logic, rewards, backend events, and economy progression around reusable gameplay contracts.",
    impact:
      "Enabled a broader live-game feature set across PVP, tournaments, daily milestones, boosters, and leaderboard rewards.",
    metrics: [
      { label: "Modes", value: "5", detail: "Free play, tournament, story, PVP, prize modes" },
      { label: "Stack", value: "Unity + Colyseus", detail: "Realtime multiplayer support" },
      { label: "Focus", value: "PVP Economy", detail: "Rewards, milestones, boosters" }
    ]
  },
  {
    slug: "bat-super-hero",
    title: "Flying Bat Robot Bike Game",
    status: "shipped",
    summary:
      "A superhero robot transformation game with bike traversal, flying access, robot combat, rescue objectives, city missions, and mobile ad integration.",
    role: "Unity Gameplay Developer",
    image: "/images/flying_bat.jpg",
    media: [{ type: "image", src: "/images/flying_bat.jpg", alt: "Bat Super Hero gameplay" }],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.rds.bat.bike.robot.transformation.superhero.games&pcampaignid=web_share",
    technologies: ["Unity3D", "C#", "Google Ads SDK", "Mobile Controls"],
    systems: ["Mission Flow", "Robot Transformation", "Bike Traversal", "Combat", "Ads"],
    engineeringHighlights: [
      "Implemented mission-state logic for rescue and combat scenarios.",
      "Built transformation gameplay that changes bike traversal, flying access, and robot challenge handling.",
      "Integrated mobile monetization without blocking the primary gameplay loop."
    ],
    challenge:
      "Deliver readable mobile city missions while supporting transformation mechanics, traversal modes, combat, and monetization touchpoints.",
    solution:
      "Separated mission state, player form changes, combat/rescue events, and ad flows so gameplay remains responsive.",
    impact:
      "Shipped a mobile action title with city rescue pacing, robot/bike transformation gameplay, and integrated ad systems.",
    metrics: [
      { label: "Downloads", value: "10M+", detail: "Public Play Store download band" },
      { label: "Loop", value: "Mission Based", detail: "Rescue, combat, traversal" },
      { label: "Forms", value: "3", detail: "Bike, robot, flight" }
    ]
  },
  {
    slug: "claw-robot-hero",
    title: "Claw Robot Hero",
    status: "shipped",
    summary:
      "An action superhero game featuring rescues, enemy groups, transformations, and combat-oriented mission structure.",
    role: "Unity Gameplay Developer",
    image: "/images/claw_robot_hero.jpg",
    media: [{ type: "image", src: "/images/claw_robot_hero.jpg", alt: "Claw Robot Hero gameplay" }],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.gag.superhero.robot.water.slide.adventure.game&pcampaignid=web_share",
    technologies: ["Unity3D", "C#", "Unity Ads SDK"],
    systems: ["AI Encounters", "Transformation", "Mission Triggers", "Ads"],
    engineeringHighlights: [
      "Created reusable mission patterns for action and rescue objectives.",
      "Supported multiple player forms through shared gameplay interfaces.",
      "Balanced monetization touchpoints against session pacing."
    ],
    challenge:
      "Maintain mission variety while reusing gameplay systems across superhero transformations.",
    solution:
      "Built shared mission and player-form patterns for action, rescue, and combat objectives.",
    impact:
      "Improved production reuse across mobile superhero mission loops and transformation gameplay.",
    metrics: [
      { label: "Platform", value: "Android" },
      { label: "Focus", value: "Action" },
      { label: "SDK", value: "Unity Ads" }
    ]
  },
  {
    slug: "rhino-robot-car",
    title: "Rhino Robot Car Transformation",
    status: "shipped",
    summary:
      "A mobile superhero transformation game blending vehicle traversal, robot action, and structured mission progression.",
    role: "Unity Gameplay Developer",
    image: "/images/rhino_robot_car.jpg",
    media: [
      {
        type: "image",
        src: "/images/rhino_robot_car.jpg",
        alt: "Rhino Robot Car Transformation gameplay"
      }
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.gag.rhino.monster.truck.transform.robot.games&pcampaignid=web_share",
    technologies: ["Unity3D", "C#", "Google Ads SDK"],
    systems: ["Vehicle Control", "Transformation", "Mission Flow", "Ads"],
    engineeringHighlights: [
      "Connected vehicle and robot mechanics inside one progression structure.",
      "Built gameplay states that support combat, traversal, and objective completion.",
      "Kept the mobile experience focused on fast sessions and readable objectives."
    ],
    challenge:
      "Blend vehicle traversal, robot action, and mobile mission pacing into one coherent experience.",
    solution:
      "Modeled transformation as a gameplay-state system supporting combat, traversal, and objectives.",
    impact:
      "Created a shipped mobile transformation loop with clear objectives and fast session readability.",
    metrics: [
      { label: "Modes", value: "Robot + Car" },
      { label: "Platform", value: "Android" },
      { label: "Focus", value: "Traversal" }
    ]
  },
  {
    slug: "scary-granny",
    title: "Scary Granny Game",
    status: "shipped",
    summary:
      "A horror escape game centered on puzzle solving, stealth pressure, sound design, and atmosphere.",
    role: "Unity Gameplay Developer",
    image: "/images/scary_granny.jpg",
    media: [{ type: "image", src: "/images/scary_granny.jpg", alt: "Scary Granny gameplay" }],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.axondev.scary.granny.house.horror.escape&pcampaignid=web_share",
    technologies: ["Unity3D", "C#", "Google Ads SDK"],
    systems: ["Stealth AI", "Puzzle Flow", "Audio Cues", "Mobile UX"],
    engineeringHighlights: [
      "Built tension through objective pacing, spatial threat design, and audio cues.",
      "Structured escape progression around puzzle state and player risk.",
      "Integrated monetization while preserving horror pacing."
    ],
    challenge:
      "Create mobile horror tension without compromising performance, readability, or session pacing.",
    solution:
      "Connected puzzle state, stealth pressure, spatial threat design, and audio feedback into the escape loop.",
    impact:
      "Delivered a horror escape experience with atmosphere, puzzle flow, and mobile monetization support.",
    metrics: [
      { label: "Genre", value: "Horror" },
      { label: "Loop", value: "Escape" },
      { label: "Focus", value: "Atmosphere" }
    ]
  },
  {
    slug: "zombie-survival",
    title: "Zombie Survival Game",
    status: "prototype",
    summary:
      "A survival shooter with wave combat, class-based mechanics, and multiplayer battles between waves.",
    role: "Unity Gameplay Engineer",
    image: "/images/zombie_survival.jpg",
    media: [{ type: "image", src: "/images/zombie_survival.jpg", alt: "Zombie Survival gameplay" }],
    technologies: ["Unity3D", "C#", "Colyseus", "Multiplayer"],
    systems: ["Wave Spawner", "Class Mechanics", "Multiplayer Arena", "State Sync"],
    engineeringHighlights: [
      "Designed wave progression and player class behaviors for repeated sessions.",
      "Connected PVE survival pressure with PVP intermission battles.",
      "Explored server-backed multiplayer loops using Colyseus."
    ],
    challenge:
      "Prototype a hybrid PVE/PVP survival structure that remains understandable between wave pressure and player combat.",
    solution:
      "Separated wave spawning, class mechanics, multiplayer arena state, and session resolution.",
    impact:
      "Established a multiplayer-ready survival prototype with reusable combat and state-sync foundations.",
    metrics: [
      { label: "Loop", value: "PVE + PVP" },
      { label: "Network", value: "Colyseus" },
      { label: "Focus", value: "Survival" }
    ]
  },
  {
    slug: "kart-racing-league",
    title: "Kart Racing League",
    status: "prototype",
    summary:
      "A multiplayer kart racing experience with real-time races, customization, and physics-driven competition.",
    role: "Unity Gameplay Engineer",
    image: "/images/kart_racing.jpg",
    media: [{ type: "image", src: "/images/kart_racing.jpg", alt: "Kart Racing League gameplay" }],
    technologies: ["Unity3D", "C#", "Photon Quantum", "3D Physics"],
    systems: ["Racing Physics", "Realtime Multiplayer", "Customization", "Prediction"],
    engineeringHighlights: [
      "Explored deterministic multiplayer racing architecture with Photon Quantum.",
      "Focused on responsive vehicle control and readable competitive feedback.",
      "Structured customization hooks for progression and retention."
    ],
    challenge:
      "Prototype responsive kart handling while preparing for deterministic multiplayer race logic.",
    solution:
      "Structured racing physics, customization hooks, and Photon Quantum exploration around competitive sessions.",
    impact:
      "Created a multiplayer racing foundation focused on responsiveness, prediction, and progression hooks.",
    metrics: [
      { label: "Network", value: "Photon" },
      { label: "Genre", value: "Racing" },
      { label: "Focus", value: "Physics" }
    ]
  },
  {
    slug: "crystale",
    title: "Crystale",
    status: "prototype",
    summary:
      "A strategic card game where players summon creatures and cast spells across elemental tiles.",
    role: "Unity Gameplay Engineer",
    image: "/images/crystale.jpg",
    media: [{ type: "image", src: "/images/crystale.jpg", alt: "Crystale gameplay" }],
    technologies: ["Unity3D", "C#", "Colyseus", "TypeScript"],
    systems: ["Card Rules", "Tile Logic", "Server State", "Turn Flow"],
    engineeringHighlights: [
      "Modeled card interactions as rules-driven systems.",
      "Designed board-state logic around elemental tile effects.",
      "Separated gameplay resolution from presentation for multiplayer readiness."
    ],
    challenge:
      "Represent strategy card rules and elemental tile interactions in a multiplayer-ready architecture.",
    solution: "Separated rules resolution, board state, turn flow, and presentation concerns.",
    impact: "Established a scalable card-battle rules foundation for server-backed strategic play.",
    metrics: [
      { label: "Genre", value: "Strategy" },
      { label: "Stack", value: "Unity + TS" },
      { label: "Focus", value: "Rules" }
    ]
  }
];
