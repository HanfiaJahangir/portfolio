import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { MediaGallery } from "@/components/gallery/MediaGallery";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";

type ProjectDetailViewProps = {
  project: Project;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <>
      <section className="relative overflow-hidden px-page pb-16 pt-28">
        <div className="absolute inset-0 opacity-35">
          <Image src={project.image} alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/88 to-void" />
        <PageContainer className="relative z-content">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-eyebrow font-bold uppercase text-signal">{project.genre}</p>
              <h1 className="mt-4 text-h1 font-black text-ink">{project.title}</h1>
              <p className="mt-5 max-w-3xl text-lead text-muted">{project.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.playStoreUrl ? (
                  <Button href={project.playStoreUrl} target="_blank" rel="noreferrer">
                    View Play Store
                  </Button>
                ) : null}
                <Button href="/projects" variant="secondary">
                  All projects
                </Button>
              </div>
            </div>
            <div className="grid gap-3 rounded-lg border border-white/10 bg-void/68 p-4 backdrop-blur-xl">
              {project.metrics.map((metric) => (
                <MetricPill key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageSection spacing="compact">
        <PageContainer>
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <MediaGallery assets={project.media ?? []} title={project.title} />
            <div className="grid gap-4">
              {[
                ["Challenge", project.challenge],
                ["Solution", project.solution],
                ["Impact", project.impact]
              ].map(([label, value]) => (
                <article key={label} className="rounded-lg border border-white/10 bg-panel/70 p-5">
                  <h2 className="text-lg font-bold text-ink">{label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{value}</p>
                </article>
              ))}
            </div>
          </div>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-bold text-ink">Technology Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded bg-signal/10 px-2.5 py-1 text-xs text-signal"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-bold text-ink">Architecture Highlights</h2>
              <ul className="mt-4 grid gap-2">
                {project.engineeringHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-bold text-ink">Future Demo Slot</h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                This detail page is ready for a lazy-loaded playable mechanic slice, technical
                diagram, or optimization visualizer.
              </p>
            </article>
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 lg:col-span-3">
              <h2 className="text-xl font-bold text-ink">Production Systems</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {(project.achievements ?? project.engineeringHighlights)
                  .slice(0, 3)
                  .map((achievement) => (
                    <p
                      key={achievement}
                      className="rounded-md border border-white/10 bg-void/45 p-3 text-sm leading-6 text-muted"
                    >
                      {achievement}
                    </p>
                  ))}
              </div>
            </article>
          </div>
        </PageContainer>
      </PageSection>
    </>
  );
}
