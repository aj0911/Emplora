import { ImageResponse } from 'next/og';
import { buildOgCard, OG_SIZE } from '@/lib/og-card';

export const alt = 'Emplora — Payroll that closes its own books';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(buildOgCard(), { ...size });
}
