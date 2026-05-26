export type ProjectStatus = "shipped" | "prototype" | "live-ops";

export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectMediaAsset = {
  type: "image" | "video" | "icon" | "logo" | "trailer" | "thumbnail";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  remoteSrc?: string;
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  summary: string;
  role: string;
  image: string;
  icon?: string;
  logo?: string;
  assetBasePath?: string;
  storeId?: string;
  genre?: string;
  developer?: string;
  downloads?: string;
  updatedOn?: string;
  tags?: string[];
  achievements?: string[];
  media?: ProjectMediaAsset[];
  playStoreUrl?: string;
  technologies: string[];
  systems: string[];
  engineeringHighlights: string[];
  challenge: string;
  solution: string;
  impact: string;
  metrics: Metric[];
};

export type ExpertiseArea = {
  title: string;
  description: string;
  proofPoints: string[];
};

export type SystemCapability = {
  title: string;
  category:
    | "Gameplay"
    | "Mobile"
    | "Multiplayer"
    | "Monetization"
    | "Leadership"
    | "LiveOps"
    | "Architecture"
    | "Tooling";
  description: string;
  signals: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Achievement = {
  label: string;
  value: string;
  description: string;
};

export type SdkExpertiseGroup = {
  title: string;
  description: string;
  sdks: string[];
};

export type DemoModule = {
  slug: string;
  title: string;
  status: "planned" | "scaffolded" | "available";
  summary: string;
  systems: string[];
  projectSlug?: string;
  renderer?: "r3f" | "dom" | "unity-webgl";
  route?: string;
};

export type ProjectWorldZone = {
  slug: string;
  title: string;
  eyebrow: string;
  theme: string;
  fantasy: string;
  coreLoop: string[];
  rewardLoop: string[];
  atmosphere: string[];
  transition: string;
  soundHooks: string[];
  mood: string[];
  summary: string;
  route: string;
  projectSlug?: string;
  demoSlug?: string;
  systems: string[];
  interactions: string[];
  metrics: Metric[];
  accent: "signal" | "reactor" | "danger" | "ink";
};

export type FlowNode = {
  id: string;
  label: string;
  description?: string;
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
};

export type CaseStudySection = {
  title: string;
  description: string;
  bullets: string[];
};

export type FlowDiagram = {
  title: string;
  description: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
};

export type CaseStudy = {
  projectSlug: string;
  overview: string;
  role: string;
  coreSystems: CaseStudySection[];
  architecture: FlowDiagram;
  optimization: CaseStudySection;
  sdkIntegrations: FlowDiagram;
  multiplayer?: FlowDiagram;
  monetization?: FlowDiagram;
  lessonsLearned: string[];
  demoSlug?: string;
};
