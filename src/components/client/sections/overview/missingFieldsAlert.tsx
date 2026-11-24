import { Alert, AlertTitle } from "@/components/ui/shadcn/alert";
import { PencilLine } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Same look as the playlist lock alert in the admin – it only informs, the tasks go below it
export async function MissingFieldsAlert({ count }: { count: number }) {
  const t = await getTranslations("Dashboard.Overview.missingFields");

  return (
    <Alert className="border-accent/30 bg-accent/5 text-accent-foreground rounded-xl px-4 py-3">
      <PencilLine />
      <AlertTitle>{t("title", { count })}</AlertTitle>
    </Alert>
  );
}
