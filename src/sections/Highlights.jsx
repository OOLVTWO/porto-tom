import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HIGHLIGHTS } from '../data/profile';
import { SectionHeader } from '../components/ui';

const FACTS = [
  { k: 'Base', v: 'Bali, Indonesia' },
  { k: 'Focus', v: 'Full-stack web' },
  { k: 'Coding since', v: '2023' },
  { k: 'Status', v: 'Open to freelance' },
];

export default function Highlights() {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  // Track which slide is centred so the counter and dots stay in sync with native swiping.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll('[data-index]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const goTo = (i) => {
    const el = track.current;
    const slide = el?.querySelector(`[data-index="${(i + HIGHLIGHTS.length) % HIGHLIGHTS.length}"]`);
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section id="highlights" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader index="04" kicker="Highlights" title="Off-screen, I run the lobby">
              Before I was shipping booking systems, I was on stage running Mobile Legends tournaments as PIC. Organising
              brackets, keeping teams on schedule and handling a live crowd taught me the same thing good software does:
              people only notice the details when they break.
            </SectionHeader>
            <dl className="grid grid-cols-2 gap-px border border-line bg-line">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-panel px-4 py-3">
                  <dt className="hud-label text-[10px]">{f.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="min-w-0 lg:col-span-7"
          >
            <div
              ref={track}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth"
              aria-roledescription="carousel"
              aria-label="Photo highlights"
            >
              {HIGHLIGHTS.map((h, i) => (
                <figure
                  key={h.src}
                  data-index={i}
                  className="hud-cut relative aspect-[4/5] w-[85%] shrink-0 snap-center overflow-hidden border border-line bg-raised [--cut:18px] sm:aspect-[16/11] sm:w-full"
                  aria-label={`${i + 1} of ${HIGHLIGHTS.length}`}
                >
                  <img
                    src={h.src}
                    alt={h.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: h.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{h.title}</p>
                    <p className="mt-1 max-w-md text-sm text-ink/80">{h.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                {HIGHLIGHTS.map((h, i) => (
                  <button
                    key={h.src}
                    onClick={() => goTo(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`h-1.5 transition-all ${i === active ? 'w-8 bg-ember' : 'w-3 bg-line hover:bg-dim'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="mr-2 font-mono text-xs text-dim">
                  {String(active + 1).padStart(2, '0')} / {String(HIGHLIGHTS.length).padStart(2, '0')}
                </span>
                <button onClick={() => goTo(active - 1)} aria-label="Previous photo" className="grid h-10 w-10 place-items-center border border-line text-mute hover:border-ember/60 hover:text-white">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => goTo(active + 1)} aria-label="Next photo" className="grid h-10 w-10 place-items-center border border-line text-mute hover:border-ember/60 hover:text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
