"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation, utilityNavigation } from "@/config/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

export function CommandNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void/78 px-4 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-signal/40 bg-signal/10 text-sm font-black text-signal">
            HJ
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold text-ink">{profile.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">
              Gameplay Engineer
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 md:flex">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium text-muted transition",
                  isActive && "bg-white/10 text-ink",
                  !isActive && "hover:bg-white/[0.06] hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {utilityNavigation.map((item) => (
            <Button
              key={item.href}
              href={item.href}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </Button>
          ))}
          <Button href="/contact">Contact</Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-ink md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="text-lg">{isOpen ? "X" : "="}</span>
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-auto max-w-7xl border-t border-white/10 py-4 md:hidden">
          <div className="grid gap-2">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-muted",
                  pathname === item.href && "border-signal/40 bg-signal/10 text-signal"
                )}
              >
                {item.label}
              </Link>
            ))}
            {utilityNavigation.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
