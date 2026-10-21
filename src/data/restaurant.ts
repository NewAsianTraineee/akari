export const restaurant = {
  name: "AUREUM",
  tagline: "Lyxig bilverkstad & servicecenter",
  description:
    "Aureum Bilverkstad är en exklusiv, fullservande bilverkstad i Stockholm. Vi specialiserar oss på högkvalitativ service, reparationer, diagnos, lack & plåt samt underhåll för premium- och sportbilar med fokus på precision, transparens och tidlös lyx.",
  url: "https://aureum-bilverkstad.se",
  address: "Kungsgatan 45, Stockholm",
  city: "Stockholm, Sverige",
  phone: "+46 70 555 00 00",
  email: "bokning@aureum-bilverkstad.se",
  mapQuery: "Kungsgatan 45 Stockholm",
  instagram: "https://www.instagram.com/",
  openingHours: {
    monday: { label: "Måndag", hours: "07:00 — 17:00" },
    tuesday: { label: "Tisdag", hours: "07:00 — 17:00" },
    wednesday: { label: "Onsdag", hours: "07:00 — 17:00" },
    thursday: { label: "Torsdag", hours: "07:00 — 17:00" },
    friday: { label: "Fredag", hours: "07:00 — 16:00" },
    saturday: { label: "Lördag", closed: true },
    sunday: { label: "Söndag", closed: true },
  },
  nav: [
    { label: "Tjänster", href: "#tjanster" },
    { label: "Process", href: "#process" },
    { label: "Verkstaden", href: "#verkstad" },
    { label: "Galleri", href: "#galleri" },
    { label: "Kontakt", href: "#kontakt" },
  ] as const,
};

type OpeningDay = {
  label: string;
  closed?: boolean;
  hours?: string;
};

export const hoursList: OpeningDay[] = Object.values(restaurant.openingHours);

export const hero = {
  eyebrow: "Exklusiv bilverkstad i Stockholm",
  headlineA: "Precision.",
  headlineB: "Prestanda. Förtroende.",
  sub:
    "En lyxig, manlig och trovärdig verkstad för premiumbilar. Vi erbjuder bokningsbara servicepass, transparenta offerter och en verkstad med tidlös elegans.",
  ctaPrimary: "Boka service",
  ctaPrimaryHref: "#boka",
  ctaSecondary: "Våra tjänster",
  ctaSecondaryHref: "#tjanster",
};

export const intro = {
  label: "Vår filosofi",
  headingTop: "Ingen kompromiss när det gäller",
  headingEm: "detaljerna.",
  body: [
    "Aureum föddes ur tron att en bil förtjänar samma omsorg som den var konstruerad med. Vi kombinerar modern diagnostik med gammaldags hantverk och sträng kvalitetssäkring i varje moment.",
    "Vårt mål är att ge dig en trygg, transparent och lyxig upplevelse — från bokning till leverans av din bil.",
  ],
};

export const services = {
  label: "Tjänster",
  heading: "Service skräddarsytt efter din bil.",
  body:
    "Från regelbundet underhåll och felsökning till kompletta reparationer, lack och plåt. Vi planerar arbetet efter dina behov och håller dig uppdaterad genom hela processen.",
  price: "Transparent offert — inga dolda kostnader",
  cta: "Boka din tid",
  ctaHref: "#boka",
  points: [
    { title: "Premiumdiagnos", body: "Avancerad diagnosutrustning för exakt felbeskrivning." },
    { title: "Originalkvalitet", body: "Noggrant utvalda reservdelar av högsta kvalitet." },
    { title: "Tidsbokning", body: "Boka service online och se tillgängliga tider i realtid." },
  ],
};

export const process = {
  label: "Så arbetar vi",
  heading: "Fyra steg. Full transparens.",
  body:
    "Varje bokning följer samma tydliga flöde. Du vet alltid vad som händer, varför det händer och vad det kostar — innan vi sätter igång.",
  cta: "Boka ett servicepass",
  ctaHref: "#boka",
  steps: [
    {
      title: "Diagnos",
      body: "Vi läser av bilen, provkör och dokumenterar skicket innan något arbete påbörjas.",
    },
    {
      title: "Offert",
      body: "Du får en tydlig offert med pris, reservdelar och tidslinje. Först när du godkänner drar vi igång.",
    },
    {
      title: "Arbete",
      body: "Erfarna mekaniker arbetar enligt rutin, med namngivna kontrollpunkter genomgående.",
    },
    {
      title: "Slutkontroll",
      body: "Provkörning, kvalitetsrapport och fordonshistorik — bilen lämnas först när allt är godkänt.",
    },
  ],
};

export const workshop = {
  label: "Verkstaden",
  headingTop: "Hantverk, precision och",
  headingEm: "disciplin.",
  body:
    "Vår verkstad är byggd för lugn, ordning och renlighet. Varje arbete följer tydliga rutiner, kvalitetskontroller och dokumenteras noggrant — för ditt lugn och bilens bästa.",
  quote:
    "Sann kvalitet syns inte bara i resultatet, utan i hur vi arbetar varje dag.",
};

export const vip = {
  label: "Serviceavtal & VIP",
  heading: "VIP-service anpassad för dig.",
  body:
    "Behöver du löpande service för din bilflotta eller exklusiv upphämtning och leverans? Vi skräddarsyr avtal och VIP-paket efter dina önskemål.",
  cta: "Begär offert",
  ctaHref: "mailto:bokning@aureum-bilverkstad.se?subject=Begär%20offert",
  points: [
    "Serviceavtal för företag & privat",
    "Upphämtning & leverans inom Stockholm",
    "Lånebil av premiumklass vid behov",
    "Prioriterad bokning för återkommande kunder",
  ],
};
