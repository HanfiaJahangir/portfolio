"use client";

import { forwardRef } from "react";
import type { Group } from "three";

export const BikeVehicle = forwardRef<Group>(function BikeVehicle(_, ref) {
  return (
    <group ref={ref} scale={1.65}>
      <mesh position={[0, 0.34, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.92, 10]} />
        <meshStandardMaterial
          color="#38f2c2"
          emissive="#0b8f72"
          emissiveIntensity={0.45}
          roughness={0.34}
        />
      </mesh>
      <mesh position={[0, 0.44, -0.04]}>
        <boxGeometry args={[0.24, 0.14, 1.42]} />
        <meshStandardMaterial
          color="#182235"
          emissive="#10263a"
          emissiveIntensity={0.35}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0, 0.58, -0.36]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.32, 0.1, 0.42]} />
        <meshStandardMaterial color="#05070d" roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.84, -0.02]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.16]} />
        <meshStandardMaterial
          color="#26364d"
          emissive="#10263a"
          emissiveIntensity={0.25}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 1.08, 0.08]}>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshStandardMaterial color="#f7b955" emissive="#8d5c11" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.52, 0.82]} rotation={[0.45, 0, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.72]} />
        <meshStandardMaterial
          color="#f7b955"
          emissive="#8d5c11"
          emissiveIntensity={0.45}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.76, 1.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.74, 10]} />
        <meshStandardMaterial color="#38f2c2" emissive="#0b8f72" emissiveIntensity={0.55} />
      </mesh>
      {[0.82, -0.82].map((z) => (
        <group key={z} position={[0, 0.16, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.25, 0.045, 10, 28]} />
            <meshStandardMaterial
              color="#05070d"
              emissive="#123c35"
              emissiveIntensity={0.24}
              roughness={0.48}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
            <meshStandardMaterial color="#38f2c2" emissive="#0b8f72" emissiveIntensity={0.35} />
          </mesh>
        </group>
      ))}
      {[-0.13, 0.13].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.58]} rotation={[0.28, 0, 0]}>
          <boxGeometry args={[0.035, 0.065, 0.72]} />
          <meshStandardMaterial
            color="#38f2c2"
            emissive="#0b8f72"
            emissiveIntensity={0.45}
            roughness={0.36}
          />
        </mesh>
      ))}
      <pointLight position={[0, 0.55, -0.9]} color="#38f2c2" intensity={1.5} distance={4} />
    </group>
  );
});
