import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const COLORS = ['#FF5A36', '#F5C451', '#38D9F5'];
const RAYS = 6;

// A tiny spark burst and a floating "+XP" wherever the visitor clicks.
export default function ClickSparks() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    if (reduce) return;
    const onDown = (e) => {
      if (e.button !== 0) return;
      const id = `${Date.now()}-${Math.random()}`;
      setBursts((b) => [...b.slice(-5), { id, x: e.clientX, y: e.clientY, xp: 5 * (1 + Math.floor(Math.random() * 4)) }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 800);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((b) => (
          <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
            {Array.from({ length: RAYS }, (_, i) => {
              const a = (i / RAYS) * Math.PI * 2 + 0.3;
              return (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5"
                  style={{ background: COLORS[i % COLORS.length], marginLeft: -3, marginTop: -3 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(a) * 26, y: Math.sin(a) * 26, opacity: 0, scale: 0.4, rotate: 90 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              );
            })}
            <motion.span
              className="absolute -translate-x-1/2 whitespace-nowrap font-display text-xs font-bold text-gold drop-shadow-[0_0_6px_rgba(245,196,81,0.7)]"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: -42, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              +{b.xp} XP
            </motion.span>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
