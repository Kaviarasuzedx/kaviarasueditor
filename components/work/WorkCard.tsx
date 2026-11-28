"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Film, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/data/projects";
import { isVimeoVideo } from "@/lib/video";

const shapes: Record<Project["cardShape"], string> = {
  landscape: "aspect-[16/11]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

/**
 * A full-card native button, not a nested link/button, for accessible keyboard use.
 * The MP4 is NOT requested until deliberate mouse hover + intersection.
 * Remote player failure safely preserves the local poster.
 */
export function WorkCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "100px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showPreview = visible && hovered && !reducedMotion && !previewFailed;

  useEffect(() => {
    if (!showPreview) return;
    const element = videoRef.current;
    if (!element) return;
    const attempt = element.play();
    if (attempt) attempt.catch((error: unknown) => {
      // React Strict Mode and rapid pointer exits may interrupt play() harmlessly.
      if (error instanceof DOMException && error.name === "AbortError") return;
      setPreviewFailed(true);
    });
    return () => element.pause();
  }, [showPreview]);

  return (
    <article className="group/work mb-8 inline-block w-full break-inside-avoid align-top">
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-card border border-stroke bg-[#181818] transition-colors duration-300 group-hover/work:border-white/25 ${shapes[project.cardShape]}`}
      >
        {!posterLoaded && (
          <div className="work-skeleton absolute inset-0" aria-hidden="true" />
        )}
        <Image
          src={project.poster}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          onLoad={() => setPosterLoaded(true)}
          className={`object-cover transition-[opacity,transform] duration-700 group-hover/work:scale-[1.055] ${posterLoaded ? "opacity-100" : "opacity-0"}`}
        />
        {showPreview && !isVimeoVideo(project.videoSrc) && (
          <video
            ref={videoRef}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewReady ? "opacity-100" : "opacity-0"}`}
            src={project.videoSrc}
            muted
            loop
            playsInline
            preload="none"
            autoPlay
            onCanPlay={() => setPreviewReady(true)}
            onError={() => { setPreviewFailed(true); setPreviewReady(false); }}
            aria-hidden="true"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" aria-hidden="true" />
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
          <Badge tone="accent" className="border-black/20 bg-black/70 text-[#ffcc49] backdrop-blur-sm">{project.category}</Badge>
          <Badge className="border-white/20 bg-black/60 text-white backdrop-blur-sm">{project.format}</Badge>
        </div>
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/90">
            <Film size={13} aria-hidden="true" /> 
          </span>
          <span className="text-xs font-semibold tabular-nums text-white/90">{project.duration}</span>
        </div>
        <button
          type="button"
          className="absolute inset-0 z-10 flex items-center justify-center outline-offset-[-5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          onClick={() => onOpen(project)}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          aria-label={`Open concept project ${project.title}; ${project.category}, ${project.format}`}
        >
          <span className="flex h-14 w-14 scale-90 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover/work:scale-100 group-hover/work:opacity-100 group-focus-within/work:scale-100 group-focus-within/work:opacity-100">
            <Play size={19} fill="currentColor" className="ml-1" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[.18em] text-muted">
            {project.filters.join(" / ")} <span className="text-accent">·</span> {project.resolution} target
          </p>
          <h3 className="font-display text-[clamp(1.4rem,2vw,2rem)] font-semibold leading-tight tracking-display">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-secondary">{project.description}</p>
        </div>
        <ArrowUpRight className="mt-1 shrink-0 text-muted transition-transform group-hover/work:-translate-y-1 group-hover/work:translate-x-1 group-hover/work:text-accent" size={20} aria-hidden="true" />
      </div>
    </article>
  );
}
