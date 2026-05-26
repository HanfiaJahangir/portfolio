import type { CaseStudySection } from "@/types/portfolio";

type ArchitectureCardsProps = {
  sections: CaseStudySection[];
};

export function ArchitectureCards({ sections }: ArchitectureCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {sections.map((section, index) => (
        <article
          key={section.title}
          className="rounded-lg border border-white/10 bg-panel/75 p-5 shadow-command"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-black text-ink">{section.title}</h3>
            <span className="text-xs font-bold text-muted">0{index + 1}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{section.description}</p>
          <ul className="mt-5 grid gap-2">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
