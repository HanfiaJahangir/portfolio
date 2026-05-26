const projectAssetFolders = {
  icon: "icon",
  screenshots: "screenshots",
  featureGraphics: "feature-graphics",
  trailers: "trailers",
  thumbnails: "thumbnails",
  metadata: "metadata"
} as const;

export type ProjectAssetFolder = keyof typeof projectAssetFolders;

export function getProjectAssetBase(slug: string) {
  return `/projects/${slug}`;
}

export function getProjectAssetPath(slug: string, folder: ProjectAssetFolder, fileName: string) {
  return `${getProjectAssetBase(slug)}/${projectAssetFolders[folder]}/${fileName}`;
}

export function getProjectMetadataPath(slug: string) {
  return `${getProjectAssetBase(slug)}/metadata/store.json`;
}
