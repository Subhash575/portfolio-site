export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  contributions: string[];
  techStack: string[];
};

export const experiences: Experience[] = [
  {
    id: "matchbest",
    role: "Software Development Intern",
    company: "Matchbest Software",
    duration: "Dec 2025 – Mar 2026",
    location: "Haryana, India",
    contributions: [
      "Built the Leave and Reimbursement modules of an Employee Management System in Next.js: request tracking, document uploads and admin approval flows.",
      "Wrote REST APIs with role-based access control (RBAC) across employee and admin roles.",
      "Built dashboards, lead tracking and client data features for Ava CRM on PostgreSQL + Prisma.",
      "Built responsive UI components for Maverickservices with Next.js and Tailwind CSS.",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma"],
  },
];
