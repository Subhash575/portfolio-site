"use client";

import { siteConfig, skills, stats } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";

const categoryTitle: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
};

const proficiency: Record<string, number> = {
  "React.js": 3,
  "Next.js": 3,
  TypeScript: 3,
  "Tailwind CSS": 3,
  "Node.js": 3,
  "Express.js": 2,
  "REST APIs": 3,
  MongoDB: 3,
  PostgreSQL: 2,
  "Prisma ORM": 2,
  Git: 3,
  "Framer Motion": 2,
};

export default function AboutSection() {
  const groupedSkills = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    database: skills.filter((skill) => skill.category === "database"),
    tools: skills.filter((skill) => skill.category === "tools"),
  };

  return (
    <section
      id="about"
      className="rounded-3xl bg-surface-container-low/50 px-4 py-16 md:px-6 md:py-20 dark:bg-surface-container-lowest/40"
    >
      <SectionHeading title="About Me" subtitle="A brief introduction" />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {siteConfig.bio}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900/50 md:p-8">
            <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Technical Skills
            </h3>

            <div className="space-y-5">
              {Object.entries(groupedSkills).map(([category, list]) => (
                <div key={category}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {categoryTitle[category]}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {list.map((skill, index) => (
                      <div
                        key={skill.name}
                        className={`flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-white/5 ${
                          index % 3 === 0 ? "text-xs" : ""
                        } ${index % 3 === 1 ? "text-sm" : ""} ${index % 3 === 2 ? "text-[13px]" : ""}`}
                      >
                        <span aria-hidden="true">{skill.icon}</span>
                        <span>{skill.name}</span>
                        <span className="ml-1 flex items-center gap-1">
                          {[0, 1, 2].map((dot) => (
                            <span
                              key={dot}
                              className={`h-1.5 w-1.5 rounded-full ${
                                dot < (proficiency[skill.name] ?? 2)
                                  ? "bg-primary"
                                  : "bg-zinc-300 dark:bg-zinc-600"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
