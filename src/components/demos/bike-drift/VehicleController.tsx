"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import { Group, Vector3 } from "three";
import { BikeVehicle } from "@/components/demos/bike-drift/BikeVehicle";
import { DriftVfx } from "@/components/demos/bike-drift/DriftVfx";
import type {
  VehicleInputState,
  VehicleRuntime,
  VehicleTelemetry
} from "@/components/demos/bike-drift/types";
import { resetVehicle, updateVehicle } from "@/components/demos/bike-drift/vehiclePhysics";

type VehicleControllerProps = {
  inputRef: MutableRefObject<VehicleInputState>;
  runtimeRef: MutableRefObject<VehicleRuntime>;
  resetSignal: number;
  onTelemetry: (telemetry: VehicleTelemetry) => void;
};

export function VehicleController({
  inputRef,
  runtimeRef,
  resetSignal,
  onTelemetry
}: VehicleControllerProps) {
  const vehicleRef = useRef<Group>(null);
  const lastResetSignal = useRef(resetSignal);
  const telemetryAccumulator = useRef(0);

  useFrame((_, delta) => {
    const runtime = runtimeRef.current;

    if (lastResetSignal.current !== resetSignal) {
      resetVehicle(runtime);
      lastResetSignal.current = resetSignal;
    }

    updateVehicle(runtime, inputRef.current, Math.min(delta, 0.033));

    if (vehicleRef.current) {
      vehicleRef.current.position.copy(runtime.position);
      vehicleRef.current.rotation.set(
        runtime.isCrashed ? -0.52 : 0,
        runtime.heading,
        runtime.isCrashed ? 0.95 : -runtime.steerVisual * 0.18
      );
    }

    telemetryAccumulator.current += delta;

    if (telemetryAccumulator.current >= 0.08) {
      telemetryAccumulator.current = 0;
      onTelemetry({
        speed: Math.abs(runtime.speed),
        driftAmount: runtime.driftAmount,
        handling: 1 - runtime.driftAmount * 0.35,
        isDrifting: runtime.driftAmount > 0.25,
        laneOffset: runtime.position.x,
        isCrashed: runtime.isCrashed,
        checkpointProgress: (runtime.distance % 120) / 120,
        racePosition:
          runtime.distance > 260
            ? "P1"
            : runtime.distance > 160
              ? "P2"
              : runtime.distance > 70
                ? "P3"
                : "P4"
      });
    }
  });

  return (
    <group ref={vehicleRef}>
      <BikeVehicle />
      <group>
        <DriftVfx runtime={runtimeRef.current} />
      </group>
    </group>
  );
}

export function createInitialVehicleRuntime(): VehicleRuntime {
  return {
    position: new Vector3(0, 0, 0),
    heading: 0,
    speed: 0,
    driftAmount: 0,
    steerVisual: 0,
    distance: 0,
    isCrashed: false
  };
}
