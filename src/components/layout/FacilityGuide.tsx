"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { facilityGuideDestinations } from "@/config/facilityGuide";
import { cn } from "@/utils/cn";

const routeContext = [
  {
    test: "/demos/moto-max",
    message: "Racing lab active. I can return you to the facility map or open systems context."
  },
  {
    test: "/demos/hero-survivor",
    message: "Combat chamber active. Watch the pressure, upgrades, and pooling story."
  },
  {
    test: "/demos/annoying-boss",
    message: "Feedback lab active. The focus here is anticipation, impact, and recovery timing."
  },
  {
    test: "/demos/pollen-pop",
    message: "Puzzle economy lab active. Matches, goals, rewards, and pacing drive the loop."
  },
  {
    test: "/projects",
    message: "Archive deck active. This is the fastest path for shipped work and recruiter review."
  },
  {
    test: "/systems",
    message:
      "Systems command active. Multiplayer, monetization, optimization, and SDK layers live here."
  },
  {
    test: "/worlds",
    message: "Transit map active. This is the best route for guided exploration."
  }
];

export function FacilityGuide() {
  const pathname = usePathname();
  const router = useRouter();
  const audioRef = useRef<AudioContext | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [cursorBias, setCursorBias] = useState({ x: 0, y: 0 });
  const [activeDestination, setActiveDestination] = useState<string | null>(null);

  const isDemoRoute = pathname.startsWith("/demos/");
  const contextMessage = useMemo(
    () =>
      routeContext.find((context) => pathname.startsWith(context.test))?.message ??
      "Welcome to the interactive engineering facility. I can route you to the key labs without interrupting exploration.",
    [pathname]
  );

  const playTone = useCallback((frequency: number, duration = 0.12) => {
    const audioWindow = window as Window &
      typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const AudioContextClass = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const context = audioRef.current ?? new AudioContextClass();
    audioRef.current = context;
    void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.value = 0;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    gain.gain.setTargetAtTime(0.035, context.currentTime, 0.015);
    gain.gain.setTargetAtTime(0, context.currentTime + duration, 0.035);
    window.setTimeout(
      () => {
        oscillator.stop();
        oscillator.disconnect();
        gain.disconnect();
      },
      Math.ceil((duration + 0.12) * 1000)
    );
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      setCursorBias({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDestination(null);
    setIsRouting(false);
  }, [pathname]);

  useEffect(() => {
    const suspendGuideAudio = () => {
      if (document.visibilityState === "hidden") {
        void audioRef.current?.suspend();
      }
    };

    document.addEventListener("visibilitychange", suspendGuideAudio);
    return () => document.removeEventListener("visibilitychange", suspendGuideAudio);
  }, []);

  const openGuide = () => {
    setIsOpen((value) => !value);
    playTone(isOpen ? 240 : 420, 0.09);
  };

  const selectDestination = (href: string, id: string) => {
    setActiveDestination(id);
    setIsRouting(true);
    playTone(520, 0.16);
    window.setTimeout(() => {
      router.push(href);
    }, 520);
  };

  return (
    <>
      <AnimatePresence>
        {isRouting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[70] bg-void/40 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-1/2 h-px w-full origin-left bg-gradient-to-r from-transparent via-signal to-transparent"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "fixed bottom-4 right-4 z-[65]",
          isDemoRoute && "max-lg:hidden",
          "lg:bottom-16"
        )}
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 w-[min(calc(100vw-2rem),26rem)] overflow-hidden rounded-lg border border-signal/20 bg-void/82 shadow-command backdrop-blur-2xl"
            >
              <div className="border-b border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">
                      Facility Guide
                    </p>
                    <h2 className="mt-2 text-lg font-black text-ink">Ariadne navigation node</h2>
                  </div>
                  <button
                    aria-label="Close facility guide"
                    className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-sm font-black text-muted transition hover:border-signal/40 hover:text-signal"
                    onClick={() => {
                      setIsOpen(false);
                      playTone(220, 0.08);
                    }}
                  >
                    X
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{contextMessage}</p>
              </div>

              <div className="grid max-h-[58vh] gap-2 overflow-y-auto p-3">
                {facilityGuideDestinations.map((destination, index) => (
                  <motion.button
                    key={destination.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.035,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className={cn(
                      "group rounded-md border border-white/10 bg-white/[0.035] p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.07]",
                      destination.tone === "signal" && "hover:border-signal/40",
                      destination.tone === "reactor" && "hover:border-reactor/40",
                      destination.tone === "ink" && "hover:border-white/25",
                      activeDestination === destination.id && "border-signal/60 bg-signal/10"
                    )}
                    onClick={() => selectDestination(destination.href, destination.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-ink">{destination.label}</p>
                        <p
                          className={cn(
                            "mt-1 text-[11px] font-bold uppercase tracking-[0.18em]",
                            destination.tone === "reactor" ? "text-reactor" : "text-signal"
                          )}
                        >
                          {destination.command}
                        </p>
                      </div>
                      <span className="text-lg text-muted transition group-hover:translate-x-1 group-hover:text-ink">
                        &gt;
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-muted">{destination.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close facility guide" : "Open facility guide"}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-signal/30 bg-void/74 shadow-command backdrop-blur-xl transition hover:border-signal/70"
          animate={{
            x: isOpen ? cursorBias.x : 0,
            y: isOpen ? cursorBias.y : 0,
            scale: isOpen ? 1.04 : 1
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          onClick={openGuide}
        >
          <span className="facility-guide-signal absolute inset-[-7px] rounded-full border border-signal/20" />
          <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(56,242,194,0.42),rgba(56,242,194,0.08)_48%,transparent_70%)] opacity-80 transition group-hover:opacity-100" />
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-signal/15 text-xs font-black uppercase tracking-[0.12em] text-signal">
            AI
          </span>
        </motion.button>
      </div>
    </>
  );
}
