import React from 'react';

interface LogoProps {
  markOnly?: boolean;
  size?: number;
  className?: string;
  gradient?: boolean;
}

/** The Emplora mark: a soft lowercase "e" as one continuous stroke. Never restyle the path itself. */
export const Logo: React.FC<LogoProps> = ({ markOnly = false, size = 26, className = '', gradient = false }) => (
  <div className={`inline-flex items-center gap-[9px] ${className}`}>
    <svg viewBox="0 0 40 40" width={size} height={size} role="img" aria-label="Emplora" style={{ flex: 'none' }}>
      <path
        d="M28.2 29.2A13 13 0 1 1 33 20H7"
        fill="none"
        stroke={gradient ? 'url(#emplora-mark-grad)' : 'var(--color-primary)'}
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      {gradient && (
        <defs>
          <linearGradient id="emplora-mark-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="var(--primary-400)" />
            <stop offset="1" stopColor="var(--primary-600)" />
          </linearGradient>
        </defs>
      )}
    </svg>
    {!markOnly && (
      <span style={{ fontWeight: 600, letterSpacing: '-.03em', fontSize: 'var(--text-md)', color: 'var(--color-text)' }}>
        Emplora
      </span>
    )}
  </div>
);
