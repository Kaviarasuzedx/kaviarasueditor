"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CONTACT_CAPTCHA_ACTION } from "@/lib/contact";

type Turnstile = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "dark";
    size: "normal" | "compact";
    callback: (token: string) => void;
    "response-field": false;
    "error-callback": () => void;
    "expired-callback": () => void;
    "timeout-callback": () => void;
  }) => string;
  remove: (widgetId: string) => void;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

export function ContactCaptcha({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!scriptReady || !siteKey || !container.current) return;
    const element = container.current;
    const turnstile = (window as Window & { turnstile?: Turnstile }).turnstile;
    if (!turnstile) {
      setError("Human verification could not load. Refresh the page to try again.");
      return;
    }

    let active = true;
    let widgetId: string | undefined;
    function invalidate(message: string) {
      if (!active) return;
      onToken("");
      setError(message);
    }

    try {
      widgetId = turnstile.render(element, {
        sitekey: siteKey,
        action: CONTACT_CAPTCHA_ACTION,
        theme: "dark",
        size: element.clientWidth < 300 ? "compact" : "normal",
        "response-field": false,
        callback: (token) => {
          if (!active) return;
          onToken(token);
          setError("");
        },
        "error-callback": () => invalidate("Human verification hit a problem and will retry automatically."),
        "expired-callback": () => invalidate("Human verification expired and is refreshing."),
        "timeout-callback": () => invalidate("Human verification timed out and is refreshing."),
      });
    } catch {
      invalidate("Human verification could not load. Refresh the page to try again.");
    }

    return () => {
      active = false;
      if (widgetId) turnstile.remove(widgetId);
    };
  }, [onToken, scriptReady]);

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-colors hover:border-accent/60 hover:bg-accent/5 focus-within:border-accent/60 focus-within:bg-accent/5" role="group" aria-labelledby="contact-verification-label">
      <p id="contact-verification-label" className="mb-2 text-sm font-medium">Human verification <span aria-hidden="true" className="text-accent">*</span></p>
      {siteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
            onError={() => setError("Human verification could not load. Refresh the page to try again.")}
          />
          <div ref={container} className="contact-captcha-widget" />
          {error && <p role="status" className="mt-2 text-xs text-red-300">{error}</p>}
        </>
      ) : <p className="text-xs text-secondary">Human verification is unavailable. Please use a direct contact link.</p>}
    </div>
  );
}
