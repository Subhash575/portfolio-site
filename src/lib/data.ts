import type { NavLink, Stat, SocialLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/subhash-rana-5724382b8/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/Subhash575", icon: "github" },
  { label: "Email", href: "mailto:subhash09468@gmail.com", icon: "mail" },
];

// Every number here must stay traceable to the CV or a public repo.
export const stats: Stat[] = [
  { value: "3", label: "apps shipped" },
  { value: "308", label: "automated tests", suffix: "+" },
  { value: "25", label: "faster API", suffix: "%" },
];

export const siteConfig = {
  name: "Subhash Rana",
  title: "Full-stack engineer",
  description:
    "Subhash Rana: full-stack engineer building AI coding agents and production web apps. SDE intern at Matchbest, B.Tech CSE '26. Open to SDE-1 roles.",
  bio: "From Hisar, Haryana. I build full-stack apps with Next.js and Node, and terminal AI agents that call tools, ask before risky actions, and get tested with evals.",
  email: "subhash09468@gmail.com",
  linkedin: "https://www.linkedin.com/in/subhash-rana-5724382b8/",
  github: "https://github.com/Subhash575",
  resume: "/cv/subhash_cv.pdf",
  url: "https://subhash.live",
};
