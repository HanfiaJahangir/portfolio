export type ExperienceTier = "desktop" | "tablet" | "mobile";

export const experienceTiers = {
  desktop: {
    minWidth: 1024,
    dpr: [1, 1.75] as [number, number],
    panelCount: 8,
    enableCameraDrift: true,
    enableAtmosphere: true,
    enableDenseMetrics: true,
    sceneScale: 1
  },
  tablet: {
    minWidth: 768,
    dpr: [1, 1.4] as [number, number],
    panelCount: 5,
    enableCameraDrift: true,
    enableAtmosphere: true,
    enableDenseMetrics: true,
    sceneScale: 0.84
  },
  mobile: {
    minWidth: 0,
    dpr: [1, 1.2] as [number, number],
    panelCount: 3,
    enableCameraDrift: false,
    enableAtmosphere: false,
    enableDenseMetrics: false,
    sceneScale: 0.68
  }
} as const;
