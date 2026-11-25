const audience = ["BRANDS", "CREATORS", "AGENCIES", "STORYTELLERS", "VISIONARIES", "YOUTUBERS"];

export function Marquee() {
  const list = [...audience, ...audience];
  return (
    <div className="overflow-hidden border-y border-stroke bg-surface py-6" aria-label="Creative work for brands, creators, agencies, storytellers, visionaries, and YouTubers">
      <div className="animate-marquee flex w-max items-center gap-9 motion-reduce:animate-none" aria-hidden="true">
        {list.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-9 font-display text-[clamp(1.25rem,2.1vw,2rem)] font-semibold tracking-[0.035em] text-white/35">
            <span className="text-accent/75">✳</span>{word}
          </span>
        ))}
      </div>
    </div>
  );
}
