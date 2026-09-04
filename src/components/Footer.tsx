'use client';

import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Logo variant="lockup" size="md" />
            <span className="text-xs text-[var(--color-text-subtle)] font-mono border-l border-[var(--color-border)] pl-4">
              Multi-Tenant Payroll & HR Platform
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-muted)] font-medium">
            <a href="#demo" className="hover:text-[var(--color-text)] transition-colors">
              Interactive Demo
            </a>
            <a href="#features" className="hover:text-[var(--color-text)] transition-colors">
              Capabilities
            </a>
            <a href="#roi" className="hover:text-[var(--color-text)] transition-colors">
              ROI Calculator
            </a>
            <a href="#brand" className="hover:text-[var(--color-text)] transition-colors">
              Option 8 Mark
            </a>
            <a href="#faq" className="hover:text-[var(--color-text)] transition-colors">
              FAQ
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-subtle)]">
          <p>© 2026 Emplora Platform Inc. All rights reserved. Launching September 15, 2026.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Statutory EPF/ESIC/PT Engine</span>
            <span>·</span>
            <span>Geist Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
