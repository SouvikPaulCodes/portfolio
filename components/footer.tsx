import { site } from '@/data/site'
import { ExternalLink } from './external-link'

export function Footer() {
  const link = 'transition-colors hover:text-accent'

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[56rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-8 font-mono text-xs text-muted sm:px-8">
        <p>
          © {site.name} <span aria-hidden="true">·</span> built with Next.js
        </p>
        <ul className="flex gap-x-5">
          <li>
            <ExternalLink href={site.github} className={link}>
              github
            </ExternalLink>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={link}>
              email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
