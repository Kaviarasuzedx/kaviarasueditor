"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const pathname = usePathname();
  return (
    <footer className="relative overflow-hidden border-t border-stroke bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[80vw] -translate-x-1/2 rounded-full bg-accent/[0.035] blur-[100px]" />
      <div className="site-container relative py-16 sm:py-24">
        {!['/', '/contact', '/about', '/services'].includes(pathname) && <div className="grid gap-12 border-b border-stroke pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">Have a story to tell?</p>
            <h2 className="display-title max-w-3xl text-[clamp(3.2rem,7.2vw,6.7rem)]">
              Let’s make<br /><span className="text-gradient">it unforgettable.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-2">
            <p className="mb-6 max-w-xs text-sm leading-7 text-secondary">
              From the first frame to the final sound cue, let’s create something with intention.
            </p>
            <Button href="/contact" magnetic showArrow size="lg">Start a project</Button>
          </div>
        </div>}

        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Link href="/" className="inline-block font-display text-2xl font-semibold tracking-display">
              KAVIARASU<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              Independent video editor &amp; motion designer. Built on rhythm, story and detail.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm md:col-span-5">
            {nav.map(({ href, label }) => (
              <Link key={href} href={href} className="group inline-flex w-fit items-center gap-2 text-secondary transition-colors hover:text-foreground">
                {label}<ArrowUpRight className="h-3.5 w-3.5 text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-stroke pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kaviarasu. All rights reserved.</p>
          <p className="flex items-center gap-1.5">Crafting stories, frame by frame <MoveUpRight className="h-3 w-3 text-accent" aria-hidden="true" /></p>
        </div>
      </div>
    </footer>
  );
}
