"use client";

import { useMemo, useState } from "react";

const spawnPoints = [
  { x: 12, y: 18 },
  { x: 74, y: 16 },
  { x: 84, y: 62 },
  { x: 22, y: 72 },
  { x: 48, y: 10 },
  { x: 62, y: 78 }
];

export function HeroSurvivorDemo() {
  const [wave, setWave] = useState(1);
  const [power, setPower] = useState(1);
  const [hits, setHits] = useState(0);
  const [pickups, setPickups] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(18);
  const enemies = useMemo(
    () =>
      spawnPoints.slice(0, Math.min(spawnPoints.length, wave + 2)).map((point, index) => ({
        ...point,
        id: `${wave}-${index}`,
        delay: index * 120
      })),
    [wave]
  );

  function fireProjectile() {
    setHits((value) => value + power);
  }

  function collectPickup() {
    setPower((value) => Math.min(5, value + 1));
    setPickups((value) => value + 1);
  }

  function nextWave() {
    setWave((value) => Math.min(6, value + 1));
    setSurvivalTime((value) => value + 12);
    setHits(0);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command">
      <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
        <div className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(56,242,194,0.14),transparent_24%),linear-gradient(135deg,#05070d,#07101b)]">
          <div className="absolute inset-0 bg-scan-grid bg-[length:42px_42px] opacity-25" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/50 bg-signal/15 shadow-glow">
            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/20" />
          </div>
          {enemies.map((enemy) => (
            <button
              key={enemy.id}
              className="absolute h-12 w-12 rounded-full border border-danger/45 bg-danger/20 text-xs font-black text-danger transition duration-300 hover:scale-110 hover:bg-danger/30"
              style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
              onClick={fireProjectile}
            >
              AI
            </button>
          ))}
          <button
            className="absolute bottom-[18%] left-[54%] rounded-full border border-reactor/40 bg-reactor/20 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-reactor transition hover:scale-105"
            onClick={collectPickup}
          >
            Pickup
          </button>
          {Array.from({ length: Math.min(5, power) }, (_, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 h-1 w-28 origin-left rounded-full bg-signal/55 shadow-glow"
              style={{ transform: `rotate(${index * (360 / Math.min(5, power))}deg)` }}
            />
          ))}
          <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-void/70 p-4 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
              Hero Survivor Loop
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Click enemies to simulate projectile pressure. Collect pickups to increase power, then
              advance the wave to show escalation and survival pressure.
            </p>
          </div>
        </div>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
              Combat Chamber
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">Wave escalation slice</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Grounded in survivor gameplay: enemies approach, projectiles clear pressure, pickups
              increase power, and each wave raises spawn density.
            </p>
          </div>
          <Stat label="Wave" value={String(wave)} />
          <Stat label="Power" value={`x${power}`} />
          <Stat label="Damage Events" value={String(hits)} />
          <Stat label="Pickups" value={String(pickups)} />
          <Stat label="Survival Timer" value={`${survivalTime}s`} />
          <div className="grid gap-2">
            <ActionButton onClick={fireProjectile}>Fire burst</ActionButton>
            <ActionButton onClick={collectPickup} variant="secondary">
              Collect pickup
            </ActionButton>
            <ActionButton onClick={nextWave} variant="ghost">
              Advance wave
            </ActionButton>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "primary"
}: {
  children: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const classes = {
    primary: "border-signal/70 bg-signal text-void shadow-glow hover:bg-[#7fffe0]",
    secondary: "border-white/15 bg-white/[0.07] text-ink hover:border-signal/50",
    ghost: "border-transparent bg-transparent text-muted hover:border-white/10 hover:text-ink"
  };

  return (
    <button
      className={`min-h-11 rounded-md border px-4 py-2 text-sm font-semibold transition ${classes[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-black text-signal">{value}</p>
    </div>
  );
}
