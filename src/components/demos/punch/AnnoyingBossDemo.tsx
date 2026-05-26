"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PunchPhase = "idle" | "charging" | "launch" | "impact" | "retract" | "complete";

type StageConfig = {
  title: string;
  setup: string;
  targets: Array<{ label: string; x: number; y: number; move?: boolean }>;
};

const stages: StageConfig[] = [
  {
    title: "Boss on Chair",
    setup: "Charge, release, and send the boss flying backward.",
    targets: [{ label: "Boss", x: 76, y: 54 }]
  },
  {
    title: "Shouting Match",
    setup: "Punch the boss, then the colleague for a two-hit reaction chain.",
    targets: [
      { label: "Boss", x: 72, y: 48 },
      { label: "Staff", x: 84, y: 58 }
    ]
  },
  {
    title: "Triangle Meeting",
    setup: "Clear three seated targets with quick charged hits.",
    targets: [
      { label: "A", x: 68, y: 42 },
      { label: "B", x: 80, y: 57 },
      { label: "C", x: 62, y: 66 }
    ]
  },
  {
    title: "Jumping Boss",
    setup: "Time the punch while the boss moves around the room.",
    targets: [{ label: "Boss", x: 78, y: 48, move: true }]
  },
  {
    title: "Final Phone Call",
    setup: "Build a huge charge and land the final cinematic punch.",
    targets: [{ label: "Boss", x: 80, y: 52 }]
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
  const gloveReach = phase === "launch" || phase === "impact" ? target.x - 13 : 10 + charge * 0.58;
  const impactPower = Math.round(charge);

  useEffect(() => {
    if (phase !== "charging") {
      return;
    }

    chargeTimer.current = window.setInterval(() => {
      setCharge((value) => Math.min(100, value + 2.6));
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

    setCharge(10);
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
      setImpactScore((value) => value + Math.max(8, Math.round(charge * 1.4)));
    }, 150);
    window.setTimeout(() => setPhase("retract"), 390);
    window.setTimeout(() => {
      setCharge(0);
      setTargetIndex((value) => value + 1);
      setPhase("idle");
    }, 660);
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

  const targetPosition = useMemo(() => {
    if (!target) {
      return { x: 78, y: 52 };
    }

    return target;
  }, [target]);

  const isFinalComplete = stageIndex === stages.length - 1 && stageComplete;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command">
      <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
        <div
          className={`relative min-h-[600px] overflow-hidden bg-[radial-gradient(circle_at_78%_44%,rgba(247,185,85,0.2),transparent_20%),linear-gradient(135deg,#070b12,#111827)] transition ${
            phase === "impact" ? "scale-[1.015]" : ""
          }`}
          onPointerDown={beginCharge}
          onPointerUp={releasePunch}
          onPointerLeave={releasePunch}
        >
          <div className="absolute inset-0 bg-scan-grid bg-[length:46px_46px] opacity-20" />
          <div className="absolute left-8 top-8 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Stage {stageIndex + 1}/5: {stage.title}
          </div>
          <div className="absolute inset-x-10 bottom-20 h-1 rounded-full bg-white/10" />
          <div className="absolute bottom-24 left-14 h-28 w-20 rounded-lg border border-signal/35 bg-signal/15 shadow-glow" />
          <div
            className="absolute bottom-36 left-28 h-10 rounded-full border border-reactor/45 bg-reactor/30 transition-all duration-150"
            style={{ width: `${gloveReach}%` }}
          />
          <div
            className={`absolute bottom-[8.6rem] h-16 w-16 rounded-full border border-reactor/70 bg-reactor shadow-[0_0_34px_rgba(247,185,85,0.35)] transition-all duration-150 ${
              phase === "charging" ? "scale-110" : ""
            }`}
            style={{ left: `calc(7rem + ${gloveReach}%)` }}
          />
          {target ? (
            <div
              className={`absolute grid h-36 w-24 place-items-center rounded-xl border text-center text-sm font-black uppercase transition-all duration-300 ${
                phase === "impact"
                  ? "translate-x-16 -translate-y-8 rotate-[22deg] border-danger/50 bg-danger/25 text-danger"
                  : "border-danger/40 bg-danger/20 text-danger"
              } ${target.move && phase !== "impact" ? "animate-[boss-hop_1.1s_ease-in-out_infinite]" : ""}`}
              style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
            >
              {target.label}
            </div>
          ) : null}
          {Array.from({ length: 5 }, (_, item) => (
            <div
              key={item}
              className={`absolute h-8 w-8 rounded border border-white/10 bg-white/[0.08] transition duration-300 ${
                impactScore / 45 > item ? "translate-y-6 rotate-45 opacity-25" : ""
              }`}
              style={{ bottom: `${7 + item * 2.7}rem`, right: `${10 + item * 4}rem` }}
            />
          ))}
          {phase === "charging" ? (
            <div className="absolute left-28 top-28 rounded-full border border-reactor/40 bg-reactor/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-reactor">
              Charging {Math.round(charge)}%
            </div>
          ) : null}
          {phase === "impact" ? (
            <div className="absolute right-32 top-24 rounded-full border border-reactor/50 bg-reactor/20 px-5 py-3 text-lg font-black uppercase tracking-[0.18em] text-reactor shadow-[0_0_34px_rgba(247,185,85,0.35)]">
              Smack +{impactPower}
            </div>
          ) : null}
          <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-void/72 p-4 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-reactor">
              Hold to charge, release to punch
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{stage.setup}</p>
          </div>
          <style jsx>{`
            @keyframes boss-hop {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-36px);
              }
            }
          `}</style>
        </div>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-reactor">
              Annoying Boss
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">Elastic punch showcase</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              A 5-stage tactile slice focused on charge anticipation, elastic release, hit pause,
              target reaction, combo timing, and comedic impact.
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
              Hold anywhere in the target room, then release. Stronger charge creates bigger impact
              feedback.
            </p>
          )}
          {isFinalComplete ? (
            <div className="rounded-lg border border-reactor/40 bg-reactor/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-reactor">
                Engineering breakdown
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                <li>Input hold/release architecture</li>
                <li>Elastic anticipation and retraction timing</li>
                <li>Hit pause, target reaction, and combo feedback</li>
                <li>Stage flow with lightweight state cleanup</li>
              </ul>
            </div>
          ) : null}
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
