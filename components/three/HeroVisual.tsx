"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ClapperboardFallback } from "./ClapperboardFallback";

const Scene = dynamic(() => import("./ClapperboardCanvas"), { ssr: false });

function canRenderWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (context) context.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

/** Defer loading the Three.js bundle until visible on WebGL-capable devices. */
export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [render3D, setRender3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const screen = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const stage = stageRef.current;
    if (!stage) return;
    let visible = false;
    let observer: IntersectionObserver | null = null;

    const update = () => {
      if (!screen.matches || !visible) {
        setRender3D(false);
        setReady(false);
        return;
      }
      if (canRenderWebGL()) setRender3D(true);
    };
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: "180px" });
    observer.observe(stage);
    screen.addEventListener("change", update);
    return () => {
      observer?.disconnect();
      screen.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto aspect-square w-[min(82vw,540px)] lg:w-full lg:max-w-[660px]" aria-label="Film clapperboard artwork">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.24),rgba(255,184,0,0.05)_45%,transparent_71%)] blur-2xl" />
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-accent/15 shadow-[0_0_100px_rgba(255,184,0,0.06)]" />
      <div aria-hidden="true" className="absolute inset-[21%] rounded-full border border-dashed border-white/10" />
      <div className={`absolute inset-[3%] transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <ClapperboardFallback />
      </div>
      {render3D && <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} aria-hidden="true"><Scene onReady={() => setReady(true)} /></div>}
      <span aria-hidden="true" className="absolute bottom-[4%] left-[10%] text-[10px] uppercase tracking-[0.27em] text-muted">01 — Direction / Story / Impact</span>
    </div>
  );
}
