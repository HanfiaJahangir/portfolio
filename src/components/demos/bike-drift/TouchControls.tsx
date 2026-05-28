"use client";

import { useRef } from "react";
import type { VehicleInputState } from "@/components/demos/bike-drift/types";

type TouchControlsProps = {
  setInput: (key: keyof VehicleInputState, value: boolean) => void;
  context?: "drift" | "race";
};

export function TouchControls({ setInput, context = "drift" }: TouchControlsProps) {
  const swipeStartRef = useRef<number | null>(null);
  const actionLabel = context === "race" ? "Drift / Boost" : "Drift";
  const hint = context === "race" ? "Race steering" : "Swipe steering";

  function clearSteering() {
    setInput("left", false);
    setInput("right", false);
    swipeStartRef.current = null;
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 z-overlay grid grid-cols-[1fr_auto] gap-4 touch-none md:hidden">
      <div
        className="grid w-40 grid-cols-3 gap-2 rounded-lg border border-white/10 bg-void/45 p-2 backdrop-blur-xl"
        onPointerDown={(event) => {
          swipeStartRef.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (swipeStartRef.current === null) {
            return;
          }

          const delta = event.clientX - swipeStartRef.current;
          setInput("left", delta < -18);
          setInput("right", delta > 18);
        }}
        onPointerUp={clearSteering}
        onPointerCancel={clearSteering}
        onPointerLeave={clearSteering}
      >
        <TouchButton label="Left" onPress={(value) => setInput("left", value)} />
        <div />
        <TouchButton label="Right" onPress={(value) => setInput("right", value)} />
        <p className="col-span-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
          {hint}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TouchButton label="Gas" onPress={(value) => setInput("accelerate", value)} />
        <TouchButton label="Brake" onPress={(value) => setInput("brake", value)} />
        <button
          className="col-span-2 touch-none rounded-md border border-reactor/30 bg-reactor/20 px-4 py-3 text-sm font-black text-ink backdrop-blur"
          onPointerDown={() => setInput("drift", true)}
          onPointerUp={() => setInput("drift", false)}
          onPointerLeave={() => setInput("drift", false)}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function TouchButton({ label, onPress }: { label: string; onPress: (value: boolean) => void }) {
  return (
    <button
      className="touch-none rounded-md border border-white/10 bg-void/72 px-4 py-3 text-sm font-black text-ink backdrop-blur"
      onPointerDown={() => onPress(true)}
      onPointerUp={() => onPress(false)}
      onPointerLeave={() => onPress(false)}
    >
      {label}
    </button>
  );
}
