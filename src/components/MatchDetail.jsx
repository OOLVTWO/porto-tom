import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Lock, Monitor, Smartphone, X } from 'lucide-react';
import { PROJECTS, RESULTS } from '../data/projects';
import { ITEM_BY_ID } from '../data/loadout';
import { Badge, BrandIcon, Shot } from './ui';

function ShotViewer({ project }) {
  const [idx, setIdx] = useState(0);
  const shot = project.shots[idx] || project.shots[0];

  return (
    <div>
      <div className="relative grid min-h-[220px] place-items-center overflow-hidden border border-line bg-void bg-grid p-3 sm:min-h-[340px] sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={shot.src}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={shot.device === 'mobile' ? 'w-[180px] sm:w-[220px]' : 'w-full'}
          >
            {shot.device === 'mobile' ? (
              <div className="rounded-[26px] border-4 border-raised bg-raised p-1 shadow-2xl">
                <Shot src={shot.src} alt={`${project.title}, ${shot.label} on mobile`} className="aspect-[390/844] w-full rounded-[20px]" />
              </div>
            ) : (
              <div className="overflow-hidden border border-line bg-raised shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="ml-2 truncate font-mono text-[10px] text-dim">
                    {project.live ? project.live.replace('https://', '') : `${project.slug}.local`}
                  </span>
                </div>
                <Shot src={shot.src} alt={`${project.title}, ${shot.label} on desktop`} className="aspect-[16/10] w-full" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {project.shots.length > 1 && (
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto" role="tablist" aria-label="Screenshots">
          {project.shots.map((s, i) => {
            const Icon = s.device === 'mobile' ? Smartphone : Monitor;
            return (
              <button
                key={s.src}
                role="tab"
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className={`flex shrink-0 items-center gap-2 border px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  i === idx ? 'border-ember/60 bg-ember/10 text-white' : 'border-line text-mute hover:text-ink'
                }`}
              >
                <Icon size={13} /> {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MatchDetail({ slug, onClose, onNavigate }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const scroller = useRef(null);
  const [dir, setDir] = useState(0);

  const go = (target, d) => {
    setDir(d);
    onNavigate(target.slug);
  };

  useEffect(() => {
    if (!slug) return;
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [Boolean(slug)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!slug) return;
    scroller.current?.scrollTo({ top: 0 });
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.target instanceof HTMLElement && e.target.closest('[role="tablist"]')) return;
      if (e.key === 'ArrowRight') go(next, 1);
      if (e.key === 'ArrowLeft') go(prev, -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }); // re-bind each render so prev/next are current

  const result = project && RESULTS[project.result];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="match-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-void/80 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="match-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-[94dvh] w-full flex-col border border-line bg-panel sm:h-auto sm:max-h-[90vh] sm:max-w-5xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
              <Badge tone={result.tone}>{result.label}</Badge>
              <span className="truncate font-mono text-[11px] uppercase tracking-wider text-dim">
                {project.mode} · {project.date}
              </span>
              <span className="ml-auto font-mono text-[11px] text-dim">
                {index + 1}/{PROJECTS.length}
              </span>
              <button onClick={onClose} autoFocus className="grid h-9 w-9 place-items-center text-mute hover:text-white" aria-label="Close match">
                <X size={20} />
              </button>
            </div>

            <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={project.slug}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.2 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragSnapToOrigin
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -90) go(next, 1);
                    else if (info.offset.x > 90) go(prev, -1);
                  }}
                  className="p-4 sm:p-6"
                >
                  <div className="grid gap-6 md:grid-cols-5 lg:gap-8">
                    <div className="min-w-0 md:col-span-3">
                      <ShotViewer key={project.slug} project={project} />
                    </div>

                    <aside className="min-w-0 space-y-5 md:col-span-2">
                      <div>
                        <h2 id="match-title" className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                          {project.title}
                        </h2>
                        <p className="mt-2 leading-relaxed text-ink">{project.tagline}</p>
                      </div>

                      <div>
                        <h3 className="hud-label mb-1.5">My role</h3>
                        <p className="text-sm leading-relaxed text-mute">{project.role}</p>
                      </div>

                      <div className="grid grid-cols-2 border border-line">
                        {project.stats.map((s, i) => (
                          <div key={s.k} className={`p-3 ${i ? 'border-l border-line' : ''}`}>
                            <p className="font-mono text-lg font-bold text-white">{s.v}</p>
                            <p className="hud-label text-[9px]">{s.k}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Visit live site <ExternalLink size={15} />
                          </a>
                        )}
                        {project.repo ? (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <Github size={15} /> View code
                          </a>
                        ) : (
                          <span className="flex items-center justify-center gap-2 border border-dashed border-line px-4 py-3 text-xs text-dim">
                            <Lock size={13} /> Private client repo
                          </span>
                        )}
                      </div>
                    </aside>
                  </div>

                  <div className="mt-8 grid gap-8 border-t border-line pt-6 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <h3 className="hud-label mb-2 text-ember">Mission</h3>
                      <p className="leading-relaxed text-mute">{project.mission}</p>

                      <h3 className="hud-label mb-2 mt-6">Items used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.items.map((id) => (
                          <span key={id} className="flex items-center gap-1.5 border border-line bg-raised px-2 py-1 text-xs text-ink">
                            <BrandIcon item={ITEM_BY_ID[id]} size={13} className="text-mute" />
                            {ITEM_BY_ID[id].name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="hud-label mb-3 text-ember">Key plays</h3>
                      <ul className="space-y-2.5">
                        {project.plays.map((play) => (
                          <li key={play} className="flex gap-3 text-sm leading-relaxed text-mute">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                            {play}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pb-safe grid grid-cols-2 border-t border-line">
              <button
                onClick={() => go(prev, -1)}
                className="flex min-w-0 items-center gap-3 px-4 py-3 text-left text-mute transition-colors hover:bg-raised hover:text-white sm:px-6"
              >
                <ArrowLeft size={18} className="shrink-0" />
                <span className="min-w-0">
                  <span className="hud-label block text-[9px]">Previous</span>
                  <span className="block truncate font-display text-sm font-semibold uppercase tracking-wide">{prev.title}</span>
                </span>
              </button>
              <button
                onClick={() => go(next, 1)}
                className="flex min-w-0 items-center justify-end gap-3 border-l border-line px-4 py-3 text-right text-mute transition-colors hover:bg-raised hover:text-white sm:px-6"
              >
                <span className="min-w-0">
                  <span className="hud-label block text-[9px]">Next</span>
                  <span className="block truncate font-display text-sm font-semibold uppercase tracking-wide">{next.title}</span>
                </span>
                <ArrowRight size={18} className="shrink-0" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
