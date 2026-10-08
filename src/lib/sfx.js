// Sound effects, synthesised with the Web Audio API so there are no audio files to load.
// To use your own recordings instead, drop them in public/sfx/ and list them in CUSTOM_FILES,
// e.g. { 'streak-1': '/sfx/first-blood.mp3' }. Listed files win over the synth.

const CUSTOM_FILES = {
  // 'streak-1': '/sfx/first-blood.mp3',
  // 'streak-2': '/sfx/double-kill.mp3',
  // 'streak-3': '/sfx/triple-kill.mp3',
  // 'streak-4': '/sfx/maniac.mp3',
  // 'streak-5': '/sfx/savage.mp3',
};

export const STREAKS = ['First Blood', 'Double Kill', 'Triple Kill', 'Maniac', 'Savage'];

const KEY = 'porto:sound';
const listeners = new Set();
let ctx = null;
let master = null;
let muted = (() => {
  try {
    return localStorage.getItem(KEY) === 'off';
  } catch {
    return false;
  }
})();

export function isMuted() {
  return muted;
}

export function setMuted(next) {
  muted = next;
  try {
    localStorage.setItem(KEY, next ? 'off' : 'on');
  } catch {
    /* ignore */
  }
  if (next && typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  listeners.forEach((fn) => fn(next));
}

export function onMuteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Browsers only allow audio after a user gesture; every sound here is triggered by one.
function audio() {
  if (muted || typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playFile(name) {
  const src = CUSTOM_FILES[name];
  if (!src || muted) return false;
  const a = new Audio(src);
  a.volume = 0.9;
  a.play().catch(() => {});
  return true;
}

function noiseBuffer(ac, seconds) {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function tone(ac, { type = 'sine', freq, to, start = 0, dur = 0.2, gain = 0.3, attack = 0.005, dest = master }) {
  const t = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(dest);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function noise(ac, { start = 0, dur = 0.3, gain = 0.3, type = 'lowpass', freq = 1200, to, q = 1, dest = master }) {
  const t = ac.currentTime + start;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, dur + 0.05);
  const f = ac.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(freq, t);
  if (to) f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(dest);
  src.start(t);
  src.stop(t + dur + 0.05);
}

// Short echo send for the bigger stingers.
function echo(ac, time = 0.18, feedback = 0.35) {
  const d = ac.createDelay(1);
  d.delayTime.value = time;
  const fb = ac.createGain();
  fb.gain.value = feedback;
  const wet = ac.createGain();
  wet.gain.value = 0.35;
  d.connect(fb).connect(d);
  d.connect(wet).connect(master);
  return d;
}

const midi = (n) => 440 * 2 ** ((n - 69) / 12);

function speak(text, level) {
  if (typeof speechSynthesis === 'undefined' || muted) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const en = voices.filter((v) => v.lang?.startsWith('en'));
  u.voice = en.find((v) => /male|daniel|fred|alex|google uk english male/i.test(v.name)) || en[0] || null;
  u.lang = 'en-US';
  u.rate = 0.92 + level * 0.03;
  u.pitch = 0.55 + level * 0.06;
  u.volume = 1;
  setTimeout(() => speechSynthesis.speak(u), 140);
}

// Kill-streak stinger. Level 1–5 (First Blood … Savage); each level hits harder and climbs higher.
export function streak(level) {
  const lvl = Math.max(1, Math.min(5, level));
  if (playFile(`streak-${lvl}`)) return;
  speak(STREAKS[lvl - 1], lvl);
  stinger(lvl);
}

function stinger(lvl) {
  const ac = audio();
  if (!ac) return;
  const fx = echo(ac, 0.16 + lvl * 0.02, 0.25 + lvl * 0.05);

  // Impact: sub drop + noise thump.
  tone(ac, { type: 'sine', freq: 150, to: 38, dur: 0.5 + lvl * 0.08, gain: 0.7 });
  noise(ac, { dur: 0.25, gain: 0.5, freq: 900, to: 120 });
  // Blade "shing".
  noise(ac, { start: 0.02, dur: 0.35, gain: 0.16, type: 'bandpass', freq: 7000, to: 2500, q: 4, dest: fx });
  // Chord stab, root climbs with the streak.
  const roots = [57, 60, 62, 64, 69];
  const root = roots[lvl - 1];
  [0, 7, 12, ...(lvl >= 3 ? [16] : []), ...(lvl >= 5 ? [19, 24] : [])].forEach((iv, i) => {
    tone(ac, { type: 'sawtooth', freq: midi(root + iv), start: 0.04, dur: 0.55 + lvl * 0.1, gain: 0.07, dest: fx });
    if (i < 2) tone(ac, { type: 'square', freq: midi(root + iv - 12), start: 0.04, dur: 0.45, gain: 0.05 });
  });
  // Rising sparkle for the higher streaks.
  for (let i = 0; i < lvl; i++) {
    tone(ac, { type: 'triangle', freq: midi(root + 24 + i * 3), start: 0.12 + i * 0.06, dur: 0.25, gain: 0.06, dest: fx });
  }
  if (lvl === 5) noise(ac, { start: 0.05, dur: 1.1, gain: 0.12, type: 'highpass', freq: 400, to: 6000, dest: fx });
}

export function achievement() {
  if (playFile('achievement')) return;
  const ac = audio();
  if (!ac) return;
  const fx = echo(ac, 0.12, 0.3);
  [72, 76, 79, 84].forEach((n, i) => tone(ac, { type: 'triangle', freq: midi(n), start: i * 0.07, dur: 0.35, gain: 0.12, dest: fx }));
}

export function legendary() {
  if (playFile('legendary')) return;
  speak('Legendary', 5);
  stinger(5);
  const ac = audio();
  if (!ac) return;
  [69, 72, 76, 81, 84, 88].forEach((n, i) => tone(ac, { type: 'triangle', freq: midi(n), start: 0.3 + i * 0.08, dur: 0.5, gain: 0.08 }));
}

export function blip() {
  const ac = audio();
  if (!ac) return;
  tone(ac, { type: 'square', freq: 880, to: 1320, dur: 0.05, gain: 0.04 });
}

export function tick() {
  const ac = audio();
  if (!ac) return;
  tone(ac, { type: 'triangle', freq: 2200, dur: 0.025, gain: 0.025 });
}

export function whoosh() {
  const ac = audio();
  if (!ac) return;
  noise(ac, { dur: 0.3, gain: 0.12, type: 'bandpass', freq: 400, to: 3000, q: 1.5 });
}

export function boop() {
  const ac = audio();
  if (!ac) return;
  tone(ac, { type: 'sine', freq: 520, to: 780, dur: 0.12, gain: 0.12 });
  tone(ac, { type: 'sine', freq: 780, to: 1040, start: 0.08, dur: 0.12, gain: 0.1 });
}
