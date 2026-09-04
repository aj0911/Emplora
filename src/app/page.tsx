'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { FaqSection } from '@/components/FaqSection';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Footer } from '@/components/Footer';
import { InfiniteMarquee } from '@/components/InfiniteMarquee';
import { ProductPreview } from '@/components/ProductPreview';

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-text)] selection:bg-purple-500/20 selection:text-purple-200">
      {/* Header Navigation */}
      <Header onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* AI Hero Section with Live Countdown, Email Form & Interactive AI Copilot Mockup */}
        <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} />

        <InfiniteMarquee />
        
        <ProductPreview />

        {/* AI Capabilities Grid */}
        <FeaturesGrid />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* VIP Early Access Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
