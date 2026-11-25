"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sampleTestimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const quote = sampleTestimonials[index];
  const change = useCallback((delta: number) => setIndex(current => (current + delta + sampleTestimonials.length) % sampleTestimonials.length), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!e.target || !(e.target instanceof Element) || !e.target.closest("#testimonial-slider")) return;
      if (e.key === "ArrowLeft") change(-1);
      if (e.key === "ArrowRight") change(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [change]);

  return (
    <section className="border-b border-stroke py-24 sm:py-32" aria-labelledby="testimonial-title">
      <div className="site-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="eyebrow mb-5">005 / The collaboration</p><h2 id="testimonial-title" className="section-title">Great work<br /><span className="text-secondary">is a team sport.</span></h2><p className="mt-6 max-w-xs text-sm leading-7 text-secondary">This is where verified client feedback will appear once approved. The current carousel contains clearly labeled copy examples.</p></div>
        <div className="relative lg:col-span-8" id="testimonial-slider" aria-roledescription="carousel" aria-label="Sample testimonial carousel">
          <div className="flex min-h-[365px] flex-col justify-between rounded-card border border-stroke bg-surface px-7 py-9 sm:px-12 sm:py-11">
            <Quote size={42} strokeWidth={1} className="text-accent/80" aria-hidden="true" />
            <div className="min-h-[130px]" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote key={index} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0, y: -15 }} transition={{ duration: reduced ? 0 : 0.24 }} className="max-w-2xl font-display text-[clamp(1.45rem,2.8vw,2.65rem)] font-medium leading-[1.25] tracking-[-0.035em]">“{quote.quote}”</motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-stroke pt-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.21em] text-accent">{quote.attribution}</p><p className="mt-2 text-xs text-secondary">{quote.context}</p></div><div className="flex items-center gap-3"><span className="mr-2 text-xs tabular-nums text-muted">0{index + 1} / 0{sampleTestimonials.length}</span><button type="button" onClick={() => change(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-accent hover:text-accent" aria-label="Previous sample quote"><ArrowLeft size={17} aria-hidden="true" /></button><button type="button" onClick={() => change(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-accent hover:text-accent" aria-label="Next sample quote"><ArrowRight size={17} aria-hidden="true" /></button></div></div>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">* a verified client review.</p>
        </div>
      </div>
    </section>
  );
}
