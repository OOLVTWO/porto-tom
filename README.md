# Surya Adi Darmawan — Portfolio

An interactive portfolio styled like a game lobby. Built with React, Vite, Tailwind CSS and Motion.

## Concept
| Section | What it is |
|---|---|
| **Profile** | Player card that tilts with the cursor, self-rated attribute bars and quick stats |
| **Loadout** | Tech stack as items. Pick one to see which projects used it, or filter the match history by it |
| **Match History** | Every project, filterable by mode (client / community / personal / academic). Opens a detail view with screenshots, mission, key plays and links. Swipe or use ←/→ to move between matches |
| **Highlights** | Off-screen photos (tournament PIC, moments) in a swipeable carousel |
| **Invite to Party** | Contact form that opens the visitor's mail app with everything pre-filled |

Extras:
- XP bar that fills as you scroll, plus achievements (First Blood, Triple Kill, Savage, etc.) saved in `localStorage`
- Command menu with `Ctrl K` / `⌘K`
- "Matchmaking" boot screen, shown once per session
- Bottom tab bar on mobile, full keyboard support, honours `prefers-reduced-motion`

## Editing content
All content lives in `src/data/`:
- `projects.js`: projects (match history). Screenshots go in `public/projects/<slug>/`
- `loadout.js`: tech items. The "used in" lists are generated from `projects.js`
- `profile.js`: name, intro, attribute bars, socials and highlight photos

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy on Vercel
Standard Vite project. Vercel auto-detects it:
1. Import the repo in Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`, output directory: `dist`.
4. Set the **Production Branch** to `main`.
