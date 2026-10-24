# subhash.live

Personal portfolio of Subhash Rana: full-stack engineer building AI coding agents and production web apps.

Built with Next.js 16, React 19, Tailwind CSS 4 and Framer Motion. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

- Name, bio, email, links, stats: `src/lib/data.ts`
- Projects: `src/data/projects.ts`
- Experience: `src/data/experience.ts`
- Tech marquee: `src/data/skills.ts`
- Pilot CLI case study: `src/app/projects/pilot-cli/page.tsx`
- Photo: `public/images/Subhash_pic.png` · Resume: `public/cv/subhash_cv.pdf`

Colours and animations live in `src/app/globals.css`. All motion turns off for visitors who set "reduce motion".

## Checks

```bash
npm run lint
npm run build
```
