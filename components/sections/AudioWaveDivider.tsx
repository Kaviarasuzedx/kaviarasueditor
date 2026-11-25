"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const bars = [12,22,18,38,25,55,74,43,35,60,94,68,44,35,67,100,55,32,42,77,53,28,40,20,32,13,24,16];
/** Lightweight 2.5D alternative to a second expensive WebGL canvas. */
export function AudioWaveDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = useTransform(scrollYProgress, [0, 0.5, 1], [18, -15, 16]);
  return (
    <div ref={ref} className="relative overflow-hidden border-b border-stroke bg-[#0d0d0d] py-12 sm:py-16" aria-label="Decorative audio waveform">
      <div className="site-container flex items-center justify-center gap-1.5 sm:gap-3" aria-hidden="true">
        {bars.map((height, i) => <motion.span key={i} className="block w-[6px] max-w-[13px] flex-1 rounded-sm bg-gradient-to-b from-[#ffca4a] to-[#77531c] shadow-[2px_2px_0_rgba(255,184,0,.1)]" style={{ height: `${Math.max(height * 0.65, 8)}px`, y: reduce ? 0 : travel, opacity: Math.min(1, 0.35 + height/120) }} />)}
      </div>
      <p className="mt-9 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">Sound makes the story breathe</p>
    </div>
  );
}
