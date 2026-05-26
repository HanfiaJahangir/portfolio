import { projects } from "@/data/projects";
import { playStoreProjects } from "@/data/playStoreProjects";
import { getCachedMediaForProject } from "@/data/projectMedia";

const hydratedPlayStoreProjects = playStoreProjects.map((project) => ({
  ...project,
  ...getCachedMediaForProject(project)
}));

export const allProjects = [...hydratedPlayStoreProjects, ...projects];

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}
