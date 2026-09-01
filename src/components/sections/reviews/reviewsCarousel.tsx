import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ReviewsCard } from "./reviewsCard";
import { Button } from "@/components/ui/button";
import { ReviewDataType } from "@/types/reviews";

export function ReviewsCarousel({ reviewsData }: { reviewsData: ReviewDataType[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {reviewsData.map(({ id, ...rest }) => {
          return (
            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
              <ReviewsCard id={id} {...rest} />
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
