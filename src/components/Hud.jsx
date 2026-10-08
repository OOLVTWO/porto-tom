import { motion, useScroll, useSpring } from 'motion/react';
import { Command, History, Search, Trophy, UserPlus, UserRound, Backpack, Images } from 'lucide-react';
import { SECTIONS, PROFILE } from '../data/profile';
import { ACHIEVEMENTS, useAchievements } from '../lib/achievements';

const ICONS = { profile: UserRound, loadout: Backpack, matches: History, highlights: Images, party: UserPlus };

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function XpBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <div className="absolute inset-x-0 top-0 h-[3px] bg-line/60" aria-hidden="true">
      <motion.div style={{ scaleX }} className="h-full origin-left bg-gradient-to-r from-ember via-gold to-cyan" />
    </div>
  );
}

function isMac() {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
}

export function TopBar({ active, onOpenPalette, onOpenTrophies }) {
  const { unlocked } = useAchievements();
  const level = 1 + unlocked.length;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-void/80 backdrop-blur-md">
      <XpBar />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <button onClick={() => scrollToSection('profile')} className="group flex items-center gap-3" aria-label="Back to top">
          <span className="hud-cut grid h-9 w-9 place-items-center bg-ember font-display text-sm font-bold text-white [--cut:8px]">
            SA
          </span>
          <span className="hidden flex-col items-start leading-none sm:flex">
            <span className="font-display text-sm font-bold tracking-[0.2em] text-white">{PROFILE.handle}</span>
            <span className="mt-1 whitespace-nowrap font-mono text-[10px] text-mute">Lv.{level} · Bali</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={`relative whitespace-nowrap px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                active === s.id ? 'text-white' : 'text-mute hover:text-ink'
              }`}
            >
              {s.label}
              {active === s.id && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-ember" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTrophies}
            className="flex h-9 items-center gap-2 border border-line bg-raised/60 px-3 text-mute transition-colors hover:border-gold/60 hover:text-gold"
            aria-label={`Achievements, ${unlocked.length} of ${ACHIEVEMENTS.length} unlocked`}
          >
            <Trophy size={16} />
            <span className="font-mono text-xs">
              {unlocked.length}/{ACHIEVEMENTS.length}
            </span>
          </button>
          <button
            onClick={onOpenPalette}
            className="flex h-9 items-center gap-2 border border-line bg-raised/60 px-3 text-mute transition-colors hover:border-ember/60 hover:text-ink"
            aria-label="Open command menu"
          >
            <Search size={16} className="sm:hidden" />
            <span className="hidden items-center gap-1 whitespace-nowrap font-mono text-xs sm:flex">
              {isMac() ? <Command size={12} /> : 'Ctrl'} K
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav({ active }) {
  return (
    <nav
      aria-label="Sections"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/95 backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-5">
        {SECTIONS.map((s) => {
          const Icon = ICONS[s.id];
          const on = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              aria-current={on ? 'true' : undefined}
              className={`relative flex flex-col items-center gap-1 py-2.5 transition-colors ${on ? 'text-white' : 'text-dim'}`}
            >
              {on && <motion.span layoutId="tab-glow" className="absolute inset-x-4 top-0 h-[2px] bg-ember" />}
              <Icon size={20} className={on ? 'text-ember' : ''} />
              <span className="font-display text-[10px] font-semibold uppercase tracking-wider">{s.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
