import React from 'react';

export const Footer: React.FC = () => (
  <footer style={{ borderTop: '1px solid var(--hairline)', background: 'var(--glass-nav)', backdropFilter: 'blur(14px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <svg viewBox="0 0 40 40" width="20" height="20" role="img" aria-label="Emplora">
          <path d="M28.2 29.2A13 13 0 1 1 33 20H7" fill="none" stroke="var(--color-primary)" strokeWidth="5.4" strokeLinecap="round" />
        </svg>
        <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', letterSpacing: '-.025em' }}>Emplora</span>
      </div>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
        Payroll, statutory compliance and payroll accounting, in one place.
      </span>
      <span style={{ flex: 1 }} />
      <span className="num" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>Launching 15 September 2026</span>
      <a href="#waitlist" style={{ fontSize: 'var(--text-xs)' }}>Join the waitlist</a>
    </div>
  </footer>
);
