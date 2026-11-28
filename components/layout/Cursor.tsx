"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Opt-in desktop effect. Native cursor stays available for touch/reduced motion. */
export function Cursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 360, damping: 28, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 360, damping: 28, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches && !reducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      document.documentElement.classList.remove("cursor-enabled");
      return;
    }
    document.documentElement.classList.add("cursor-enabled");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible((old) => old || true);
      setHovered(event.target instanceof Element && Boolean(event.target.closest("a, button, summary, [data-cursor='interactive']")));
    };
    // Pointer events inside an iframe do not bubble to the parent window. The
    // service artwork reports its pointer position so the site cursor keeps
    // tracking while the pointer is over those embedded animations.
    const frameMove = (event: MessageEvent) => {
      if (event.data?.type !== "portfolio-cursor" || event.source == null) return;
      const frame = Array.from(document.querySelectorAll("iframe")).find((item) => item.contentWindow === event.source);
      if (!frame) return;
      if (event.data.action === "leave") {
        setVisible(false);
        return;
      }
      const bounds = frame.getBoundingClientRect();
      const frameX = Number(event.data.x);
      const frameY = Number(event.data.y);
      if (!Number.isFinite(frameX) || !Number.isFinite(frameY)) return;
      x.set(bounds.left + frameX * bounds.width);
      y.set(bounds.top + frameY * bounds.height);
      setVisible(true);
      setHovered(Boolean(event.data.hovered));
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("message", frameMove);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("message", frameMove);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="cursor-overlay pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-accent/80 bg-accent/[0.06]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovered ? 1.65 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
        style={{ x, y }}
        animate={{ scale: hovered ? 0.5 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
