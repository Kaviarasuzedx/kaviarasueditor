"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "./Reveal";

const rotationDelay = 7000;
const controlClass = "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-accent hover:text-accent";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [rotationPreference, setRotationPreference] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const rotationEnabled = rotationPreference ?? !reduced;
  const rotating = rotationEnabled && !hovered && !focused;
  const quote = testimonials[index];
  const change = useCallback((delta: number) => {
    setIndex(current => (current + delta + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => change(1), rotationDelay);
    return () => window.clearTimeout(timer);
  }, [change, index, rotating]);

  return (
    <section className="border-b border-stroke py-9 sm:py-12" aria-labelledby="testimonial-title">
      <div className="site-container grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-3">005 / Client testimonials</p>
          <h2 id="testimonial-title" className="section-title text-3xl sm:text-4xl lg:text-5xl">Great work<br /><span className="text-secondary">is a team sport.</span></h2>
        </Reveal>
        <Reveal className="relative lg:col-span-8" delay={0.09}>
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}
            onKeyDown={event => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              change(event.key === "ArrowLeft" ? -1 : 1);
            }}
          >
            <div className="flex min-h-[260px] flex-col justify-between rounded-card border border-stroke bg-surface p-5 sm:min-h-[280px] sm:px-8 sm:py-6">
              <Quote size={30} strokeWidth={1} className="text-accent/80" aria-hidden="true" />
              <div className="py-4" aria-live={rotating ? "off" : "polite"} aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure key={index} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0, y: -15 }} transition={{ duration: reduced ? 0 : 0.24 }}>
                    <blockquote className="max-w-2xl font-display text-[clamp(1.125rem,2.05vw,1.75rem)] font-medium leading-snug tracking-display">“{quote.quote}”</blockquote>
                    <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.21em] text-accent">{quote.attribution}</figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-3">
                <span className="text-xs tabular-nums text-muted">0{index + 1} / 0{testimonials.length}</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setRotationPreference(!rotationEnabled)} className={controlClass} aria-label={rotationEnabled ? "Pause testimonials" : "Play testimonials"}>
                    {rotationEnabled ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
                  </button>
                  <button type="button" onClick={() => change(-1)} className={controlClass} aria-label="Previous testimonial"><ArrowLeft size={17} aria-hidden="true" /></button>
                  <button type="button" onClick={() => change(1)} className={controlClass} aria-label="Next testimonial"><ArrowRight size={17} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
