export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared 1200x630 brand card for both opengraph-image and twitter-image — next/og's
 * ImageResponse renders plain JSX via Satori, not real CSS, so this stays deliberately simple:
 * flex layout, inline styles, no gradients-as-text-clip (Satori doesn't support background-clip).
 */
export function buildOgCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: 'radial-gradient(circle at 78% 8%, #2a3cae 0%, #0e1117 46%, #0e1117 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="52" height="52" viewBox="0 0 40 40">
          <path d="M28.2 29.2A13 13 0 1 1 33 20H7" fill="none" stroke="#6b84f7" strokeWidth="5.4" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: '#e9ecf2' }}>Emplora</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
        <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.08, color: '#e9ecf2' }}>
          Payroll that closes its own books.
        </span>
        <span style={{ fontSize: 28, color: '#a2abbd', lineHeight: 1.4 }}>
          The pay run, the statutory filing and the journal behind it — one system.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: 8,
            background: 'linear-gradient(135deg, #4360ea, #2a3cae)',
            color: '#fff',
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          Launching 15 September 2026
        </div>
      </div>
    </div>
  );
}
