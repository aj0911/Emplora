'use client';

import React from 'react';
import { Logo } from './Logo';
import type { Theme } from '@/lib/theme-vars';

export const Header: React.FC<{ theme: Theme; onToggleTheme: () => void }> = ({ theme, onToggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        backdropFilter: 'blur(18px) saturate(150%)',
        background: 'var(--glass-nav)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo gradient size={26} />
        </a>
        <span style={{ flex: 1 }} />
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          style={{
            flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-full)',
            border: '1px solid var(--hairline)', background: 'var(--glass-card)',
            display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--color-text)',
          }}
        >
          {isLight ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.4 6.4 0 0 0 10.2 10.2Z" />
            </svg>
          )}
        </button>
        <a
          href="#waitlist"
          style={{
            position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 17px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 500,
            color: '#fff', background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
            boxShadow: '0 6px 20px -6px var(--primary-600), inset 0 1px 0 rgb(255 255 255 / .22)',
          }}
        >
          <span
            style={{
              position: 'absolute', top: 0, bottom: 0, width: '34%',
              background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / .3), transparent)',
              animation: 'vSheen 4.6s ease-in-out infinite',
            }}
          />
          <span style={{ position: 'relative' }}>Join the waitlist</span>
        </a>
      </div>
    </header>
  );
};
