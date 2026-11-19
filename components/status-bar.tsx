'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { site } from '@/data/site'
import { OPEN_PALETTE, sections, type SectionId } from '@/lib/nav'
import { ThemeToggle } from './theme-toggle'

const noop = () => () => {}
const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent)

/** tmux-style status line: section "windows" on the left, palette and theme on the right. */
export function StatusBar({ projectSlugs }: { projectSlugs: string[] }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState<SectionId>('top')
  const mac = useSyncExternalStore(noop, isMac, () => false)

  useEffect(() => {
    if (pathname !== '/') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setVisible(entry.target.id as SectionId)
        }
      },
      // A thin band across the middle of the viewport decides which section is "current".
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [pathname])

  const onProject = projectSlugs.some((slug) => pathname === `/projects/${slug}`)
  const current: SectionId | null = pathname === '/' ? visible : onProject ? 'projects' : null

  return (
    <nav
      aria-label="Site"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface font-mono text-xs pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex h-(--bar-h) max-w-[56rem] items-stretch px-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center px-2 text-accent max-[23.75rem]:hidden"
          aria-label={`${site.name}, home`}
        >
          [{site.handle}]
        </Link>

        <ul className="flex items-stretch">
          {sections.map(({ id, label }, i) => {
            const active = current === id
            return (
              <li key={id} className="flex">
                <Link
                  href={`/#${id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`flex items-center px-2 transition-colors hover:text-accent ${active ? 'text-accent' : 'text-muted'}`}
                >
                  <span aria-hidden="true">{i}:</span>
                  {label}
                  <span aria-hidden="true" className="inline-block w-[1ch]">
                    {active ? '*' : ''}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-stretch">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            aria-keyshortcuts="Meta+K Control+K"
            className="flex items-center px-2 text-muted transition-colors hover:text-accent"
          >
            {/* Visible text stays in the accessible name (WCAG 2.5.3); the sr-only part adds context. */}
            <span className="sm:hidden">menu</span>
            <kbd className="font-mono max-sm:hidden">{mac ? '⌘K' : 'ctrl+k'}</kbd>
            <span className="sr-only"> command palette</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
