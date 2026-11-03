import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { EventDetails } from "@/data/events";
import { Music2Icon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const headingStyles = "text-accent-foreground mb-2 font-sans text-[13px] font-semibold uppercase";

export async function EventPackage({ fetchedData }: { fetchedData: EventDetails }) {
  const t = await getTranslations("Admin.Events");
  const { package: eventPackage, addons, message } = fetchedData;

  return (
    <Card size="md">
      <GeneralCardHeader title={t("Details.package.title")} />
      <CardContent className="flex flex-col gap-5">
        <div className="bg-foreground/5 flex flex-row items-start gap-4 rounded-xl border p-4">
          <div className="border-border-strong text-accent-foreground flex size-12 shrink-0 items-center justify-center rounded-lg border">
            <Music2Icon size={20} />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-popover-foreground text-[11.5px] tracking-wider uppercase">
              {t("card.package")}
            </p>
            <p className="font-serif text-2xl leading-none">
              {t(`Form.package.packages.${eventPackage}.title`)}
            </p>
            <p className="text-muted-foreground mt-1 text-[13.5px]">
              {t(`Form.package.packages.${eventPackage}.description`)}
            </p>
          </div>
        </div>
        <div>
          <h3 className={headingStyles}>{t("card.addons")}</h3>
          {addons.length === 0 ? (
            <p className="text-muted-foreground">{t("card.noAddons")}</p>
          ) : (
            <ul className="flex flex-row flex-wrap gap-2">
              {addons.map((addon) => (
                <li key={addon}>
                  <Badge variant="outline" className="text-muted-foreground border-border-strong">
                    {t(`addons.${addon}`)}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
        {message && (
          <div>
            <h3 className={headingStyles}>{t("Form.package.groups.additional")}</h3>
            <p className="text-foreground/85 wrap-anywhere whitespace-pre-line">{message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
