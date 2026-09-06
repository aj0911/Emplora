export type Theme = 'light' | 'dark';

/**
 * Derived glass/aurora/hairline values for the coming-soon page, one set per theme.
 * Mirrors the design mockup's own renderVals() 1:1 so the page matches it exactly —
 * these aren't reusable design-system tokens, just this page's atmosphere.
 */
export function themeVars(theme: Theme): React.CSSProperties {
  const light = theme === 'light';
  const base = 'var(--color-canvas)';
  const mix = (pct: number, over?: string) => `color-mix(in oklab, ${over ?? 'var(--color-surface)'} ${pct}%, transparent)`;

  const vars: Record<string, string> = {
    '--g1': light ? '.14' : '.3',
    '--g2': light ? '.1' : '.24',
    '--g3': light ? '.09' : '.2',
    '--grid-opacity': light ? '.5' : '.28',
    '--glass-nav': light ? 'color-mix(in oklab, var(--color-canvas) 78%, transparent)' : `color-mix(in oklab, ${base} 72%, transparent)`,
    '--glass-card': light ? mix(72) : mix(46),
    '--glass-panel': light ? mix(88) : mix(62),
    '--glass-accent': 'color-mix(in oklab, var(--color-primary-soft) 82%, transparent)',
    '--float-solid': light ? 'var(--color-surface)' : 'var(--neutral-900)',
    '--window-bg': light ? mix(94) : mix(66),
    '--window-chrome': light ? mix(80) : mix(52),
    '--card-fade': light ? 'var(--color-surface)' : mix(88),
    '--fade-edge': base,
    '--hairline': light ? 'var(--color-border)' : 'color-mix(in oklab, var(--color-border-strong) 78%, transparent)',
    '--pill-bg': 'color-mix(in oklab, var(--color-primary-soft) 76%, transparent)',
    '--pill-border': 'color-mix(in oklab, var(--primary-500) 46%, transparent)',
    '--pill-text': 'var(--color-primary-text)',
  };

  return vars as React.CSSProperties;
}

export function msUntilLaunch(): number {
  const target = new Date('2026-09-15T00:00:00+05:30').getTime();
  return Math.max(0, target - Date.now());
}

export interface Countdown {
  d: string;
  h: string;
  m: string;
  s: string;
}

export function computeCountdown(): Countdown {
  const ms = msUntilLaunch();
  const p = (n: number) => String(n).padStart(2, '0');
  return {
    d: p(Math.floor(ms / 86400000)),
    h: p(Math.floor(ms / 3600000) % 24),
    m: p(Math.floor(ms / 60000) % 60),
    s: p(Math.floor(ms / 1000) % 60),
  };
}

/**
 * useSyncExternalStore plumbing for the countdown — "now" is an external clock, not derived
 * React state, so this avoids the setState-in-effect anti-pattern a plain useState+useEffect
 * ticker would need for its first tick. getServerSnapshot freezes at zero so SSR output is stable;
 * the real snapshot takes over on the client without a hydration-mismatch warning.
 */
export function subscribeToClock(callback: () => void): () => void {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

export function getCountdownSnapshot(): string {
  const c = computeCountdown();
  return `${c.d}|${c.h}|${c.m}|${c.s}`;
}

export function getCountdownServerSnapshot(): string {
  return '00|00|00|00';
}

export function parseCountdownSnapshot(snapshot: string): Countdown {
  const [d, h, m, s] = snapshot.split('|');
  return { d, h, m, s };
}
