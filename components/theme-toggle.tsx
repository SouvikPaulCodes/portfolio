'use client'

import { useLayoutEffect, useSyncExternalStore } from 'react'
import { applyTheme, currentTheme, resolveTheme, subscribeTheme, toggleTheme } from '@/lib/theme'

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, currentTheme, () => 'dark' as const)
}

export function ThemeToggle() {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  // The inline <head> script already set the theme; this only matters in dev,
  // where Strict Mode's remount strips attributes from <html>.
  useLayoutEffect(() => applyTheme(resolveTheme()), [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-full min-w-11 items-center justify-center gap-1.5 px-2 text-muted transition-colors hover:text-accent"
    >
      <span aria-hidden="true">{theme === 'dark' ? '◐' : '◑'}</span>
      <span className="max-sm:hidden">{theme}</span>
      <span className="sr-only"> theme, switch to {next}</span>
    </button>
  )
}
