import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CardsList({
  localData,
}: {
  localData: { header: string; content: string | number; footer: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {localData.map(({ header, content, footer }, index: number) => {
        return (
          <Card key={index} size="md" className="gap-2">
            <CardHeader>
              <h3 className="text-muted-foreground/90 font-sans text-[12.5px] tracking-wide uppercase">
                {header}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-accent-foreground font-serif text-[34px] leading-none lining-nums lg:text-[38px]">
                {content}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-popover-foreground text-[13px]">{footer}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
