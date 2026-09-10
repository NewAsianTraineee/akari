import Link from "next/link";
import { restaurant } from "@/data/restaurant";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="u-section-label">404</p>
      <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-tight text-ivory">
        This page
        <em className="italic text-gold-soft"> is not here.</em>
      </h1>
      <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ash/80">
        The page you were looking for has moved, or never existed. The menu,
        however, is exactly where you left it.
      </p>
      <Link href="/#menu" className="btn btn-gold mt-10">
        Take me to the menu
        <Arrow />
      </Link>
      <p className="mt-14 text-[11px] uppercase tracking-[0.3em] text-ash-dim">
        {restaurant.name} · {restaurant.city}
      </p>
    </section>
  );
}