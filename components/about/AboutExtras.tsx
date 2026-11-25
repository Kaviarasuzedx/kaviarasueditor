import Image from "next/image";
import { ArrowUpRight, Check, MousePointer2 } from "lucide-react";
import { behindTheScenes, valueProps } from "@/data/about";
import { Reveal } from "@/components/sections/Reveal";
import { Button } from "@/components/ui/Button";

const tools = [
  { initials: "Pr", label: "Adobe Premiere Pro", caption: "Picture editing", foreground: "#b7aeff", background: "#211e44" },
  { initials: "Ae", label: "Adobe After Effects", caption: "Motion & compositing", foreground: "#d1bcff", background: "#251c49" },
] as const;

export function CreativeToolkit() {
  return (
    <section className="border-b border-stroke bg-[#0e0e0e] py-24 sm:py-28" aria-labelledby="tools-title">
      <div className="site-container grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">The toolkit / 02</p>
          <h2 id="tools-title" className="section-title">Two essential tools.<br /><span className="text-secondary">Endless possibilities.</span></h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-secondary">My primary editing and motion-design workflows are built around Adobe Premiere Pro and After Effects.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {tools.map((tool, index) => (
            <Reveal key={tool.initials} delay={index * 0.08}>
              <div className="flex min-h-[200px] flex-col justify-between rounded-card border border-white/10 bg-[#161616] p-7">
                <span className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl border border-white/10 font-sans text-[31px] font-bold tracking-[-.07em]" style={{ backgroundColor: tool.background, color: tool.foreground }} aria-hidden="true">{tool.initials}</span>
                <div><h3 className="mt-6 font-display text-xl font-semibold">{tool.label}</h3><p className="mt-1 text-xs text-secondary">{tool.caption}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs leading-5 text-muted lg:col-span-12">Stylized product monograms are used instead of official Adobe artwork. Adobe and its product names belong to Adobe Inc.</p>
      </div>
    </section>
  );
}

export function ValueProps() {
  return (
    <section className="border-b border-stroke py-24 sm:py-32" aria-labelledby="value-title">
      <div className="site-container">
        <Reveal><p className="eyebrow mb-6">What I bring / 04</p><h2 id="value-title" className="section-title max-w-3xl">The details are <span className="text-secondary">the difference.</span></h2></Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {valueProps.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.07}>
              <article className="h-full border-t border-accent/45 pt-7">
                <div className="flex items-center justify-between"><span className="eyebrow">{item.number} / 03</span><Check size={17} className="text-accent" aria-hidden="true" /></div>
                <h3 className="mt-9 font-display text-[clamp(1.55rem,2.4vw,2.3rem)] font-semibold leading-[1.13] tracking-[-.04em]">{item.title}</h3>
                <p className="mt-5 max-w-sm text-sm leading-7 text-secondary">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BehindTheScenes() {
  return (
    <section className="border-b border-stroke py-24 sm:py-32" aria-labelledby="bts-title">
      <div className="site-container">
        <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="eyebrow mb-6">Behind the frames / 05</p><h2 id="bts-title" className="section-title">Inside the <span className="text-secondary">process.</span></h2></div>
          <p className="max-w-md text-sm leading-7 text-secondary">Every great result begins with the work nobody sees: experimenting, listening, adjusting and refining.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {behindTheScenes.map((item, index) => (
            <Reveal key={item.src} delay={index * .06}>
              <figure className="group overflow-hidden rounded-card border border-white/10 bg-surface">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transform-none" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/75 px-3 py-1.5 text-[10px] uppercase tracking-[.14em] text-white/90">Concept art</div>
                </div>
                <figcaption className="flex items-center justify-between gap-4 p-6">
                  <div><h3 className="font-display text-xl font-semibold">{item.title}</h3><p className="mt-1 text-xs text-muted">{item.label}</p></div>
                  <ArrowUpRight className="shrink-0 text-accent" size={18} aria-hidden="true" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-between gap-5 rounded-card border border-accent/20 bg-[linear-gradient(115deg,rgba(255,184,0,.065),transparent_70%)] p-7 sm:flex-row sm:items-center">
          <div><p className="flex items-center gap-2 text-sm font-semibold"><MousePointer2 size={16} className="text-accent" aria-hidden="true" /> Have a project in mind?</p><p className="mt-2 text-sm text-secondary">Send over the idea. We&apos;ll shape a thoughtful edit around it.</p></div>
          <Button href="/contact" magnetic showArrow>Discuss a project</Button>
        </div>
        <p className="mt-4 text-xs text-muted">The visuals showcase my creative workflow, editing process, and the tools I use to bring ideas to life.</p>
      </div>
    </section>
  );
}
