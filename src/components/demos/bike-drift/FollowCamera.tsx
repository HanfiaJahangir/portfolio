"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { VehicleRuntimeRef } from "@/components/demos/bike-drift/types";

const cameraPosition = new Vector3(0, 3.25, -6.4);
const lookTarget = new Vector3(0, 0.35, 6.4);

type FollowCameraProps = {
  runtimeRef: VehicleRuntimeRef;
};

export function FollowCamera({ runtimeRef }: FollowCameraProps) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const runtime = runtimeRef.current;
    const desiredPosition = new Vector3(
      runtime.position.x * 0.42 + cameraPosition.x,
      cameraPosition.y + runtime.speed * 0.01,
      cameraPosition.z - runtime.speed * 0.018
    );
    const desiredLookTarget = new Vector3(runtime.position.x * 0.18, lookTarget.y, lookTarget.z);

    camera.position.lerp(desiredPosition, Math.min(1, delta * 4));
    camera.lookAt(desiredLookTarget);
  });

  return null;
}
