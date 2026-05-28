import type { ProjectWorldZone } from "@/types/portfolio";

export const projectWorldZones: ProjectWorldZone[] = [
  {
    slug: "moto-max-garage",
    title: "Moto Max Garage",
    eyebrow: "Racing Systems Zone",
    theme:
      "Premium track-racing garage with neon circuit telemetry, overtake logic, checkpoint pressure, and monetization architecture displays.",
    fantasy:
      "Start as an underground racer and climb toward Moto Max champion status through speed, overtakes, and clean finishes.",
    coreLoop: [
      "Start race",
      "Accelerate",
      "Overtake",
      "Drift turns",
      "Clear checkpoints",
      "Finish P1"
    ],
    rewardLoop: ["Race rank", "Bike unlocks", "Garage tuning", "LiveOps rewards"],
    atmosphere: ["Neon city circuit", "Garage platforms", "Race countdown", "Telemetry glow"],
    transition: "Racing tunnel reveal with moving light strips and a holographic track line.",
    soundHooks: ["Engine ramp", "Checkpoint ping", "Crowd bed", "Garage door servo"],
    mood: ["energetic", "premium", "technical"],
    summary:
      "A curated garage zone for first-place racing goals: speed maintenance, overtakes, drift handling, checkpoint rhythm, optimization metrics, and commercial SDK boundaries.",
    route: "/demos/moto-max-track-race",
    projectSlug: "moto-max",
    demoSlug: "moto-max-track-race",
    systems: ["Vehicle Control", "Opponent Overtakes", "Checkpoint Flow", "Ad/IAP Boundaries"],
    interactions: ["Playable racing slice", "Telemetry panels", "Checkpoint progress HUD"],
    metrics: [
      { label: "Goal", value: "P1", detail: "track racing" },
      { label: "Focus", value: "60 FPS", detail: "mobile feel" },
      { label: "SDK", value: "Ads/IAP", detail: "session boundary" }
    ],
    accent: "signal"
  },
  {
    slug: "bike-drift-arena",
    title: "Bike Drift Master Arena",
    eyebrow: "Handling Zone",
    theme:
      "Cinematic night-road drift space for arcade handling, camera feel, traffic readability, crash/reset, and speed sensation.",
    fantasy:
      "Thread through highway traffic at speed, avoid police-chase pressure, cut lanes with drift control, and keep the bike stable under pressure.",
    coreLoop: [
      "Build speed",
      "Read traffic",
      "Lane cut",
      "Drift recover",
      "Avoid police",
      "Reset fast"
    ],
    rewardLoop: ["Checkpoint progress", "Position gain", "Clean lane streak", "Vehicle mastery"],
    atmosphere: ["Night highway", "Neon guard rails", "Headlight streaks", "Speed haze"],
    transition: "Camera rail drops from garage telemetry into the moving highway lane.",
    soundHooks: ["Wind rush", "Tire scrape", "Crash thud", "Checkpoint synth"],
    mood: ["motion-heavy", "responsive", "game-feel"],
    summary:
      "A drift arena world that connects the playable highway slice to controller breakdowns, checkpoint pacing, crash handling, and camera-system presentation.",
    route: "/demos/bike-drift-mechanic",
    projectSlug: "bike-drift-master",
    demoSlug: "bike-drift-mechanic",
    systems: ["Drift State", "Camera Follow", "Traffic Avoidance", "Police Pressure"],
    interactions: ["Playable highway rider", "Crash/reset loop", "Traffic pressure HUD"],
    metrics: [
      { label: "Demo", value: "Playable", detail: "R3F slice" },
      { label: "Loop", value: "30-60s", detail: "mechanic showcase" },
      { label: "Feel", value: "Arcade", detail: "racing drift" }
    ],
    accent: "reactor"
  },
  {
    slug: "hero-survivor-chamber",
    title: "Hero Survivor Chamber",
    eyebrow: "Combat Systems Zone",
    theme: "Sci-fi combat chamber with holographic enemy systems and wave architecture displays.",
    fantasy:
      "Become an unstoppable survivor, hold the arena center, collect upgrades, and outscale incoming monster waves.",
    coreLoop: [
      "Survive wave",
      "Shoot enemies",
      "Dodge swarms",
      "Collect pickups",
      "Upgrade power",
      "Escalate"
    ],
    rewardLoop: ["Dropped pickups", "Power multipliers", "Wave clears", "Boss reward charge"],
    atmosphere: ["Alien infestation", "Spawn portals", "Combat holograms", "Dark arena grid"],
    transition: "Holographic teleport into an arena as portals warm up around the player.",
    soundHooks: ["Portal hum", "Projectile pulse", "Pickup sparkle", "Wave alarm"],
    mood: ["sci-fi", "immersive", "combat-heavy"],
    summary:
      "A combat systems space for survivor/horde loops: continuous enemy approach, projectile pressure, pickups, power growth, wave budgets, and performance handling.",
    route: "/projects/alien-survivor",
    projectSlug: "alien-survivor",
    demoSlug: "hero-survivor-wave-slice",
    systems: ["Enemy Waves", "Projectile Events", "Pickup Progression", "Spawn Budgets"],
    interactions: ["Playable wave slice", "Wave-system breakdown", "Optimization dashboard"],
    metrics: [
      { label: "Focus", value: "Combat", detail: "wave pressure" },
      { label: "Budget", value: "Spawn", detail: "mobile stability" },
      { label: "Loop", value: "Power", detail: "pickup growth" }
    ],
    accent: "signal"
  },
  {
    slug: "annoying-boss-lab",
    title: "Annoying Boss Lab",
    eyebrow: "Feedback Systems Zone",
    theme:
      "Stylized punch lab for stretchy glove aiming, stage targets, hit reactions, animation timing, and haptic-style game feel.",
    fantasy:
      "Aim an exaggerated stretchy glove, smash annoying bosses and office props, and push through comedic stages.",
    coreLoop: [
      "Aim glove",
      "Charge stretch",
      "Release punch",
      "Trigger reaction",
      "Break props",
      "Advance stage"
    ],
    rewardLoop: ["Impact score", "Stage clears", "Prop destruction", "Reaction chains"],
    atmosphere: ["Chaotic office", "Destruction lab", "Target room", "Comedic impact lighting"],
    transition: "Office elevator opens into a target room with punch trajectory preview lines.",
    soundHooks: ["Elastic stretch", "Impact slap", "Prop clatter", "Comedic sting"],
    mood: ["tactile", "playful", "responsive"],
    summary:
      "A satisfying interaction zone for the aim-charge-extend-hit loop behind stage-based punch gameplay and short-session polish.",
    route: "/projects/asmr-punch",
    projectSlug: "asmr-punch",
    demoSlug: "annoying-boss-punch-slice",
    systems: ["Stretch Input", "Hit Feedback", "Animation Timing", "Stage Flow"],
    interactions: ["Playable punch slice", "Impact timing panels", "Reaction flow charts"],
    metrics: [
      { label: "Feel", value: "Punch", detail: "stretch impact" },
      { label: "Loop", value: "Stages", detail: "target rooms" },
      { label: "System", value: "Events", detail: "feedback bus" }
    ],
    accent: "reactor"
  },
  {
    slug: "multiplayer-hub",
    title: "Multiplayer Systems Hub",
    eyebrow: "Network Architecture",
    theme:
      "Engineering command center with holographic sync displays and multiplayer topology visuals.",
    fantasy:
      "Step into a network operations room where live clients, prediction, and server authority become visible.",
    coreLoop: ["Join session", "Sync state", "Resolve events", "Handle latency", "Recover session"],
    rewardLoop: ["Stable tick", "Resolved packets", "Low jitter", "Session continuity"],
    atmosphere: ["Holographic nodes", "Packet trails", "Live session table", "Command lighting"],
    transition: "Holographic teleport snaps camera through connected network nodes.",
    soundHooks: ["Packet tick", "Sync lock", "Latency warning", "Session chime"],
    mood: ["technical", "precise", "systems-first"],
    summary:
      "A hub for Photon, Photon Quantum, and Colyseus architecture: client state, event flow, prediction boundaries, and session resolution.",
    route: "/systems",
    systems: ["Photon", "Photon Quantum", "Colyseus", "State Sync"],
    interactions: ["Packet/event rhythm", "Client/server topology", "Sync visualization"],
    metrics: [
      { label: "Stack", value: "Photon", detail: "realtime systems" },
      { label: "Stack", value: "Quantum", detail: "deterministic" },
      { label: "Stack", value: "Colyseus", detail: "server sessions" }
    ],
    accent: "signal"
  },
  {
    slug: "liveops-control",
    title: "Monetization & LiveOps Control",
    eyebrow: "Revenue Infrastructure",
    theme:
      "Analytics room for ad lifecycle visualization, remote config, ANR/FPS metrics, and live telemetry.",
    fantasy:
      "Operate the production control room where monetization, remote config, analytics, and stability stay coordinated.",
    coreLoop: [
      "Read telemetry",
      "Tune config",
      "Validate ad lifecycle",
      "Monitor ANR",
      "Protect session"
    ],
    rewardLoop: ["Stable FPS", "Reduced ANR", "Clean ad boundary", "LiveOps confidence"],
    atmosphere: [
      "Analytics walls",
      "Remote config panels",
      "Revenue flow traces",
      "Optimization graphs"
    ],
    transition: "Dashboard panels unfold into a live telemetry control room.",
    soundHooks: ["Data pulse", "Alert soften", "Config apply", "Revenue tick"],
    mood: ["dashboard", "production", "optimization"],
    summary:
      "A monetization and live-ops hub for AdMob, AppLovin MAX, AdColony, Facebook Audience Network, analytics, and remote-config safety.",
    route: "/systems",
    systems: ["AdMob", "AppLovin MAX", "AdColony", "Remote Config"],
    interactions: ["Ad lifecycle visualization", "Analytics dashboard", "ANR reduction metrics"],
    metrics: [
      { label: "SDK", value: "4+", detail: "ad networks" },
      { label: "Ops", value: "Live", detail: "remote config" },
      { label: "Quality", value: "ANR", detail: "reduction focus" }
    ],
    accent: "reactor"
  },
  {
    slug: "horror-atmosphere",
    title: "Atmosphere Systems Hallway",
    eyebrow: "Horror Experience",
    theme:
      "Elegant cinematic hallway inspired by atmosphere, memory, lighting, and interaction-based reveals.",
    fantasy:
      "Move through an atmospheric hallway where lighting, memory fragments, and UI reveals build tension without cheap scares.",
    coreLoop: [
      "Observe",
      "Approach trigger",
      "Reveal memory",
      "Shift lighting",
      "Progress hallway"
    ],
    rewardLoop: ["Story reveal", "Atmosphere shift", "UI discovery", "Cinematic transition"],
    atmosphere: ["Low light hallway", "Memory panels", "Soft fog", "Subtle motion"],
    transition: "Camera glides through a dark door into a softly lit reveal corridor.",
    soundHooks: ["Room tone", "Distant creak", "Memory swell", "Light buzz"],
    mood: ["cinematic", "subtle", "atmospheric"],
    summary:
      "A controlled atmosphere zone for lighting, environmental storytelling, sound-layering direction, and UI architecture without jumpscare gimmicks.",
    route: "/projects",
    systems: ["Lighting", "Reveal Triggers", "Sound Layering", "Environmental UI"],
    interactions: ["Subtle reveal transitions", "Atmosphere panels", "Interaction pacing"],
    metrics: [
      { label: "Mode", value: "Cinematic", detail: "no jumpscares" },
      { label: "System", value: "Reveal", detail: "interaction based" },
      { label: "Mood", value: "Horror", detail: "elegant" }
    ],
    accent: "danger"
  }
];

export function getProjectWorldZoneBySlug(slug: string) {
  return projectWorldZones.find((zone) => zone.slug === slug);
}
