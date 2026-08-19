import { Input } from "@/components/shared/form/input";
import { Button } from "../../ui/button";
import { getTranslations } from "next-intl/server";

export async function NewsletterForm() {
  const t = await getTranslations("LandingPage.Newsletter");
  return (
    <form className="flex w-full max-w-140 flex-col items-center justify-center gap-5 md:flex-row">
      <Input
        name="newsletterAddress"
        className="rounded-full px-6"
        placeholder={t("placeholder")}
      />
      <Button className="h-12 w-full rounded-full md:w-30" type="submit">
        {t("button")}
      </Button>
    </form>
  );
}
