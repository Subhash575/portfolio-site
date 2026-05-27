export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  problem?: string;
  solution?: string;
  impact?: string[];
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  contributions: string[];
  techStack: string[];
}

export interface Stat {
  value: string;
  label: string;
  icon?: string;
  suffix?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
