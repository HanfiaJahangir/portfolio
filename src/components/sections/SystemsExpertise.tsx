import { expertiseAreas, systemCapabilities } from "@/data/expertise";
import { skillGroups } from "@/data/skills";
import { SystemCard } from "@/components/cards/SystemCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SystemsExpertise() {
  return (
    <PageSection>
      <PageContainer>
        <SectionHeader
          eyebrow="Systems Expertise"
          title="Gameplay engineering presented as architecture, not buzzwords."
          description="This section makes seniority visible through reusable systems, production constraints, and tool-aware implementation."
        />
        <ResponsiveGrid columns="four">
          {expertiseAreas.map((area) => (
            <article key={area.title} className="rounded-lg border border-white/10 bg-panel/70 p-5">
              <h3 className="text-lg font-bold text-ink">{area.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{area.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {area.proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded bg-signal/10 px-2.5 py-1 text-xs text-signal"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </ResponsiveGrid>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {systemCapabilities.map((system) => (
            <SystemCard key={system.title} system={system} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
            >
              <h3 className="text-lg font-bold text-ink">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
