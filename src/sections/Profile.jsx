import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, MapPin, UserPlus } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { LOADOUT } from '../data/loadout';
import { Corners } from '../components/ui';
import { scrollToSection } from '../components/Hud';

const QUICK_STATS = [
  { k: 'Matches', v: PROJECTS.length },
  { k: 'Live now', v: PROJECTS.filter((p) => p.live).length },
  { k: 'Items', v: LOADOUT.length },
  { k: 'Since', v: '2023' },
];

// Full-bleed stage photo behind the hero. Drifts with the cursor on desktop and slower than the page on scroll.
function StageBackdrop() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [14, -14]), { stiffness: 80, damping: 20 });
  const y = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 20 });
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, 160]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={reduce ? undefined : { y: scrollShift }}
        className="absolute inset-x-0 top-0 h-[62svh] max-lg:[mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:inset-0 lg:h-auto"
      >
        <motion.img
          src="/images/hero-bg.jpg"
          alt=""
          fetchpriority="high"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.06, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? { objectPosition: '68% 22%' } : { x, y, objectPosition: '68% 22%' }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Mobile: fade from the bottom so text sits on solid dark. Desktop: fade from the left. */}
      <div className="absolute inset-x-0 top-0 h-[62svh] bg-gradient-to-t from-void via-void/40 to-void/10 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-void via-void/75 to-void/5 lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-void via-transparent to-void/40 lg:block" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-ember/[0.04] to-transparent" />
    </div>
  );
}

function StageTags() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="absolute bottom-40 right-10 hidden flex-col items-end gap-2 lg:flex xl:right-16"
    >
      <div className="relative border border-line bg-void/70 px-4 py-3 backdrop-blur">
        <p className="hud-label text-ember">Main role</p>
        <p className="font-display text-xl font-bold uppercase tracking-wide text-white">Full-stack</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mute">
          <MapPin size={12} /> {PROFILE.base}
        </p>
        <Corners className="border-ember/80" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-dim">On stage · MLBB tournament PIC</p>
    </motion.div>
  );
}

function AttributeBar({ k, v, i }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="truncate font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-mute sm:text-xs sm:tracking-[0.16em]">{k}</span>
        <span className="font-mono text-xs text-ink">{v}</span>
      </div>
      <div className="h-2 overflow-hidden bg-line">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-ember-deep via-ember to-gold"
        />
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <section
      id="profile"
      className="relative flex min-h-[100svh] scroll-mt-16 flex-col justify-end overflow-hidden pt-[30svh] lg:justify-center lg:pt-16"
    >
      <StageBackdrop />
      <StageTags />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="mb-3 inline-flex items-center gap-2 border border-gold/40 bg-void/70 px-2.5 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-win" />
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Online · Open to work</span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-ember">01</span>
              <span className="h-px w-8 bg-line" />
              <span className="hud-label">Player profile</span>
            </div>
            <h1 className="font-display text-[2.4rem] font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-6xl xl:text-7xl">
              Surya Adi
              <br />
              <span className="bg-gradient-to-r from-ember via-ember-soft to-gold bg-clip-text text-transparent">Darmawan</span>
            </h1>
            <p className="mt-3 font-display text-base font-semibold uppercase tracking-[0.18em] text-ink sm:mt-4 sm:text-lg">{PROFILE.role}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/75 sm:mt-4 sm:text-base">{PROFILE.intro}</p>
          </motion.div>

          <div className="mt-6 grid max-w-xl grid-cols-2 gap-x-5 gap-y-4 sm:mt-8 sm:gap-x-8">
            {PROFILE.attributes.map((a, i) => (
              <AttributeBar key={a.k} {...a} i={i} />
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">Self-rated</p>

          <div className="mt-6 grid max-w-xl grid-cols-4 border sm:mt-8 border-line bg-void/60 backdrop-blur">
            {QUICK_STATS.map((s, i) => (
              <div key={s.k} className={`px-3 py-3 sm:px-4 ${i ? 'border-l border-line' : ''}`}>
                <p className="font-mono text-xl font-bold text-white sm:text-2xl">{s.v}</p>
                <p className="hud-label mt-0.5 text-[9px] sm:text-[10px]">{s.k}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollToSection('matches')} className="btn-primary">
              Match history <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollToSection('party')} className="btn-ghost backdrop-blur">
              <UserPlus size={16} /> Invite to party
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
