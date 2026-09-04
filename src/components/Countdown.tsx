'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Rocket, CheckCircle2 } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  progressPercent: number;
  isLaunched: boolean;
}

export const Countdown: React.FC = () => {
  // Target: September 15, 2026 00:00:00 IST
  const targetDate = new Date('2026-09-15T00:00:00+05:30').getTime();
  // Start reference date for progress bar calculation: August 1, 2026
  const startDate = new Date('2026-08-01T00:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, progressPercent: 100, isLaunched: true };
    }

    const totalDuration = targetDate - startDate;
    const elapsed = now - startDate;
    const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, progressPercent, isLaunched: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null; // Prevent SSR hydration mismatch
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Outer Card */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-lg">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--primary-500)]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--primary-400)]/30 text-[var(--color-primary-text)] text-xs font-medium mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Countdown to Platform Launch</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] mb-2">
            Emplora v1.0 Launching <span className="gradient-text">September 15, 2026</span>
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] max-w-lg mb-8">
            Multi-tenant workspaces, automated payroll engines, statutory EPF/ESIC/PT compliance, and employee self-service.
          </p>

          {/* Time Units Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] shadow-xs transition-all hover:border-[var(--color-border-strong)]"
              >
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] leading-none mb-1">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[var(--color-text-subtle)] uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--color-text-muted)] mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" /> Seeded & Verified Demo
              </span>
              <span className="font-bold text-[var(--color-primary)]">{timeLeft.progressPercent.toFixed(1)}% Completed</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Public Release
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--color-surface-inset)] rounded-full overflow-hidden border border-[var(--color-border)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-400)] to-blue-400 transition-all duration-1000 ease-out"
                style={{ width: `${timeLeft.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
