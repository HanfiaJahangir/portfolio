import type { Project } from "@/types/portfolio";

export function CaseStudyPanel({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.04] p-5 md:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            {project.status}
          </p>
          <h3 className="mt-3 text-2xl font-black text-ink">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.systems.map((system) => (
              <span
                key={system}
                className="rounded-md border border-reactor/30 bg-reactor/10 px-2.5 py-1 text-xs font-semibold text-reactor"
              >
                {system}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h4 className="text-sm font-bold text-ink">Challenge</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{project.challenge}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink">Solution</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{project.solution}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink">Impact</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{project.impact}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
