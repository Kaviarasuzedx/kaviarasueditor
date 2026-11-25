"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en"><body style={{ margin: 0, padding: "12vh 7vw", background: "#0a0a0a", color: "#fafafa", fontFamily: "Arial, sans-serif" }}>
      <main>
        <p style={{ color: "#ffb800", letterSpacing: ".15em" }}>KAVIARASU / ERROR</p>
        <h1 style={{ fontSize: "clamp(2rem,6vw,5rem)" }}>Something interrupted the story.</h1>
        <p style={{ color: "#a1a1aa" }}>The site encountered an unexpected error.</p>
        <button type="button" onClick={reset} style={{ background: "#ffb800", color: "#0a0a0a", border: 0, borderRadius: 30, padding: "15px 25px", cursor: "pointer" }}>Try again</button>
      </main>
    </body></html>
  );
}
