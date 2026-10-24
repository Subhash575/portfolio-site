export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "mail";
}
