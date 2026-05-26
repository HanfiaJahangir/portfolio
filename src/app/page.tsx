import { CinematicHero } from "@/components/sections/CinematicHero";
import { DemoLauncher } from "@/components/showcase/DemoLauncher";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";
import { SdkExpertise } from "@/components/sections/SdkExpertise";
import { SystemsExpertise } from "@/components/sections/SystemsExpertise";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProjectShowcase />
      <SystemsExpertise />
      <SdkExpertise />
      <ExperienceTimeline />
      <DemoLauncher />
    </>
  );
}
