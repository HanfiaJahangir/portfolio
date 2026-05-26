import type { SystemCapability } from "@/types/portfolio";

export function SystemCard({ system }: { system: SystemCapability }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-signal/40 hover:bg-white/[0.07]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-ink">{system.title}</h3>
        <span className="rounded border border-reactor/40 bg-reactor/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-reactor">
          {system.category}
        </span>
      </div>
      <p className="text-sm leading-6 text-muted">{system.description}</p>
      <div className="mt-5 grid gap-2">
        {system.signals.map((signal) => (
          <div key={signal} className="flex items-center gap-2 text-sm text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {signal}
          </div>
        ))}
      </div>
    </article>
  );
}
