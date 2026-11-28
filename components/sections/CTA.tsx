import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="noise-overlay relative overflow-hidden py-14 sm:py-20" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_54%_30%,rgba(255,184,0,0.105),transparent_46%)]" aria-hidden="true" />
      <div className="site-container relative flex flex-col items-center text-center">
        <Reveal><div aria-hidden="true" className="relative mx-auto mb-12 flex h-28 w-28 items-center justify-center rounded-[30px] border border-[#d8a32a] bg-gradient-to-br from-[#ffd260] via-[#ffb800] to-[#7e4b04] shadow-[18px_20px_0px_#543a10,0_35px_100px_rgba(255,184,0,.17)] [transform:rotate(-10deg)] sm:h-36 sm:w-36"><Play size={44} fill="#151515" strokeWidth={0} className="ml-1 text-[#151515]" /></div></Reveal>
        <Reveal delay={0.05}><p className="eyebrow mb-6">Your next big idea starts here</p><h2 id="cta-title" className="display-title max-w-[1000px] text-[clamp(3.25rem,8.2vw,8rem)]">Have footage?<br /><span className="text-accent">Let&apos;s make magic.</span></h2></Reveal>
        <Reveal delay={0.15}><p className="mx-auto mt-9 max-w-lg text-base leading-8 text-secondary">Send the idea, the raw files, or even just a feeling. We&apos;ll find the story worth telling.</p><div className="mt-9 flex flex-wrap justify-center gap-4"><Button href="/contact" magnetic size="lg" showArrow>Let&apos;s collaborate</Button><Button href="/services" variant="secondary" size="lg">Explore services <ArrowUpRight size={17} aria-hidden="true" /></Button></div></Reveal>
      </div>
    </section>
  );
}
