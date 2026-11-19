import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CommandPalette } from '@/components/command-palette'
import { Footer } from '@/components/footer'
import { StatusBar } from '@/components/status-bar'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { themeScript } from '@/lib/theme'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const title = `${site.name} · ${site.role}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: { type: 'website', siteName: site.name, title, description: site.description, url: '/' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0b' },
    { media: '(prefers-color-scheme: light)', color: '#f4f1ea' },
  ],
  colorScheme: 'dark light',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-accent px-3 py-2 font-mono text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <main id="main" tabIndex={-1} className="mx-auto max-w-[56rem] px-5 outline-none sm:px-8">
          {children}
        </main>
        <Footer />
        <StatusBar projectSlugs={projects.map(({ slug }) => slug)} />
        <CommandPalette projects={projects.map(({ slug, title }) => ({ slug, title }))} />
      </body>
    </html>
  )
}
