"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewportConfig } from "@/lib/animations";

// Fade-up on scroll. Always the same element on server and client (swapping it after
// hydration left the server's opacity:0 in place); reduced motion just makes it instant.
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
