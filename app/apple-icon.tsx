import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Same `>_` mark as icon.svg, rasterised for iOS home screens. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0d0d0b' }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path d="M8 10.5 13.5 16 8 21.5" fill="none" stroke="#ffb000" strokeWidth="2.6" strokeLinecap="square" />
          <rect x="16" y="20" width="9" height="2.6" fill="#ffb000" />
        </svg>
      </div>
    ),
    size,
  )
}
