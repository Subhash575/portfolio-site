// "What I do" groups: hovering a card lights up the skills and stats in its group.
export type Group = "ai" | "fs" | "qa";

export const skills: { name: string; groups: Group[] }[] = [
  { name: "TypeScript", groups: ["ai", "fs"] },
  { name: "React", groups: ["fs"] },
  { name: "Next.js", groups: ["fs"] },
  { name: "Node.js", groups: ["fs"] },
  { name: "Express", groups: ["fs"] },
  { name: "PostgreSQL", groups: ["fs"] },
  { name: "Prisma", groups: ["fs"] },
  { name: "MongoDB", groups: ["fs"] },
  { name: "AI SDK", groups: ["ai"] },
  { name: "Tool calling", groups: ["ai"] },
  { name: "Evals", groups: ["ai", "qa"] },
  { name: "Zod", groups: ["ai", "qa"] },
  { name: "JWT", groups: ["qa"] },
  { name: "REST + RBAC", groups: ["qa"] },
  { name: "Docker", groups: ["qa"] },
  { name: "C++", groups: [] },
];

export const proofStats: { value: number; display?: string; suffix?: string; label: string; source: string; group: Group }[] = [
  { value: 308, suffix: "+", label: "automated tests", source: "TaskFlow suite", group: "qa" },
  { value: 25, suffix: "%", label: "faster API", source: "Job Portal", group: "fs" },
  { value: 3, label: "apps shipped", source: "at Matchbest", group: "fs" },
  { value: 1, display: "1.0", label: "eval score", source: "Pilot CLI evals", group: "ai" },
];
