import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
};

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]"
};

export function PageContainer({ children, className, size = "default" }: PageContainerProps) {
  return <div className={cn("mx-auto w-full px-page", sizes[size], className)}>{children}</div>;
}
