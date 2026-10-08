import { motion } from 'motion/react';

export const TONES = {
  ember: { text: 'text-ember', bg: 'bg-ember', border: 'border-ember/50', soft: 'bg-ember/10', line: 'border-ember' },
  gold: { text: 'text-gold', bg: 'bg-gold', border: 'border-gold/50', soft: 'bg-gold/10', line: 'border-gold' },
  cyan: { text: 'text-cyan', bg: 'bg-cyan', border: 'border-cyan/50', soft: 'bg-cyan/10', line: 'border-cyan' },
  win: { text: 'text-win', bg: 'bg-win', border: 'border-win/50', soft: 'bg-win/10', line: 'border-win' },
};

export function SectionHeader({ index, kicker, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-10 max-w-2xl sm:mb-12"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs text-ember">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span className="hud-label">{kicker}</span>
      </div>
      <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-wide text-white text-balance sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 leading-relaxed text-mute">{children}</p>}
    </motion.div>
  );
}

// Thin corner brackets that frame a HUD element.
export function Corners({ className = 'border-ember' }) {
  const base = `pointer-events-none absolute h-3 w-3 ${className}`;
  return (
    <>
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

export function Badge({ tone = 'ember', children, className = '' }) {
  const t = TONES[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] ${t.text} ${t.border} ${t.soft} ${className}`}
    >
      {children}
    </span>
  );
}

export function BrandIcon({ item, size = 20, className = '' }) {
  if (item.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
        <path d={item.icon.path} />
      </svg>
    );
  }
  const glyphs = {
    file: 'M6 2h8l6 6v14H6zM14 2v6h6M9 13h6M9 17h6',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={glyphs[item.glyph]} />
    </svg>
  );
}

// Swaps a missing screenshot for a branded placeholder instead of a broken image.
export function Shot({ src, alt, className = '', style, fit = 'cover' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${fit === 'cover' ? 'object-cover object-top' : 'object-contain'} ${className}`}
      style={style}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><rect width="160" height="100" fill="#131927"/><path d="M0 100L160 0" stroke="#222B3F"/><text x="80" y="54" fill="#5A6378" font-family="monospace" font-size="8" text-anchor="middle">NO PREVIEW</text></svg>',
          );
      }}
    />
  );
}
