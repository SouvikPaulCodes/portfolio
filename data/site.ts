export const site = {
  name: 'Souvik Paul',
  handle: 'souvik',
  role: 'Full-stack developer',
  tagline: 'Full-stack TypeScript, from the database to the pixel.',
  description:
    'Souvik Paul is a full-stack developer building real-time web apps with TypeScript, Next.js, Node.js, MongoDB and PostgreSQL.',
  github: 'https://github.com/SouvikPaulCodes',
  email: 'souvik05.paul@gmail.com',
  /** Set NEXT_PUBLIC_SITE_URL once you have a custom domain; Vercel's production URL is used until then. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'Tiptap'],
  },
  { group: 'backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT/OAuth', 'Prisma'] },
  { group: 'databases', items: ['MongoDB', 'PostgreSQL'] },
  { group: 'real-time', items: ['Socket.io', 'WebSockets', 'Yjs (CRDTs)', 'Hocuspocus'] },
  { group: 'tooling', items: ['Docker', 'AWS (S3, Rekognition)', 'Vercel', 'Render', 'Git'] },
]
