import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ReelTrigger } from "./ReelTrigger";

export function Hero() {
  return (
    <section className="noise-overlay relative isolate overflow-hidden border-b border-stroke" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_83%_44%,rgba(255,184,0,0.08),transparent_48%)]" aria-hidden="true" />
      <div className="site-container relative grid min-h-[min(780px,calc(100svh-76px))] items-center gap-4 pb-16 pt-10 sm:pb-20 sm:pt-12 md:pt-16 lg:grid-cols-12 lg:gap-0 lg:pb-16 lg:pt-10">
        <div className="relative z-10 lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:py-6">
          <div className="max-w-[800px] lg:[container-type:inline-size]">
            <h1 id="hero-title" className="display-title text-[clamp(3.6rem,7.45vw,8rem)] animate-fade-up [animation-delay:110ms] lg:text-[clamp(3.25rem,11.15cqi,8rem)]">
              Crafting<br />Stories,<br />
              <span className="relative inline-block whitespace-normal text-accent">Frame by<br className="sm:hidden" /> Frame<span className="text-foreground">.</span></span>
            </h1>
          </div>
          <p className="mt-8 max-w-[525px] text-base leading-[1.85] text-secondary animate-fade-up [animation-delay:180ms] sm:text-lg">
            More than a good edit. It&apos;s the feeling that stays after the screen fades to black. Cinematic films, bold commercials, and content that moves people.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
            <Button href="/work" magnetic size="lg" showArrow>Explore my work</Button>
            <ReelTrigger variant="hero"><Play size={15} fill="currentColor" aria-hidden="true" /> Watch showreel</ReelTrigger>
          </div>
          <div className="mt-12 flex items-center gap-3 text-xs tracking-[0.08em] text-muted lg:mt-16">
            <span className="h-px w-10 bg-accent/70" aria-hidden="true" /> 2+ YEARS IN THE MAKING
          </div>
        </div>
        <div className="relative z-0 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:-ml-16 lg:translate-x-8 lg:-translate-y-16 xl:-translate-y-20">
          <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            <HeroVisual />
          </div>
        </div>
        <a href="#showreel" className="absolute bottom-6 left-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary transition hover:text-accent sm:left-8 xl:left-12" aria-label="Scroll to showreel">
          <ArrowDownRight size={18} aria-hidden="true" /> Scroll to explore
        </a>
        <span className="absolute bottom-6 right-5 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted md:flex xl:right-12">Available for select projects <ArrowUpRight size={14} aria-hidden="true" /></span>
      </div>
    </section>
  );
}
