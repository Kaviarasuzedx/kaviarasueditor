"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Decorative reading progress. Never intercepts mouse or keyboard input. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.22 });

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
