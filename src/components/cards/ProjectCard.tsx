import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { imageSizes } from "@/systems/performance/images";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command transition duration-300 hover:-translate-y-1 hover:border-signal/40 hover:bg-panelSoft/80">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} gameplay preview`}
          fill
          sizes={featured ? imageSizes.feature : imageSizes.card}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded bg-void/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-signal backdrop-blur">
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-signal">
            {project.role}
          </p>
          <h3 className="text-xl font-bold text-ink">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <MetricPill key={`${project.slug}-${metric.label}`} {...metric} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={`${project.slug}-${technology}`}
              className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-muted"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <Button href={`/projects#${project.slug}`} variant="secondary">
            Technical breakdown
          </Button>
          {project.playStoreUrl ? (
            <Button href={project.playStoreUrl} variant="ghost" target="_blank" rel="noreferrer">
              Play Store
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
