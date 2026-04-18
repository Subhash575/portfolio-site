"use client";

import { projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="rounded-3xl bg-surface-container-low/45 px-4 py-16 md:px-6 md:py-20 dark:bg-surface-container-lowest/30"
    >
      <SectionHeading
        title="Selected Projects"
        subtitle="What I've been working on"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
