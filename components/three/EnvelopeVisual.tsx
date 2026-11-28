"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./EnvelopeCanvas"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch { return false; }
}

export function EnvelopeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let visible = false;
    const update = () => {
      if (!motionAllowed.matches) {
        setEnabled(false);
        setReady(false);
        return;
      }
      // Mount on first view and keep the scene alive so scrolling away and
      // back cannot restart the envelope from a different pose.
      if (visible && supportsWebGL()) setEnabled(true);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { rootMargin: "150px" });
    observer.observe(element);
    motionAllowed.addEventListener("change", update);
    return () => { observer.disconnect(); motionAllowed.removeEventListener("change", update); };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-[min(82vw,490px)] lg:w-full" role="img" aria-label="Stylized film-industry envelope with an amber wax seal">
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,184,0,.23),rgba(255,184,0,.055)_47%,transparent_70%)] blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[14%] rounded-full border border-accent/15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[24%] rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className={`absolute inset-[5%] transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`} aria-hidden="true">
        <Image src="/contact/envelope-fallback.svg" alt="" fill sizes="(max-width: 1023px) 90vw, 460px" className="object-contain" priority />
      </div>
      {enabled && <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}><Scene onReady={() => setReady(true)} /></div>}
      <span className="absolute bottom-[3%] left-[8%] text-[10px] uppercase tracking-[.21em] text-muted" aria-hidden="true">A story starts with hello / 06</span>
    </div>
  );
}
