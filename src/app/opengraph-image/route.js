import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'House Mazzutti'
  const unit = searchParams.get('unit') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top-left: wordmark */}
        <div
          style={{
            display: 'flex',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          HOUSE MAZZUTTI
        </div>

        {/* Center: title */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '32px',
            paddingBottom: '32px',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: title.length > 40 ? '52px' : '68px',
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '900px',
              letterSpacing: '-1px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* Bottom-left: URL */}
          <div
            style={{
              color: '#666666',
              fontSize: '14px',
              letterSpacing: '1px',
            }}
          >
            housemazzutti.com
          </div>

          {/* Bottom-right: unit label */}
          {unit ? (
            <div
              style={{
                color: '#999999',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              {unit}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
