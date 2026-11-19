export type Theme = 'light' | 'dark'

const KEY = 'theme'

/**
 * Runs in <head> before first paint: a saved choice wins, otherwise follow the OS.
 * Keep in sync with resolveTheme() below.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}})()`

export function resolveTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(KEY, next)
  } catch {}
  applyTheme(next)
}

/** Notifies when <html data-theme> changes, so every toggle stays in sync. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
