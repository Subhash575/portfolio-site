// Shown in the hero's tech marquee: names only, no proficiency bars.
export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "Tailwind CSS",
  "AI SDK",
] as const;

export type Tech = (typeof techStack)[number];
