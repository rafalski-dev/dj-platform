import { StarIcon } from "@/components/icons/starIcon";
import { TestimonialDataType } from "@/types/testimonials";
import { Dot } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

export function TestimonialsCard({
  id,
  femaleFullName,
  maleFullName,
  venue,
  date,
  rate,
}: TestimonialDataType) {
  const t = useTranslations("LandingPage.Testimonials");
  const format = useFormatter();
  const dateTime = new Date(date);

  const formattedDate = format.dateTime(dateTime, { year: "numeric", month: "long" });

  return (
    <article className="border-border/20 bg-card flex h-full flex-col justify-between rounded-4xl border px-6 py-8">
      <header>
        <div className="flex flex-col gap-4 pb-5">
          <div className="flex gap-0.5" role="img" aria-label={`${rate} out of 5`}>
            {Array(rate)
              .fill(null)
              .map((_, index) => {
                return <StarIcon key={index} size={15} color="#ebd3a0" aria-hidden="true" />;
              })}
            {Array(5 - rate)
              .fill(null)
              .map((_, index) => {
                return (
                  <StarIcon
                    key={index}
                    size={15}
                    color="#ebd3a0"
                    variant="empty"
                    aria-hidden="true"
                  />
                );
              })}
          </div>
          <p className="text-card-foreground font-serif text-xl italic">
            {t(`testimonials.${id}`)}
          </p>
        </div>
      </header>
      <footer className="border-border/10 flex flex-row items-center gap-5 border-t pt-5">
        <div className="border-border/20 to-background from-muted text-accent-foreground flex h-11 w-11 items-center justify-center gap-px rounded-full border bg-linear-to-br font-serif">
          <span>{femaleFullName.slice(0, 1)}</span>
          <span>{maleFullName.slice(0, 1)}</span>
        </div>
        <div>
          <span>{`${femaleFullName.split(" ")[0]} & ${maleFullName.split(" ")[0]}`}</span>
          <div className="text-popover-foreground flex flex-row items-center gap-px text-[12.5px] font-light">
            <span>{venue}</span>
            <Dot size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </footer>
    </article>
  );
}
