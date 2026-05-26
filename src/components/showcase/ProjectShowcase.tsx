import { allProjects } from "@/data/allProjects";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { ProjectTerminalCard } from "@/components/showcase/ProjectTerminalCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProjectShowcase() {
  return (
    <PageSection>
      <PageContainer>
        <SectionHeader
          eyebrow="Production Work"
          title="Shipped games and systems-first showcases."
          description="Projects are generated from centralized data and asset manifests, allowing new showcase pages to be added by updating project data and dropping assets into public/projects."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectTerminalCard key={project.slug} project={project} />
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
