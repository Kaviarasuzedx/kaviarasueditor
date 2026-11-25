import Link from "next/link";
import { ArrowUpRight, Clapperboard, Film, Smartphone, Zap } from "lucide-react";
import { homeServices, type ServicePreview } from "@/data/services";
import { Reveal, WordReveal } from "./Reveal";

const icons: Record<ServicePreview["icon"], typeof Film> = { zap: Zap, clapper: Clapperboard, smartphone: Smartphone, film: Film };

export function ServicesPreview() {
  return (
    <section className="border-b border-stroke py-24 sm:py-32" id="services-preview" aria-labelledby="services-heading">
      <div className="site-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div><p className="eyebrow mb-5">002 / What I do</p><WordReveal as="h2" text="Not just edits. Experiences." className="section-title max-w-2xl" /></div>
          <Link href="/services" className="group flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold hover:border-accent hover:text-accent">All services <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></Link>
        </div>
        <div id="services-heading" className="sr-only">Editing and motion services</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homeServices.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.number} delay={i * 0.065} className="h-full">
                <article className="group relative flex min-h-[320px] h-full flex-col rounded-card border border-stroke bg-surface p-7 transition-colors duration-300 hover:border-accent/40 hover:bg-[#191919] sm:min-h-[350px]">
                  <div className="mb-14 flex items-start justify-between"><span className="text-xs font-semibold tracking-widest text-muted">{service.number}/04</span><Icon className="h-7 w-7 text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={1.35} aria-hidden="true" /></div>
                  <h3 className="max-w-[230px] font-display text-[clamp(1.6rem,2.5vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-secondary">{service.caption}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">{service.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-muted">{tag}</span>)}</div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
