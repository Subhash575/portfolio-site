"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.imageUrl);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="group"
    >
      <div className="relative mb-6 min-h-55 overflow-hidden rounded-4xl border border-outline-variant/25 bg-surface-container-high dark:bg-surface-container">
        {hasImage ? (
          <Image
            src={project.imageUrl as string}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full min-h-55 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full min-h-55 w-full bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-200 p-5 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
            <div className="h-full overflow-hidden rounded-2xl border border-zinc-300/80 bg-white shadow-inner dark:border-white/15 dark:bg-zinc-950">
              <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-2.5 dark:border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Preview
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="h-16 rounded-lg bg-zinc-100 dark:bg-white/5" />
                <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-white/10" />
                <div className="h-3 w-3/5 rounded bg-zinc-200 dark:bg-white/10" />
                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-white/10" />
                  <div className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
          <span className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
            {project.category}
          </span>
        </div>
      </div>

      <div className="px-1 sm:px-2">
        <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-on-surface-variant text-sm sm:text-base leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-primary/8 dark:bg-primary/15 text-primary text-xs font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition hover:bg-primary/15"
            >
              <span className="material-symbols-outlined text-base">code</span>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              <span className="material-symbols-outlined text-base">
                open_in_new
              </span>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
