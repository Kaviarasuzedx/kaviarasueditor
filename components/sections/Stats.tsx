import { Reveal } from "./Reveal";
import { StatsTimeline } from "./StatsTimeline";

/** Verified experience from the brief; no invented clients, views or projects. */
const metrics = [
  { clip: "Experience", value: "2+", label: "Years editing & designing", detail: "The craft keeps evolving" },
  { clip: "Delivery", value: "4K", label: "Delivery-ready exports", detail: "Detail in every pixel" },
  { clip: "Formats", value: "02", label: "Aspect-ratio workflows", detail: "Vertical + horizontal" },
  { clip: "Story", value: "∞", label: "Ways to tell a story", detail: "Made for the message" },
] as const;

export function Stats() {
  return (
    <section
      className="relative overflow-hidden py-10 sm:py-14"
      aria-labelledby="stats-title"
    >
      <div className="site-container">
        <div className="mb-5 sm:mb-6">
          <Reveal><p className="eyebrow mb-3">004 / In perspective</p></Reveal>
          <Reveal delay={0.09}><h2 id="stats-title" className="section-title">The details matter.</h2></Reveal>
        </div>
        <Reveal delay={0.08}>
          <StatsTimeline metrics={metrics} />
        </Reveal>
      </div>
    </section>
  );
}
