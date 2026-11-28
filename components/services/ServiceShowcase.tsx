import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Check, Clock3, MonitorPlay, Ratio, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/sections/Reveal";
import { cn } from "@/lib/utils";
import { AdsArtwork } from "@/components/services/AdsArtwork";

const socialMediaReference = readFileSync(path.join(process.cwd(), "public/services/socialmedia.html"), "utf8");
const youtubeReference = readFileSync(path.join(process.cwd(), "public/services/youtube-premium-player.html"), "utf8");
const soundReference = readFileSync(path.join(process.cwd(), "public/services/premium-sound-design.html"), "utf8");


export function ServicesIntro() {
  return (
    <section className="noise-overlay relative isolate overflow-hidden border-b border-stroke pb-12 pt-16 sm:pb-16 sm:pt-20" aria-labelledby="services-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_42%,rgba(255,184,0,.11),transparent_48%)]" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal><Badge tone="accent" dot>03 / What I can make for you</Badge></Reveal>
        <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8" delay={.08}>
            <h1 id="services-title" className="display-title text-[clamp(3rem,7.65vw,8.3rem)]">
              Ideas in.<br /><span className="text-accent">Impact out.</span>
            </h1>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={.16}>
            <p className="max-w-md text-base leading-8 text-secondary">A thoughtful edit isn&apos;t about adding more. It&apos;s about making every cut, sound and visual earn its place.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button href="/contact" magnetic showArrow>Request a quote</Button><Button href="#service-list" variant="secondary" ariaLabel="Explore all six editing services">Explore services <ArrowDownRight size={16} aria-hidden="true" /></Button></div>
          </Reveal>
        </div>
        <div className="mt-9 grid gap-4 border-t border-stroke pt-5 sm:grid-cols-3">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-secondary"><Sparkles size={16} className="text-accent" aria-hidden="true" /> Film / Motion / Sound</p>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-secondary"><Ratio size={16} className="text-accent" aria-hidden="true" /> Horizontal + Vertical</p>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-secondary"><MonitorPlay size={16} className="text-accent" aria-hidden="true" /> 1080p + 4K capable</p>
        </div>
      </div>
    </section>
  );
}

export function ServiceShowcase() {
  return (
    <section id="service-list" className="py-12 sm:py-16" aria-labelledby="service-list-title">
      <div className="site-container">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
          <div><p className="eyebrow mb-5">The offering / 06 disciplines</p><h2 id="service-list-title" className="section-title">Made for the <span className="text-secondary">big picture.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-secondary">From the first frame to final delivery. Choose an edit style—or combine them into one complete campaign.</p>
        </Reveal>
        <div className="space-y-4">
          {services.map((service, index) => (
            <Reveal key={service.id}>
              <article id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-28 overflow-hidden rounded-[24px] border border-white/[.09] bg-[#131313]">
                <div className="grid lg:grid-cols-12">
                  <div className={cn("group relative min-h-[290px] overflow-hidden bg-[#1b1916] sm:min-h-[370px] lg:col-span-5 lg:min-h-[490px]", index % 2 === 1 && "lg:order-2")}>
                    {service.id === "social-content" ? <iframe title={service.artworkAlt} srcDoc={socialMediaReference} sandbox="allow-scripts" className="absolute inset-0 h-full w-full border-0 transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" /> : service.id === "youtube" ? <iframe title={service.artworkAlt} srcDoc={youtubeReference} sandbox="allow-scripts" className="absolute inset-0 h-full w-full border-0 transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" /> : service.id === "sound-design" ? <iframe title={service.artworkAlt} srcDoc={soundReference} sandbox="allow-scripts" className="absolute inset-0 h-full w-full border-0 transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" /> : service.id === "ads-commercials" ? <AdsArtwork label={service.artworkAlt} /> : <Image src={service.artwork} alt={service.artworkAlt} fill sizes="(max-width: 1023px) 100vw, 42vw" className="object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" />}
                    <div className="pointer-events-none absolute left-6 top-6 rounded-pill border border-white/20 bg-black/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white backdrop-blur-md">Creative discipline / {service.number}</div>
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-7 font-display text-[130px] font-bold leading-none tracking-display text-white/[.1] sm:text-[180px]">{service.number}</span>
                  </div>
                  <div className="flex flex-col p-6 sm:p-8 lg:col-span-7 xl:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">{service.number} / 06</span><div className="flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-pill border border-white/10 px-3 py-1.5 text-[10px] text-secondary">{tag}</span>)}</div></div>
                    <h3 id={`${service.id}-title`} className="mt-8 font-display text-[clamp(2.25rem,4vw,4.15rem)] font-semibold leading-[1.04] tracking-display">{service.title}</h3>
                    <p className="mt-4 font-display text-xl font-medium text-accent sm:text-2xl">{service.strapline}</p>
                    <p className="mt-6 max-w-2xl text-sm leading-[1.9] text-secondary sm:text-base">{service.description}</p>
                    <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[.2em] text-foreground">Example deliverables</h4>
                        <ul className="space-y-3">{service.deliverables.map((deliverable) => <li key={deliverable} className="flex items-start gap-3 text-xs leading-6 text-secondary sm:text-sm"><Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" /><span>{deliverable}</span></li>)}</ul>
                      </div>
                      <div className="space-y-5">
                        <div><h4 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-foreground"><Ratio size={15} className="text-accent" aria-hidden="true" /> Format support</h4><p className="text-sm text-secondary">{service.formats}</p></div>
                        <div><h4 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-foreground"><Clock3 size={15} className="text-accent" aria-hidden="true" /> Turnaround</h4><p className="text-sm text-secondary">{service.turnaround}</p></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                      <Button href={`/contact?service=${encodeURIComponent(service.id)}`} variant="secondary" showArrow>Enquire about this service</Button>
                      <a href="#service-list-title" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.13em] text-muted transition hover:text-accent">Back to services <ArrowUpRight size={14} aria-hidden="true" /></a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs leading-6 text-muted">Deliverables shown are examples; availability, asset licensing, revision rounds and schedule are confirmed per quote. Turnaround ranges are indicative planning estimates, not guaranteed delivery dates.</p>
      </div>
    </section>
  );
}
