import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

export const alt = 'NOI Creative — estudio de branding y diseño en Orlando, Florida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Open Graph image placeholder. Q01 will replace this with a
 * designer-supplied asset. The visible image is honest about being a
 * placeholder: a small "PLACEHOLDER" label sits at the top, and a
 * TODO comment in the source documents the next-cycle replacement.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#00385C',
        color: '#FFF9F4',
        fontFamily: 'sans-serif',
        padding: '64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#FFEDAE',
        }}
      >
        <span>PLACEHOLDER · TODO Q01</span>
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            {site.brand}
          </div>
          <div
            style={{
              fontSize: '36px',
              fontStyle: 'italic',
              color: '#FFEDAE',
              maxWidth: '900px',
            }}
          >
            Estrategia, identidad y producción visual para marcas que buscan crecer.
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '20px',
          color: '#FFF9F4',
          opacity: 0.8,
        }}
      >
        <span>{site.contactEmail}</span>
        <span>{site.primaryMarket}, Florida</span>
      </div>
    </div>,
    { ...size },
  );
}
