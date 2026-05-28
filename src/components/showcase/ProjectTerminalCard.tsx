import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { getCaseStudyByProjectSlug } from "@/data/caseStudies";
import { getDemoModuleBySlug } from "@/data/demoModules";
import { imageSizes } from "@/systems/performance/images";

type ProjectTerminalCardProps = {
  project: Project;
};

export function ProjectTerminalCard({ project }: ProjectTerminalCardProps) {
  const caseStudy = getCaseStudyByProjectSlug(project.slug);
  const demo = caseStudy?.demoSlug ? getDemoModuleBySlug(caseStudy.demoSlug) : undefined;

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command transition duration-300 hover:-translate-y-1 hover:border-signal/45 hover:shadow-glow">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} showcase`}
          fill
          sizes={imageSizes.card}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        {project.icon ? (
          <Image
            src={project.icon}
            alt={`${project.title} icon`}
            width={64}
            height={64}
            className="absolute left-4 top-4 rounded-lg border border-white/15 bg-void/70 p-1 backdrop-blur"
          />
        ) : null}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            {project.genre}
          </p>
          <h3 className="mt-2 text-2xl font-black text-ink">{project.title}</h3>
        </div>
      </div>
      <div className="grid gap-5 p-5">
        <p className="text-sm leading-6 text-muted">{project.summary}</p>
        <div className="rounded-md border border-white/10 bg-void/45 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-reactor">
            Engineering highlight
          </p>
          <p className="mt-2 text-sm leading-6 text-ink">{project.engineeringHighlights[0]}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.slice(0, 3).map((metric) => (
            <MetricPill key={`${project.slug}-${metric.label}`} {...metric} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(project.tags ?? project.technologies).slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href={`/projects/${project.slug}`}>Open terminal</Button>
          <Button href={demo?.route ?? `/projects/${project.slug}#demo`} variant="ghost">
            {demo?.route ? "Enter lab" : "View systems"}
          </Button>
          {project.playStoreUrl ? (
            <Button
              href={project.playStoreUrl}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              Play Store
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
