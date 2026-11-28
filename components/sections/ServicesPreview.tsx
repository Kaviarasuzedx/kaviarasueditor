"use client";

import { ArrowUpRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { homeServices, type ServicePreview } from "@/data/services";
import styles from "./ServicesPreview.module.css";

const sceneDuration = 4500;
const total = String(homeServices.length).padStart(2, "0");
const reelFrames = ["reel-dancer.webp", "reel-coastal-cyclist.webp", "reel-coffee-pour.webp"];
const scenePhotos = {
  zap: "advertising-sneaker.webp",
  clapper: "commercial-runner.webp",
  film: "filmmaking-coastal-road.webp",
} as const;
const labels = {
  zap: { title: "Advertising", short: "Advertising" },
  clapper: { title: "Commercial", short: "Commercial" },
  smartphone: { title: "Social media", short: "Social media" },
  film: { title: "Filmmaking", short: "Films" },
} satisfies Record<ServicePreview["icon"], { title: string; short: string }>;

function SceneArtwork({ kind }: { kind: ServicePreview["icon"] }) {
  return (
    <div className={styles.art} data-art={kind} aria-hidden="true">
      {kind === "smartphone" ? (
        <div className={styles.object}>
          <div className={styles.phone}>
            <div className={styles.feed}>
              {reelFrames.map((frame) => <div key={frame}><Image src={`/home/${frame}`} alt="" fill unoptimized /></div>)}
            </div>
            <span className={styles.phoneUI}>♡<br />◯<br />↗</span>
          </div>
        </div>
      ) : (
        <div className={styles.photo}>
          <Image src={`/home/${scenePhotos[kind]}`} alt="" fill unoptimized />
        </div>
      )}
    </div>
  );
}

function aimScene(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = event.currentTarget;
  const bounds = canvas.getBoundingClientRect();
  canvas.style.setProperty("--split-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 28}px`);
  canvas.style.setProperty("--split-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 20}px`);
}

function resetScene(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--split-x");
  event.currentTarget.style.removeProperty("--split-y");
}

export function ServicesPreview() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const playback = useRef<{ select: (index: number) => void; toggle: () => void }>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const root = section.current;
    const scene = canvas.current;
    if (!root || !scene) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let lastTime: number | null = null;
    let frame = 0;
    let current = 0;
    let visible = false;
    let userPaused = false;

    const update = (index: number) => {
      if (current !== index) {
        current = index;
        setActive(index);
      }
      root.style.setProperty("--split-progress", String((elapsed % sceneDuration) / sceneDuration));
    };

    const advance = (now: number) => {
      if (lastTime !== null) elapsed = (elapsed + Math.min(now - lastTime, 100)) % (sceneDuration * homeServices.length);
      lastTime = now;
      update(Math.floor(elapsed / sceneDuration));
      frame = requestAnimationFrame(advance);
    };

    const syncPlayback = () => {
      const running = visible && !userPaused && !document.hidden && !reduced.matches;
      root.toggleAttribute("data-split-running", running);
      if (running && !frame) frame = requestAnimationFrame(advance);
      if (!running) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = null;
      }
    };

    playback.current = {
      select(index) {
        elapsed = index * sceneDuration;
        lastTime = null;
        update(index);
      },
      toggle() {
        userPaused = !userPaused;
        setPaused(userPaused);
        syncPlayback();
      },
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.12;
      if (visible) root.dataset.splitSeen = "true";
      syncPlayback();
    }, { threshold: 0.12 });
    observer.observe(scene);
    root.dataset.splitReady = "true";
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", syncPlayback);
      cancelAnimationFrame(frame);
      playback.current = null;
      delete root.dataset.splitReady;
      delete root.dataset.splitRunning;
      delete root.dataset.splitSeen;
      root.style.removeProperty("--split-progress");
    };
  }, []);

  return (
    <section ref={section} className={styles.section} id="services-preview" aria-labelledby="services-heading">
      <div className="site-container">
        <header className={styles.header}>
          <h2 id="services-heading" className="eyebrow">002 / What I do</h2>
          <div className={styles.playback}>
            <span aria-hidden="true">{homeServices[active].number} — {total}</span>
            <button type="button" onClick={() => playback.current?.toggle()} aria-label={paused ? "Play services preview" : "Pause services preview"}>
              {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            </button>
          </div>
        </header>
        <div ref={canvas} className={styles.canvas} onPointerMove={aimScene} onPointerLeave={resetScene} onPointerCancel={resetScene}>
          {homeServices.map((service, index) => {
            const lineBreak = service.title.lastIndexOf(" ");
            return (
              <article key={service.number} className={styles.scene} data-scene={service.icon} data-split-active={index === active ? "true" : undefined} aria-labelledby={`preview-scene-${service.number}`}>
                <SceneArtwork kind={service.icon} />
                <div className={styles.copy}>
                  <p className={styles.kicker}>{service.number} / {labels[service.icon].title}</p>
                  <h3 id={`preview-scene-${service.number}`} className="font-display">{service.title.slice(0, lineBreak)}<br /><span>{service.title.slice(lineBreak + 1)}</span></h3>
                  <p className={styles.caption}>{service.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className={styles.selector} role="group" aria-label="Select a creative service">
          {homeServices.map((service, index) => (
            <button type="button" key={service.number} aria-current={active === index ? "true" : undefined} onClick={() => playback.current?.select(index)}>
              <span aria-hidden="true">{service.number}</span>
              <span className={styles.bar} aria-hidden="true"><i /></span>
              <span>{labels[service.icon].short}</span>
            </button>
          ))}
        </div>
        <footer className={styles.footer}>
          <span>Every frame has a purpose.</span>
          <Link href="/services">All services <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}
