import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ReelTrigger } from "./ReelTrigger";

export function Hero() {
  return (
    <section className="noise-overlay relative isolate overflow-hidden border-b border-stroke" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_83%_44%,rgba(255,184,0,0.08),transparent_48%)]" aria-hidden="true" />
      <div className="site-container relative grid min-h-[min(890px,calc(100svh-76px))] items-center gap-4 pb-20 pt-16 sm:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-0 lg:pb-24 lg:pt-20">
        <div className="relative z-10 lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:py-24">
          <div className="mb-9 flex flex-wrap items-center gap-4 animate-fade-up">
            <Badge tone="accent" dot>Independent video editor</Badge>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Motion / Story / Sound</span>
          </div>
          <h1 id="hero-title" className="display-title max-w-[800px] text-[clamp(3.6rem,7.45vw,8rem)] animate-fade-up [animation-delay:110ms]">
            Crafting<br />Stories,<br />
            <span className="relative inline-block whitespace-normal text-accent">Frame by<br className="sm:hidden" /> Frame<span className="text-foreground">.</span></span>
          </h1>
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
        <div className="relative z-0 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:-ml-20 lg:translate-x-6">
          <HeroVisual />
        </div>
        <a href="#showreel" className="absolute bottom-6 left-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary transition hover:text-accent sm:left-8 xl:left-12" aria-label="Scroll to showreel">
          <ArrowDownRight size={18} aria-hidden="true" /> Scroll to explore
        </a>
        <span className="absolute bottom-6 right-5 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted md:flex xl:right-12">Available for select projects <ArrowUpRight size={14} aria-hidden="true" /></span>
      </div>
    </section>
  );
}
