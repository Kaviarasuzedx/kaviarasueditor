"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Progressive-enhancement hover effect, only for fine pointers and non-reduced motion. */
export function Magnetic({ children, strength = 0.22, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  function handleMove(event: MouseEvent<HTMLSpanElement>) {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={className ?? "inline-flex"}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );
}
