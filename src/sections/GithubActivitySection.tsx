import SectionHeading from "@/components/SectionHeading";
import { FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { skillGroups } from "@/data/skills";

const categoryTitle: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
};

const categoryAccent: Record<string, string> = {
  frontend:
    "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  backend: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
  database:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
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
};

export default function GithubActivitySection() {
  return (
    <section id="github-activity" className="py-7 md:py-8">
      <SectionHeading
        title="GitHub Activity"
        subtitle="My open-source contributions and coding journey"
      />

      <div className="mt-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
          {/* Left Column: Contribution Activity Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[rgba(255,255,255,0.08)] dark:bg-transparent flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaGithub className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-primary">
                  Contribution Activity
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-container-high dark:bg-surface-elevated text-secondary">
                Last Year
              </span>
            </div>

            {/* Body: Dummy Heatmap */}
            <div className="bg-surface-container-lowest dark:bg-surface-container/50 rounded-xl border border-subtle/50 p-4 mb-6 overflow-x-auto w-full">
              <div className="min-w-[600px] flex gap-1">
                {Array.from({ length: 52 }).map((_, col) => (
                  <div key={col} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, row) => {
                      // Deterministic dummy shading for consistent appearance
                      const heat = ((col * 13 + row * 7) % 100) / 100;
                      const level =
                        heat > 0.8
                          ? "bg-emerald-500"
                          : heat > 0.6
                            ? "bg-emerald-400/80"
                            : heat > 0.4
                              ? "bg-emerald-300/60"
                              : "bg-surface-elevated dark:bg-surface-elevated/50";
                      return (
                        <div
                          key={row}
                          className={`w-3 h-3 rounded-sm ${level}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer: Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "482", label: "Contributions" },
                { value: "12", label: "Current Streak" },
                { value: "32", label: "Longest Streak" },
                { value: "114", label: "Active Days" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest dark:bg-surface-container rounded-xl p-3 flex flex-col border border-subtle hover:border-accent/40 shadow-sm transition-colors duration-300"
                >
                  <span className="text-xl font-heading font-black text-accent tabular-nums leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats & Technologies */}
          <div className="flex flex-col gap-6">
            {/* GitHub Statistics Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[rgba(255,255,255,0.08)] dark:bg-transparent flex flex-col">
              <h3 className="text-lg font-semibold text-primary mb-4">
                GitHub Statistics
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { value: "42K+", label: "Repositories" },
                  { value: "128", label: "Stars" },
                  { value: "85", label: "Pull Requests" },
                  { value: "64", label: "Issues Closed" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl font-heading font-black text-accent tabular-nums w-12 shrink-0">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase tracking-[0.15em] font-bold text-secondary leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Used Technologies Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[rgba(255,255,255,0.08)] dark:bg-transparent flex flex-col">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Most Used Technologies
              </h3>
              <div className="space-y-6">
                {skillGroups
                  .filter((group) => categoryTitle[group.category])
                  .map(
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
                          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {list.map((skill) => (
                              <div
                                key={skill.name}
                                title={skill.name}
                                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-subtle bg-surface p-3 text-center transition-all duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-sm dark:bg-surface-elevated/4 dark:hover:border-accent"
                              >
                                <span
                                  className="text-2xl flex items-center leading-none"
                                  aria-hidden="true"
                                >
                                  {skillIcons[skill.name] || skill.icon}
                                </span>
                                <span className="text-[10px] font-medium text-secondary group-hover:text-primary leading-tight">
                                  {skill.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
