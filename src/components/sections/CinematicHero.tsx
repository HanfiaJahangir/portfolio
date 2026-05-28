"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { LazyAmbientCommandScene } from "@/components/three/LazyAmbientCommandScene";
import { fadeUpVariants } from "@/systems/animation/framer";
import { useExperienceTier } from "@/hooks/useExperienceTier";

const facilitySignals = [
  { label: "Runtime", value: "Unity systems" },
  { label: "Output", value: "80+ shipped" },
  { label: "Mode", value: "Cinematic desktop" }
];

const introItems = ["Playable labs", "80+ shipped projects", "Mobile runtime focus"];

export function CinematicHero() {
  const tier = useExperienceTier();
  const isDense = tier !== "mobile";

  return (
    <section className="relative min-h-screen overflow-hidden px-page pb-16 pt-24 lg:pb-20 lg:pt-28">
      <div className="absolute inset-0 opacity-90 lg:opacity-100">
        <LazyAmbientCommandScene tier={tier} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_36%,transparent_0%,rgba(5,7,13,0.18)_34%,rgba(5,7,13,0.9)_100%)] lg:bg-[radial-gradient(circle_at_60%_42%,transparent_0%,rgba(5,7,13,0.08)_34%,rgba(5,7,13,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(56,242,194,0.08)_50%,transparent_100%)] opacity-40 animate-[hero-scan_5.8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute left-0 right-0 top-24 hidden h-px bg-gradient-to-r from-transparent via-signal/45 to-transparent opacity-80 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[18%] hidden w-px bg-gradient-to-b from-transparent via-reactor/35 to-transparent opacity-70 lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent" />

      <div className="relative z-content mx-auto grid min-h-[calc(100vh-6rem)] max-w-[92rem] content-between gap-10">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-void/72 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-signal/30 bg-panel/80 px-5 py-4 shadow-command"
          >
            <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">
              Facility systems coming online
            </p>
            <p className="mt-2 text-sm font-semibold text-ink">Gameplay labs calibrated</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-signal"
              />
            </div>
          </motion.div>
        </motion.div>

        {isDense ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute right-0 top-0 hidden w-[22rem] rounded-lg border border-white/10 bg-void/55 p-4 text-xs uppercase tracking-[0.16em] text-muted backdrop-blur-xl lg:block"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-black text-signal">Command core</span>
              <span>Online</span>
            </div>
            <div className="mt-4 grid gap-2">
              {facilitySignals.map((signal) => (
                <div key={signal.label} className="flex items-center justify-between gap-4">
                  <span>{signal.label}</span>
                  <span className="font-bold text-ink">{signal.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="max-w-5xl pt-4 lg:pt-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex rounded-md border border-signal/30 bg-void/70 px-3 py-1 text-eyebrow font-bold uppercase text-signal backdrop-blur"
            >
              {profile.role}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.18, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-h1 font-black text-ink xl:max-w-5xl"
            >
              Enter a gameplay systems facility built around shipped Unity production work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.32, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-lead text-muted lg:max-w-3xl"
            >
              {profile.intro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.44, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/worlds">Enter facility</Button>
              <Button href="/projects" variant="secondary">
                View shipped work
              </Button>
              <Button href="/systems" variant="secondary">
                Inspect systems
              </Button>
              <Button href={profile.resume} variant="ghost" target="_blank" rel="noreferrer">
                Download Resume
              </Button>
              <Button href="/contact" variant="ghost">
                Contact
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.58, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted"
            >
              {introItems.map((item, index) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur transition-colors hover:border-signal/35 hover:text-ink"
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {isDense ? (
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="hidden rounded-lg border border-white/10 bg-void/68 p-5 shadow-command backdrop-blur-xl lg:block"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-reactor">
                Live Facility Feed
              </p>
              <div className="mt-5 grid gap-3">
                {profile.focus.slice(0, 5).map((focus, index) => (
                  <div
                    key={focus}
                    className="group rounded-md border border-white/10 bg-white/[0.045] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-signal/35 hover:bg-signal/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-ink">{focus}</p>
                      <span className="text-xs font-bold text-muted">0{index + 1}</span>
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-reactor transition-all duration-500 group-hover:bg-signal"
                        style={{ width: `${72 + index * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.68, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.label}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="group rounded-lg border border-white/10 bg-void/68 p-4 shadow-command backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-signal/35 hover:bg-signal/[0.06] lg:p-5"
            >
              <p className="text-2xl font-black text-ink transition duration-300 group-hover:text-signal lg:text-3xl">
                {achievement.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-signal">
                {achievement.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {isDense ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.82, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-44 right-0 hidden max-w-sm rounded-lg border border-signal/20 bg-signal/10 p-4 text-sm leading-6 text-ink backdrop-blur-xl xl:block"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-signal">
              Interaction hint
            </p>
            <p className="mt-2">
              Move the cursor across the command scene. The facility reacts subtly while recruiter
              navigation stays immediately available.
            </p>
          </motion.div>
        ) : null}
      </div>
      <style jsx>{`
        @keyframes hero-scan {
          0%,
          100% {
            transform: translateX(-70%);
            opacity: 0;
          }
          35% {
            opacity: 0.42;
          }
          70% {
            transform: translateX(70%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
