import Link from 'next/link'
import { projects, type Project } from '@/data/projects'

const MAX_TAGS = 4

/** Public repos read as world-readable; private ones are owner-only. */
function permissions(project: Project) {
  return project.repo && project.repo !== 'private' ? 'drwxr-xr-x' : 'drwx------'
}

export function StatusLabel({ status }: { status: Project['status'] }) {
  const glyph = status === 'live' ? '●' : status === 'in progress' ? '◐' : '○'
  return (
    <span className="whitespace-nowrap">
      <span aria-hidden="true" className={status === 'archived' ? 'text-muted' : 'text-accent'}>
        {glyph}
      </span>{' '}
      {status}
    </span>
  )
}

export function ProjectList() {
  return (
    <ul className="border-t border-line font-mono text-sm">
      {projects.map((project) => {
        const shown = project.stack.slice(0, MAX_TAGS)
        const hidden = project.stack.length - shown.length

        return (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              className="group ls-row py-4 transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
            >
              <span
                aria-hidden="true"
                className="[grid-area:mark] text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                &gt;
              </span>
              <span aria-hidden="true" className="hidden [grid-area:perms] text-muted sm:block">
                {permissions(project)}
              </span>
              <span className="[grid-area:name] truncate font-semibold text-fg group-hover:text-accent">
                {project.slug}/
                {project.repo === 'private' && <span className="sr-only"> (private repository)</span>}
              </span>
              <ul className="dot-list flex flex-wrap [grid-area:tags] text-muted" aria-label="Stack">
                {shown.map((tag, i) => (
                  <li key={tag}>
                    {tag}
                    {hidden > 0 && i === shown.length - 1 && (
                      <span className="whitespace-nowrap">
                        {' '}+{hidden}
                        <span className="sr-only"> more</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <span className="[grid-area:year] text-muted tabular-nums">{project.year}</span>
              <span className="[grid-area:status] text-fg">
                <StatusLabel status={project.status} />
              </span>
              <span className="[grid-area:pitch] font-sans text-[0.9375rem] text-muted">
                <span aria-hidden="true" className="font-mono">
                  #{' '}
                </span>
                {project.pitch}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
