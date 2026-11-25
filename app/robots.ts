import type { MetadataRoute } from "next";
import { getSiteUrl, isPublicSiteConfigured } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicSiteConfigured()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
