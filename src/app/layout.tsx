import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Emplora | Autonomous AI Payroll & Intelligent HR',
  description:
    'Emplora uses autonomous AI agents to audit payroll runs, predict statutory EPF/ESIC deductions, detect salary anomalies, and answer HR queries in real-time. Launching September 2026.',
  keywords: [
    'Emplora',
    'AI Payroll SaaS',
    'Autonomous HR Copilot',
    'Multi-Tenant HR',
    'AI Anomaly Detection',
    'EPF Compliance Automation',
    'ESIC Calculation',
    'Next-gen Payroll',
  ],
  authors: [{ name: 'Emplora Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Emplora — Autonomous Payroll & Intelligent HR',
    description: 'AI agents that audit payroll, predict compliance, and answer HR queries in real-time. Join the waitlist.',
    siteName: 'Emplora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emplora | Autonomous AI Payroll & Intelligent HR',
    description: 'AI agents that audit payroll, predict compliance, and answer HR queries in real-time.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
