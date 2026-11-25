import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  interactive?: boolean;
  glow?: boolean;
};

export function Card({ children, className, interactive = false, glow = false, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-card border border-stroke bg-surface p-6 sm:p-8",
        interactive && "transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40",
        glow && "hover:shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}
