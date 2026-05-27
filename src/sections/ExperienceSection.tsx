"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-7 md:py-8">
      <SectionHeading title="Experience" subtitle="My professional journey" />

      <div className="mt-12 relative">
        {/* ── Vertical timeline spine ── */}
        <div className="absolute left-0 md:left-[11.5rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent dark:via-white/10 hidden md:block" />

        <div className="flex flex-col gap-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative flex flex-col md:flex-row gap-4 md:gap-0 pb-12 last:pb-0"
            >
              {/* ── Duration column (left) ── */}
              <div className="hidden md:flex flex-col items-end pr-8 w-[11.5rem] shrink-0 pt-1">
                <span className="text-caption font-semibold tracking-widest uppercase text-muted dark:text-muted text-right leading-relaxed whitespace-nowrap">
                  {exp.duration}
                </span>
              </div>

              {/* ── Timeline dot ── */}
              <div className="hidden md:flex items-start justify-center w-6 shrink-0 pt-1.5">
                <div className="relative flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute w-4 h-4 rounded-full bg-accent/15 dark:bg-accent/20 group-hover:scale-150 transition-transform duration-500" />
                  {/* Inner dot */}
                  <div className="relative w-2 h-2 rounded-full bg-accent ring-2 ring-white dark:ring-zinc-950 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* ── Card ── */}
              <div className="md:pl-8 flex-1">
                {/* Mobile duration */}
                <span className="md:hidden inline-block mb-2 text-caption font-semibold tracking-widest uppercase text-muted dark:text-muted">
                  {exp.duration}
                </span>

                <div className="rounded-xl border border-subtle/80 bg-surface-elevated p-6 md:p-7 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-subtle/80 group-hover:-translate-y-0.5 bg-surface-elevated/60 dark:group-hover:border-white/[0.12]">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-h5 font-heading font-bold text-primary text-primary leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {/* Colored company dot */}
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <h4 className="text-body font-semibold text-accent">
                          {exp.company}
                        </h4>
                      </div>
                    </div>

                    {/* Index badge */}
                    <span className="self-start sm:self-auto shrink-0 text-caption font-bold tracking-widest uppercase text-muted dark:text-muted bg-surface-elevated dark:bg-surface-elevated/[0.06] px-2.5 py-1 rounded-lg">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-body leading-relaxed text-muted mb-5">
                    {exp.description}
                  </p>

                  {/* Contributions */}
                  <ul className="space-y-2.5 mb-6">
                    {exp.contributions.map((contribution, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-body text-secondary leading-relaxed"
                      >
                        {/* Custom bullet */}
                        <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-accent/60" />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-subtle">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-surface border border-subtle px-2.5 py-1 text-caption font-semibold text-secondary dark:bg-surface-elevated/[0.04] tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
