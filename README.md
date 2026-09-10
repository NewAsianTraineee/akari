# AKARI — Omakase · Contemporary Japanese

A dark, premium single-page restaurant site. Matte black and ivory, champagne-gold accents, Cormorant Garamond display type, a slow camera-drawn pace.

Built with **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4**.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3001
```

Production build & lint:

```bash
npm run build
npm run lint
```

---

## Project structure

```
public/images/
  hero/          hero photo
  menu/          signature dish photos
  chef/          chef portrait
  restaurant/    interior scenes (counter, room, detail)
  gallery/       gallery grid photos
src/
  app/
    layout.tsx   fonts, metadata, JSON-LD, navbar/footer/cursor
    page.tsx     section order
    globals.css  design tokens, buttons, cursor, keyframes
  data/
    restaurant.ts  brand info, hours, nav, section copy
    menu.ts        full menu categories
    dishes.ts      signature dishes
    gallery.ts     gallery + interior images
  components/
    ui/            Reveal, Arrow/MagneticButton, Cursor, Lightbox
    layout/        Navbar, Footer
    sections/      Hero → Intro → SignatureDishes → Omakase → MenuSection
                   → Chef → Interior → Gallery → PrivateDining → Reservation → Location
  lib/motion.ts    useInView, useParallax
```

---

## Customising the site

All content lives in `src/data/`. To edit the menu, brand copy, hours or
contact wishlist, change `src/data/*.ts` — no component edits needed.

To replace photography:

1. Put new images in `public/images/...` (jpg/webp).
2. Update the `src` paths in `src/data/dishes.ts`, `src/data/gallery.ts`,
   and the section components (`Hero`, `Omakase`, `Chef`).

Industry-standard metadata (Open Graph, Twitter card, schema.org
`Restaurant` JSON-LD) is emitted in `src/app/layout.tsx`.

---

## Design system

- **Palette** — noir `#0a0908`, charcoal `#141109`, ivory `#f4efe3`,
  gold `#c2a369`, gold-soft `#a98c54`, ash `#cfc7b7`
- **Type** — Cormorant Garamond (display) / Inter (body), via `next/font`
- **Motion** — `--ease-out-expo`; `hero-slow-zoom`, `hero-reveal`,
  `scroll-line`, shimmer; respects `prefers-reduced-motion`
- **Interactions** — custom gold cursor, scroll-reveal, magnetic buttons,
  masonry gallery with lightbox, tabbed menu, demo reservation form

---

## Real content still to add

The following are clearly-marked placeholders and must be replaced before
going live:

- Address, city, phone, email, Instagram, opening hours —
  `src/data/restaurant.ts`
- Menu prices (`From 220`, `1,450`, etc.) —
  `src/data/menu.ts` / `src/data/dishes.ts`
- Map embed in `src/components/sections/Location.tsx` (currently an
  illustrated placeholder)
- Photo credits/attribution (demo photos are Unsplash, free-license;
  verify before launch)
- `restaurant.url` in `src/data/restaurant.ts` (currently a demo URL)
- Production SEO fields (openingHours array in `src/app/layout.tsx`)

---

## Deploying

Not deployed yet — this is a local dev build.

When ready:

1. Create a GitHub repo for this folder.
2. Import the repo on Vercel (auto-deploys on push to `main`).
3. Add the real domain + production `restaurant.url`.
4. Optional: link `Reserve` and the reservation form to a booking service.