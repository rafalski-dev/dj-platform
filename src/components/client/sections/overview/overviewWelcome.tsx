import { getSession } from "@/lib/auth-helpers";
import { getTranslations } from "next-intl/server";

// Top of the overview in every state – greets the client by the account's name
export async function OverviewWelcome() {
  const t = await getTranslations("Dashboard.Overview");
  const session = await getSession();

  return (
    <header className="flex flex-col gap-1">
      <p className="text-muted-foreground text-sm font-light">{t("welcome")}</p>
      <h1 className="font-serif text-[36px]/tight wrap-break-word md:text-[42px]/tight">
        {session?.user.name}
      </h1>
    </header>
  );
}
