import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { useTranslations } from "next-intl";

export function InputLink({ pathname }: { pathname: Pathname }) {
  const t = useTranslations("Auth.Login");

  return (
    <Link href={{ pathname: pathname }} className="text-accent-foreground text-xs tracking-wide">
      {t("forgot-password")}
    </Link>
  );
}
