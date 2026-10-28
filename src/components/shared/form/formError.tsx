import { FieldError } from "@/components/ui/shadcn/field";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

export function FormError({
  error,
  className,
}: {
  error: string | null | undefined;
  className?: string;
}) {
  return (
    <FieldError
      className={cn(
        "border-destructive/60 bg-destructive/3 mt-2 flex gap-2 rounded-lg border px-4 py-3 text-[13.5px]",
        className,
      )}
    >
      <CircleAlert size={18} className="shrink-0" />
      {error}
    </FieldError>
  );
}
