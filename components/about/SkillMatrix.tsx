"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { creativeSkills, type SkillIcon } from "@/data/about";
import { Reveal } from "@/components/sections/Reveal";
import styles from "./SkillMatrix.module.css";

const swatches = ["#394c50", "#8c9b8c", "#d9c6a1", "#b68953", "#745037"];

function SkillArt({ type }: { type: SkillIcon }) {
  switch (type) {
    case "cut":
      return (
        <div className={styles.timeline}>
          <div className={styles.playhead} />
          {Array.from({ length: 6 }, (_, track) => (
            <div className={styles.track} key={track}>
              {Array.from({ length: 4 }, (_, clip) => (
                <i key={clip} style={{ width: `${10 + ((track * 13 + clip * 17) % 24)}%` }} />
              ))}
            </div>
          ))}
        </div>
      );
    case "palette":
      return <div className={styles.colors}>{swatches.map(color => <i key={color} style={{ backgroundColor: color }} />)}</div>;
    case "audio":
      return (
        <div className={styles.wave}>
          {Array.from({ length: 41 }, (_, bar) => (
            <i key={bar} style={{ height: 8 + Math.abs(Math.sin(bar * 1.7) * Math.cos(bar * 0.18)) * 105, animationDelay: `${(bar % 9) * 80}ms` }} />
          ))}
        </div>
      );
    case "motion":
      return <><i className={styles.shape} /><i className={styles.shape} /><i className={styles.shape} /></>;
    case "story":
      return (
        <div className={styles.boards}>
          {Array.from({ length: 3 }, (_, board) => (
            <div className={styles.board} key={board}><div className={styles.frame} /><i /><i /></div>
          ))}
        </div>
      );
  }
}

const pointerStyles = ["--mx", "--my", "--rx", "--ry", "--px", "--py"] as const;

function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tile = event.currentTarget;
  const { left, top, width, height } = tile.getBoundingClientRect();
  const x = (event.clientX - left) / width;
  const y = (event.clientY - top) / height;
  const values = [`${x * 100}%`, `${y * 100}%`, `${(0.5 - y) * 7}deg`, `${(x - 0.5) * 7}deg`, `${(x - 0.5) * 16}px`, `${(y - 0.5) * 12}px`];
  pointerStyles.forEach((property, index) => tile.style.setProperty(property, values[index]));
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  pointerStyles.forEach(property => event.currentTarget.style.removeProperty(property));
}

export function SkillMatrix() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grid.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.toggleAttribute("data-craft-playing", entry.isIntersecting);
    });

    grid.current.querySelectorAll('[data-craft-tile="cut"], [data-craft-tile="audio"]').forEach(tile => observer.observe(tile));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-skills" className={styles.section} aria-labelledby="skills-title">
      <div className={`site-container ${styles.container}`}>
        <Reveal>
          <p className="eyebrow">The creative approach / 01</p>
          <h2 id="skills-title" className={`font-display ${styles.title}`}>Crafted with <span>intention.</span></h2>
        </Reveal>
        <div ref={grid} className={styles.grid}>
          {creativeSkills.map((skill, index) => (
            <Reveal key={skill.number} className={index === 0 ? styles.wide : index === 1 ? styles.side : undefined}>
              <article className={styles.tile} data-craft-tile={skill.icon} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
                <span className={styles.number} aria-hidden="true">/{skill.number}</span>
                <div className={styles.art} aria-hidden="true"><SkillArt type={skill.icon} /></div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </article>
            </Reveal>
          ))}
          <Reveal className={styles.full}>
            <article className={`${styles.tile} ${styles.statement}`} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
              <div className={styles.orbit} aria-hidden="true" />
              <small>Made to connect</small>
              <strong>Picture. Sound. <span>Feeling.</span></strong>
              <p>Never separate. Always in sync.</p>
            </article>
          </Reveal>
        </div>
        <p className={styles.foot}>Every frame has a purpose</p>
      </div>
    </section>
  );
}
