import { ImageResponse } from 'next/og';
import { firm } from '@/content/facts';

export const runtime = 'nodejs';

/**
 * Imagen OG generada con la marca.
 *
 * Es tipográfica y usa la retícula de plano: no incrusta fotografías ni
 * afirma nada que no esté en el sitio.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || firm.tagline).slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A3558',
          padding: '72px',
          // Retícula de construcción.
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              fontSize: 34,
              letterSpacing: '0.34em',
              color: '#FFFFFF',
              fontWeight: 600,
            }}
          >
            TREU
          </div>
          <div style={{ fontSize: 16, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.72)' }}>
            LEGAL &amp; BUSINESS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          <div style={{ width: '84px', height: '2px', background: 'rgba(255,255,255,0.6)' }} />
          <div
            style={{
              fontSize: title.length > 70 ? 52 : 64,
              lineHeight: 1.12,
              color: '#FFFFFF',
              fontWeight: 600,
              maxWidth: '950px',
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.72)' }}>
          {firm.tagline} · {firm.city}, {firm.state}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
