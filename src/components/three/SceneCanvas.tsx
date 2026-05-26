"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { webglPerformance } from "@/systems/performance/rendering";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
};

export function SceneCanvas({ children, className }: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={webglPerformance.dpr}
      frameloop={webglPerformance.frameloop}
      gl={webglPerformance.glOptions}
    >
      {children}
    </Canvas>
  );
}
