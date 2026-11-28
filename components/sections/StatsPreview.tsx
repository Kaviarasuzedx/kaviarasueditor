"use client";

import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { ArrowLeftRight, Check, Clapperboard, Frame, Layers3, Pause, Play } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useRef, useState, type RefObject } from "react";
import styles from "./Stats.module.css";

// The mountain sequence already referenced by data/projects.ts, at Mixkit's current delivery URL.
const footage = "https://assets.mixkit.co/videos/42494/42494-720.mp4";
const poster = "/posters/showreel.svg";
const storyFrames = [
  { src: "/posters/stranger-things.svg", alt: "Opening storyboard frame" },
  { src: "/posters/chennai-silks.svg", alt: "Middle storyboard frame" },
  { src: "/posters/farmland.svg", alt: "Closing storyboard frame" },
];

type PreviewProps = {
  scene: string;
  value: string;
  frame: RefObject<number>;
  fps: number;
  startFrame: number;
  clipSeconds: number;
  seekVersion: number;
  playing: boolean;
  enabled: boolean;
  reducedMotion: boolean;
  onToggle: () => void;
};

function FormatsPreview({ frame, fps, startFrame, clipSeconds, seekVersion, playing, enabled, onToggle }: PreviewProps) {
  const video = useRef<HTMLVideoElement>(null);
  const wide = useRef<HTMLCanvasElement>(null);
  const crop = useRef<HTMLCanvasElement>(null);
  const wideProgress = useRef<HTMLSpanElement>(null);
  const tallProgress = useRef<HTMLSpanElement>(null);
  const present = useIsPresent();
  const [hasFrame, setHasFrame] = useState(false);
  const drawn = useRef(false);
  const running = playing && enabled && present;

  useEffect(() => {
    const media = video.current;
    const widescreen = wide.current;
    const wideContext = widescreen?.getContext("2d", { alpha: false });
    const canvas = crop.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!media || !widescreen || !wideContext || !canvas || !context) return;

    let callback: number | undefined;
    let animation: number | undefined;
    const supportsVideoFrames = typeof media.requestVideoFrameCallback === "function";

    function draw() {
      if (!media || !canvas || !context || !widescreen || !wideContext || media.readyState < 2 || !media.videoHeight) return;
      drawCrop(widescreen, wideContext, media);
      drawCrop(canvas, context, media);
      const progress = Math.min(1, media.currentTime / clipSeconds);
      if (wideProgress.current) wideProgress.current.style.transform = `scaleX(${progress})`;
      if (tallProgress.current) tallProgress.current.style.transform = `scaleX(${progress})`;
      if (!drawn.current) {
        drawn.current = true;
        setHasFrame(true);
      }
    }

    function scheduleFrame() {
      if (!media || !running) return;
      if (supportsVideoFrames) {
        callback = media.requestVideoFrameCallback(() => { draw(); scheduleFrame(); });
      } else {
        animation = window.requestAnimationFrame(() => { draw(); scheduleFrame(); });
      }
    }

    function align() {
      if (!media || !media.readyState) return;
      const seconds = Math.max(0, (frame.current - startFrame) / fps);
      const target = Math.min(seconds, clipSeconds, Number.isFinite(media.duration) ? Math.max(0, media.duration - 0.04) : seconds);
      if (Math.abs(media.currentTime - target) > 0.04) media.currentTime = target;
      if (running) void media.play().catch(() => {});
      else media.pause();
    }

    media.addEventListener("loadedmetadata", align);
    media.addEventListener("loadeddata", draw);
    media.addEventListener("seeked", draw);
    align();
    draw();
    scheduleFrame();

    return () => {
      media.removeEventListener("loadedmetadata", align);
      media.removeEventListener("loadeddata", draw);
      media.removeEventListener("seeked", draw);
      if (callback !== undefined) media.cancelVideoFrameCallback(callback);
      if (animation !== undefined) window.cancelAnimationFrame(animation);
      media.pause();
    };
  }, [clipSeconds, fps, frame, running, seekVersion, startFrame]);

  const PlaybackIcon = playing ? Pause : Play;
  const label = playing ? "Pause format previews" : "Play format previews";

  return (
    <div className={styles.formats}>
      <div className={`${styles.monitor} ${styles.wideMonitor}`}>
        <div className={styles.wideScreen}>
          <video ref={video} src={enabled || hasFrame ? footage : undefined} poster={poster} preload={enabled ? "auto" : "none"} muted playsInline aria-hidden="true" />
          <canvas ref={wide} width={960} height={540} data-ready={hasFrame} role="img" aria-label="Cinematic mountain footage in horizontal format" />
          <div className={styles.playerBar}>
            <button type="button" onClick={onToggle} aria-label={`${label}, 16:9`}><PlaybackIcon size={13} aria-hidden="true" /></button>
            <span className={styles.mediaProgress} aria-hidden="true"><span ref={wideProgress} /></span>
            <span className={styles.ratio}>16:9</span>
          </div>
        </div>
      </div>
      <span className={styles.conversion} aria-hidden="true"><ArrowLeftRight size={18} /></span>
      <div className={`${styles.monitor} ${styles.phoneMonitor}`}>
        <div className={styles.phoneScreen}>
          <Image src={poster} alt="" fill sizes="150px" className={styles.phonePoster} />
          <canvas ref={crop} width={288} height={512} data-ready={hasFrame} role="img" aria-label="The same mountain footage cropped to vertical format" />
          <div className={styles.playerBar}>
            <button type="button" onClick={onToggle} aria-label={`${label}, 9:16`}><PlaybackIcon size={12} aria-hidden="true" /></button>
            <span className={styles.mediaProgress} aria-hidden="true"><span ref={tallProgress} /></span>
            <span className={styles.ratio}>9:16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawCrop(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, video: HTMLVideoElement) {
  const width = Math.min(video.videoWidth, video.videoHeight * canvas.width / canvas.height);
  const height = Math.min(video.videoHeight, video.videoWidth * canvas.height / canvas.width);
  context.drawImage(video, (video.videoWidth - width) / 2, (video.videoHeight - height) / 2, width, height, 0, 0, canvas.width, canvas.height);
}

function ExperiencePreview({ value }: { value: string }) {
  return (
    <div className={styles.experience} aria-hidden="true">
      <div className={styles.layerPanel}><Layers3 size={17} /><i /><i /><i /><i /></div>
      <div className={styles.experiencePanel}>
        <Clapperboard size={20} strokeWidth={1.5} />
        <strong className={`font-display ${styles.experienceCount}`}>{value}</strong>
        <div className={styles.miniTracks}><i /><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}

function DeliveryPreview({ value }: { value: string }) {
  return (
    <div className={styles.delivery} aria-hidden="true">
      <div className={styles.deliveryBack}><Frame size={44} strokeWidth={0.8} /></div>
      <div className={styles.deliveryPanel}>
        <div><strong className="font-display">{value}</strong><span className={styles.deliveryCheck}><Check size={21} strokeWidth={1.6} /></span></div>
        <span className={styles.deliveryProgress}><i /></span>
      </div>
    </div>
  );
}

function StoryPreview() {
  return (
    <ol className={styles.story}>
      {storyFrames.map(({ src, alt }) => (
        <li key={src}><Image src={src} alt={alt} fill sizes="(max-width: 640px) 24vw, 190px" /></li>
      ))}
    </ol>
  );
}

export const StatsPreview = memo(function StatsPreview(props: PreviewProps) {
  const { scene, value, playing, reducedMotion } = props;
  return (
    <div className={styles.stage} data-playing={playing} data-scene={scene}>
      <div className={styles.stageGrid} aria-hidden="true" />
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={scene}
          className={styles.scene}
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
        >
          {scene === "Formats" ? <FormatsPreview {...props} /> : scene === "Experience" ? <ExperiencePreview value={value} /> : scene === "Delivery" ? <DeliveryPreview value={value} /> : <StoryPreview />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
