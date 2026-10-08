import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AchievementsProvider, useAchievements, useSectionTracker } from './lib/achievements';
import { SECTIONS, PROFILE } from './data/profile';
import { TopBar, BottomNav, scrollToSection } from './components/Hud';
import BootScreen from './components/BootScreen';
import CommandPalette from './components/CommandPalette';
import MatchDetail from './components/MatchDetail';
import { AchievementToasts, AnnounceBanner, Announcer, TrophyRoom } from './components/Achievements';
import { PROJECTS } from './data/projects';
import * as sfx from './lib/sfx';
import Byte from './components/Byte';
import ClickSparks from './components/ClickSparks';
import Profile from './sections/Profile';
import Loadout from './sections/Loadout';
import MatchHistory from './sections/MatchHistory';
import Highlights from './sections/Highlights';
import Party from './sections/Party';

const SECTION_IDS = SECTIONS.map((s) => s.id);

function useActiveSection() {
  const [active, setActive] = useState(SECTION_IDS[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      // A section counts as active once it crosses the upper-middle of the viewport.
      { rootMargin: '-40% 0px -55% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Footer() {
  return (
    <footer className="border-t border-line pb-24 pt-10 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-10">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind and Motion.
        </p>
        <p className="font-mono text-xs text-dim">GG WP. Thanks for visiting.</p>
      </div>
    </footer>
  );
}

function Lobby() {
  const active = useActiveSection();
  const { trackMatch, unlock } = useAchievements();
  useSectionTracker(active, SECTION_IDS);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [trophiesOpen, setTrophiesOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState(null);
  const [itemFilter, setItemFilter] = useState(null);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef();

  useEffect(() => {
    if (paletteOpen) unlock('speedrunner');
  }, [paletteOpen, unlock]);

  // Kill streak: every match opened in a row climbs a level (capped at Savage).
  // Landing on match #1 starts the streak over from First Blood.
  const streak = useRef(0);
  const [streakBanner, setStreakBanner] = useState(null);
  const bannerTimer = useRef();

  const openMatch = useCallback(
    (slug) => {
      setOpenSlug(slug);
      trackMatch(slug);
      streak.current = slug === PROJECTS[0].slug ? 1 : streak.current + 1;
      const level = Math.min(streak.current, sfx.STREAKS.length);
      const project = PROJECTS.find((p) => p.slug === slug);
      sfx.streak(level);
      if (level === sfx.STREAKS.length) unlock('savage-streak');
      setStreakBanner({
        key: `${slug}-${Date.now()}`,
        title: sfx.STREAKS[level - 1],
        subtitle: streak.current > level ? `${streak.current} in a row · ${project.title}` : project.title,
        level,
      });
      clearTimeout(bannerTimer.current);
      bannerTimer.current = setTimeout(() => setStreakBanner(null), 1300);
    },
    [trackMatch, unlock],
  );

  const filterByItem = useCallback(
    (id) => {
      setItemFilter(id);
      unlock('scout');
      scrollToSection('matches');
    },
    [unlock],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }, []);

  return (
    <>
      <a href="#matches" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-ember focus:px-4 focus:py-2 focus:text-white">
        Skip to projects
      </a>
      <BootScreen />
      <TopBar active={active} onOpenPalette={() => setPaletteOpen(true)} onOpenTrophies={() => setTrophiesOpen(true)} />
      <main>
        <Profile />
        <Loadout onOpenMatch={openMatch} onFilterItem={filterByItem} />
        <MatchHistory itemFilter={itemFilter} onClearItem={() => setItemFilter(null)} onOpenMatch={openMatch} />
        <Highlights />
        <Party onCopyEmail={copyEmail} copied={copied} />
      </main>
      <Footer />
      <BottomNav active={active} />

      <MatchDetail
        slug={openSlug}
        onClose={() => {
          sfx.whoosh();
          setOpenSlug(null);
        }}
        onNavigate={openMatch}
      />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onOpenMatch={openMatch}
        onOpenTrophies={() => setTrophiesOpen(true)}
        onCopyEmail={copyEmail}
      />
      <TrophyRoom open={trophiesOpen} onClose={() => setTrophiesOpen(false)} />
      <AchievementToasts />
      <Announcer />
      <AnnounceBanner item={streakBanner} />
      <Byte active={active} />
      <ClickSparks />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AchievementsProvider>
        <Lobby />
      </AchievementsProvider>
    </MotionConfig>
  );
}
