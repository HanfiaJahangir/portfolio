import ingestion from "@/data/playStoreIngestion.generated.json";
import type { Project, ProjectMediaAsset } from "@/types/portfolio";

type CachedAsset = {
  publicPath: string;
  remoteUrl?: string;
  width?: number;
  height?: number;
};

type IngestedProject = {
  slug: string;
  cachedAssets?: {
    icon?: CachedAsset | null;
    featureGraphic?: CachedAsset | null;
    screenshots?: CachedAsset[];
  };
};

const ingestedProjects = ingestion as IngestedProject[];

function isUsableFeatureGraphic(asset?: CachedAsset | null) {
  if (!asset) {
    return false;
  }

  if (!asset.width || !asset.height) {
    return true;
  }

  return asset.width >= 600 && asset.width / asset.height >= 1.4;
}

export function getCachedMediaForProject(project: Project) {
  const ingested = ingestedProjects.find((item) => item.slug === project.slug);
  const screenshots = ingested?.cachedAssets?.screenshots ?? [];
  const featureGraphic = ingested?.cachedAssets?.featureGraphic;
  const heroAsset = isUsableFeatureGraphic(featureGraphic) ? featureGraphic : screenshots[0];
  const icon = ingested?.cachedAssets?.icon;

  const media: ProjectMediaAsset[] = screenshots.map((asset, index) => ({
    type: "image",
    src: asset.publicPath,
    alt: `${project.title} screenshot ${index + 1}`,
    width: asset.width,
    height: asset.height,
    remoteSrc: asset.remoteUrl
  }));

  if (featureGraphic && isUsableFeatureGraphic(featureGraphic)) {
    media.unshift({
      type: "image",
      src: featureGraphic.publicPath,
      alt: `${project.title} feature graphic`,
      width: featureGraphic.width,
      height: featureGraphic.height,
      remoteSrc: featureGraphic.remoteUrl
    });
  }

  return {
    image: heroAsset?.publicPath ?? project.image,
    icon: icon?.publicPath ?? project.icon,
    media: media.length > 0 ? media : project.media
  };
}
