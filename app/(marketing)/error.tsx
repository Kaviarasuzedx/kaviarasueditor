"use client";

import { useEffect } from "react";

export default function MarketingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error("Marketing route failed:", error);
  }, [error]);

  return (
    <section className="site-container flex min-h-[65svh] flex-col items-start justify-center py-24" role="alert">
      <p className="eyebrow">Unexpected cut / error</p>
      <h1 className="display-title mt-6 text-5xl sm:text-7xl">A frame went missing.</h1>
      <p className="mt-7 max-w-xl leading-7 text-secondary">This page couldn&apos;t load. Please retry, or use the navigation to explore another section.</p>
      <button className="btn-primary mt-9" type="button" onClick={reset}>Try again ↗</button>
    </section>
  );
}
