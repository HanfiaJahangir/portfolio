import { sdkExpertise } from "@/data/sdkExpertise";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SdkExpertise() {
  return (
    <PageSection spacing="compact">
      <PageContainer>
        <SectionHeader
          eyebrow="SDK Architecture"
          title="Monetization, multiplayer, Web3, and third-party integrations at production scale."
          description="SDK expertise is separated into production categories so technical ownership is visible to recruiters and engineering leads."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {sdkExpertise.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-white/10 bg-panel/75 p-5 shadow-command"
            >
              <h3 className="text-xl font-black text-ink">{group.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{group.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.sdks.map((sdk) => (
                  <span
                    key={sdk}
                    className="rounded-md border border-signal/20 bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal"
                  >
                    {sdk}
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
