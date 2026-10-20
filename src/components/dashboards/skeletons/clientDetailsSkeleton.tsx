import { GeneralCardHeader } from "@/components/dashboards/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton, SubSkeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

// Rows per section for an individual client: basic information, contact details, address
const SECTION_ROWS = [3, 2, 5];

export function ClientDetailsSkeleton() {
  const t = useTranslations("Admin.Clients.Details.info");

  return (
    <Card size="md" className="gap-3 md:order-last">
      <GeneralCardHeader title={t("title")} />
      <CardContent>
        {SECTION_ROWS.map((rows, index) => {
          return (
            <div key={index}>
              <Skeleton className="mb-2 h-4.5 w-32" />
              {Array.from({ length: rows }).map((_, index) => {
                return (
                  <div key={index} className="flex justify-between gap-3 border-t py-3">
                    <SubSkeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
