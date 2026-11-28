"use client";

import { editorialJourney } from "@/data/about";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import styles from "./CreativeJourney.module.css";

const desktopMotion = "(min-width: 64rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)";
const mobileMotion = "(width < 64rem) and (prefers-reduced-motion: no-preference), (height < 40rem) and (prefers-reduced-motion: no-preference)";

function FilmFrame({ poster }: { poster: string }) {
  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.frameImage} data-journey-poster>
        <Image src={poster} alt="" fill unoptimized sizes="(max-width: 575px) 100vw, (max-width: 1023px) 40vw, 21vw" />
      </div>
    </div>
  );
}

export function CreativeJourney() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = section.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const track = root.querySelector<HTMLElement>("[data-journey-track]")!;
    const stage = root.querySelector<HTMLElement>("[data-journey-stage]")!;
    const clips = gsap.utils.toArray<HTMLElement>("[data-journey-clip]", root);
    const chapters = gsap.utils.toArray<HTMLElement>("[data-journey-chapter]", root);
    const media = gsap.matchMedia(root);

    media.add(desktopMotion, () => {
      root.dataset.journeyMode = "cinematic";

      const scene = root.querySelector<HTMLElement>("[data-journey-scene]")!;
      const reel = root.querySelector<HTMLElement>("[data-journey-reel]")!;
      const posters = clips.map((clip) => clip.querySelector("[data-journey-poster]")!);
      const last = clips.length - 1;
      let clipWidth = 0;
      let clipSpacing = 0;
      const measure = () => {
        const clipStyle = getComputedStyle(clips[0]);
        clipWidth = parseFloat(clipStyle.width);
        clipSpacing = clipWidth + parseFloat(getComputedStyle(reel).columnGap);
        // The reel's clip center is also the camera's pivot and perspective origin.
        scene.style.setProperty("--clip-center", `calc(var(--reel-top) + ${parseFloat(clipStyle.height) / 2}px)`);
      };
      measure();

      const positionReel = () => gsap.set(reel, { x: -clipWidth / 2 });
      positionReel();
      gsap.set(clips, {
        opacity: (index: number) => index === 0 ? 1 : 0.45,
        z: (index: number) => index === 0 ? 0 : -34,
        scale: (index: number) => index === 0 ? 1.045 : 0.95,
      });
      gsap.set(chapters.slice(1), { autoAlpha: 0, y: 12 });
      gsap.set(posters.slice(1), { opacity: 0.72, y: 4, scale: 0.98 });

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "sine.inOut" } });

      timeline
        .fromTo("[data-journey-atmosphere]", { x: -45 }, { x: 85, duration: last, ease: "none" }, 0)
        .fromTo("[data-journey-camera]", { rotationX: 19, rotationY: -13 }, { rotationX: 11, rotationY: -20, duration: last, ease: "none" }, 0)
        .fromTo("[data-journey-video]", { opacity: 0.35 }, { opacity: 0.7, duration: 0.9 }, 0)
        .fromTo("[data-journey-audio]", { opacity: 0.4 }, { opacity: 0.8, duration: 0.9 }, 1)
        .fromTo("[data-journey-assembly] i", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.32 }, last - 0.65);

      for (let index = 1; index <= last; index++) {
        const start = index - 1;
        const previous = index - 1;
        timeline
          .to(reel, { x: () => -clipWidth / 2 - index * clipSpacing, duration: 1 }, start)
          .to("[data-journey-video]", { x: () => -index * clipSpacing * 0.32, duration: 1 }, start)
          .to("[data-journey-audio]", { x: () => -index * clipSpacing * 0.18, duration: 1 }, start)
          .to(clips[previous], { opacity: 0.45, z: -34, scale: 0.95, duration: 1 }, start)
          .to(clips[index], { opacity: 1, z: 0, scale: 1.045, duration: 1 }, start)
          .to(posters[previous], { opacity: 0.72, y: 4, scale: 0.98, duration: 0.45 }, start)
          .to(posters[index], { opacity: 1, y: 0, scale: 1, duration: 0.55 }, start + 0.45)
          .to(chapters[previous], { autoAlpha: 0, y: -10, duration: 0.4 }, start + 0.1)
          .fromTo(chapters[index], { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, immediateRender: false }, start + 0.5);
      }

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: () => `+=${track.offsetHeight - stage.offsetHeight}`,
        animation: timeline,
        scrub: 0.18,
        onRefreshInit: () => {
          measure();
          positionReel();
          timeline.invalidate();
        },
      });

      const aimY = gsap.quickTo("[data-journey-atmosphere]", "y", { duration: 0.55, ease: "power2.out" });
      const resetAim = () => aimY(0);
      const aim = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !trigger.isActive) return;
        aimY((event.clientY / window.innerHeight - 0.5) * -18);
      };
      stage.addEventListener("pointermove", aim);
      stage.addEventListener("pointerleave", resetAim);

      return () => {
        stage.removeEventListener("pointermove", aim);
        stage.removeEventListener("pointerleave", resetAim);
        scene.style.removeProperty("--clip-center");
        delete root.dataset.journeyMode;
      };
    });

    media.add(mobileMotion, () => {
      chapters.forEach((chapter) => {
        gsap.fromTo(chapter.querySelector("[data-journey-mobile-frame]"), { y: 12 }, {
          y: -6,
          ease: "none",
          scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={section} className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.track} data-journey-track>
        <div className={styles.stage} data-journey-stage>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.atmosphere} data-journey-atmosphere />
            <div className={styles.scene} data-journey-scene>
              <div className={styles.camera} data-journey-camera>
                <div className={styles.ruler} />
                <div className={styles.videoTrack} data-journey-video>
                  <i /><i /><i /><i />
                </div>
                <div className={styles.reel} data-journey-reel>
                  {editorialJourney.map(({ year, poster }, index) => (
                    <div className={styles.clip} key={year} data-journey-clip>
                      <FilmFrame poster={poster} />
                      <div className={styles.clipLabel}><span>{year}</span><span>{String(index + 1).padStart(2, "0")} / V1</span></div>
                    </div>
                  ))}
                </div>
                <div className={styles.audioTrack} data-journey-audio><i /><i /></div>
                <div className={styles.assembly} data-journey-assembly><i /><i /><i /></div>
              </div>
              <div className={styles.playhead} />
            </div>
          </div>
          <div className={`site-container ${styles.layout}`}>
            <header className={styles.heading}>
              <p className="eyebrow">The journey</p>
              <h2 id="journey-title" className="section-title">Never stop <span className="text-secondary">learning the language of film.</span></h2>
            </header>
            <ol className={styles.chapters} role="list">
              {editorialJourney.map(({ year, title, description, poster }) => (
                <li className={styles.chapter} key={year} data-journey-chapter>
                  <div className={styles.mobileFrame} data-journey-mobile-frame><FilmFrame poster={poster} /></div>
                  <div className={styles.chapterCopy}>
                    <time className={styles.year} dateTime={year}>{year}</time>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className={`site-container ${styles.outro}`}>
        <p>Every milestone represents my growth as a video editor, from learning the craft and freelancing to collaborating with creative agencies and bringing ideas to life.</p>
      </div>
    </section>
  );
}
