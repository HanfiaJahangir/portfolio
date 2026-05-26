import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-signal/70 bg-signal text-void shadow-glow hover:border-signal hover:bg-[#7fffe0]",
  secondary: "border-white/15 bg-white/[0.07] text-ink hover:border-signal/50 hover:bg-white/[0.1]",
  ghost: "border-transparent bg-transparent text-muted hover:border-white/10 hover:text-ink"
};

export function Button({ href, children, variant = "primary", className, ...props }: ButtonProps) {
  const sharedClassName = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-signal/60",
    variants[variant],
    className
  );

  if (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a className={sharedClassName} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={sharedClassName} href={href} {...props}>
      {children}
    </Link>
  );
}
