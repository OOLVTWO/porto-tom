# Surya Adi Darmawan — Portfolio

A single-page portfolio built with React, Vite, Tailwind CSS, and Lucide icons.

## Features
- Dark/light theme toggle (Tailwind `dark:` variant)
- Sticky navbar with smooth-scroll, active-section highlighting, and a mobile drawer menu
- Hero, About, Client Logos, Expertise, Portfolio Gallery, Stats, Testimonials, and Contact sections
- Animated stat counters and a testimonial carousel
- Fully responsive, mobile-first layout

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
This is a standard Vite project — Vercel auto-detects it, no config needed:
1. Import the repo in Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`, output directory: `dist` (both auto-filled).
4. Make sure the project's **Production Branch** is set to `main`.
