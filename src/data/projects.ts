export type Integration = "ai" | "eval" | "mongo" | "docker" | "auth";

export type Project = {
  id: string;
  title: string;
  status: "live" | "in progress";
  tag: string; // pill on the wire
  color: string;
  repoName: string;
  kpi: string;
  description: string;
  stack: string[];
  integrations: Integration[];
  preview: "terminal" | "board" | "list";
  liveUrl?: string;
  repoUrl: string;
  caseStudyUrl?: string;
};

export const projects: Project[] = [
  {
    id: "pilot",
    title: "Pilot CLI",
    status: "in progress",
    tag: "AI agent",
    color: "#ff6b1a",
    repoName: "pilot-cli/README.md",
    kpi: "evals 0.78 → 1.0",
    description:
      "Terminal AI coding agent with tool calling, an approval prompt before risky actions, and evals that score tool choice.",
    stack: ["TypeScript", "AI SDK", "Gemini", "Ink", "Zod", "Laminar"],
    integrations: ["ai", "eval"],
    preview: "terminal",
    repoUrl: "https://github.com/Subhash575/pilot-cli",
    caseStudyUrl: "/projects/pilot-cli",
  },
  {
    id: "task",
    title: "TaskFlow",
    status: "live",
    tag: "Full-stack",
    color: "#3d8a6a",
    repoName: "task-management-system",
    kpi: "308 tests",
    description:
      "Jira-style Kanban with drag-and-drop, secure file attachments, IDOR-safe auth and optimistic UI updates.",
    stack: ["React", "Node.js", "Express", "MongoDB", "TanStack Query", "Docker"],
    integrations: ["mongo", "docker", "auth"],
    preview: "board",
    liveUrl: "https://task-management-system-six-psi.vercel.app",
    repoUrl: "https://github.com/Subhash575/task-management-system",
  },
  {
    id: "job",
    title: "Job Portal",
    status: "live",
    tag: "MERN",
    color: "#7c5cff",
    repoName: "job_portal_backend",
    kpi: "API −25%",
    description:
      "MERN hiring platform with JWT auth and an admin dashboard. Indexing and pagination cut average API time by 25%.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    integrations: ["mongo", "auth"],
    preview: "list",
    liveUrl: "https://job-portal-frontend-lyart.vercel.app",
    repoUrl: "https://github.com/Subhash575/job_portal_backend",
  },
];

export const integrations: { id: Integration; name: string; sub: string }[] = [
  { id: "ai", name: "AI SDK", sub: "+ Gemini" },
  { id: "eval", name: "Evals", sub: "Laminar" },
  { id: "mongo", name: "MongoDB", sub: "data" },
  { id: "docker", name: "Docker", sub: "ship" },
  { id: "auth", name: "JWT auth", sub: "secure" },
];
