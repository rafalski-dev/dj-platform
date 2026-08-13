export type OfferCardsDataType = {
  cardNameKey: string;
  mostPopular: boolean;
  featuresList: FeatureItem[];
};

export type OfferCardFeatureListProps = {
  cardNameKey: string;
  featuresList: FeatureItem[];
};

type FeatureItem = {
  featureNameKey: string;
  active: boolean;
};
