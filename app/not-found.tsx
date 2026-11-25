import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container flex min-h-screen flex-col justify-center py-24">
      <p className="eyebrow mb-6">404 / Lost frame</p>
      <h1 className="display-title text-hero">Wrong cut.</h1>
      <p className="mt-7 max-w-md text-secondary">The page you were looking for isn’t part of this story.</p>
      <Link href="/" className="btn-primary mt-9 w-fit">Back to home ↗</Link>
    </main>
  );
}
