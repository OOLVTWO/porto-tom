import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { X } from 'lucide-react';
import { ACHIEVEMENTS, useAchievements } from '../lib/achievements';
import * as sfx from '../lib/sfx';

// Byte: a small robot companion. Eyes track the cursor, it hints per section,
// emotes on click and cheers when an achievement unlocks.

const SECTION_TIPS = {
  profile: 'Hi, I’m Byte! Welcome to Surya’s lobby.',
  loadout: 'Tap an item to see which matches used it.',
  matches: 'Open matches in a row to build a kill streak. Sound on!',
  highlights: 'This is the off-screen side of the lobby.',
  party: 'Ready to party up? WhatsApp gets the fastest reply.',
};

const CLICK_LINES = [
  'GG!',
  'Try Ctrl K (⌘K) to jump anywhere.',
  'Psst… there are 8 achievements to unlock.',
  'Open matches back to back for a kill streak!',
  'Need a website? Invite Surya to your party!',
  'Drag me around if I’m in the way.',
  'Every match here is a real project.',
];

const BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));
const KEY = 'porto:byte';

function readHidden() {
  try {
    return localStorage.getItem(KEY) === 'off';
  } catch {
    return false;
  }
}

function writeHidden(off) {
  try {
    localStorage.setItem(KEY, off ? 'off' : 'on');
  } catch {
    /* ignore */
  }
}

function Eye({ x, mood, blink }) {
  if (mood === 'happy') {
    return <path d={`M${x - 3} 30 Q${x} 25 ${x + 3} 30`} stroke="#38D9F5" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  }
  return (
    <motion.rect
      x={x - 2.5}
      y={mood === 'wow' ? 23 : 24}
      width="5"
      height={mood === 'wow' ? 10 : 8}
      rx="2.5"
      fill="#38D9F5"
      animate={{ scaleY: blink ? 0.1 : 1 }}
      transition={{ duration: 0.08 }}
      style={{ originY: '28px' }}
    />
  );
}

function ByteSprite({ mood, lookX, lookY, blink }) {
  return (
    <svg viewBox="0 0 64 72" className="h-full w-full overflow-visible" aria-hidden="true">
      {/* thruster flame */}
      <motion.path
        d="M26 60 Q32 74 38 60 Z"
        fill="url(#byte-flame)"
        animate={{ scaleY: [1, 0.7, 1.1, 0.85, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ originY: '60px', originX: '32px' }}
      />
      <defs>
        <linearGradient id="byte-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5C451" />
          <stop offset="1" stopColor="#FF5A36" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <line x1="32" y1="12" x2="32" y2="5" stroke="#5A6378" strokeWidth="2" />
      <motion.circle
        cx="32"
        cy="4"
        r="3"
        fill="#F5C451"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      {/* body */}
      <rect x="20" y="44" width="24" height="15" rx="4" fill="#0D111B" stroke="#222B3F" strokeWidth="2" />
      <motion.rect
        x="29"
        y="49"
        width="6"
        height="5"
        rx="1"
        fill="#FF5A36"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      {/* head */}
      <rect x="9" y="11" width="46" height="35" rx="11" fill="#131927" stroke="#FF5A36" strokeWidth="2.5" />
      <rect x="15" y="18" width="34" height="21" rx="7" fill="#07090F" />
      <motion.g style={{ x: lookX, y: lookY }}>
        <Eye x={25} mood={mood} blink={blink} />
        <Eye x={39} mood={mood} blink={blink} />
        {mood === 'happy' && (
          <>
            <circle cx="20" cy="34" r="2" fill="#FF5A36" opacity="0.7" />
            <circle cx="44" cy="34" r="2" fill="#FF5A36" opacity="0.7" />
          </>
        )}
      </motion.g>
    </svg>
  );
}

export default function Byte({ active }) {
  const reduce = useReducedMotion();
  const { toasts } = useAchievements();
  const [hidden, setHidden] = useState(readHidden);
  const [bubble, setBubble] = useState(null);
  const [mood, setMood] = useState('idle');
  const [blink, setBlink] = useState(false);
  const [hop, setHop] = useState(0);
  const lineIdx = useRef(0);
  const tipped = useRef(new Set());
  const seenToasts = useRef(new Set());
  const bubbleTimer = useRef();
  const moodTimer = useRef();
  const body = useRef(null);
  const dragged = useRef(false);

  const lookXRaw = useMotionValue(0);
  const lookYRaw = useMotionValue(0);
  const lookX = useSpring(lookXRaw, { stiffness: 300, damping: 25 });
  const lookY = useSpring(lookYRaw, { stiffness: 300, damping: 25 });

  const say = useCallback((text, ms = 4200) => {
    clearTimeout(bubbleTimer.current);
    setBubble({ text, key: Date.now() });
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  const emote = useCallback((m, ms = 1400) => {
    clearTimeout(moodTimer.current);
    setMood(m);
    setHop((h) => h + 1);
    moodTimer.current = setTimeout(() => setMood('idle'), ms);
  }, []);

  // Eyes follow the pointer.
  useEffect(() => {
    if (hidden || reduce) return;
    const onMove = (e) => {
      const r = body.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      lookXRaw.set((dx / d) * Math.min(4, d / 40));
      lookYRaw.set((dy / d) * Math.min(3, d / 40));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [hidden, reduce, lookXRaw, lookYRaw]);

  // Random blinking.
  useEffect(() => {
    if (hidden) return;
    let t;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2200 + Math.random() * 2800);
    };
    loop();
    return () => clearTimeout(t);
  }, [hidden]);

  // One tip per section, the first time it becomes active.
  useEffect(() => {
    if (hidden || !active || tipped.current.has(active)) return;
    const t = setTimeout(() => {
      tipped.current.add(active);
      say(SECTION_TIPS[active]);
    }, active === 'profile' ? 1800 : 400);
    return () => clearTimeout(t);
  }, [active, hidden, say]);

  // Cheer on new achievements.
  useEffect(() => {
    const fresh = toasts.find((t) => !seenToasts.current.has(t.key));
    if (!fresh) return;
    toasts.forEach((t) => seenToasts.current.add(t.key));
    if (hidden) return;
    emote('happy', 2000);
    say(`Nice! ${BY_ID[fresh.id].name} unlocked!`, 3000);
  }, [toasts, hidden, emote, say]);

  useEffect(
    () => () => {
      clearTimeout(bubbleTimer.current);
      clearTimeout(moodTimer.current);
    },
    [],
  );

  const onClick = () => {
    if (dragged.current) return;
    const line = CLICK_LINES[lineIdx.current % CLICK_LINES.length];
    lineIdx.current += 1;
    sfx.boop();
    emote(line === 'GG!' ? 'happy' : 'wow');
    say(line, 3200);
  };

  const hide = () => {
    setHidden(true);
    writeHidden(true);
    setBubble(null);
  };
  const show = () => {
    setHidden(false);
    writeHidden(false);
    setTimeout(() => {
      emote('happy');
      say('I’m back!', 2200);
    }, 200);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-live="polite">
      <AnimatePresence>
        {hidden ? (
          <motion.button
            key="restore"
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            exit={{ x: 40 }}
            onClick={show}
            className="pointer-events-auto absolute bottom-[84px] right-0 border border-r-0 border-ember/50 bg-panel px-2 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-ember md:bottom-6"
            aria-label="Bring Byte back"
          >
            Byte
          </motion.button>
        ) : (
          <motion.div
            key="byte"
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={() => setTimeout(() => (dragged.current = false), 50)}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 40 }}
            className="pointer-events-auto absolute bottom-[84px] right-3 cursor-grab touch-none active:cursor-grabbing md:bottom-6 md:right-6"
          >
            <AnimatePresence>
              {bubble && (
                <motion.div
                  key={bubble.key}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  className="absolute bottom-full right-0 mb-2 w-max max-w-[220px] border border-line bg-panel/95 px-3 py-2 text-xs leading-snug text-ink shadow-xl backdrop-blur"
                >
                  {bubble.text}
                  <span className="absolute -bottom-[5px] right-6 h-2.5 w-2.5 rotate-45 border-b border-r border-line bg-panel" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={hide}
              className="absolute -left-2 -top-2 z-10 grid h-5 w-5 place-items-center rounded-full border border-line bg-panel text-dim opacity-70 transition-opacity hover:text-white hover:opacity-100"
              aria-label="Hide Byte"
            >
              <X size={11} />
            </button>

            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.button
                ref={body}
                key={hop}
                onClick={onClick}
                initial={false}
                animate={hop && !reduce ? { y: [0, -16, 0], rotate: [0, -8, 8, 0] } : undefined}
                transition={{ duration: 0.45 }}
                className="block h-[68px] w-[62px] md:h-[84px] md:w-[76px]"
                aria-label="Byte, the lobby companion. Click for a tip."
              >
                <ByteSprite mood={mood} lookX={lookX} lookY={lookY} blink={blink} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
