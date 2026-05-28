import { demoModules } from "@/data/demoModules";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function DemoLauncher() {
  const availableDemos = demoModules.filter((demo) => demo.status === "available");

  return (
    <PageSection>
      <PageContainer>
        <SectionHeader
          eyebrow="Playable Labs"
          title="Focused interaction slices mounted inside the engineering facility."
          description="Each lab is intentionally compact: a polished mechanic loop, clear controls, and production-minded systems framing without slowing the main portfolio."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {availableDemos.map((demo) => (
            <article key={demo.slug} className="rounded-lg border border-white/10 bg-panel/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-reactor">Ready</p>
              <h3 className="mt-3 text-xl font-bold text-ink">{demo.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{demo.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {demo.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded bg-signal/10 px-2.5 py-1 text-xs text-signal"
                  >
                    {system}
                  </span>
                ))}
              </div>
              {demo.route ? (
                <div className="mt-5">
                  <Button href={demo.route} variant="secondary">
                    Enter lab
                  </Button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
