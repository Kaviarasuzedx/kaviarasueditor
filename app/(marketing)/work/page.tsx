import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WorkGallery } from "@/components/work/WorkGallery";

export const metadata: Metadata = pageMetadata("/work", "Selected Work & Video Concepts", "Explore Kaviarasu’s video editing disciplines through clearly labeled creative concept examples for commercials, Reels and YouTube.");

export default function WorkPage() {
  return <WorkGallery />;
}
