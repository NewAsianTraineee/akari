import Link from "next/link";
import { restaurant } from "@/data/restaurant";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="u-section-label">404</p>
      <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-tight text-ivory">
        Sidan finns
        <em className="italic text-gold-soft"> inte här.</em>
      </h1>
      <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ash/80">
        Sidan du letar efter har flyttats eller aldrig funnits. Bokningen,
        däremot, hittar du precis där du lämnade den.
      </p>
      <Link href="/#boka" className="btn btn-gold mt-10">
        Boka service
        <Arrow />
      </Link>
      <p className="mt-14 text-[11px] uppercase tracking-[0.3em] text-ash-dim">
        {restaurant.name} · {restaurant.city}
      </p>
    </section>
  );
}
