"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Grid3X3, Layers3 } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { creativeTools } from "@/data/about";
import styles from "./CreativeToolkit.module.css";

const lastCard = creativeTools.length - 1;
const sequenceEnd = 0.82;
const limit = gsap.utils.clamp(0, 1);
const limitCard = gsap.utils.clamp(0, lastCard);
const mix = gsap.utils.interpolate;
const digits = (value: number) => String(value).padStart(2, "0");

type TunnelControls = { select: (index: number) => void; step: (direction: number) => void; toggleGrid: () => void };

export function CreativeToolkit() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const controls = useRef<TunnelControls>(null);
  const [view, setView] = useState({ index: 0, grid: false });

  useLayoutEffect(() => {
    const root = section.current;
    const scene = stage.current;
    if (!root || !scene) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);

    media.add("(prefers-reduced-motion: no-preference) and (min-height: 33rem)", () => {
      const sticky = root.querySelector<HTMLElement>("[data-tunnel-sticky]")!;
      const spacer = root.querySelector<HTMLElement>("[data-tunnel-spacer]")!;
      const world = scene.querySelector<HTMLElement>("[data-tunnel-world]")!;
      const ambient = scene.querySelector<HTMLElement>("[data-tunnel-ambient]")!;
      const floor = scene.querySelector<HTMLElement>("[data-tunnel-floor]")!;
      const meter = root.querySelector<HTMLElement>("[data-tunnel-meter]")!;
      const cards = Array.from(world.querySelectorAll<HTMLElement>("[data-tunnel-card]"));
      const buttons = cards.map(card => card.querySelector<HTMLButtonElement>("button")!);
      const scroll = { progress: 0 };
      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      let manual: { position: number; grid: number } | null = null;
      let position = 0;
      let grid = 0;
      let size = { width: 0, height: 0 };
      let frame = 0;
      let lastTime = 0;
      let lastIndex = -1;
      let wasGrid = false;
      let actualScroll = 0;
      let suppressClickUntil = 0;
      let drag: { id: number; x: number; y: number; position: number; moved: boolean } | null = null;

      root.dataset.toolkitTunnel = "true";

      const target = () => manual ?? {
        position: limit(scroll.progress / sequenceEnd) * lastCard,
        grid: limit((scroll.progress - sequenceEnd) / (1 - sequenceEnd)),
      };

      const measure = () => { size = { width: scene.clientWidth, height: scene.clientHeight }; };

      const render = () => {
        const { width, height } = size;
        const spacing = Math.min(205, width * 0.29);
        const gap = width < 520 ? 6 : 10;
        const cardWidth = Math.min(width * 0.68, width < 550 ? 200 : 240);
        const cardHeight = Math.min(height * 0.62, width < 550 ? 140 : 165);
        const gridWidth = Math.min(cardWidth, (width - gap * 2 - 4) / 3);
        const gridHeight = Math.min(cardHeight, (height - gap * 2 - 33) / 3);
        const gridMix = grid * grid * (3 - 2 * grid);
        const active = Math.round(position);
        const showGrid = gridMix > 0.5;

        if (active !== lastIndex || showGrid !== wasGrid) {
          lastIndex = active;
          wasGrid = showGrid;
          setView({ index: active, grid: showGrid });
        }

        scene.dataset.tunnelView = showGrid ? "grid" : "tunnel";
        scene.style.setProperty("--tunnel-grid", gridMix.toFixed(3));
        scene.style.setProperty("--light-x", `${50 + pointer.x * 100}%`);
        scene.style.setProperty("--light-y", `${45 + pointer.y * 85}%`);
        world.style.transform = `rotateX(${-pointer.y * 8 * (1 - gridMix)}deg) rotateY(${pointer.x * 12 * (1 - gridMix)}deg)`;
        ambient.style.transform = `translate3d(${pointer.x * 25}px, ${pointer.y * 15}px, 0)`;
        floor.style.opacity = String(1 - gridMix);
        meter.style.transform = `scaleX(${position / lastCard})`;

        cards.forEach((card, index) => {
          const offset = index - position;
          const distance = Math.abs(offset);
          const gridX = (index % 3 - 1) * (gridWidth + gap);
          const gridY = (Math.floor(index / 3) - 1) * (gridHeight + gap) - 5;
          const x = mix(offset * spacing, gridX, gridMix);
          const y = mix(distance * 13, gridY, gridMix);
          const z = mix(65 - distance * 135, 0, gridMix);
          const rotation = mix(gsap.utils.clamp(-65, 65, -offset * 25), 0, gridMix);
          const opacity = mix(limit(1 - distance * 0.22), 1, gridMix);
          card.style.width = `${mix(cardWidth, gridWidth, gridMix)}px`;
          card.style.height = `${mix(cardHeight, gridHeight, gridMix)}px`;
          card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotation}deg)`;
          card.style.setProperty("--card-opacity", opacity.toFixed(3));
          const blur = Math.min(2, Math.max(0, distance - 1) * 0.55) * (1 - gridMix);
          card.style.setProperty("--card-filter", blur > 0.1 ? `blur(${blur}px)` : "none");
          card.toggleAttribute("data-tunnel-active", index === active && !showGrid);

          const selectable = showGrid || distance < 1.85;
          buttons[index].tabIndex = selectable ? 0 : -1;
          buttons[index].toggleAttribute("data-tunnel-selectable", selectable);
          if (index === active && !showGrid) buttons[index].setAttribute("aria-current", "true");
          else buttons[index].removeAttribute("aria-current");
        });
      };

      function schedule() {
        if (frame) return;
        frame = requestAnimationFrame((time) => {
          frame = 0;
          const delta = Math.min(40, lastTime ? time - lastTime : 16);
          const amount = 1 - Math.exp(-delta / 92);
          const next = target();
          position = mix(position, next.position, amount);
          grid = mix(grid, next.grid, amount * 0.78);
          pointer.x = mix(pointer.x, pointer.targetX, amount * 0.76);
          pointer.y = mix(pointer.y, pointer.targetY, amount * 0.76);
          const remaining = Math.abs(position - next.position) + Math.abs(grid - next.grid)
            + Math.abs(pointer.x - pointer.targetX) + Math.abs(pointer.y - pointer.targetY);
          if (remaining < 0.002) {
            position = next.position;
            grid = next.grid;
            pointer.x = pointer.targetX;
            pointer.y = pointer.targetY;
            lastTime = 0;
          } else {
            lastTime = time;
            schedule();
          }
          render();
        });
      }

      const select = (index: number) => {
        manual = { position: limitCard(index), grid: 0 };
        schedule();
      };
      controls.current = {
        select(index) { if (performance.now() >= suppressClickUntil) select(index); },
        step(direction) { select(Math.round(target().position) + direction); },
        toggleGrid() {
          const current = target();
          manual = { position: Math.round(current.position), grid: current.grid >= 0.5 ? 0 : 1 };
          schedule();
        },
      };

      measure();
      const timeline = gsap.to(scroll, { progress: 1, ease: "none", paused: true, onUpdate: schedule });
      ScrollTrigger.create({
        trigger: root,
        start: () => `top ${getComputedStyle(sticky).top}`,
        end: () => `+=${spacer.offsetHeight}`,
        animation: timeline,
        scrub: 0.42,
        onUpdate(self) {
          if (!drag?.moved && Math.abs(self.progress - actualScroll) > 0.0001) manual = null;
          actualScroll = self.progress;
          schedule();
        },
      });

      const resize = new ResizeObserver(() => { measure(); schedule(); });
      resize.observe(scene);
      position = target().position;
      grid = target().grid;
      render();

      const keydown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        controls.current?.step(event.key === "ArrowRight" ? 1 : -1);
      };
      const down = (event: PointerEvent) => {
        if (!event.isPrimary || event.button !== 0 || grid > 0.5) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, position, moved: false };
      };
      const move = (event: PointerEvent) => {
        if (drag?.id === event.pointerId) {
          const dx = event.clientX - drag.x;
          const dy = event.clientY - drag.y;
          if (!drag.moved && Math.max(Math.abs(dx), Math.abs(dy)) > 7) {
            if (Math.abs(dx) <= Math.abs(dy)) { drag = null; return; }
            drag.moved = true;
            scene.setPointerCapture(event.pointerId);
            scene.dataset.tunnelDragging = "true";
          }
          if (drag.moved) {
            manual = { position: limitCard(drag.position - dx / Math.max(80, size.width * 0.23)), grid: 0 };
            schedule();
            return;
          }
        }
        if (event.pointerType === "mouse") {
          const bounds = scene.getBoundingClientRect();
          pointer.targetX = limit((event.clientX - bounds.left) / bounds.width) - 0.5;
          pointer.targetY = limit((event.clientY - bounds.top) / bounds.height) - 0.5;
          schedule();
        }
      };
      const endDrag = (event: PointerEvent) => {
        if (drag?.id !== event.pointerId) return;
        if (drag.moved) {
          suppressClickUntil = performance.now() + 220;
          select(Math.round(target().position));
        }
        drag = null;
        delete scene.dataset.tunnelDragging;
      };
      const lostCapture = (event: PointerEvent) => { if (event.target === scene) endDrag(event); };
      const leave = () => { pointer.targetX = pointer.targetY = 0; schedule(); };

      scene.tabIndex = 0;
      scene.addEventListener("keydown", keydown);
      scene.addEventListener("pointerdown", down);
      scene.addEventListener("pointermove", move);
      scene.addEventListener("pointerleave", leave);
      scene.addEventListener("lostpointercapture", lostCapture);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);

      return () => {
        scene.removeEventListener("keydown", keydown);
        scene.removeEventListener("pointerdown", down);
        scene.removeEventListener("pointermove", move);
        scene.removeEventListener("pointerleave", leave);
        scene.removeEventListener("lostpointercapture", lostCapture);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
        cancelAnimationFrame(frame);
        resize.disconnect();
        controls.current = null;
        delete root.dataset.toolkitTunnel;
        delete scene.dataset.tunnelView;
        delete scene.dataset.tunnelDragging;
        scene.removeAttribute("tabindex");
        [scene, world, ambient, floor, meter, ...cards].forEach(node => node.removeAttribute("style"));
        cards.forEach(card => card.removeAttribute("data-tunnel-active"));
        buttons.forEach(button => {
          button.tabIndex = -1;
          button.removeAttribute("aria-current");
          button.removeAttribute("data-tunnel-selectable");
        });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={section} className={styles.section} aria-labelledby="tools-title">
      <div className={`site-container ${styles.sticky}`} data-tunnel-sticky>
        <header className={styles.copy}>
          <p className="eyebrow">The toolkit / 02</p>
          <h2 id="tools-title" className="font-display">The tools<br />behind <span>the edit.</span></h2>
          <p className={styles.description}>I cut in Premiere Pro and build motion in After Effects. These are the tools I use across editing, design, finishing and AI-assisted production.</p>
          <div className={styles.hud}>
            <div className={styles.controls} role="group" aria-label="Toolkit navigation">
              <button type="button" aria-label="Previous software" onClick={() => controls.current?.step(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
              <button type="button" aria-label="Next software" onClick={() => controls.current?.step(1)}><ArrowRight size={16} aria-hidden="true" /></button>
              <button type="button" aria-controls="toolkit-software" onClick={() => controls.current?.toggleGrid()}>
                {view.grid ? <><Layers3 size={15} aria-hidden="true" /> View tunnel</> : <><Grid3X3 size={15} aria-hidden="true" /> View grid</>}
              </button>
            </div>
            <p className={styles.count} data-tunnel-count aria-label={`Software ${view.index + 1} of ${creativeTools.length}`}>{digits(view.index + 1)} / {digits(creativeTools.length)}</p>
            <div className={styles.meter} aria-hidden="true"><i data-tunnel-meter /></div>
            <p className={styles.mode}>Scroll to explore <span aria-hidden="true">·</span> Drag to rotate</p>
          </div>
        </header>
        <div ref={stage} className={styles.stage} role="region" aria-label="Software gallery. Use left and right arrow keys to navigate.">
          <div className={styles.ambient} aria-hidden="true" data-tunnel-ambient />
          <div className={styles.floor} aria-hidden="true" data-tunnel-floor />
          <ul id="toolkit-software" role="list" aria-label="Creative software" className={styles.world} data-tunnel-world>
            {creativeTools.map((tool, index) => (
              <li key={tool.label} className={styles.item} data-tunnel-card>
                <article className={styles.card}>
                  <span className={styles.number} aria-hidden="true">{digits(index + 1)}</span>
                  <div className={styles.logo} aria-hidden="true"><Image src={`/toolkit/${tool.logo}`} alt="" width={48} height={48} draggable={false} loading="eager" unoptimized /></div>
                  <h3>{tool.label}</h3>
                  <p>{tool.caption}</p>
                  <button type="button" className={styles.select} aria-label={`View ${tool.label}`} tabIndex={-1} onClick={() => controls.current?.select(index)} />
                </article>
              </li>
            ))}
          </ul>
          <p className={styles.hint}>{view.grid ? "All nine creative tools" : creativeTools[view.index].label}</p>
        </div>
      </div>
      <div className={styles.spacer} aria-hidden="true" data-tunnel-spacer />
    </section>
  );
}
