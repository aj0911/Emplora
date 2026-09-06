import React from 'react';

/** Fixed decorative aurora + grid behind the whole page. Intensity is theme-driven via CSS vars set upstream. */
export const AuroraBackdrop: React.FC = () => (
  <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', maxWidth: '100vw' }}>
    <span
      style={{
        position: 'absolute', top: '-24%', left: '-14%', width: '78vw', height: '78vw',
        borderRadius: 'var(--radius-full)', background: 'radial-gradient(circle, var(--primary-500) 0%, transparent 62%)',
        opacity: 'var(--g1)', filter: 'blur(64px)', animation: 'vAurora1 21s ease-in-out infinite',
      }}
    />
    <span
      style={{
        position: 'absolute', top: '6%', right: '-20%', width: '66vw', height: '66vw',
        borderRadius: 'var(--radius-full)', background: 'radial-gradient(circle, var(--primary-700) 0%, transparent 64%)',
        opacity: 'var(--g2)', filter: 'blur(72px)', animation: 'vAurora2 27s ease-in-out infinite',
      }}
    />
    <span
      style={{
        position: 'absolute', bottom: '-26%', left: '22%', width: '72vw', height: '72vw',
        borderRadius: 'var(--radius-full)', background: 'radial-gradient(circle, var(--primary-600) 0%, transparent 62%)',
        opacity: 'var(--g3)', filter: 'blur(80px)', animation: 'vAurora3 33s ease-in-out infinite',
      }}
    />
    <span
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '66px 66px', opacity: 'var(--grid-opacity)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 78%)',
      }}
    />
  </div>
);
