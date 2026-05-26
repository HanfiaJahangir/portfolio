import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <PageSection spacing="compact" className="pt-28">
      <PageContainer size="narrow">
        <p className="text-eyebrow font-bold uppercase text-signal">{eyebrow}</p>
        <h1 className="mt-4 text-h1 font-black text-ink">{title}</h1>
        {description ? <p className="mt-5 text-lead text-muted">{description}</p> : null}
      </PageContainer>
    </PageSection>
  );
}
