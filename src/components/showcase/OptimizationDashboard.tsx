import type { CaseStudySection, Project } from "@/types/portfolio";
import { MetricPill } from "@/components/ui/MetricPill";

type OptimizationDashboardProps = {
  project: Project;
  optimization: CaseStudySection;
};

export function OptimizationDashboard({ project, optimization }: OptimizationDashboardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-panel/75 p-5 shadow-command">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-reactor">
            Performance Dashboard
          </p>
          <h3 className="mt-3 text-2xl font-black text-ink">{optimization.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{optimization.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <MetricPill key={metric.label} {...metric} />
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-2 md:grid-cols-2">
        {optimization.bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-md border border-white/10 bg-void/45 p-3 text-sm text-muted"
          >
            {bullet}
          </div>
        ))}
      </div>
    </article>
  );
}
