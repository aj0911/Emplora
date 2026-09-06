import React from 'react';

const PHRASES = [
  'Zero-error payroll',
  'Automated EPF & ESIC',
  'Real-time tax adjustments',
  'Multi-tenant architecture',
  'Immutable audit logs',
  'Payroll accounting built in',
];

const Row: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 36, paddingRight: 36 }} aria-hidden={hidden}>
    {PHRASES.map((phrase) => (
      <React.Fragment key={phrase}>
        <span style={{ fontSize: 'var(--text-2xs)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-text-subtle)', whiteSpace: 'nowrap' }}>
          {phrase}
        </span>
        <span style={{ width: 4, height: 4, borderRadius: 'var(--radius-full)', background: 'var(--primary-500)', flex: 'none' }} />
      </React.Fragment>
    ))}
  </div>
);

export const Marquee: React.FC = () => (
  <section style={{ padding: '0 0 clamp(48px,7vw,84px)' }}>
    <div style={{ position: 'relative', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', overflow: 'hidden', padding: '15px 0' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'vMarquee 34s linear infinite' }}>
        <Row />
        <Row hidden />
      </div>
      <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '14%', background: 'linear-gradient(90deg, var(--fade-edge), transparent)', pointerEvents: 'none' }} />
      <span style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '14%', background: 'linear-gradient(270deg, var(--fade-edge), transparent)', pointerEvents: 'none' }} />
    </div>
  </section>
);
