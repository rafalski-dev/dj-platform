import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  name: string;
};

export function Input({ label, className, ...rest }: InputProps) {
  return (
    <div className="flex w-full flex-col">
      {label && <label>{label}</label>}
      <input
        {...rest}
        className={cn(
          "bg-background border-border/15 placeholder-muted-foreground/55 focus-visible:border-ring focus-visible:ring-ring/50 transition-[color, box-shadow] h-12 w-full border px-4 duration-200 outline-none focus-visible:ring-[3px]",
          className,
        )}
      />
    </div>
  );
}
