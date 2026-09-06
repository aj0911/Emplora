import type { Metadata, Viewport } from 'next';
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

const SITE_URL = 'https://emplora.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Emplora | Payroll that closes its own books',
    template: '%s | Emplora',
  },
  description:
    'The pay run, the statutory filing and the double-entry journal behind it — one system. EPF, ESIC, PT and TDS computed and filed on time. Launching 15 September 2026.',
  keywords: [
    'Emplora',
    'AI Payroll SaaS',
    'Payroll accounting',
    'EPF ESIC PT TDS',
    'Multi-tenant payroll',
    'Indian payroll compliance',
    'Tally Busy export',
  ],
  authors: [{ name: 'Emplora Team', url: SITE_URL }],
  creator: 'Emplora',
  publisher: 'Emplora',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    locale: 'en_IN',
    title: 'Emplora — Payroll that closes its own books',
    description: 'The pay run, the statutory filing and the journal behind it — one system. Join the waitlist for 15 September 2026.',
    siteName: 'Emplora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emplora | Payroll that closes its own books',
    description: 'The pay run, the statutory filing and the journal behind it — one system.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e1117' },
    { media: '(prefers-color-scheme: light)', color: '#f1f3f7' },
  ],
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
