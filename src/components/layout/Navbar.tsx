"use client";

import { useEffect, useState } from "react";
import { restaurant } from "@/data/restaurant";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled || open
            ? "border-b border-gold/10 bg-noir/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`u-container flex h-20 items-center justify-between transition-all duration-700 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <a
            href="#top"
            onClick={close}
            aria-label={`${restaurant.name} — home`}
            className="relative z-[160] flex items-baseline gap-2 font-display text-[1.6rem] font-medium tracking-[0.16em] text-ivory"
          >
            {restaurant.name}
            <span className="text-sm tracking-[0.2em] text-gold" aria-hidden="true">
              {restaurant.nameJapanese}
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {restaurant.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="u-anim-line text-[11px] font-medium uppercase tracking-[0.24em] text-ivory/75 transition-colors duration-300 hover:text-ivory"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              onClick={close}
              className="btn btn-gold !px-6 !py-2.5 hidden text-[11px] sm:inline-flex"
            >
              Reserve
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[160] flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-px w-6 bg-ivory transition-transform duration-500 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-gold transition-transform duration-500 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[140] flex flex-col justify-center bg-noir px-8 transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-7" aria-label="Mobile">
          {restaurant.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-baseline gap-4 font-display text-4xl font-light tracking-tight text-ivory transition-colors hover:text-gold"
              style={{
                transitionDelay: `${open ? 60 + i * 60 : 0}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span className="text-xs text-gold">0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={close}
            className="btn btn-gold mt-4 w-fit"
          >
            Reserve a table
          </a>
        </nav>
      </div>
    </>
  );
}