"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { fadeIn, floatAnimationSlow, staggerContainer } from "@/lib/animations";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-start justify-between px-6 md:px-20 pt-25 md:pt-30 pb-15 overflow-hidden"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="z-10 flex w-full flex-col md:flex-row items-center justify-between gap-10"
      >
        <div className="flex flex-col gap-4 min-w-0 md:w-1/2">
          <motion.div variants={fadeIn}>
            <div className="relative h-22 w-22 overflow-hidden rounded-full ring-2 ring-accent">
              <Image
                src="/images/Subhash_pic.png"
                alt="Subhash Rana"
                fill
                sizes="88px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="flex items-center gap-3">
            <span className="inline-block w-fit rounded-full bg-surface-elevated px-3 py-1 text-small font-medium text-primary">
              Hi, my name is
            </span>
            <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Open to work
            </div>
          </motion.div>

          <div className="flex flex-col gap-2 min-w-0">
            <h1 className="relative z-10 text-h1 font-heading font-extrabold text-on-surface opacity-100 wrap-break-word md:text-[clamp(2.5rem,5vw,4rem)] md:leading-tight">
              {siteConfig.name}
            </h1>

            <motion.h2
              variants={fadeIn}
              className="text-h3 font-heading font-bold text-gray-400 wrap-break-word"
            >
              {siteConfig.title}
              <span className="animate-pulse text-accent">|</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeIn}
            className="max-w-2xl text-body text-secondary"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-4 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="flex w-full sm:w-auto items-center justify-center h-12 px-6 rounded-lg text-base font-medium bg-indigo-500 text-white transition-colors hover:bg-indigo-600"
            >
              View Projects
            </a>
            <a
              href="cv/subhash_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 h-12 px-6 rounded-lg text-base font-medium border-2 border-indigo-500 text-indigo-500 transition-colors hover:bg-indigo-50 dark:border-[rgba(255,255,255,0.65)] dark:text-white dark:hover:bg-white/10"
              download
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          animate={floatAnimationSlow}
          className="relative mx-auto w-full md:mx-0 md:w-1/2 opacity-65 min-w-0 md:self-center"
        >
          <div className="overflow-hidden rounded-xl border border-subtle/80 bg-surface-elevated shadow-none max-w-125 w-full ml-auto">
            <div className="flex items-center gap-2 border-b border-subtle/80 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <p className="ml-3 text-caption font-medium uppercase tracking-wider text-muted">
                live-snippet.ts
              </p>
            </div>

            <div className="space-y-2 bg-surface/10 px-5 py-6 font-mono text-small text-zinc-200">
              <p>
                <span className="text-indigo-300">const</span>{" "}
                <span className="text-emerald-300">stack</span>{" "}
                <span className="text-muted">=</span>{" "}
                <span className="text-amber-300">[</span>
                <span className="text-sky-300">&quot;MERN&quot;</span>
                <span className="text-muted">,</span>{" "}
                <span className="text-sky-300">&quot;Next.js&quot;</span>
                <span className="text-amber-300">]</span>
              </p>
              <p>
                <span className="text-indigo-300">export const</span>{" "}
                <span className="text-emerald-300">build</span>{" "}
                <span className="text-muted">=</span>{" "}
                <span className="text-amber-300">()</span>{" "}
                <span className="text-muted">=&gt;</span>{" "}
                <span className="text-amber-300">{"{"}</span>
              </p>
              <p className="pl-5 text-zinc-300">performance: high,</p>
              <p className="pl-5 text-zinc-300">ui: intentional,</p>
              <p className="pl-5 text-zinc-300">impact: measurable</p>
              <p>
                <span className="text-amber-300">{"}"}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
