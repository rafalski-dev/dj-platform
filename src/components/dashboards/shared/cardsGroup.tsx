import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type StatCard = {
  key: string;
  header: string;
  value: number;
  footer: string;
};

export function CardsGroup({ cards }: { cards: StatCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ key, header, value, footer }) => (
        <Card key={key} size="sm" className="min-h-30 justify-between gap-1.5">
          <CardHeader>
            <h3 className="text-muted-foreground/90 font-sans text-[12.5px] tracking-wide uppercase">
              {header}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-accent-foreground font-serif text-[30px] leading-none lining-nums lg:text-[36px]">
              {value}
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
