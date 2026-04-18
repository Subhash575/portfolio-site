import type {
  NavLink,
  Project,
  Experience,
  Stat,
  SocialLink,
  Skill,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/subhash",
    icon: "open_in_new",
  },
  { label: "GitHub", href: "https://github.com/Subhash575", icon: "code" },
  { label: "Email", href: "mailto:subhash09468@gmail.com", icon: "mail" },
];

export const skills: Skill[] = [
  { name: "React.js", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "🔷", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express.js", icon: "⚡", category: "backend" },
  { name: "REST APIs", icon: "🔗", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "database" },
  { name: "PostgreSQL", icon: "🐘", category: "database" },
  { name: "Prisma ORM", icon: "◆", category: "database" },
  { name: "Git", icon: "📦", category: "tools" },
  { name: "Framer Motion", icon: "🎞️", category: "tools" },
];

export const stats: Stat[] = [
  { value: "3", label: "Apps Shipped", suffix: "+" },
  { value: "10", label: "GitHub Repos", suffix: "+" },
  { value: "5", label: "Tech Stacks", suffix: "+" },
  { value: "25", label: "Faster API Delivery", suffix: "%" },
];

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
      "Reduced API response time by 25%",
      "Improved job posting workflow efficiency by 40%",
      "Full production deployment on Vercel + Render",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    imageUrl: "/images/job-portal.webp",
    liveUrl: "https://job-portal-demo.vercel.app",
    repoUrl: "https://github.com/Subhash575/mern-job-portal",
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
      "Reduced manual coordination between HR and finance teams",
      "Improved approval visibility with status-based tracking",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/Subhash575/employee-management-system",
    liveUrl: "https://employee-management-demo.vercel.app",
  },
  {
    id: "portfolio-v2",
    title: "Developer Portfolio v2",
    description:
      "Performance-first personal portfolio with smooth motion, reusable components, and dark mode theming.",
    category: "Frontend",
    problem:
      "Generic portfolios often fail to communicate technical depth, performance awareness, and product thinking.",
    solution:
      "Designed and built a polished portfolio with structured sections, motion-driven UX, and modular UI primitives.",
    impact: [
      "Improved project storytelling and recruiter readability",
      "Created reusable design patterns for future showcases",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    repoUrl: "https://github.com/Subhash575/subhash_portfolio",
    liveUrl: "https://subhash-portfolio-demo.vercel.app",
  },
];

export const siteConfig = {
  name: "Subhash Rana",
  title: "Full Stack Developer",
  tagline:
    "Crafting scalable web applications with a focus on performance, clean architecture, and user experience.",
  bio: "I'm a Computer Science undergraduate and full-stack developer specializing in the MERN stack. I have hands-on experience building scalable applications during my internship at Matchbest Software, where I developed real-world systems like employee management workflows. I enjoy solving complex problems, optimizing performance, and building intuitive user experiences.",
  email: "subhash09468@gmail.com",
  linkedin: "https://linkedin.com/in/subhash",
  github: "https://github.com/Subhash575",
};
