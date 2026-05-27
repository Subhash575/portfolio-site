export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  contributions: string[];
  techStack: string[];
};

export const experiences: Experience[] = [
  {
    id: "matchbest",
    role: "Software Development Intern",
    company: "Matchbest Software",
    duration: "Dec 2025 – Mar 2026",
    description:
      "Engineered key modules of an Employee Management System and built responsive UI for client projects, contributing to production-level applications used by real teams.",
    contributions: [
      "Architected the Leave Application module — empowering employees to submit, track, and monitor leave requests with real-time status updates and admin approval workflows.",
      "Implemented the Reimbursement Application module — streamlining expense claim submissions with document uploads and equipping finance teams with a structured review and approval pipeline.",
      "Crafted RESTful APIs and enforced role-based access control (RBAC) to safeguard data security across employee and admin roles.",
      "Built responsive UI components for Maverickservices using Next.js and Tailwind CSS, ensuring cross-browser compatibility and seamless mobile responsiveness.",
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
    ],
  },
];
