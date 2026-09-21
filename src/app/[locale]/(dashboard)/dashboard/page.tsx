"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { useLocale } from "next-intl";

export default function Dashboard() {
  const locale = useLocale();
  async function onSignOutButtonClick() {
    const { error } = await authClient.signOut();

    if (error) {
      return;
    }

    redirect({ href: "/login", locale });
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <p>Content</p>
      <Button variant="outline" size="sm" onClick={onSignOutButtonClick}>
        Sign out
      </Button>
    </div>
  );
}
