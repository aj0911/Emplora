'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(45);

  // Calculations
  const hoursSavedPerMonth = Math.round(employeeCount * 0.6);
  const manualErrorsPrevented = Math.round(employeeCount * 0.15);
  const annualSavingsRupees = Math.round(employeeCount * 12500);

  return (
    <section id="roi" className="py-16 relative bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary-text)] bg-[var(--color-primary-soft)] px-3 py-1 rounded-full border border-[var(--primary-400)]/20">
            Interactive ROI Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] mt-4 mb-3">
            Calculate your time & compliance savings
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Adjust your active workforce count to see how much manual work Emplora eliminates every single payroll cycle.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-sm space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">Active Organization Workforce</label>
                <span className="font-mono text-xl font-bold text-[var(--color-primary-text)]">{employeeCount} Employees</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                className="w-full h-2 bg-[var(--color-surface-inset)] rounded-lg appearance-none cursor-pointer accent-[var(--primary-500)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-text-subtle)] mt-1">
                <span>5 employees</span>
                <span>250</span>
                <span>500+ employees</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs space-y-2 text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2 text-[var(--color-text)] font-semibold">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Included Out-of-the-Box:</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc">
                <li>Automated EPF, ESIC & State PT calculation</li>
                <li>Instant PDF Payslip email distribution</li>
                <li>Self-service Employee profile & leave tracking</li>
                <li>Bank transfer CSV generator for HDFC/ICICI/SBI</li>
              </ul>
            </div>
          </div>

          {/* Metrics Results Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-inset)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-text-muted)] font-semibold uppercase">Hours Saved / Month</span>
                <Clock className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="font-mono text-4xl font-bold text-[var(--color-text)]">
                {hoursSavedPerMonth} <span className="text-lg text-[var(--color-text-muted)] font-normal">hrs</span>
              </div>
              <p className="text-xs text-[var(--color-text-subtle)] mt-2">
                Replaces manual Excel calculations & individual email sending.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-inset)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-text-muted)] font-semibold uppercase">Annual Cost Savings</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-emerald-400">
                ₹{annualSavingsRupees.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-[var(--color-text-subtle)] mt-2">
                Eliminates penalty fines & outsourced accountant overhead.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-inset)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-text-muted)] font-semibold uppercase">Errors Prevented</span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-[var(--color-text)]">
                {manualErrorsPrevented} <span className="text-lg text-[var(--color-text-muted)] font-normal">/ cycle</span>
              </div>
              <p className="text-xs text-[var(--color-text-subtle)] mt-2">
                Zero TDS calculation or loan double-deduction mistakes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-inset)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-text-muted)] font-semibold uppercase">Payslip Email Speed</span>
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-indigo-400">
                1-Click
              </div>
              <p className="text-xs text-[var(--color-text-subtle)] mt-2">
                Instant delivery with full SMTP delivery logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
