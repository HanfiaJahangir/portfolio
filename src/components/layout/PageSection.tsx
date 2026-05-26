import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

type PageSectionProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  spacing?: "compact" | "default" | "loose";
};

const spacingMap = {
  compact: "py-12",
  default: "py-section",
  loose: "py-28 md:py-36"
};

export function PageSection({
  children,
  as: Component = "section",
  className,
  spacing = "default"
}: PageSectionProps) {
  return <Component className={cn(spacingMap[spacing], className)}>{children}</Component>;
}
