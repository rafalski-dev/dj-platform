"use client";

import { Button } from "@/components/ui/button";
import { iconSize, initialNumber } from "@/constants/offer";
import { OfferCardFeatureListProps } from "@/types/offer";
import { CheckIcon, ChevronDown, ChevronUp, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function OfferCardFeatureList({ cardNameKey, featuresList }: OfferCardFeatureListProps) {
  const [numberOfItems, setNumberOfItems] = useState(initialNumber);
  const t = useTranslations("LandingPage.Offer");

  return (
    <div className="flex flex-col items-center gap-2">
      <ul className="flex w-full flex-col">
        {featuresList.slice(0, numberOfItems).map(({ featureNameKey, active }) => {
          if (!active) {
            return (
              <li
                key={featureNameKey}
                className="border-border/12 flex items-center gap-3 border-t py-3"
              >
                <span className="sr-only">{t("notIncluded")}</span>
                <span className="text-accent-foreground/30 bg-popover-foreground/15 rounded-full p-1">
                  <X size={iconSize} />
                </span>
                <span className="text-accent/40 text-[14px] font-extralight tracking-wide">
                  {t(`cards.${cardNameKey}.features.${featureNameKey}`)}
                </span>
              </li>
            );
          }
          return (
            <li
              key={featureNameKey}
              className="border-border/12 flex items-center gap-3 border-t py-3"
            >
              <span className="sr-only">{t("included")}</span>
              <span className="text-accent-foreground bg-popover-foreground/30 rounded-full p-1">
                <CheckIcon size={iconSize} />
              </span>
              <span className="text-foreground/90 text-[14px] font-extralight tracking-wide">
                {t(`cards.${cardNameKey}.features.${featureNameKey}`)}
              </span>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={() =>
          setNumberOfItems((prev) => {
            if (prev === initialNumber) {
              return featuresList.length;
            }
            return initialNumber;
          })
        }
        variant="ghost"
        size="xs"
        className="text-accent-foreground hover:text-accent-foreground/85 w-fit"
      >
        {numberOfItems === initialNumber ? (
          <>
            {t("btnShowMore")}
            <ChevronDown />
          </>
        ) : (
          <>
            {t("btnShowLess")}
            <ChevronUp />
          </>
        )}
      </Button>
    </div>
  );
}
