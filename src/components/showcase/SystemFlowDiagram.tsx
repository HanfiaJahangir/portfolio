import type { FlowDiagram } from "@/types/portfolio";

type SystemFlowDiagramProps = {
  diagram: FlowDiagram;
};

export function SystemFlowDiagram({ diagram }: SystemFlowDiagramProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-command">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-black text-ink">{diagram.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{diagram.description}</p>
        </div>
        <span className="rounded border border-signal/20 bg-signal/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-signal">
          Flow
        </span>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {diagram.nodes.map((node) => (
            <div key={node.id} className="rounded-md border border-white/10 bg-void/50 p-3">
              <p className="text-sm font-bold text-ink">{node.label}</p>
              {node.description ? (
                <p className="mt-2 text-xs leading-5 text-muted">{node.description}</p>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid content-start gap-2">
          {diagram.edges.map((edge) => {
            const from = diagram.nodes.find((node) => node.id === edge.from)?.label ?? edge.from;
            const to = diagram.nodes.find((node) => node.id === edge.to)?.label ?? edge.to;

            return (
              <div
                key={`${edge.from}-${edge.to}-${edge.label ?? ""}`}
                className="rounded-md border border-white/10 bg-panel/70 px-3 py-2 text-sm text-muted"
              >
                <span className="font-semibold text-ink">{from}</span>
                <span className="px-2 text-signal">-&gt;</span>
                <span className="font-semibold text-ink">{to}</span>
                {edge.label ? (
                  <span className="ml-2 text-xs text-muted">({edge.label})</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
