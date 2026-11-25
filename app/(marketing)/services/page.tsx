import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesIntro, ServiceShowcase } from "@/components/services/ServiceShowcase";
import { EditingProcess, QuoteTeaser, ServiceFAQ } from "@/components/services/ServiceDetails";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = pageMetadata(
  "/services",
  "Video Editing Services in Pondicherry & Puducherry",
  "Explore Kaviarasu’s video editing services in Pondicherry, including cinematic edits, Instagram Reels, YouTube videos, commercials, social media ads, motion graphics, sound design and color grading.",
);

export default function ServicesPage() {
  return (
    <>
      <ServicesIntro />
      <ServiceShowcase />
      <EditingProcess />
      <QuoteTeaser />
      <ServiceFAQ />
      <CTA />
    </>
  );
}
