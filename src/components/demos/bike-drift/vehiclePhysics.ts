import type { VehicleInputState, VehicleRuntime } from "@/components/demos/bike-drift/types";

const maxForwardSpeed = 24;
const acceleration = 24;
const brakePower = 28;
const drag = 8;
const lateralPower = 10.5;
const laneLimit = 6.2;

export function resetVehicle(runtime: VehicleRuntime) {
  runtime.position.set(0, 0, 0);
  runtime.heading = 0;
  runtime.speed = 0;
  runtime.driftAmount = 0;
  runtime.steerVisual = 0;
  runtime.distance = 0;
  runtime.isCrashed = false;
}

export function updateVehicle(runtime: VehicleRuntime, input: VehicleInputState, delta: number) {
  if (runtime.isCrashed) {
    runtime.speed += (0 - runtime.speed) * delta * 8;
    runtime.driftAmount += (0 - runtime.driftAmount) * delta * 5;
    runtime.steerVisual += (0 - runtime.steerVisual) * delta * 5;
    return;
  }

  const steer = Number(input.left) - Number(input.right);
  const targetDrift = input.drift && Math.abs(runtime.speed) > 5 ? 1 : 0;
  runtime.driftAmount += (targetDrift - runtime.driftAmount) * delta * 6;

  if (input.accelerate) {
    runtime.speed += acceleration * delta;
  } else if (input.brake) {
    runtime.speed -= brakePower * delta;
  } else {
    const dragAmount = Math.min(Math.abs(runtime.speed), drag * delta);
    runtime.speed -= dragAmount;
  }

  runtime.speed = Math.min(maxForwardSpeed, Math.max(0, runtime.speed));

  const speedFactor = Math.min(Math.abs(runtime.speed) / maxForwardSpeed, 1);
  const driftSteerMultiplier = 1 + runtime.driftAmount * 0.85;
  runtime.steerVisual += (steer - runtime.steerVisual) * delta * 7;

  runtime.position.x += steer * lateralPower * (0.25 + speedFactor) * driftSteerMultiplier * delta;
  runtime.position.x = Math.max(-laneLimit, Math.min(laneLimit, runtime.position.x));
  runtime.position.z = 0;
  runtime.heading = runtime.steerVisual * -0.18 + runtime.driftAmount * steer * -0.24;
  runtime.distance += runtime.speed * delta;

  if (Math.abs(steer) < 0.1) {
    runtime.position.x += (0 - runtime.position.x) * delta * 0.18;
  }
}
