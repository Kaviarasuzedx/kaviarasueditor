import { serviceFaqs } from "@/data/services";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/sections/Reveal";

export function QuoteTeaser() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="quote-title">
      <div className="site-container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] border border-accent/30 bg-[#18160f] p-7 sm:p-9 lg:p-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_28%,rgba(255,184,0,.17),transparent_55%)]" aria-hidden="true" />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8"><p className="eyebrow mb-6">Investment / Built around your brief</p><h2 id="quote-title" className="section-title max-w-3xl">No one-size-fits-all edits.<br /><span className="text-accent">No one-size-fits-all quote.</span></h2><p className="mt-7 max-w-xl text-sm leading-8 text-secondary">Pricing depends on runtime, footage volume, motion complexity, turnaround and revision rounds. Tell me what you&apos;re making and I&apos;ll help define the right scope.</p></div>
              <div className="lg:col-span-4 lg:justify-self-end"><Button href="/contact" size="lg" magnetic showArrow>Get a tailored quote</Button></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">{["Clear deliverables", "Agreed review rounds", "Format-ready exports", "No invented package prices"].map((factor) => <span key={factor} className="rounded-pill border border-white/15 px-4 py-2 text-xs text-secondary">{factor}</span>)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceFAQ() {
  return (
    <section className="border-t border-stroke py-12 sm:py-16" aria-labelledby="services-faq-title">
      <div className="site-container grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5"><p className="eyebrow mb-6">Good to know</p><h2 id="services-faq-title" className="section-title">Before we<br /><span className="text-secondary">press play.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-secondary">Need something not covered here? Share the brief and let&apos;s talk through the details.</p><div className="mt-8"><Button href="/contact" variant="secondary" showArrow>Ask a question</Button></div></Reveal>
        <Reveal className="lg:col-span-7" delay={.08}><Accordion items={serviceFaqs} /></Reveal>
      </div>
    </section>
  );
}
