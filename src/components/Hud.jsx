import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Command, History, Search, Trophy, UserPlus, UserRound, Backpack, Images, Volume2, VolumeX } from 'lucide-react';
import * as sfx from '../lib/sfx';
import { SECTIONS, PROFILE } from '../data/profile';
import { ACHIEVEMENTS, useAchievements } from '../lib/achievements';

const ICONS = { profile: UserRound, loadout: Backpack, matches: History, highlights: Images, party: UserPlus };

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Scroll progress, drawn along the bottom edge of the top bar.
function XpBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const tipX = useTransform(scaleX, (v) => `${v * 100}%`);
  return (
    <div className="absolute inset-x-0 -bottom-px h-1 bg-line lg:h-[3px]" aria-hidden="true">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-ember via-gold to-cyan shadow-[0_0_10px_rgba(255,90,54,0.8)]"
      />
      <motion.span
        style={{ left: tipX }}
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(56,217,245,0.9)] lg:h-2 lg:w-2"
      />
    </div>
  );
}

function isMac() {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
}

export function useSound() {
  const [muted, setMuted] = useState(sfx.isMuted);
  useEffect(() => sfx.onMuteChange(setMuted), []);
  return [muted, () => sfx.setMuted(!muted)];
}

function SoundToggle() {
  const [muted, toggle] = useSound();
  return (
    <button
      onClick={toggle}
      className={`grid h-9 w-9 place-items-center border border-line bg-raised/60 transition-colors hover:border-ember/60 ${muted ? 'text-dim' : 'text-ember'}`}
      aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      aria-pressed={!muted}
      title={muted ? 'Sound off' : 'Sound on'}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
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
          <span className="hidden flex-col items-start leading-none sm:flex md:hidden lg:flex">
            <span className="font-display text-sm font-bold tracking-[0.2em] text-white">{PROFILE.handle}</span>
            <span className="mt-1 whitespace-nowrap font-mono text-[10px] text-mute">Lv.{level} · Bali</span>
          </span>
        </button>

        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={`relative whitespace-nowrap px-2 py-2 font-display text-xs font-semibold uppercase tracking-[0.1em] transition-colors lg:px-3 lg:tracking-[0.16em] ${
                active === s.id ? 'text-white' : 'text-mute hover:text-ink'
              }`}
            >
              <span className="lg:hidden">{s.short}</span>
              <span className="hidden lg:inline">{s.label}</span>
              {active === s.id && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-2 -bottom-[13px] h-[2px] bg-ember lg:inset-x-3" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
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
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/95 backdrop-blur-md md:hidden"
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
