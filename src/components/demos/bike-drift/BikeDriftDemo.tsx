"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useMemo, useState } from "react";
import { DriftHud } from "@/components/demos/bike-drift/DriftHud";
import { DriftTrack } from "@/components/demos/bike-drift/DriftTrack";
import { FollowCamera } from "@/components/demos/bike-drift/FollowCamera";
import { HighwayTraffic } from "@/components/demos/bike-drift/HighwayTraffic";
import { TouchControls } from "@/components/demos/bike-drift/TouchControls";
import {
  VehicleController,
  createInitialVehicleRuntime
} from "@/components/demos/bike-drift/VehicleController";
import type { VehicleTelemetry } from "@/components/demos/bike-drift/types";
import { useVehicleInput } from "@/components/demos/bike-drift/useVehicleInput";
import { webglPerformance } from "@/systems/performance/rendering";
import { prepareWebGLContext, releaseWebGLContext } from "@/systems/performance/webglLifecycle";

const initialTelemetry: VehicleTelemetry = {
  speed: 0,
  driftAmount: 0,
  handling: 1,
  isDrifting: false,
  laneOffset: 0,
  isCrashed: false,
  checkpointProgress: 0,
  racePosition: "P4"
};

export function BikeDriftDemo() {
  const { inputRef, setInput, resetInput } = useVehicleInput();
  const runtimeRef = useMemo(() => ({ current: createInitialVehicleRuntime() }), []);
  const [resetSignal, setResetSignal] = useState(0);
  const [telemetry, setTelemetry] = useState(initialTelemetry);

  const resetDemo = useCallback(() => {
    resetInput();
    setTelemetry(initialTelemetry);
    setResetSignal((value) => value + 1);
  }, [resetInput]);

  if (typeof WebGLRenderingContext === "undefined") {
    return (
      <div className="grid min-h-[70vh] place-items-center rounded-lg border border-white/10 bg-panel/75 p-6 text-center">
        <div>
          <h2 className="text-2xl font-black text-ink">WebGL unavailable</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            This playable slice needs WebGL. The rest of the portfolio remains available without it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-dvh min-h-[720px] overflow-hidden bg-void shadow-command">
      <Canvas
        camera={{ position: [0, 3.25, -6.4], fov: 54, near: 0.1, far: 180 }}
        dpr={webglPerformance.dpr}
        gl={webglPerformance.glOptions}
        performance={{ min: 0.45 }}
        onCreated={(state) => {
          prepareWebGLContext(state);
          return () => releaseWebGLContext(state.gl);
        }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#05070d"]} />
          <fog attach="fog" args={["#05070d", 34, 128]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, -4]} intensity={1.35} />
          <pointLight position={[0, 4, 5]} color="#38f2c2" intensity={4} distance={36} />
          <DriftTrack runtimeRef={runtimeRef} />
          <HighwayTraffic runtimeRef={runtimeRef} />
          <VehicleController
            inputRef={inputRef}
            runtimeRef={runtimeRef}
            resetSignal={resetSignal}
            onTelemetry={setTelemetry}
          />
          <FollowCamera runtimeRef={runtimeRef} />
        </Suspense>
      </Canvas>
      <DriftHud telemetry={telemetry} onReset={resetDemo} />
      <TouchControls setInput={setInput} />
    </div>
  );
}
