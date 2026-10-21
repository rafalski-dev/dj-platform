import { Card, CardContent } from "@/components/ui/card";
import { GeneralCardHeader } from "@/components/dashboards/shared/generalCardHeader";
import { MinusIcon } from "lucide-react";
import { phoneNumberSplitting } from "@/lib/utils";
import { getClientDetails } from "@/data/clients";
import { useTranslations } from "next-intl";

type ClientDetailsProps = {
  fetchedData: NonNullable<Awaited<ReturnType<typeof getClientDetails>>>;
};

export function ClientDetails({ fetchedData }: ClientDetailsProps) {
  const t = useTranslations("Admin.Clients.Details.info");
  const tGender = useTranslations("Admin.Clients.Form.fields.gender.options");

  const isIndividual = fetchedData.clientType === "Individual";

  // key is a stable id: it picks the translation (fields.<key>) and the contact link type
  const clientCardDetails = [
    {
      key: "basic",
      values: [
        {
          key: isIndividual ? "fullName" : "businessName",
          value: fetchedData.name,
        },
        {
          key: isIndividual ? "gender" : null,
          value: fetchedData.gender && tGender(fetchedData.gender),
        },
        {
          key: isIndividual ? "idCardNumber" : "taxId",
          value: isIndividual ? fetchedData.idCardNumber : fetchedData.taxId,
        },
      ],
    },
    {
      key: "contact",
      values: [
        {
          key: isIndividual ? null : "contactPerson",
          value: `${fetchedData.firstName} ${fetchedData.lastName}`,
        },
        { key: "email", value: fetchedData.email },
        { key: "phone", value: fetchedData.phone },
      ],
    },
    {
      key: "address",
      values: [
        { key: "streetAndNumber", value: fetchedData.streetAndNumber },
        { key: "postcode", value: fetchedData.postcode },
        { key: "city", value: fetchedData.city },
        { key: "region", value: fetchedData.region },
        { key: "country", value: fetchedData.country },
      ],
    },
  ];

  function checkIsContact(key: string, value: string) {
    const styles = "text-accent-foreground hover:text-gold-light duration-200";

    if (key === "email") {
      return (
        <a href={`mailto:${value}`} className={styles}>
          {value}
        </a>
      );
    } else if (key === "phone") {
      return (
        <a href={`tel:${value}`} className={styles}>
          {phoneNumberSplitting(value)}
        </a>
      );
    } else {
      return value;
    }
  }

  return (
    <Card size="md" className="gap-3 md:order-last">
      <GeneralCardHeader title={t("title")} />
      <CardContent>
        {clientCardDetails.map(({ key, values }, index) => {
          return (
            <div key={index}>
              <h3 className="text-accent-foreground mb-2 font-sans text-[13px] font-semibold uppercase">
                {t(`sections.${key}`)}
              </h3>
              <dl>
                {values.map(({ key, value }, index) => {
                  if (!key) return;
                  return (
                    <div key={index} className="flex justify-between gap-3 border-t py-3">
                      <dt className="text-muted-foreground/80">{t(`fields.${key}`)}</dt>
                      <dd className="text-right wrap-anywhere">
                        {value ? (
                          checkIsContact(key, value)
                        ) : (
                          <MinusIcon className="text-popover-foreground" strokeWidth={1.6} />
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
