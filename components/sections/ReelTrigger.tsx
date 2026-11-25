"use client";

import { useState, type ReactNode } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { demoShowreel } from "@/data/projects";
import { getVimeoPlayerUrl, isVimeoVideo } from "@/lib/video";

export function ReelTrigger({ children, variant = "overlay" }: { children?: ReactNode; variant?: "overlay" | "hero" }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <>
      <button
        type="button"
        className={variant === "hero" ? "group inline-flex min-h-14 items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent" : "group flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-md transition hover:scale-110 hover:border-accent hover:bg-accent hover:text-black sm:h-24 sm:w-24"}
        onClick={() => { setFailed(false); setOpen(true); }}
        aria-label={variant === "hero" ? "Watch showreel demo" : "Play demo showreel"}
      >{children || <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />}</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Showreel / footage demo">
        <div className="space-y-4">
          {open && !failed && (isVimeoVideo(demoShowreel.videoSrc) ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={getVimeoPlayerUrl(demoShowreel.videoSrc, { controls: true, title: false, byline: false, portrait: false })}
                title={demoShowreel.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video className="aspect-video w-full rounded-xl bg-black object-cover" controls playsInline preload="none" poster={demoShowreel.poster} onError={() => setFailed(true)}>
              <source src={demoShowreel.videoSrc} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          ))}
          {failed && <div className="flex aspect-video items-center justify-center rounded-xl border border-stroke bg-black p-6 text-center text-sm text-secondary">Sorry, this video preview is currently unavailable. Please try again later.</div>}
          <p className="text-sm leading-6 text-secondary">A collection of my creative work, showcasing my video editing skills, visual storytelling, and passion for bringing ideas to life.</p>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4" href={demoShowreel.sourcePage} target="_blank" rel="noopener noreferrer">Watch video <ExternalLink size={14} aria-hidden="true" /></a>
          </div>
      </Modal>
    </>
  );
}
