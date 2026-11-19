import { site } from '@/data/site'

/**
 * A shell prompt line: `~/souvik $ <command>`.
 * Pass `label` when the prompt is used as a heading, so screen readers hear
 * "Projects" instead of the literal command.
 */
export function Prompt({ command, label }: { command: string; label?: string }) {
  const line = (
    <span className="font-mono text-sm font-normal">
      <span className="text-accent">~/{site.handle}</span> <span className="text-muted">$</span>{' '}
      <span className="text-fg">{command}</span>
    </span>
  )

  if (!label) return line

  return (
    <>
      <span aria-hidden="true">{line}</span>
      <span className="sr-only">{label}</span>
    </>
  )
}
