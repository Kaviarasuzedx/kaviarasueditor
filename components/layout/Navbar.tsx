"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 border-b border-white/[0.07] transition-[background-color,box-shadow] duration-300",
        scrolled || open ? "bg-background/95 shadow-[0_10px_40px_rgba(0,0,0,0.30)] backdrop-blur-xl" : "bg-background/85 backdrop-blur-lg"
      )}
    >
      <div className="site-container flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Kaviarasu home" className="relative z-10 shrink-0 font-display text-xl font-semibold tracking-[-0.055em] sm:text-2xl">
          KAVIARASU<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "group relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-offset-0",
                isActive(href) ? "text-foreground" : "text-secondary hover:text-foreground"
              )}
            >
              {label}
              <span aria-hidden="true" className={cn("absolute bottom-[5px] left-4 right-4 h-px origin-left bg-accent transition-transform duration-300", isActive(href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.13em] text-secondary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Open for projects
          </span>
          <Button href="/contact" size="sm" magnetic showArrow>Let’s talk</Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-accent lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
        className="absolute left-0 right-0 top-full border-b border-stroke bg-[#111111] px-5 pb-8 pt-3 shadow-[0_24px_40px_rgba(0,0,0,0.55)] lg:hidden"
      >
        <div className="mx-auto max-w-site">
          {links.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between border-b border-stroke px-2 py-4 font-display text-2xl font-medium transition-colors hover:text-accent",
                isActive(href) ? "text-accent" : "text-foreground"
              )}
            >
              <span><span className="mr-4 align-middle font-sans text-[10px] text-muted">0{index + 1}</span>{label}</span>
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          ))}
          <p className="mt-7 text-xs uppercase tracking-[0.2em] text-secondary">Films. Frames. Feeling.</p>
        </div>
      </nav>
    </header>
  );
}
