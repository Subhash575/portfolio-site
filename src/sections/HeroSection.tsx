"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { fadeIn, floatAnimationSlow, staggerContainer } from "@/lib/animations";
import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center py-20 md:py-24"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="z-10 grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        <div className="flex flex-col gap-6">
          <motion.div variants={fadeIn}>
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 mt-2 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              Hi, my name is
            </span>
          </motion.div>

          <h1 className="relative z-10 text-5xl font-bold tracking-tight text-on-surface opacity-100 sm:text-7xl">
            {siteConfig.name}.
          </h1>

          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold tracking-tight text-zinc-500 sm:text-6xl dark:text-zinc-400"
          >
            {siteConfig.title}.
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={fadeIn} className="mt-4 flex flex-wrap gap-4">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>
            <Button
              href={siteConfig.github}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              GitHub
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          animate={floatAnimationSlow}
          className="mx-auto w-full max-w-xl lg:mx-0"
        >
          <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center gap-2 border-b border-zinc-200/80 px-5 py-3 dark:border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <p className="ml-3 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                live-snippet.ts
              </p>
            </div>

            <div className="space-y-2 bg-zinc-950/95 px-5 py-6 font-mono text-sm text-zinc-200">
              <p>
                <span className="text-indigo-300">const</span>{" "}
                <span className="text-emerald-300">stack</span>{" "}
                <span className="text-zinc-400">=</span>{" "}
                <span className="text-amber-300">[</span>
                <span className="text-sky-300">&quot;MERN&quot;</span>
                <span className="text-zinc-400">,</span>{" "}
                <span className="text-sky-300">&quot;Next.js&quot;</span>
                <span className="text-amber-300">]</span>
              </p>
              <p>
                <span className="text-indigo-300">export const</span>{" "}
                <span className="text-emerald-300">build</span>{" "}
                <span className="text-zinc-400">=</span>{" "}
                <span className="text-amber-300">()</span>{" "}
                <span className="text-zinc-400">=&gt;</span>{" "}
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
