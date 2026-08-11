import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import {
  Sun, Moon, Menu, X, ChevronLeft, ChevronRight,
  Github, Linkedin, Twitter, Dribbble, Mail, Download, Send, CheckCircle2, Star,
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

const SKILLS = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'Docker'];

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
  { label: 'Location', value: 'Jakarta, Indonesia', icon: 'fa-solid fa-location-dot' },
  { label: 'Focus', value: 'Frontend + Systems', icon: 'fa-solid fa-layer-group' },
  { label: 'Experience', value: '8+ years', icon: 'fa-solid fa-clock' },
  { label: 'Availability', value: 'Open to freelance', icon: 'fa-solid fa-circle-check' },
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
  {
    title: 'Northwind Dashboard', tag: 'SaaS Dashboard', domain: 'northwind.app',
    img: 'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/northwind-dash/800/600',
  },
  {
    title: 'Vertex Banking App', tag: 'Mobile App', domain: 'vertexbank.io',
    img: 'https://images.pexels.com/photos/6406691/pexels-photo-6406691.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/vertex-bank/800/600',
  },
  {
    title: 'Orbital Analytics', tag: 'Data Platform', domain: 'orbital.dev',
    img: 'https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/orbital-data/800/600',
  },
  {
    title: 'Lumen Commerce', tag: 'E-Commerce', domain: 'shoplumen.com',
    img: 'https://images.pexels.com/photos/5585793/pexels-photo-5585793.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/lumen-shop/800/600',
  },
  {
    title: 'Atlas Booking', tag: 'Web App', domain: 'atlasbook.app',
    img: 'https://images.pexels.com/photos/33136468/pexels-photo-33136468.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/atlas-book/800/600',
  },
  {
    title: 'Halcyon Marketing', tag: 'Marketing Site', domain: 'halcyon.co',
    img: 'https://images.pexels.com/photos/6483621/pexels-photo-6483621.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/halcyon-mkt/800/600',
  },
];

const STATS = [
  { label: 'Projects Completed', value: 120, suffix: '+', icon: 'fa-solid fa-diagram-project' },
  { label: 'Years Experience', value: 8, suffix: '+', icon: 'fa-solid fa-calendar-check' },
  { label: 'Happy Clients', value: 45, suffix: '', icon: 'fa-solid fa-people-group' },
  { label: 'Client Satisfaction', value: 99, suffix: '%', icon: 'fa-solid fa-face-smile' },
];

const TESTIMONIALS = [
  {
    quote: "Surya rebuilt our dashboard from scratch and cut load times in half. The handoff docs alone were better than most agencies' final deliverables.",
    name: 'Priya Anand',
    title: 'VP Product, Northwind',
    img: 'https://images.pexels.com/photos/30004322/pexels-photo-30004322.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/priya-anand/200/200',
  },
  {
    quote: 'We came in with a rough sketch and left with a production React app our own engineers actually enjoyed extending.',
    name: 'Marcus Ude',
    title: 'CTO, Vertex Labs',
    img: 'https://images.pexels.com/photos/30767572/pexels-photo-30767572.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/marcus-ude/200/200',
  },
  {
    quote: 'Organic traffic doubled in four months. Surya treats SEO as part of the build, not an afterthought bolted on at the end.',
    name: 'Sofia Reyes',
    title: 'Founder, Halcyon',
    img: 'https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/sofia-reyes/200/200',
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

function DotGrid({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute -z-10 opacity-[0.35] dark:opacity-[0.15] ${className}`}
      style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '18px 18px', color: '#9C9990' }}
    />
  );
}

function HireBadge({ onClick }) {
  return (
    <button onClick={onClick} className="relative h-24 w-24 shrink-0" aria-label="Hire me — go to contact">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_11s_linear_infinite]">
        <defs>
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text fill="#12141C" className="dark:fill-white" fontSize="7.4" letterSpacing="2.2">
          <textPath href="#circlePath" startOffset="0%">AVAILABLE FOR HIRE • AVAILABLE FOR HIRE •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-12 w-12 rounded-full bg-[#FF5A36] flex items-center justify-center text-white">
          <i className="fa-solid fa-arrow-right -rotate-45 text-sm" aria-hidden="true"></i>
        </span>
      </span>
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
        : 'bg-white/60 dark:bg-[#0A0C12]/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => handleClick('home')} className="font-display text-xl font-bold tracking-tight text-[#12141C] dark:text-[#F4F3EF]">
          Surya<span className="text-[#FF5A36]">.</span>Darmawan
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wide rounded-full transition-colors ${
                active === item.id
                  ? 'text-[#FF5A36]'
                  : 'text-[#5B6270] dark:text-[#8D95A8] hover:text-[#12141C] dark:hover:text-white'
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
            className="h-10 w-10 flex items-center justify-center rounded-full border border-[#E7E5E1] dark:border-[#232A3D] text-[#12141C] dark:text-[#F4F3EF] hover:bg-[#F7F7F5] dark:hover:bg-[#151926] transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full text-[#12141C] dark:text-white"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile backdrop — independent fixed layer, dims the page behind the drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] h-screen w-screen bg-[#12141C]/60 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Mobile panel — independent fixed layer with a guaranteed opaque, full-height background */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] h-screen w-[80%] max-w-sm bg-white dark:bg-[#0A0C12] shadow-2xl lg:hidden overflow-y-auto transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
    <section id="home" className="scroll-mt-24 relative bg-white dark:bg-[#0A0C12] pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1EC] dark:bg-[#241610] px-4 py-1.5 font-mono text-xs text-[#FF5A36] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36] animate-pulse" /> available for work — 2026
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#12141C] dark:text-white leading-[1.05] mb-4">
            Surya Adi Darmawan
          </h1>
          <p className="text-xl font-display font-semibold text-[#FF5A36] mb-6">Software Engineer</p>
          <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed mb-10 max-w-md">
            I build fast, reliable software — from React front ends to the systems behind them —
            currently working with startups across three timezones.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => onNavClick('portfolio')}
              className="inline-flex items-center gap-2 bg-[#12141C] dark:bg-[#FF5A36] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              View Work <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
            </button>
            <HireBadge onClick={() => onNavClick('contact')} />
          </div>
        </div>

        <div className="relative max-w-sm mx-auto lg:mx-0 lg:justify-self-end">
          <DotGrid className="-inset-8 hidden sm:block" />
          <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-[#FF5A36]/15 blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden border border-[#E7E5E1] dark:border-[#232A3D] shadow-xl shadow-black/5">
            <SmartImg
              src="/images/portrait.jpg"
              fallback="https://picsum.photos/seed/surya-portrait/800/1000"
              alt="Surya Adi Darmawan"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block rotate-[-3deg] rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-white dark:bg-[#10131C] shadow-lg px-4 py-3 font-mono text-xs">
            <span className="text-[#FF5A36]">status</span>: <span className="text-emerald-500">"available_for_work"</span>
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <Eyebrow>about-me</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4 mb-6">
            Eight years of turning specs into shipped software
          </h2>
          <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed mb-4">
            I'm a software engineer working across the front end and the systems behind it, based between
            Jakarta and remote client offices. I care about interfaces that feel considered and the code
            underneath that keeps them fast — from component architecture to the API it talks to.
          </p>
          <p className="text-[#5B6270] dark:text-[#8D95A8] leading-relaxed mb-8">
            Recent projects span fintech dashboards, booking platforms, and marketing sites for teams who
            needed both a sharper look and a faster load time. I care most about the details nobody notices
            until they're missing.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
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

          <div className="flex flex-wrap gap-2 mb-10">
            {SKILLS.map((skill) => (
              <span key={skill} className="font-mono text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#151926] text-[#12141C] dark:text-[#F4F3EF] border border-[#E7E5E1] dark:border-[#232A3D]">
                {skill}
              </span>
            ))}
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 bg-[#FF5A36] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E64A28] transition-colors"
          >
            <Download size={16} /> Download Résumé
          </a>
        </Reveal>

        <Reveal delay={100} className="relative">
          <DotGrid className="-inset-8 hidden sm:block" />
          <div className="relative rounded-2xl overflow-hidden border border-[#E7E5E1] dark:border-[#232A3D] shadow-sm">
            <SmartImg
              src="/images/speaking-2.jpg"
              fallback="https://picsum.photos/seed/surya-speaking/900/1100"
              alt="Surya Adi Darmawan speaking at a Primakara University tech event"
              className="w-full aspect-[4/5] object-cover"
              style={{ objectPosition: '38% 20%' }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-white text-sm font-medium">Speaking at a Primakara University tech event</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
    <section id="expertise" className="scroll-mt-24 py-20 sm:py-28 bg-white dark:bg-[#0A0C12]">
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

/* -------------------------------- Gallery ------------------------------------- */
function Gallery({ onNavClick }) {
  return (
    <section id="portfolio" className="scroll-mt-24 py-20 sm:py-28 bg-[#F7F7F5] dark:bg-[#0D1017] border-y border-[#E7E5E1] dark:border-[#1B2030]">
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
                <div className="relative h-44 overflow-hidden">
                  <SmartImg
                    src={p.img}
                    fallback={p.fb}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    <span className="ml-2 font-mono text-[10px] text-white/80 truncate">{p.domain}</span>
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
    <div ref={ref} className="text-center">
      <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
        <i className={`${stat.icon} text-[#FF8C6B] text-lg`} aria-hidden="true"></i>
      </div>
      <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
        {count}{stat.suffix}
      </div>
      <div className="font-mono text-xs text-white/60 uppercase tracking-wide">{stat.label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-20 bg-[#12141C] dark:bg-[#05070B]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
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
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28 bg-white dark:bg-[#0A0C12]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <Eyebrow>testimonials</Eyebrow>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#12141C] dark:text-white mt-4 mb-14">What clients say</h2>

        <div className="relative rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] bg-[#F7F7F5] dark:bg-[#10131C] px-8 py-12 sm:px-14">
          <div className="h-16 w-16 rounded-full overflow-hidden ring-4 ring-[#FF5A36]/10 mx-auto mb-6">
            <SmartImg src={t.img} fallback={t.fb} alt={t.name} className="w-full h-full object-cover" />
          </div>
          <i className="fa-solid fa-quote-left text-2xl text-[#FF5A36]/30 mb-4 inline-block" aria-hidden="true"></i>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#FF5A36] text-[#FF5A36]" />)}
          </div>
          <p className="font-display text-xl sm:text-2xl text-[#12141C] dark:text-white leading-relaxed mb-6">"{t.quote}"</p>
          <p className="font-semibold text-[#12141C] dark:text-white">{t.name}</p>
          <p className="font-mono text-xs text-[#5B6270] dark:text-[#8D95A8] mt-1">{t.title}</p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} aria-label="Previous testimonial" className="h-10 w-10 rounded-full border border-[#E7E5E1] dark:border-[#232A3D] flex items-center justify-center text-[#12141C] dark:text-white hover:bg-white dark:hover:bg-[#151926]">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#FF5A36]' : 'w-2 bg-[#E7E5E1] dark:bg-[#232A3D]'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonial" className="h-10 w-10 rounded-full border border-[#E7E5E1] dark:border-[#232A3D] flex items-center justify-center text-[#12141C] dark:text-white hover:bg-white dark:hover:bg-[#151926]">
              <ChevronRight size={18} />
            </button>
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
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 bg-[#F7F7F5] dark:bg-[#0D1017] border-y border-[#E7E5E1] dark:border-[#1B2030]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="rounded-2xl border border-[#E7E5E1] dark:border-[#232A3D] overflow-hidden">
          <div className="relative overflow-hidden bg-[#12141C] px-8 sm:px-14 py-16 text-center">
            <DotGrid className="inset-0 !opacity-[0.08]" />
            <span aria-hidden className="absolute -top-10 -left-4 font-mono text-[9rem] leading-none text-white/[0.05] select-none">{'{'}</span>
            <span aria-hidden className="absolute -bottom-16 -right-4 font-mono text-[9rem] leading-none text-white/[0.05] select-none">{'}'}</span>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 font-mono text-xs text-[#FF8C6B] mb-6">
              <i className="fa-solid fa-terminal text-[10px]" aria-hidden="true"></i> $ lets-build --together
            </span>
            <h2 className="relative font-display text-3xl sm:text-4xl font-bold text-white mb-3">Let's build something great</h2>
            <p className="relative text-white/60 max-w-xl mx-auto">Have a project in mind, or just want to talk through an idea? My inbox is open.</p>
          </div>
          <div className="bg-white dark:bg-[#10131C] px-6 sm:px-14 py-12">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 size={40} className="text-[#FF5A36] mb-4" />
                <h3 className="font-display text-2xl font-bold text-[#12141C] dark:text-white mb-2">Message sent</h3>
                <p className="text-[#5B6270] dark:text-[#8D95A8]">Thanks, {form.name.split(' ')[0] || 'friend'} — I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#12141C] dark:text-white mb-2">Name</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent pl-11 pr-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36]"
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#12141C] dark:text-white mb-2">Email</label>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                    <input
                      required
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent pl-11 pr-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36]"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#12141C] dark:text-white mb-2">Message</label>
                  <div className="relative">
                    <i className="fa-solid fa-message absolute left-4 top-4 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-xl border border-[#E7E5E1] dark:border-[#232A3D] bg-transparent pl-11 pr-4 py-3 text-[#12141C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF5A36] resize-none"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-start gap-3">
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
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#FF5A36] text-white px-7 py-3 rounded-full font-medium hover:bg-[#E64A28] transition-colors"
                  >
                    Get in Touch <Send size={16} />
                  </button>
                </div>
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
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Dribbble, href: '#', label: 'Dribbble' },
    { icon: Mail, href: 'mailto:hello@suryadarmawan.dev', label: 'Email' },
  ];
  return (
    <footer className="bg-white dark:bg-[#0A0C12] border-t border-[#E7E5E1] dark:border-[#1B2030] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-display font-bold text-[#12141C] dark:text-white">
          Surya<span className="text-[#FF5A36]">.</span>Darmawan
        </span>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
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
