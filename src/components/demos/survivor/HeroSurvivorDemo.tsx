"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";

type Vec2 = { x: number; y: number };
type Enemy = { id: number; x: number; y: number; hp: number; boss?: boolean; speed: number };
type Projectile = { id: number; x: number; y: number; vx: number; vy: number; pierce: number };
type Pickup = { id: number; x: number; y: number; kind: "xp" | "health" | "ally" };
type UpgradeKey = "multiBullet" | "disc" | "attackSpeed" | "projectileSize" | "moveSpeed" | "chain";
type GamePhase = "playing" | "upgrade" | "boss" | "complete" | "defeat";
type ActivePhase = "playing" | "boss";

type UpgradeOption = {
  key: UpgradeKey;
  title: string;
  description: string;
};

type GameView = {
  player: Vec2;
  health: number;
  wave: number;
  phase: GamePhase;
  pausedPhase: ActivePhase;
  xp: number;
  level: number;
  mergeCount: number;
  evolveStage: number;
  kills: number;
  timer: number;
  upgradeTimer: number;
  fireRate: number;
  upgrades: Record<UpgradeKey, number>;
  enemies: Enemy[];
  projectiles: Projectile[];
  pickups: Pickup[];
  bossHp: number;
  upgradeOptions: UpgradeOption[];
};

type InputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  joystick: Vec2;
};

const WORLD_LIMIT = 150;
const VIEW_RADIUS = 86;
const WAVE_DURATION = 12;
const BOSS_START_TIME = 90;
const UPGRADE_INTERVAL = 16;
const MAX_ENEMIES = 42;

let nextId = 1;

const upgradeDeck: UpgradeOption[] = [
  {
    key: "multiBullet",
    title: "Multi Bullet",
    description: "Adds another projectile lane for wider crowd control."
  },
  {
    key: "disc",
    title: "Electric Disc",
    description: "Creates a rotating defensive damage field around the survivor."
  },
  {
    key: "attackSpeed",
    title: "Rapid Core",
    description: "Increases auto-fire cadence for stronger pressure clearing."
  },
  {
    key: "projectileSize",
    title: "Heavy Rounds",
    description: "Boosts projectile size and impact damage."
  },
  {
    key: "moveSpeed",
    title: "Dash Reflex",
    description: "Improves movement speed for tighter swarm evasion."
  },
  {
    key: "chain",
    title: "Chain Spark",
    description: "Adds a short lightning burst when projectiles defeat enemies."
  }
];

const initialView: GameView = {
  player: { x: 0, y: 0 },
  health: 100,
  wave: 1,
  phase: "playing",
  pausedPhase: "playing",
  xp: 0,
  level: 1,
  mergeCount: 0,
  evolveStage: 1,
  kills: 0,
  timer: 0,
  upgradeTimer: UPGRADE_INTERVAL,
  fireRate: 1.05,
  upgrades: {
    multiBullet: 0,
    disc: 0,
    attackSpeed: 0,
    projectileSize: 0,
    moveSpeed: 0,
    chain: 0
  },
  enemies: [],
  projectiles: [],
  pickups: [],
  bossHp: 0,
  upgradeOptions: []
};

export function HeroSurvivorDemo() {
  const isPageVisible = usePageVisible();
  const gameRef = useRef<GameView>(structuredClone(initialView));
  const inputRef = useRef<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
    joystick: { x: 0, y: 0 }
  });
  const stickRef = useRef<HTMLDivElement | null>(null);
  const fireTimerRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const renderTimerRef = useRef(0);
  const [view, setView] = useState<GameView>(gameRef.current);
  const [stick, setStick] = useState<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const setKey = (event: KeyboardEvent, value: boolean) => {
      const key = event.key.toLowerCase();
      if (key === "w" || key === "arrowup") inputRef.current.up = value;
      if (key === "s" || key === "arrowdown") inputRef.current.down = value;
      if (key === "a" || key === "arrowleft") inputRef.current.left = value;
      if (key === "d" || key === "arrowright") inputRef.current.right = value;
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
      updateGame(gameRef.current, inputRef.current, delta, fireTimerRef, spawnTimerRef);
      renderTimerRef.current += delta;

      if (renderTimerRef.current > 0.045) {
        renderTimerRef.current = 0;
        setView(cloneView(gameRef.current));
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPageVisible]);

  function resetDemo() {
    gameRef.current = structuredClone(initialView);
    fireTimerRef.current = 0;
    spawnTimerRef.current = 0;
    inputRef.current.joystick = { x: 0, y: 0 };
    setStick({ x: 0, y: 0 });
    setView(cloneView(gameRef.current));
  }

  function chooseUpgrade(option: UpgradeOption) {
    const game = gameRef.current;
    applySelectedUpgrade(game, option.key);
    game.level += 1;
    game.xp = 0;
    game.upgradeTimer = UPGRADE_INTERVAL;
    game.upgradeOptions = [];
    game.phase = game.pausedPhase;
    setView(cloneView(game));
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

  const visibleEnemies = useMemo(
    () => view.enemies.filter((enemy) => isVisibleOnScreen(view.player, enemy)),
    [view.enemies, view.player]
  );
  const visibleProjectiles = useMemo(
    () => view.projectiles.filter((projectile) => isVisibleOnScreen(view.player, projectile)),
    [view.projectiles, view.player]
  );
  const visiblePickups = useMemo(
    () => view.pickups.filter((pickup) => isVisibleOnScreen(view.player, pickup)),
    [view.pickups, view.player]
  );

  const intensity = Math.min(1, view.wave / 8 + view.enemies.length / 55);
  const discActive = view.upgrades.disc > 0;
  const isPausedForUpgrade = view.phase === "upgrade";

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-command">
      <div className="grid gap-0 xl:grid-cols-[1fr_340px]">
        <div className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(56,242,194,0.16),transparent_22%),linear-gradient(135deg,#05070d,#07101b)] md:min-h-[820px] xl:min-h-[780px]">
          <div className="absolute inset-0 bg-scan-grid bg-[length:42px_42px] opacity-20" />
          <div
            className="absolute inset-[-20%] transition-transform duration-75"
            style={{
              transform: `translate(${(-view.player.x / WORLD_LIMIT) * 4}%, ${(-view.player.y / WORLD_LIMIT) * 4}%)`
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="absolute rounded-full border border-white/10"
                style={{
                  left: `${12 + index * 11}%`,
                  top: `${18 + (index % 4) * 18}%`,
                  width: `${120 + index * 18}px`,
                  height: `${120 + index * 18}px`,
                  opacity: 0.06 + intensity * 0.08
                }}
              />
            ))}
          </div>
          <div
            className="absolute inset-8 rounded-full border border-danger/20"
            style={{ opacity: 0.12 + intensity * 0.26 }}
          />

          {visibleProjectiles.map((projectile) => (
            <span
              key={projectile.id}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-reactor shadow-[0_0_18px_rgba(247,185,85,0.6)]"
              style={{
                ...screenStyle(view.player, projectile),
                scale: 1 + view.upgrades.projectileSize * 0.22
              }}
            />
          ))}

          {visiblePickups.map((pickup) => (
            <span
              key={pickup.id}
              className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-glow ${
                pickup.kind === "ally"
                  ? "h-7 w-7 border-reactor/60 bg-reactor/25 text-[8px] font-black text-reactor"
                  : pickup.kind === "health"
                    ? "h-4 w-4 border-danger/50 bg-danger"
                    : "h-4 w-4 border-signal/50 bg-signal"
              }`}
              style={screenStyle(view.player, pickup)}
            >
              {pickup.kind === "ally" ? "MERGE" : null}
            </span>
          ))}

          {visibleEnemies.map((enemy) => (
            <span
              key={enemy.id}
              className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-black uppercase ${
                enemy.boss
                  ? "h-28 w-28 border-danger/70 bg-danger/25 text-danger shadow-[0_0_42px_rgba(255,89,115,0.32)]"
                  : "h-9 w-9 border-danger/45 bg-danger/20 text-[9px] text-danger"
              }`}
              style={screenStyle(view.player, enemy)}
            >
              {enemy.boss ? "Boss" : "AI"}
            </span>
          ))}

          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/50 bg-signal/15 shadow-glow">
            {view.evolveStage > 1 ? (
              <div
                className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-reactor/25"
                style={{
                  height: `${92 + view.evolveStage * 18}px`,
                  width: `${92 + view.evolveStage * 18}px`,
                  boxShadow: "0 0 32px rgba(247,185,85,0.18)"
                }}
              />
            ) : null}
            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/10" />
            {discActive ? (
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-reactor/80 border-t-transparent" />
            ) : null}
          </div>

          <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-void/70 p-3 backdrop-blur-xl md:left-6 md:top-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
              Survivor.io style loop
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Move only. Weapons auto-fire. Survive alien mobs, collect survivor merge pickups, and
              evolve into stronger combat forms.
            </p>
          </div>

          <div className="absolute bottom-5 left-5 z-20 grid gap-3 md:hidden">
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
          </div>

          {isPausedForUpgrade ? (
            <div className="absolute inset-0 z-30 grid place-items-center bg-void/72 p-5 backdrop-blur-md">
              <div className="w-full max-w-3xl rounded-lg border border-signal/30 bg-panel/95 p-5 shadow-command">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                  Ability upgrade available
                </p>
                <h3 className="mt-3 text-3xl font-black text-ink">Choose your evolution</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  The arena is paused. Pick one upgrade, then the pressure resumes.
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {view.upgradeOptions.map((option) => (
                    <button
                      key={option.key}
                      className="min-h-36 rounded-md border border-white/10 bg-white/[0.05] p-4 text-left transition hover:border-signal/60 hover:bg-signal/10"
                      onClick={() => chooseUpgrade(option)}
                    >
                      <span className="text-sm font-black uppercase tracking-[0.16em] text-signal">
                        {option.title}
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-muted">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 xl:border-l xl:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
              Hero Survivor
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">
              {view.phase === "complete"
                ? "Survival machine complete"
                : view.phase === "defeat"
                  ? "Run collapsed"
                  : view.phase === "upgrade"
                    ? "Build choice paused"
                    : "Escalating horde slice"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Alien survival movement, auto-fire, merge/evolve pickups, timed ability choices, boss
              pressure, and a longer many-wave escalation curve.
            </p>
          </div>
          <Meter label="Health" value={view.health / 100} text={`${Math.round(view.health)}%`} />
          <Meter
            label="Upgrade"
            value={1 - view.upgradeTimer / UPGRADE_INTERVAL}
            text={view.phase === "upgrade" ? "Choose" : `${Math.ceil(view.upgradeTimer)}s`}
          />
          <Meter label="XP" value={(view.xp % 100) / 100} text={`Lv ${view.level}`} />
          <Meter label="Merge" value={view.mergeCount / 3} text={`Stage ${view.evolveStage}`} />
          <Stat label="Wave" value={view.phase === "boss" ? "Boss" : `${view.wave}/8`} />
          <Stat label="Kills" value={String(view.kills)} />
          <Stat label="Fire Rate" value={`${view.fireRate.toFixed(1)}/s`} />
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Upgrades</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(view.upgrades).map(([key, value]) => (
                <span
                  key={key}
                  className="rounded border border-signal/20 bg-signal/10 px-2 py-1 text-xs text-signal"
                >
                  {upgradeLabel(key as UpgradeKey)} {value}
                </span>
              ))}
            </div>
          </div>
          {view.phase === "complete" || view.phase === "defeat" ? (
            <div className="rounded-lg border border-signal/40 bg-signal/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
                Engineering breakdown
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                <li>Joystick and keyboard input adapter for survivor movement</li>
                <li>Merge/evolve pickup loop for scale, firepower, and power-fantasy feedback</li>
                <li>Timed upgrade-selection state that pauses simulation cleanly</li>
                <li>Longer wave ramp with spawn budgets instead of instant enemy flood</li>
                <li>Camera-follow viewport over a larger arena for kiting and evasion</li>
              </ul>
              <button
                className="mt-4 min-h-11 rounded-md border border-signal/70 bg-signal px-4 py-2 text-sm font-bold text-void"
                onClick={resetDemo}
              >
                Restart survival loop
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function updateGame(
  game: GameView,
  input: InputState,
  delta: number,
  fireTimerRef: React.MutableRefObject<number>,
  spawnTimerRef: React.MutableRefObject<number>
) {
  if (game.phase === "complete" || game.phase === "defeat" || game.phase === "upgrade") {
    return;
  }

  game.timer += delta;
  game.upgradeTimer -= delta;

  if (game.upgradeTimer <= 0) {
    game.pausedPhase = game.phase === "boss" ? "boss" : "playing";
    game.phase = "upgrade";
    game.upgradeOptions = rollUpgradeOptions(game.upgrades);
    return;
  }

  const move = getMoveVector(input);
  const moveSpeed = 42 + game.upgrades.moveSpeed * 5;
  game.player.x = clamp(game.player.x + move.x * moveSpeed * delta, -WORLD_LIMIT, WORLD_LIMIT);
  game.player.y = clamp(game.player.y + move.y * moveSpeed * delta, -WORLD_LIMIT, WORLD_LIMIT);

  if (game.phase === "playing") {
    game.wave = Math.min(8, Math.floor(game.timer / WAVE_DURATION) + 1);
  }

  if (game.timer > BOSS_START_TIME && game.phase !== "boss") {
    game.phase = "boss";
    game.bossHp = 560;
    game.enemies.push({
      id: nextId++,
      x: game.player.x,
      y: game.player.y - VIEW_RADIUS * 0.8,
      hp: 560,
      boss: true,
      speed: 11
    });
  }

  spawnTimerRef.current -= delta;
  if (spawnTimerRef.current <= 0 && game.phase === "playing") {
    const count = game.wave < 3 ? 1 : game.wave < 6 ? 2 : 3;
    spawnEnemies(game, count);
    spawnTimerRef.current = Math.max(0.85, 1.75 - game.wave * 0.1);
  }

  updateEnemies(game, delta);
  updateAutoFire(game, delta, fireTimerRef);
  updateProjectiles(game, delta);
  updatePickups(game, delta);
  applyElectricDisc(game);

  if (game.health <= 0) {
    game.phase = "defeat";
  }

  if (game.phase === "boss" && game.bossHp <= 0) {
    game.phase = "complete";
    game.enemies = [];
    game.projectiles = [];
    game.pickups = [];
  }
}

function getMoveVector(input: InputState) {
  const keyboardX = Number(input.right) - Number(input.left);
  const keyboardY = Number(input.down) - Number(input.up);
  const x = Math.abs(input.joystick.x) > 0.05 ? input.joystick.x : keyboardX;
  const y = Math.abs(input.joystick.y) > 0.05 ? input.joystick.y : keyboardY;
  const length = Math.hypot(x, y);
  return length > 1 ? { x: x / length, y: y / length } : { x, y };
}

function spawnEnemies(game: GameView, count: number) {
  const budget = Math.max(0, MAX_ENEMIES - game.enemies.length);
  for (let index = 0; index < Math.min(count, budget); index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = VIEW_RADIUS * (0.82 + Math.random() * 0.28);
    const wavePressure = Math.max(0, game.wave - 1);
    game.enemies.push({
      id: nextId++,
      x: clamp(game.player.x + Math.cos(angle) * distance, -WORLD_LIMIT, WORLD_LIMIT),
      y: clamp(game.player.y + Math.sin(angle) * distance, -WORLD_LIMIT, WORLD_LIMIT),
      hp: 12 + wavePressure * 5,
      speed: 8 + wavePressure * 0.95 + Math.random() * 2
    });
  }
}

function updateEnemies(game: GameView, delta: number) {
  game.enemies.forEach((enemy) => {
    const dx = game.player.x - enemy.x;
    const dy = game.player.y - enemy.y;
    const length = Math.hypot(dx, dy) || 1;
    const speed = enemy.boss ? enemy.speed : enemy.speed;
    enemy.x += (dx / length) * speed * delta;
    enemy.y += (dy / length) * speed * delta;

    if (length < (enemy.boss ? 14 : 6)) {
      game.health = clamp(game.health - (enemy.boss ? 9 : 3.4) * delta, 0, 100);
    }
  });
}

function updateAutoFire(
  game: GameView,
  delta: number,
  fireTimerRef: React.MutableRefObject<number>
) {
  fireTimerRef.current -= delta;
  const rate = game.fireRate + game.upgrades.attackSpeed * 0.32;
  if (fireTimerRef.current > 0 || game.enemies.length === 0) {
    return;
  }

  fireTimerRef.current = 1 / rate;
  const bulletCount = 1 + game.upgrades.multiBullet;
  const nearest = [...game.enemies].sort(
    (a, b) => distanceTo(game.player, a) - distanceTo(game.player, b)
  )[0];
  const baseAngle = Math.atan2(nearest.y - game.player.y, nearest.x - game.player.x);

  for (let index = 0; index < bulletCount; index += 1) {
    const spread = (index - (bulletCount - 1) / 2) * 0.18;
    const angle = baseAngle + spread;
    game.projectiles.push({
      id: nextId++,
      x: game.player.x,
      y: game.player.y,
      vx: Math.cos(angle) * 82,
      vy: Math.sin(angle) * 82,
      pierce: game.level > 4 || game.evolveStage > 2 ? 2 : 1
    });
  }
}

function updateProjectiles(game: GameView, delta: number) {
  const lightningBursts: Vec2[] = [];
  game.projectiles.forEach((projectile) => {
    projectile.x += projectile.vx * delta;
    projectile.y += projectile.vy * delta;

    game.enemies.forEach((enemy) => {
      if (projectile.pierce <= 0 || distanceTo(projectile, enemy) > (enemy.boss ? 9 : 5)) {
        return;
      }
      const damage = 10 + game.level * 2 + game.evolveStage * 2 + game.upgrades.projectileSize * 4;
      enemy.hp -= damage;
      if (enemy.boss) {
        game.bossHp = Math.max(0, enemy.hp);
      }
      projectile.pierce -= 1;
      if (enemy.hp <= 0 && game.upgrades.chain > 0) {
        lightningBursts.push({ x: enemy.x, y: enemy.y });
      }
    });
  });

  lightningBursts.forEach((burst) => {
    game.enemies.forEach((enemy) => {
      if (distanceTo(burst, enemy) < 22) {
        enemy.hp -= 9 + game.upgrades.chain * 5;
        if (enemy.boss) {
          game.bossHp = Math.max(0, enemy.hp);
        }
      }
    });
  });

  game.enemies = game.enemies.filter((enemy) => {
    if (enemy.hp > 0) {
      return true;
    }
    game.kills += 1;
    if (!enemy.boss) {
      const roll = Math.random();
      game.pickups.push({
        id: nextId++,
        x: enemy.x,
        y: enemy.y,
        kind: roll > 0.92 ? "ally" : roll > 0.82 ? "health" : "xp"
      });
    }
    return false;
  });

  game.projectiles = game.projectiles.filter(
    (projectile) =>
      projectile.pierce > 0 &&
      Math.abs(projectile.x - game.player.x) < VIEW_RADIUS * 1.25 &&
      Math.abs(projectile.y - game.player.y) < VIEW_RADIUS * 1.25
  );
}

function updatePickups(game: GameView, delta: number) {
  game.pickups.forEach((pickup) => {
    const dx = game.player.x - pickup.x;
    const dy = game.player.y - pickup.y;
    const length = Math.hypot(dx, dy) || 1;
    if (length < 28) {
      pickup.x += (dx / length) * 54 * delta;
      pickup.y += (dy / length) * 54 * delta;
    }
  });

  game.pickups = game.pickups.filter((pickup) => {
    if (distanceTo(game.player, pickup) > 7) {
      return true;
    }
    if (pickup.kind === "health") {
      game.health = clamp(game.health + 14, 0, 100);
    } else if (pickup.kind === "ally") {
      game.mergeCount += 1;
      if (game.mergeCount >= 3) {
        game.mergeCount = 0;
        game.evolveStage += 1;
        game.level += 1;
        game.fireRate += 0.16;
        game.upgrades.multiBullet += game.evolveStage % 2 === 0 ? 1 : 0;
        game.upgrades.projectileSize += game.evolveStage % 2 === 1 ? 1 : 0;
      }
    } else {
      game.xp = clamp(game.xp + 18, 0, 100);
    }
    return false;
  });
}

function applyElectricDisc(game: GameView) {
  if (game.upgrades.disc <= 0) {
    return;
  }
  game.enemies.forEach((enemy) => {
    if (distanceTo(game.player, enemy) < 23) {
      enemy.hp -= 0.85 + game.upgrades.disc * 0.32;
      if (enemy.boss) {
        game.bossHp = Math.max(0, enemy.hp);
      }
    }
  });
}

function rollUpgradeOptions(upgrades: Record<UpgradeKey, number>) {
  return [...upgradeDeck]
    .sort((a, b) => {
      const pressureA = upgrades[a.key] + Math.random();
      const pressureB = upgrades[b.key] + Math.random();
      return pressureA - pressureB;
    })
    .slice(0, 3);
}

function applySelectedUpgrade(game: GameView, key: UpgradeKey) {
  game.upgrades[key] += 1;
  if (key === "attackSpeed") {
    game.fireRate += 0.18;
  }
}

function upgradeLabel(key: UpgradeKey) {
  const labels: Record<UpgradeKey, string> = {
    multiBullet: "Multi",
    disc: "Disc",
    attackSpeed: "Rate",
    projectileSize: "Size",
    moveSpeed: "Move",
    chain: "Chain"
  };
  return labels[key];
}

function Meter({ label, value, text }: { label: string; value: number; text: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]">
        <span className="text-muted">{label}</span>
        <span className="text-signal">{text}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-signal"
          style={{ width: `${clamp(value, 0, 1) * 100}%` }}
        />
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

function cloneView(game: GameView): GameView {
  return {
    ...game,
    player: { ...game.player },
    enemies: game.enemies.map((enemy) => ({ ...enemy })),
    projectiles: game.projectiles.map((projectile) => ({ ...projectile })),
    pickups: game.pickups.map((pickup) => ({ ...pickup })),
    upgrades: { ...game.upgrades },
    upgradeOptions: game.upgradeOptions.map((option) => ({ ...option }))
  };
}

function isVisibleOnScreen(player: Vec2, point: Vec2) {
  return (
    Math.abs(point.x - player.x) < VIEW_RADIUS * 1.25 &&
    Math.abs(point.y - player.y) < VIEW_RADIUS * 1.25
  );
}

function screenStyle(player: Vec2, point: Vec2) {
  return {
    left: `${50 + ((point.x - player.x) / VIEW_RADIUS) * 50}%`,
    top: `${50 + ((point.y - player.y) / VIEW_RADIUS) * 50}%`
  };
}

function distanceTo(a: Vec2, b: Vec2) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
