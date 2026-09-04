import React from 'react';

interface LogoProps {
  variant?: 'mark-only' | 'lockup';
  container?: 'none' | 'cobalt' | 'slate';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'lockup',
  container = 'none',
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: { icon: 20, font: 'text-sm', gap: 'gap-2' },
    md: { icon: 26, font: 'text-lg', gap: 'gap-2.5' },
    lg: { icon: 34, font: 'text-2xl', gap: 'gap-3' },
    xl: { icon: 44, font: 'text-4xl', gap: 'gap-4' },
  };

  const currentSize = sizes[size];

  // Option 8 Soft e SVG mark
  const Option8Mark = ({ width = currentSize.icon }: { width?: number }) => (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={width}
      role="img"
      aria-label="Emplora AI Logo"
      className="flex-none transition-transform duration-200 hover:scale-105"
    >
      <path
        d="M28.2 29.2A13 13 0 1 1 33 20H7"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="5.4"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      <Option8Mark />
      {variant !== 'mark-only' && (
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-[var(--color-text)] ${currentSize.font}`}>
            Emplora
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30">
            AI
          </span>
        </div>
      )}
    </div>
  );
};
