'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('10-50');
  const [role, setRole] = useState('OrgAdmin');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<number>(142);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, companyName, companySize, role }),
      });
      const data = await res.json();
      if (data.position) {
        setPosition(data.position);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center gap-3">
          <Logo variant="mark-only" size="md" />
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">Join Emplora VIP Waitlist</h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Priority onboarding & workspace access on Sept 15, 2026.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-10 px-3 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs sm:text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Sunrise Apparels Pvt Ltd"
                  className="w-full h-10 px-3 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs sm:text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                    Company Headcount
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                    Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="OrgAdmin">OrgAdmin (Founder / CXO)</option>
                    <option value="HR">HR Manager / Specialist</option>
                    <option value="Accountant">Payroll Accountant</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-md bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Reserve Priority Workspace</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[var(--color-text)]">You&apos;re On The VIP List!</h4>
              <p className="text-xs text-[var(--color-text-muted)] max-w-xs mx-auto">
                Assigned position <strong className="font-mono text-emerald-400">#{position}</strong>. Notification sent to <strong>jhaabhinav16@gmail.com</strong>.
              </p>
              <button
                onClick={onClose}
                className="px-6 h-9 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-inset)]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
