'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, viewportConfig } from '@/lib/animations';
import type { Stat } from '@/types';

interface StatCardProps {
  stat: Stat;
  icon?: string;
}

function useCountUp(target: number, isInView: boolean, duration: number = 1500): number {
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
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericValue = parseInt(stat.value, 10);
  const isNumeric = !isNaN(numericValue);
  const count = useCountUp(isNumeric ? numericValue : 0, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      viewport={viewportConfig}
      className="bg-surface-container-lowest dark:bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-end border border-outline-variant/10 dark:border-outline-variant/5 hover:border-primary/20 transition-colors duration-300"
    >
      {icon && (
        <span className="material-symbols-outlined text-primary text-3xl mb-4">{icon}</span>
      )}
      <span className="text-4xl sm:text-5xl font-black text-primary mb-2 tabular-nums">
        {isNumeric ? count : stat.value}
        {stat.suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.15em] font-bold text-on-surface-variant">
        {stat.label}
      </span>
    </motion.div>
  );
}
