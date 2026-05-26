import type { MutableRefObject } from "react";
import type { Group, Vector3 } from "three";

export type VehicleInputState = {
  accelerate: boolean;
  brake: boolean;
  left: boolean;
  right: boolean;
  drift: boolean;
};

export type VehicleTelemetry = {
  speed: number;
  driftAmount: number;
  handling: number;
  isDrifting: boolean;
  laneOffset: number;
  isCrashed: boolean;
  checkpointProgress: number;
  racePosition: string;
};

export type VehicleRuntime = {
  position: Vector3;
  heading: number;
  speed: number;
  driftAmount: number;
  steerVisual: number;
  distance: number;
  isCrashed: boolean;
};

export type VehicleRuntimeRef = MutableRefObject<VehicleRuntime>;
export type VehicleGroupRef = MutableRefObject<Group | null>;
