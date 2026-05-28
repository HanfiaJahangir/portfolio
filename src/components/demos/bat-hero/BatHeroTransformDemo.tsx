"use client";

import { useEffect, useRef, useState } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";

type Mode = "bike" | "robot" | "flight";
type Vec2 = { x: number; y: number };
type Objective = {
  id: number;
  x: number;
  y: number;
  kind: "rescue" | "enemy" | "beacon";
  done?: boolean;
};
type InputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  joystick: Vec2;
};
type MissionState = {
  hero: Vec2;
  mode: Mode;
  energy: number;
  rescued: number;
  enemies: number;
  timer: number;
  completed: boolean;
  objectives: Objective[];
};

const world = 100;
const initialState: MissionState = {
  hero: { x: 50, y: 78 },
  mode: "bike",
  energy: 100,
  rescued: 0,
  enemies: 0,
  timer: 0,
  completed: false,
  objectives: [
    { id: 1, x: 30, y: 38, kind: "rescue" },
    { id: 2, x: 67, y: 28, kind: "enemy" },
    { id: 3, x: 78, y: 62, kind: "beacon" },
    { id: 4, x: 22, y: 68, kind: "enemy" },
    { id: 5, x: 52, y: 18, kind: "rescue" }
  ]
};

const modeCopy: Record<Mode, { label: string; role: string; speed: number; color: string }> = {
  bike: {
    label: "Bike",
    role: "Fast city traversal",
    speed: 18,
    color: "bg-reactor"
  },
  robot: {
    label: "Robot",
    role: "Combat and rescue strength",
    speed: 11,
    color: "bg-danger"
  },
  flight: {
    label: "Flight",
    role: "Vertical reach and beacon access",
    speed: 15,
    color: "bg-signal"
  }
};

export function BatHeroTransformDemo() {
  const isPageVisible = usePageVisible();
  const stateRef = useRef<MissionState>(structuredClone(initialState));
  const inputRef = useRef<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
    joystick: { x: 0, y: 0 }
  });
  const stickRef = useRef<HTMLDivElement | null>(null);
  const renderTimerRef = useRef(0);
  const [view, setView] = useState<MissionState>(stateRef.current);
  const [feedback, setFeedback] = useState("Reach city events and transform for the right job.");
  const [stick, setStick] = useState<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const setKey = (event: KeyboardEvent, value: boolean) => {
      const key = event.key.toLowerCase();
      if (key === "w" || key === "arrowup") inputRef.current.up = value;
      if (key === "s" || key === "arrowdown") inputRef.current.down = value;
      if (key === "a" || key === "arrowleft") inputRef.current.left = value;
      if (key === "d" || key === "arrowright") inputRef.current.right = value;
      if (value && key === "1") setMode("bike");
      if (value && key === "2") setMode("robot");
      if (value && key === "3") setMode("flight");
      if (value && key === " ") interact();
    };

    const down = (event: KeyboardEvent) => setKey(event, true);
    const up = (event: KeyboardEvent) => setKey(event, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const delta = Math.min(0.033, (time - last) / 1000);
      last = time;
      if (!isPageVisible) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      updateMission(stateRef.current, inputRef.current, delta);
      renderTimerRef.current += delta;

      if (renderTimerRef.current > 0.045) {
        renderTimerRef.current = 0;
        setView(cloneState(stateRef.current));
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPageVisible]);

  function setMode(mode: Mode) {
    const state = stateRef.current;
    if (state.completed || state.mode === mode) {
      return;
    }
    state.mode = mode;
    state.energy = Math.max(0, state.energy - 4);
    setFeedback(`${modeCopy[mode].label} form active: ${modeCopy[mode].role}.`);
    setView(cloneState(state));
  }

  function interact() {
    const state = stateRef.current;
    if (state.completed) {
      return;
    }

    const objective = state.objectives.find((item) => !item.done && distance(state.hero, item) < 9);
    if (!objective) {
      setFeedback("Move closer to a city event before interacting.");
      return;
    }

    if (objective.kind === "rescue" && state.mode !== "robot") {
      setFeedback("Rescue events need Robot form strength.");
      return;
    }
    if (objective.kind === "enemy" && state.mode !== "robot") {
      setFeedback("Enemy bots need Robot form combat systems.");
      return;
    }
    if (objective.kind === "beacon" && state.mode !== "flight") {
      setFeedback("Rooftop beacon needs Flight form access.");
      return;
    }

    objective.done = true;
    state.energy = Math.min(100, state.energy + 12);
    if (objective.kind === "rescue") state.rescued += 1;
    if (objective.kind === "enemy") state.enemies += 1;
    setFeedback(
      objective.kind === "rescue"
        ? "Citizen rescued. Mission state advanced."
        : objective.kind === "enemy"
          ? "Enemy bot disabled. Combat event resolved."
          : "Beacon secured. Flight objective complete."
    );

    if (state.objectives.every((item) => item.done)) {
      state.completed = true;
      setFeedback("City rescue mission complete. Transformation loop resolved.");
    }
    setView(cloneState(state));
  }

  function restart() {
    stateRef.current = structuredClone(initialState);
    inputRef.current.joystick = { x: 0, y: 0 };
    setStick({ x: 0, y: 0 });
    setFeedback("Reach city events and transform for the right job.");
    setView(cloneState(stateRef.current));
  }

  function updateJoystick(clientX: number, clientY: number) {
    const rect = stickRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawX = (clientX - centerX) / (rect.width / 2);
    const rawY = (clientY - centerY) / (rect.height / 2);
    const length = Math.min(1, Math.hypot(rawX, rawY));
    const angle = Math.atan2(rawY, rawX);
    const value = { x: Math.cos(angle) * length, y: Math.sin(angle) * length };
    inputRef.current.joystick = value;
    setStick(value);
  }

  function releaseJoystick() {
    inputRef.current.joystick = { x: 0, y: 0 };
    setStick({ x: 0, y: 0 });
  }

  const mode = modeCopy[view.mode];
  const objectiveProgress =
    view.objectives.filter((objective) => objective.done).length / view.objectives.length;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/85 shadow-command">
      <div className="grid gap-0 xl:grid-cols-[1fr_340px]">
        <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(56,242,194,0.14),transparent_24%),linear-gradient(135deg,#05070d,#121626)] p-4 md:p-6">
          <div className="absolute inset-0 bg-scan-grid bg-[length:46px_46px] opacity-18" />
          <div className="relative z-content mx-auto flex h-full max-w-5xl flex-col justify-center gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-void/70 p-4 backdrop-blur-xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                  Flying Bat Robot Bike Game
                </p>
                <h3 className="mt-2 text-2xl font-black text-ink">Transformation rescue slice</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted">
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  W/A/S/D
                </span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  1/2/3 forms
                </span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  Space action
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-void/76 shadow-command">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:64px_64px]" />
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute rounded-sm border border-white/10 bg-white/[0.04]"
                  style={{
                    left: `${8 + (index % 3) * 32}%`,
                    top: `${10 + Math.floor(index / 3) * 28}%`,
                    width: `${12 + (index % 2) * 8}%`,
                    height: `${10 + (index % 3) * 5}%`
                  }}
                />
              ))}

              {view.objectives.map((objective) => (
                <button
                  key={objective.id}
                  className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[10px] font-black uppercase transition ${
                    objective.done
                      ? "h-8 w-8 border-signal/50 bg-signal/20 text-signal opacity-70"
                      : objective.kind === "enemy"
                        ? "h-12 w-12 border-danger/70 bg-danger/25 text-danger shadow-[0_0_24px_rgba(255,89,115,0.24)]"
                        : objective.kind === "beacon"
                          ? "h-12 w-12 border-reactor/70 bg-reactor/20 text-reactor shadow-[0_0_24px_rgba(247,185,85,0.22)]"
                          : "h-12 w-12 border-signal/70 bg-signal/20 text-signal shadow-glow"
                  }`}
                  style={{ left: `${objective.x}%`, top: `${objective.y}%` }}
                  onClick={interact}
                  aria-label={`${objective.kind} objective`}
                >
                  {objective.done ? "OK" : objective.kind}
                </button>
              ))}

              <div
                className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center transition-transform duration-100"
                style={{ left: `${view.hero.x}%`, top: `${view.hero.y}%` }}
              >
                <div
                  className={`grid h-16 w-16 place-items-center rounded-full border border-white/20 ${mode.color} text-xs font-black uppercase text-void shadow-glow`}
                >
                  {mode.label}
                </div>
                {view.mode === "flight" ? (
                  <span className="absolute h-28 w-28 animate-spin rounded-full border border-signal/35 border-t-transparent" />
                ) : null}
                {view.mode === "bike" ? (
                  <span className="absolute top-12 h-1 w-20 rounded-full bg-reactor/45 blur-sm" />
                ) : null}
              </div>

              {view.completed ? (
                <div className="absolute inset-0 grid place-items-center bg-void/76 p-5 backdrop-blur-md">
                  <div className="max-w-xl rounded-lg border border-signal/35 bg-panel/95 p-6 text-center shadow-command">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
                      Mission complete
                    </p>
                    <h3 className="mt-3 text-3xl font-black text-ink">City defended</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      The slice demonstrates a mission-state loop across vehicle traversal, robot
                      combat, rescue interaction, and flight access gates.
                    </p>
                    <button
                      className="mt-5 min-h-11 rounded-md border border-signal/70 bg-signal px-4 py-2 text-sm font-bold text-void"
                      onClick={restart}
                    >
                      Restart mission
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 md:hidden">
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <div
                  ref={stickRef}
                  className="relative h-32 w-32 touch-none rounded-full border border-signal/30 bg-void/70 shadow-glow backdrop-blur-xl"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    updateJoystick(event.clientX, event.clientY);
                  }}
                  onPointerMove={(event) => updateJoystick(event.clientX, event.clientY)}
                  onPointerUp={releaseJoystick}
                  onPointerCancel={releaseJoystick}
                >
                  <span
                    className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/60 bg-signal/25"
                    style={{
                      transform: `translate(calc(-50% + ${stick.x * 34}px), calc(-50% + ${stick.y * 34}px))`
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <button
                    className="min-h-12 touch-none rounded-md border border-signal/40 bg-signal/20 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-signal"
                    onPointerDown={interact}
                  >
                    Action
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    {(["bike", "robot", "flight"] as Mode[]).map((item) => (
                      <button
                        key={item}
                        className={`min-h-11 touch-none rounded-md border px-2 py-2 text-xs font-black uppercase ${
                          view.mode === item
                            ? "border-signal bg-signal text-void"
                            : "border-white/10 bg-white/[0.05] text-muted"
                        }`}
                        onPointerDown={() => setMode(item)}
                      >
                        {modeCopy[item].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-void/72 p-4 text-sm leading-6 text-muted backdrop-blur-xl">
              <span className="font-bold text-signal">{mode.label} form. </span>
              {feedback}
            </div>
          </div>
        </section>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 xl:border-l xl:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
              Transformation systems
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">Mode-driven mission flow</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              A compact showcase for bike traversal, robot combat/rescue, flight access, objective
              gates, and mobile-friendly mission state.
            </p>
          </div>
          <Meter label="Energy" value={view.energy / 100} text={`${Math.round(view.energy)}%`} />
          <Meter
            label="Mission"
            value={objectiveProgress}
            text={`${Math.round(objectiveProgress * 100)}%`}
          />
          <Stat label="Rescued" value={String(view.rescued)} />
          <Stat label="Bots disabled" value={String(view.enemies)} />
          <div className="grid gap-2">
            {(["bike", "robot", "flight"] as Mode[]).map((item) => (
              <button
                key={item}
                className={`min-h-11 rounded-md border px-3 py-2 text-left text-sm transition ${
                  view.mode === item
                    ? "border-signal bg-signal/15 text-signal"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-white/25"
                }`}
                onClick={() => setMode(item)}
              >
                <span className="font-black uppercase tracking-[0.12em]">
                  {modeCopy[item].label}
                </span>
                <span className="mt-1 block text-xs">{modeCopy[item].role}</span>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-signal/25 bg-signal/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">
              Engineering read
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
              <li>Input adapter shared across traversal forms.</li>
              <li>Mode gates keep mission rules readable and testable.</li>
              <li>Objective events can feed rewards, ads, and analytics cleanly.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function updateMission(state: MissionState, input: InputState, delta: number) {
  if (state.completed) {
    return;
  }
  state.timer += delta;
  const keyboardX = Number(input.right) - Number(input.left);
  const keyboardY = Number(input.down) - Number(input.up);
  const x = Math.abs(input.joystick.x) > 0.05 ? input.joystick.x : keyboardX;
  const y = Math.abs(input.joystick.y) > 0.05 ? input.joystick.y : keyboardY;
  const length = Math.max(1, Math.hypot(x, y));
  const speed = modeCopy[state.mode].speed;
  state.hero.x = clamp(state.hero.x + (x / length) * speed * delta, 5, world - 5);
  state.hero.y = clamp(state.hero.y + (y / length) * speed * delta, 5, world - 5);
  state.energy = clamp(state.energy - (state.mode === "flight" ? 3.5 : 1.4) * delta, 0, 100);
}

function Meter({ label, value, text }: { label: string; value: number; text: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]">
        <span className="text-muted">{label}</span>
        <span className="text-signal">{text}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
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

function cloneState(state: MissionState): MissionState {
  return {
    ...state,
    hero: { ...state.hero },
    objectives: state.objectives.map((objective) => ({ ...objective }))
  };
}

function distance(a: Vec2, b: Vec2) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
