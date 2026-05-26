"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { SceneStage } from "@/components/three/SceneStage";

export function FoundationScene() {
  return (
    <SceneCanvas className="h-full min-h-64 w-full">
      <SceneStage>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#38f2c2" roughness={0.45} />
        </mesh>
      </SceneStage>
    </SceneCanvas>
  );
}
