"use client";

import { useEffect, useState } from "react";
import type { DemoModule } from "@/types/portfolio";

type UnityWebGLShellProps = {
  demo: DemoModule;
};

export function UnityWebGLShell({ demo }: UnityWebGLShellProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-panel/75 p-5 shadow-command">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-reactor">Unity WebGL Mount</p>
      <h3 className="mt-3 text-2xl font-black text-ink">{demo.title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{demo.summary}</p>
      <div className="mt-6 grid min-h-72 place-items-center rounded-lg border border-dashed border-white/15 bg-void/60 p-6 text-center">
        <div>
          <p className="text-lg font-bold text-ink">
            {isMounted ? "Isolated mount ready" : "Preparing mount"}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Unity content loads through an isolated mount with async startup, teardown discipline,
            and no impact on primary recruiter routes.
          </p>
        </div>
      </div>
    </div>
  );
}
