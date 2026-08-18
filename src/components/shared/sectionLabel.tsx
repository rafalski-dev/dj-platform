import { cn } from "@/lib/utils";
import { SectionLabelProps } from "@/types/sharedComponents";

export function SectionLabel({
  children,
  textStyle,
  position = "left",
  decoration = true,
}: SectionLabelProps) {
  if (position === "center") {
    return (
      <div className={"text-primary mb-5 flex items-center gap-3"}>
        {decoration && (
          <span className="from-primary block h-px w-8 bg-linear-to-l from-20% to-transparent"></span>
        )}
        <p
          className={cn(
            "text-[12.5px] font-medium tracking-[3px] uppercase md:text-[13px]",
            textStyle,
          )}
        >
          {children}
        </p>
        {decoration && (
          <span className="from-primary block h-px w-8 bg-linear-to-r from-20% to-transparent"></span>
        )}
      </div>
    );
  }

  return (
    <div className={"text-primary mb-5 flex items-center gap-3"}>
      {decoration && (
        <span className="from-primary block h-px w-8 bg-linear-to-r from-20% to-transparent"></span>
      )}
      <p
        className={cn(
          "text-[12.5px] font-medium tracking-[3px] uppercase md:text-[13px]",
          textStyle,
        )}
      >
        {children}
      </p>
    </div>
  );
}
