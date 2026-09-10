import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { MenuSection } from "@/components/sections/MenuSection";
import { Omakase } from "@/components/sections/Omakase";
import { Chef } from "@/components/sections/Chef";
import { Interior } from "@/components/sections/Interior";
import { Gallery } from "@/components/sections/Gallery";
import { PrivateDining } from "@/components/sections/PrivateDining";
import { Reservation } from "@/components/sections/Reservation";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <SignatureDishes />
      <Omakase />
      <MenuSection />
      <Chef />
      <Interior />
      <Gallery />
      <PrivateDining />
      <Reservation />
      <Location />
    </>
  );
}