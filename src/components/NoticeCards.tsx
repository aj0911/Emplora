import React from 'react';

const CardShell: React.FC<{ gradient: string; children: React.ReactNode }> = ({ gradient, children }) => (
  <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', padding: 1, background: gradient }}>
    <div style={{ borderRadius: 'calc(var(--radius-md) - 1px)', background: 'var(--glass-panel)', backdropFilter: 'blur(14px)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

const CardHead: React.FC<{ index: string; title: string; body: string }> = ({ index, title, body }) => (
  <div style={{ padding: '20px 22px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
    <span className="num" style={{ fontSize: 'var(--text-2xs)', fontWeight: 600, color: 'var(--color-primary-text)', letterSpacing: '.1em' }}>{index}</span>
    <h3 style={{ margin: 0, fontSize: 'var(--text-md)', letterSpacing: '-.025em' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.56 }}>{body}</p>
  </div>
);

const FadeOverlay: React.FC<{ height?: number }> = ({ height = 34 }) => (
  <span style={{ position: 'absolute', left: 22, right: 22, bottom: 22, height, background: 'linear-gradient(to bottom, transparent, var(--card-fade))', pointerEvents: 'none' }} />
);

export const NoticeCards: React.FC = () => (
  <section style={{ padding: '0 0 clamp(48px,7vw,84px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,32px)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <span className="kicker">A glimpse</span>
      <h2 style={{ margin: 0, fontSize: 'clamp(25px,3.2vw,36px)', letterSpacing: '-.04em', lineHeight: 1.1 }}>
        Three things you will
        <br />
        notice in the first hour
      </h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px,1fr))', gap: 'clamp(14px,2vw,20px)' }}>
      <CardShell gradient="linear-gradient(160deg, var(--primary-500), transparent 46%)">
        <CardHead index="01" title="You type. It drafts." body="Every knock-on effect priced before anything saves. The agent proposes; you hold the keys." />
        <div style={{ position: 'relative', padding: '0 22px 22px', marginTop: 'auto' }}>
          <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--glass-card)', padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ maxWidth: '90%', padding: '7px 11px', background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))', color: '#fff', borderRadius: '11px 11px 3px 11px', fontSize: 'var(--text-2xs)', boxShadow: '0 6px 16px -8px var(--primary-600)' }}>
                Raise Rohan to ₹1,20,000
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ width: 19, height: 19, borderRadius: 'var(--radius-full)', background: 'linear-gradient(150deg, var(--primary-500), var(--primary-700))', flex: 'none', display: 'grid', placeItems: 'center', boxShadow: '0 3px 9px -3px var(--primary-600)' }}>
                <svg viewBox="0 0 40 40" width="10" height="10">
                  <path d="M28.2 29.2A13 13 0 1 1 33 20H7" fill="none" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" />
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
                <span style={{ fontSize: 'var(--text-2xs)', lineHeight: 1.55 }}>
                  Gross rises <span className="num">₹18,200</span>. TDS moves to <span className="num">₹9,410</span>. EPF unchanged — already at the ceiling.
                  <span style={{ display: 'inline-block', width: 2, height: 9, background: 'var(--primary-400)', marginLeft: 3, verticalAlign: -1, animation: 'vBlink 1.1s step-end infinite' }} />
                </span>
                <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge badge-info">Review diff</span>
                  <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)' }}>nothing saved yet</span>
                </div>
              </div>
            </div>
          </div>
          <FadeOverlay />
        </div>
      </CardShell>

      <CardShell gradient="linear-gradient(160deg, var(--primary-600), transparent 46%)">
        <CardHead index="02" title="Every figure shows its working" body="Open any amount and see the rule that produced it. No black box, and paise where the statute is exact." />
        <div style={{ position: 'relative', padding: '0 22px 22px', marginTop: 'auto' }}>
          <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--glass-card)', overflow: 'hidden' }}>
            <table className="table" style={{ fontSize: 'var(--text-2xs)', background: 'transparent' }}>
              <thead>
                <tr>
                  <th>Line</th>
                  <th>Rule applied</th>
                  <th className="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Basic</td><td className="muted">60% of gross</td><td className="num">20,340.00</td></tr>
                <tr><td>Provident fund</td><td className="muted">12% of ₹15,000 cap</td><td className="num">1,800.00</td></tr>
                <tr><td>Professional tax</td><td className="muted">Maharashtra slab</td><td className="num">200.00</td></tr>
                <tr><td>Advance</td><td className="muted">instalment 2 of 4</td><td className="num">4,800.00</td></tr>
              </tbody>
            </table>
          </div>
          <FadeOverlay />
        </div>
      </CardShell>

      <CardShell gradient="linear-gradient(160deg, var(--primary-500), transparent 46%)">
        <CardHead index="03" title="It tells you before, not after" body="Deadlines, a missing UAN, someone who will drop out of the transfer file. Named while you can still fix it." />
        <div style={{ position: 'relative', padding: '0 22px 22px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="alert alert-danger" style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 'var(--text-2xs)', lineHeight: 1.5 }}><b>EPF for July is 21 days overdue.</b> ₹33,750 plus interest under s.7Q.</div>
            </div>
            <div className="alert alert-warning" style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 'var(--text-2xs)', lineHeight: 1.5 }}><b>1 employee has no bank details.</b> Paid in the run, missing from the NEFT file.</div>
            </div>
            <div className="alert alert-info" style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 'var(--text-2xs)', lineHeight: 1.5 }}><b>Maharashtra PT changes 1 October.</b> 6 of 9 employees affected.</div>
            </div>
          </div>
          <FadeOverlay height={30} />
        </div>
      </CardShell>
    </div>
  </section>
);
