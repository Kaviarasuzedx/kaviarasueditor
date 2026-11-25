import { ArrowRight, ClipboardList, Clapperboard, MessageSquareText, PackageCheck } from "lucide-react";
import { editingProcess, serviceFaqs } from "@/data/services";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/sections/Reveal";

const stageIcons = [ClipboardList, Clapperboard, MessageSquareText, PackageCheck] as const;

export function EditingProcess() {
  return (
    <section className="border-y border-stroke bg-[#101010] py-24 sm:py-32" aria-labelledby="process-title">
      <div className="site-container">
        <Reveal className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8"><p className="eyebrow mb-6">How we get there</p><h2 id="process-title" className="section-title max-w-3xl">Good process.<br /><span className="text-secondary">Better pictures.</span></h2></div>
          <p className="max-w-md text-sm leading-7 text-secondary lg:col-span-4">A straightforward workflow—so the creative stays ambitious and the decisions stay clear.</p>
        </Reveal>
        <ol className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {editingProcess.map((stage, index) => {
            const Icon = stageIcons[index];
            return (
              <li key={stage.number}>
                <Reveal delay={index * .06}>
                  <div className="flex h-full min-h-[300px] flex-col rounded-card border border-white/[.09] bg-[#161616] p-7">
                    <div className="flex items-center justify-between"><span className="font-display text-4xl font-semibold text-accent">{stage.number}</span>{index < editingProcess.length - 1 ? <ArrowRight size={18} className="text-muted" aria-hidden="true" /> : <PackageCheck size={18} className="text-accent" aria-hidden="true" />}</div>
                    <Icon size={30} className="mt-9 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-6 font-display text-2xl font-semibold">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-secondary">{stage.description}</p>
                    <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[.17em] text-accent">{stage.detail}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function QuoteTeaser() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="quote-title">
      <div className="site-container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] border border-accent/30 bg-[#18160f] p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_28%,rgba(255,184,0,.17),transparent_55%)]" aria-hidden="true" />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8"><p className="eyebrow mb-6">Investment / Built around your brief</p><h2 id="quote-title" className="section-title max-w-3xl">No one-size-fits-all edits.<br /><span className="text-accent">No one-size-fits-all quote.</span></h2><p className="mt-7 max-w-xl text-sm leading-8 text-secondary">Pricing depends on runtime, footage volume, motion complexity, turnaround and revision rounds. Tell me what you&apos;re making and I&apos;ll help define the right scope.</p></div>
              <div className="lg:col-span-4 lg:justify-self-end"><Button href="/contact" size="lg" magnetic showArrow>Get a tailored quote</Button></div>
            </div>
            <div className="mt-11 flex flex-wrap gap-2 border-t border-white/10 pt-8">{["Clear deliverables", "Agreed review rounds", "Format-ready exports", "No invented package prices"].map((factor) => <span key={factor} className="rounded-pill border border-white/15 px-4 py-2 text-xs text-secondary">{factor}</span>)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceFAQ() {
  return (
    <section className="border-t border-stroke py-24 sm:py-32" aria-labelledby="services-faq-title">
      <div className="site-container grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5"><p className="eyebrow mb-6">Good to know</p><h2 id="services-faq-title" className="section-title">Before we<br /><span className="text-secondary">press play.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-secondary">Need something not covered here? Share the brief and let&apos;s talk through the details.</p><div className="mt-8"><Button href="/contact" variant="secondary" showArrow>Ask a question</Button></div></Reveal>
        <Reveal className="lg:col-span-7" delay={.08}><Accordion items={serviceFaqs} /></Reveal>
      </div>
    </section>
  );
}
