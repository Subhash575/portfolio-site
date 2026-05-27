export type SkillGroup = {
  category: string;
  skills: { name: string; icon?: string; label?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind CSS", icon: "🎨" },
    ],
  },
  {
    category: "backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "⚡" },
      { name: "REST APIs", icon: "🔗" },
    ],
  },
  {
    category: "database",
    skills: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Prisma ORM", icon: "◆" },
    ],
  },
  {
    category: "tools",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "Framer Motion", icon: "🎞️" },
    ],
  },
];
