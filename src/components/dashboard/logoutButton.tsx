"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { toast } from "../ui/toast";
import { getErrorTranslation } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function LogoutButton({ children }: { children: string }) {
  const t = useTranslations("Auth");

  const { replace } = useRouter();

  async function logout() {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.add({
          type: "error",
          title: t("Logout.expectedError.title"),
          description: t(`Errors.${getErrorTranslation(error)}`),
        });
        return;
      }

      toast.add({ type: "success", title: t("Logout.success.title") });
      replace("/login");
    } catch (err) {
      console.error(err);
      toast.add({
        type: "error",
        title: t("Logout.unexpectedError.title"),
        description: t("Errors.default"),
      });
    }
  }

  return (
    <Button variant="outline" onClick={logout}>
      {children}
    </Button>
  );
}
