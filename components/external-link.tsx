import type { ComponentProps } from 'react'

/** Opens in a new tab; the arrow is decorative and screen readers get a hint instead. */
export function ExternalLink({ children, ...props }: ComponentProps<'a'>) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
