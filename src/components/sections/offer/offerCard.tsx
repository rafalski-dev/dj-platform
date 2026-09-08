import { Button } from "@/components/ui/button";
import { OfferCardsDataType } from "@/types/offer";

import { getTranslations } from "next-intl/server";
import { OfferCardFeatureList } from "./offerCardFeaturesList";
import clsx from "clsx";
import Link from "next/link";

export async function OfferCard({ cardNameKey, mostPopular, featuresList }: OfferCardsDataType) {
  const t = await getTranslations("LandingPage.Offer");
  const nav = await getTranslations("LandingPage.Navigation");

  return (
    <article
      className={clsx(
        "bg-card relative flex flex-col gap-6 rounded-4xl border px-6 py-8 md:p-6",
        mostPopular ? "border-accent/55 shadow-accent/50 shadow-xl/30" : "border-border/12",
      )}
    >
      {mostPopular && (
        <span className="bg-gold-gradient text-background shadow-accent/50 absolute top-0 left-[50%] flex h-7.5 -translate-x-1/2 -translate-y-1/2 items-center rounded-md px-4 text-[12.5px] font-semibold tracking-wider uppercase shadow-lg/50">
          {t("mostPopular")}
        </span>
      )}
      <header>
        <h3 className="text-primary mb-2 text-[32px]">{t(`cards.${cardNameKey}.title`)}</h3>
        <p className="text-popover-foreground text-[14px] font-light">
          {t(`cards.${cardNameKey}.description`)}
        </p>
      </header>
      <OfferCardFeatureList cardNameKey={cardNameKey} featuresList={featuresList} />
      <footer>
        <Button
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={<Link href={nav("navPaths.contact")}>{t("primaryButton")}</Link>}
        ></Button>
      </footer>
    </article>
  );
}
