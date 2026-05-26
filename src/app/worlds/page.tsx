import { ProjectWorlds } from "@/components/sections/ProjectWorlds";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Interactive Worlds | Hanfia Jahangir"
};

export default function WorldsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive Engineering Universe"
        title="Playable project worlds for systems, shipped games, and production architecture."
        description="A controlled navigation layer for racing, combat, feedback, multiplayer, monetization, optimization, and atmosphere systems."
      />
      <ProjectWorlds />
    </>
  );
}
