import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutIntro } from "@/components/about/AboutIntro";
import { SkillMatrix } from "@/components/about/SkillMatrix";
import { ValueProps, BehindTheScenes } from "@/components/about/AboutExtras";
import { CreativeToolkit } from "@/components/about/CreativeToolkit";
import { CreativeJourney } from "@/components/about/CreativeJourney";

export const metadata: Metadata = pageMetadata("/about", "About Kaviarasu", "Meet Kaviarasu, a video editor and motion designer with 2+ years of experience in storytelling, sound design and motion graphics.");

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <SkillMatrix />
      <CreativeToolkit />
      <CreativeJourney />
      <ValueProps />
      <BehindTheScenes />
    </>
  );
}
