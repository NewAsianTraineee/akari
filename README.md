# AUREUM — Lyxig bilverkstad

En mörk, premium startsida för en bilverkstad i Stockholm — samma lugna, lyxiga
känsla som Akari-mallen (noir, ivory, guld, Cinzel-displaytypsnitt, långsamma
reveal-animationer) kombinerat med ett riktigt bokningssystem i backend.

Byggd med **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4** och ett
REST-baserat boknings-API med SQLite, cookie-session och adminpanel.

---

## Kom igång

```bash
npm install
npm run dev          # http://localhost:3000
```

Produktionsbyggnad & lint:

```bash
npm run build
npm run lint
```

Miljövariabler är valfria — admin-lösenordet är `admin` om `ADMIN_PASSWORD`
inte är satt (se `src/server/db.ts`).

---

## Projektstruktur

```
public/images/
  hero/          hero-bilder
  gallery/       galleribilder
  interior/      verkstadsmiljö
  chef/          hantverksbild
  cuts/          sportbil under service
src/
  app/
    layout.tsx     typsnitt, metadata, JSON-LD, navbar/footer/cursor
    page.tsx       sektionsordning
    globals.css    design tokens, knappar, cursor, keyframes
    admin/         ägarkonsol (inloggning + bokningslista)
    api/
      availability/  GET  /api/availability
      bookings/      POST/GET /api/bookings, GET/PATCH/DELETE /api/bookings/:id
      admin/         login / logout / me
  data/
    restaurant.ts   varumärke, öppettider, all sektionscopy
    gallery.ts      galleri- och interiörbilder
  components/
    ui/             Reveal, Arrow/MagneticButton, Cursor, Lightbox
    layout/         Navbar, Footer
    booking/        BookingForm (kopplad till API:et)
    sections/       Hero → Intro → Services → Process → Workshop
                    → Interior → Gallery → Vip → Reservation → Location
  server/           backend-lagret (config, db, auth, validation, bookings)
  lib/              nav, motion, format
```

---

## Innehåll

All text och bokningsbara tjänster ligger i `src/data/` och `src/server/config.ts`:

- **Copy, öppettider, nav** — `src/data/restaurant.ts`
- **Galleribilder** — `src/data/gallery.ts`
- **Zoner, tider, kapacitet, statusar** — `src/server/config.ts`
  (Service & underhåll, Diagnos, Lack & reparation, Större reparation)

Byt fotografier genom att lägga nya bilder i `public/images/...` och uppdatera
`src`-sökvägarna i `src/data/gallery.ts` samt i sektionskomponenterna
(`Hero`, `Services`, `Process`, `Workshop`, `Interior`, `Vip`).

---

## Backend-API (Aureum-stil)

Samma backend som i `General/Backend_Booking` — portabelt, inga npm-beroenden
(`node:sqlite` + `node:crypto` bygger in i Node 22.13+/24).

| Route | Metod | Beskrivning |
| --- | --- | --- |
| `/api/availability?date=ÅÅÅÅ-MM-DD` | GET | Lediga tider per zon |
| `/api/bookings` | POST | Skapa bokning (publik, validering + kapacitet) |
| `/api/bookings` | GET | Lista/filter (admin) |
| `/api/bookings/:id` | GET/PATCH/DELETE | En bokning (admin) |
| `/api/admin/login` · `/logout` · `/me` | POST/POST/GET | Cookie-session |

Responskoder: `201` skapad, `409` zon/tid full, `422` validering
(`fields` med felmeddelande per fält), `401` obehörig.

Admin: `/admin` — inloggning `admin` / `admin` (ändra via `ADMIN_PASSWORD`).
Databasen skapas automatiskt i `data/aureum.db` vid första anropet.

---

## Designsystem

- **Palett** — noir `#070606`, charcoal `#12110e`, ivory `#f6f3ee`,
  guld `#b9a06c`, guld-soft `#a08d55`, ask `#d6d0c4`
- **Typsnitt** — Cinzel (display) / Jost (body) via `next/font`
- **Rörelse** — `--ease-out-expo`, `hero-slow-zoom`, `hero-reveal`,
  `scroll-line`, respekterar `prefers-reduced-motion`
- **Interaktioner** — egen guld-cursor, scroll-reveal, magnetiska knappar,
  galleri med lightbox, formulär med realtidsuppdaterad tillgänglighet

---

## Att göra före lansering

- Adress, telefon, e-post, Instagram, priser — `src/data/restaurant.ts`
- Riktig karta (även om kart-embed finns) och skärmdump/Open Graph-bild
- Sätt `ADMIN_PASSWORD` (och gärna `SESSION_COOKIE_NAME`) i `.env.local`
- Kontrollera att foton har rätt licens

---

## Deploya

1. Skapa ett GitHub-repo för mappen.
2. Importera i Vercel (auto-deployp vid push till `main`).
3. Lägg till domän och sätt produktions-`restaurant.url`.
