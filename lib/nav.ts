export const sections = [
  { id: 'top', label: 'home' },
  { id: 'projects', label: 'projects' },
  { id: 'stack', label: 'stack' },
] as const

export type SectionId = (typeof sections)[number]['id']

/** Dispatched on window to open the command palette from anywhere. */
export const OPEN_PALETTE = 'palette:open'

/** On the home page, scroll to the section and move focus there; elsewhere, navigate home first. */
export function goToSection(id: SectionId, pathname: string, push: (href: string) => void) {
  if (pathname !== '/') {
    push(`/#${id}`)
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  history.replaceState(null, '', id === 'top' ? '/' : `#${id}`)
  el.scrollIntoView()
  el.focus({ preventScroll: true })
}
