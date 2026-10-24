import { Bot, LayoutDashboard, ShieldCheck } from "lucide-react";
import { siteConfig, stats } from "@/lib/data";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const services = [
  {
    icon: Bot,
    title: "AI agents",
    text: "Tool calling, approval flows and evals that measure tool choice.",
    className: "bg-orange text-[#1a0800]",
  },
  {
    icon: LayoutDashboard,
    title: "Full-stack apps",
    text: "Next.js, Node, PostgreSQL and MongoDB, with RBAC done right.",
    className: "bg-peach text-[#3a1604]",
  },
  {
    icon: ShieldCheck,
    title: "Tested and secure",
    text: "JWT in HTTP-only cookies, IDOR-safe auth and real test suites.",
    className: "bg-white text-ink",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-dark py-20 text-center text-white">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="font-hand text-2xl text-orange">a bit about me</p>
          <h2 className="mt-1 text-3xl font-extrabold md:text-4xl">
            About <span className="text-orange">me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#b5b5b5]">{siteConfig.bio}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-4xl font-extrabold text-orange">
                <CountUp value={Number(s.value)} />
                {s.suffix}
              </span>
              <span className="max-w-[70px] text-left text-xs leading-tight text-[#b5b5b5]">
                {s.label}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="mt-14 mb-5 text-lg font-bold">What I do</h3>
          <div className="grid gap-4 text-left sm:grid-cols-3">
            {services.map(({ icon: Icon, title, text, className }) => (
              <div
                key={title}
                className={`p-5 transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <p className="mt-3 font-extrabold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed opacity-85">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
