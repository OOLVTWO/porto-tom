import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
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

function PlayerCard() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const glare = useTransform(mx, (x) => `radial-gradient(circle at ${x * 100}% 30%, rgba(255,255,255,0.6), transparent 45%)`);

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hud-cut relative aspect-[4/5] w-full overflow-hidden border border-line bg-raised [--cut:22px] sm:aspect-[3/4]"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Surya Adi Darmawan on stage as PIC of a Mobile Legends: Bang Bang tournament"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '66% 26%' }}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{ background: glare }}
          />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2 border border-gold/40 bg-void/70 px-2.5 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-win" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Online · Open to work</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="hud-label text-ember">Main role</p>
          <p className="font-display text-2xl font-bold uppercase tracking-wide text-white">Full-stack</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-mute">
            <MapPin size={14} /> {PROFILE.base}
          </p>
        </div>
        <Corners className="border-ember/80" />
      </motion.div>
    </div>
  );
}

function AttributeBar({ k, v, i }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-mute">{k}</span>
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
    <section id="profile" className="relative scroll-mt-16 overflow-hidden bg-grid pt-24 sm:pt-28 lg:min-h-screen lg:pt-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full bg-ember/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pb-24">
        <div className="mx-auto w-full max-w-[300px] sm:max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <PlayerCard />
        </div>

        <div className="lg:order-1 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-ember">01</span>
              <span className="h-px w-8 bg-line" />
              <span className="hud-label">Player profile</span>
            </div>
            <h1 className="font-display text-[2.6rem] font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-6xl xl:text-7xl">
              Surya Adi
              <br />
              <span className="bg-gradient-to-r from-ember via-ember-soft to-gold bg-clip-text text-transparent">Darmawan</span>
            </h1>
            <p className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.18em] text-ink">{PROFILE.role}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-mute">{PROFILE.intro}</p>
          </motion.div>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2 sm:gap-x-8">
            {PROFILE.attributes.map((a, i) => (
              <AttributeBar key={a.k} {...a} i={i} />
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">Self-rated</p>

          <div className="mt-8 grid max-w-xl grid-cols-4 border border-line bg-panel/60">
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
            <button onClick={() => scrollToSection('party')} className="btn-ghost">
              <UserPlus size={16} /> Invite to party
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
