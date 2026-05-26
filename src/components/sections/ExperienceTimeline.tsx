import { experience } from "@/data/experience";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/animations/MotionReveal";

export function ExperienceTimeline() {
  return (
    <PageSection>
      <PageContainer>
        <SectionHeader
          eyebrow="Experience"
          title="Production ownership across gameplay, multiplayer, and mobile systems."
          description="The timeline groups the existing portfolio story around engineering ownership and production impact."
        />
        <div className="relative grid gap-5 before:absolute before:left-4 before:top-0 before:hidden before:h-full before:w-px before:bg-white/10 md:before:block">
          {experience.map((item) => (
            <MotionReveal key={`${item.company}-${item.role}`}>
              <article className="relative rounded-lg border border-white/10 bg-panel/75 p-5 md:ml-12 md:p-6">
                <span className="absolute -left-[2.95rem] top-6 hidden h-3 w-3 rounded-full border border-signal bg-void shadow-glow md:block" />
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-ink">{item.role}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.company}
                      {item.location ? ` - ${item.location}` : ""}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{item.summary}</p>
                <ul className="mt-5 grid gap-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-muted"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
