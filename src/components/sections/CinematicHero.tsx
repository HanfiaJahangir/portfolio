"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { LazyAmbientCommandScene } from "@/components/three/LazyAmbientCommandScene";
import { fadeUpVariants } from "@/systems/animation/framer";
import { useExperienceTier } from "@/hooks/useExperienceTier";

export function CinematicHero() {
  const tier = useExperienceTier();
  const isDense = tier !== "mobile";

  return (
    <section className="relative min-h-screen overflow-hidden px-page pb-16 pt-24 lg:pb-20 lg:pt-28">
      <div className="absolute inset-0 opacity-90 lg:opacity-100">
        <LazyAmbientCommandScene tier={tier} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_36%,transparent_0%,rgba(5,7,13,0.18)_34%,rgba(5,7,13,0.9)_100%)] lg:bg-[radial-gradient(circle_at_60%_42%,transparent_0%,rgba(5,7,13,0.08)_34%,rgba(5,7,13,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent" />

      <div className="relative z-content mx-auto grid min-h-[calc(100vh-6rem)] max-w-[92rem] content-between gap-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <p className="inline-flex rounded-md border border-signal/30 bg-void/70 px-3 py-1 text-eyebrow font-bold uppercase text-signal backdrop-blur">
              {profile.role}
            </p>
            <h1 className="mt-5 text-h1 font-black text-ink xl:max-w-5xl">
              Senior Unity systems engineer shipping gameplay architecture at production scale.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-muted lg:max-w-3xl">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projects">View shipped work</Button>
              <Button href="/systems" variant="secondary">
                Inspect systems
              </Button>
              <Button href={profile.resume} variant="ghost" target="_blank" rel="noreferrer">
                Download Resume
              </Button>
              <Button href="/contact" variant="ghost">
                Contact
              </Button>
            </div>
          </motion.div>

          {isDense ? (
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="hidden rounded-lg border border-white/10 bg-void/68 p-5 shadow-command backdrop-blur-xl lg:block"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-reactor">
                Runtime Focus
              </p>
              <div className="mt-5 grid gap-3">
                {profile.focus.map((focus, index) => (
                  <div
                    key={focus}
                    className="rounded-md border border-white/10 bg-white/[0.045] p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-ink">{focus}</p>
                      <span className="text-xs font-bold text-muted">0{index + 1}</span>
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
          transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.label}
              className="rounded-lg border border-white/10 bg-void/68 p-4 shadow-command backdrop-blur-xl lg:p-5"
            >
              <p className="text-2xl font-black text-ink lg:text-3xl">{achievement.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-signal">
                {achievement.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{achievement.description}</p>
            </div>
          ))}
        </motion.div>

        {isDense ? (
          <div className="pointer-events-none absolute bottom-44 right-0 hidden max-w-sm rounded-lg border border-signal/20 bg-signal/10 p-4 text-sm leading-6 text-ink backdrop-blur-xl xl:block">
            Desktop cinematic mode: project terminals, systems lab, ambient camera response, and
            recruiter navigation preserved.
          </div>
        ) : null}
      </div>
    </section>
  );
}
