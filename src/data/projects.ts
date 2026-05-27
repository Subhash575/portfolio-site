export type Project = {
  id: string;
  title: string;
  description: string;
  category?: string;
  problem?: string;
  solution?: string;
  impact?: string[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "job-portal",
    title: "MERN Job Portal",
    description:
      "A full-stack job portal enabling recruiters to post jobs and candidates to apply seamlessly, with real-time tracking and optimized performance.",
    category: "Web Platform",
    problem:
      "Job seekers and recruiters lack a streamlined platform to manage postings and applications efficiently. Existing solutions are cluttered and slow.",
    solution:
      "Built a full-stack MERN application with JWT-based authentication, role-based access control, an admin dashboard for managing job postings, candidate application tracking, and pagination with query optimization.",
    impact: [
      "API response time ↓ 25%",
      "Workflow efficiency ↑ 40%",
      "Production deployment via Vercel + Render",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveUrl: "https://job-portal-frontend-lyart.vercel.app/",
    repoUrl: "https://github.com/Subhash575/job_portal_backend",
    imageUrl: "/images/projects/job_portal.png",
    featured: true,
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    description:
      "Workflow-focused admin dashboard for leave requests, reimbursements, and role-based operations across teams.",
    category: "Business App",
    problem:
      "Manual HR workflows slow down approvals and make employee records harder to track at scale.",
    solution:
      "Developed modular workflows for leave and reimbursement operations with secure role-based permissions and clean dashboards.",
    impact: [
      "HR coordination ↓ significantly",
      "Approval visibility ↑ via status tracking",
    ],
    imageUrl: "/images/projects/ems_portal.png",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/Subhash575/ems-portal",
    liveUrl: "https://ems-portal-two.vercel.app",
    featured: false,
  },
  {
    id: "notes-api",
    title: "Notes App Backend API",
    description:
      "A RESTful backend API for managing notes with full CRUD operations, authentication, and clean architecture.",
    category: "Backend",
    problem:
      "Building a notes app requires a secure, scalable backend with proper authentication and data management.",
    solution:
      "Built a RESTful API with Node.js and Express featuring JWT authentication, CRUD operations, and structured error handling.",
    impact: [
      "Clean REST API architecture",
      "JWT secured endpoints",
      "Full CRUD operations",
    ],
    imageUrl: "/images/projects/note_api.png",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT"],
    repoUrl: "https://github.com/Subhash575/notes-api",
    liveUrl: "https://notes-api-01.onrender.com/about",
    featured: false,
  },
];
