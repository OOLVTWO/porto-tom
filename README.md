# Surya Adi Darmawan — Portfolio

An interactive portfolio styled like a game lobby. Built with React, Vite, Tailwind CSS and Motion.

## Concept
| Section | What it is |
|---|---|
| **Profile** | Full-bleed stage photo with cursor drift, self-rated attribute bars and quick stats |
| **Loadout** | Tech stack as items. Pick one to see which projects used it, or filter the match history by it |
| **Match History** | Every project, filterable by mode (client / community / personal / academic). Opens a detail view with screenshots, mission, key plays and links. Swipe or use ←/→ to move between matches |
| **Highlights** | Off-screen photos (tournament PIC, moments) in a swipeable carousel |
| **Invite to Party** | Contact form that sends through WhatsApp or email with the message pre-filled |

Extras:
- XP bar that fills as you scroll, plus 8 achievements saved in `localStorage`
- Kill-streak announcer in the match history: each match opened in a row climbs First Blood → Double Kill → Triple Kill → Maniac → Savage (then stays on Savage). Landing on match #1 starts over.
- Byte, a draggable robot companion with tips, plus spark/"+XP" click effects
- Command menu with `Ctrl K` / `⌘K`
- "Matchmaking" boot screen, shown once per session
- Bottom tab bar on mobile, full keyboard support, honours `prefers-reduced-motion`

## Editing content
All content lives in `src/data/`:
- `projects.js`: projects (match history). Screenshots go in `public/projects/<slug>/`
- `loadout.js`: tech items. The "used in" lists are generated from `projects.js`
- `profile.js`: name, intro, attribute bars, socials and highlight photos

## Sound
All sounds are synthesised in `src/lib/sfx.js` with the Web Audio API (no voice). Each kill-streak level plays one quick hit per level before the impact, so Double Kill has 2, Triple Kill 3 and so on. Visitors can mute with the speaker button in the top bar.

To use your own recordings (for example a voice line you recorded or a royalty-free pack), put the files in `public/sfx/` and map them in `CUSTOM_FILES` at the top of `src/lib/sfx.js`:

```js
const CUSTOM_FILES = {
  'streak-1': '/sfx/first-blood.mp3',
  'streak-5': '/sfx/savage.mp3',
};
```

Mapped files replace the synth for that sound. Don't use the official MLBB announcer audio; it belongs to Moonton.

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
