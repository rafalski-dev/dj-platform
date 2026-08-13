import { About } from "@/components/sections/about/about";
import { Hero } from "@/components/sections/hero";
import { Offer } from "@/components/sections/offer/offer";
import { Process } from "@/components/sections/process/process";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Offer />
      <Process />
    </main>
  );
}
