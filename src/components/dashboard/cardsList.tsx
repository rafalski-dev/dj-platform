import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CardsList({ description }: { description: { header: string; footer: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {description.map(({ header, footer }, index: number) => {
        return (
          <Card key={index} size="md" className="gap-0">
            <CardHeader>
              <h3 className="text-muted-foreground/90 font-sans text-[12.5px] tracking-wide uppercase">
                {header}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-accent-foreground font-serif text-[34px] lg:text-[40px]">{}</p>
            </CardContent>
            <CardFooter>
              <p className="text-popover-foreground text-[13px]">{footer}</p>
            </CardFooter>
          </Card>
        );
      })}
    </ul>
  );
}
