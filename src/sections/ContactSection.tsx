import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/data";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";

const links = [
  { label: "LinkedIn", sub: "Connect", href: siteConfig.linkedin, icon: FaLinkedin, color: "text-[#0a66c2]" },
  { label: "GitHub", sub: "See the code", href: siteConfig.github, icon: FaGithub, color: "text-ink" },
  { label: "Resume", sub: "PDF · 1 page", href: siteConfig.resume, icon: FileText, color: "text-orange-text" },
];

const sticker =
  "animate-bob absolute hidden rounded-xl bg-white px-3 py-2 text-sm shadow-[0_10px_30px_-10px_rgba(20,20,20,0.3)] md:block";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-tint py-20 text-center">
      <div className={`${sticker} top-14 left-[8%] -rotate-3 [--r:-3deg]`}>
        <span className="text-green-700">●</span> Open to SDE-1 · 2026
      </div>
      <div className={`${sticker} top-28 right-[8%] rotate-3 [--r:3deg] [animation-delay:-2s]`}>
        <b className="text-orange-text">24h</b> <span className="text-muted">reply time</span>
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="font-hand text-3xl text-orange-text">let&apos;s talk</p>
          <svg aria-hidden="true" viewBox="0 0 40 40" className="mx-auto w-8">
            <path
              className="draw-path animate-draw"
              d="M8 4 C 30 8, 30 26, 18 34 M18 34 L 12 26 M18 34 L 26 30"
              fill="none"
              stroke="#c2410c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="mx-auto mt-2 max-w-md text-3xl leading-tight font-extrabold md:text-4xl">
            Have a role in mind? <span className="text-orange">Let&apos;s build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="relative text-xl font-extrabold break-all after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-25 after:bg-orange after:transition-transform after:duration-500 hover:after:scale-x-100 md:text-2xl"
          >
            {siteConfig.email}
          </a>
          <CopyEmail email={siteConfig.email} />
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-3">
          {links.map(({ label, sub, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border-[1.5px] border-ink bg-white p-4 transition duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_#ff6b1a]"
            >
              <Icon className={`h-6 w-6 shrink-0 ${color}`} aria-hidden="true" />
              <span>
                <b className="block text-sm">{label}</b>
                <span className="text-xs text-muted">{sub}</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
