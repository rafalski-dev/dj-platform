import { Alert, AlertTitle } from "@/components/ui/shadcn/alert";
import { type MissingField } from "@/lib/missingFields";
import { PencilLine } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Same look as the alert on the overview – tells the client which of the fields below are still empty
export async function MissingEventFieldsAlert({ missing }: { missing: MissingField[] }) {
  const t = await getTranslations("Dashboard.Overview.missingFields");

  return (
    <Alert className="border-accent/30 bg-accent/5 text-accent-foreground w-full rounded-xl px-4 py-3 md:max-w-2/3">
      <PencilLine />
      {/* e.g. "Missing: event hours, venue address" */}
      <AlertTitle>
        {t("event.description", {
          fields: missing.map((field) => t(`fields.${field}`)).join(", "),
        })}
      </AlertTitle>
    </Alert>
  );
}
