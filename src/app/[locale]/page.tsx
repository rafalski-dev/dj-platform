import { About } from "@/components/sections/about/about";
import { FAQ } from "@/components/sections/faq/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Newsletter } from "@/components/sections/newsletter/newsletter";
import { Offer } from "@/components/sections/offer/offer";
import { Process } from "@/components/sections/process/process";
import { Testimonials } from "@/components/sections/testimonials/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Offer />
      <Process />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </main>
  );
}
