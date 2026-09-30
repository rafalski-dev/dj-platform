import { Button } from "@/components/ui/button";
import { PageHeaderProps } from "@/types/dashboard";
import { PlusIcon } from "lucide-react";

export function PageHeader({ labelText, titleText, buttonText }: PageHeaderProps) {
  return (
    <header>
      <p className="text-muted-foreground/90 text-sm font-light">{labelText}</p>
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] md:text-[36px] lg:text-[40xp]">{titleText}</h1>
        <Button size="sm" className="hidden lg:flex">
          <PlusIcon className="size-3" strokeWidth={3} />
          <span>{buttonText}</span>
        </Button>
        <Button size="icon" className="lg:hidden">
          <PlusIcon className="size-5" strokeWidth={2.5} />
        </Button>
      </div>
    </header>
  );
}
