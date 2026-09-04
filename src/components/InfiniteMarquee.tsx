'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MARQUEE_TEXTS = [
  "Zero Error Payroll",
  "Automated EPF/ESIC",
  "Real-time Tax Adjustments",
  "Multi-Tenant Architecture",
  "Immutable Audit Logs",
  "AI-Powered HR Copilot",
  "Statutory Compliance"
];

export const InfiniteMarquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-[var(--color-surface-2)] border-y border-[var(--color-border)] py-4 my-10 select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-canvas)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-canvas)] to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex whitespace-nowrap gap-12 px-6 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {/* Double the array to ensure smooth seamless looping */}
        {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="text-sm font-mono font-medium text-[var(--color-text-subtle)] uppercase tracking-widest flex items-center gap-4">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
