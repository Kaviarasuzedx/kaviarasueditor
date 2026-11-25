import { ArrowUpRight, Film } from "lucide-react";
import { Reveal } from "./Reveal";

/** Verified experience from the brief; no invented clients, views or projects. */
const metrics = [
  { value: "2+", label: "Years editing & designing", detail: "The craft keeps evolving" },
  { value: "4K", label: "Delivery-ready exports", detail: "Detail in every pixel" },
  { value: "02", label: "Aspect-ratio workflows", detail: "Vertical + horizontal" },
  { value: "∞", label: "Ways to tell a story", detail: "Made for the message" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-stroke bg-surface py-20 sm:py-24" aria-labelledby="stats-title">
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-accent/[0.035] blur-[90px]" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal className="mb-12 flex items-center justify-between gap-4"><div><p className="eyebrow mb-4">004 / In perspective</p><h2 id="stats-title" className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">The details matter.</h2></div><Film size={27} strokeWidth={1.2} className="text-accent" aria-hidden="true" /></Reveal>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, i) => <Reveal key={item.label} delay={i*0.06} className="border-t border-stroke py-8 sm:px-6 lg:border-l lg:border-t-0 lg:px-8 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0">
            <p className="font-display text-[clamp(3.25rem,6vw,6rem)] font-semibold leading-none tracking-[-0.08em] text-foreground">{item.value}<span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent sm:h-3 sm:w-3" aria-hidden="true" /></p>
            <h3 className="mt-5 text-sm font-semibold">{item.label}</h3>
            <p className="mt-2 flex items-center gap-1 text-xs text-muted">{item.detail} <ArrowUpRight size={12} aria-hidden="true" /></p>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
