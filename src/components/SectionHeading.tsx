"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface SectionHeadingProps {
 label?: string;
 title: string;
 subtitle?: string;
 className?: string;
}

export default function SectionHeading({
 label,
 title,
 subtitle,
 className = "",
}: SectionHeadingProps) {
 return (
 <motion.div variants={fadeUp} className={className}>
 {label && (
 <span className="text-accent font-bold uppercase tracking-[0.2em] text-caption mb-4 block">
 {label}
 </span>
 )}
 <h2 className="text-h2 font-heading font-extrabold text-on-surface">
 {title}
 </h2>
 {subtitle && (
 <p className="mt-4 text-body text-secondary max-w-2xl">
 {subtitle}
 </p>
 )}
 </motion.div>
 );
}
