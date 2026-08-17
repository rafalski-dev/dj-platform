"use client";

import { Button } from "@/components/ui/button";
import { TestimonialDataType } from "@/types/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialsCard } from "./testimonialsCard";
import { useEffect, useState } from "react";

export function TestimonialsCarousel({
  testimonialsData,
}: {
  testimonialsData: TestimonialDataType[];
}) {
  const [position, setPosition] = useState(0);
  const [scaling, setScaling] = useState(1);

  useEffect(() => {
    function checkScalling() {
      const viewportWidth = window.innerWidth;

      let fraction = 1;
      if (viewportWidth <= 768) {
        fraction = 1;
      } else if (viewportWidth <= 1024) {
        fraction = 1 / 2;
      } else {
        fraction = 1 / 3;
      }
      setScaling(fraction);

      const visible = Math.round(1 / fraction);
      setPosition((prev) => Math.min(prev, testimonialsData.length - visible));
    }
    checkScalling();
    window.addEventListener("resize", checkScalling);

    return () => window.removeEventListener("resize", checkScalling);
  }, [testimonialsData]);

  function moveNext() {
    setPosition((prev) => {
      return prev + 1;
    });
  }

  function movePrev() {
    setPosition((prev) => {
      return prev - 1;
    });
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full overflow-x-hidden">
        <div
          className={`flex flex-row transition-transform`}
          style={{ transform: `translateX(calc(-${position * 100 * scaling}%))` }}
        >
          {testimonialsData.map(({ id, ...props }) => {
            return <TestimonialsCard key={id} id={id} {...props} />;
          })}
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          disabled={!position}
          variant="outline"
          size="icon"
          className="p-5"
          aria-label="Prev"
          onClick={movePrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={position >= testimonialsData.length - Math.round(1 / scaling)}
          variant="outline"
          size="icon"
          className="p-5"
          aria-label="Next"
          onClick={moveNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
