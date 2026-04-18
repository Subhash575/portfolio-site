"use client";

import { experiences } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20">
      <SectionHeading title="Experience" subtitle="My professional journey" />

      <div className="mt-10 flex flex-col gap-8 md:gap-10">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-8 rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {exp.role}
              </h3>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-0">
                {exp.duration}
              </span>
            </div>

            <h4 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
              {exp.company}
            </h4>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
              {exp.description}
            </p>

            <ul className="list-disc pl-5 space-y-3 mb-8 text-zinc-600 dark:text-zinc-400 marker:text-zinc-400">
              {exp.contributions.map((contribution, idx) => (
                <li key={idx} className="pl-2">
                  {contribution}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-white/10 mt-6">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
