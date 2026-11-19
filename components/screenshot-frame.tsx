import { existsSync } from 'node:fs'
import { join } from 'node:path'
import Image from 'next/image'
import type { Project } from '@/data/projects'

/** A thin frame labelled with the site's host. Falls back to a placeholder when the image file isn't there yet. */
export function ScreenshotFrame({ project }: { project: Project }) {
  const { screenshot, live } = project
  const hasImage = screenshot && existsSync(join(process.cwd(), 'public', screenshot.src))
  const host = live ? new URL(live).host : `${project.slug}.md`

  return (
    <figure className="overflow-hidden rounded-md border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-3 py-2 font-mono text-xs text-muted">
        <span className="truncate">{host}</span>
        <span aria-hidden="true">{hasImage ? '[png]' : '[ ]'}</span>
      </figcaption>
      <div className="relative aspect-[16/10]">
        {hasImage ? (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            preload
            sizes="(min-width: 56rem) 52rem, calc(100vw - 2.5rem)"
            className="object-cover object-top"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-sm text-muted">
            <span>[ preview coming soon ]</span>
          </div>
        )}
      </div>
    </figure>
  )
}
