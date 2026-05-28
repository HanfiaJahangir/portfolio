import { notFound } from "next/navigation";
import { demoModules, getDemoModuleBySlug } from "@/data/demoModules";
import { DemoMount } from "@/components/showcase/DemoMount";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageSection } from "@/components/layout/PageSection";

type DemoPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return demoModules.map((demo) => ({ slug: demo.slug }));
}

export function generateMetadata({ params }: DemoPageProps) {
  const demo = getDemoModuleBySlug(params.slug);

  return {
    title: demo ? `${demo.title} | Demo` : "Demo not found"
  };
}

export default function DemoPage({ params }: DemoPageProps) {
  const demo = getDemoModuleBySlug(params.slug);

  if (!demo) {
    notFound();
  }

  if (demo.slug === "bike-drift-mechanic") {
    return (
      <section className="min-h-dvh overflow-hidden bg-void">
        <DemoMount demo={demo} />
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Playable Showcase" title={demo.title} description={demo.summary} />
      <PageSection spacing="compact">
        <PageContainer>
          <div className="mb-5 overflow-hidden rounded-lg border border-white/10 bg-void/70 p-4 shadow-command backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
                  Facility transfer complete
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Demo chamber loaded as an isolated interaction slice inside the gameplay
                  engineering facility.
                </p>
              </div>
              <div className="flex gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  Safe mount
                </span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  Dual controls
                </span>
              </div>
            </div>
          </div>
          <DemoMount demo={demo} />
        </PageContainer>
      </PageSection>
    </>
  );
}
