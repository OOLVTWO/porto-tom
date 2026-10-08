import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock, Trophy, X } from 'lucide-react';
import { ACHIEVEMENTS, useAchievements } from '../lib/achievements';

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
