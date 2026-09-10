"use client";

import { useState } from "react";
import { menuCategories } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export function MenuSection() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <section id="menu" className="py-28 sm:py-36">
      <div className="u-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="u-section-label">The menu</p>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tight text-ivory">
                Shaped by
                <em className="italic text-gold-soft"> the day.</em>
              </h2>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-ash-dim">
              Prices are demo values — the full menu follows the season and
              the chef&rsquo;s selection.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-16 flex flex-wrap gap-x-9 gap-y-3 border-y border-gold/15 py-5"
            role="tablist"
            aria-label="Menu categories"
          >
            {menuCategories.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`relative text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-400 ${
                    isActive ? "text-gold" : "text-ivory/55 hover:text-ivory"
                  }`}
                >
                  {c.label}
                  <span
                    className={`absolute -bottom-[22px] left-0 h-px bg-gold transition-all duration-500 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={category.id}
          className="mt-12"
          style={{ animation: "fade-up 700ms var(--ease-out-expo)" }}
        >
          <p className="mb-8 text-[11px] uppercase tracking-[0.26em] text-ash-dim">
            {category.note}
          </p>
          <ul className="grid gap-x-14 gap-y-9 lg:grid-cols-2">
            {category.items.map((item) => (
              <li key={item.name} className="group">
                <div className="flex items-baseline justify-between gap-6">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-light text-ivory transition-colors duration-300 group-hover:text-gold">
                      {item.name}
                    </h3>
                    <span className="hidden h-px w-10 shrink-0 bg-gold/25 sm:block" />
                  </div>
                  <span className="shrink-0 font-display text-lg text-gold">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-6">
                  <p className="text-sm leading-relaxed text-ash/70">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}