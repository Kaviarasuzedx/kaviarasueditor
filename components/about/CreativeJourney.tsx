import { editorialJourney } from "@/data/about";
import { Reveal } from "@/components/sections/Reveal";

export function CreativeJourney() {
  return (
    <section className="relative overflow-hidden border-b border-stroke py-24 sm:py-32" aria-labelledby="journey-title">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-full w-[780px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,184,0,.045),transparent_70%)]" />
      <div className="site-container relative">
        <Reveal>
          <p className="eyebrow mb-6">The journey / 03</p>
          <h2 id="journey-title" className="section-title max-w-3xl">Never stop <span className="text-secondary">learning the language of film.</span></h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-secondary">A sample narrative arc for the portfolio, from first exploration to the current creative focus.</p>
        </Reveal>
        <ol className="relative mt-16 border-l border-white/15 pl-8 sm:ml-5 sm:pl-12">
          {editorialJourney.map((item, index) => (
            <li key={item.year} className="relative pb-12 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[41px] top-1.5 h-[17px] w-[17px] rounded-full border-[4px] border-background bg-accent ring-1 ring-accent/40 sm:-left-[57px]" />
              <Reveal className="grid gap-3 lg:grid-cols-12 lg:gap-8" delay={Math.min(index, 2) * .05}>
                <span className="font-display text-3xl font-semibold tracking-[-.05em] text-accent lg:col-span-2">{item.year}</span>
                <div className="border-b border-white/[.08] pb-10 lg:col-span-10">
                  <h3 className="font-display text-2xl font-semibold tracking-[-.03em] sm:text-3xl">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-11 rounded-xl border border-accent/15 bg-accent/[.04] px-5 py-4 text-xs leading-6 text-secondary"><strong className="text-foreground">My Creative Journey:</strong> Every milestone represents my growth as a video editor, from learning the craft and freelancing to collaborating with creative agencies and bringing ideas to life.</p>
      </div>
    </section>
  );
}
