import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Emplora — Payroll that closes its own books',
    short_name: 'Emplora',
    description: 'The pay run, the statutory filing and the double-entry journal behind it — one system.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e1117',
    theme_color: '#0e1117',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
