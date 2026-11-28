import { contactLinks, safeSocialUrl } from "@/lib/contact-links";
import { ContactLogoDock } from "./ContactLogoDock";

const socialLinks = [
  { logo: "discord", url: safeSocialUrl(contactLinks.discord), label: "Discord profile" },
  { logo: "instagram", url: safeSocialUrl(contactLinks.instagram), label: "Instagram profile" },
  { logo: "telegram", url: safeSocialUrl(contactLinks.telegram), label: "Telegram profile" },
  { logo: "gmail", url: contactLinks.email ? `mailto:${contactLinks.email}` : "", label: "Email" },
  { logo: "linkedin", url: safeSocialUrl(contactLinks.linkedin), label: "LinkedIn profile" },
  { logo: "x-black", url: safeSocialUrl(contactLinks.x), label: "X profile" },
];

export function ContactChannels() {
  return (
    <section className="mt-14 text-center sm:mt-20" aria-labelledby="contact-social-heading">
      <p className="eyebrow">Beyond the form</p>
      <h2 id="contact-social-heading" className="mt-3 font-display text-3xl font-semibold tracking-display sm:text-4xl">
        Elsewhere on the internet<span className="text-accent">.</span>
      </h2>
      <ContactLogoDock links={socialLinks} />
    </section>
  );
}
