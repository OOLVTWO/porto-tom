import { forwardRef, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { MODES, PROJECTS, RESULTS } from '../data/projects';
import { ITEM_BY_ID } from '../data/loadout';
import { Badge, BrandIcon, SectionHeader, Shot, TONES } from '../components/ui';

// forwardRef: AnimatePresence's popLayout mode needs a ref to measure exiting rows.
const MatchRow = forwardRef(function MatchRow({ project, onOpen }, ref) {
  const result = RESULTS[project.result];
  const tone = TONES[result.tone];
  const cover = project.shots.find((s) => s.device === 'desktop') || project.shots[0];

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={() => onOpen(project.slug)}
        className="group relative grid w-full grid-cols-1 overflow-hidden border border-line bg-panel text-left transition-colors hover:border-ember/50 hover:bg-raised sm:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr_auto]"
      >
        <span className={`absolute inset-y-0 left-0 z-10 w-1 ${tone.bg}`} aria-hidden="true" />

        <div className="relative aspect-[16/9] overflow-hidden bg-raised sm:aspect-auto sm:h-full">
          <Shot
            src={cover.src}
            alt={`${project.title} screenshot`}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel/80 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-panel/60" />
          <Badge tone={result.tone} className="absolute left-3 top-3 bg-void/80 backdrop-blur sm:hidden">
            {result.label}
          </Badge>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="mb-2 hidden items-center gap-2 sm:flex">
            <Badge tone={result.tone}>{result.label}</Badge>
            <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
              {project.mode} · {project.date}
            </span>
          </div>
          <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mute">{project.tagline}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-dim">
              {project.items.slice(0, 6).map((id) => (
                <span key={id} title={ITEM_BY_ID[id].name}>
                  <BrandIcon item={ITEM_BY_ID[id]} size={15} />
                </span>
              ))}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-dim sm:hidden">{project.date}</span>
          </div>
        </div>

        <div className="hidden items-center gap-6 border-l border-line px-6 lg:flex">
          {project.stats.map((s) => (
            <div key={s.k} className="w-24 text-center">
              <p className="font-mono text-lg font-bold text-white">{s.v}</p>
              <p className="hud-label mt-0.5 text-[9px]">{s.k}</p>
            </div>
          ))}
          <ChevronRight className="text-dim transition-transform group-hover:translate-x-1 group-hover:text-ember" />
        </div>
      </button>
    </motion.li>
  );
});

export default function MatchHistory({ itemFilter, onClearItem, onOpenMatch }) {
  const [mode, setMode] = useState('all');

  const visible = useMemo(
    () =>
      PROJECTS.filter((p) => (mode === 'all' || p.mode === mode) && (!itemFilter || p.items.includes(itemFilter))),
    [mode, itemFilter],
  );
  const counts = useMemo(
    () => Object.fromEntries(MODES.map((m) => [m.id, PROJECTS.filter((p) => m.id === 'all' || p.mode === m.id).length])),
    [],
  );

  return (
    <section id="matches" className="scroll-mt-16 border-t border-line bg-panel/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader index="03" kicker="Match history" title="Every project, no filler">
          Real repos from my GitHub, with screenshots taken from the actual apps. Open any match for the full breakdown.
        </SectionHeader>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={mode === m.id}
                onClick={() => setMode(m.id)}
                className={`relative shrink-0 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  mode === m.id ? 'text-white' : 'text-mute hover:text-ink'
                }`}
              >
                {mode === m.id && <motion.span layoutId="mode-pill" className="absolute inset-0 border border-ember/50 bg-ember/10" />}
                <span className="relative">
                  {m.label} <span className="font-mono text-[10px] text-dim">{counts[m.id]}</span>
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {itemFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={onClearItem}
                className="flex items-center gap-2 self-start border border-gold/50 bg-gold/10 px-3 py-1.5 text-gold sm:self-auto"
              >
                <BrandIcon item={ITEM_BY_ID[itemFilter]} size={14} />
                <span className="font-display text-xs font-semibold uppercase tracking-wider">{ITEM_BY_ID[itemFilter].name}</span>
                <X size={14} aria-label="Clear item filter" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.ul layout className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <MatchRow key={p.slug} project={p} onOpen={onOpenMatch} />
            ))}
          </AnimatePresence>
        </motion.ul>
        {visible.length === 0 && (
          <p className="border border-dashed border-line px-4 py-10 text-center text-sm text-dim">
            No matches with that combo yet.{' '}
            <button
              onClick={() => {
                setMode('all');
                onClearItem();
              }}
              className="text-ember underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
