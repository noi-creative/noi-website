import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Favicon placeholder. Q01 will replace this with a designer-supplied
 * icon. The visible mark is the "noi" wordmark in the brand navy, sized
 * to 32×32.
 */
export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00385C',
        color: '#FFF9F4',
        fontSize: '20px',
        fontWeight: 800,
        fontFamily: 'sans-serif',
        letterSpacing: '-0.05em',
      }}
    >
      noi
    </div>,
    { ...size },
  );
}
