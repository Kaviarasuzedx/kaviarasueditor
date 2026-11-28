"use client";

import { Check, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { editingProcess } from "@/data/services";
import styles from "./EditingProcess.module.css";

const stageDuration = 4000;
const presentation = [
  { phase: "Plan", status: "Planning", title: "Every great edit starts with clarity." },
  { phase: "Create", status: "Editing", title: "This is where the story comes alive." },
  { phase: "Refine", status: "Refining", title: "Good feedback makes better films." },
  { phase: "Export", status: "Delivering", title: "Made to be seen." },
] as const;

function StageVisual({ stage }: { stage: number }) {
  if (stage === 0) {
    return <div className={styles.paper}>{[0, 1, 2, 3].map((line) => <i key={line} style={{ "--order": line } as CSSProperties} />)}</div>;
  }
  if (stage === 1) {
    return (
      <div className={styles.editor}>
        <span className={styles.playhead} />
        {[0, 1, 2, 3, 4].map((track) => (
          <div className={styles.track} key={track}>
            {[0, 1, 2].map((clip) => <i key={clip} style={{ "--order": track + clip, flex: 1 + ((track + clip) % 3) } as CSSProperties} />)}
          </div>
        ))}
      </div>
    );
  }
  if (stage === 2) {
    return <div className={styles.messages}><div className={styles.bubble}><i /><i /></div><div className={styles.bubble}><i /><i /></div></div>;
  }
  return (
    <div className={styles.cube}>
      <div className={`${styles.face} ${styles.front}`}><Check size={39} strokeWidth={1.6} /></div>
      {[styles.side, styles.top, styles.back, styles.left, styles.base].map((face) => <div key={face} className={`${styles.face} ${face}`} />)}
    </div>
  );
}

export function EditingProcess() {
  const section = useRef<HTMLElement>(null);
  const timer = useRef<HTMLSpanElement>(null);
  const togglePlayback = useRef<() => void>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = section.current;
    const progress = timer.current;
    if (!root || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let lastTime: number | null = null;
    let frame = 0;
    let activeStage = 0;
    let visible = false;
    let userPaused = false;

    const advance = (now: number) => {
      if (lastTime !== null) elapsed = (elapsed + Math.min(now - lastTime, 100)) % (stageDuration * editingProcess.length);
      lastTime = now;
      const index = Math.floor(elapsed / stageDuration);
      if (index !== activeStage) {
        activeStage = index;
        setActive(index);
      }
      progress.style.transform = `scaleX(${(elapsed % stageDuration) / stageDuration})`;
      frame = requestAnimationFrame(advance);
    };

    const syncPlayback = () => {
      const running = visible && !userPaused && !document.hidden && !reduced.matches;
      root.toggleAttribute("data-pipeline-running", running);
      if (running && !frame) frame = requestAnimationFrame(advance);
      if (!running) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = null;
      }
    };

    togglePlayback.current = () => {
      userPaused = !userPaused;
      setPaused(userPaused);
      syncPlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(root);
    root.dataset.pipelineReady = "true";
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", syncPlayback);
      cancelAnimationFrame(frame);
      togglePlayback.current = null;
      delete root.dataset.pipelineReady;
      delete root.dataset.pipelineRunning;
    };
  }, []);

  const current = editingProcess[active];
  const currentPresentation = presentation[active];

  return (
    <section ref={section} className={`border-y border-stroke py-12 sm:py-16 ${styles.section}`} aria-labelledby="process-title">
      <div className="site-container">
        <header className={styles.header}>
          <div>
            <p className="eyebrow mb-4">How we get there</p>
            <h2 id="process-title" className={`font-display ${styles.title}`}>Good process.<br /><span>Better pictures.</span></h2>
          </div>
          <p className={styles.intro}>A straightforward workflow—so the creative stays ambitious and the decisions stay clear.</p>
        </header>
        <div className={styles.pipeline}>
          <div className={styles.rail} aria-hidden="true"><i className={styles.fill} style={{ transform: `scaleX(${active / (editingProcess.length - 1)})` }} /></div>
          <ol role="list" aria-label="Four production stages" className={styles.steps}>
            {editingProcess.map((stage, index) => (
              <li key={stage.number} className={styles.step} data-stage-state={active === index ? "active" : index < active ? "done" : "upcoming"}>
                <div className={styles.visual} aria-hidden="true"><StageVisual stage={index} /></div>
                <div className={styles.node} aria-hidden="true" />
                <p className={styles.phase}>{stage.number} / {presentation[index].phase}</p>
                <h3 className="font-display">{stage.title}</h3>
                <p className={styles.summary} aria-hidden="true">{stage.detail}.</p>
                <p className={styles.fullDescription}>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.playback}>
          <div className={styles.detail} aria-hidden="true">
            <div className={`font-display ${styles.number}`}>{current.number}.</div>
            <div key={current.number} className={styles.detailCopy}>
              <h3 className="font-display">{currentPresentation.title}</h3>
              <p>{current.description}</p>
            </div>
          </div>
          <div className={styles.progress} aria-hidden="true"><span ref={timer} /></div>
          <div className={styles.status}>
            <span className={styles.statusLabel} aria-hidden="true"><i />{currentPresentation.status}</span>
            <div className={styles.statusControls}>
              <span aria-hidden="true">{current.number} / {String(editingProcess.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => togglePlayback.current?.()} aria-label={paused ? "Play workflow preview" : "Pause workflow preview"}>
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
