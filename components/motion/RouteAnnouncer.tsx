"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Announce client-side navigation, without stealing focus on initial hydration. */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const initial = useRef(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    // Document titles are updated by Next metadata, asynchronously on navigation.
    const label = pathname === "/" ? "Home" : pathname.split("/").filter(Boolean).map((part) => part.replace(/-/g, " ")).join(" / ");
    setAnnouncement(`${label} page loaded`);
    const frame = requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>;
}
