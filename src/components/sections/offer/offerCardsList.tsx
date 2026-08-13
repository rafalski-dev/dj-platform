import { OfferCardsDataType } from "@/types/offer";
import { OfferCard } from "./offerCard";

export async function OfferCardsList({ cardsList }: { cardsList: OfferCardsDataType[] }) {
  return (
    <ul className="flex flex-col gap-12">
      {cardsList.map(({ cardNameKey, mostPopular, featuresList }) => {
        return (
          <OfferCard
            key={cardNameKey}
            cardNameKey={cardNameKey}
            mostPopular={mostPopular}
            featuresList={featuresList}
          />
        );
      })}
    </ul>
  );
}
