import { useEffect } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Copy, Github, Linkedin, MessageCircle, Trophy, Gamepad2, Volume2 } from 'lucide-react';
import * as sfx from '../lib/sfx';
import { SECTIONS, PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { scrollToSection } from './Hud';

const itemCls =
  'flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-mute data-[selected=true]:bg-raised data-[selected=true]:text-white';

export default function CommandPalette({ open, onOpenChange, onOpenMatch, onOpenTrophies, onCopyEmail }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  const run = (fn) => () => {
    onOpenChange(false);
    // Let the palette close before scrolling or opening another dialog.
    setTimeout(fn, 60);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-void/70 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Command
              label="Command menu"
              className="overflow-hidden border border-line bg-panel shadow-2xl"
              onKeyDown={(e) => e.key === 'Escape' && onOpenChange(false)}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <span className="font-mono text-sm text-ember">&gt;</span>
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section, open a match…"
                  className="h-14 w-full bg-transparent text-base text-white placeholder:text-dim focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <kbd className="hidden border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim sm:block">ESC</kbd>
              </div>
              <Command.List className="max-h-[55vh] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-dim">Nothing found.</Command.Empty>

                <Command.Group heading="Lobby" className="[&_[cmdk-group-heading]]:hud-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {SECTIONS.map((s) => (
                    <Command.Item key={s.id} value={`section ${s.label}`} onSelect={run(() => scrollToSection(s.id))} className={itemCls}>
                      <ArrowRight size={16} className="text-ember" /> {s.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Matches" className="[&_[cmdk-group-heading]]:hud-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {PROJECTS.map((p) => (
                    <Command.Item
                      key={p.slug}
                      value={`match ${p.title} ${p.tagline} ${p.items.join(' ')}`}
                      onSelect={run(() => onOpenMatch(p.slug))}
                      className={itemCls}
                    >
                      <Gamepad2 size={16} className="text-gold" />
                      <span className="truncate">{p.title}</span>
                      <span className="ml-auto shrink-0 font-mono text-[10px] text-dim">{p.date}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:hud-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  <Command.Item
                    value="chat whatsapp wa contact"
                    onSelect={run(() => window.open(`https://wa.me/${PROFILE.whatsapp}`, '_blank', 'noopener'))}
                    className={itemCls}
                  >
                    <MessageCircle size={16} className="text-win" /> Chat on WhatsApp
                  </Command.Item>
                  <Command.Item value="copy email address" onSelect={run(onCopyEmail)} className={itemCls}>
                    <Copy size={16} className="text-cyan" /> Copy email address
                  </Command.Item>
                  <Command.Item value="toggle sound audio mute" onSelect={run(() => sfx.setMuted(!sfx.isMuted()))} className={itemCls}>
                    <Volume2 size={16} className="text-cyan" /> Toggle sound
                  </Command.Item>
                  <Command.Item value="trophy achievements" onSelect={run(onOpenTrophies)} className={itemCls}>
                    <Trophy size={16} className="text-cyan" /> View achievements
                  </Command.Item>
                  <Command.Item
                    value="github profile"
                    onSelect={run(() => window.open(PROFILE.socials[0].href, '_blank', 'noopener'))}
                    className={itemCls}
                  >
                    <Github size={16} className="text-cyan" /> Open GitHub
                  </Command.Item>
                  <Command.Item
                    value="linkedin profile"
                    onSelect={run(() => window.open(PROFILE.socials[1].href, '_blank', 'noopener'))}
                    className={itemCls}
                  >
                    <Linkedin size={16} className="text-cyan" /> Open LinkedIn
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
