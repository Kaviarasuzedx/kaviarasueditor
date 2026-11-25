"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, PlayCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { VideoFrame } from "@/components/ui/VideoFrame";
import type { Project } from "@/data/projects";
import { getVimeoPlayerUrl, isVimeoVideo } from "@/lib/video";

/** Accessible native dialog with player that unmounts upon close. */
export function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [videoError, setVideoError] = useState(false);
  const [buffering, setBuffering] = useState(false);
  useEffect(() => { setVideoError(false); setBuffering(false); }, [project?.slug]);

  return (
    <Modal
      open={Boolean(project)}
      title={project?.title ?? "Project details"}
      onClose={onClose}
      className="w-[min(94vw,1000px)]"
    >
      {project && (
        <div className="space-y-8">
          {isVimeoVideo(project.videoSrc) ? (
            <VideoFrame format={project.format} className="border border-stroke">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={getVimeoPlayerUrl(project.videoSrc, { controls: true, title: false, byline: false, portrait: false })}
                title={`${project.title} video`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </VideoFrame>
          ) : !videoError ? (
            <VideoFrame format={project.format} className="border border-stroke">
              <video
                key={project.slug}
                className="absolute inset-0 h-full w-full bg-black object-contain"
                controls
                playsInline
                preload="none"
                poster={project.poster}
                onWaiting={() => setBuffering(true)}
                onPlaying={() => setBuffering(false)}
                onError={() => { setVideoError(true); setBuffering(false); }}
                aria-label={`${project.title} example stock-video preview`}
              >
                <source src={project.videoSrc} type="video/mp4" />
                Video playback is not available in this browser.
              </video>
              {buffering && (
                <p role="status" className="absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1.5 text-xs text-white">Loading preview…</p>
              )}
            </VideoFrame>
          ) : (
            <VideoFrame format={project.format} className="flex flex-col items-center justify-center gap-4 border border-stroke p-8 text-center text-secondary">
              <PlayCircle size={36} className="text-accent" aria-hidden="true" />
              <p className="max-w-sm text-sm leading-6">The external video preview could not load. The concept details remain available below.</p>
              <a href={project.sourcePage} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent underline underline-offset-4">Open the stock-video listing ↗</a>
            </VideoFrame>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">client work</Badge>
            <Badge>{project.category}</Badge>
            <Badge>{project.format} intended</Badge>
            <Badge>{project.resolution} target</Badge>
            <Badge>{project.duration} indicative edit</Badge>
          </div>

          <p className="max-w-3xl text-base leading-8 text-secondary">{project.description}</p>

          <div className="grid gap-x-10 gap-y-8 border-y border-stroke py-8 md:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3">The fictional brief</h3>
              <p className="text-sm leading-7 text-secondary">{project.brief}</p>
            </div>
            <div>
              <h3 className="eyebrow mb-3">Proposed creative approach</h3>
              <p className="text-sm leading-7 text-secondary">{project.approach}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <section aria-label="Concept credits">
              <h3 className="mb-4 text-lg font-semibold">Credits &amp; tools</h3>
              <dl className="space-y-3 text-sm">
                {project.credits.map(({ role, name }) => (
                  <div key={role} className="flex flex-wrap justify-between gap-x-5 border-b border-stroke pb-3">
                    <dt className="text-muted">{role}</dt>
                    <dd className="text-right text-secondary">{name}</dd>
                  </div>
                ))}
                <div className="flex flex-wrap justify-between gap-x-5 border-b border-stroke pb-3">
                  <dt className="text-muted">Proposed tools</dt>
                  <dd className="text-right text-secondary">{project.tools.join(" / ")}</dd>
                </div>
              </dl>
            </section>
            <section aria-label="Planned concept deliverables">
              <h3 className="mb-4 text-lg font-semibold">Proposed deliverables</h3>
              <ul className="space-y-3 text-sm text-secondary">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex gap-3"><span className="mt-0.5 text-accent" aria-hidden="true">↗</span>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-stroke pt-6">
            <a href={project.sourcePage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary underline decoration-white/30 underline-offset-4 hover:text-accent">
              Video source <ExternalLink size={15} aria-hidden="true" />
            </a>
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffd15a]">
              Discuss a similar project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="text-xs leading-5 text-muted">Portfolio layout example only. Titles, briefs, suggested edits, credits, durations, and output targets are fictional. The linked third-party video is unedited stock footage and not proof of Kaviarasu&apos;s work.</p>
        </div>
      )}
    </Modal>
  );
}
