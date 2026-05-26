import { PageHeader } from "@/components/layout/PageHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";
import { CaseStudyPanel } from "@/components/showcase/CaseStudyPanel";
import { allProjects } from "@/data/allProjects";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Shipped work and technical case studies."
        description="Preserved project content from the original portfolio, reorganized into scalable engineering case-study architecture."
      />
      <ProjectShowcase />
      <PageSection spacing="compact">
        <PageContainer>
          <div className="grid gap-4">
            {allProjects.map((project) => (
              <CaseStudyPanel key={project.slug} project={project} />
            ))}
          </div>
        </PageContainer>
      </PageSection>
    </>
  );
}
