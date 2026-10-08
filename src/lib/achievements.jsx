import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Kill-streak names borrowed from MLBB. `hint` is shown while the badge is still locked.
export const ACHIEVEMENTS = [
  { id: 'first-blood', name: 'First Blood', hint: 'Open any match from the match history.' },
  { id: 'triple-kill', name: 'Triple Kill', hint: 'Open 3 different matches.' },
  { id: 'scout', name: 'Scout', hint: 'Filter the match history by a loadout item.' },
  { id: 'map-awareness', name: 'Map Awareness', hint: 'Visit every section of the lobby.' },
  { id: 'speedrunner', name: 'Speedrunner', hint: 'Open the command menu (Ctrl K or ⌘K).' },
  { id: 'party-up', name: 'Party Up', hint: 'Send an invite from the Party section.' },
  { id: 'savage', name: 'Savage', hint: 'Unlock every other achievement.' },
];

const KEY = 'porto:achievements';

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function save(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode: achievements just won't persist */
  }
}

const Ctx = createContext(null);

export function AchievementsProvider({ children }) {
  const [unlocked, setUnlocked] = useState(load);
  const [toasts, setToasts] = useState([]);
  const unlockedRef = useRef(unlocked);

  const unlock = useCallback((id) => {
    if (unlockedRef.current.includes(id)) return;
    let next = [...unlockedRef.current, id];
    const fresh = [id];
    const others = ACHIEVEMENTS.filter((a) => a.id !== 'savage').map((a) => a.id);
    if (!next.includes('savage') && others.every((a) => next.includes(a))) {
      next = [...next, 'savage'];
      fresh.push('savage');
    }
    unlockedRef.current = next;
    setUnlocked(next);
    save(next);
    setToasts((t) => [...t, ...fresh.map((f) => ({ key: `${f}-${Date.now()}`, id: f }))]);
  }, []);

  const dismiss = useCallback((key) => setToasts((t) => t.filter((x) => x.key !== key)), []);

  const reset = useCallback(() => {
    unlockedRef.current = [];
    setUnlocked([]);
    save([]);
  }, []);

  // Tracks distinct matches opened, for First Blood / Triple Kill.
  const opened = useRef(new Set());
  const trackMatch = useCallback(
    (slug) => {
      opened.current.add(slug);
      unlock('first-blood');
      if (opened.current.size >= 3) unlock('triple-kill');
    },
    [unlock],
  );

  const value = useMemo(
    () => ({ unlocked, unlock, trackMatch, toasts, dismiss, reset }),
    [unlocked, unlock, trackMatch, toasts, dismiss, reset],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAchievements = () => useContext(Ctx);

// Unlocks Map Awareness once every section id has been seen.
export function useSectionTracker(active, allIds) {
  const { unlock } = useAchievements();
  const seen = useRef(new Set());
  useEffect(() => {
    if (!active) return;
    seen.current.add(active);
    if (allIds.every((id) => seen.current.has(id))) unlock('map-awareness');
  }, [active, allIds, unlock]);
}
