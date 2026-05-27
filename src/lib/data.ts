import type { NavLink, Stat, SocialLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/subhash-rana-5724382b8/",
    icon: "open_in_new",
  },
  { label: "GitHub", href: "https://github.com/Subhash575", icon: "code" },
  { label: "Email", href: "mailto:subhash09468@gmail.com", icon: "mail" },
];

export const stats: Stat[] = [
  { value: "3", label: "Apps Shipped", suffix: "+" },
  { value: "10", label: "GitHub Repos", suffix: "+" },
  { value: "5", label: "Tech Stacks", suffix: "+" },
  { value: "25", label: "Faster API Delivery", suffix: "%" },
];

export const siteConfig = {
  name: "Subhash Rana",
  title: "Full Stack Developer",
  tagline:
    "Crafting scalable web applications with a focus on performance, clean architecture, and user experience.",
  bio: "I'm a Computer Science undergraduate and full-stack developer specializing in the MERN stack. I have hands-on experience building scalable applications during my internship at Matchbest Software, where I developed real-world systems like employee management workflows. I enjoy solving complex problems, optimizing performance, and building intuitive user experiences.",
  email: "subhash09468@gmail.com",
  linkedin: "https://www.linkedin.com/in/subhash-rana-5724382b8/",
  github: "https://github.com/Subhash575",
};
