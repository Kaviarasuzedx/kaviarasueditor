"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { WorkCard } from "./WorkCard";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { portfolioProjects, workFilters, type Project, type WorkFilter } from "@/data/projects";

export function WorkGallery() {
  const [selectedFilter, setSelectedFilter] = useState<WorkFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reducedMotion = useReducedMotion();
  const visibleProjects = useMemo(() =>
    selectedFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.filters.includes(selectedFilter)),
  [selectedFilter]);

  return (
    <>
      <div className="site-container pb-24 pt-16 sm:pb-32 sm:pt-28">
        <section data-scroll-section aria-labelledby="work-title">
          <div className="mb-12 grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
            <div className="[container-type:inline-size] lg:col-span-9">
              <p className="eyebrow mb-4 sm:mb-5">01 / Selected frames — sample gallery</p>
              <h1 id="work-title" className="display-title max-w-5xl text-[length:min(clamp(3.4rem,10vw,8.75rem),13.4cqi)] leading-[0.89]">
                Work that<br /><span className="text-gradient whitespace-nowrap">moves people.</span>
              </h1>
            </div>
            <div className="lg:col-span-3 lg:pb-3">
              <p className="text-sm leading-7 text-secondary">
                Big-screen storytelling. Small-screen impact. An editorial gallery of sample treatments across the formats I create.
              </p>
            </div>
          </div>

          <div
            className="mb-9 rounded-card border border-accent/20 bg-accent/[.045] px-5 py-4 text-xs leading-6 text-secondary sm:px-6"
            role="note"
          >
            <strong className="font-semibold text-accent">My Portfolio:</strong>{" "}
            This collection showcases my video editing, motion graphics, animation, and social media advertising projects. Each video highlights my creativity, editing skills, storytelling, and visual design using Adobe Premiere Pro and After Effects.
          </div>

          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-7 gap-y-5 border-b border-stroke pb-6">
            <div className="flex min-w-0 items-center gap-3">
              <SlidersHorizontal className="shrink-0 text-accent" size={19} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-secondary">Filter by discipline</p>
            </div>
            <span className="text-[11px] uppercase tracking-[.17em] text-muted" role="status" aria-live="polite">
              {visibleProjects.length} of {portfolioProjects.length} concepts
            </span>
          </div>

          <div role="group" aria-label="Filter work by project type" className="mb-12 flex flex-wrap gap-2.5 sm:mb-14">
            {workFilters.map((filter) => {
              const active = filter === selectedFilter;
              const count = filter === "All"
                ? portfolioProjects.length
                : portfolioProjects.filter((item) => item.filters.includes(filter)).length;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedFilter(filter)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 ${
                    active
                      ? "border-accent bg-accent text-[#0a0a0a]"
                      : "border-white/15 bg-white/[.025] text-secondary hover:border-white/40 hover:text-white"
                  }`}
                >
                  {filter} <span className={`text-[10px] tabular-nums ${active ? "text-black/70" : "text-muted"}`}>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="work-results" data-scroll-section aria-label={`${selectedFilter} project concepts`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedFilter}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
            >
              {visibleProjects.length ? (
                <div className="columns-1 gap-x-6 md:columns-2 xl:columns-3 xl:gap-x-8">
                  {visibleProjects.map((project) => (
                    <WorkCard key={project.slug} project={project} onOpen={setSelectedProject} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-card border border-stroke py-24 text-center">
                  <h2 className="font-display text-2xl font-semibold">No projects in this category</h2>
                  <p className="mt-3 text-sm text-secondary">Explore the other editing styles in the demo gallery.</p>
                  <button type="button" className="btn-secondary mt-7" onClick={() => setSelectedFilter("All")}>Show all concepts</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        <section data-scroll-section aria-labelledby="work-inquiry-title" className="mt-14 flex flex-col justify-between gap-6 border-t border-stroke pt-9 sm:flex-row sm:items-center">
          <div>
            <h2 id="work-inquiry-title" className="font-display text-2xl font-semibold tracking-display">Have a story in mind?</h2>
            <p className="mt-2 text-sm text-secondary">Tell me the brief. I&apos;ll help shape the edit.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-black transition-colors hover:bg-[#ffd15a]">
            Start a project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </div>
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
