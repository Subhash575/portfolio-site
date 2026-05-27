'use client';

import { motion } from 'framer-motion';
import { floatAnimation, floatAnimationSlow } from '@/lib/animations';

interface FloatingCardProps {
 variant?: 'code' | 'badge';
 className?: string;
}

export default function FloatingCard({ variant = 'code', className = '' }: FloatingCardProps) {
 if (variant === 'code') {
 return (
 <motion.div
 animate={floatAnimationSlow}
 className={`w-64 sm:w-72 p-5 sm:p-6 rounded-3xl glass-gradient backdrop-blur-2xl border border-white/40 shadow-2xl ${className}`}
 >
 <div className="flex gap-2 mb-4">
 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
 <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
 <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
 </div>
 <div className="space-y-2.5 font-mono text-[11px] text-left">
 <div className="flex gap-2">
 <span className="text-accent font-bold">const</span>
 <span className="text-secondary">developer</span>
 <span className="text-on-surface-variant">=</span>
 <span className="text-on-surface-variant">{'{'}</span>
 </div>
 <div className="pl-4 text-on-surface-variant">
 name: <span className="text-emerald-600 dark:text-emerald-400">&quot;Subhash&quot;</span>,
 </div>
 <div className="pl-4 text-on-surface-variant">
 focus: <span className="text-accent">&quot;Full Stack&quot;</span>,
 </div>
 <div className="pl-4 text-on-surface-variant">
 status: <span className="text-tertiary">&quot;Building&quot;</span>
 </div>
 <div className="text-on-surface-variant">{'}'}</div>
 </div>
 </motion.div>
 );
 }

 return (
 <motion.div
 animate={floatAnimation}
 className={`w-48 p-4 rounded-2xl glass backdrop-blur-md shadow-xl ${className}`}
 >
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
 <span className="material-symbols-outlined text-accent text-xl">auto_awesome</span>
 </div>
 <div className="text-left">
 <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
 Portfolio
 </p>
 <p className="text-xs font-black text-on-surface">2025 Edition</p>
 </div>
 </div>
 </motion.div>
 );
}
