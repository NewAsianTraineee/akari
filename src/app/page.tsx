import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Workshop } from "@/components/sections/Workshop";
import { Interior } from "@/components/sections/Interior";
import { Gallery } from "@/components/sections/Gallery";
import { Vip } from "@/components/sections/Vip";
import { Reservation } from "@/components/sections/Reservation";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Workshop />
      <Interior />
      <Gallery />
      <Vip />
      <Reservation />
      <Location />
    </>
  );
}
