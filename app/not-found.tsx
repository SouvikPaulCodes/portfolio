import Link from 'next/link'
import { Prompt } from '@/components/prompt'

export default function NotFound() {
  return (
    <section className="space-y-2 pt-24 pb-32 font-mono text-sm sm:pt-40">
      <h1 className="sr-only">Page not found</h1>
      <p>
        <Prompt command="cd ./this-page" />
      </p>
      <p className="text-muted">bash: cd: ./this-page: No such file or directory</p>
      <p className="pt-6">
        <Link href="/" className="text-accent underline-offset-4 hover:underline">
          cd ~
        </Link>
        <span className="text-muted"> # back to the home page</span>
      </p>
    </section>
  )
}
