"use client";

import { PerspectiveCamera } from "@react-three/drei";
import type { ReactNode } from "react";
import { webglPerformance } from "@/systems/performance/rendering";

type SceneStageProps = {
  children?: ReactNode;
};

export function SceneStage({ children }: SceneStageProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={webglPerformance.cameraPosition} fov={42} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} />
      {children}
    </>
  );
}
