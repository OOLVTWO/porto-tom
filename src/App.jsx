import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import {
  Sun, Moon, Menu, X, ChevronLeft, ChevronRight,
  Github, Linkedin, Twitter, Dribbble, Mail,
  Download, ArrowRight, ExternalLink, Send, CheckCircle2, Star,
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

const SKILLS = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'UI/UX Design', 'Figma', 'GraphQL'];

const CLIENTS = ['NORTHWIND', 'VERTEX LABS', 'ORBITAL', 'LUMEN', 'ATLAS CO.', 'HALCYON'];

const EXPERTISE = [
  {
    title: 'Web Design',
    desc: 'Interfaces that balance clarity and character — wireframed, prototyped, and pixel-checked before a line of code ships.',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    fb: 'https://picsum.photos/seed/webdesign/800/600',
    icon: 'fa-solid fa-palette',
  },
  {
    title: 'React Applications',
    desc: 'Component-driven front ends built for speed and scale, from internal dashboards to full customer-facing products.',
    img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    fb: 'https://picsum.photos/seed/reactapp/800/600',
    icon: 'fa-solid fa-code',
  },
  {
    title: 'SEO Optimization',
    desc: 'Technical audits and content structure that get real pages found by real people, without wrecking the design.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    fb: 'https://picsum.photos/seed/seo/800/600',
    icon: 'fa-solid fa-magnifying-glass-chart',
  },
];

const PROJECTS = [
  { title: 'Northwind Dashboard', tag: 'SaaS Dashboard', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', fb: 'https://picsum.photos/seed/proj1/800/600' },
  { title: 'Vertex Banking App', tag: 'Mobile App', img: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800', fb: 'https://picsum.photos/seed/proj2/800/600' },
  { title: 'Orbital Analytics', tag: 'Data Platform', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', fb: 'https://picsum.photos/seed/proj3/800/600' },
  { title: 'Lumen Commerce', tag: 'E-Commerce', img: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800', fb: 'https://picsum.photos/seed/proj4/800/600' },
  { title: 'Atlas Booking', tag: 'Web App', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', fb: 'https://picsum.photos/seed/proj5/800/600' },
  { title: 'Halcyon Marketing', tag: 'Marketing Site', img: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800', fb: 'https://picsum.photos/seed/proj6/800/600' },
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
    img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/test1/200/200',
  },
  {
    quote: 'We came in with a rough sketch and left with a production React app our own engineers actually enjoyed extending.',
    name: 'Marcus Ude',
    title: 'CTO, Vertex Labs',
    img: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/test2/200/200',
  },
  {
    quote: 'Organic traffic doubled in four months. Surya treats SEO as part of the build, not an afterthought bolted on at the end.',
    name: 'Sofia Reyes',
    title: 'Founder, Halcyon',
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    fb: 'https://picsum.photos/seed/test3/200/200',
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

/* ------------------------------ UI Helpers -------------------------------- */
function SmartImg({ src, fallback, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
    />
  );
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

function HireBadge({ onClick }) {
  return (
    <button onClick={onClick} className="relative h-28 w-28 shrink-0 group" aria-label="Hire me — go to contact">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
        <defs>
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text fill="white" fontSize="7.6" letterSpacing="2.5" className="uppercase font-semibold">
          <textPath href="#circlePath" startOffset="0%">Available for hire • Available for hire •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-14 w-14 rounded-full bg-[#0A0E1A] group-hover:bg-[#131B2E] transition-colors flex flex-col items-center justify-center text-white leading-none gap-0.5">
          <span className="text-[10px] font-bold tracking-wide">HIRE</span>
          <span className="text-[10px] font-bold tracking-wide">ME</span>
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

  const solid = scrolled || mobileOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      solid
        ? 'bg-white/90 dark:bg-[#0A0E1A]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => handleClick('home')} className={`font-display text-xl font-bold tracking-tight ${
          solid ? 'text-[#10131C] dark:text-[#F3F1EA]' : 'text-white'
        }`}>
          Surya<span className="text-[#FF6B4A]">.</span>Darmawan
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                active === item.id
                  ? 'text-[#FF6B4A]'
                  : solid
                  ? 'text-[#5B6270] dark:text-[#93A0B8] hover:text-[#10131C] dark:hover:text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
              {active === item.id && <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#FF6B4A] rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`h-10 w-10 flex items-center justify-center rounded-full border transition-colors ${
              solid
                ? 'border-[#E9E7E1] dark:border-[#232E47] text-[#10131C] dark:text-[#F3F1EA] hover:bg-[#F7F6F2] dark:hover:bg-[#131B2E]'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`lg:hidden h-10 w-10 flex items-center justify-center rounded-full ${solid ? 'text-[#10131C] dark:text-white' : 'text-white'}`}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile backdrop — independent fixed layer, dims the page behind the drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] h-screen w-screen bg-slate-950/60 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Mobile panel — independent fixed layer with a guaranteed opaque, full-height background */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] h-screen w-[80%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl lg:hidden overflow-y-auto transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#E9E7E1] dark:border-[#1D273D]">
            <span className="font-display font-bold text-[#10131C] dark:text-white">Menu</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="h-10 w-10 flex items-center justify-center rounded-full text-[#10131C] dark:text-white hover:bg-[#F7F6F2] dark:hover:bg-[#131B2E]">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col px-6 gap-1 mt-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-left py-3 text-lg font-display font-medium border-b border-[#E9E7E1] dark:border-[#1D273D] ${
                  active === item.id ? 'text-[#FF6B4A]' : 'text-[#10131C] dark:text-[#F3F1EA]'
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
    <section id="home" className="scroll-mt-24 relative grid lg:grid-cols-2 lg:min-h-screen">
      <div className="relative flex items-center bg-gradient-to-br from-[#FF7A57] via-[#FF6B4A] to-[#E8532E] px-6 sm:px-10 lg:px-16 py-28 lg:py-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/20" />
        <div className="absolute bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="relative max-w-lg mx-auto lg:mx-0">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-white/80 uppercase mb-6">Portfolio — 2026</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-[1.05] mb-6">Surya Adi Darmawan</h1>
          <p className="text-xl font-display text-white/95 mb-5">Software Engineer</p>
          <p className="text-white/85 leading-relaxed mb-10">
            I build fast, reliable software — from React front ends to the systems behind them —
            currently working with startups across three timezones.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => onNavClick('portfolio')}
              className="inline-flex items-center gap-2 bg-[#0A0E1A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#131B2E] transition-colors"
            >
              View Work <ArrowRight size={16} />
            </button>
            <HireBadge onClick={() => onNavClick('contact')} />
          </div>
        </div>
      </div>

      <div className="relative bg-[#0A0E1A] overflow-hidden min-h-[50vh] lg:min-h-0">
        <SmartImg
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
          fallback="https://picsum.photos/seed/heroportrait/1200/1400"
          alt="Portrait of Surya Adi Darmawan"
          className="w-full h-full object-cover object-top absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>
    </section>
  );
}

/* --------------------------------- About ------------------------------------ */
function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32 bg-white dark:bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative max-w-md">
            <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-2 border-[#FF6B4A]" />
            <SmartImg
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              fallback="https://picsum.photos/seed/aboutphoto/800/900"
              alt="Surya Adi Darmawan at work"
              className="relative w-full aspect-[4/5] object-cover object-top rounded-3xl"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6B4A] uppercase">About Me</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#10131C] dark:text-white mt-4 mb-6">
            Eight years of turning specs into shipped software
          </h2>
          <p className="text-[#5B6270] dark:text-[#93A0B8] leading-relaxed mb-4">
            I'm a software engineer working across the front end and the systems behind it, based between
            Jakarta and remote client offices. I care about interfaces that feel considered and the code
            underneath that keeps them fast — from component architecture to the API it talks to.
          </p>
          <p className="text-[#5B6270] dark:text-[#93A0B8] leading-relaxed mb-8">
            Recent projects span fintech dashboards, booking platforms, and marketing sites for teams who
            needed both a sharper look and a faster load time. I care most about the details nobody notices
            until they're missing.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {SKILLS.map((skill) => (
              <span key={skill} className="text-sm font-medium px-4 py-1.5 rounded-full bg-[#F7F6F2] dark:bg-[#131B2E] text-[#10131C] dark:text-[#F3F1EA] border border-[#E9E7E1] dark:border-[#232E47]">
                {skill}
              </span>
            ))}
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 bg-[#FF6B4A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E8532E] transition-colors"
          >
            <Download size={16} /> Download Résumé
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Client Logos --------------------------------- */
function ClientLogos() {
  return (
    <section className="py-14 bg-[#F7F6F2] dark:bg-[#0C1220] border-y border-[#E9E7E1] dark:border-[#1D273D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#5B6270] dark:text-[#93A0B8] uppercase mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {CLIENTS.map((c) => (
            <span key={c} className="font-display font-bold text-lg tracking-wide text-[#10131C] dark:text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">
              {c}
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
    <section id="expertise" className="scroll-mt-24 py-24 sm:py-32 bg-white dark:bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6B4A] uppercase">What I Do</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#10131C] dark:text-white mt-4">
            Where design meets working code
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {EXPERTISE.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group rounded-3xl overflow-hidden border border-[#E9E7E1] dark:border-[#232E47] bg-white dark:bg-[#0F1729] h-full">
                <div className="relative h-56 overflow-hidden">
                  <SmartImg
                    src={item.img}
                    fallback={item.fb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 h-11 w-11 rounded-full bg-[#FF6B4A] flex items-center justify-center text-white shadow-lg">
                    <i className={`${item.icon} text-base`} aria-hidden="true"></i>
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-[#10131C] dark:text-white mb-3">{item.title}</h3>
                  <p className="text-[#5B6270] dark:text-[#93A0B8] leading-relaxed text-sm">{item.desc}</p>
                </div>
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
    <section id="portfolio" className="scroll-mt-24 py-24 sm:py-32 bg-[#F7F6F2] dark:bg-[#0C1220]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6B4A] uppercase">Selected Work</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#10131C] dark:text-white mt-4">Recent projects</h2>
          </div>
          <button
            onClick={() => onNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#10131C] dark:text-white hover:text-[#FF6B4A] dark:hover:text-[#FF6B4A]"
          >
            Start a project <ArrowRight size={16} />
          </button>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                <SmartImg
                  src={p.img}
                  fallback={p.fb}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/90 via-[#0A0E1A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold tracking-widest text-[#FF8C6B] uppercase mb-1">{p.tag}</span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                    <ExternalLink size={18} className="text-white" />
                  </div>
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
      <div className="text-sm text-white/70 uppercase tracking-wide">{stat.label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0A0E1A] to-[#131B2E]">
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
    <section id="testimonials" className="scroll-mt-24 py-24 sm:py-32 bg-white dark:bg-[#0A0E1A]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6B4A] uppercase">Testimonials</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#10131C] dark:text-white mt-4 mb-14">What clients say</h2>

        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full ring-4 ring-[#FF6B4A]/20 overflow-hidden">
              <SmartImg src={t.img} fallback={t.fb} alt={t.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <i className="fa-solid fa-quote-left text-2xl text-[#FF6B4A]/30 mb-4 inline-block" aria-hidden="true"></i>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#FF6B4A] text-[#FF6B4A]" />)}
          </div>
          <p className="font-display text-xl sm:text-2xl text-[#10131C] dark:text-white leading-relaxed mb-6">"{t.quote}"</p>
          <p className="font-semibold text-[#10131C] dark:text-white">{t.name}</p>
          <p className="text-sm text-[#5B6270] dark:text-[#93A0B8]">{t.title}</p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} aria-label="Previous testimonial" className="h-10 w-10 rounded-full border border-[#E9E7E1] dark:border-[#232E47] flex items-center justify-center text-[#10131C] dark:text-white hover:bg-[#F7F6F2] dark:hover:bg-[#131B2E]">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#FF6B4A]' : 'w-2 bg-[#E9E7E1] dark:bg-[#232E47]'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonial" className="h-10 w-10 rounded-full border border-[#E9E7E1] dark:border-[#232E47] flex items-center justify-center text-[#10131C] dark:text-white hover:bg-[#F7F6F2] dark:hover:bg-[#131B2E]">
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
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32 bg-[#F7F6F2] dark:bg-[#0C1220]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#FF7A57] to-[#E8532E] px-8 sm:px-14 py-14 mb-[-4rem] relative z-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Let's build something great</h2>
          <p className="text-white/85 max-w-xl mx-auto">Have a project in mind, or just want to talk through an idea? My inbox is open.</p>
        </div>
        <div className="rounded-3xl border border-[#E9E7E1] dark:border-[#232E47] bg-white dark:bg-[#0F1729] pt-20 pb-12 px-6 sm:px-14">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={40} className="text-[#FF6B4A] mb-4" />
              <h3 className="font-display text-2xl font-bold text-[#10131C] dark:text-white mb-2">Message sent</h3>
              <p className="text-[#5B6270] dark:text-[#93A0B8]">Thanks, {form.name.split(' ')[0] || 'friend'} — I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[#10131C] dark:text-white mb-2">Name</label>
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#E9E7E1] dark:border-[#232E47] bg-transparent pl-11 pr-4 py-3 text-[#10131C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[#10131C] dark:text-white mb-2">Email</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                  <input
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#E9E7E1] dark:border-[#232E47] bg-transparent pl-11 pr-4 py-3 text-[#10131C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#10131C] dark:text-white mb-2">Message</label>
                <div className="relative">
                  <i className="fa-solid fa-message absolute left-4 top-4 text-[#9CA3AF] text-sm" aria-hidden="true"></i>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-xl border border-[#E9E7E1] dark:border-[#232E47] bg-transparent pl-11 pr-4 py-3 text-[#10131C] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] resize-none"
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
                  className="mt-1 h-4 w-4 rounded border-[#E9E7E1] dark:border-[#232E47] text-[#FF6B4A] focus:ring-[#FF6B4A]"
                />
                <label htmlFor="agree" className="text-sm text-[#5B6270] dark:text-[#93A0B8]">
                  I agree to be contacted regarding this inquiry.
                </label>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FF6B4A] text-white px-7 py-3 rounded-full font-medium hover:bg-[#E8532E] transition-colors"
                >
                  Get in Touch <Send size={16} />
                </button>
              </div>
            </form>
          )}
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
    <footer className="bg-white dark:bg-[#0A0E1A] border-t border-[#E9E7E1] dark:border-[#1D273D] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-display font-bold text-[#10131C] dark:text-white">
          Surya<span className="text-[#FF6B4A]">.</span>Darmawan
        </span>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="h-10 w-10 rounded-full border border-[#E9E7E1] dark:border-[#232E47] flex items-center justify-center text-[#5B6270] dark:text-[#93A0B8] hover:text-[#FF6B4A] hover:border-[#FF6B4A] transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="text-sm text-[#5B6270] dark:text-[#93A0B8]">© {year} Surya Adi Darmawan. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ----------------------------------- App ----------------------------------------- */
export default function App() {
  const [theme, setTheme] = useState('dark');
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
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          html { scroll-behavior: smooth; }
          body { font-family: 'Inter', sans-serif; }
          .font-display { font-family: 'Space Grotesk', sans-serif; }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
        <div className="bg-white dark:bg-[#0A0E1A] min-h-screen font-sans transition-colors duration-300 overflow-x-hidden">
          <Header active={active} onNavClick={scrollToSection} />
          <Hero onNavClick={scrollToSection} />
          <About />
          <ClientLogos />
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
