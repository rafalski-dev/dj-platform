"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { getErrorTranslation } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LogOutIcon } from "lucide-react";
import { toast } from "@/components/ui/shadcn/toast";
import { Button } from "@/components/ui/shadcn/button";
import { useState } from "react";

export function LogoutButton() {
  const t = useTranslations("");
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  async function logout() {
    setIsLoading(true);
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.add({
          type: "error",
          title: t("Auth.Logout.expectedError.title"),
          description: t(`Errors.${getErrorTranslation(error)}`),
        });
        return;
      }

      toast.add({ type: "success", title: t("Auth.Logout.success.title") });
      replace("/login");
    } catch (err) {
      console.error(err);
      toast.add({
        type: "error",
        title: t("Auth.Logout.unexpectedError.title"),
        description: t("Errors.default"),
      });
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={logout} disabled={isLoading}>
      <LogOutIcon />
      {t("Admin.Header.nav.logoutBtn")}
    </Button>
  );
}
