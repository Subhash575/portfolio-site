"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean)),
    ) as string[];
    return ["All", ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <section id="projects" className="relative px-4 py-16 md:px-6 md:py-20">
      {/* Subtle background tint */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-surface-elevated/30" />

      <SectionHeading
        title="Selected Projects"
        subtitle="What I've been working on"
      />

      {/* ── Toolbar ── */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Count line */}
        <p className="text-sm text-muted">
          <span className="font-semibold text-primary">
            {filteredProjects.length}
          </span>{" "}
          project{filteredProjects.length !== 1 && "s"}
          {featuredCount > 0 && (
            <>
              {" "}
              ·{" "}
              <span className="font-semibold text-accent">
                {featuredCount}
              </span>{" "}
              featured
            </>
          )}
        </p>

        {/* Filter pills */}
        <div className="relative flex items-center gap-1.5 rounded-xl border border-subtle bg-surface-elevated p-1 flex-wrap sm:flex-nowrap">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`relative min-h-11 min-w-11 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                    : "text-muted hover:text-primary dark:hover:text-zinc-200"
                }`}
              >
                {category}
                {/* Active count bubble */}
                {isActive && (
                  <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-surface-elevated/20 px-1.5 py-0.5 text-[10px] font-bold leading-none">
                    {filteredProjects.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Project Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Empty state ── */}
      {filteredProjects.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="text-4xl">🗂️</div>
          <p className="text-sm font-medium text-muted">
            No projects in this category yet.
          </p>
        </div>
      )}
    </section>
  );
}
