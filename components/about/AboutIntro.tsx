import Image from "next/image";
import { ArrowDownRight, Film, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/sections/Reveal";

export function AboutIntro() {
  return (
    <section className="noise-overlay relative isolate overflow-hidden border-b border-stroke" aria-labelledby="about-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_47%,rgba(255,184,0,.11),transparent_48%)]" aria-hidden="true" />
      <div className="site-container relative grid items-center gap-x-12 gap-y-8 pb-9 pt-14 lg:grid-cols-12 lg:pb-12 lg:pt-20">
        <div className="lg:col-span-7">
          <Reveal><Badge tone="accent" dot>02 / A little about me</Badge></Reveal>
          <Reveal delay={0.08} className="max-w-[830px] [container-type:inline-size]">
            <h1 id="about-title" className="display-title mt-6 text-[length:min(clamp(3rem,7.4vw,7.75rem),14.65cqi)] leading-[1.02] sm:mt-7">
              An editor.<br />
              <span className="text-gradient whitespace-nowrap">A storyteller.</span>{" "}
              <span className="mt-[0.14em] block text-[length:min(0.92em,11.5cqi)] leading-[1.04]">
                <span className="whitespace-nowrap text-accent">A little obsessed</span><br />
                with detail.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[570px] text-base leading-8 text-secondary sm:mt-7 sm:text-lg">
              I&apos;m Kaviarasu—a video editor and motion designer with 2+ years of experience turning ideas, footage and sound into stories that stay with people.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Button href="/work" magnetic showArrow>Explore my work</Button>
              <Button href="/contact" variant="secondary" showArrow>Let&apos;s talk</Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="relative lg:col-span-5" delay={0.22}>
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#171715] shadow-[0_30px_110px_rgba(0,0,0,.4)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/about/portrait-refined.svg"
                alt="Illustrative faceless portrait silhouette; not an actual photograph of Kaviarasu"
                fill priority sizes="(max-width: 1023px) 100vw, 39vw" className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-7 pb-7 pt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-accent">Visual placeholder</p>
                <p className="mt-2 text-sm text-white/80">A glimpse into Kaviarasu&apos;s creative journey.</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-5">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[.15em] text-secondary"><Film size={16} className="text-accent" aria-hidden="true" /> Frame by frame</span>
              <Sparkles size={18} className="text-accent" aria-hidden="true" />
            </div>
          </div>
          <div className="pointer-events-none absolute -left-5 top-[17%] hidden rounded-2xl border border-white/10 bg-black/85 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block" aria-hidden="true">
            <span className="block font-display text-3xl font-semibold text-foreground">2+</span>
            <span className="text-[10px] uppercase tracking-[.2em] text-secondary">Years editing</span>
          </div>
        </Reveal>
        <a href="#about-skills" className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[.16em] text-secondary transition-colors hover:text-accent lg:col-span-12">
          <ArrowDownRight size={18} aria-hidden="true" /> Dive into the craft
        </a>
      </div>
    </section>
  );
}
