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
  status: "planned" | "scaffolded";
  summary: string;
  systems: string[];
};
