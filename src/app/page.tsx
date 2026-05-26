import { CinematicHero } from "@/components/sections/CinematicHero";
import { DemoLauncher } from "@/components/showcase/DemoLauncher";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { FeaturedProjectTerminals } from "@/components/sections/FeaturedProjectTerminals";
import { ProjectWorlds } from "@/components/sections/ProjectWorlds";
import { SystemsDashboard } from "@/components/sections/SystemsDashboard";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProjectWorlds />
      <FeaturedProjectTerminals />
      <SystemsDashboard />
      <ExperienceTimeline />
      <DemoLauncher />
    </>
  );
}
