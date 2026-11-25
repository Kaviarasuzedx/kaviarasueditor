import { Clapperboard, AudioLines, Palette, PanelsTopLeft, ListVideo } from "lucide-react";
import { creativeSkills, type SkillIcon } from "@/data/about";
import { Reveal } from "@/components/sections/Reveal";

const iconMap = {
  cut: Clapperboard,
  palette: Palette,
  audio: AudioLines,
  motion: PanelsTopLeft,
  story: ListVideo,
} satisfies Record<SkillIcon, typeof Clapperboard>;

export function SkillMatrix() {
  return (
    <section id="about-skills" className="border-b border-stroke py-24 sm:py-32" aria-labelledby="skills-title">
      <div className="site-container">
        <Reveal className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">The craft / 01</p>
            <h2 id="skills-title" className="section-title max-w-3xl">A good edit has <span className="text-secondary">many moving parts.</span></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-secondary lg:col-span-4">Five connected disciplines. One shared goal: a film that looks considered, sounds intentional and holds attention.</p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {creativeSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
              <Reveal key={skill.number} delay={Math.min(index, 2) * 0.07}>
                <article className="group flex h-full min-h-[315px] flex-col rounded-card border border-white/[.09] bg-[#141414] p-7 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-[#191817] sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-accent/15 bg-accent/[.07] text-accent"><Icon size={27} strokeWidth={1.6} aria-hidden="true" /></div>
                    <span className="text-xs tabular-nums tracking-[.2em] text-muted">/{skill.number}</span>
                  </div>
                  <h3 className="mt-8 font-display text-[clamp(1.5rem,2vw,2rem)] font-semibold tracking-[-.04em]">{skill.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-secondary">{skill.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {skill.specialties.map((item) => <span key={item} className="rounded-pill border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[.1em] text-muted">{item}</span>)}
                  </div>
                </article>
              </Reveal>
            );
          })}
          <Reveal delay={0.1}>
            <div className="noise-overlay relative flex h-full min-h-[315px] flex-col justify-between overflow-hidden rounded-card border border-accent/30 bg-[radial-gradient(circle_at_85%_10%,rgba(255,184,0,.15),transparent_65%),#18160e] p-8">
              <span className="eyebrow">Made to connect</span>
              <p className="font-display text-3xl font-semibold leading-[1.1] tracking-[-.04em]">Picture.<br />Sound.<br /><span className="text-accent">Feeling.</span></p>
              <span className="text-sm text-secondary">Never separate. Always in sync.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
