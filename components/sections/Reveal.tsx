"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

export function WordReveal({ text, className = "", as = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const reduce = useReducedMotion();
  const Heading = as;
  return (
    <Heading className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-[.19em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            whileInView={reduce ? undefined : { y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.2, 1, 0.3, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </Heading>
  );
}
