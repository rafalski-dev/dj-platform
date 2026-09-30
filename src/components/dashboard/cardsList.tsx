import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardData } from "@/types/dashboard";

export function CardsList({ data }: { data: CardData[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {data.map(({ title }, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <h3>{title}</h3>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        );
      })}
    </ul>
  );
}
