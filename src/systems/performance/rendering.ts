export const webglPerformance = {
  dpr: [1, 1.5] as [number, number],
  cameraPosition: [0, 1.4, 6] as [number, number, number],
  glOptions: {
    antialias: true,
    powerPreference: "high-performance" as const,
    alpha: true
  },
  frameloop: "demand" as const,
  maxInteractiveDpr: 1.5
};

export const adaptiveRenderingStrategy = {
  desktop: {
    target: "Full cinematic environment",
    guidance: "Enable richer animated environment, larger compositions, and subtle camera movement."
  },
  tablet: {
    target: "Reduced cinematic environment",
    guidance: "Keep layout quality and reduce scene density."
  },
  mobile: {
    target: "Simplified readable environment",
    guidance: "Reduce rendering complexity and preserve navigation/readability."
  }
} as const;
