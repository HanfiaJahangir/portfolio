import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { FacilityAtmosphere } from "@/components/layout/FacilityAtmosphere";
import { FacilityGuide } from "@/components/layout/FacilityGuide";
import { CommandNav } from "@/components/navigation/CommandNav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-void text-ink">
      <FacilityAtmosphere />
      <CommandNav />
      <FacilityGuide />
      <main id="main-content" className="facility-page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
