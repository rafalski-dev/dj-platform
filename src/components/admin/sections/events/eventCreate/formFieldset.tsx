import { cn } from "@/lib/utils";

type FormFieldsetProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

export function FormFieldset({ title, className, children }: FormFieldsetProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-accent-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
        {title}
      </legend>
      <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-2", className)}>{children}</div>
    </fieldset>
  );
}
