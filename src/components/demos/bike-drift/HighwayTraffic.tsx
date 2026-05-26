"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import type { VehicleRuntimeRef } from "@/components/demos/bike-drift/types";

type TrafficVehicle = {
  id: string;
  laneX: number;
  startZ: number;
  color: string;
  speedOffset: number;
};

const lanes = [-5.2, -1.75, 1.75, 5.2];
const travelLength = 150;
const nearZ = -26;

type HighwayTrafficProps = {
  runtimeRef: VehicleRuntimeRef;
};

export function HighwayTraffic({ runtimeRef }: HighwayTrafficProps) {
  const traffic = useMemo<TrafficVehicle[]>(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: `traffic-${index}`,
        laneX: lanes[(index * 3) % lanes.length],
        startZ: 24 + index * 15,
        color: index % 3 === 0 ? "#f7b955" : index % 3 === 1 ? "#38f2c2" : "#7c8cff",
        speedOffset: 0.35 + (index % 4) * 0.08
      })),
    []
  );

  return (
    <group>
      {traffic.map((vehicle) => (
        <TrafficCar key={vehicle.id} vehicle={vehicle} runtimeRef={runtimeRef} />
      ))}
    </group>
  );
}

function TrafficCar({
  vehicle,
  runtimeRef
}: {
  vehicle: TrafficVehicle;
  runtimeRef: VehicleRuntimeRef;
}) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const runtime = runtimeRef.current;
    const scroll = runtime.distance * (1.1 + vehicle.speedOffset);
    const wrapped =
      ((((vehicle.startZ - scroll) % travelLength) + travelLength) % travelLength) + nearZ;
    ref.current.position.set(vehicle.laneX, 0.02, wrapped);

    const canCrash = runtime.speed > 4 && !runtime.isCrashed;
    const isLaneHit = Math.abs(vehicle.laneX - runtime.position.x) < 1.25;
    const isDepthHit = Math.abs(wrapped - runtime.position.z) < 1.75;

    if (canCrash && isLaneHit && isDepthHit) {
      runtime.isCrashed = true;
      runtime.speed = 0;
    }
  });

  return (
    <group ref={ref} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.45, 0.48, 2.4]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#09111f"
          emissiveIntensity={0.35}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[0, 0.72, -0.12]}>
        <boxGeometry args={[1.05, 0.35, 1.1]} />
        <meshStandardMaterial
          color={vehicle.color}
          emissive={vehicle.color}
          emissiveIntensity={0.35}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.46, 0.42, 1.22]}>
        <boxGeometry args={[0.28, 0.12, 0.08]} />
        <meshBasicMaterial color="#f7b955" />
      </mesh>
      <mesh position={[0.46, 0.42, 1.22]}>
        <boxGeometry args={[0.28, 0.12, 0.08]} />
        <meshBasicMaterial color="#f7b955" />
      </mesh>
      <pointLight position={[0, 0.55, 1.35]} color={vehicle.color} intensity={0.55} distance={5} />
    </group>
  );
}
