import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getCurrentYear } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function CardsGroup({ data }: { data: { key: string; content: null | number }[] }) {
  const t = await getTranslations("");
  const year = getCurrentYear();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {data.map(({ key, content }) => {
        return (
          <Card key={key} size="sm" className="min-h-30 justify-between gap-1.5">
            <CardHeader>
              <h3 className="text-muted-foreground/90 font-sans text-[12.5px] tracking-wide uppercase">
                {t(`Admin.Clients.stats.${key}.header`)}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-accent-foreground font-serif text-[30px] leading-none lining-nums lg:text-[36px]">
                {content}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-popover-foreground text-[13px]">
                {t(`Admin.Clients.stats.${key}.footer`)} {key === "newThisSeason" && year}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
