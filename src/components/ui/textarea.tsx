import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input/12 placeholder:text-muted-foreground/60 focus-visible:border-ring/80 focus-visible:ring-ring/40 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/30 dark:bg-input dark:aria-invalid:border-destructive/60 dark:border-border/12 dark:aria-invalid:ring-destructive/30 dark:focus-visible:border-ring/80 dark:focus-visible:ring-ring/40 bg-background flex field-sizing-content min-h-16 w-full rounded-md border px-3.5 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
