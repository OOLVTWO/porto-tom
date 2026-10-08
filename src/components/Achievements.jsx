import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock, Trophy, X } from 'lucide-react';
import { ACHIEVEMENTS, useAchievements } from '../lib/achievements';
import * as sfx from '../lib/sfx';

const BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

function Toast({ toast }) {
  const { dismiss } = useAchievements();
  useEffect(() => {
    const t = setTimeout(() => dismiss(toast.key), 3800);
    return () => clearTimeout(t);
  }, [toast.key, dismiss]);
  const a = BY_ID[toast.id];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      className="hud-cut pointer-events-auto flex w-72 items-center gap-3 border border-gold/40 bg-panel/95 p-3 shadow-[0_0_30px_-8px_rgba(245,196,81,0.5)] backdrop-blur"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center bg-gold/15 text-gold">
        <Trophy size={20} />
      </span>
      <div className="min-w-0">
        <p className="hud-label text-gold">Achievement unlocked</p>
        <p className="font-display text-base font-bold uppercase tracking-wide text-white">{a.name}</p>
      </div>
    </motion.div>
  );
}

export function AchievementToasts() {
  const { toasts } = useAchievements();
  return (
    <div
      className="pointer-events-none fixed right-4 top-20 z-[60] flex flex-col items-end gap-2"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast key={t.key} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function TrophyRoom({ open, onClose }) {
  const { unlocked, reset } = useAchievements();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-void/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Achievements"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="pb-safe max-h-[85vh] w-full overflow-y-auto border border-line bg-panel sm:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="hud-label">Trophy room</p>
                <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  {unlocked.length} / {ACHIEVEMENTS.length} unlocked
                </p>
              </div>
              <button onClick={onClose} autoFocus className="grid h-9 w-9 place-items-center text-mute hover:text-white" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <ul className="divide-y divide-line">
              {ACHIEVEMENTS.map((a) => {
                const got = unlocked.includes(a.id);
                return (
                  <li key={a.id} className="flex items-center gap-4 px-5 py-3.5">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center ${got ? 'bg-gold/15 text-gold' : 'bg-raised text-dim'}`}>
                      {got ? <Trophy size={18} /> : <Lock size={16} />}
                    </span>
                    <div>
                      <p className={`font-display text-sm font-bold uppercase tracking-wider ${got ? 'text-white' : 'text-mute'}`}>{a.name}</p>
                      <p className="text-xs text-dim">{a.hint}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {unlocked.length > 0 && (
              <div className="border-t border-line px-5 py-3 text-right">
                <button onClick={reset} className="font-mono text-[11px] uppercase tracking-widest text-dim hover:text-ember">
                  Reset progress
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const LEVEL_STYLES = [
  'from-white via-cyan to-cyan',
  'from-white via-cyan to-gold',
  'from-white via-gold to-gold',
  'from-white via-gold to-ember',
  'from-gold via-ember to-ember-deep',
];

// MLBB-style announcer banner. `item` = { key, title, subtitle, level (1-5) }.
export function AnnounceBanner({ item }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[75] grid place-items-center overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.key}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.25 } }}
          >
            <motion.div
              className="absolute top-1/2 h-24 w-[140vw] -translate-y-1/2 -skew-y-3 bg-gradient-to-r from-transparent via-void/85 to-transparent sm:h-32"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 h-[2px] w-[120vw] bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            {item.level >= 5 && (
              <motion.div
                className="absolute h-56 w-56 rounded-full bg-ember/30 blur-3xl"
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            )}
            <motion.p
              className={`relative -skew-x-6 bg-gradient-to-b bg-clip-text px-6 text-center font-display text-5xl font-bold uppercase italic tracking-wider text-transparent drop-shadow-[0_0_24px_rgba(255,90,54,0.6)] sm:text-7xl ${
                LEVEL_STYLES[(item.level || 5) - 1]
              }`}
              initial={{ scale: 2.4, opacity: 0, letterSpacing: '0.4em' }}
              animate={{ scale: 1, opacity: 1, letterSpacing: '0.06em', x: item.level >= 4 ? [0, -6, 6, -3, 0] : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18, x: { delay: 0.15, duration: 0.3 } }}
            >
              {item.title}!
            </motion.p>
            {item.subtitle && (
              <motion.p
                className="relative mt-1 max-w-[80vw] truncate font-display text-xs font-bold uppercase tracking-[0.4em] text-ink/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {item.subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Plays a chime for each new achievement, and the big Legendary announcement for the last one.
export function Announcer() {
  const { toasts } = useAchievements();
  const [current, setCurrent] = useState(null);
  const seen = useRef(new Set());

  useEffect(() => {
    const fresh = toasts.filter((t) => !seen.current.has(t.key));
    if (!fresh.length) return;
    fresh.forEach((t) => seen.current.add(t.key));
    const legendary = fresh.find((t) => t.id === 'savage');
    if (!legendary) {
      sfx.achievement();
      return;
    }
    sfx.legendary();
    setCurrent({ key: legendary.key, title: BY_ID.savage.name, subtitle: 'Every achievement unlocked', level: 5 });
    const t = setTimeout(() => setCurrent(null), 2200);
    return () => clearTimeout(t);
  }, [toasts]);

  return <AnnounceBanner item={current} />;
}
