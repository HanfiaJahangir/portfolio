import { PageHeader } from "@/components/layout/PageHeader";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Recruiter-friendly contact paths."
        description="Direct links for roles involving Unity gameplay engineering, mobile optimization, multiplayer systems, and live game infrastructure."
      />
      <PageSection spacing="compact">
        <PageContainer size="narrow">
          <div className="grid gap-4 md:grid-cols-3">
            <a
              className="rounded-lg border border-white/10 bg-panel/80 p-5 transition hover:border-signal/40"
              href={`mailto:${profile.email}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">Email</p>
              <p className="mt-3 break-words text-sm text-ink">{profile.email}</p>
            </a>
            <a
              className="rounded-lg border border-white/10 bg-panel/80 p-5 transition hover:border-signal/40"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">LinkedIn</p>
              <p className="mt-3 text-sm text-ink">Professional profile</p>
            </a>
            <a
              className="rounded-lg border border-white/10 bg-panel/80 p-5 transition hover:border-signal/40"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">GitHub</p>
              <p className="mt-3 text-sm text-ink">Code and experiments</p>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>Send Email</Button>
            <Button href={profile.resume} variant="secondary" target="_blank" rel="noreferrer">
              Download Resume
            </Button>
          </div>
        </PageContainer>
      </PageSection>
    </>
  );
}
