"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import type { Stat } from "@/types";

interface StatCardProps {
  stat: Stat;
  icon?: React.ReactNode;
}

function useCountUp(
  target: number,
  isInView: boolean,
  duration: number = 1500,
): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

export default function StatCard({ stat, icon }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericValue = parseInt(stat.value, 10);
  const isNumeric = !isNaN(numericValue);
  const count = useCountUp(isNumeric ? numericValue : 0, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="h-full bg-surface-container-lowest dark:bg-surface-container rounded-xl p-6 sm:p-8 flex flex-col justify-center gap-2 border border-subtle hover:border-accent/40 shadow-sm bg-surface-elevated/40 transition-colors duration-300"
    >
      {icon && <span>{icon}</span>}
      <span className="text-h2 font-heading font-black text-accent tabular-nums">
        {isNumeric ? count : stat.value}
        {stat.suffix}
      </span>
      <span className="text-caption uppercase tracking-[0.15em] font-bold text-on-surface-variant">
        {stat.label}
      </span>
    </motion.div>
  );
}
