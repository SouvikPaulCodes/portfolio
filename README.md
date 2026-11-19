# souvik — portfolio

A small, fully static portfolio styled like a terminal. Next.js (App Router) + TypeScript + Tailwind CSS v4, no backend, no runtime dependencies beyond Next and React.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; every route is prerendered
npm run lint
```

Requires Node.js 20.9 or newer.

## Add a project

Edit **`data/projects.ts`** and append an object to `projects`. The listing, the `/projects/<slug>` page, the command palette, the sitemap and the share image all update automatically. TypeScript will tell you if a field is missing; `highlights` must have 3 to 5 items.

- `repo`: a GitHub URL, `'private'` (shows a "private repo" label), or omit it.
- `live`: omit to hide the live button.
- `screenshot`: put a 16:10 image (1600×1000 works well) in `public/projects/` and point `src` at it. If the file doesn't exist yet, the page shows a clean placeholder frame instead.
- `notes`: short caveats shown above the screenshot (e.g. "first load can take a minute").

Your name, tagline, links and skills live in `data/site.ts`.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No configuration is needed.

Canonical URLs, Open Graph tags and the sitemap use Vercel's production URL automatically. When you add a custom domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://souvik.dev`) in the Vercel project's environment variables and redeploy.

## Where things are

```
app/                 routes, metadata, share images, icons, sitemap/robots
components/          UI (server components, except the status bar, palette and theme toggle)
data/projects.ts     every project on the site
data/site.ts         name, tagline, links, skills
lib/                 theme + navigation helpers, share-image template
assets/fonts/        Geist Mono TTFs used only to render share images (SIL OFL)
```
