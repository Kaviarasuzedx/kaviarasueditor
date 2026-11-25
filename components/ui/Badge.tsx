import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "success";
  dot?: boolean;
  className?: string;
};

const tones = {
  default: "border-white/10 bg-white/[0.035] text-secondary",
  accent: "border-accent/25 bg-accent/[0.07] text-accent",
  success: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300",
};

export function Badge({ children, tone = "default", dot = false, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-2 rounded-pill border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]", tones[tone], className)}>
      {dot && <span className="relative flex h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
