'use client';

import React, { useState, useSyncExternalStore } from 'react';
import {
  type Countdown,
  subscribeToClock,
  getCountdownSnapshot,
  getCountdownServerSnapshot,
  parseCountdownSnapshot,
} from '@/lib/theme-vars';

const statCards: Array<{ key: keyof Countdown; label: string; accent?: boolean }> = [
  { key: 'd', label: 'days' },
  { key: 'h', label: 'hours' },
  { key: 'm', label: 'mins' },
  { key: 's', label: 'secs', accent: true },
];

export const Hero: React.FC<{ onQuickJoin: (email: string) => void }> = ({ onQuickJoin }) => {
  const snapshot = useSyncExternalStore(subscribeToClock, getCountdownSnapshot, getCountdownServerSnapshot);
  const countdown: Countdown = parseCountdownSnapshot(snapshot);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onQuickJoin(email);
  };

  return (
    <section
      style={{
        padding: 'clamp(52px,8vw,104px) 0 clamp(40px,6vw,72px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 'clamp(32px,4vw,60px)', alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, padding: '6px 13px 6px 10px',
            borderRadius: 'var(--radius-full)', border: '1px solid var(--pill-border)', background: 'var(--pill-bg)',
            backdropFilter: 'blur(10px)', width: 'fit-content', maxWidth: '100%',
          }}
        >
          <span style={{ position: 'relative', width: 7, height: 7, flex: 'none' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-full)', background: 'var(--primary-400)', animation: 'vPulse 2s ease-in-out infinite' }} />
            <span style={{ position: 'absolute', inset: -3, borderRadius: 'var(--radius-full)', background: 'var(--primary-400)', opacity: 0.3, filter: 'blur(3px)' }} />
          </span>
          <span style={{ fontSize: 'var(--text-2xs)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--pill-text)' }}>
            AI-native payroll · launching 15 Sept 2026
          </span>
        </div>

        <h1 style={{ margin: 0, fontSize: 'clamp(34px,4.6vw,62px)', lineHeight: 1.04, letterSpacing: '-.048em', fontWeight: 600, textWrap: 'pretty' }}>
          <span
            style={{
              background: 'linear-gradient(102deg, var(--primary-400) 6%, var(--primary-600) 52%, var(--primary-500) 96%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'var(--color-primary-text)', WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Payroll
          </span>{' '}
          that closes its own{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span
              style={{
                background: 'linear-gradient(102deg, var(--primary-500) 4%, var(--primary-400) 96%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'var(--color-primary-text)', WebkitTextFillColor: 'transparent',
              }}
            >
              books.
            </span>
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: '6%', height: '12%', background: 'linear-gradient(90deg, var(--primary-500), transparent)', opacity: 0.42, borderRadius: 2 }} />
          </span>
        </h1>

        <p style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 1.52, color: 'var(--color-text-muted)', maxWidth: '50ch', textWrap: 'pretty' }}>
          The pay run, the statutory filing and the double-entry journal behind it — one system. Ask it anything in plain language. It proposes; you approve.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 'clamp(6px,1vw,12px)', maxWidth: 560 }}>
            {statCards.map((s) => (
              <div
                key={s.key}
                style={{
                  position: 'relative', overflow: 'hidden',
                  border: `1px solid ${s.accent ? 'var(--primary-500)' : 'var(--hairline)'}`,
                  borderRadius: 'var(--radius-sm)', background: s.accent ? 'var(--glass-accent)' : 'var(--glass-card)',
                  backdropFilter: 'blur(12px)', padding: 'clamp(11px,1.6vw,17px) clamp(6px,1vw,14px)',
                  display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0,
                  boxShadow: s.accent ? '0 8px 26px -12px var(--primary-600)' : undefined,
                }}
              >
                <span
                  style={{
                    position: 'absolute', top: 0, left: s.accent ? '10%' : '14%', right: s.accent ? '10%' : '14%', height: 1,
                    background: `linear-gradient(90deg, transparent, var(--${s.accent ? 'primary-300' : 'primary-400'}), transparent)`,
                  }}
                />
                <span
                  className="num"
                  style={{
                    fontSize: 'clamp(28px,5.4vw,50px)', fontWeight: 600, letterSpacing: '-.05em', lineHeight: 0.94,
                    color: s.accent ? 'var(--color-primary-text)' : undefined,
                  }}
                >
                  {countdown[s.key]}
                </span>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)', letterSpacing: '.09em', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', maxWidth: 560 }}>
            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <input
                className="input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email address…"
                style={{ height: 46, background: 'var(--glass-card)', borderColor: 'var(--hairline)' }}
              />
            </div>
            <button
              type="submit"
              style={{
                position: 'relative', overflow: 'hidden', flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 46, padding: '0 22px', border: 0, cursor: 'pointer', fontFamily: 'inherit',
                borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', fontWeight: 500, color: '#fff',
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                boxShadow: '0 10px 28px -10px var(--primary-600), inset 0 1px 0 rgb(255 255 255 / .22)',
              }}
            >
              <span
                style={{
                  position: 'absolute', top: 0, bottom: 0, width: '32%',
                  background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / .28), transparent)',
                  animation: 'vSheen 5.2s ease-in-out infinite',
                }}
              />
              <span style={{ position: 'relative' }}>Join the waitlist</span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
                <path d="M5 12h13M12.5 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)' }}>
            One email on launch day. Free below six employees, permanently.
          </span>
        </form>
      </div>

      <div style={{ display: 'grid', placeItems: 'center', minWidth: 0, position: 'relative' }}>
        <div style={{ position: 'relative', width: 'min(330px, 100%)', aspectRatio: '1' }}>
          <span
            style={{
              position: 'absolute', inset: '-12%', borderRadius: 'var(--radius-full)',
              background: 'radial-gradient(circle, var(--primary-400) 0%, transparent 64%)',
              opacity: 0.32, filter: 'blur(20px)', animation: 'vHalo 6s ease-in-out infinite',
            }}
          />
          <span
            style={{
              position: 'absolute', inset: '4%', borderRadius: 'var(--radius-full)',
              background: 'conic-gradient(from 0deg, transparent 0deg, var(--primary-300) 78deg, transparent 186deg)',
              animation: 'vSpin 10s linear infinite', filter: 'blur(1px)',
            }}
          />
          <span
            style={{
              position: 'absolute', inset: '8%', borderRadius: 'var(--radius-full)', overflow: 'hidden',
              background: 'linear-gradient(150deg, var(--primary-500), var(--primary-700))',
              boxShadow: '0 30px 70px -24px var(--primary-700), inset 0 3px 0 rgb(255 255 255 / .25)',
              animation: 'vBreathe 6s ease-in-out infinite',
            }}
          >
            <span
              style={{
                position: 'absolute', width: '136%', height: '136%', left: '-18%', top: '-18%',
                borderRadius: 'var(--radius-full)', background: 'radial-gradient(circle at 30% 26%, var(--primary-400) 0%, transparent 48%)',
                opacity: 0.6, animation: 'vDrift 13s ease-in-out infinite',
              }}
            />
          </span>
          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2 }}>
            <svg viewBox="0 0 40 40" width="32%" height="32%" style={{ filter: 'drop-shadow(0 2px 10px rgb(0 0 0 / .32))' }}>
              <path d="M28.2 29.2A13 13 0 1 1 33 20H7" fill="none" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" />
            </svg>
          </span>

          <div
            style={{
              position: 'absolute', top: '4%', right: '1%', zIndex: 3, padding: '9px 13px',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)', background: 'var(--float-solid)',
              boxShadow: '0 12px 28px -12px rgb(0 0 0 / .45)', display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Journal</span>
            <span className="num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Balanced</span>
          </div>
          <div
            style={{
              position: 'absolute', bottom: '12%', left: '0%', zIndex: 3, padding: '9px 13px',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)', background: 'var(--float-solid)',
              boxShadow: '0 12px 28px -12px rgb(0 0 0 / .45)', display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Statutory dues</span>
            <span className="num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>₹53,710</span>
          </div>
          <div
            style={{
              position: 'absolute', bottom: '0%', right: '6%', zIndex: 3, padding: '7px 12px',
              borderRadius: 'var(--radius-full)', border: '1px solid var(--primary-500)', background: 'var(--float-solid)',
              boxShadow: '0 14px 32px -12px rgb(0 0 0 / .5)', display: 'flex', alignItems: 'center', gap: 7,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: 'var(--primary-400)', animation: 'vPulse 1.8s ease-in-out infinite' }} />
            <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 500, color: 'var(--pill-text)' }}>Agent active</span>
          </div>
        </div>
      </div>
    </section>
  );
};
