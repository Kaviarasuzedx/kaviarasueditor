"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { featuredProjects, type Project } from "@/data/projects";
import { getVimeoPlayerUrl, isVimeoVideo } from "@/lib/video";
import { Reveal } from "./Reveal";

function PreviewCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = anchor.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0]?.isIntersecting ?? false);
    }, { rootMargin: "80px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playPreview = hover && isVisible && !reduce && !failed;
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playPreview) return;
    video.play().catch(() => { /* autoplay permissions vary: image remains visible */ });
    return () => video.pause();
  }, [playPreview]);

  return (
    <article className="group relative" onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(true); }} onPointerLeave={() => setHover(false)}>
      <div ref={anchor} className="relative aspect-[4/3] overflow-hidden rounded-card border border-stroke bg-surface">
        <Image src={project.poster} alt={`Concept artwork: ${project.title}`} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 42px), (max-width: 1439px) 25vw, 318px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        {playPreview && !isVimeoVideo(project.videoSrc) && <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          src={project.videoSrc} autoPlay loop muted playsInline preload="none"
          onLoadedData={() => setReady(true)} onError={() => { setFailed(true); setReady(false); }}
          aria-hidden="true"
        />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />
        <div className="pointer-events-none absolute left-5 top-5 flex gap-2"><Badge>{project.category}</Badge><Badge>{project.format}</Badge></div>
        <div className="pointer-events-none absolute bottom-5 left-5 text-xs font-medium uppercase tracking-[0.15em] text-white/80">{project.duration} / Demo concept</div>
        <button type="button" onClick={() => onOpen(project)} className="absolute inset-0 flex items-center justify-center text-white focus-visible:outline-offset-[-5px] focus-visible:outline-accent" aria-label={`View ${project.title} preview details`}>
          <span className="flex h-14 w-14 scale-90 items-center justify-center rounded-full border border-white/50 bg-black/30 opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"><Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" /></span>
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div><p className="mb-1 text-[11px] uppercase tracking-[0.17em] text-muted">{project.category} / {project.year}</p><h3 className="font-display text-xl font-semibold tracking-display">{project.title}</h3></div>
        <button type="button" onClick={() => onOpen(project)} className="mt-1 shrink-0 rounded-full border border-stroke p-3 text-secondary transition hover:border-accent hover:text-accent" aria-label={`Open ${project.title} concept`}><ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="py-10 sm:py-12" aria-labelledby="featured-heading" id="featured-work">
      <div className="site-container">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-3">003 / Selected frames</p>
            <h2 id="featured-heading" className="section-title text-3xl sm:text-4xl md:text-5xl">Crafted to <span className="text-secondary">stand out.</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-secondary">A curated selection of visual directions. The pieces below are illustrative concepts until Kaviarasu&apos;s finished client work is uploaded.</p>
          </div>
          <Link href="/work" className="flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold transition hover:border-accent hover:text-accent">See all work <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </Reveal>
        <div className="grid items-start gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} className="min-w-0" delay={i * 0.07}>
              <PreviewCard project={project} onOpen={(p) => { setVideoFailed(false); setSelected(p); }} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><Link href="/work" className="group inline-flex items-center gap-5 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold transition hover:border-accent hover:text-accent">Explore the full portfolio <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div>
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected ? selected.title : "Project preview"}>
        {selected && <div className="space-y-5">
          {isVimeoVideo(selected.videoSrc) ? <VideoFrame format={selected.format}><iframe className="absolute inset-0 h-full w-full" src={getVimeoPlayerUrl(selected.videoSrc, { controls: true, title: false, byline: false, portrait: false })} title={`${selected.title} video`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></VideoFrame> : !videoFailed ? <VideoFrame format={selected.format}><video controls playsInline preload="none" poster={selected.poster} className="absolute inset-0 h-full w-full object-contain" onError={() => setVideoFailed(true)}><source src={selected.videoSrc} type="video/mp4" />Video is unavailable in your browser.</video></VideoFrame> : <VideoFrame format={selected.format} className="flex items-center justify-center border border-stroke p-6 text-center text-secondary">External stock preview could not load. View the source clip below.</VideoFrame>}
          <p className="text-sm leading-7 text-secondary">{selected.description}</p>
          <div className="flex flex-wrap gap-2"><Badge>{selected.category}</Badge><Badge>{selected.format}</Badge><Badge>client work</Badge></div>
          <p className="text-sm text-secondary"><strong className="text-foreground">Suggested edit tools:</strong> {selected.tools.join(" + ")}</p>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4" href={selected.sourcePage} target="_blank" rel="noopener noreferrer">Video source <ExternalLink size={15} aria-hidden="true" /></a>
        </div>}
      </Modal>
    </section>
  );
}
