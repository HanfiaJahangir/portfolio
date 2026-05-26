import { PageHeader } from "@/components/layout/PageHeader";
import { DemoLauncher } from "@/components/showcase/DemoLauncher";
import { SdkExpertise } from "@/components/sections/SdkExpertise";
import { SystemsExpertise } from "@/components/sections/SystemsExpertise";

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Systems"
        title="Gameplay systems, multiplayer, optimization, monetization, and tooling."
        description="A technical map of the production systems represented across the project archive."
      />
      <SystemsExpertise />
      <SdkExpertise />
      <DemoLauncher />
    </>
  );
}
