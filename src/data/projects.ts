export type Project = {
  id: string;
  title: string;
  description: string;
  status: "Live" | "In progress";
  year: number;
  techStack: string[];
  preview: "terminal" | "board" | "list";
  liveUrl?: string;
  repoUrl: string;
  caseStudyUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "pilot-cli",
    title: "Pilot CLI",
    description:
      "Terminal AI coding agent with tool calling, an approval prompt, and evals that score tool choice (0.778 → 1.0).",
    status: "In progress",
    year: 2026,
    techStack: ["TypeScript", "AI SDK", "Ink", "Zod"],
    preview: "terminal",
    repoUrl: "https://github.com/Subhash575/pilot-cli",
    caseStudyUrl: "/projects/pilot-cli",
    featured: true,
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    description:
      "Jira-style Kanban with drag-and-drop, secure file attachments, IDOR-safe auth and 308 automated tests.",
    status: "Live",
    year: 2026,
    techStack: ["React", "Node.js", "MongoDB", "Docker"],
    preview: "board",
    liveUrl: "https://task-management-system-six-psi.vercel.app",
    repoUrl: "https://github.com/Subhash575/task-management-system",
    featured: false,
  },
  {
    id: "job-portal",
    title: "Job Portal",
    description:
      "MERN hiring platform with JWT auth and an admin dashboard. Indexing and pagination cut API time by 25%.",
    status: "Live",
    year: 2025,
    techStack: ["React", "Express", "MongoDB", "JWT"],
    preview: "list",
    liveUrl: "https://job-portal-frontend-lyart.vercel.app",
    repoUrl: "https://github.com/Subhash575/job_portal_backend",
    featured: false,
  },
];
