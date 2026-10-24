// Side cards on the hero workbench. Every answer comes from the CV or public repos.

export const roleFit = {
  fs: { label: "Full-stack", level: 4, verdict: "Strong match", proof: "TaskFlow — React + Node + MongoDB, 308 tests.", skills: "React · Next.js · Node · PostgreSQL · MongoDB" },
  fe: { label: "Frontend", level: 3, verdict: "Good match", proof: "Next.js + Tailwind UIs at Matchbest (EMS, Maverickservices).", skills: "React · Next.js · TypeScript · Tailwind" },
  be: { label: "Backend", level: 4, verdict: "Strong match", proof: "REST APIs with RBAC; Job Portal API time cut 25%.", skills: "Node · Express · PostgreSQL · Prisma · JWT" },
  ai: { label: "AI / LLM", level: 3, verdict: "Good match", proof: "Pilot CLI — tool calling, approval prompt, evals 0.78 → 1.0.", skills: "AI SDK · Gemini · Zod · Evals" },
} as const;

export type Role = keyof typeof roleFit;

export const pilotFaq = {
  ai: { q: "AI agents?", a: "Built Pilot CLI: tool calling, approval prompt, evals 0.78 → 1.0." },
  docker: { q: "Docker?", a: "TaskFlow ships with Docker; apps run on Vercel and Render." },
  tests: { q: "Tests?", a: "TaskFlow has 308 automated frontend + backend tests." },
  hire: { q: "Available?", a: "Open to SDE-1 roles in 2026. Email subhash09468@gmail.com." },
} as const;

export type FaqKey = keyof typeof pilotFaq;

// shortcut: hand-copied from GitHub; update after notable pushes (or fetch at build time later).
export const recentCommits = [
  { msg: "Hardened deploy config + rate limiting", repo: "taskflow", date: "12 Oct" },
  { msg: "Added a safe dev seed script", repo: "taskflow", date: "12 Oct" },
  { msg: "Eval score 0.778 → 1.0", repo: "pilot-cli", date: "5 Oct" },
];
