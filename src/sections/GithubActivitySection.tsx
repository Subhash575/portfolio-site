"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionHeading from "@/components/SectionHeading";
import GithubHeatmap from "@/components/GithubHeatmap";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  weekday?: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  weeks: ContributionWeek[];
  totalContributions: number;
  stats: {
    contributions: number;
    currentStreak: number;
    longestStreak: number;
    activeDays: number;
    repositories: number;
    stars: number;
    pullRequests: number;
    issuesClosed: number;
  };
}

// Local Count Up component to reuse matching design system animations
function StatNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const duration = 1200;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-2xl sm:text-3xl font-heading font-black text-accent tabular-nums leading-none"
    >
      {count}
      {suffix}
    </span>
  );
}

export default function GithubActivitySection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  return (
    <motion.section
      id="github-activity"
      className="relative px-4 py-16 md:px-6 md:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
      >
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <SectionHeading
        title="GitHub Activity"
        subtitle="My open-source contributions and coding journey"
      />

      <div className="mt-12 space-y-6">
        {/* Top Row: 4 standalone stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              value: data?.stats.repositories ?? 0,
              label: "Public Repos",
              suffix: "+",
            },
            {
              value: data?.stats.contributions ?? 0,
              label: "Total Contributions",
            },
            {
              value: data?.stats.activeDays ?? 0,
              label: "Active Days",
            },
            {
              value: data?.stats.longestStreak ?? 0,
              label: "Longest Streak",
              suffix: "d",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border border-subtle bg-surface-elevated/70 p-6 backdrop-blur-sm shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300 flex flex-col"
            >
              {isLoading ? (
                <div className="h-8 w-16 bg-surface-elevated/50 animate-pulse rounded" />
              ) : (
                <StatNumber value={stat.value} suffix={stat.suffix} />
              )}
              <span className="text-xs sm:text-sm text-secondary mt-2 select-none leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Full-width Contribution Activity Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-subtle bg-surface-elevated/70 p-6 md:p-8 backdrop-blur-sm shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <FaGithub className="w-5 h-5" />
              </div>
              <h3 className="text-[1.05rem] font-semibold tracking-tight text-primary">
                Contribution Activity
              </h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-elevated border border-subtle text-secondary shadow-sm select-none">
              Last Year
            </span>
          </div>

          {/* Heatmap Grid Wrapper */}
          <div className="bg-surface-elevated/30 dark:bg-surface-elevated/5 rounded-xl border border-subtle/50 p-4">
            <GithubHeatmap weeks={data?.weeks} isLoading={isLoading} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
