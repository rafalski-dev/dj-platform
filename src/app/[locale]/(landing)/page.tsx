import { About } from "@/components/sections/about/about";
import { Contact } from "@/components/sections/contact/contact";
import { FAQ } from "@/components/sections/faq/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Newsletter } from "@/components/sections/newsletter/newsletter";
import { Offer } from "@/components/sections/offer/offer";
import { Process } from "@/components/sections/process/process";
import { Reviews } from "@/components/sections/reviews/reviews";
import { Background } from "@/components/decorations/background";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Offer />
      <Process />
      <Gallery />
      <Reviews />
      <FAQ />
      <Newsletter />
      <Contact />
    </main>
  );
}
