import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { siteConfig } from "@/lib/data";
import Reveal from "@/components/Reveal";

function Preview({ kind }: { kind: Project["preview"] }) {
  if (kind === "terminal") {
    return (
      <div className="h-28 bg-dark p-3 font-mono text-[11px] leading-relaxed text-[#d4d4d4]">
        <span className="text-orange">$</span> pilot &quot;what time is it?&quot;
        <br />
        <span className="text-[#888]">› tool: dateTime · approve? y</span>
        <br />
        <span className="text-[#4ade80]">✓ done</span>
      </div>
    );
  }
  if (kind === "board") {
    return (
      <div className="flex h-28 gap-1.5 bg-tint p-3" aria-hidden="true">
        {[2, 3, 1].map((n, col) => (
          <div key={col} className="flex flex-1 flex-col gap-1 bg-white p-1.5">
            {Array.from({ length: n }, (_, i) => (
              <div key={i} className={`h-2 ${col === 1 && i === 0 ? "bg-orange" : "bg-peach"}`} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-28 flex-col gap-1.5 bg-[#fafafa] p-3" aria-hidden="true">
      {["bg-orange", "bg-ink"].map((c) => (
        <div key={c} className="flex items-center gap-1.5 border border-line bg-white p-1.5">
          <span className={`h-3.5 w-3.5 ${c}`} />
          <span className="h-1.5 flex-1 bg-line" />
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primary = project.caseStudyUrl
    ? { href: project.caseStudyUrl, label: "Case study" }
    : { href: project.liveUrl ?? project.repoUrl, label: "Visit site" };

  return (
    <article className="flex h-full flex-col overflow-hidden border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(194,65,12,0.45)]">
      <Preview kind={project.preview} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-extrabold">{project.title}</h3>
          <span className="rounded-full bg-tint px-2 py-0.5 text-[11px] font-bold text-orange-text">
            {project.featured ? `Featured · ${project.status}` : project.status}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <p className="mt-3 text-xs text-muted">
          {project.techStack.join(" · ")} · {project.year}
        </p>
        <div className="mt-4 flex gap-4 text-sm font-bold">
          <a href={primary.href} className="text-orange-text hover:underline">
            {primary.label} →
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:underline"
          >
            Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-hand text-2xl text-orange-text">things I built</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">Recent projects</h2>
        </div>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold text-orange-text"
        >
          All on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
