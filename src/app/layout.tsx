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
  title: 'Emplora — Multi-Tenant Payroll & HR Platform (Coming Soon)',
  description:
    'Emplora is a modern multi-tenant payroll and HR platform. Isolated organization workspaces, 1-click automated payroll calculation, real EPF/ESIC/PT statutory compliance. Launching September 15, 2026.',
  keywords: [
    'Emplora',
    'Payroll SaaS',
    'Multi-Tenant HR',
    'EPF Compliance',
    'ESIC Calculation',
    'Automated Payslips',
    'Attendance Register',
  ],
  authors: [{ name: 'Emplora Team' }],
  openGraph: {
    title: 'Emplora — Multi-Tenant Payroll & HR Platform',
    description: 'Isolated organization workspaces, 1-click automated payroll calculation, statutory compliance. Launching September 15, 2026.',
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
