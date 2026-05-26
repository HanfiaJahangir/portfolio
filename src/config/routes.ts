export const routes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  systems: "/systems",
  contact: "/contact",
  resume: "/resume/Hanfia-Jahangir-Resume.pdf"
} as const;

export type AppRouteKey = keyof typeof routes;
export type AppRoute = (typeof routes)[AppRouteKey];
