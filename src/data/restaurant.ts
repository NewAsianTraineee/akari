export const restaurant = {
  name: "AKARI",
  nameJapanese: "灯",
  tagline: "Omakase · Contemporary Japanese",
  description:
    "AKARI is a contemporary omakase counter in Stockholm — an intimate evening built around seasonality, precision and quiet hospitality.",
  url: "https://akari.demo",
  // ---- Contact details (placeholders — replace with real info) ----
  address: "Address Placeholder, Stockholm",
  city: "Stockholm, Sweden",
  phone: "+46 70 000 00 00",
  email: "reservations@akari.demo",
  mapQuery: "Stockholm, Sweden",
  instagram: "https://www.instagram.com/",
  openingHours: {
    monday: { label: "Monday", closed: true },
    tuesday: { label: "Tuesday", hours: "17:00 — 23:00" },
    wednesday: { label: "Wednesday", hours: "17:00 — 23:00" },
    thursday: { label: "Thursday", hours: "17:00 — 23:00" },
    friday: { label: "Friday", hours: "17:00 — 00:00" },
    saturday: { label: "Saturday", hours: "17:00 — 00:00" },
    sunday: { label: "Sunday", closed: true },
  },
  nav: [
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Atelier", href: "#atelier" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ] as const,
};

type OpeningDay = {
  label: string;
  closed?: boolean;
  hours?: string;
};

export const hoursList: OpeningDay[] = Object.values(restaurant.openingHours);

export const hero = {
  eyebrow: "Omakase · Contemporary Japanese",
  headlineA: "The art of",
  headlineB: "the counter.",
  sub:
    "A twelve-seat omakase counter serving an evening shaped by the season — nigiri, sake and quiet precision.",
  ctaPrimary: "Reserve a table",
  ctaPrimaryHref: "#reserve",
  ctaSecondary: "Explore the menu",
  ctaSecondaryHref: "#menu",
};

export const intro = {
  label: "The philosophy",
  headingTop: "Precision, seasonality,",
  headingEm: "the art of sushi.",
  body: [
    "AKARI began with a simple conviction: that a single piece of nigiri can carry as much intention as a long tasting menu. We work with a small number of suppliers who share our patience — waiting for the fish to be at its best, rather than the calendar.",
    "Every evening is composed by the chef from the day's arrival. There is no fixed menu in the traditional sense — only the discipline of rice, fish, temperature and time.",
  ],
};

export const omakase = {
  label: "The omakase experience",
  heading: "An evening shaped by the chef.",
  body:
    "Omakase means trust — you place your evening in the chef's hands. Course by course, nigiri set down at the counter, timed to the pace of your conversation. Roughly twelve to fourteen pieces, guided by what arrived that morning.",
  price: "12–14 courses · seasonal",
  cta: "Discover the experience",
  ctaHref: "#reserve",
  points: [
    { title: "Twelve seats", body: "A single evening service, an intimate counter seating twelve." },
    { title: "Seasonal arrival", body: "The menu follows the morning market arrival — nothing is fixed." },
    { title: "Served at pace", body: "Nigiri timed to the room — warm rice, correct temperature, no rush." },
  ],
};

export const chef = {
  label: "The atelier",
  headingTop: "Discipline, by hand,",
  headingEm: "night after night.",
  body:
    "The rice is seasoned with a house-blended vinegar and rested precisely. The fish is broken down each afternoon. The shoyu is aged in-house. The repetition is not routine — it is the practice that makes precision possible.",
  quote:
    "Good sushi is not loud. It is the quiet confidence of doing one thing properly.",
};

export const privateDining = {
  label: "Private dining",
  heading: "Close the door. It's yours.",
  body:
    "For celebrations, quiet company dinners or a room for an occasion worth marking — the counter can be reserved privately, or a smaller room made available for up to six guests.",
  cta: "Inquire about private dining",
  ctaHref: "mailto:reservations@akari.demo?subject=Private%20dining",
  points: [
    "Semi-private counter for up to six",
    "Dedicated chef for the evening",
    "Pairing designed for the room",
    "Catered menus for special occasions",
  ],
};