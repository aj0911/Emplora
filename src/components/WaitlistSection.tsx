'use client';

import React, { useState } from 'react';

const checklist = [
  'Your first payroll run, with us on a call if you want it',
  'Bring your register as a spreadsheet — any column order',
  'Free below six employees, permanently',
];

const CheckIcon: React.FC = () => (
  <span style={{ width: 17, height: 17, borderRadius: 'var(--radius-full)', background: 'var(--success-50)', flex: 'none', display: 'grid', placeItems: 'center', marginTop: 1 }}>
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--success-700)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  </span>
);

export const WaitlistSection: React.FC<{ prefillEmail?: string }> = ({ prefillEmail }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(prefillEmail ?? '');
  const [company, setCompany] = useState('');
  const [employees, setEmployees] = useState('1–5');
  const [role, setRole] = useState('Founder or director');
  const [onSpreadsheets, setOnSpreadsheets] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Adjusting state during render (React's own pattern for "sync state from a prop that can
  // change after mount") rather than an effect — avoids the extra render an effect would cause,
  // and this only needs to react to prefillEmail actually changing, not every render.
  const [lastPrefillEmail, setLastPrefillEmail] = useState(prefillEmail);
  if (prefillEmail !== lastPrefillEmail) {
    setLastPrefillEmail(prefillEmail);
    if (prefillEmail) setEmail(prefillEmail);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, companyName: company, companySize: employees, role, onSpreadsheets }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('done');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" style={{ padding: '0 0 clamp(56px,8vw,100px)' }}>
      <div
        style={{
          position: 'relative', borderRadius: 'var(--radius-lg)', padding: 1,
          background: 'linear-gradient(140deg, var(--primary-400), var(--primary-700) 46%, transparent 78%)',
          boxShadow: '0 50px 110px -46px var(--primary-700)',
        }}
      >
        <div
          style={{
            borderRadius: 'calc(var(--radius-lg) - 1px)', overflow: 'hidden', background: 'var(--window-bg)', backdropFilter: 'blur(20px)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))',
          }}
        >
          <div style={{ padding: 'clamp(30px,4vw,42px) clamp(24px,3vw,38px)', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '-40%', left: '-30%', width: '120%', height: '120%', background: 'radial-gradient(circle, var(--primary-600) 0%, transparent 62%)', opacity: 0.2, filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="kicker">Waitlist</span>
              <h2 style={{ margin: 0, fontSize: 'clamp(26px,3vw,36px)', letterSpacing: '-.04em', lineHeight: 1.1 }}>
                Be in on{' '}
                <span style={{ background: 'linear-gradient(102deg, var(--primary-400), var(--primary-600))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'var(--color-primary-text)', WebkitTextFillColor: 'transparent' }}>
                  day one.
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.56, maxWidth: '40ch' }}>
                Waitlist accounts get their workspace on <span className="num">15 September</span>, seeded and ready. No card, no call, no demo to sit through.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 4 }}>
                {checklist.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckIcon />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: 'clamp(30px,4vw,42px) clamp(24px,3vw,38px)', minWidth: 0, borderLeft: '1px solid var(--hairline)' }}>
            {status === 'done' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--success-50)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--success-700)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>You&apos;re on the list.</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.56 }}>
                  We&apos;ll email <b style={{ color: 'var(--color-text)' }}>{email}</b> on 15 September with your workspace, seeded and ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                <div className="field" style={{ margin: 0 }}>
                  <label className="label-req">Your name</label>
                  <input className="input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Abhinav Jha" style={{ background: 'var(--glass-card)', borderColor: 'var(--hairline)' }} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label className="label-req">Work email</label>
                  <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.in" style={{ background: 'var(--glass-card)', borderColor: 'var(--hairline)' }} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label className="label-req">Company</label>
                  <input className="input" required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Sunrise Apparels Pvt Ltd" style={{ background: 'var(--glass-card)', borderColor: 'var(--hairline)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px,1fr))', gap: 13 }}>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Employees</label>
                    <select className="select" value={employees} onChange={(e) => setEmployees(e.target.value)} style={{ background: 'var(--glass-card)', borderColor: 'var(--hairline)' }}>
                      <option>1–5</option>
                      <option>6–25</option>
                      <option>26–100</option>
                      <option>101–500</option>
                      <option>Over 500</option>
                    </select>
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Your role</label>
                    <select className="select" value={role} onChange={(e) => setRole(e.target.value)} style={{ background: 'var(--glass-card)', borderColor: 'var(--hairline)' }}>
                      <option>Founder or director</option>
                      <option>HR</option>
                      <option>Finance or accounts</option>
                      <option>Chartered accountant</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <label className="check" style={{ margin: 0 }}>
                  <input type="checkbox" checked={onSpreadsheets} onChange={(e) => setOnSpreadsheets(e.target.checked)} />
                  <span style={{ fontSize: 'var(--text-xs)' }}>I currently run payroll on spreadsheets</span>
                </label>
                {status === 'error' && <span className="error">{errorMessage}</span>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    position: 'relative', overflow: 'hidden', border: 0, cursor: status === 'loading' ? 'default' : 'pointer', width: '100%', height: 48,
                    borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'inherit', color: '#fff',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                    boxShadow: '0 14px 34px -12px var(--primary-600), inset 0 1px 0 rgb(255 255 255 / .22)',
                    opacity: status === 'loading' ? 0.75 : 1,
                  }}
                >
                  <span style={{ position: 'absolute', top: 0, bottom: 0, width: '30%', background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / .3), transparent)', animation: 'vSheen 4.8s ease-in-out infinite' }} />
                  <span style={{ position: 'relative' }}>{status === 'loading' ? 'Joining…' : 'Join the waitlist'}</span>
                </button>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)', textAlign: 'center' }}>
                  One email on launch day. Nothing else, and we never share your details.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
