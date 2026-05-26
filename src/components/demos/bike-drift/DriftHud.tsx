"use client";

import type { VehicleTelemetry } from "@/components/demos/bike-drift/types";
import { Button } from "@/components/ui/Button";

type DriftHudProps = {
  telemetry: VehicleTelemetry;
  onReset: () => void;
};

export function DriftHud({ telemetry, onReset }: DriftHudProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-content flex flex-col justify-between p-4 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="rounded-lg border border-white/10 bg-void/70 p-4 shadow-command backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
            Moto Max Race Systems
          </p>
          <h2 className="mt-2 text-2xl font-black text-ink">Underground racer slice</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            W/A/S/D or arrows to ride the highway. Hold Space for a drift lane cut. Avoid oncoming
            traffic, keep speed, clear checkpoints, and climb toward P1.
          </p>
        </div>
        <div className="grid w-full gap-2 rounded-lg border border-white/10 bg-void/70 p-4 shadow-command backdrop-blur-xl md:w-80">
          <HudBar
            label="Speed"
            value={Math.min(1, telemetry.speed / 24)}
            text={`${Math.round(telemetry.speed * 5)} km/h`}
          />
          <HudBar
            label="Drift"
            value={telemetry.driftAmount}
            text={telemetry.isDrifting ? "active" : "ready"}
          />
          <HudBar
            label="Handling"
            value={telemetry.handling}
            text={`${Math.round(telemetry.handling * 100)}%`}
          />
          <HudBar
            label="Lane"
            value={(telemetry.laneOffset + 6.2) / 12.4}
            text={
              telemetry.laneOffset > 0.6 ? "left" : telemetry.laneOffset < -0.6 ? "right" : "center"
            }
          />
          <HudBar
            label="Checkpoint"
            value={telemetry.checkpointProgress}
            text={`${Math.round(telemetry.checkpointProgress * 100)}% ${telemetry.racePosition}`}
          />
          <button
            className="pointer-events-auto mt-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-ink transition hover:border-signal/40"
            onClick={onReset}
          >
            {telemetry.isCrashed ? "Reset after crash" : "Reset vehicle"}
          </button>
          <Button
            href="/projects/bike-drift-master"
            variant="ghost"
            className="pointer-events-auto"
          >
            Exit to case study
          </Button>
        </div>
      </div>
      {telemetry.isCrashed ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="rounded-lg border border-danger/40 bg-void/80 px-6 py-5 text-center shadow-command backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-danger">
              Impact detected
            </p>
            <h3 className="mt-2 text-3xl font-black text-ink">Crash state</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Vehicle control is locked. Use reset to restart the slice.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HudBar({ label, value, text }: { label: string; value: number; text: string }) {
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]">
        <span className="text-muted">{label}</span>
        <span className="text-signal">{text}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${clamped * 100}%` }} />
      </div>
    </div>
  );
}
