import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";

type CardsDataType = {
  key: string;
  header: string;
  content: string | number;
  footer: string;
}[];

export function CardsGroup({ cardsData }: { cardsData: CardsDataType }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cardsData.map(({ key, header, content, footer }) => (
        <Card key={key} size="sm" className="min-h-30 justify-start gap-1.5">
          <CardHeader>
            <h3 className="text-muted-foreground/90 font-sans text-[12.5px] tracking-wide uppercase">
              {header}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-accent-foreground font-serif text-[30px] leading-none lining-nums lg:text-[36px]">
              {content}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-popover-foreground text-[13px]">{footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
