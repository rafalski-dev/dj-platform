import { Button } from "@/components/ui/button";
import { PageHeaderProps } from "@/types/dashboard";
import { PlusIcon } from "lucide-react";

export function PageHeader({ labelText, titleText, buttonText }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      {labelText && <p className="text-muted-foreground/90 mb-2 text-sm font-light">{labelText}</p>}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[32px] leading-none md:text-[36px] lg:text-[40px]">{titleText}</h1>

        {buttonText && (
          <>
            <Button size="sm" className="hidden lg:flex">
              <PlusIcon className="size-3" strokeWidth={3} />
              <span>{buttonText}</span>
            </Button>
            <Button size="icon" className="lg:hidden" aria-label={buttonText}>
              <PlusIcon className="size-5" strokeWidth={2.5} />
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
