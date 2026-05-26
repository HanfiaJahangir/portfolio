import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ResponsiveGridProps = {
  children: ReactNode;
  className?: string;
  columns?: "two" | "three" | "four";
};

const columnMap = {
  two: "grid-cols-1 md:grid-cols-2",
  three: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  four: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
};

export function ResponsiveGrid({ children, className, columns = "three" }: ResponsiveGridProps) {
  return <div className={cn("grid gap-4", columnMap[columns], className)}>{children}</div>;
}
