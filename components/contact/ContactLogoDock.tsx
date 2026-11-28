"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import styles from "./ContactChannels.module.css";

type SocialLink = { logo: string; url: string | null; label: string };

const hoverRadius = 1.9;
const spring = { stiffness: 430, damping: 26, mass: 0.55 };

function DockLogo({ link, index, pointer }: { link: SocialLink; index: number; pointer: MotionValue<number> }) {
  const distance = useTransform(pointer, (position) => index + 0.5 - position);
  const influence = useTransform(distance, (offset) => {
    const fraction = Math.min(Math.abs(offset) / hoverRadius, 1);
    return (1 + Math.cos(Math.PI * fraction)) / 2;
  });
  const scale = useSpring(useTransform(influence, (amount) => 1 + amount * 0.68), spring);
  const y = useSpring(useTransform(influence, (amount) => -19 * amount), spring);
  const x = useSpring(useTransform(() => Math.sign(distance.get()) * 17 * influence.get() * (1 - influence.get())), spring);
  const zIndex = useTransform(influence, (amount) => 1 + Math.round(amount * 10));
  const { logo, url, label } = link;
  const external = url?.startsWith("https:");
  const accessibleLabel = url ? label : `${label} (unavailable)`;

  return (
    <motion.li className={styles.item} style={{ zIndex }}>
      <a
        className={styles.link}
        href={url || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        role={url ? undefined : "link"}
        aria-disabled={url ? undefined : true}
        aria-label={external ? `${label} (opens in a new tab)` : accessibleLabel}
        title={accessibleLabel}
        data-logo={logo}
      >
        <motion.span className={styles.mark} style={{ x, y, scale }}>
          <Image src={`/contact/social-logos/${logo}.svg`} alt="" width={64} height={64} className={styles.logo} unoptimized />
        </motion.span>
      </a>
    </motion.li>
  );
}

export function ContactLogoDock({ links }: { links: SocialLink[] }) {
  const pointer = useMotionValue(-hoverRadius);
  const reducedMotion = useReducedMotion();

  function movePointer(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || reducedMotion) return;

    const firstItem = event.currentTarget.firstElementChild;
    if (!firstItem) return;
    const { left, width } = firstItem.getBoundingClientRect();
    pointer.set((event.clientX - left) / width);
  }

  function resetPointer() {
    pointer.set(-hoverRadius);
  }

  return (
    <div className={styles.dock}>
      <ul
        className={styles.row}
        aria-label="Contact and social links"
        role="list"
        onPointerMove={movePointer}
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
      >
        {links.map((link, index) => <DockLogo key={link.logo} link={link} index={index} pointer={pointer} />)}
      </ul>
    </div>
  );
}
