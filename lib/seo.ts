import type { Metadata } from "next";

export const siteName = "Kaviarasu";
export const siteTitle = "Video Editor in Pondicherry | Kaviarasu – Freelance Video Editor & Motion Designer";
export const siteDescription = "Looking for a professional video editor in Pondicherry? Kaviarasu specializes in cinematic video editing, Instagram Reels, YouTube videos, commercials, social media ads, motion graphics, sound design and color grading.";

/** Require an explicit real HTTPS domain before inviting search indexing. */
export function getSiteUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  try {
    const url = new URL(value);
    if (!(["http:", "https:"].includes(url.protocol))) return new URL("http://localhost:3000");
    return new URL(url.origin);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export function isPublicSiteConfigured(): boolean {
  const url = getSiteUrl();
  const host = url.hostname.toLowerCase();
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()) &&
    url.protocol === "https:" &&
    host !== "localhost" && host !== "127.0.0.1" && host !== "0.0.0.0" &&
    !host.endsWith(".example") && !host.endsWith(".test") && !host.endsWith(".local");
}

export const pages = [
  { path: "/", label: "Home", description: "Cinematic video editing and motion design for brands, agencies, and creators.", priority: 1 },
  { path: "/work", label: "Work", description: "View Kaviarasu's editing specialties and clearly marked illustrative concepts.", priority: 0.9 },
  { path: "/about", label: "About", description: "Meet Kaviarasu and discover the story-first editing process and creative tools.", priority: 0.7 },
  { path: "/services", label: "Services", description: "Commercials, social video, YouTube edits, sound design, and motion graphics.", priority: 0.85 },
  { path: "/contact", label: "Contact", description: "Send a project inquiry to Kaviarasu for video editing and motion design.", priority: 0.8 },
] as const;

export function pageMetadata(path: (typeof pages)[number]["path"], title: string, description: string): Metadata {
  const publicSite = isPublicSiteConfigured();
  const socialTitle = title.startsWith("Kaviarasu") || title.includes("| Kaviarasu")
    ? title
    : `${title} | Kaviarasu`;
  return {
    title,
    description,
    ...(publicSite ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName,
      title: socialTitle,
      description,
      ...(publicSite ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
