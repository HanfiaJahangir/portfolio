import { playStoreProjects } from "@/data/playStoreProjects";
import { getCachedMediaForProject } from "@/data/projectMedia";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { ProjectTerminalCard } from "@/components/showcase/ProjectTerminalCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featuredProjects = playStoreProjects.map((project) => ({
  ...project,
  ...getCachedMediaForProject(project)
}));

export function FeaturedProjectTerminals() {
  return (
    <PageSection className="relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
      <PageContainer size="wide">
        <SectionHeader
          eyebrow="Project Terminals"
          title="Shipped game terminals with production systems visible."
          description="Each terminal is generated from structured project data and cached Play Store media, with detail pages ready for playable demos and deeper engineering writeups."
        />
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectTerminalCard key={project.slug} project={project} />
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
