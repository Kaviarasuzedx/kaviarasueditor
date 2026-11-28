import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowDownRight, CircleHelp, Clock3, Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { EnvelopeVisual } from "@/components/three/EnvelopeVisual";
import { Reveal } from "@/components/sections/Reveal";

export const metadata: Metadata = pageMetadata("/contact", "Contact & Project Inquiries", "Share your video editing, commercial, Reels, YouTube or motion-graphics brief with Kaviarasu.");

const questions = [
  { title: "What should I include?", answer: "A short project summary, intended platforms, deliverables, references and your ideal timeline are the perfect starting point." },
  { title: "Can you edit vertical and horizontal videos?", answer: "Yes—Reels and Shorts in vertical formats, traditional 16:9 video and custom ad sizes. 1080p and 4K workflows are supported depending on your source footage and delivery requirements." },
  { title: "How quickly can we get started?", answer: "Availability and turnaround depend on the scope, footage and revision needs. We'll confirm a practical schedule before work begins." },
];

export default function ContactPage() {
  const isDeliveryConfigured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM_EMAIL &&
    process.env.CONTACT_TO_EMAIL
  );

  return (
    <>
      <section data-contact-page className="noise-overlay relative isolate overflow-hidden border-b border-stroke" aria-labelledby="contact-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(255,184,0,.115),transparent_56%)]" />
        <div className="site-container relative grid min-h-[620px] items-center gap-12 pb-12 pt-20 lg:grid-cols-12 lg:gap-7 lg:pb-20 lg:pt-24">
          <div className="lg:col-span-7 lg:row-start-1">
            <Reveal delay={0.08}>
              <p className="eyebrow">05 / Say hello</p>
              <h1 id="contact-heading" className="display-title mt-5 max-w-[790px] text-[clamp(3.5rem,7.5vw,7.5rem)]">
                You have a story.<br />
                <span className="text-gradient">Let&apos;s give it</span><br />
                <span className="text-accent">a pulse.</span>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:row-start-2">
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-8 text-secondary sm:text-lg">
                Have a campaign, YouTube channel or a scroll-stopping idea in mind? Tell me about it. I&apos;ll bring precision, motion and a little cinematic magic to the edit.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="#project-inquiry" showArrow magnetic>Tell me your idea</Button>
                <Button href="/work" variant="secondary" showArrow>Explore projects</Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:row-span-2 lg:row-start-1"><EnvelopeVisual /></div>
          <a href="#project-inquiry" className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[.14em] text-secondary transition-colors hover:text-accent lg:col-span-12 lg:row-start-3">
            <ArrowDownRight size={18} aria-hidden="true" /> Scroll to inquiry form
          </a>
        </div>
      </section>

      <section id="project-inquiry" className="site-container scroll-mt-24 py-20 lg:py-28" aria-label="Project inquiry and availability">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Your next collaboration</p>
              <h2 className="section-title mt-5">Great work starts with <span className="text-accent">the brief.</span></h2>
              <p className="mt-7 max-w-md text-base leading-8 text-secondary">
                Whether you&apos;re an agency, a creator or a brand, the edit starts with understanding what your story needs to do—not just how it should look.
              </p>
            </Reveal>
            <div className="mt-11 space-y-6">
              <div className="flex gap-4 border-t border-white/10 pt-6"><Film size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><div><h3 className="font-semibold">Built for every screen</h3><p className="mt-2 text-sm leading-6 text-secondary">Vertical and horizontal edits, social campaigns, 1080p and 4K deliverables.</p></div></div>
              <div className="flex gap-4 border-t border-white/10 pt-6"><Sparkles size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><div><h3 className="font-semibold">Thoughtful, frame-by-frame</h3><p className="mt-2 text-sm leading-6 text-secondary">Story, pacing, design and audio considered as one cohesive experience.</p></div></div>
              <div className="flex gap-4 border-t border-white/10 pt-6"><Clock3 size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><div><h3 className="font-semibold">Timelines discussed upfront</h3><p className="mt-2 text-sm leading-6 text-secondary">I&apos;ll review your brief before confirming availability, price and a realistic response or delivery schedule.</p></div></div>
            </div>
            {!isDeliveryConfigured && <div className="mt-10 rounded-xl border border-amber-400/20 bg-amber-400/[0.055] px-5 py-4 text-sm leading-6 text-amber-100/85" role="note">
              <strong className="text-amber-200">Contact setup pending.</strong> This is the live form interface, but inquiry delivery is not connected yet. Configure the private email environment variables to enable sending.
            </div>}
          </div>
          <div className="lg:col-span-7"><ContactForm /></div>
        </div>
        <ContactChannels />
      </section>

      <section className="border-t border-stroke bg-[#101010] py-20 sm:py-24" aria-labelledby="contact-faq-title">
        <div className="site-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-2"><CircleHelp size={15} aria-hidden="true" /> Before you hit send</p>
            <h2 id="contact-faq-title" className="section-title mt-5">Good questions. <span className="text-secondary">Clear answers.</span></h2>
          </div>
          <div className="lg:col-span-8">
            {questions.map(({ title, answer }, index) => (
              <details key={title} className="group border-b border-white/10 py-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground transition-colors hover:text-accent focus-visible:text-accent marker:hidden [&::-webkit-details-marker]:hidden">
                  {title}<span className="text-2xl font-light leading-none text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
