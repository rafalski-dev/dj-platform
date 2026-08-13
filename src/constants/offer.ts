import { OfferCardsDataType } from "@/types/offer";

export const initialNumber = 6;

export const iconSize: number = 13;

export const offerCardsData: OfferCardsDataType[] = [
  {
    cardNameKey: "classic",
    mostPopular: false,
    featuresList: [
      { featureNameKey: "sound", active: true },
      { featureNameKey: "lighting", active: true },
      { featureNameKey: "music", active: true },
      { featureNameKey: "hosting", active: true },
      { featureNameKey: "consultation", active: true },
      { featureNameKey: "welcoming", active: false },
      { featureNameKey: "entertainment", active: false },
      { featureNameKey: "effects", active: false },
      { featureNameKey: "wishes", active: false },
      { featureNameKey: "personalization", active: false },
      { featureNameKey: "live", active: false },
      { featureNameKey: "visuals", active: false },
      { featureNameKey: "lowFog", active: false },
      { featureNameKey: "language", active: false },
      { featureNameKey: "djs", active: false },
    ],
  },
  {
    cardNameKey: "premium",
    mostPopular: true,
    featuresList: [
      { featureNameKey: "sound", active: true },
      { featureNameKey: "lighting", active: true },
      { featureNameKey: "music", active: true },
      { featureNameKey: "hosting", active: true },
      { featureNameKey: "consultation", active: true },
      { featureNameKey: "welcoming", active: true },
      { featureNameKey: "entertainment", active: true },
      { featureNameKey: "effects", active: true },
      { featureNameKey: "wishes", active: true },
      { featureNameKey: "personalization", active: true },
      { featureNameKey: "live", active: false },
      { featureNameKey: "visuals", active: false },
      { featureNameKey: "lowFog", active: false },
      { featureNameKey: "language", active: false },
      { featureNameKey: "djs", active: false },
    ],
  },
  {
    cardNameKey: "signature",
    mostPopular: false,
    featuresList: [
      { featureNameKey: "sound", active: true },
      { featureNameKey: "lighting", active: true },
      { featureNameKey: "music", active: true },
      { featureNameKey: "hosting", active: true },
      { featureNameKey: "consultation", active: true },
      { featureNameKey: "welcoming", active: true },
      { featureNameKey: "entertainment", active: true },
      { featureNameKey: "effects", active: true },
      { featureNameKey: "wishes", active: true },
      { featureNameKey: "personalization", active: true },
      { featureNameKey: "live", active: true },
      { featureNameKey: "visuals", active: true },
      { featureNameKey: "lowFog", active: true },
      { featureNameKey: "language", active: true },
      { featureNameKey: "djs", active: true },
    ],
  },
];

export const offerAddonsData = [
  "photoBooth",
  "stageSparks",
  "liveVocalist",
  "saxophonist",
  "loveSign",
  "lowFog",
  "confetti",
  "extraDj",
  "customNeon",
];
