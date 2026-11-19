/**
 * Every project on the site comes from this file.
 * To add one, append an object to `projects`; the listing, detail page,
 * command palette, sitemap and share image all pick it up.
 */

export type ProjectStatus = 'live' | 'in progress' | 'archived'

type Highlights =
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]

export type Project = {
  /** URL segment: /projects/<slug> */
  slug: string
  title: string
  /** One line, shown under the name in the listing and as the page description. */
  pitch: string
  description: {
    problem: string
    built: string
    outcome: string
  }
  role: string
  stack: string[]
  /** 3 to 5 bullets. */
  highlights: Highlights
  /** Omit to hide the "live" button. */
  live?: string
  /** A GitHub URL, 'private' to show a private-repo label, or omit to show nothing. */
  repo?: string | 'private'
  /**
   * Image in /public, e.g. '/projects/foo.png' (16:10 works best).
   * If the file is missing, a placeholder frame is shown instead.
   */
  screenshot?: { src: string; alt: string }
  status: ProjectStatus
  /** Shown in the listing. */
  year: string
  /** Optional longer date range for the detail page; falls back to `year`. */
  dates?: string
  /** Small caveats shown above the screenshot, e.g. cold starts. */
  notes?: string[]
}

export const projects: Project[] = [
  {
    slug: 'nripelligola',
    title: 'NRIPelliGola',
    pitch: 'A matrimonial platform for the NRI diaspora: where meaningful marriages happen.',
    description: {
      problem:
        'People of Indian origin living abroad want to meet a life partner they can trust. That means verified profiles, private conversations, and a sign-up flow that is easy to finish.',
      built:
        'As lead full-stack developer I worked across the Next.js frontend and the Node.js + Express + MongoDB API: real-time chat, identity verification, onboarding and promotions, admin tooling, and the installable web app.',
      outcome: 'Live in production at app.nripelligola.com. Everything listed below shipped to members.',
    },
    role: 'Lead full-stack developer',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Socket.io', 'AWS'],
    highlights: [
      'Real-time chat on Socket.io with delivery receipts, automatic reconnection when the browser comes back online (outgoing messages are queued until the socket is ready), and paginated message history.',
      'Identity verification: document and face checks through Didit and AWS Rekognition (face detection and matching), with verification media moved into S3.',
      'Overhauled onboarding, and shipped scratch-card promotions with expiry and reminder emails.',
      'Admin tooling: dashboard charts, user management, and verification status with history for manual review.',
      'Installable PWA with web push notifications, including alerts when someone views your profile.',
    ],
    live: 'https://app.nripelligola.com/',
    repo: 'private',
    screenshot: { src: '/projects/nripelligola.png', alt: 'NRIPelliGola landing page' },
    status: 'live',
    year: '2026',
    dates: 'Jan – Jul 2026',
  },
  {
    slug: 'wework',
    title: 'WeWork',
    pitch: 'A real-time collaborative document editor: many hands, one page.',
    description: {
      problem:
        'Writing a document with other people usually means taking turns, passing versions around, or discussing changes somewhere other than the document itself.',
      built:
        'A Next.js editor backed by a separate Node.js server. Edits are Yjs CRDT updates synced over WebSockets through Hocuspocus, so concurrent changes merge without conflicts, and every document has its own chat.',
      outcome:
        'Live, with the frontend on Vercel and the real-time server on Render. You can create a personal document or a team workspace and write with others in real time.',
    },
    role: 'Solo developer',
    stack: ['Next.js', 'TypeScript', 'Tiptap', 'Yjs', 'Hocuspocus', 'Socket.io', 'Express', 'PostgreSQL', 'Prisma', 'Clerk'],
    highlights: [
      'Conflict-free co-editing: Tiptap 3 on Yjs CRDTs, synced through a Hocuspocus WebSocket server, with document state stored as binary Yjs updates in Postgres (debounced writes).',
      'Live cursors and presence: each collaborator gets a name-tagged caret and avatar, coloured from their user id so everyone sees the same colour.',
      'Offline-first: a local IndexedDB copy keeps edits safe without a connection and syncs on reconnect, with a Live / Saving / Offline indicator.',
      'Per-document chat over Socket.io rooms, persisted to Postgres, with grouped messages and unread badges.',
      'Clerk auth with Organizations for personal and team workspaces; the Next.js server signs 24-hour JWTs that authorize both the WebSocket and REST APIs.',
    ],
    live: 'https://we-work-three.vercel.app/',
    repo: 'https://github.com/SouvikPaulCodes/Real_Time_Collab_App',
    screenshot: { src: '/projects/wework.png', alt: 'WeWork landing page with a live collaborative editor preview' },
    status: 'live',
    year: '2026',
    notes: [
      'Requires a free account to try.',
      "The real-time server runs on Render's free tier and sleeps when idle, so the first connection can take up to a minute.",
    ],
  },
  {
    slug: 'heiman',
    title: 'Heiman',
    pitch: 'A full-stack real-time chat app with image messages, online presence and 32 themes.',
    description: {
      problem:
        'One-to-one chat has to feel instant: new messages and who is online should appear without a refresh.',
      built:
        'A React + Vite client, migrated from JavaScript to TypeScript, talking to an Express + MongoDB API, with Socket.io pushing new messages and online status to connected users.',
      outcome: 'Deployed as a single Render service: Express serves both the API and the built client.',
    },
    role: 'Solo developer',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Cloudinary'],
    highlights: [
      'Real-time one-to-one messaging over Socket.io, with live online/offline indicators.',
      'Image messages and profile pictures uploaded through Cloudinary.',
      'Cookie-based auth: JWTs in httpOnly cookies, passwords hashed with bcrypt.',
      '32 switchable DaisyUI themes, remembered across visits.',
      'Frontend migrated from JavaScript to TypeScript, with Zustand stores for auth, chat and theme.',
    ],
    live: 'https://heiman.onrender.com',
    repo: 'https://github.com/SouvikPaulCodes/Heiman',
    screenshot: { src: '/projects/heiman.png', alt: 'Heiman sign-in page' },
    status: 'live',
    year: '2025',
    notes: ["Hosted on Render's free tier, which sleeps when idle, so the first load can take up to a minute."],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
