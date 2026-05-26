"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type LazyClientOptions = {
  loadingLabel?: string;
};

export function lazyClientComponent<TProps extends object = Record<string, never>>(
  loader: () => Promise<{ default: ComponentType<TProps> }>,
  options: LazyClientOptions = {}
) {
  return dynamic(loader, {
    ssr: false,
    loading: () => (
      <div className="grid min-h-64 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-sm text-muted">
        {options.loadingLabel ?? "Loading module"}
      </div>
    )
  });
}
