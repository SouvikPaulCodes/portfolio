import type { CSSProperties } from 'react'
import { site } from '@/data/site'
import { ExternalLink } from './external-link'
import { Prompt } from './prompt'

const role = site.role.toLowerCase()

// Name types first, then the role, then the caret starts blinking.
// Timings live in CSS (.typed / .caret) and are skipped under reduced motion.
const nameTyping = { '--n': site.name.length, '--speed': '40ms', '--delay': '120ms' } as CSSProperties
const roleTyping = { '--n': role.length, '--speed': '30ms', '--delay': '680ms' } as CSSProperties
const caretDelay = { '--delay': '1300ms' } as CSSProperties

export function Hero() {
  return (
    <section id="top" tabIndex={-1} aria-labelledby="hero-name" className="pt-20 pb-8 outline-none sm:pt-32 sm:pb-12">
      <p>
        <Prompt command="whoami" />
      </p>

      <h1
        id="hero-name"
        className="mt-6 font-mono text-[clamp(2.5rem,8vw,4.5rem)] leading-none font-semibold text-fg"
      >
        <span className="typed" style={nameTyping}>
          {site.name}
        </span>
      </h1>

      <p className="mt-4 font-mono text-lg text-muted sm:text-xl">
        <span className="typed" style={roleTyping}>
          {role}
        </span>
        <span
          aria-hidden="true"
          className="caret ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.18em] bg-accent"
          style={caretDelay}
        />
      </p>

      <p className="mt-8 max-w-[34ch] text-xl leading-snug text-balance text-fg sm:text-2xl">{site.tagline}</p>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        <li>
          <ExternalLink
            href={site.github}
            className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            github
          </ExternalLink>
        </li>
        <li>
          <a
            href={`mailto:${site.email}`}
            className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {site.email}
          </a>
        </li>
      </ul>
    </section>
  )
}
