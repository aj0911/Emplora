'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Bot, ShieldAlert, Cpu, Zap, RefreshCw, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number>(142);

  // Interactive AI Prompt Simulation State
  const [activePrompt, setActivePrompt] = useState<string>('audit');
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);

  // Target: September 15, 2026 00:00:00 IST
  const targetDate = new Date('2026-09-15T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePromptClick = (promptKey: string) => {
    setActivePrompt(promptKey);
    setAiAnalyzing(true);
    setTimeout(() => setAiAnalyzing(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.position) {
        setQueuePosition(data.position);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Premium Aurora Background & Dot Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-80">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1.1, 1.3, 1] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-40 blur-[120px] bg-[conic-gradient(from_0deg,rgba(168,85,247,0.3),rgba(99,102,241,0.2),rgba(16,185,129,0.1),rgba(168,85,247,0.3))]" 
        />
        <motion.div 
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] bg-indigo-500/20"
        />
      </div>
      
      {/* Subtle Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* AI Kicker Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-blue-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-8 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI-Powered Multi-Tenant Payroll Platform</span>
          </motion.div>

          {/* Main AI Headline with Staggered Reveal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text)] leading-[1.06] mb-6 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {['Autonomous', 'Payroll.', 'Intelligent', 'HR.', 'Zero', 'Errors.'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={i >= 2 ? "bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 text-pretty"
          >
            AI agents that audit payroll, predict compliance, and answer HR queries in real-time.
          </motion.p>

          {/* Live Launch Countdown */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center justify-center gap-3 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-purple-500/30 shadow-xl mb-10 backdrop-blur-md"
          >
            <div className="text-center px-2">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-[var(--color-text)]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-[10px] font-mono font-semibold text-purple-400 uppercase mt-1">Days</span>
            </div>
            <span className="text-xl font-mono text-[var(--color-text-subtle)]">:</span>
            <div className="text-center px-2">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-[var(--color-text)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] font-mono font-semibold text-purple-400 uppercase mt-1">Hours</span>
            </div>
            <span className="text-xl font-mono text-[var(--color-text-subtle)]">:</span>
            <div className="text-center px-2">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-[var(--color-text)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] font-mono font-semibold text-purple-400 uppercase mt-1">Mins</span>
            </div>
            <span className="text-xl font-mono text-[var(--color-text-subtle)]">:</span>
            <div className="text-center px-2">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-emerald-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] font-mono font-semibold text-purple-400 uppercase mt-1">Secs</span>
            </div>
          </motion.div>

          {/* Email Waitlist Form (Posting to /api/waitlist) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto mb-16"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address..."
                  className="flex-1 h-12 px-4 rounded-xl border border-purple-500/30 bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-subtle)] text-sm focus:outline-none focus:border-purple-400 shadow-xs transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-purple-500/25 relative overflow-hidden group"
                  data-interactive="true"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                  ) : (
                    <>
                      <span className="relative z-10">Join AI Waitlist</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-left flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-none mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text)]">VIP Spot Reserved!</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    You are position <strong className="font-mono text-emerald-400">#{queuePosition}</strong> on our VIP early access list. Notification sent to <strong className="text-[var(--color-text)]">jhaabhinav16@gmail.com</strong>.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* AI Copilot Simulation Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto rounded-2xl border border-purple-500/30 bg-[var(--color-surface)] shadow-2xl overflow-hidden backdrop-blur-md"
        >
          {/* Top Window Header */}
          <div className="h-11 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />
              <span className="ml-3 font-mono text-xs text-[var(--color-text-subtle)] hidden sm:inline">
                https://app.emplora.com/ai-copilot
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-purple-300 min-w-0">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="shrink-0">
                <Bot className="w-4 h-4 text-purple-400" />
              </motion.div>
              <span className="truncate">AI Copilot <span className="hidden sm:inline">Active</span></span>
            </div>
          </div>

          {/* Interactive AI Simulation Panel */}
          <div className="p-6 sm:p-8 bg-[var(--color-canvas)] space-y-6">
            {/* Quick AI Action Prompt Selector */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-[var(--color-text-subtle)] mr-1 w-full sm:w-auto mb-1 sm:mb-0">Try AI Prompt:</span>
              <button
                onClick={() => handlePromptClick('raise')}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all text-left flex-1 sm:flex-none ${
                  activePrompt === 'raise'
                    ? 'bg-purple-600 text-white shadow-sm sm:scale-105'
                    : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] sm:hover:scale-105'
                }`}
              >
                💬 Increase Rahul's salary to ₹75k
              </button>
              <button
                onClick={() => handlePromptClick('import')}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all text-left flex-1 sm:flex-none ${
                  activePrompt === 'import'
                    ? 'bg-purple-600 text-white shadow-sm sm:scale-105'
                    : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] sm:hover:scale-105'
                }`}
              >
                📊 Add employees from Excel
              </button>
              <button
                onClick={() => handlePromptClick('calc')}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all text-left flex-1 sm:flex-none ${
                  activePrompt === 'calc'
                    ? 'bg-purple-600 text-white shadow-sm sm:scale-105'
                    : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] sm:hover:scale-105'
                }`}
              >
                ⚡ Calculate payroll for this month
              </button>
            </div>

            {/* AI Output Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--color-surface)] border border-purple-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-2 w-full min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 grid place-items-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[var(--color-text)] flex flex-wrap items-center gap-2">
                      <span className="truncate">Emplora AI</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 whitespace-nowrap">99.8% Accuracy</span>
                    </h4>
                    <span className="text-[11px] font-mono text-[var(--color-text-subtle)] truncate block">Real-time Tenant Scan</span>
                  </div>
                </div>
                {aiAnalyzing && (
                  <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-purple-400 shrink-0">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing...
                  </span>
                )}
              </div>

              {/* Prompt Dynamic Content */}
              <div className="relative min-h-[96px]">
                {!aiAnalyzing ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {activePrompt === 'raise' && (
                      <div className="p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-mono space-y-2 text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-2 text-amber-400 font-semibold">
                          <Check className="w-4 h-4" /> Proposed change · needs your approval
                        </div>
                        <p className="text-[var(--color-text)]">
                          &quot;Rahul crosses the ESIC gross ceiling, so ESIC stops from September — his net rises by ₹465 more than the raise alone. Annual payroll cost increases by ₹1,56,000.&quot;
                        </p>
                      </div>
                    )}

                    {activePrompt === 'import' && (
                      <div className="p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-mono space-y-2 text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Excel mapped successfully
                        </div>
                        <p className="text-[var(--color-text)]">
                          &quot;Found 30 employees in the file. UAN and Bank details validated. Ready to preview and commit to the database.&quot;
                        </p>
                      </div>
                    )}

                    {activePrompt === 'calc' && (
                      <div className="p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-mono space-y-2 text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <Zap className="w-4 h-4" /> Payroll calculation drafted
                        </div>
                        <p className="text-[var(--color-text)]">
                          &quot;Calculated for 248 employees. Total Gross: ₹1.4Cr. 3 anomalies detected regarding absent days without leave requests. Preview totals before locking.&quot;
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-sm">
                      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-purple-500" />
                      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 rounded-full bg-purple-500" />
                      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
