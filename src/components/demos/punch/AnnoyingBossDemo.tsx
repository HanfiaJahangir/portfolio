"use client";

import { useEffect, useRef, useState } from "react";

type PunchPhase = "idle" | "charging" | "launch" | "impact" | "retract";

type Target = {
  label: string;
  x: number;
  y: number;
  depth: number;
  move?: boolean;
};

const stages: Array<{ title: string; setup: string; targets: Target[] }> = [
  {
    title: "Boss on Chair",
    setup: "Hold to charge. Release to punch forward through the room.",
    targets: [{ label: "Boss", x: 52, y: 42, depth: 76 }]
  },
  {
    title: "Shouting Match",
    setup: "Two targets at different depths. Punch through the scene, not sideways.",
    targets: [
      { label: "Boss", x: 46, y: 42, depth: 72 },
      { label: "Staff", x: 62, y: 48, depth: 84 }
    ]
  },
  {
    title: "Triangle Meeting",
    setup: "Clear layered office targets with quick charged hits.",
    targets: [
      { label: "A", x: 40, y: 50, depth: 66 },
      { label: "B", x: 58, y: 39, depth: 78 },
      { label: "C", x: 70, y: 55, depth: 90 }
    ]
  },
  {
    title: "Jumping Boss",
    setup: "Time the release while the boss moves in depth.",
    targets: [{ label: "Boss", x: 55, y: 40, depth: 82, move: true }]
  },
  {
    title: "Final Phone Call",
    setup: "Build a huge charge and launch the final glove straight into the room.",
    targets: [{ label: "Boss", x: 52, y: 40, depth: 88 }]
  }
];

export function AnnoyingBossDemo() {
  const [stageIndex, setStageIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [charge, setCharge] = useState(0);
  const [phase, setPhase] = useState<PunchPhase>("idle");
  const [combo, setCombo] = useState(0);
  const [impactScore, setImpactScore] = useState(0);
  const chargeTimer = useRef<number | null>(null);
  const stage = stages[stageIndex];
  const target = stage.targets[targetIndex];
  const stageComplete = targetIndex >= stage.targets.length;
  const isFinalComplete = stageIndex === stages.length - 1 && stageComplete;
  const baseX = 50;
  const baseY = 84;
  const aimX = target?.x ?? 50;
  const aimY = target?.y ?? 42;
  const aimDepth = target?.depth ?? 82;
  const travel = phase === "launch" || phase === "impact" ? 1 : phase === "retract" ? 0.18 : 0;
  const punchX = baseX + (aimX - baseX) * travel;
  const punchY = baseY + (aimY - baseY) * travel;
  const punchDepth = travel > 0 ? aimDepth : 12;
  const chargeScale = 1 + charge / 180;

  useEffect(() => {
    if (phase !== "charging") {
      return;
    }

    chargeTimer.current = window.setInterval(() => {
      setCharge((value) => Math.min(100, value + 2.8));
    }, 24);

    return () => {
      if (chargeTimer.current) {
        window.clearInterval(chargeTimer.current);
      }
    };
  }, [phase]);

  function beginCharge() {
    if (phase !== "idle" || stageComplete) {
      return;
    }

    setCharge(12);
    setPhase("charging");
  }

  function releasePunch() {
    if (phase !== "charging") {
      return;
    }

    setPhase("launch");
    window.setTimeout(() => {
      setPhase("impact");
      setCombo((value) => value + 1);
      setImpactScore((value) => value + Math.max(10, Math.round(charge * 1.55)));
    }, 140);
    window.setTimeout(() => setPhase("retract"), 380);
    window.setTimeout(() => {
      setCharge(0);
      setTargetIndex((value) => value + 1);
      setPhase("idle");
    }, 650);
  }

  function nextStage() {
    setStageIndex((value) => Math.min(stages.length - 1, value + 1));
    setTargetIndex(0);
    setCharge(0);
    setPhase("idle");
  }

  function restartDemo() {
    setStageIndex(0);
    setTargetIndex(0);
    setCharge(0);
    setPhase("idle");
    setCombo(0);
    setImpactScore(0);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command">
      <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
        <div
          className={`relative min-h-[640px] overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(247,185,85,0.2),transparent_20%),linear-gradient(180deg,#111827,#05070d)] transition ${
            phase === "impact" ? "scale-[1.015]" : ""
          }`}
          onPointerDown={beginCharge}
          onPointerUp={releasePunch}
          onPointerLeave={releasePunch}
        >
          <div className="absolute inset-0 bg-scan-grid bg-[length:48px_48px] opacity-15" />
          <div className="absolute inset-x-[12%] bottom-[18%] top-[16%] border-x border-t border-white/10 bg-gradient-to-t from-white/[0.03] to-transparent [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" />
          <div className="absolute left-8 top-8 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Stage {stageIndex + 1}/5: {stage.title}
          </div>
          <div
            className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/35 bg-signal/15 shadow-glow"
            style={{ left: `${baseX}%`, top: `${baseY}%` }}
          />
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <line
              x1={`${baseX}%`}
              y1={`${baseY}%`}
              x2={`${travel > 0 ? punchX : aimX}%`}
              y2={`${travel > 0 ? punchY : aimY}%`}
              stroke="rgba(247,185,85,0.5)"
              strokeDasharray={travel > 0 ? "0" : "6 8"}
              strokeLinecap="round"
              strokeWidth={Math.max(10, 14 + charge * 0.08)}
            />
            <line
              x1={`${baseX}%`}
              y1={`${baseY}%`}
              x2={`${punchX}%`}
              y2={`${punchY}%`}
              stroke="rgba(56,242,194,0.28)"
              strokeLinecap="round"
              strokeWidth={Math.max(4, 5 + charge * 0.04)}
            />
          </svg>
          <div
            className={`absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-reactor/70 bg-reactor shadow-[0_0_40px_rgba(247,185,85,0.4)] transition-all duration-150 ${
              phase === "charging" ? "scale-110" : ""
            }`}
            style={{
              left: `${punchX}%`,
              top: `${punchY}%`,
              transform: `translate(-50%, -50%) scale(${(0.85 + punchDepth / 130) * chargeScale})`
            }}
          />
          {stage.targets.map((item, index) => {
            const active = index === targetIndex;
            const defeated = index < targetIndex;
            return (
              <div
                key={`${stage.title}-${item.label}-${index}`}
                className={`absolute grid h-28 w-20 place-items-center rounded-xl border text-center text-xs font-black uppercase transition-all duration-300 ${
                  defeated
                    ? "translate-y-8 rotate-[28deg] border-white/10 bg-white/[0.04] text-muted opacity-30"
                    : active && phase === "impact"
                      ? "translate-y-[-28px] scale-110 rotate-[18deg] border-danger/50 bg-danger/25 text-danger"
                      : "border-danger/40 bg-danger/20 text-danger"
                } ${item.move && active && phase !== "impact" ? "animate-[depth-hop_1.1s_ease-in-out_infinite]" : ""}`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) scale(${0.62 + item.depth / 150})`
                }}
              >
                {item.label}
              </div>
            );
          })}
          {phase === "charging" ? (
            <div className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full border border-reactor/40 bg-reactor/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-reactor">
              Charging {Math.round(charge)}%
            </div>
          ) : null}
          {phase === "impact" ? (
            <div className="absolute left-1/2 top-[26%] -translate-x-1/2 rounded-full border border-reactor/50 bg-reactor/20 px-5 py-3 text-lg font-black uppercase tracking-[0.18em] text-reactor shadow-[0_0_34px_rgba(247,185,85,0.35)]">
              Forward Impact +{Math.round(charge)}
            </div>
          ) : null}
          <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-void/72 p-4 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-reactor">
              Hold to charge, release to punch into depth
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{stage.setup}</p>
          </div>
          <style jsx>{`
            @keyframes depth-hop {
              0%,
              100% {
                translate: 0 0;
              }
              50% {
                translate: 0 -34px;
              }
            }
          `}</style>
        </div>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-reactor">
              Annoying Boss
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">Forward elastic punch</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Camera sits behind the glove. The arm loads in place, launches forward into the room,
              impacts targets at depth, then retracts automatically.
            </p>
          </div>
          <Meter label="Charge" value={charge / 100} text={`${Math.round(charge)}%`} />
          <Stat label="Combo" value={`${combo} hits`} />
          <Stat label="Impact Score" value={String(impactScore)} />
          <Stat
            label="Targets Left"
            value={String(Math.max(0, stage.targets.length - targetIndex))}
          />
          {stageComplete ? (
            <button
              className="min-h-11 rounded-md border border-reactor/60 bg-reactor px-4 py-2 text-sm font-bold text-void transition hover:bg-[#ffd47a]"
              onClick={isFinalComplete ? restartDemo : nextStage}
            >
              {isFinalComplete ? "Restart showcase" : "Next stage"}
            </button>
          ) : (
            <p className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-muted">
              Hold anywhere in the room to load the glove. Release to fire forward into the active
              target lane.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function Meter({ label, value, text }: { label: string; value: number; text: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]">
        <span className="text-muted">{label}</span>
        <span className="text-reactor">{text}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-reactor" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-black text-reactor">{value}</p>
    </div>
  );
}
