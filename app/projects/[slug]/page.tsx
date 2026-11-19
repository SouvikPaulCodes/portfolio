import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { ExternalLink } from '@/components/external-link'
import { StatusLabel } from '@/components/project-list'
import { Prompt } from '@/components/prompt'
import { ScreenshotFrame } from '@/components/screenshot-frame'
import { getProject, projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

// Anything not in data/projects.ts is a real 404.
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}

  const url = `/projects/${project.slug}`
  return {
    title: project.title,
    description: project.pitch,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: project.title, description: project.pitch, url },
  }
}

const button =
  'inline-flex items-center whitespace-pre border border-line px-3 py-1.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent'

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <BackLink />

      <p className="mt-10">
        <Prompt command={`cat projects/${project.slug}.md`} />
      </p>

      {/* YAML-style front matter */}
      <div className="mt-6 font-mono text-sm">
        <p aria-hidden="true" className="text-muted">
          ---
        </p>
        <dl className="grid grid-cols-[7ch_minmax(0,1fr)] gap-x-[1ch] gap-y-1 py-1">
          <Field name="role">{project.role}</Field>
          <Field name="when">{project.dates ?? project.year}</Field>
          <Field name="status">
            <StatusLabel status={project.status} />
          </Field>
          <Field name="stack">
            <span aria-hidden="true" className="text-muted">
              [
            </span>
            {project.stack.join(', ')}
            <span aria-hidden="true" className="text-muted">
              ]
            </span>
          </Field>
        </dl>
        <p aria-hidden="true" className="text-muted">
          ---
        </p>
      </div>

      <h1 className="mt-10 font-mono text-3xl font-semibold text-fg sm:text-4xl">
        <span aria-hidden="true" className="text-muted">
          #{' '}
        </span>
        {project.title}
      </h1>
      <p className="mt-4 max-w-[60ch] text-lg text-balance text-fg sm:text-xl">{project.pitch}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.live && (
          <ExternalLink href={project.live} className={`${button} bracketed text-accent`}>
            live
          </ExternalLink>
        )}
        {project.repo === 'private' ? (
          <span className="inline-flex items-center border border-dashed border-line px-3 py-1.5 font-mono text-sm text-muted">
            private repo
          </span>
        ) : (
          project.repo && (
            <ExternalLink href={project.repo} className={`${button} bracketed`}>
              source
            </ExternalLink>
          )
        )}
      </div>

      {project.notes && (
        <ul className="mt-6 space-y-1 font-mono text-xs text-muted">
          {project.notes.map((note) => (
            <li key={note} className="grid grid-cols-[2ch_minmax(0,1fr)]">
              <span aria-hidden="true" className="text-accent">
                !
              </span>
              <span>
                <span className="sr-only">Note: </span>
                {note}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <ScreenshotFrame project={project} />
      </div>

      <div className="mt-14 space-y-12">
        <Block heading="problem">
          <p>{project.description.problem}</p>
        </Block>
        <Block heading="what I built">
          <p>{project.description.built}</p>
        </Block>
        <Block heading="outcome">
          <p>{project.description.outcome}</p>
        </Block>
        <Block heading="highlights">
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="grid grid-cols-[2ch_minmax(0,1fr)]">
                <span aria-hidden="true" className="font-mono text-accent">
                  -
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <nav aria-label="Projects" className="mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-6">
        <BackLink />
        {next !== project && (
          <Link
            href={`/projects/${next.slug}`}
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <span className="sr-only">Next project: </span>
            {next.slug}/ <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </article>
  )
}

function BackLink() {
  return (
    <Link href="/#projects" className="font-mono text-sm text-muted transition-colors hover:text-accent">
      <span aria-hidden="true">← cd ..</span>
      <span className="sr-only">Back to all projects</span>
    </Link>
  )
}

function Field({ name, children }: { name: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-muted">{name}:</dt>
      <dd className="text-fg">{children}</dd>
    </>
  )
}

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="max-w-[68ch]">
      <h2 className="font-mono text-base font-semibold text-fg">
        <span aria-hidden="true" className="text-muted">
          ##{' '}
        </span>
        {heading}
      </h2>
      <div className="mt-3 leading-relaxed text-fg">{children}</div>
    </section>
  )
}
