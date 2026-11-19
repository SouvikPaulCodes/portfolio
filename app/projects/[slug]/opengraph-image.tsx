import { getProject, projects } from '@/data/projects'
import { site } from '@/data/site'
import { ogSize, terminalCard } from '@/lib/og'

export const alt = `A project by ${site.name}`
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export const dynamicParams = false

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  return terminalCard({
    command: `cat projects/${slug}.md`,
    title: project?.title ?? slug,
    subtitle: project?.pitch ?? '',
    footer: project ? `${project.stack.slice(0, 5).join(' · ')}` : site.name,
  })
}
