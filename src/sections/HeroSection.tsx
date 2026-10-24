import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { SiReact, SiTypescript } from "react-icons/si";
import { siteConfig } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-24">
      {/* Long curve behind the hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 640 360"
        preserveAspectRatio="none"
      >
        <path
          className="draw-path animate-draw"
          d="M-10 300 C 120 220, 200 360, 330 250 S 560 120, 660 200"
          fill="none"
          stroke="#ffd2b8"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-hand text-3xl text-orange-text">Hi there,</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-1 text-5xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
              I&apos;m <span className="text-orange">{siteConfig.name}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Full-stack engineer building <b className="text-ink">AI coding agents</b>{" "}
              and production web apps. SDE intern at Matchbest, B.Tech CSE &apos;26.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-orange-btn py-1.5 pr-1.5 pl-5 font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-btn">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href={siteConfig.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-2.5 font-bold transition-colors hover:bg-ink hover:text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto h-[380px] w-full max-w-[420px]">
          {/* Orange blob behind, photo clipped to a second blob on top */}
          <div className="animate-blob absolute top-1/2 left-1/2 h-72 w-72 -translate-x-[45%] -translate-y-[46%] bg-orange" />
          <div className="animate-blob absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden [animation-delay:-3s]">
            <Image
              src="/images/Subhash_pic.png"
              alt="Portrait of Subhash Rana"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </div>

          <div className="animate-bob absolute top-8 right-0 rounded-xl bg-white px-3 py-2 text-sm shadow-[0_10px_30px_-10px_rgba(20,20,20,0.3)] [--r:2deg]">
            <b className="text-orange-text">SDE Intern</b>
            <br />
            <span className="text-muted">@ Matchbest Software</span>
          </div>
          <div className="animate-bob absolute bottom-12 left-0 -rotate-3 rounded-xl bg-white px-3 py-2 text-sm shadow-[0_10px_30px_-10px_rgba(20,20,20,0.3)] [--r:-3deg] [animation-delay:-1.5s]">
            <b>308</b> <span className="text-muted">tests shipped</span>
          </div>
          <div className="animate-bob absolute top-6 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl text-[#3178c6] shadow-[0_8px_24px_-8px_rgba(20,20,20,0.3)] [animation-duration:5s]">
            <SiTypescript aria-hidden="true" />
          </div>
          <div className="animate-bob absolute right-6 bottom-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl text-[#149eca] shadow-[0_8px_24px_-8px_rgba(20,20,20,0.3)] [animation-delay:-2s] [animation-duration:5s]">
            <SiReact aria-hidden="true" />
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 60 30"
            className="absolute top-0 right-20 w-16"
          >
            <path
              className="draw-path animate-draw"
              d="M2 20 C 10 2, 18 30, 26 12 S 42 2, 46 18 S 56 22, 58 8"
              fill="none"
              stroke="#141414"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="animate-bob absolute top-36 left-14 h-4 w-4 rounded-full bg-orange-text [animation-duration:3s]" />
        </Reveal>
      </div>
    </section>
  );
}
