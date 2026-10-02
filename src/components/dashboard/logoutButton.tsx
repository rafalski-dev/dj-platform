"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { toast } from "../ui/toast";
import { getErrorTranslation } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const t = useTranslations("");

  const { replace } = useRouter();

  async function logout() {
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
    }
  }

  return (
    <Button variant="outline" onClick={logout}>
      <LogOutIcon />
      {t("Admin.Header.nav.logoutBtn")}
    </Button>
  );
}
