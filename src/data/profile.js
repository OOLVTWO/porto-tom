export const PROFILE = {
  name: 'Surya Adi Darmawan',
  handle: 'SURYA',
  role: 'Software Engineer',
  base: 'Bali, Indonesia',
  email: 'suryaadidarmawan077@gmail.com',
  // International format, no plus sign (wa.me links).
  whatsapp: '6281239627764',
  whatsappDisplay: '0812-3962-7764',
  intro:
    'I build full-stack web apps for real businesses: booking sites, admin dashboards and the databases behind them. Off-screen, I run esports tournaments.',
  // Self-rated, shown as hero attribute bars.
  attributes: [
    { k: 'Frontend', v: 86 },
    { k: 'Backend & data', v: 72 },
    { k: 'UI design', v: 78 },
    { k: 'Shipping', v: 90 },
  ],
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/OOLVTWO' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/surya-adi-darmawan-aa09b8288' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/ur.a.dn' },
  ],
};

export const SECTIONS = [
  { id: 'profile', label: 'Profile', short: 'Profile' },
  { id: 'loadout', label: 'Loadout', short: 'Loadout' },
  { id: 'matches', label: 'Match History', short: 'Matches' },
  { id: 'highlights', label: 'Highlights', short: 'Moments' },
  { id: 'party', label: 'Invite to Party', short: 'Party' },
];

export const HIGHLIGHTS = [
  {
    src: '/images/speaking-1.jpg',
    position: '48% 35%',
    title: 'Leading as tournament PIC',
    caption: 'On the mic as person in charge (PIC) of a Mobile Legends: Bang Bang tournament.',
  },
  {
    src: '/images/speaking-2.jpg',
    position: '52% 55%',
    title: 'Running the show off-screen too',
    caption: 'Organizing and hosting on stage during the MLBB tournament, not just behind a keyboard.',
  },
  {
    src: '/images/moment-beach.jpg',
    position: 'center 45%',
    title: 'Weekend reset with the crew',
    caption: 'Snacks, sand and no laptops in sight. The other side of the schedule.',
  },
  {
    src: '/images/moment-ceremony.jpg',
    position: 'center 15%',
    title: 'Dressed up for a Bali ceremony',
    caption: 'Traditional attire for a temple day in Bali, together with the crew.',
  },
  {
    src: '/images/moment-photobooth.jpg',
    position: 'center 45%',
    title: 'Photobooth memories',
    caption: 'Old photobooth strips with friends. Not everything needs a deadline.',
  },
  {
    src: '/images/moment-birthday.jpg',
    position: 'center 35%',
    title: 'Celebrating together',
    caption: 'A birthday celebration with a big group of friends, cake included.',
  },
];
