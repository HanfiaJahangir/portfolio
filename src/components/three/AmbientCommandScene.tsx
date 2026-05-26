"use client";

import { Float, Grid, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { experienceTiers, type ExperienceTier } from "@/config/experience";
import { webglPerformance } from "@/systems/performance/rendering";

function CameraDrift({ enabled }: { enabled: boolean }) {
  const rigRef = useRef<Group>(null);

  useFrame((state) => {
    if (!enabled || !rigRef.current) {
      return;
    }

    rigRef.current.rotation.y = state.pointer.x * 0.08;
    rigRef.current.rotation.x = -state.pointer.y * 0.04;
  });

  return <group ref={rigRef} />;
}

function ReactorNode() {
  const nodeRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.y += delta * 0.32;
      nodeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.24;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={nodeRef}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color="#38f2c2"
          emissive="#0b8f72"
          emissiveIntensity={0.5}
          roughness={0.34}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.018, 8, 96]} />
        <meshStandardMaterial color="#f7b955" emissive="#6f4208" emissiveIntensity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.01, 8, 128]} />
        <meshStandardMaterial
          color="#38f2c2"
          emissive="#0b8f72"
          emissiveIntensity={0.28}
          transparent
          opacity={0.58}
        />
      </mesh>
    </group>
  );
}

function SystemPanels({ count }: { count: number }) {
  const positions: Array<[number, number, number]> = [
    [-3.1, -0.55, -0.25],
    [3.05, -0.25, -0.42],
    [-2.25, 1.28, -0.8],
    [2.35, 1.08, -0.62],
    [-3.7, 0.55, -1.15],
    [3.8, 0.45, -1.05],
    [-0.8, -1.38, -0.65],
    [0.95, -1.28, -0.7]
  ];

  return (
    <>
      {positions.slice(0, count).map((position, index) => (
        <Float
          key={position.join("-")}
          speed={0.9 + index * 0.16}
          rotationIntensity={0.08}
          floatIntensity={0.18}
        >
          <mesh position={position}>
            <boxGeometry args={[0.86, 0.48, 0.05]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#101827" : "#121c2d"}
              emissive={index % 2 === 0 ? "#062f2a" : "#2b1f08"}
              emissiveIntensity={0.42}
              roughness={0.44}
              metalness={0.28}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ParticleField({ enabled }: { enabled: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!enabled || !groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.018;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });

  if (!enabled) {
    return null;
  }

  const particles: Array<[number, number, number]> = [
    [-4.2, 1.8, -1.3],
    [-3.4, -0.2, -1.8],
    [-2.1, 2.2, -1.1],
    [1.8, 1.9, -1.4],
    [3.2, -0.1, -1.8],
    [4.3, 1.3, -1.2],
    [-0.4, 2.55, -1.6],
    [0.9, -1.1, -1.7]
  ];

  return (
    <group ref={groupRef}>
      {particles.map((position) => (
        <mesh key={position.join("-")} position={position}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial
            color="#38f2c2"
            emissive="#38f2c2"
            emissiveIntensity={0.85}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

function ProjectTerminals({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return null;
  }

  const positions: Array<[number, number, number]> = [
    [-4.25, -1.05, 0.15],
    [-1.55, -1.22, 0.42],
    [1.55, -1.22, 0.42],
    [4.25, -1.05, 0.15]
  ];

  return (
    <>
      {positions.map((position, index) => (
        <Float key={position.join("-")} speed={0.75 + index * 0.08} floatIntensity={0.12}>
          <mesh position={position} rotation={[-0.15, index < 2 ? 0.18 : -0.18, 0]}>
            <boxGeometry args={[1.2, 0.28, 0.08]} />
            <meshStandardMaterial
              color="#0b111d"
              emissive={index % 2 === 0 ? "#062f2a" : "#33230a"}
              emissiveIntensity={0.55}
              roughness={0.38}
              metalness={0.25}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function AtmosphereRings({ enabled }: { enabled: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!enabled || !groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.045;
    groupRef.current.rotation.z -= delta * 0.025;
  });

  if (!enabled) {
    return null;
  }

  return (
    <group ref={groupRef} position={[0, 0.05, -0.6]} rotation={[0.4, 0, 0]}>
      {[2.7, 3.35, 4.1].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.7]}>
          <torusGeometry args={[radius, 0.008, 8, 160]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#38f2c2" : "#f7b955"}
            emissive={index % 2 === 0 ? "#0b8f72" : "#6f4208"}
            emissiveIntensity={0.18}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

type AmbientCommandSceneProps = {
  tier?: ExperienceTier;
};

export function AmbientCommandScene({ tier = "desktop" }: AmbientCommandSceneProps) {
  const settings = experienceTiers[tier];

  return (
    <Canvas
      dpr={settings.dpr}
      gl={webglPerformance.glOptions}
      className="h-full w-full"
      frameloop="always"
    >
      <PerspectiveCamera
        makeDefault
        position={[0, tier === "desktop" ? 1.32 : 1.1, tier === "desktop" ? 5.65 : 5.15]}
        fov={tier === "desktop" ? 38 : 44}
      />
      <CameraDrift enabled={settings.enableCameraDrift} />
      <ambientLight intensity={0.46} />
      <directionalLight position={[3, 5, 4]} intensity={1.35} />
      <pointLight position={[-2.8, 1.2, 2.2]} color="#38f2c2" intensity={3.4} distance={7.5} />
      <pointLight position={[2.8, -0.7, 2.1]} color="#f7b955" intensity={2.25} distance={7.5} />
      <group rotation={[-0.08, -0.3, 0]} scale={settings.sceneScale}>
        <AtmosphereRings enabled={settings.enableAtmosphere} />
        <ParticleField enabled={settings.enableAtmosphere} />
        <ReactorNode />
        <SystemPanels count={settings.panelCount} />
        <ProjectTerminals enabled={tier === "desktop"} />
      </group>
      <Grid
        position={[0, tier === "desktop" ? -1.65 : -1.5, 0]}
        args={tier === "desktop" ? [10, 10] : [7, 7]}
        cellSize={0.45}
        cellThickness={0.45}
        cellColor="#1e3443"
        sectionSize={1.8}
        sectionThickness={0.8}
        sectionColor="#38f2c2"
        fadeDistance={6.5}
        fadeStrength={1.4}
      />
    </Canvas>
  );
}
