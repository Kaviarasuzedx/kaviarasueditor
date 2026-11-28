"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { StatsPreview } from "./StatsPreview";
import styles from "./Stats.module.css";

const fps = 24;
const secondsPerClip = 3;
const framesPerClip = fps * secondsPerClip;
const waveform = Array.from({ length: 144 }, (_, index) => {
  const envelope = 0.4 + 0.6 * Math.abs(Math.sin(index * 0.093));
  const peak = 3 + envelope * (4 + 14 * Math.abs(Math.sin(index * 1.71) * Math.cos(index * 0.31)));
  return `M${index * 4 + 2} ${12 - peak / 2}v${peak}`;
}).join(" ");

type Metric = { clip: string; value: string; label: string; detail: string };

function formatTimecode(frame: number) {
  const seconds = String(Math.floor(frame / fps)).padStart(2, "0");
  const frames = String(frame % fps).padStart(2, "0");
  return `00:00:${seconds}:${frames}`;
}

export function StatsTimeline({ metrics }: { metrics: readonly [Metric, ...Metric[]] }) {
  const panel = useRef<HTMLDivElement>(null);
  const transport = useRef<HTMLDivElement>(null);
  const inView = useInView(panel, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const initialFrame = Math.max(0, metrics.findIndex(({ clip }) => clip === "Formats")) * framesPerClip;
  const [frame, setFrame] = useState(initialFrame);
  const frameRef = useRef(initialFrame);
  const [seekVersion, setSeekVersion] = useState(0);
  const [playback, setPlayback] = useState<"auto" | "playing" | "paused">("auto");
  const [pageVisible, setPageVisible] = useState(true);
  const duration = metrics.length * secondsPerClip;
  const lastFrame = duration * fps;
  const playing = playback === "playing" || (playback === "auto" && reducedMotion === false);
  const autoReady = useInView(transport, { amount: 0.35, once: true });
  const running = playing && inView && pageVisible && (playback === "playing" || autoReady);
  const activeIndex = Math.min(Math.floor(frame / framesPerClip), metrics.length - 1);
  const metric = metrics[activeIndex] ?? metrics[0];
  const timecode = formatTimecode(frame);
  const PlaybackIcon = running ? Pause : Play;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    const startFrame = frameRef.current;
    let startTime: number | undefined;
    let request = window.requestAnimationFrame(advance);

    function advance(now: number) {
      startTime ??= now;
      const nextFrame = (startFrame + Math.floor((now - startTime) * fps / 1000)) % lastFrame;
      if (nextFrame !== frameRef.current) {
        frameRef.current = nextFrame;
        setFrame(nextFrame);
      }
      request = window.requestAnimationFrame(advance);
    }

    return () => window.cancelAnimationFrame(request);
  }, [lastFrame, running]);

  function seek(nextFrame: number) {
    setPlayback("paused");
    if (frameRef.current === nextFrame) return;
    frameRef.current = nextFrame;
    setFrame(nextFrame);
    setSeekVersion((version) => version + 1);
  }

  const togglePlayback = useCallback(() => {
    if (running) {
      setPlayback("paused");
      return;
    }
    if (frameRef.current === lastFrame) {
      frameRef.current = 0;
      setFrame(0);
    }
    setPlayback("playing");
  }, [lastFrame, running]);

  function seekPointer(event: PointerEvent<HTMLInputElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (!width) return;
    const position = Math.min(1, Math.max(0, (event.clientX - left) / width));
    seek(Math.round(position * lastFrame));
  }

  return (
    <div ref={panel} className={styles.workstation}>
      <div
        className={styles.feature}
        onPointerMove={(event) => {
          if (reducedMotion || event.pointerType !== "mouse") return;
          const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--light-x", `${100 * (event.clientX - left) / width}%`);
          event.currentTarget.style.setProperty("--light-y", `${100 * (event.clientY - top) / height}%`);
        }}
      >
        <div
          className={styles.information}
          onPointerMove={(event) => {
            if (reducedMotion || event.pointerType !== "mouse") return;
            const element = event.currentTarget;
            const bounds = element.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            element.style.setProperty("--type-x", `${x * 18}px`);
            element.style.setProperty("--type-y", `${y * 12}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.removeProperty("--type-x");
            event.currentTarget.style.removeProperty("--type-y");
          }}
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={metric.clip}
              className={styles.stat}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
            >
              <div className={styles.textMask}><p className={`${styles.number} font-display`}>{metric.value}</p></div>
              <div className={styles.textMask}><h3 className={styles.statTitle}>{metric.label}</h3></div>
              <div className={styles.textMask}><p className={styles.detail}>{metric.detail}</p></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <StatsPreview
          scene={metric.clip}
          value={metric.value}
          frame={frameRef}
          fps={fps}
          startFrame={activeIndex * framesPerClip}
          clipSeconds={secondsPerClip}
          seekVersion={seekVersion}
          playing={running}
          reducedMotion={Boolean(reducedMotion)}
          onToggle={togglePlayback}
          enabled={inView && pageVisible}
        />
      </div>

      <div ref={transport} className={styles.timeline} data-running={running}>
        <div className={styles.transport}>
          <div className={styles.transportTitle}>
            <button type="button" className={styles.playButton} onClick={togglePlayback} aria-label={running ? "Pause timeline" : "Play timeline"}>
              <PlaybackIcon size={16} aria-hidden="true" />
            </button>
            <h3>Edit timeline</h3>
          </div>
          <span className={styles.timecode} data-timecode aria-hidden="true">{timecode}</span>
        </div>
        <div className={styles.editor}>
          <div className={styles.trackHeaders} aria-hidden="true">
            <span /><span>V2</span><span>V1</span><span>A1</span>
          </div>
          <div className={styles.tracks}>
            <div className={styles.ruler} aria-hidden="true">
              {Array.from({ length: duration + 1 }, (_, second) => (
                <span key={second} className={styles.tick} style={{ left: `${second / duration * 100}%` }}>
                  <small data-major={second % secondsPerClip === 0}>{String(second).padStart(2, "0")}s</small>
                </span>
              ))}
            </div>
            <div className={styles.graphicsTrack} aria-hidden="true"><span>Titles</span><span>Grade</span></div>
            <div className={styles.videoTrack} style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}>
              {metrics.map(({ clip }, index) => (
                <button key={clip} type="button" className={styles.clip} aria-current={index === activeIndex ? "true" : undefined} onClick={() => seek(index * framesPerClip)}>
                  {clip}
                </button>
              ))}
            </div>
            <div className={styles.audioTrack} aria-hidden="true">
              <svg viewBox="0 0 576 24" preserveAspectRatio="none"><path d={waveform} /></svg>
              <svg className={styles.wavePlayed} viewBox="0 0 576 24" preserveAspectRatio="none" style={{ clipPath: `inset(0 ${100 - frame / lastFrame * 100}% 0 0)` }}><path d={waveform} /></svg>
            </div>
            <span className={styles.playhead} style={{ left: `${frame / lastFrame * 100}%` }} aria-hidden="true" />
            <input
              type="range"
              className={styles.scrubber}
              min={0}
              max={lastFrame}
              value={frame}
              aria-label="Scrub the editing timeline"
              aria-valuetext={`${timecode}, ${metric.label}`}
              onChange={(event) => seek(event.currentTarget.valueAsNumber)}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                event.preventDefault();
                event.currentTarget.focus({ preventScroll: true });
                event.currentTarget.setPointerCapture(event.pointerId);
                seekPointer(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId) || (!playing && !reducedMotion && event.pointerType === "mouse" && event.buttons === 0)) {
                  seekPointer(event);
                }
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) seekPointer(event);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
