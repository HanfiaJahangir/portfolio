"use client";

import { Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { VehicleRuntimeRef } from "@/components/demos/bike-drift/types";

const segmentLength = 18;
const segmentCount = 12;
const roadWidth = 14;

type DriftTrackProps = {
  runtimeRef: VehicleRuntimeRef;
};

export function DriftTrack({ runtimeRef }: DriftTrackProps) {
  const roadRef = useRef<Group>(null);

  useFrame(() => {
    if (roadRef.current) {
      roadRef.current.position.z = -(runtimeRef.current.distance % segmentLength);
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <planeGeometry args={[120, 260]} />
        <meshStandardMaterial color="#070b12" roughness={0.7} metalness={0.1} />
      </mesh>
      <group ref={roadRef}>
        {Array.from({ length: segmentCount }, (_, index) => {
          const z = index * segmentLength - 28;

          return (
            <group key={z} position={[0, 0, z]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
                <planeGeometry args={[roadWidth, segmentLength - 0.4]} />
                <meshStandardMaterial color="#101827" roughness={0.55} metalness={0.2} />
              </mesh>
              {[-roadWidth / 2, roadWidth / 2].map((x) => (
                <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.016, 0]}>
                  <planeGeometry args={[0.16, segmentLength - 0.8]} />
                  <meshStandardMaterial
                    color="#38f2c2"
                    emissive="#38f2c2"
                    emissiveIntensity={0.45}
                  />
                </mesh>
              ))}
              {[-2.35, 2.35].map((x) => (
                <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.014, 0]}>
                  <planeGeometry args={[0.08, 7.2]} />
                  <meshStandardMaterial
                    color="#f7b955"
                    emissive="#f7b955"
                    emissiveIntensity={0.35}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
      {[-18, 18].map((x) => (
        <group key={x} position={[x, 0, 34]}>
          <mesh position={[0, 1.7, 0]}>
            <boxGeometry args={[0.16, 3.4, 130]} />
            <meshStandardMaterial color="#1d3545" emissive="#0b2533" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <boxGeometry args={[0.26, 0.18, 130]} />
            <meshStandardMaterial color="#38f2c2" emissive="#38f2c2" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}
      <Grid
        position={[0, -0.01, 40]}
        args={[120, 180]}
        cellSize={2}
        cellThickness={0.28}
        cellColor="#1d3545"
        sectionSize={10}
        sectionThickness={0.6}
        sectionColor="#38f2c2"
        fadeDistance={48}
        fadeStrength={1.5}
      />
    </group>
  );
}
