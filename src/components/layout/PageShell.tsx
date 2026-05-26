import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { CommandNav } from "@/components/navigation/CommandNav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-void text-ink">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,242,194,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(247,185,85,0.09),transparent_25%),linear-gradient(180deg,#05070d_0%,#07101b_52%,#05070d_100%)]" />
      <div className="fixed inset-0 -z-10 bg-scan-grid bg-[length:48px_48px] opacity-30" />
      <CommandNav />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
