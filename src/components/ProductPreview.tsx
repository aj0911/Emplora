'use client';

import React, { useState } from 'react';
import {
  Play,
  Check,
  Calendar,
  Users,
  FileText,
  Shield,
  Clock,
  ArrowUpRight,
  Download,
  AlertTriangle,
  Mail,
  Sliders,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payroll' | 'attendance' | 'statutory'>('payroll');

  // Simulated Attendance Grid State
  const [attendance, setAttendance] = useState<Record<string, string>>({
    '1': 'P', '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'H', '7': 'H',
    '8': 'P', '9': 'P', '10': 'L', '11': 'P', '12': 'P', '13': 'H', '14': 'H',
    '15': 'P', '16': 'HD', '17': 'P', '18': 'P', '19': 'P', '20': 'H', '21': 'H',
    '22': 'P', '23': 'P', '24': 'P', '25': 'P', '26': 'P', '27': 'H', '28': 'H',
    '29': 'P', '30': 'P', '31': 'P',
  });

  const toggleDayStatus = (day: string) => {
    const statuses = ['P', 'L', 'HD', 'A', 'H'];
    const currentIndex = statuses.indexOf(attendance[day] || 'P');
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setAttendance((prev) => ({ ...prev, [day]: nextStatus }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'P':
        return <span className="w-6 h-6 grid place-items-center rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">P</span>;
      case 'L':
        return <span className="w-6 h-6 grid place-items-center rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-semibold">L</span>;
      case 'HD':
        return <span className="w-6 h-6 grid place-items-center rounded bg-blue-500/20 text-blue-400 font-mono text-xs font-semibold">½</span>;
      case 'A':
        return <span className="w-6 h-6 grid place-items-center rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-semibold">A</span>;
      case 'H':
        return <span className="w-6 h-6 grid place-items-center rounded bg-purple-500/20 text-purple-400 font-mono text-xs font-semibold">H</span>;
      default:
        return null;
    }
  };

  return (
    <section id="demo" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary-text)] bg-[var(--color-primary-soft)] px-3 py-1 rounded-full border border-[var(--primary-400)]/20">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text)] mt-4 mb-4">
            See Emplora in action before launch
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] text-pretty">
            Experience the real multi-tenant workflow: run draft payroll cycles, cycle attendance grids, and verify statutory rules.
          </p>
        </motion.div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'payroll', label: '1-Click Payroll Run', icon: Play },
            { id: 'attendance', label: 'Attendance & Roster', icon: Calendar },
            { id: 'statutory', label: 'Statutory EPF / ESIC', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 h-10 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--primary-500)] text-white shadow-md'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace Display Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden group"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ rotateX: 1, rotateY: -1 }}
        >
          {/* Mock Browser Header / Top Bar */}
          <div className="h-11 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />
              <span className="ml-2 font-mono text-xs text-[var(--color-text-subtle)] hidden md:inline">
                https://app.emplora.com/workspace/sunrise-apparels
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-[var(--color-text-muted)]">
              <span className="px-2 py-0.5 rounded bg-[var(--color-surface-inset)] border border-[var(--color-border)] hidden sm:inline-block">
                Org: <strong className="text-[var(--color-text)]">Sunrise Apparels</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                OrgAdmin
              </span>
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="p-6 sm:p-8 min-h-[460px] bg-[var(--color-canvas)]">
            {/* TAB 1: PAYROLL RUN */}
            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                      September 2026 Payroll Run <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">DRAFT</span>
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Calculated from attendance grid (30 days) and active statutory EPF/ESIC/PT configs.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 h-8 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-2)]">
                      Override Deduction
                    </button>
                    <button className="px-4 h-8 rounded bg-[var(--primary-500)] text-xs font-semibold text-white hover:bg-[var(--primary-600)] flex items-center gap-1.5 shadow-sm">
                      <Check className="w-3.5 h-3.5" /> Approve & Lock Run
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Active Employees</span>
                    <div className="font-mono text-2xl font-bold text-[var(--color-text)] mt-1">10</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Gross Payroll</span>
                    <div className="font-mono text-2xl font-bold text-[var(--color-text)] mt-1">₹6,85,000</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Statutory Deductions</span>
                    <div className="font-mono text-2xl font-bold text-amber-400 mt-1">₹82,400</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Net Payout</span>
                    <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">₹6,02,600</div>
                  </div>
                </div>

                {/* Payslips Table Sample */}
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[var(--color-surface-2)] border-b border-[var(--color-border)] font-mono text-[var(--color-text-subtle)] uppercase">
                      <tr>
                        <th className="px-4 py-3">Employee</th>
                        <th className="px-4 py-3">Basic + HRA</th>
                        <th className="px-4 py-3 text-right">EPF (12%)</th>
                        <th className="px-4 py-3 text-right">Loan Deduct</th>
                        <th className="px-4 py-3 text-right">TDS (Form 12BB)</th>
                        <th className="px-4 py-3 text-right">Net Payout</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      <tr className="hover:bg-[var(--color-surface-2)]">
                        <td className="px-4 py-3 font-medium text-[var(--color-text)] flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 grid place-items-center font-bold">RV</div>
                          <div>
                            <div>Rohan Verma</div>
                            <div className="text-[10px] text-[var(--color-text-subtle)] font-mono">EMP002 · Senior Developer</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono">₹75,000</td>
                        <td className="px-4 py-3 font-mono text-right text-rose-400">₹1,800</td>
                        <td className="px-4 py-3 font-mono text-right text-amber-400">₹5,000</td>
                        <td className="px-4 py-3 font-mono text-right text-rose-400">₹3,200</td>
                        <td className="px-4 py-3 font-mono text-right font-bold text-emerald-400">₹65,000</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px]">Calculated</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[var(--color-surface-2)]">
                        <td className="px-4 py-3 font-medium text-[var(--color-text)] flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 grid place-items-center font-bold">AS</div>
                          <div>
                            <div>Ananya Sharma</div>
                            <div className="text-[10px] text-[var(--color-text-subtle)] font-mono">EMP001 · HR Lead</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono">₹90,000</td>
                        <td className="px-4 py-3 font-mono text-right text-rose-400">₹1,800</td>
                        <td className="px-4 py-3 font-mono text-right text-[var(--color-text-subtle)]">₹0</td>
                        <td className="px-4 py-3 font-mono text-right text-rose-400">₹4,500</td>
                        <td className="px-4 py-3 font-mono text-right font-bold text-emerald-400">₹83,700</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px]">Calculated</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Delivery Log Callout */}
                <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-start sm:items-center gap-2 text-[var(--color-text-muted)]">
                    <Mail className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5 sm:mt-0" />
                    <span>August Delivery: <strong className="text-[var(--color-text)]">8 Sent</strong>, <span className="text-rose-400 font-medium">1 Excluded</span></span>
                  </div>
                  <span className="font-mono text-[var(--color-text-subtle)] bg-[var(--color-surface-2)] px-2 py-1 rounded">SMTP Verified</span>
                </div>
              </div>
            )}

            {/* TAB 2: ATTENDANCE & WORKFORCE */}
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)]">Interactive Attendance Register</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Click any day tile to cycle state: <span className="text-emerald-400 font-semibold">P (Present)</span> → <span className="text-amber-400 font-semibold">L (Leave)</span> → <span className="text-blue-400 font-semibold">½ (Half Day)</span> → <span className="text-rose-400 font-semibold">A (Absent)</span> → <span className="text-purple-400 font-semibold">H (Holiday)</span>.
                    </p>
                  </div>
                </div>

                {/* Interactive Grid */}
                <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                    <span>Employee: <strong>Rohan Verma</strong> · Aug 2026</span>
                    <span className="text-[10px] sm:text-xs bg-[var(--color-surface-2)] px-2 py-1 rounded">Batched Auto-Save Active</span>
                  </div>
                  <div className="grid grid-cols-7 sm:grid-cols-10 gap-2">
                    {Object.keys(attendance).map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDayStatus(day)}
                        className="flex flex-col items-center justify-center p-2 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all cursor-pointer"
                      >
                        <span className="text-[10px] font-mono text-[var(--color-text-subtle)] mb-1">Day {day}</span>
                        {getStatusBadge(attendance[day])}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STATUTORY CONFIG */}
            {activeTab === 'statutory' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[var(--color-border)]">
                  <h3 className="text-xl font-bold text-[var(--color-text)]">Statutory & Regulatory Engine</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Auto-configured EPF, ESIC, and Professional Tax parameters materialized on org setup.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-[var(--color-text)]">Employees Provident Fund (EPF)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">Active</span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                      <div className="flex justify-between"><span>Employee Rate:</span> <span className="font-mono text-[var(--color-text)]">12.0%</span></div>
                      <div className="flex justify-between"><span>Employer Contribution:</span> <span className="font-mono text-[var(--color-text)]">12.0%</span></div>
                      <div className="flex justify-between"><span>Statutory Wage Ceiling:</span> <span className="font-mono text-[var(--color-text)]">₹15,000 / mo</span></div>
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-[var(--color-text)]">Employees State Insurance (ESIC)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">Active</span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                      <div className="flex justify-between"><span>Employee Rate:</span> <span className="font-mono text-[var(--color-text)]">0.75%</span></div>
                      <div className="flex justify-between"><span>Employer Rate:</span> <span className="font-mono text-[var(--color-text)]">3.25%</span></div>
                      <div className="flex justify-between"><span>Gross Wage Cap:</span> <span className="font-mono text-[var(--color-text)]">₹21,000 / mo</span></div>
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-[var(--color-text)]">Professional Tax (PT)</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">State Slabs</span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                      <div className="flex justify-between"><span>State Rule:</span> <span className="font-mono text-[var(--color-text)]">Maharashtra / Delhi</span></div>
                      <div className="flex justify-between"><span>Standard Monthly Slab:</span> <span className="font-mono text-[var(--color-text)]">₹200 / employee</span></div>
                      <div className="flex justify-between"><span>February Adjust:</span> <span className="font-mono text-[var(--color-text)]">₹300</span></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--color-text)]">Export Bank Transfer CSV & ECR Files</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">Cycle-scoped export ready for HDFC, ICICI, SBI bank portals.</p>
                  </div>
                  <button className="px-4 h-9 rounded bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-inset)] flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Download Export CSV
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
};
