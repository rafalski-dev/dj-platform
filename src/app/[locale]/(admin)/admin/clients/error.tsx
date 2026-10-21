"use client";

import { EmptyState } from "@/components/dashboards/shared/emptyState";
import { CircleXIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  const t = useTranslations("Admin.Clients.empty.error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <EmptyState
        icon={<CircleXIcon />}
        title={t("title")}
        description={t("description")}
        error={{ label: t("action"), onClick: () => retry() }}
      />
    </>
  );
}
