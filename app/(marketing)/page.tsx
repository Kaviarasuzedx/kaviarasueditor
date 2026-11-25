import type { Metadata } from "next";
import { pageMetadata, siteDescription, siteTitle } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { Marquee } from "@/components/sections/Marquee";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { AudioWaveDivider } from "@/components/sections/AudioWaveDivider";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  ...pageMetadata("/", siteTitle, siteDescription),
  title: { absolute: siteTitle },
};

export default function HomePage() {
  return <>
    <Hero />
    <Showreel />
    <Marquee />
    <ServicesPreview />
    <FeaturedWork />
    <AudioWaveDivider />
    <Stats />
    <Testimonials />
    <CTA />
  </>;
}
