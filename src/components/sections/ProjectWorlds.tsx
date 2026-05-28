import { projectWorldZones } from "@/data/projectWorlds";
import { getDemoModuleBySlug } from "@/data/demoModules";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { SectionHeader } from "@/components/ui/SectionHeader";

const accentClasses = {
  signal: "border-signal/35 bg-signal/10 text-signal",
  reactor: "border-reactor/35 bg-reactor/10 text-reactor",
  danger: "border-danger/35 bg-danger/10 text-danger",
  ink: "border-ink/25 bg-ink/10 text-ink"
};

const zoneGlowClasses = {
  signal: "hover:border-signal/50 hover:shadow-glow",
  reactor: "hover:border-reactor/50 hover:shadow-[0_0_36px_rgba(247,185,85,0.18)]",
  danger: "hover:border-danger/50 hover:shadow-[0_0_36px_rgba(255,89,115,0.16)]",
  ink: "hover:border-ink/40 hover:shadow-command"
};

export function ProjectWorlds() {
  return (
    <PageSection className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-signal/25 to-reactor/20" />
      <div className="absolute left-1/2 top-28 hidden h-[calc(100%-10rem)] w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />
      <PageContainer size="wide" className="relative z-content">
        <SectionHeader
          eyebrow="Facility Transit"
          title="One connected engineering complex, divided into specialized gameplay labs."
          description="Move through racing simulation, combat systems, feedback testing, multiplayer operations, monetization control, and atmosphere labs as one coherent production facility."
        />

        <div className="mb-6 grid gap-3 rounded-lg border border-white/10 bg-void/62 p-4 shadow-command backdrop-blur-xl lg:grid-cols-4">
          {[
            ["Entry", "Command Deck"],
            ["Flow", "Guided exploration"],
            ["Signal", "Playable labs"],
            ["Output", "Engineering proof"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{label}</p>
              <p className="mt-1 text-sm font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projectWorldZones.map((zone, index) => {
            const demo = zone.demoSlug ? getDemoModuleBySlug(zone.demoSlug) : undefined;

            return (
              <article
                key={zone.slug}
                className={`group relative min-h-[330px] overflow-hidden rounded-lg border border-white/10 bg-panel/72 p-5 shadow-command transition duration-300 hover:-translate-y-1 ${zoneGlowClasses[zone.accent]}`}
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10 transition duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-5 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="pointer-events-none absolute left-0 top-10 h-px w-full bg-gradient-to-r from-transparent via-signal/20 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <div className="relative z-content flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">
                        {zone.eyebrow}
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-ink">{zone.title}</h3>
                    </div>
                    <span
                      className={`rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.16em] ${accentClasses[zone.accent]}`}
                    >
                      LAB {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-muted">{zone.summary}</p>

                  <div className="rounded-md border border-white/10 bg-void/45 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">
                      Player Fantasy
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink">{zone.fantasy}</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <WorldList title="Core Loop" items={zone.coreLoop} />
                    <WorldList title="Reward Loop" items={zone.rewardLoop} />
                  </div>

                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-reactor">
                      Spatial Transition
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">{zone.transition}</p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    {zone.metrics.map((metric) => (
                      <MetricPill
                        key={`${zone.slug}-${metric.label}-${metric.value}`}
                        {...metric}
                      />
                    ))}
                  </div>

                  <div className="mt-auto grid gap-4">
                    <div className="flex flex-wrap gap-2">
                      {[...zone.systems.slice(0, 3), ...zone.atmosphere.slice(0, 2)].map(
                        (system) => (
                          <span
                            key={system}
                            className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted"
                          >
                            {system}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button href={zone.route}>Enter zone</Button>
                      {demo?.route ? (
                        <Button href={demo.route} variant="ghost">
                          Play slice
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </PageSection>
  );
}

function WorldList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{title}</p>
      <ul className="mt-3 grid gap-2">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-5 text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
