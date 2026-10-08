import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const TIPS = [
  'Press Ctrl K (⌘K on Mac) to jump anywhere.',
  'Tap a loadout item to see which matches used it.',
  'Swipe between matches when a match is open.',
  'Some achievements are hidden in plain sight.',
  'Say hi to Byte in the corner. Click it for tips.',
];

const KEY = 'porto:booted';
const DURATION = 1600;

function alreadyBooted() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

// "Matchmaking" splash, shown once per browser session.
export default function BootScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !alreadyBooted();
  });
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(false), DURATION);
    const skip = (e) => {
      if (e.type === 'keydown' && !['Escape', 'Enter', ' '].includes(e.key)) return;
      setShow(false);
    };
    window.addEventListener('keydown', skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', skip);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-void bg-grid px-6"
          role="status"
          aria-label="Loading"
        >
          <div className="w-full max-w-sm text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="hud-cut mx-auto mb-6 grid h-16 w-16 place-items-center bg-ember font-display text-2xl font-bold text-white [--cut:12px]"
            >
              SA
            </motion.div>
            <p className="hud-label mb-3 text-ember">Matchmaking</p>
            <div className="h-1.5 w-full overflow-hidden bg-line">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION / 1000 - 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-gradient-to-r from-ember to-gold"
              />
            </div>
            <p className="mt-6 text-sm text-mute">
              <span className="font-display font-semibold uppercase tracking-wider text-gold">Tip · </span>
              {tip}
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-dim">Tap to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
