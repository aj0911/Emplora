'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Sun, Moon, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenWaitlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWaitlist }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme as 'dark' | 'light');

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-purple-500/20 shadow-md shadow-purple-500/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group transition-transform hover:scale-105">
          <Logo variant="lockup" size="md" />
        </a>

        {/* Clean Center Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-muted)]">
          <a href="#demo" className="hover:text-purple-400 transition-colors">
            Interactive Demo
          </a>
          <a href="#features" className="hover:text-purple-400 transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 grid place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Clean Waitlist CTA */}
          <button
            onClick={onOpenWaitlist}
            className="px-5 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-purple-500/25 flex items-center gap-1.5 whitespace-nowrap hover:scale-105"
            data-interactive="true"
          >
            <span>Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
