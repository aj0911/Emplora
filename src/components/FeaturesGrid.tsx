'use client';

import React from 'react';
import { Bot, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const aiFeatures = [
    {
      icon: Cpu,
      title: 'Global Command Overlay',
      description:
        'Hit Ctrl+K anywhere to Ask Emplora. A floating natural-language composer that acts across the entire platform in real-time.',
    },
    {
      icon: Bot,
      title: 'Confirm-Before-Commit',
      description:
        'The agent writes the draft, but you hold the keys. Every action generates a visual diff for you to review and approve before data is changed.',
    },
    {
      icon: ShieldAlert,
      title: 'Knock-on Effect Analysis',
      description:
        'Ask for a salary raise, and Emplora instantly predicts how it alters ESIC ceilings, EPF contributions, and your total annual payroll cost.',
    },
    {
      icon: Sparkles,
      title: 'Natural Language Execution',
      description:
        'Type "Add these 30 employees from this Excel" or "Calculate payroll for this month". The agent handles the mapping, validation, and math.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/15 px-3.5 py-1 rounded-full border border-purple-500/30">
            AI Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text)] mt-4 mb-4">
            Intelligence built into every pay cycle
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] text-pretty">
            Emplora combines isolated multi-tenant architecture with real-time AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-purple-500/20 bg-[var(--color-surface-2)] hover:border-purple-500/40 transition-all hover:-translate-y-1 shadow-xs group"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 grid place-items-center mb-5 text-purple-300 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
