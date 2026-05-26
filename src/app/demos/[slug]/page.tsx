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
          <DemoMount demo={demo} />
        </PageContainer>
      </PageSection>
    </>
  );
}
