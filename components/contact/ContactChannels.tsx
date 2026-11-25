import { ArrowUpRight, AtSign, Instagram, Linkedin, Mail, MessageCircle, Youtube, Clapperboard } from "lucide-react";
import { contactLinks, safeSocialUrl } from "@/lib/contact-links";

const links = [
  { title: "Email", hint: "For detailed creative briefs", icon: Mail, href: contactLinks.email ? `mailto:${contactLinks.email}` : null, label: contactLinks.email || "Address not connected" },
  { title: "WhatsApp", hint: "For quick conversations", icon: MessageCircle, href: /^\d{8,15}$/.test(contactLinks.whatsapp) ? `https://wa.me/${contactLinks.whatsapp}` : null, label: "Start a chat" },
  { title: "Instagram", hint: "Short-form creative updates", icon: Instagram, href: safeSocialUrl(contactLinks.instagram), label: "View Instagram" },
  { title: "YouTube", hint: "Video stories and edits", icon: Youtube, href: safeSocialUrl(contactLinks.youtube), label: "Watch on YouTube" },
  { title: "LinkedIn", hint: "Agencies & collaborations", icon: Linkedin, href: safeSocialUrl(contactLinks.linkedin), label: "Connect on LinkedIn" },
  { title: "fiverr", hint: "Motion and creative work", icon: Clapperboard, href: safeSocialUrl(contactLinks.behance), label: "Explore fiverr" },
];

export function ContactChannels() {
  const available = links.filter((link) => link.href).length;
  return (
    <section aria-labelledby="contact-channels-title" className="mt-16 border-t border-white/10 pt-12 lg:mt-24">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Beyond the form</p>
          <h2 id="contact-channels-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Elsewhere on the internet<span className="text-accent">.</span></h2>
        </div>
        <p className="max-w-[290px] text-xs leading-6 text-muted">{available === 0 ? "Direct contact details can be activated using the site's environment configuration." : "Prefer a different channel? Choose whichever works best for you."}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ title, hint, icon: Icon, href, label }) => {
          const content = <>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-accent"><Icon size={19} aria-hidden="true" /></span>
            <span className="mt-5 block text-base font-semibold text-foreground">{title}</span>
            <span className="mt-1 block text-xs leading-5 text-secondary">{hint}</span>
            <span className={`mt-6 flex items-center gap-2 text-xs ${href ? "text-accent" : "text-muted"}`}>{href ? label : "Link not configured"}{href && <ArrowUpRight size={14} aria-hidden="true" />}</span>
          </>;
          return href ? (
            <a key={title} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="group rounded-card border border-white/10 bg-[#111111] p-6 transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" aria-label={`Open ${title}: ${label}`}>{content}</a>
          ) : (
            <div key={title} className="rounded-card border border-white/[0.06] bg-[#101010] p-6 opacity-65" aria-label={`${title} is not configured`}>{content}</div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs text-muted"><AtSign size={14} aria-hidden="true" /> Social links are only enabled when a real destination is configured.</div>
    </section>
  );
}
