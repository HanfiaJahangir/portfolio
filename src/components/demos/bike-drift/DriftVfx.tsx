"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshBasicMaterial } from "three";
import type { VehicleRuntime } from "@/components/demos/bike-drift/types";

type DriftVfxProps = {
  runtime: VehicleRuntime;
};

export function DriftVfx({ runtime }: DriftVfxProps) {
  const leftMaterialRef = useRef<MeshBasicMaterial>(null);
  const rightMaterialRef = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    const opacity = Math.min(0.55, runtime.driftAmount * Math.abs(runtime.speed) * 0.035);

    if (leftMaterialRef.current) {
      leftMaterialRef.current.opacity = opacity;
    }

    if (rightMaterialRef.current) {
      rightMaterialRef.current.opacity = opacity * 0.8;
    }
  });

  return (
    <group position={[0, 0.06, -1.1]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.32, 0, 0]}>
        <planeGeometry args={[0.1, 3.2]} />
        <meshBasicMaterial ref={leftMaterialRef} color="#38f2c2" transparent opacity={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.32, 0, 0]}>
        <planeGeometry args={[0.1, 3.2]} />
        <meshBasicMaterial ref={rightMaterialRef} color="#f7b955" transparent opacity={0} />
      </mesh>
    </group>
  );
}
