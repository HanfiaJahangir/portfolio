"use client";

import type { VehicleInputState } from "@/components/demos/bike-drift/types";

type TouchControlsProps = {
  setInput: (key: keyof VehicleInputState, value: boolean) => void;
};

export function TouchControls({ setInput }: TouchControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-overlay grid grid-cols-[1fr_auto] gap-4 md:hidden">
      <div className="grid w-36 grid-cols-3 gap-2">
        <TouchButton label="Left" onPress={(value) => setInput("left", value)} />
        <div />
        <TouchButton label="Right" onPress={(value) => setInput("right", value)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TouchButton label="Gas" onPress={(value) => setInput("accelerate", value)} />
        <TouchButton label="Brake" onPress={(value) => setInput("brake", value)} />
        <button
          className="col-span-2 rounded-md border border-reactor/30 bg-reactor/20 px-4 py-3 text-sm font-black text-ink backdrop-blur"
          onPointerDown={() => setInput("drift", true)}
          onPointerUp={() => setInput("drift", false)}
          onPointerLeave={() => setInput("drift", false)}
        >
          Drift
        </button>
      </div>
    </div>
  );
}

function TouchButton({ label, onPress }: { label: string; onPress: (value: boolean) => void }) {
  return (
    <button
      className="rounded-md border border-white/10 bg-void/72 px-4 py-3 text-sm font-black text-ink backdrop-blur"
      onPointerDown={() => onPress(true)}
      onPointerUp={() => onPress(false)}
      onPointerLeave={() => onPress(false)}
    >
      {label}
    </button>
  );
}
