import {
  siNextdotjs, siReact, siTypescript, siJavascript, siSupabase, siPostgresql, siTailwindcss,
  siVite, siVercel, siDiscord, siPhp, siHtml5, siDrizzle, siI18next,
} from 'simple-icons';
import { PROJECTS } from './projects';

// tier: core = daily drivers · main = used often · support = situational
export const TIERS = {
  core: { label: 'Core', tone: 'gold' },
  main: { label: 'Main', tone: 'ember' },
  support: { label: 'Support', tone: 'cyan' },
};

const ITEMS = [
  { id: 'nextjs', name: 'Next.js', tier: 'core', icon: siNextdotjs, blurb: 'My default for anything with a backend: App Router, server actions, API routes and cron jobs.' },
  { id: 'react', name: 'React', tier: 'core', icon: siReact, blurb: 'Component architecture, hooks and state that stays readable as the app grows.' },
  { id: 'supabase', name: 'Supabase', tier: 'core', icon: siSupabase, blurb: 'Auth, Postgres, Storage and Realtime, with Row Level Security doing the access control.' },
  { id: 'tailwind', name: 'Tailwind CSS', tier: 'core', icon: siTailwindcss, blurb: 'Fast, consistent UI work, with design tokens kept in one place.' },
  { id: 'typescript', name: 'TypeScript', tier: 'main', icon: siTypescript, blurb: 'Typed data models from the database up, so refactors don’t break things quietly.' },
  { id: 'javascript', name: 'JavaScript', tier: 'main', icon: siJavascript, blurb: 'Plain JS when a framework would be overkill.' },
  { id: 'postgres', name: 'PostgreSQL', tier: 'main', icon: siPostgresql, blurb: 'Schemas, migrations, RLS policies and SQL functions.' },
  { id: 'vercel', name: 'Vercel', tier: 'main', icon: siVercel, blurb: 'Deploys, environment config, cron jobs and Blob storage.' },
  { id: 'html', name: 'HTML & CSS', tier: 'main', icon: siHtml5, blurb: 'Hand-built pages with no build step, like the illustrated landing pages.' },
  { id: 'drizzle', name: 'Drizzle ORM', tier: 'support', icon: siDrizzle, blurb: 'Type-safe queries and generated migrations on Postgres.' },
  { id: 'discord', name: 'Discord API', tier: 'support', icon: siDiscord, blurb: 'OAuth2, bot actions over REST and automated announcements.' },
  { id: 'i18n', name: 'i18n', tier: 'support', icon: siI18next, blurb: 'Bilingual interfaces (EN/ID) and documents in more than one language.' },
  { id: 'vite', name: 'Vite', tier: 'support', icon: siVite, blurb: 'Lightweight React single-page apps, including this site.' },
  { id: 'php', name: 'PHP', tier: 'support', icon: siPhp, blurb: 'Classic server-rendered apps, mostly from coursework.' },
  // No brand icon for these two; drawn with `glyph` instead.
  { id: 'pdf', name: 'PDF & Excel', tier: 'support', glyph: 'file', blurb: 'Invoices, contracts and multi-sheet reports generated in the app.' },
  { id: 'charts', name: 'Charts', tier: 'support', glyph: 'chart', blurb: 'Revenue and sales dashboards with Recharts.' },
];

export const LOADOUT = ITEMS.map((item) => ({
  ...item,
  usedIn: PROJECTS.filter((p) => p.items.includes(item.id)).map((p) => p.slug),
}));

export const ITEM_BY_ID = Object.fromEntries(LOADOUT.map((i) => [i.id, i]));
