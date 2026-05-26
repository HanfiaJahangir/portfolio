import { routes } from "@/config/routes";

export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  isPrimary?: boolean;
  external?: boolean;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: routes.home, description: "Overview" },
  { label: "Projects", href: routes.projects, description: "Case studies" },
  { label: "Systems", href: routes.systems, description: "Engineering capabilities" },
  { label: "About", href: routes.about, description: "Profile" },
  { label: "Contact", href: routes.contact, description: "Direct contact" }
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Resume", href: routes.resume, description: "Download PDF", isPrimary: true }
];
