'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'When is Emplora going live?',
      answer:
        'Emplora is scheduled to go public on September 15, 2026. Seeded environments and early access waitlist participants will receive immediate workspace invitations on launch day.',
    },
    {
      question: 'How does multi-tenant data isolation work?',
      answer:
        'Every organization that signs up gets an isolated workspace. One organization can never view another organization’s employees, payroll runs, or reports.',
    },
    {
      question: 'What statutory compliance rules are built-in?',
      answer:
        'Emplora automatically handles EPF (12% employee & employer with ₹15,000 statutory wage ceiling), ESIC (0.75% / 3.25% with ₹21,000 cap), State Professional Tax (PT) slabs, and mid-cycle TDS overrides for Form 12BB declarations.',
    },
    {
      question: 'How are payslips generated and delivered?',
      answer:
        'Once a payroll run is calculated and approved by the Accountant or OrgAdmin, payslips are locked and transformed into PDFs. They are automatically emailed to employees with personal emails on file, with delivery status logged in real-time.',
    },
    {
      question: 'Can employees request profile & bank detail corrections?',
      answer:
        'Yes. Through the self-service "My Space" portal, employees can request updates to sensitive data (mobile, bank details, personal email). Changes require verification and approval from HR or OrgAdmin before updating statutory records.',
    },
  ];

  return (
    <section id="faq" className="py-16 relative bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary-text)] bg-[var(--color-primary-soft)] px-3 py-1 rounded-full border border-[var(--primary-400)]/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] mt-4 mb-3">
            Got questions? We have answers.
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Everything you need to know about Emplora multi-tenancy, statutory math, and launch schedules.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[var(--color-primary)] flex-none" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-text-muted)] flex-none transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)]/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
