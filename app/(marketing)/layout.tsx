import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/layout/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { RouteAnnouncer } from "@/components/motion/RouteAnnouncer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollProgress />
      <main id="main-content" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Cursor />
      <RouteAnnouncer />
    </SmoothScroll>
  );
}
