export type ClientProject = { id: string; name: string; items: string[]; stack: string[] };

export const internship = {
  role: "Software Development Intern",
  company: "Matchbest Software",
  location: "Haryana, India",
  duration: "Dec 2025 to Mar 2026",
  projects: [
    {
      id: "ems",
      name: "EMS Portal",
      items: [
        "Built the Leave module: employees submit, track and monitor leave requests with real-time status and admin approval flows.",
        "Built the Reimbursement module: expense claims with document uploads and a structured review and approval pipeline for finance.",
        "Wrote REST APIs with role-based access control (RBAC) across employee and admin roles.",
      ],
      stack: ["Next.js", "TypeScript", "REST APIs", "RBAC"],
    },
    {
      id: "mav",
      name: "Maverickservices",
      items: [
        "Built responsive UI components for Maverickservices with Next.js and Tailwind CSS.",
        "Made them work across browsers and on mobile.",
      ],
      stack: ["Next.js", "Tailwind CSS", "Responsive UI"],
    },
    {
      id: "ava",
      name: "Ava CRM",
      items: [
        "Built interactive dashboards, lead tracking modules and client data features, frontend and backend.",
        "Used PostgreSQL with Prisma ORM for fast data retrieval and storage.",
      ],
      stack: ["PostgreSQL", "Prisma", "Dashboards"],
    },
  ] satisfies ClientProject[],
};

// Points on the career tape, as decimal years (2026.5 = mid 2026).
export const milestones = [
  { t: 2022.03, title: "B.Tech CSE begins", sub: "St. Andrews Institute", row: "hi" },
  { t: 2025.5, title: "Job Portal shipped", sub: "MERN · API −25%", row: "lo" },
  { t: 2026.5, title: "B.Tech done", sub: "CGPA 7.75 · '26", row: "hi" },
  { t: 2026.8, title: "TaskFlow + Pilot CLI", sub: "Oct 2026", row: "lo" },
] as const;

export const internshipSpan = { from: 2025.917, to: 2026.25 };
export const now = 2026.81;
