import type { CaseStudy, Project } from "@/types/portfolio";
import { ArchitectureCards } from "@/components/showcase/ArchitectureCards";
import { OptimizationDashboard } from "@/components/showcase/OptimizationDashboard";
import { SystemFlowDiagram } from "@/components/showcase/SystemFlowDiagram";

type CaseStudyModuleProps = {
  project: Project;
  caseStudy: CaseStudy;
};

export function CaseStudyModule({ project, caseStudy }: CaseStudyModuleProps) {
  return (
    <div className="grid gap-6">
      <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
          Technical Case Study
        </p>
        <h2 className="mt-3 text-3xl font-black text-ink">{project.title} Engineering Breakdown</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted">{caseStudy.overview}</p>
        <p className="mt-4 text-sm font-semibold text-reactor">{caseStudy.role}</p>
      </article>
      <ArchitectureCards sections={caseStudy.coreSystems} />
      <SystemFlowDiagram diagram={caseStudy.architecture} />
      <OptimizationDashboard project={project} optimization={caseStudy.optimization} />
      <SystemFlowDiagram diagram={caseStudy.sdkIntegrations} />
      {caseStudy.multiplayer ? <SystemFlowDiagram diagram={caseStudy.multiplayer} /> : null}
      {caseStudy.monetization ? <SystemFlowDiagram diagram={caseStudy.monetization} /> : null}
      <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h3 className="text-xl font-black text-ink">Lessons Learned</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {caseStudy.lessonsLearned.map((lesson) => (
            <p
              key={lesson}
              className="rounded-md border border-white/10 bg-void/45 p-3 text-sm leading-6 text-muted"
            >
              {lesson}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
