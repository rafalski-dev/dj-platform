import { FiltersProps } from "@/types/dashboard";
import { Button } from "../ui/button";

export function Filters({ all, firstCategory, secondCategory, thirdCategory }: FiltersProps) {
  return (
    <div className="flex flex-row gap-2">
      {all && (
        <Button variant="outline" size="sm" className="md:h-10.5">
          {all}
        </Button>
      )}
      {firstCategory && (
        <Button variant="outline" size="sm" className="md:h-10.5">
          {firstCategory}
        </Button>
      )}
      {secondCategory && (
        <Button variant="outline" size="sm" className="md:h-10.5">
          {secondCategory}
        </Button>
      )}
      {thirdCategory && (
        <Button variant="outline" size="sm" className="md:h-10.5">
          {thirdCategory}
        </Button>
      )}
    </div>
  );
}
