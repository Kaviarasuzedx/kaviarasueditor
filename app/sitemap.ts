import type { MetadataRoute } from "next";
import { getSiteUrl, pages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return pages.map(({ path, priority }) => ({
    url: new URL(path, site).toString(),
    changeFrequency: path === "/work" ? "monthly" : "yearly",
    priority,
  }));
}
