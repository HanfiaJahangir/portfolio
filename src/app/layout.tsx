import type { Metadata, Viewport } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanfia Jahangir | Senior Unity Gameplay Engineer",
  description:
    "Premium interactive portfolio for a Senior Unity Gameplay Engineer focused on gameplay systems, mobile optimization, multiplayer, and monetization infrastructure."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PageShell>{children}</PageShell>
        <Analytics />
      </body>
    </html>
  );
}
