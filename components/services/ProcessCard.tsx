"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./ProcessCard.module.css";

export function ProcessCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(styles.card, className)}
    >
      <span className={styles.light} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
