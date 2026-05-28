"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const routeLabels = [
  { test: "/demos/moto-max", label: "Racing Simulation Lab", code: "DECK R-01" },
  { test: "/demos/bike-drift", label: "Highway Handling Tunnel", code: "DECK R-02" },
  { test: "/demos/hero-survivor", label: "Combat Systems Chamber", code: "DECK C-01" },
  { test: "/demos/annoying-boss", label: "Feedback Testing Lab", code: "DECK F-01" },
  { test: "/demos/pollen-pop", label: "Puzzle Economy Lab", code: "DECK P-01" },
  { test: "/demos/bat-hero", label: "Transformation Mission Bay", code: "DECK T-01" },
  { test: "/worlds", label: "Facility Transit Map", code: "CENTRAL" },
  { test: "/projects", label: "Shipped Projects Archive", code: "ARCHIVE" },
  { test: "/systems", label: "Systems Command Center", code: "OPS" }
];

export function FacilityAtmosphere() {
  const pathname = usePathname();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const location = useMemo(
    () =>
      routeLabels.find((route) => pathname.startsWith(route.test)) ?? {
        label: "Interactive Engineering Facility",
        code: "HJ-80"
      },
    [pathname]
  );

  useEffect(() => {
    if (!audioEnabled) {
      gainRef.current?.gain.setTargetAtTime(0, audioRef.current?.currentTime ?? 0, 0.08);
      void audioRef.current?.suspend();
      return;
    }

    const context = audioRef.current ?? new AudioContext();
    audioRef.current = context;
    void context.resume();
    const master = gainRef.current ?? context.createGain();
    gainRef.current = master;
    master.gain.value = 0;
    master.connect(context.destination);

    const hum = context.createOscillator();
    const shimmer = context.createOscillator();
    hum.type = "sine";
    shimmer.type = "triangle";
    hum.frequency.value = 58;
    shimmer.frequency.value = 116;
    hum.connect(master);
    shimmer.connect(master);
    hum.start();
    shimmer.start();
    master.gain.setTargetAtTime(0.025, context.currentTime, 0.2);

    return () => {
      master.gain.setTargetAtTime(0, context.currentTime, 0.08);
      window.setTimeout(() => {
        hum.stop();
        shimmer.stop();
        hum.disconnect();
        shimmer.disconnect();
      }, 140);
    };
  }, [audioEnabled]);

  useEffect(() => {
    const updateAudioLifecycle = () => {
      if (!audioRef.current) {
        return;
      }
      if (document.visibilityState === "hidden") {
        void audioRef.current.suspend();
      } else if (audioEnabled) {
        void audioRef.current.resume();
      }
    };

    document.addEventListener("visibilitychange", updateAudioLifecycle);
    return () => document.removeEventListener("visibilitychange", updateAudioLifecycle);
  }, [audioEnabled]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,242,194,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(247,185,85,0.09),transparent_25%),linear-gradient(180deg,#05070d_0%,#07101b_52%,#05070d_100%)]" />
        <div className="absolute inset-0 bg-scan-grid bg-[length:48px_48px] opacity-25" />
        <div className="facility-rail absolute left-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-signal/35 to-transparent" />
        <div className="facility-rail-delayed absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-reactor/25 to-transparent" />
        <div className="absolute bottom-[14%] left-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="facility-scan absolute left-0 top-20 h-24 w-full bg-gradient-to-b from-transparent via-signal/5 to-transparent" />
      </div>

      <div className="pointer-events-none fixed bottom-4 left-4 z-40 hidden rounded-md border border-white/10 bg-void/62 px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted backdrop-blur-xl lg:block">
        <span className="text-signal">{location.code}</span>
        <span className="mx-2 text-white/25">/</span>
        <span>{location.label}</span>
      </div>

      <button
        className="fixed bottom-4 right-4 z-40 hidden rounded-md border border-white/10 bg-void/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted backdrop-blur-xl transition hover:border-signal/40 hover:text-signal lg:block"
        onClick={() => setAudioEnabled((value) => !value)}
      >
        {audioEnabled ? "Ambient on" : "Ambient off"}
      </button>
    </>
  );
}
