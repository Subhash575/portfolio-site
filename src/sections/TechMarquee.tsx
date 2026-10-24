import type { IconType } from "react-icons";
import {
  SiDocker,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { techStack, type Tech } from "@/data/skills";

const icons: Record<Tech, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Prisma: SiPrisma,
  Docker: SiDocker,
  "Tailwind CSS": SiTailwindcss,
  "AI SDK": SiVercel,
};

export default function TechMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...techStack, ...techStack];
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <p className="sr-only">Tech stack: {techStack.join(", ")}</p>
      <div className="animate-marquee flex w-max items-center gap-10" aria-hidden="true">
        {items.map((name, i) => {
          const Icon = icons[name];
          return (
            <span key={i} className="flex items-center gap-2 font-bold text-[#8a8a8a]">
              <Icon className="text-lg" />
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
