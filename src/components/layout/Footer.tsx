import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>Designed and engineered by {profile.name}.</p>
        <div className="flex gap-4">
          <a className="hover:text-signal" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-signal" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-signal" href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
