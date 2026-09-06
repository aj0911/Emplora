'use client';

import React, { useEffect, useState } from 'react';
import { AuroraBackdrop } from '@/components/AuroraBackdrop';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { JournalShowcase } from '@/components/JournalShowcase';
import { NoticeCards } from '@/components/NoticeCards';
import { HighlightStrip } from '@/components/HighlightStrip';
import { WaitlistSection } from '@/components/WaitlistSection';
import { Footer } from '@/components/Footer';
import { themeVars, type Theme } from '@/lib/theme-vars';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [prefillEmail, setPrefillEmail] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleQuickJoin = (email: string) => {
    setPrefillEmail(email);
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: 'var(--color-text)', background: 'var(--color-canvas)', transition: 'background .25s', ...themeVars(theme) }}>
      <AuroraBackdrop />
      <div style={{ position: 'relative', zIndex: 1, overflowX: 'clip' }}>
        <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
        <main style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Hero onQuickJoin={handleQuickJoin} />
          <Marquee />
          <JournalShowcase />
          <NoticeCards />
          <HighlightStrip />
          <WaitlistSection prefillEmail={prefillEmail} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
