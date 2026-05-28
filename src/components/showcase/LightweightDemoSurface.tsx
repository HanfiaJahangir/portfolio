"use client";

import { useMemo, useState } from "react";
import type { DemoModule } from "@/types/portfolio";

type LightweightDemoSurfaceProps = {
  demo: DemoModule;
};

export function LightweightDemoSurface({ demo }: LightweightDemoSurfaceProps) {
  const [intensity, setIntensity] = useState(42);
  const nodes = useMemo(() => ["Input", "State", "Feedback", "Metrics"], []);

  return (
    <div className="rounded-lg border border-white/10 bg-panel/75 p-5 shadow-command">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            {demo.renderer}
          </p>
          <h3 className="mt-3 text-2xl font-black text-ink">{demo.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{demo.summary}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-void/45 p-3 text-sm text-muted">
          Quality: adaptive
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="grid min-h-64 place-items-center rounded-lg border border-white/10 bg-void/55 p-4">
          <div className="grid w-full max-w-2xl grid-cols-4 gap-3">
            {nodes.map((node, index) => (
              <div
                key={node}
                className="rounded-md border border-signal/20 bg-signal/10 p-3 text-center text-sm font-bold text-ink"
                style={{
                  transform: `translateY(${Math.sin((intensity + index * 18) / 18) * 8}px)`
                }}
              >
                {node}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <label className="text-sm font-bold text-ink" htmlFor={`${demo.slug}-intensity`}>
            Interaction intensity
          </label>
          <input
            id={`${demo.slug}-intensity`}
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
            className="mt-4 w-full"
          />
          <p className="mt-4 text-sm leading-6 text-muted">
            This systems surface keeps interaction logic isolated from project pages, preserving
            fast navigation while showing input, state, feedback, and metrics flow.
          </p>
        </div>
      </div>
    </div>
  );
}
