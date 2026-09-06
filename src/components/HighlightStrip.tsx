import React from 'react';

const items = [
  { title: 'EPF · ESIC · PT · TDS', body: 'Computed, filed and dated. We maintain the rates so you never chase a gazette.' },
  { title: 'Three steps', body: 'Lock attendance, review, approve. That is the entire payroll run.' },
  { title: 'Never alone', body: 'The agent drafts. A person approves. There is no path where it pays anybody by itself.' },
];

export const HighlightStrip: React.FC = () => (
  <section style={{ padding: '0 0 clamp(48px,7vw,84px)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 'clamp(14px,2vw,20px)' }}>
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            position: 'relative', overflow: 'hidden', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)',
            background: 'var(--glass-panel)', backdropFilter: 'blur(12px)', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 7,
          }}
        >
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--primary-500), transparent)' }} />
          <span
            className="num"
            style={{
              fontSize: 'var(--text-xl)', fontWeight: 600, letterSpacing: '-.03em',
              background: 'linear-gradient(102deg, var(--primary-400), var(--primary-600))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'var(--color-primary-text)', WebkitTextFillColor: 'transparent',
            }}
          >
            {item.title}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.body}</span>
        </div>
      ))}
    </div>
  </section>
);
