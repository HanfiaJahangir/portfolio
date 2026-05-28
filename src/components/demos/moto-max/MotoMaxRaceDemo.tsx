"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { PerspectiveCamera, Vector3, type Group } from "three";
import { BikeVehicle } from "@/components/demos/bike-drift/BikeVehicle";
import { TouchControls } from "@/components/demos/bike-drift/TouchControls";
import { useVehicleInput } from "@/components/demos/bike-drift/useVehicleInput";
import type { VehicleInputState } from "@/components/demos/bike-drift/types";
import { webglPerformance } from "@/systems/performance/rendering";
import { prepareWebGLContext, releaseWebGLContext } from "@/systems/performance/webglLifecycle";

type RaceState = {
  progress: number;
  speed: number;
  lane: number;
  x: number;
  z: number;
  heading: number;
  distance: number;
  drift: number;
  rank: number;
  finished: boolean;
  finishTime: number;
  aiProgress: number[];
  countdown: number;
  raceStarted: boolean;
};

const initialRaceState: RaceState = {
  progress: 0,
  speed: 0,
  lane: 0,
  x: -54,
  z: -94,
  heading: 0,
  distance: 0,
  drift: 0,
  rank: 3,
  finished: false,
  finishTime: 0,
  aiProgress: [0, 0, 0, 0],
  countdown: 3.8,
  raceStarted: false
};

const trackPoints = buildCircuitPath();
const trackLength = trackPoints[trackPoints.length - 1]?.distance ?? 1200;

export function MotoMaxRaceDemo() {
  const { inputRef, setInput, resetInput } = useVehicleInput();
  const raceRef = useRef<RaceState>({ ...initialRaceState });
  const [resetSignal, setResetSignal] = useState(0);
  const [telemetry, setTelemetry] = useState<RaceState>(initialRaceState);

  function resetRace() {
    raceRef.current = { ...initialRaceState, aiProgress: [...initialRaceState.aiProgress] };
    resetInput();
    setTelemetry(initialRaceState);
    setResetSignal((value) => value + 1);
  }

  return (
    <div className="relative h-dvh min-h-[720px] overflow-hidden bg-void shadow-command">
      <Canvas
        camera={{ position: [0, 7, -11], fov: 58, near: 0.1, far: 220 }}
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
          <fog attach="fog" args={["#05070d", 42, 150]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 10, -5]} intensity={1.35} />
          <pointLight position={[0, 5, 0]} color="#38f2c2" intensity={4} distance={55} />
          <RaceCircuit />
          <RaceController
            inputRef={inputRef}
            raceRef={raceRef}
            resetSignal={resetSignal}
            onTelemetry={setTelemetry}
          />
          <AiRacer
            index={0}
            raceRef={raceRef}
            resetSignal={resetSignal}
            color="#f7b955"
            speed={29.5}
            lane={-3.8}
          />
          <AiRacer
            index={1}
            raceRef={raceRef}
            resetSignal={resetSignal}
            color="#7c8cff"
            speed={29.1}
            lane={-1.2}
          />
          <AiRacer
            index={2}
            raceRef={raceRef}
            resetSignal={resetSignal}
            color="#ff5a78"
            speed={28.8}
            lane={1.4}
          />
          <AiRacer
            index={3}
            raceRef={raceRef}
            resetSignal={resetSignal}
            color="#38f2c2"
            speed={28.4}
            lane={3.8}
          />
          <RaceCamera raceRef={raceRef} />
        </Suspense>
      </Canvas>
      <RaceHud telemetry={telemetry} onReset={resetRace} />
      <TouchControls setInput={setInput} context="race" />
    </div>
  );
}

function RaceController({
  inputRef,
  raceRef,
  resetSignal,
  onTelemetry
}: {
  inputRef: React.MutableRefObject<VehicleInputState>;
  raceRef: React.MutableRefObject<RaceState>;
  resetSignal: number;
  onTelemetry: (state: RaceState) => void;
}) {
  const groupRef = useRef<Group>(null);
  const lastReset = useRef(resetSignal);
  const telemetryTimer = useRef(0);

  useFrame((_, delta) => {
    const race = raceRef.current;

    if (lastReset.current !== resetSignal) {
      lastReset.current = resetSignal;
    }

    if (!race.raceStarted) {
      race.countdown = Math.max(0, race.countdown - delta);
      race.raceStarted = race.countdown <= 0;
    }

    if (race.raceStarted && !race.finished) {
      updateRace(race, inputRef.current, Math.min(delta, 0.033));
    } else {
      race.speed += (0 - race.speed) * delta * 3;
      race.finishTime += delta;
    }

    const pose = {
      position: new Vector3(race.x, 0.12, race.z),
      heading: race.heading
    };

    if (groupRef.current) {
      groupRef.current.position.copy(pose.position);
      groupRef.current.rotation.set(0, pose.heading, -race.lane * 0.035 - race.drift * 0.22);
    }

    telemetryTimer.current += delta;
    if (telemetryTimer.current > 0.08) {
      telemetryTimer.current = 0;
      onTelemetry({ ...race });
    }
  });

  return (
    <group ref={groupRef}>
      <BikeVehicle />
    </group>
  );
}

function updateRace(race: RaceState, input: VehicleInputState, delta: number) {
  const steer = Number(input.left) - Number(input.right);
  const targetDrift = input.drift && race.speed > 10 ? 1 : 0;
  race.drift += (targetDrift - race.drift) * delta * 6;

  if (input.accelerate) {
    race.speed += 38 * delta;
  } else if (input.brake) {
    race.speed -= 36 * delta;
  } else {
    race.speed -= Math.min(race.speed, 4.2 * delta);
  }

  race.speed = Math.max(0, Math.min(38, race.speed));
  const speedFactor = race.speed / 38;
  race.heading += steer * (1.15 + speedFactor * 1.35) * (1 + race.drift * 0.7) * delta;
  const step = race.speed * (1 + race.drift * 0.08) * delta;
  race.x += Math.sin(race.heading) * step;
  race.z += Math.cos(race.heading) * step;
  race.distance += step;
  const nearest = getNearestTrackProgress(new Vector3(race.x, 0.12, race.z));
  race.progress = Math.max(race.progress, nearest.progress);
  const trackLimit = 6.2;
  if (nearest.distanceFromCenter > trackLimit) {
    const correction = nearest.normal
      .clone()
      .multiplyScalar(nearest.signedLane - Math.sign(nearest.signedLane) * trackLimit);
    race.x -= correction.x;
    race.z -= correction.z;
    race.heading += -Math.sign(nearest.signedLane) * delta * 0.75;
  }
  const trackPenalty = nearest.distanceFromCenter > trackLimit ? 0.88 : 1;
  race.speed *= trackPenalty;
  race.lane = Math.max(-6, Math.min(6, nearest.signedLane));
  race.rank = 1 + race.aiProgress.filter((progress) => progress > race.progress).length;

  if (race.progress >= 1) {
    race.progress = 1;
    race.finished = true;
  }
}

function RaceCamera({ raceRef }: { raceRef: React.MutableRefObject<RaceState> }) {
  const { camera } = useThree();
  const look = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const perspectiveCamera = camera instanceof PerspectiveCamera ? camera : null;
    const race = raceRef.current;
    const pose = {
      position: new Vector3(race.x, 0.12, race.z),
      heading: race.heading
    };
    const back = new Vector3(Math.sin(pose.heading), 0, Math.cos(pose.heading)).multiplyScalar(
      -10.5
    );
    const desired = pose.position
      .clone()
      .add(back)
      .add(new Vector3(0, 5.4 + race.speed * 0.035, 0));
    look.copy(pose.position).add(new Vector3(0, 1.4, 0));
    camera.position.lerp(desired, Math.min(1, delta * 4.5));
    camera.lookAt(look);
    if (perspectiveCamera) {
      perspectiveCamera.fov +=
        (54 + race.speed * 0.34 + race.drift * 4 - perspectiveCamera.fov) * delta * 4;
      perspectiveCamera.updateProjectionMatrix();
    }
  });

  return null;
}

function AiRacer({
  index,
  raceRef,
  resetSignal,
  color,
  speed,
  lane
}: {
  index: number;
  raceRef: React.MutableRefObject<RaceState>;
  resetSignal: number;
  color: string;
  speed: number;
  lane: number;
}) {
  const ref = useRef<Group>(null);
  const progressRef = useRef(0);
  const lastReset = useRef(resetSignal);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    const race = raceRef.current;

    if (lastReset.current !== resetSignal) {
      progressRef.current = 0;
      lastReset.current = resetSignal;
    }

    if (race.raceStarted && !race.finished) {
      const gap = race.progress - progressRef.current;
      const rubberBand = gap > 0.08 ? 1.16 : gap < -0.08 ? 0.9 : 1;
      progressRef.current = Math.min(
        1,
        progressRef.current + (speed * rubberBand * delta) / trackLength
      );
    }

    race.aiProgress[index] = progressRef.current;
    const playerProgress = race.progress;
    const avoidanceLane =
      Math.abs(progressRef.current - playerProgress) < 0.035
        ? lane + Math.sign(lane || 1) * 1.2
        : lane;
    const pose = getTrackPose(progressRef.current, avoidanceLane);
    ref.current.position.copy(pose.position);
    ref.current.rotation.set(0, pose.heading, 0);
  });

  return (
    <group ref={ref} scale={1.25}>
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.7, 0.28, 1.45]} />
        <meshStandardMaterial color="#111827" emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0.55, 0.16]}>
        <boxGeometry args={[0.42, 0.14, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.06, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.18, 1.8]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      <pointLight position={[0, 0.5, -0.7]} color={color} intensity={1} distance={5} />
    </group>
  );
}

function RaceCircuit() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[210, 250]} />
        <meshStandardMaterial color="#070b12" roughness={0.72} />
      </mesh>
      {Array.from({ length: 90 }, (_, index) => {
        const pose = getTrackPose(index / 90, 0);
        return (
          <group
            key={index}
            position={[pose.position.x, 0.05, pose.position.z]}
            rotation={[0, pose.heading, 0]}
          >
            <mesh>
              <boxGeometry args={[13.5, 0.08, 4.2]} />
              <meshStandardMaterial color="#101827" roughness={0.5} metalness={0.15} />
            </mesh>
            <mesh position={[-7.2, 0.04, 0]}>
              <boxGeometry args={[0.22, 0.08, 4.4]} />
              <meshStandardMaterial color="#38f2c2" emissive="#38f2c2" emissiveIntensity={0.42} />
            </mesh>
            <mesh position={[7.2, 0.04, 0]}>
              <boxGeometry args={[0.22, 0.08, 4.4]} />
              <meshStandardMaterial color="#38f2c2" emissive="#38f2c2" emissiveIntensity={0.42} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[-54, 0.2, -94]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[13, 0.18, 0.28]} />
        <meshStandardMaterial color="#ffffff" emissive="#38f2c2" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function RaceHud({ telemetry, onReset }: { telemetry: RaceState; onReset: () => void }) {
  const countdownText =
    telemetry.raceStarted || telemetry.finished
      ? null
      : telemetry.countdown > 2.8
        ? "3"
        : telemetry.countdown > 1.8
          ? "2"
          : telemetry.countdown > 0.8
            ? "1"
            : "START";

  return (
    <div className="pointer-events-none absolute inset-0 z-content flex flex-col justify-between p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="rounded-lg border border-white/10 bg-void/72 p-4 shadow-command backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">Moto Max</p>
          <h2 className="mt-2 text-2xl font-black text-ink">Closed circuit race slice</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Race one neon circuit lap against lightweight AI. Hold Space through bends for a
            drift/boost feel.
          </p>
        </div>
        <div className="grid w-full gap-2 rounded-lg border border-white/10 bg-void/72 p-4 shadow-command backdrop-blur-xl md:w-80">
          <HudBar
            label="Speed"
            value={telemetry.speed / 34}
            text={`${Math.round(telemetry.speed * 6)} km/h`}
          />
          <HudBar
            label="Lap"
            value={telemetry.progress}
            text={`${Math.round(telemetry.progress * 100)}%`}
          />
          <HudBar
            label="Drift"
            value={telemetry.drift}
            text={telemetry.drift > 0.2 ? "active" : "ready"}
          />
          <div className="rounded-md border border-white/10 bg-white/[0.05] p-3 text-sm font-black uppercase tracking-[0.18em] text-signal">
            Rank P{telemetry.rank}
          </div>
          <button
            className="pointer-events-auto rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-ink transition hover:border-signal/40"
            onClick={onReset}
          >
            Restart race
          </button>
        </div>
      </div>
      {telemetry.finished ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <ConfettiBurst />
          <div className="max-w-xl rounded-lg border border-signal/35 bg-void/82 p-6 text-center shadow-glow backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
              Finish sequence
            </p>
            <h3 className="mt-2 text-4xl font-black text-ink">Race complete: P{telemetry.rank}</h3>
            <div className="mt-5 grid gap-3 text-left md:grid-cols-2">
              {[
                "Vehicle controller architecture",
                "Dynamic camera/FOV feedback",
                "Drift and momentum tuning",
                "Mobile optimization boundaries"
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-muted"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {countdownText ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="rounded-lg border border-signal/40 bg-void/78 px-10 py-7 text-center shadow-glow backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              Race starts in
            </p>
            <p className="mt-2 text-7xl font-black text-signal">{countdownText}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: 8 + ((index * 17) % 84),
        delay: (index % 9) * 0.08,
        color: index % 3 === 0 ? "#38f2c2" : index % 3 === 1 ? "#f7b955" : "#7c8cff"
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-[-12px] h-3 w-1.5 animate-[confetti-fall_2.4s_ease-in_forwards] rounded-sm"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, -24px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(24px, 105vh, 0) rotate(680deg);
            opacity: 0;
          }
        }
      `}</style>
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

function getTrackPose(progress: number, lane: number) {
  const distance = (progress % 1) * trackLength;
  const nextIndex = trackPoints.findIndex((point) => point.distance >= distance);
  const end = trackPoints[Math.max(1, nextIndex)];
  const start = trackPoints[Math.max(0, Math.max(1, nextIndex) - 1)];
  const segmentLength = Math.max(0.001, end.distance - start.distance);
  const alpha = (distance - start.distance) / segmentLength;
  const center = start.position.clone().lerp(end.position, alpha);
  const tangent = end.position.clone().sub(start.position).normalize();
  const normal = new Vector3(tangent.z, 0, -tangent.x);
  const position = center.add(normal.multiplyScalar(lane));
  const heading = Math.atan2(tangent.x, tangent.z);
  return { position, heading };
}

function getNearestTrackProgress(position: Vector3) {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < trackPoints.length; index += 1) {
    const distance = position.distanceTo(trackPoints[index].position);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }

  const current = trackPoints[bestIndex];
  const next = trackPoints[Math.min(trackPoints.length - 1, bestIndex + 1)];
  const tangent = next.position.clone().sub(current.position).normalize();
  const toPlayer = position.clone().sub(current.position);
  const normal = new Vector3(tangent.z, 0, -tangent.x);
  const signedLane = toPlayer.dot(normal);

  return {
    progress: current.distance / trackLength,
    signedLane,
    distanceFromCenter: Math.abs(signedLane),
    normal
  };
}

function buildCircuitPath() {
  const points: Array<{ position: Vector3; distance: number }> = [];
  const cursor = new Vector3(-54, 0.12, -94);
  let heading = 0;
  let distance = 0;

  function pushPoint(position: Vector3) {
    const previous = points[points.length - 1]?.position;
    if (previous) {
      distance += previous.distanceTo(position);
    }
    points.push({ position: position.clone(), distance });
  }

  function addStraight(length: number, steps: number) {
    for (let index = 1; index <= steps; index += 1) {
      const step = length / steps;
      cursor.x += Math.sin(heading) * step;
      cursor.z += Math.cos(heading) * step;
      pushPoint(cursor);
    }
  }

  function addRightTurn(radius: number, steps: number) {
    const startHeading = heading;
    const right = new Vector3(Math.cos(startHeading), 0, -Math.sin(startHeading));
    const center = cursor.clone().add(right.multiplyScalar(radius));

    for (let index = 1; index <= steps; index += 1) {
      heading = startHeading + (Math.PI / 2) * (index / steps);
      const radial = new Vector3(-Math.cos(heading), 0, Math.sin(heading)).multiplyScalar(radius);
      cursor.copy(center).add(radial);
      pushPoint(cursor);
    }
  }

  pushPoint(cursor);
  addStraight(260, 32);
  addRightTurn(30, 16);
  addStraight(130, 16);
  addRightTurn(30, 16);
  addStraight(260, 32);
  addRightTurn(30, 16);
  addStraight(130, 16);
  addRightTurn(30, 16);

  return points;
}
