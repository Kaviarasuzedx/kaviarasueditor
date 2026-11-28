import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ReelTrigger } from "./ReelTrigger";
import { Reveal } from "./Reveal";

export function Showreel() {
  return (
    <section id="showreel" className="relative py-20 sm:py-28" aria-labelledby="reel-heading">
      <div className="site-container">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <div><p className="eyebrow mb-4">001 / My Showreel</p><h2 id="reel-heading" className="section-title">Stories in motion.<br /><span className="text-secondary">Creativity in every frame.</span></h2></div>
          <p className="max-w-xs text-sm leading-7 text-secondary">A showcase of my video editing work, creative storytelling, cinematic visuals, and motion design.</p>
        </Reveal>
        <Reveal>
          <div className="group relative aspect-[4/3] min-h-[210px] overflow-hidden rounded-card border border-stroke bg-[#191c22] sm:aspect-[16/7.3] sm:min-h-[260px]">
            <Image src="/posters/kaviarasu-showreel.svg" alt="Kaviarasu video editing showreel cover" fill priority={false} sizes="(max-width: 768px) 100vw, 1440px" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center"><ReelTrigger /></div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-9 sm:left-10 sm:right-10">
              <div><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Video Editing / Motion Graphics / Storytelling</span><p className="font-display text-2xl font-semibold tracking-display text-white sm:text-4xl">My Creative Showreel.</p></div>
              <span className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:flex">Watch Showreel <ArrowUpRight size={16} aria-hidden="true" /></span>
            </div>
          </div>
        </Reveal>
        <div className="mt-5 flex flex-wrap justify-between gap-3 text-[10px] uppercase tracking-[0.17em] text-muted"><span>Ads / Commercials / Reels / YouTube / Motion</span><span>Selected Creative Works · 2022–2026</span></div>
      </div>
    </section>
  );
}