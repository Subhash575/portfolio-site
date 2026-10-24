import { experiences } from "@/data/experience";
import Reveal from "@/components/Reveal";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#fffaf6] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-hand text-2xl text-orange-text">where I&apos;ve shipped</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">Experience</h2>
        </Reveal>
        {experiences.map((exp) => (
          <Reveal
            key={exp.id}
            className="mt-8 grid gap-6 border border-line bg-white p-6 md:grid-cols-[200px_1fr]"
          >
            <div>
              <p className="font-mono text-xs text-muted">{exp.duration}</p>
              <p className="mt-1 text-xs text-muted">{exp.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold">
                {exp.role} · <span className="text-orange-text">{exp.company}</span>
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {exp.contributions.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">{exp.techStack.join(" · ")}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
