import { contactDataItemType } from "@/types/contact";
import { Mail, Phone, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

const iconList: Record<string, React.ReactElement> = {
  email: <Mail size={18} strokeWidth={1.3} />,
  phone: <Phone size={18} strokeWidth={1.3} />,
  coverage: <Target size={18} strokeWidth={1.3} />,
};

export async function ContactList({ listData }: { listData: contactDataItemType[] }) {
  const t = await getTranslations("LandingPage.Contact");
  return (
    <ul className="flex flex-col gap-4">
      {listData.map(({ nameKey, content, href }) => {
        return (
          <li key={nameKey} className="flex items-center gap-3.5">
            <div className="border-border/20 bg-muted text-accent-foreground flex size-10 items-center justify-center rounded-md border">
              {iconList[nameKey]}
            </div>
            <dl>
              <dt className="text-popover-foreground text-[12px] font-light">
                {t(`contactDetails.${nameKey}`)}
              </dt>
              <dd>
                {href ? (
                  <a href={href} className="font-light">
                    {content}
                  </a>
                ) : (
                  <span>{t("coverage")}</span>
                )}
              </dd>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
