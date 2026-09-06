import React from 'react';

const chips = ['Tally & Busy export', 'Month close', 'Immutable audit log'];

const journalRows: Array<{ account: string; debit?: string; credit?: string }> = [
  { account: 'Salaries & wages', debit: '5,17,800.00' },
  { account: 'Employer EPF', debit: '17,550.00' },
  { account: 'Salaries payable', credit: '4,74,580.00' },
  { account: 'Statutory dues payable', credit: '53,710.00' },
];

export const JournalShowcase: React.FC = () => (
  <section style={{ padding: '0 0 clamp(48px,7vw,84px)' }}>
    <div
      style={{
        position: 'relative', borderRadius: 'var(--radius-lg)', padding: 1,
        background: 'linear-gradient(150deg, var(--primary-500), transparent 42%, transparent 62%, var(--primary-600))',
        boxShadow: '0 40px 90px -40px var(--primary-700)',
      }}
    >
      <div style={{ borderRadius: 'calc(var(--radius-lg) - 1px)', overflow: 'hidden', background: 'var(--window-bg)', backdropFilter: 'blur(18px)' }}>
        <div style={{ padding: '11px 16px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--window-chrome)' }}>
          <div style={{ display: 'flex', gap: 6, flex: 'none' }}>
            <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--danger-500)', opacity: 0.85 }} />
            <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--warning-500)', opacity: 0.85 }} />
            <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--success-500)', opacity: 0.85 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <span
              className="num"
              style={{
                fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)', padding: '4px 12px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--hairline)', background: 'var(--glass-card)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%',
              }}
            >
              app.emplora.in/agent
            </span>
          </div>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: 'var(--success-500)', animation: 'vPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)' }}>live</span>
          </div>
        </div>

        <div style={{ padding: 'clamp(20px,3vw,32px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 'clamp(22px,3vw,38px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <span className="kicker">The part nobody else does</span>
            <h2 style={{ margin: 0, fontSize: 'clamp(23px,2.8vw,32px)', letterSpacing: '-.035em', lineHeight: 1.14 }}>
              Approve the run.
              <br />
              The journal is{' '}
              <span style={{ background: 'linear-gradient(102deg, var(--primary-400), var(--primary-600))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'var(--color-primary-text)', WebkitTextFillColor: 'transparent' }}>
                already written.
              </span>
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.56, maxWidth: '44ch' }}>
              Balanced double entry, statutory liabilities dated to their deadlines, a trial balance that agrees. Your accountant gets a Tally file, not a spreadsheet.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
              {chips.map((chip) => (
                <span
                  key={chip}
                  style={{ fontSize: 'var(--text-2xs)', padding: '5px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline)', background: 'var(--glass-card)', color: 'var(--color-text-muted)' }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', minWidth: 0 }}>
            <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--glass-card)', backdropFilter: 'blur(10px)' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                <span className="num" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>JV-2608-01</span>
                <span className="badge badge-success">Balanced</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-subtle)' }}>posted automatically</span>
              </div>
              <table className="table" style={{ fontSize: 'var(--text-xs)', background: 'transparent' }}>
                <thead>
                  <tr>
                    <th>Account</th>
                    <th className="num">Debit</th>
                    <th className="num">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {journalRows.map((row) => (
                    <tr key={row.account}>
                      <td>{row.account}</td>
                      <td className="num">{row.debit ?? <span className="muted">—</span>}</td>
                      <td className="num">{row.credit ?? <span className="muted">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
                <tbody>
                  <tr className="table-total">
                    <td>Total</td>
                    <td className="num">5,35,350.00</td>
                    <td className="num">5,35,350.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
