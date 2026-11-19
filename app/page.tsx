import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { ProjectList } from '@/components/project-list'
import { Prompt } from '@/components/prompt'
import { StackTree } from '@/components/stack-tree'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Home() {
  return (
    <>
      <Hero />

      <section id="projects" tabIndex={-1} aria-labelledby="projects-heading" className="py-16 outline-none sm:py-24">
        <h2 id="projects-heading">
          <Prompt command="ls -l projects/" label="Projects" />
        </h2>
        <div className="mt-6">
          <ProjectList />
        </div>
      </section>

      <section id="stack" tabIndex={-1} aria-labelledby="stack-heading" className="pt-16 pb-24 outline-none sm:pt-24 sm:pb-32">
        <h2 id="stack-heading">
          <Prompt command="tree stack/" label="Skills and tech stack" />
        </h2>
        <div className="mt-6">
          <StackTree />
        </div>
      </section>
    </>
  )
}
