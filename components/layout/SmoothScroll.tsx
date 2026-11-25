"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";

/** Native browser scrolling when reduced motion is requested. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
