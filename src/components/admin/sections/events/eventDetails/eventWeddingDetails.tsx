import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { EventDetails } from "@/data/events";
import { getFormatter, getTranslations } from "next-intl/server";
import { EventDetailRow } from "./eventDetailRow";

type EventWeddingDetailsProps = {
  fetchedData: NonNullable<EventDetails["wedding"]>;
};

export async function EventWeddingDetails({ fetchedData }: EventWeddingDetailsProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Events.Form");
  const tDetails = await getTranslations("Admin.Events.Details.wedding");
  const {
    bride,
    groom,
    brideWitness,
    groomWitness,
    brideMother,
    brideFather,
    groomMother,
    groomFather,
    weddingKind,
    ceremonyStartsAt,
    ceremonyPlace,
    ceremonyAddress,
  } = fetchedData;

  const hasCeremony = weddingKind !== "None";

  const sections = [
    {
      title: t("basics.wedding.groups.couple"),
      rows: [
        { label: t("basics.wedding.bride"), value: bride },
        { label: t("basics.wedding.groom"), value: groom },
      ],
    },
    {
      title: t("basics.wedding.groups.witnesses"),
      rows: [
        { label: t("basics.wedding.brideWitness"), value: brideWitness },
        { label: t("basics.wedding.groomWitness"), value: groomWitness },
      ],
    },
    {
      title: tDetails("ceremony"),
      rows: [
        {
          label: t("dateAndPlace.weddingKind.label"),
          value: t(`dateAndPlace.weddingKind.options.${weddingKind}`),
        },
        ...(hasCeremony
          ? [
              {
                label: tDetails("ceremonyStartsAt"),
                value:
                  ceremonyStartsAt &&
                  format.dateTime(ceremonyStartsAt, { dateStyle: "medium", timeStyle: "short" }),
              },
              { label: t("dateAndPlace.ceremonyPlace.label"), value: ceremonyPlace },
              { label: t("summary.ceremonyAddress"), value: ceremonyAddress },
            ]
          : []),
      ],
    },
    {
      title: tDetails("parents"),
      rows: [
        { label: t("summary.brideMother"), value: brideMother },
        { label: t("summary.brideFather"), value: brideFather },
        { label: t("summary.groomMother"), value: groomMother },
        { label: t("summary.groomFather"), value: groomFather },
      ],
    },
  ];

  return (
    <Card size="md" className="gap-3">
      <GeneralCardHeader title={tDetails("title")} />
      <CardContent className="grid grid-cols-1 gap-x-8 gap-y-3 xl:grid-cols-2">
        {sections.map(({ title, rows }, index) => {
          if (!rows.some(({ value }) => value)) return;

          return (
            <div key={index} className="min-w-0">
              <h3 className="text-accent-foreground mb-2 font-sans text-[13px] font-semibold uppercase">
                {title}
              </h3>
              <dl>
                {rows.map(({ label, value }, index) => (
                  <EventDetailRow key={index} label={label}>
                    {value}
                  </EventDetailRow>
                ))}
              </dl>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
