# Tony Kang — Developer Portfolio

A personal portfolio for **Tony (Wen-Teng) Kang** — a software engineer with a
finance background, currently reading MSc Computer Science at the University of
Birmingham. Built as a fast, responsive, dark-editorial single-page site with
full case studies for each project.

🔗 **Live:** _add your Vercel URL here after deploying_
&nbsp;·&nbsp; 💻 **GitHub:** [@Ynot1996](https://github.com/Ynot1996)
&nbsp;·&nbsp; 💼 **LinkedIn:** [tony-kang](https://www.linkedin.com/in/tony-kang-a353271bb/)

---

## Features

- **Dark editorial design** with a light/dark theme toggle (no flash on load)
- **Fully responsive** — mobile-first, with a hamburger drawer and fluid typography
- **Filterable projects** by type (AI & Data · Hackathon · Full-stack & Side · Team & Course)
- **Per-project case studies** at `/projects/[slug]` — background story, role, stack,
  links, and a visual **system-architecture diagram**
- **Career timeline** merging education, work, projects and awards
- Statically generated (SSG) for fast loads and good SEO

## Tech stack

| Area      | Tools                                              |
| --------- | -------------------------------------------------- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router)     |
| Language  | TypeScript                                         |
| Styling   | Tailwind CSS, CSS variables for theming            |
| Animation | Framer Motion                                      |
| Theming   | next-themes                                        |
| Icons     | react-icons                                        |
| Hosting   | Vercel                                             |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Production build
npm run build
npm run start
```

Requires Node.js 18.17+ (Node 20 LTS recommended).

## Project structure

```
app/
├─ layout.tsx              # root layout, fonts, ThemeProvider, Nav + Footer
├─ page.tsx                # home (Hero · TechStack · Projects · Timeline · Contact)
├─ data.ts                 # single source of truth: profile, stack, projects, timeline
├─ globals.css             # theme tokens (light/.dark) + utilities
├─ components/             # Hero, Projects, ProjectCard, Timeline, ArchitectureDiagram, ...
└─ projects/[slug]/page.tsx # generated case-study page per project
public/images/             # photography (see CREDITS.md)
```

## Editing content

All content lives in [`app/data.ts`](app/data.ts) — update `profile`, `techGroups`,
`projects` (including each project's `story` and `architecture`) and `timeline`
there. Pages and the project routes are generated from this file, so no component
changes are needed to add or edit a project.

## Deploy to Vercel

This is a standard Next.js app and deploys to Vercel with **zero configuration**.

1. Push the repo to GitHub (already done).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the
   `Ynot1996/portfolio_v2` repository.
3. Vercel auto-detects **Next.js** — keep the defaults (Build: `next build`,
   Output: `.next`). No environment variables are required.
4. Click **Deploy**. Every push to the production branch redeploys automatically,
   and each pull request gets its own preview URL.

> Tip: after the first deploy, paste your `*.vercel.app` URL into the **Live** link
> at the top of this README.

## Credits & licence

Photography is from [Unsplash](https://unsplash.com) under the Unsplash License
(see [`public/images/CREDITS.md`](public/images/CREDITS.md)). Code is released for
personal/portfolio use.
