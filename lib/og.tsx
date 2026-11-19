import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/data/site'

export const ogSize = { width: 1200, height: 630 }

const fontDir = join(process.cwd(), 'assets/fonts')
const fonts = Promise.all([
  readFile(join(fontDir, 'GeistMono-Regular.ttf')),
  readFile(join(fontDir, 'GeistMono-SemiBold.ttf')),
])

const colors = { bg: '#0d0d0b', line: '#2a2925', fg: '#e8e6e1', muted: '#9c998f', accent: '#ffb000' }

/** Shared terminal-style share card: a prompt line, a big title, and a subtitle. */
export async function terminalCard({ command, title, subtitle, footer }: {
  command: string
  title: string
  subtitle: string
  footer: string
}) {
  const [regular, semibold] = await fonts

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          background: colors.bg,
          color: colors.fg,
          fontFamily: 'Geist Mono',
          border: `2px solid ${colors.line}`,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, gap: 16 }}>
          <span style={{ color: colors.accent }}>~/{site.handle}</span>
          <span style={{ color: colors.muted }}>$</span>
          <span>{command}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 64, fontSize: 92, fontWeight: 600, lineHeight: 1 }}>
          {title}
          <div style={{ width: 44, height: 82, marginLeft: 18, background: colors.accent }} />
        </div>
        <div style={{ display: 'flex', marginTop: 36, fontSize: 34, color: colors.muted, lineHeight: 1.35, maxWidth: 980 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', fontSize: 24, color: colors.muted }}>{footer}</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist Mono', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  )
}
