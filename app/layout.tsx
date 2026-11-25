import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { inter } from "@/lib/fonts";
import { getSiteUrl, isPublicSiteConfigured, siteDescription, siteName, siteTitle } from "@/lib/seo";
import "./globals.css";
import "lenis/dist/lenis.css";

const publicSite = isPublicSiteConfigured();

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteTitle,
    template: "%s | Kaviarasu",
  },
  description: siteDescription,
  applicationName: "Kaviarasu Portfolio",
  authors: [{ name: "Kaviarasu" }],
  creator: "Kaviarasu",
  publisher: "Kaviarasu",
  ...(publicSite ? { alternates: { canonical: "/" } } : {}),
  robots: {
    index: publicSite,
    follow: publicSite,
    googleBot: {
      index: publicSite,
      follow: publicSite,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    title: siteTitle,
    description: siteDescription,
    ...(publicSite ? { url: "/" } : {}),
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  category: "portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${getSiteUrl().origin}/#creator`,
      name: "Kaviarasu",
      jobTitle: "Video Editor & Motion Designer",
      url: getSiteUrl().origin,
      knowsAbout: ["Video Editing", "Adobe Premiere Pro", "Adobe After Effects", "Motion Graphics", "Sound Design", "Commercial Video Production"],
    },
    {
      "@type": "WebSite",
      "@id": `${getSiteUrl().origin}/#website`,
      name: "Kaviarasu Portfolio",
      url: getSiteUrl().origin,
      description: siteDescription,
      author: { "@id": `${getSiteUrl().origin}/#creator` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
