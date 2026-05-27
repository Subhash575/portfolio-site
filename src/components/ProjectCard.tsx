"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { TrendingUp, Code, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.imageUrl);
  const impactItems = (project.impact ?? []).slice(0, 2);
  const categoryLabel = project.category ?? "Uncategorized";

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-4 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:border-[rgba(255,255,255,0.08)] dark:bg-transparent dark:hover:shadow-lg"
    >
      <div className="relative mb-6 h-50 shrink-0 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-high dark:bg-surface-container">
        {hasImage ? (
          <Image
            src={project.imageUrl as string}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-200 p-5 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
            <div className="h-full overflow-hidden rounded-2xl border border-subtle/80 bg-surface shadow-inner">
              <div className="flex items-center gap-2 border-b border-subtle px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-muted">
                  Preview
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="h-16 rounded-lg bg-surface-elevated dark:bg-surface-elevated/5" />
                <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-surface-elevated/10" />
                <div className="h-3 w-3/5 rounded bg-zinc-200 dark:bg-surface-elevated/10" />
                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-surface-elevated/10" />
                  <div className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-surface-elevated/10" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex flex-wrap items-center gap-2">
          <span className="px-4 py-1.5 rounded-full bg-surface-elevated/15 backdrop-blur-md text-white text-caption font-bold uppercase tracking-widest">
            {categoryLabel}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-caption font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col grow px-1 sm:px-2">
        <h3 className="text-h4 font-heading font-bold text-on-surface mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-on-surface-variant text-body leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-accent/8 dark:bg-accent/15 text-accent text-caption font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.problem || project.solution || impactItems.length > 0) && (
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-surface-container-low px-4 py-3 dark:bg-white/5">
            {project.problem && (
              <div>
                <p className="text-caption font-bold uppercase tracking-wider text-on-surface-variant">
                  Problem
                </p>
                <p className="mt-1 text-small text-on-surface-variant">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-caption font-bold uppercase tracking-wider text-on-surface-variant">
                  Solution
                </p>
                <p className="mt-1 text-small text-on-surface-variant">
                  {project.solution}
                </p>
              </div>
            )}
            {impactItems.length > 0 && (
              <div>
                <p className="text-caption font-bold uppercase tracking-wider text-on-surface-variant">
                  Impact
                </p>
                <ul className="mt-1 space-y-1 text-small text-on-surface-variant">
                  {impactItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-6 flex flex-wrap gap-4">
          {project.repoUrl && project.repoUrl !== "" && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg border border-outline-variant bg-transparent px-4 py-2 text-small font-semibold tracking-wide text-on-surface hover:bg-surface-elevated transition-colors duration-200"
            >
              <Code className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-small font-medium tracking-wide text-white transition-colors duration-200 hover:bg-indigo-600"
            >
              <ExternalLink className="w-4 h-4" />
              {project.category === "Backend" ? "Live API" : "Live Demo"}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
