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

- Name, email, links, CV path: `src/lib/data.ts`
- Hero side cards (role fit, Ask Pilot answers, recent commits): `src/data/hero.ts`
- About stats and skills: `src/data/skills.ts`
- Projects (Work system map): `src/data/projects.ts`
- Internship work order and career tape milestones: `src/data/experience.ts`
- Pilot CLI case study: `src/app/projects/pilot-cli/page.tsx`
- Photo: `public/images/Subhash_pic.png` · Resume: `public/cv/subhash_cv.pdf`

The look lives in `src/app/workbench.css` (classes prefixed per section: `k*` hero, `ab3-` about, `wk-` work, `cr-` career, `ct-` contact). Motion turns off for visitors who set "reduce motion".

## Checks

```bash
npm run lint
npm run build
```
