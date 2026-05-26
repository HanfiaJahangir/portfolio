import { sdkExpertise } from "@/data/sdkExpertise";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const dashboardGroups = [
  {
    title: "Gameplay Systems",
    items: [
      "Vehicle controllers",
      "Combat systems",
      "AI systems",
      "Pooling",
      "Input systems",
      "UI systems"
    ]
  },
  {
    title: "Optimization",
    items: [
      "60 FPS targets",
      "ANR reduction",
      "Memory optimization",
      "Object pooling",
      "Remote config tuning"
    ]
  },
  ...sdkExpertise.map((group) => ({ title: group.title, items: group.sdks }))
];

export function SystemsDashboard() {
  return (
    <PageSection className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,242,194,0.08),transparent_28%),radial-gradient(circle_at_80%_40%,rgba(247,185,85,0.08),transparent_24%)]" />
      <PageContainer size="wide" className="relative">
        <SectionHeader
          eyebrow="Systems Dashboard"
          title="A technical command surface for gameplay, multiplayer, monetization, Web3, and optimization."
          description="Built to communicate systems ownership quickly on desktop while remaining readable on smaller screens."
        />
        <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {dashboardGroups.map((group, index) => (
            <article
              key={group.title}
              className="rounded-lg border border-white/10 bg-void/62 p-5 shadow-command backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-signal/35"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-ink">{group.title}</h3>
                <span className="text-xs font-bold text-muted">0{index + 1}</span>
              </div>
              <div className="mt-5 grid gap-2">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
