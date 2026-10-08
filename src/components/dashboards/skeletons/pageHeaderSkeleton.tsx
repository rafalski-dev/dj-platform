import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton({
  titleText,
  buttonText,
}: {
  titleText: string;
  buttonText: string;
}) {
  return (
    <header className="flex flex-col gap-1">
      <Skeleton className="h-7 w-20" />
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
