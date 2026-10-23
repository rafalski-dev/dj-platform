import { OfferCardsDataType } from "@/types/offer";
import { OfferCard } from "./offerCard";

export async function OfferCardsList({ cardsList }: { cardsList: OfferCardsDataType[] }) {
  return (
    <ul className="flex flex-col gap-12 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-8 xl:grid xl:grid-cols-3">
      {cardsList.map(({ cardNameKey, mostPopular, featuresList }) => {
        return (
          <li key={cardNameKey} className="lg:w-[40%] xl:w-full">
            <OfferCard
              cardNameKey={cardNameKey}
              mostPopular={mostPopular}
              featuresList={featuresList}
            />
          </li>
        );
      })}
    </ul>
  );
}
