"use client";

import { EmptyState } from "@/components/admin/shared/emptyState";
import { TriangleAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Admin.Clients.empty.notFound");

  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState
        icon={<TriangleAlertIcon />}
        title={t("title")}
        description={t("description")}
        action={{ label: t("action"), href: "/admin/clients" }}
      />
    </div>
  );
}
