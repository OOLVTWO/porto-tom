import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import {
  Sun, Moon, Menu, X, ChevronLeft, ChevronRight,
  Github, Linkedin, Instagram, Mail, Send, CheckCircle2, Star,
} from 'lucide-react';

/* ----------------------------- Theme Context ----------------------------- */
const ThemeContext = createContext(null);
const useTheme = () => useContext(ThemeContext);

/* --------------------------------- Data ---------------------------------- */
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const TECH_STACK = [
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'TypeScript', icon: 'fa-brands fa-js' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt' },
  { name: 'GraphQL', icon: 'fa-solid fa-diagram-project' },
  { name: 'Docker', icon: 'fa-brands fa-docker' },
  { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'Figma', icon: 'fa-brands fa-figma' },
  { name: 'HTML5', icon: 'fa-brands fa-html5' },
];

const FACTS = [
  { label: 'Location', value: 'Bali, Indonesia', icon: 'fa-solid fa-location-dot' },
  { label: 'Focus', value: 'Frontend + Systems', icon: 'fa-solid fa-layer-group' },
  { label: 'Experience', value: '6 months', icon: 'fa-solid fa-clock' },
  { label: 'Availability', value: 'Open to freelance', icon: 'fa-solid fa-circle-check' },
];

const ABOUT_PHOTOS = [
  {
    src: '/images/speaking-1.jpg',
    fallback: 'https://picsum.photos/seed/surya-about-1/1600/900',
    position: '48% 35%',
    title: 'Leading as tournament PIC',
    caption: 'On the mic as person-in-charge (PIC) for a Mobile Legends: Bang Bang tournament.',
  },
  {
    src: '/images/speaking-2.jpg',
    fallback: 'https://picsum.photos/seed/surya-about-2/1600/900',
    position: '52% 55%',
    title: 'Running the show off-screen too',
    caption: 'Organizing and hosting on stage during the MLBB tournament — not just behind a keyboard.',
  },
];

const EXPERTISE = [
  {
    title: 'Web Design',
    tag: 'design',
    desc: 'Interfaces that balance clarity and character — wireframed, prototyped, and checked before a line of code ships.',
    icon: 'fa-solid fa-palette',
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    title: 'React Applications',
    tag: 'frontend',
    desc: 'Component-driven front ends built for speed and scale, from internal dashboards to customer-facing products.',
    icon: 'fa-solid fa-code',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'SEO Optimization',
    tag: 'growth',
    desc: 'Technical audits and content structure that get real pages found by real people, without wrecking the design.',
    icon: 'fa-solid fa-magnifying-glass-chart',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

const PROJECTS = [
  { title: 'Northwind Dashboard', tag: 'SaaS Dashboard', domain: 'northwind.app', layout: 'dashboard', icon: 'fa-solid fa-gauge-high', gradient: 'from-orange-400 to-rose-500' },
  { title: 'Vertex Banking App', tag: 'Mobile App', domain: 'vertexbank.io', layout: 'mobile', icon: 'fa-solid fa-mobile-screen-button', gradient: 'from-indigo-500 to-blue-600' },
  { title: 'Orbital Analytics', tag: 'Data Platform', domain: 'orbital.dev', layout: 'chart', icon: 'fa-solid fa-chart-line', gradient: 'from-emerald-500 to-teal-600' },
  { title: 'Lumen Commerce', tag: 'E-Commerce', domain: 'shoplumen.com', layout: 'grid', icon: 'fa-solid fa-cart-shopping', gradient: 'from-amber-400 to-orange-500' },
  { title: 'Atlas Booking', tag: 'Web App', domain: 'atlasbook.app', layout: 'calendar', icon: 'fa-solid fa-calendar-check', gradient: 'from-sky-500 to-cyan-600' },
  { title: 'Halcyon Marketing', tag: 'Marketing Site', domain: 'halcyon.co', layout: 'hero', icon: 'fa-solid fa-bullhorn', gradient: 'from-fuchsia-500 to-purple-600' },
];

const STATS = [
  { label: 'Projects Completed', value: 120, suffix: '+', icon: 'fa-solid fa-diagram-project', gradient: 'from-orange-400 to-rose-500' },
  { label: 'Months Building', value: 6, suffix: '', icon: 'fa-solid fa-calendar-check', gradient: 'from-indigo-500 to-blue-600' },
  { label: 'Happy Clients', value: 45, suffix: '', icon: 'fa-solid fa-people-group', gradient: 'from-emerald-500 to-teal-600' },
  { label: 'Client Satisfaction', value: 99, suffix: '%', icon: 'fa-solid fa-face-smile', gradient: 'from-amber-400 to-orange-500' },
];

const TESTIMONIALS = [
  {
    quote: "Surya rebuilt our dashboard from scratch and cut load times in half. The handoff docs alone were better than most agencies' final deliverables.",
    name: 'Priya Anand',
    title: 'VP Product, Northwind',
    img: 'https://images.pexels.com/photos/30004322/pexels-photo-30004322.jpeg?auto=compress&cs=tinysrgb&w=900',
    fb: 'https://picsum.photos/seed/priya-anand/900/1100',
  },
  {
    quote: 'We came in with a rough sketch and left with a production React app our own engineers actually enjoyed extending.',
    name: 'Marcus Ude',
    title: 'CTO, Vertex Labs',
    img: 'https://images.pexels.com/photos/30767572/pexels-photo-30767572.jpeg?auto=compress&cs=tinysrgb&w=900',
    fb: 'https://picsum.photos/seed/marcus-ude/900/1100',
  },
  {
    quote: 'Organic traffic doubled in four months. Surya treats SEO as part of the build, not an afterthought bolted on at the end.',
    name: 'Sofia Reyes',
    title: 'Founder, Halcyon',
    img: 'https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&w=900',
    fb: 'https://picsum.photos/seed/sofia-reyes/900/1100',
  },
];

/* --------------------------------- Hooks ---------------------------------- */
function useCountUp(target, start, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, startTime;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ----------------------------- Shared bits -------------------------------- */
function SmartImg({ src, fallback, alt, className, style }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
    />
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-[#FF5A36]">
      <span className="text-[#C9C6BF] dark:text-[#454C5F]">//</span> {children}
    </span>
  );
}

function HireBadge({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 backdrop-blur text-white px-6 py-3 font-medium transition-colors"
    >
      <span className="h-2 w-2 rounded-full bg-[#FF5A36] animate-pulse" />
      Available for Hire
      <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
    </button>
  );
}

/* -------------------------------- Header ---------------------------------- */
function Header({ active, onNavClick }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (id) => {
    onNavClick(id);
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || mobileOpen
        ? 'bg-white/90 dark:bg-[#0A0C12]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => handleClick('home')} className={`font-display text-xl font-bold tracking-tight transition-colors ${
          scrolled || mobileOpen ? 'text-[#12141C] dark:text-[#F4F3EF]' : 'text-white'
        }`}>
          Adi<span className="text-[#FF5A36]">.</span>Darmawan
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative px-3 py-2 font-mono text-xs uppercase tracking-wide rounded-full transition-colors ${
                active === item.id
                  ? 'text-[#FF5A36]'
                  : scrolled
                  ? 'text-[#5B6270] dark:text-[#8D95A8] hover:text-[#12141C] dark:hover:text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
              {active === item.id && <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#FF5A36] rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`h-10 w-10 flex items-center justify-center rounded-full border transition-colors ${
              scrolled || mobileOpen
                ? 'border-[#E7E5E1] dark:border-[#232A3D] text-[#12141C] dark:text-[#F4F3EF] hover:bg-[#F7F7F5] dark:hover:bg-[#151926]'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`md:hidden h-10 w-10 flex items-center justify-center rounded-full transition-colors ${scrolled || mobileOpen ? 'text-[#12141C] dark:text-white' : 'text-white'}`}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile backdrop — independent fixed layer, dims the page behind the drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] h-screen w-screen bg-[#12141C]/60 md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Mobile panel — independent fixed layer with a guaranteed opaque, full-height background */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] h-screen w-[80%] max-w-sm bg-white dark:bg-[#0A0C12] shadow-2xl md:hidden overflow-y-auto transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#E7E5E1] dark:border-[#232A3D]">
          <span className="font-display font-bold text-[#12141C] dark:text-white">Menu</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="h-10 w-10 flex items-center justify-center rounded-full text-[#12141C] dark:text-white hover:bg-[#F7F7F5] dark:hover:bg-[#151926]">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col px-6 gap-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`text-left py-3 text-lg font-display font-semibold border-b border-[#E7E5E1] dark:border-[#232A3D] ${
                active === item.id ? 'text-[#FF5A36]' : 'text-[#12141C] dark:text-[#F4F3EF]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ------------------------------------ */
function Hero({ onNavClick }) {
  return (
    <section id="home" className="scroll-mt-24 relative bg-[#0A0C12] overflow-hidden lg:min-h-screen lg:flex lg:items-center">
      <div className="absolute inset-0">
        <SmartImg
          src="/images/hero-bg.jpg"
          fallback="https://picsum.photos/seed/surya-hero/1600/1067"
          alt="Surya Adi Darmawan on stage as PIC of a Mobile Legends: Bang Bang tournament"
          className="w-full h-full object-cover"
          style={{ objectPosition: '66% 26%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C12] via-[#0A0C12]/70 to-[#0A0C12]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12]/75 via-transparent to-[#0A0C12]/35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-16 lg:py-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/10 px-4 py-1.5 font-mono text-xs text-white mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36] animate-pulse" /> available for work — 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.08] mb-3">
            Building software people actually enjoy using
          </h1>
          <p className="text-lg font-display font-semibold text-[#FF8C6B] mb-4">Surya Adi Darmawan — Software Engineer</p>
          <p className="text-white/80 leading-relaxed mb-8 max-w-md">
            I build fast, reliable software — from React front ends to the systems behind them —
            currently working with startups across three timezones.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => onNavClick('portfolio')}
              className="inline-flex items-center gap-2 bg-[#FF5A36] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E64A28] transition-colors"
            >
              View Work <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
            </button>
            <HireBadge onClick={() => onNavClick('contact')} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- About ------------------------------------ */
function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28 bg-[#F7F7F5] dark:bg-[#0D1017] border-y border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>about-me</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4 mb-6">
              Six months in, and already shipping real software
            </h2>
            <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed mb-4">
              I'm a software engineer working across the front end and the systems behind it, based in
              Bali, Indonesia. I care about interfaces that feel considered and the code underneath that
              keeps them fast — from component architecture to the API it talks to.
            </p>
            <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed mb-8">
              I'm early in my career, but I've already worked across dashboards, booking flows, and marketing
              sites — learning fast and shipping along the way. I care most about the details nobody notices
              until they're missing.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {FACTS.map((f) => (
                <div key={f.label} className="rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] px-4 py-3">
                  <div className="flex items-center gap-2 text-[#FF5A36] mb-1">
                    <i className={`${f.icon} text-xs`} aria-hidden="true"></i>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-[#5B6270] dark:text-[#8D95A8]">{f.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#12141C] dark:text-white">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <PhotoCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- About Photo Carousel ----------------------------- */
function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const slide = ABOUT_PHOTOS[index];
  const prev = () => setIndex((i) => (i - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
  const next = () => setIndex((i) => (i + 1) % ABOUT_PHOTOS.length);

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E5E1] dark:border-[#232A3D] bg-[#F7F7F5] dark:bg-[#151926]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-xs text-[#5B6270] dark:text-[#8D95A8]">moments</span>
        <span className="font-mono text-xs text-[#5B6270] dark:text-[#8D95A8]">{index + 1}/{ABOUT_PHOTOS.length}</span>
      </div>

      <div className="relative">
        <SmartImg
          src={slide.src}
          fallback={slide.fallback}
          alt={slide.title}
          className="w-full aspect-[16/10] object-cover"
          style={{ objectPosition: slide.position }}
        />
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-display font-semibold text-[#12141C] dark:text-white">{slide.title}</p>
          <p className="text-sm text-[#5B6270] dark:text-[#8D95A8] mt-1">{slide.caption}</p>
        </div>
        <div className="flex gap-1.5 pt-1.5 shrink-0">
          {ABOUT_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-[#FF5A36]' : 'w-1.5 bg-[#E7E5E1] dark:bg-[#232A3D]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Tech Marquee --------------------------------- */
function TechMarquee() {
  const track = [...TECH_STACK, ...TECH_STACK];
  return (
    <section className="py-14 bg-white dark:bg-[#0A0C12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-center font-mono text-xs text-[#5B6270] dark:text-[#8D95A8] mb-8">
          tools &amp; technologies I work with
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white dark:from-[#0A0C12] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white dark:from-[#0A0C12] to-transparent" />
        <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((t, i) => (
            <span
              key={`${t.name}-${i}`}
              className="flex items-center gap-3 px-8 font-display font-semibold text-lg text-[#12141C] dark:text-white whitespace-nowrap opacity-70"
            >
              <i className={`${t.icon} text-[#FF5A36]`} aria-hidden="true"></i>
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Expertise ----------------------------------- */
function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24 py-20 sm:py-28 bg-[#F7F7F5] dark:bg-[#0D1017] border-t border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-16">
          <Eyebrow>what-i-do</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4">
            Where design meets working code
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {EXPERTISE.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] p-8 hover:border-[#FF5A36]/40 hover:shadow-lg transition-all duration-300">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                  <i className={`${item.icon} text-white text-xl`} aria-hidden="true"></i>
                </div>
                <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-wide">{item.tag}</span>
                <h3 className="font-display text-xl font-bold text-[#12141C] dark:text-white mt-2 mb-3">{item.title}</h3>
                <p className="text-[#5B6270] dark:text-[#8D95A8] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Project Mock UI ------------------------------- */
function ProjectMock({ layout, gradient }) {
  const bar = (w) => <div className={`h-2 rounded-full bg-gradient-to-r ${gradient} opacity-70`} style={{ width: w }} />;
  const block = (opacity) => <div className={`rounded-lg bg-gradient-to-br ${gradient}`} style={{ opacity }} />;

  if (layout === 'dashboard') {
    return (
      <div className="flex h-full">
        <div className={`w-9 shrink-0 bg-gradient-to-b ${gradient}`} />
        <div className="flex-1 p-3 space-y-2.5">
          {bar('55%')}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded-md" style={{ background: 'currentColor', opacity: 0.06 }} />
            <div className="h-8 rounded-md" style={{ background: 'currentColor', opacity: 0.06 }} />
            <div className="h-8 rounded-md" style={{ background: 'currentColor', opacity: 0.06 }} />
          </div>
          <div className="h-16 rounded-lg flex items-end gap-1 p-2" style={{ background: 'currentColor', opacity: 0.06 }}>
            {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
              <div key={i} className={`flex-1 rounded-sm bg-gradient-to-t ${gradient}`} style={{ height: `${h}%`, opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (layout === 'mobile') {
    return (
      <div className="flex items-center justify-center h-full py-3">
        <div className="w-24 h-full max-h-36 rounded-xl border-2 border-white/30 bg-white/5 p-2 flex flex-col gap-1.5">
          <div className="h-3 w-3 rounded-full self-center" style={{ background: 'currentColor', opacity: 0.15 }} />
          {block(0.9)}
          <div className="flex-1 space-y-1 mt-1">
            <div className="h-2 rounded" style={{ background: 'currentColor', opacity: 0.1 }} />
            <div className="h-2 rounded" style={{ background: 'currentColor', opacity: 0.1 }} />
            <div className="h-2 w-2/3 rounded" style={{ background: 'currentColor', opacity: 0.1 }} />
          </div>
        </div>
      </div>
    );
  }
  if (layout === 'chart') {
    return (
      <div className="p-4 h-full flex flex-col justify-end">
        {bar('40%')}
        <div className="flex items-end gap-1.5 h-20 mt-3">
          {[30, 50, 35, 70, 45, 90, 60, 75].map((h, i) => (
            <div key={i} className={`flex-1 rounded-t-sm bg-gradient-to-t ${gradient}`} style={{ height: `${h}%`, opacity: 0.75 }} />
          ))}
        </div>
      </div>
    );
  }
  if (layout === 'grid') {
    return (
      <div className="p-3 h-full grid grid-cols-3 gap-1.5 content-center">
        {[0.85, 0.6, 0.4, 0.5, 0.9, 0.65].map((o, i) => (
          <div key={i} className={`aspect-square rounded-md bg-gradient-to-br ${gradient}`} style={{ opacity: o }} />
        ))}
      </div>
    );
  }
  if (layout === 'calendar') {
    return (
      <div className="p-3 h-full flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className={[3, 9, 14].includes(i) ? `rounded-sm bg-gradient-to-br ${gradient} aspect-square` : 'rounded-sm aspect-square'}
              style={[3, 9, 14].includes(i) ? { opacity: 0.85 } : { background: 'currentColor', opacity: 0.06 }}
            />
          ))}
        </div>
      </div>
    );
  }
  // hero
  return (
    <div className="p-4 h-full flex flex-col justify-center gap-2.5">
      {bar('70%')}
      <div className="h-2 rounded-full w-1/2" style={{ background: 'currentColor', opacity: 0.12 }} />
      <div className={`h-6 w-20 rounded-full bg-gradient-to-r ${gradient} mt-1`} style={{ opacity: 0.85 }} />
    </div>
  );
}

/* -------------------------------- Gallery ------------------------------------- */
function Gallery({ onNavClick }) {
  return (
    <section id="portfolio" className="scroll-mt-24 py-20 sm:py-28 bg-white dark:bg-[#0A0C12] border-t border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <Eyebrow>selected-work</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4">Recent projects</h2>
          </div>
          <button
            onClick={() => onNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#12141C] dark:text-white hover:text-[#FF5A36] dark:hover:text-[#FF5A36]"
          >
            Start a project <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100}>
              <div className="group rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] overflow-hidden bg-white dark:bg-[#10131C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.gradient} text-white group-hover:scale-[1.02] transition-transform duration-500`}>
                  <ProjectMock layout={p.layout} gradient={p.gradient} />
                  <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="ml-2 font-mono text-[10px] text-white/80 truncate">{p.domain}</span>
                  </div>
                  <div className="absolute top-3 right-3 h-7 w-7 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                    <i className={`${p.icon} text-xs`} aria-hidden="true"></i>
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs text-[#FF5A36]">{p.tag}</span>
                  <h3 className="font-display text-lg font-bold text-[#12141C] dark:text-white mt-2 mb-3">{p.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6270] dark:text-[#8D95A8] group-hover:text-[#FF5A36] transition-colors">
                    View Project <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Stats -------------------------------------- */
function StatItem({ stat }) {
  const [ref, inView] = useInView(0.4);
  const count = useCountUp(stat.value, inView);
  return (
    <div ref={ref} className="group relative overflow-hidden rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] p-5 sm:p-6 hover:border-[#FF5A36]/40 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
          <i className={`${stat.icon} text-white text-sm`} aria-hidden="true"></i>
        </div>
        <i className="fa-solid fa-arrow-trend-up text-emerald-500 text-sm" aria-hidden="true"></i>
      </div>
      <div className="font-display text-3xl sm:text-4xl font-bold text-[#12141C] dark:text-white leading-none mb-2">
        {count}{stat.suffix}
      </div>
      <div className="font-mono text-[11px] text-[#5B6270] dark:text-[#8D95A8] uppercase tracking-wide">{stat.label}</div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
    </div>
  );
}

function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-[#F7F7F5] dark:bg-[#0D1017] border-t border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ---------------------------------- */
function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28 bg-white dark:bg-[#0A0C12] border-t border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Eyebrow>testimonials</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4 mb-6">What clients say</h2>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FF5A36] text-[#FF5A36]" />)}
            </div>
            <p className="text-lg sm:text-xl text-[#12141C] dark:text-white leading-relaxed mb-8">"{t.quote}"</p>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[#12141C] dark:text-white">{t.name}</p>
                <p className="font-mono text-xs text-[#5B6270] dark:text-[#8D95A8] mt-1">{t.title}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={prev} aria-label="Previous testimonial" className="h-11 w-11 rounded-full border border-[#E7E5E1] dark:border-[#232A3D] flex items-center justify-center text-[#12141C] dark:text-white hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} aria-label="Next testimonial" className="h-11 w-11 rounded-full border border-[#E7E5E1] dark:border-[#232A3D] flex items-center justify-center text-[#12141C] dark:text-white hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/50">
            <SmartImg src={t.img} fallback={t.fb} alt={t.name} className="w-full h-80 sm:h-[420px] lg:h-[420px] object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Contact ------------------------------------- */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', agree: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.agree) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '', agree: false });
    }, 3500);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 bg-[#F7F7F5] dark:bg-[#0D1017] border-t border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>lets-talk</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4 mb-4">
            Let's build something great
          </h2>
          <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed">
            Have a project in mind, or just want to talk through an idea? My inbox is open.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] overflow-hidden lg:sticky lg:top-28">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E7E5E1] dark:border-[#232A3D] bg-[#F7F7F5] dark:bg-[#151926]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-xs text-[#5B6270] dark:text-[#8D95A8]">message.json</span>
              <span className={`ml-auto h-1.5 w-1.5 rounded-full ${submitted ? 'bg-emerald-500' : 'bg-[#FF5A36] animate-pulse'}`} />
            </div>
            <div className="p-6 sm:p-8 font-mono text-[13px] sm:text-sm leading-relaxed">
              <p className="text-[#5B6270] dark:text-[#8D95A8]">{'{'}</p>
              <p className="pl-4">
                <span className="text-[#FF5A36]">"from"</span>:{' '}
                <span className={form.name ? 'text-[#12141C] dark:text-[#F4F3EF]' : 'text-[#9CA3AF] italic'}>"{form.name || 'waiting for input...'}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#FF5A36]">"email"</span>:{' '}
                <span className={form.email ? 'text-[#12141C] dark:text-[#F4F3EF]' : 'text-[#9CA3AF] italic'}>"{form.email || 'waiting for input...'}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#FF5A36]">"message"</span>:{' '}
                <span className={form.message ? 'text-[#12141C] dark:text-[#F4F3EF]' : 'text-[#9CA3AF] italic'}>"{form.message || 'waiting for input...'}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#FF5A36]">"status"</span>: <span className={submitted ? 'text-emerald-500' : 'text-[#9CA3AF]'}>"{submitted ? 'sent' : 'draft'}"</span>
              </p>
              <p className="text-[#5B6270] dark:text-[#8D95A8]">{'}'}</p>
            </div>
            <div className="border-t border-[#E7E5E1] dark:border-[#232A3D] px-6 sm:px-8 py-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#5B6270] dark:text-[#8D95A8]">
                <i className="fa-solid fa-bolt text-[#FF5A36] w-4" aria-hidden="true"></i> Usually replies within 24 hours
              </div>
              <div className="flex items-center gap-3 text-sm text-[#5B6270] dark:text-[#8D95A8]">
                <i className="fa-solid fa-handshake text-[#FF5A36] w-4" aria-hidden="true"></i> Open to freelance right now
              </div>
              <div className="flex items-center gap-3 text-sm text-[#5B6270] dark:text-[#8D95A8]">
                <i className="fa-solid fa-lock text-[#FF5A36] w-4" aria-hidden="true"></i> No spam — ever
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 size={40} className="text-[#FF5A36] mb-4" />
                <h3 className="font-display text-2xl font-bold text-[#12141C] dark:text-white mb-2">Message sent</h3>
                <p className="text-[#5B6270] dark:text-[#8D95A8]">Thanks, {form.name.split(' ')[0] || 'friend'} — I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-[#FF5A36] mb-2">$ name</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent px-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#FF5A36] mb-2">$ email</label>
                  <input
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent px-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#FF5A36] mb-2">$ message</label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent px-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36] resize-none"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    required
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    type="checkbox"
                    id="agree"
                    className="mt-1 h-4 w-4 rounded border-[#E7E5E1] dark:border-[#232A3D] text-[#FF5A36] focus:ring-[#FF5A36]"
                  />
                  <label htmlFor="agree" className="text-sm text-[#5B6270] dark:text-[#8D95A8]">
                    I agree to be contacted regarding this inquiry.
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FF5A36] text-white px-7 py-3 rounded-full font-medium hover:bg-[#E64A28] transition-colors"
                >
                  Get in Touch <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer -------------------------------------- */
function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { icon: Github, href: 'https://github.com/OOLVTWO', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/ur.a.dn?igsh=MXFlY3NseTdsNTZybg==', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/surya-adi-darmawan-aa09b8288?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:suryaadidarmawan077@gmail.com', label: 'Email' },
  ];
  return (
    <footer className="bg-white dark:bg-[#0A0C12] border-t border-[#E7E5E1] dark:border-[#1B2030] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-display font-bold text-[#12141C] dark:text-white">
          Adi<span className="text-[#FF5A36]">.</span>Darmawan
        </span>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="h-10 w-10 rounded-full border border-[#E7E5E1] dark:border-[#232A3D] flex items-center justify-center text-[#5B6270] dark:text-[#8D95A8] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-[#5B6270] dark:text-[#8D95A8]">© {year} Surya Adi Darmawan</p>
      </div>
    </footer>
  );
}

/* ----------------------------------- App ----------------------------------------- */
export default function App() {
  const [theme, setTheme] = useState('light');
  const [active, setActive] = useState('home');
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
          html { scroll-behavior: smooth; }
          body { font-family: 'IBM Plex Sans', sans-serif; }
          .font-display { font-family: 'Sora', sans-serif; }
          .font-mono { font-family: 'IBM Plex Mono', monospace; }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
        <div className="bg-white dark:bg-[#0A0C12] min-h-screen transition-colors duration-300 overflow-x-hidden">
          <Header active={active} onNavClick={scrollToSection} />
          <Hero onNavClick={scrollToSection} />
          <About />
          <TechMarquee />
          <Expertise />
          <Gallery onNavClick={scrollToSection} />
          <Stats />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
