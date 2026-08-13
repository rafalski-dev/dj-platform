import { About } from "@/components/sections/about/about";
import { Hero } from "@/components/sections/hero";
import { Offer } from "@/components/sections/offer/offer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Offer />
    </main>
  );
}
