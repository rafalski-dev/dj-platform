import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { TestimonialsCard } from "./testimonialsCard";
import { Button } from "@/components/ui/button";
import { TestimonialDataType } from "@/types/testimonials";

export function TestimonialsCarousel({
  testimonialsData,
}: {
  testimonialsData: TestimonialDataType[];
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {testimonialsData.map(({ id, ...rest }) => {
          return (
            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
              <TestimonialsCard id={id} {...rest} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-10 flex justify-center gap-5">
        <CarouselPrevious className="static" render={<Button variant="icon" size="icon" />} />
        <CarouselNext className="static" render={<Button variant="icon" size="icon" />} />
      </div>
    </Carousel>
  );
}
