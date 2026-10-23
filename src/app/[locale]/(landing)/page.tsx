import { About } from "@/components/landing/sections/about/about";
import { Contact } from "@/components/landing/sections/contact/contact";
import { FAQ } from "@/components/landing/sections/faq/faq";
import { Gallery } from "@/components/landing/sections/gallery";
import { Hero } from "@/components/landing/sections/hero";
import { Newsletter } from "@/components/landing/sections/newsletter/newsletter";
import { Offer } from "@/components/landing/sections/offer/offer";
import { Process } from "@/components/landing/sections/process/process";
import { Reviews } from "@/components/landing/sections/reviews/reviews";

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
