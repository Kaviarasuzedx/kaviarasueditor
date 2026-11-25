"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  showArrow?: boolean;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
};

const variants = {
  primary: "bg-accent text-[#0A0A0A] hover:bg-[#FFD15A]",
  secondary: "border border-white/20 bg-white/[0.03] text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:bg-white/[0.06] hover:text-accent",
};
const sizes = {
  sm: "min-h-10 px-4 text-xs",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-7 text-sm sm:text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
  showArrow = false,
  external = false,
  type = "button",
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const styles = cn(
    "group inline-flex select-none items-center justify-center gap-2.5 rounded-pill font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    sizes[size],
    className
  );
  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );

  const element = href && !disabled ? (
    <Link
      href={href}
      className={styles}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={styles}
      disabled={disabled || Boolean(href)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );

  return magnetic && !disabled ? <Magnetic>{element}</Magnetic> : element;
}
