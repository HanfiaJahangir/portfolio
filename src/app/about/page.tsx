import { PageHeader } from "@/components/layout/PageHeader";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SdkExpertise } from "@/components/sections/SdkExpertise";
import { SystemsExpertise } from "@/components/sections/SystemsExpertise";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Senior Unity developer with a production-first gameplay mindset."
        description="Based in Lahore, Pakistan, focused on gameplay systems, mobile optimization, multiplayer features, and monetization infrastructure."
      />
      <ExperienceTimeline />
      <SystemsExpertise />
      <SdkExpertise />
    </>
  );
}
