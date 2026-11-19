'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { site } from '@/data/site'
import { goToSection, OPEN_PALETTE, sections, type SectionId } from '@/lib/nav'
import { toggleTheme } from '@/lib/theme'
import { useTheme } from './theme-toggle'

type Action =
  | { kind: 'section'; id: SectionId }
  | { kind: 'project'; slug: string }
  | { kind: 'github' }
  | { kind: 'mail' }
  | { kind: 'copy-email' }
  | { kind: 'theme' }

type Command = { id: string; verb: string; label: string; action: Action }

export function CommandPalette({ projects }: { projects: { slug: string; title: string }[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const listId = useId()
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  const open = useCallback(() => {
    setQuery('')
    setActive(0)
    setAnnouncement('')
    dialogRef.current?.showModal()
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])

  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialogRef.current?.open) close()
        else open()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_PALETTE, open)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_PALETTE, open)
    }
  }, [open, close])

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map(({ id, label }) => ({
        id: `go-${id}`,
        verb: 'go',
        label: id === 'top' ? '~/' : `~/${label}`,
        action: { kind: 'section', id } as const,
      })),
      ...projects.map(({ slug, title }) => ({
        id: `open-${slug}`,
        verb: 'open',
        label: `${slug}/  ${title}`,
        action: { kind: 'project', slug } as const,
      })),
      { id: 'github', verb: 'link', label: 'github ↗', action: { kind: 'github' } },
      { id: 'mail', verb: 'mail', label: site.email, action: { kind: 'mail' } },
      { id: 'copy-email', verb: 'copy', label: 'email address', action: { kind: 'copy-email' } },
      {
        id: 'theme',
        verb: 'run',
        label: `switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        action: { kind: 'theme' },
      },
    ],
    [projects, theme],
  )

  function run({ action }: Command) {
    if (action.kind === 'copy-email') {
      navigator.clipboard.writeText(site.email).then(
        () => {
          setAnnouncement('Email address copied')
          setTimeout(close, 700)
        },
        () => setAnnouncement(`Could not copy. The address is ${site.email}`),
      )
      return
    }

    close()
    switch (action.kind) {
      case 'section':
        return goToSection(action.id, pathname, router.push)
      case 'project':
        return router.push(`/projects/${action.slug}`)
      case 'github':
        return window.open(site.github, '_blank', 'noopener,noreferrer')
      case 'mail':
        window.location.href = `mailto:${site.email}`
        return
      case 'theme':
        return toggleTheme()
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.verb} ${c.label}`.toLowerCase().includes(q))
  }, [commands, query])

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0))
  const optionId = (i: number) => `${listId}-${i}`

  useEffect(() => {
    if (!dialogRef.current?.open) return
    document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: 'nearest' })
  }, [listId, activeIndex])

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!results.length) return
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActive((activeIndex + step + results.length) % results.length)
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      setActive(e.key === 'Home' ? 0 : results.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[activeIndex]) run(results[activeIndex])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      // Clicks on the backdrop land on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="palette mx-auto mt-[12vh] w-[min(34rem,calc(100vw-2rem))] rounded-md border border-line bg-surface p-0 font-mono text-sm text-fg"
    >
      <div className="flex items-center gap-[1ch] border-b border-line px-4">
        <span aria-hidden="true" className="text-accent">
          &gt;
        </span>
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-label="Type a command"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
          placeholder="type a command or search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onInputKeyDown}
          spellCheck={false}
          autoComplete="off"
          className="h-12 w-full bg-transparent text-fg outline-none placeholder:text-muted"
        />
      </div>

      <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[min(24rem,60vh)] overflow-y-auto py-2">
        {results.map((command, i) => (
          <li
            key={command.id}
            id={optionId(i)}
            role="option"
            aria-selected={i === activeIndex}
            onClick={() => run(command)}
            onMouseMove={() => i !== activeIndex && setActive(i)}
            className={`grid cursor-pointer grid-cols-[2ch_5ch_minmax(0,1fr)] gap-x-[1ch] px-4 py-1.5 ${i === activeIndex ? 'bg-accent-soft text-fg' : 'text-muted'}`}
          >
            <span aria-hidden="true" className="text-accent">
              {i === activeIndex ? '>' : ''}
            </span>
            <span className={i === activeIndex ? 'text-accent' : ''}>{command.verb}</span>
            <span className="truncate">{command.label}</span>
          </li>
        ))}
        {results.length === 0 && <li className="px-4 py-2 text-muted">command not found: {query}</li>}
      </ul>

      <p className="border-t border-line px-4 py-2 text-xs text-muted">↑↓ move · ↵ run · esc close</p>
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </dialog>
  )
}
