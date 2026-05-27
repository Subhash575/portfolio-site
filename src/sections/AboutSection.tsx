"use client";

import { motion } from "framer-motion";
import { siteConfig, stats } from "@/lib/data";
import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiFramer,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const categoryTitle: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
};

const categoryAccent: Record<string, string> = {
  frontend:
    "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  backend: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
  database:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  tools:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
};

const skillIcons: Record<string, React.ReactNode> = {
  "React.js": <FaReact className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="text-primary" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  "Express.js": <SiExpress className="text-primary" />,
  "REST APIs": <TbApi className="text-muted" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
  "Prisma ORM": <SiPrisma className="text-[#2D3748]" />,
  Git: <FaGitAlt className="text-[#F05032]" />,
  "Framer Motion": <SiFramer className="text-primary" />,
};

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="relative px-4 py-16 md:px-6 md:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
      >
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <SectionHeading title="About Me" subtitle="A brief introduction" />

      <div className="mt-1.5 flex flex-col items-stretch gap-12 lg:flex-row lg:items-stretch lg:gap-16">
        {/* ── Left column: Bio + Stats ── */}
        <div className="flex flex-1 flex-col gap-8">
          <p className="text-[1.05rem] leading-[1.85] tracking-[-0.01em] text-secondary">
            {siteConfig.bio}
          </p>

          <div className="flex-1 grid grid-cols-2 grid-rows-2 content-stretch gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>

        {/* ── Right column: Skills card ── */}
        <div className="h-full flex-1 rounded-xl border border-subtle bg-surface-elevated/70 p-6 backdrop-blur-sm md:p-8">
          {/* Card header */}
          <div className="mb-7 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-accent" />
            <h3 className="text-[1.05rem] font-semibold tracking-tight text-primary">
              Technical Skills
            </h3>
          </div>

          <div className="space-y-7">
            {skillGroups.map(
              ({ category, skills: list }) =>
                list.length > 0 && (
                  <div key={category}>
                    {/* Category label */}
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest ${categoryAccent[category]}`}
                      >
                        {categoryTitle[category]}
                      </span>
                      <div className="h-px flex-1 bg-surface-elevated dark:bg-surface-elevated/6" />
                    </div>

                    {/* Skill grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {list.map((skill) => {
                        return (
                          <div
                            key={skill.name}
                            title={skill.name}
                            className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-subtle bg-surface p-4 text-center transition-all duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-sm dark:bg-surface-elevated/4 dark:hover:border-accent"
                          >
                            <span
                              className="text-2xl flex items-center leading-none"
                              aria-hidden="true"
                            >
                              {skillIcons[skill.name] || skill.icon}
                            </span>
                            <span className="text-xs font-medium text-secondary group-hover:text-primary leading-tight">
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
