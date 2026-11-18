import { contactDataItemType } from "@/types/contact";
import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

const iconList: Record<string, React.ReactElement> = {
  email: <Mail size={18} strokeWidth={1.3} />,
  phone: <Phone size={18} strokeWidth={1.3} />,
};

export async function ContactList({ listData }: { listData: contactDataItemType[] }) {
  const t = await getTranslations("LandingPage.Contact");
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {listData.map(({ nameKey, content, href }) => {
        return (
          <li key={nameKey}>
            <a
              href={href}
              className="border-border bg-card hover:border-border-strong flex items-center gap-3.5 rounded-2xl border p-4 transition-colors"
            >
              <div className="border-border text-accent flex size-10 shrink-0 items-center justify-center rounded-md border">
                {iconList[nameKey]}
              </div>
              <dl className="min-w-0">
                <dt className="text-popover-foreground text-[12px] font-light">
                  {t(`contactDetails.${nameKey}`)}
                </dt>
                <dd className="truncate font-light">{content}</dd>
              </dl>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
