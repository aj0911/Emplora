import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(150deg, #4360ea, #2a3cae)',
        }}
      >
        <svg width="104" height="104" viewBox="0 0 40 40">
          <path d="M28.2 29.2A13 13 0 1 1 33 20H7" fill="none" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
