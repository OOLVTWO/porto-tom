import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useAchievements } from '../lib/achievements';
import { Corners, SectionHeader } from '../components/ui';

const QUEUES = [
  { id: 'freelance', label: 'Freelance project' },
  { id: 'fulltime', label: 'Full-time role' },
  { id: 'collab', label: 'Collaboration' },
  { id: 'hi', label: 'Just saying hi' },
];

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram };

export default function Party({ onCopyEmail, copied }) {
  const { unlock } = useAchievements();
  const [queue, setQueue] = useState('freelance');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const queueLabel = QUEUES.find((q) => q.id === queue).label;

  // No backend: opens WhatsApp or the visitor's mail app with everything pre-filled.
  const submit = (e) => {
    e.preventDefault();
    const via = e.nativeEvent.submitter?.value === 'email' ? 'email' : 'whatsapp';
    if (via === 'whatsapp') {
      const text = `Hi Surya, I'm ${name.trim()}. [${queueLabel}]\n\n${message.trim()}`;
      window.open(`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      const subject = `[${queueLabel}] Party invite from ${name.trim()}`;
      const body = `${message.trim()}\n\n— ${name.trim()}`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(via);
    unlock('party-up');
  };

  return (
    <section id="party" className="scroll-mt-16 border-t border-line bg-panel/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader index="05" kicker="Invite to party" title="Looking for a teammate?">
          Pick a queue, tell me what you’re building and send it through WhatsApp or email. The message is filled in for
          you. I reply within a day.
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-12 lg:gap-10">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="hud-panel hud-cut relative p-5 [--cut:20px] sm:p-8 md:col-span-7"
          >
            <Corners className="border-ember/70" />
            <fieldset>
              <legend className="hud-label mb-3">Queue type</legend>
              <div className="grid grid-cols-2 gap-2">
                {QUEUES.map((q) => (
                  <label
                    key={q.id}
                    className={`cursor-pointer border px-3 py-3 text-center font-display text-xs font-semibold uppercase tracking-wider transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember ${
                      queue === q.id ? 'border-ember/60 bg-ember/10 text-white' : 'border-line text-mute hover:text-ink'
                    }`}
                  >
                    <input type="radio" name="queue" value={q.id} checked={queue === q.id} onChange={() => setQueue(q.id)} className="sr-only" />
                    {q.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-6 block">
              <span className="hud-label mb-2 block">Your name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Player name"
                className="w-full border border-line bg-void px-4 py-3 text-white placeholder:text-dim focus:border-ember focus:outline-none"
              />
            </label>
            <label className="mt-4 block">
              <span className="hud-label mb-2 block">Message</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are we building?"
                className="w-full resize-none border border-line bg-void px-4 py-3 text-white placeholder:text-dim focus:border-ember focus:outline-none"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" value="whatsapp" className="btn-primary">
                <MessageCircle size={16} /> Send via WhatsApp
              </button>
              <button type="submit" value="email" className="btn-ghost">
                <Mail size={16} /> Send via email
              </button>
            </div>
            {sent && (
              <p className="mt-3 text-sm text-win" role="status">
                {sent === 'whatsapp'
                  ? 'WhatsApp should be open with your message ready. Just hit send.'
                  : 'Your mail app should be open. If it didn’t, copy my email instead.'}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 md:col-span-5"
          >
            <a
              href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent('Hi Surya! I saw your portfolio and')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden border border-win/40 bg-win/10 p-5 transition-colors hover:border-win sm:p-6"
            >
              <span className="relative grid h-12 w-12 shrink-0 place-items-center bg-win/20 text-win">
                <MessageCircle size={24} />
                <span className="absolute inset-0 animate-ping bg-win/20" />
              </span>
              <span className="min-w-0">
                <span className="hud-label block text-win">Fastest reply · WhatsApp</span>
                <span className="block font-mono text-base text-white sm:text-lg">{PROFILE.whatsappDisplay}</span>
              </span>
              <span className="ml-auto font-display text-xs font-bold uppercase tracking-widest text-win transition-transform group-hover:translate-x-1">
                Chat →
              </span>
            </a>

            <div className="hud-panel p-5 sm:p-6">
              <p className="hud-label mb-2">Email</p>
              <p className="break-all font-mono text-sm text-white sm:text-base">{PROFILE.email}</p>
              <button onClick={onCopyEmail} className="btn-ghost mt-4 w-full">
                {copied ? <Check size={15} className="text-win" /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <div className="hud-panel p-5 sm:p-6">
              <p className="hud-label mb-3">Find me on</p>
              <div className="grid grid-cols-3 gap-2">
                {PROFILE.socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.id];
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 border border-line bg-raised/60 py-4 text-mute transition-colors hover:border-ember/60 hover:text-white"
                    >
                      <Icon size={20} />
                      <span className="font-display text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 border border-win/30 bg-win/5 px-5 py-4">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-win" />
              <p className="text-sm text-ink">Available for freelance work and junior roles, remote or in Bali.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
