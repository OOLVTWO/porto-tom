import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Filter } from 'lucide-react';
import { LOADOUT, TIERS } from '../data/loadout';
import { PROJECTS } from '../data/projects';
import { Badge, BrandIcon, Corners, SectionHeader, TONES } from '../components/ui';

const PROJECT_BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

function ItemSlot({ item, selected, onSelect }) {
  const tone = TONES[TIERS[item.tier].tone];
  return (
    <motion.button
      layout
      onClick={() => onSelect(item.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      aria-pressed={selected}
      className={`group relative flex aspect-square flex-col lg:aspect-[5/4] items-center justify-center gap-2 border p-2 text-center transition-colors ${
        selected ? `${tone.border} ${tone.soft}` : 'border-line bg-panel hover:border-dim'
      }`}
    >
      <BrandIcon item={item} size={26} className={selected ? tone.text : 'text-mute transition-colors group-hover:text-ink'} />
      <span className={`font-display text-[10px] font-semibold uppercase leading-tight tracking-wider sm:text-[11px] ${selected ? 'text-white' : 'text-mute'}`}>
        {item.name}
      </span>
      <span className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 ${tone.bg}`} aria-hidden="true" />
      {selected && <Corners className={tone.line} />}
    </motion.button>
  );
}

export default function Loadout({ onOpenMatch, onFilterItem }) {
  const [selectedId, setSelectedId] = useState('nextjs');
  const item = LOADOUT.find((i) => i.id === selectedId);
  const tier = TIERS[item.tier];
  const tone = TONES[tier.tone];

  return (
    <section id="loadout" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader index="02" kicker="Loadout" title="Items I bring to every match">
          Pulled from the stacks of the projects below. Tap an item to see where I’ve used it.
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-12 lg:gap-10">
          <div className="md:col-span-7">
            <div className="mb-4 flex flex-wrap gap-4">
              {Object.entries(TIERS).map(([id, t]) => (
                <span key={id} className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-wider text-mute">
                  <span className={`h-2 w-2 ${TONES[t.tone].bg}`} /> {t.label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {LOADOUT.map((i) => (
                <ItemSlot key={i.id} item={i} selected={i.id === selectedId} onSelect={setSelectedId} />
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="hud-panel hud-cut p-6 [--cut:18px]"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-4">
                    <span className={`grid h-14 w-14 shrink-0 place-items-center border ${tone.border} ${tone.soft}`}>
                      <BrandIcon item={item} size={30} className={tone.text} />
                    </span>
                    <div>
                      <Badge tone={tier.tone}>{tier.label} item</Badge>
                      <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-white">{item.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed text-mute">{item.blurb}</p>

                  <div className="mt-6">
                    <p className="hud-label mb-3">
                      Used in {item.usedIn.length} {item.usedIn.length === 1 ? 'match' : 'matches'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.usedIn.map((slug) => (
                        <button
                          key={slug}
                          onClick={() => onOpenMatch(slug)}
                          className="border border-line bg-raised px-2.5 py-1 text-xs text-ink transition-colors hover:border-ember/60 hover:text-white"
                        >
                          {PROJECT_BY_SLUG[slug].title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => onFilterItem(item.id)} className="btn-ghost mt-6 w-full">
                    <Filter size={15} /> Filter match history
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
